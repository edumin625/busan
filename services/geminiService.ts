import { GoogleGenAI, Type } from "@google/genai";
import { HistoryData, ContentPlan, ContentType, SocialPost } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchHistory = async (place: string): Promise<HistoryData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `부산의 장소 '${place}'에 대한 역사적 사실, 배경, 주요 사건을 검색해줘. 정확하고 신뢰할 수 있는 정보를 바탕으로 요약해줘.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "정보를 찾을 수 없습니다.";
    
    // Extract sources from grounding chunks
    const sources: Array<{ title: string; url: string }> = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || "출처",
            url: chunk.web.uri
          });
        }
      });
    }

    return {
      summary: text,
      sourceUrls: sources
    };
  } catch (error) {
    console.error("History fetch error:", error);
    throw new Error("역사 정보를 가져오는 중 오류가 발생했습니다.");
  }
};

export const generateContentPlan = async (
  place: string, 
  emotion: string, 
  history: string, 
  type: ContentType
): Promise<ContentPlan> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        당신은 전문 문화 콘텐츠 기획자입니다.
        장소: ${place}
        역사적 배경: ${history}
        사용자 감정 키워드: ${emotion}
        콘텐츠 형식: ${type}

        위 정보를 바탕으로 사용자의 감정(${emotion})을 위로하고 공감할 수 있는 ${type} 기획안을 작성해주세요.
        역사적 사실을 잘 반영하면서도 창의적이어야 합니다.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "콘텐츠 제목" },
            characters: { type: Type.STRING, description: "주요 등장인물 또는 핵심 소재 설명" },
            plot: { type: Type.STRING, description: "스토리 개요 및 줄거리" },
            healingPoint: { type: Type.STRING, description: "이 콘텐츠가 어떻게 사용자의 감정을 위로하는지 설명" }
          },
          required: ["title", "characters", "plot", "healingPoint"]
        }
      }
    });

    const jsonStr = response.text || "{}";
    return JSON.parse(jsonStr) as ContentPlan;
  } catch (error) {
    console.error("Plan generation error:", error);
    throw new Error("콘텐츠 기획안 생성 중 오류가 발생했습니다.");
  }
};

export const generateSocialPost = async (
  place: string,
  emotion: string,
  plan: ContentPlan,
  type: ContentType
): Promise<SocialPost> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        다음 문화 콘텐츠 기획안을 바탕으로 SNS(인스타그램 등) 홍보 포스트를 작성해주세요.
        
        제목: ${plan.title}
        형식: ${type}
        장소: ${place}
        감정: ${emotion}
        내용: ${plan.healingPoint}

        규칙:
        1. 따뜻하고 감성적인 어조를 사용하세요.
        2. 이모지를 적절히 사용하여 시각적으로 매력적이게 만드세요.
        3. 해시태그를 3개 이상 포함하세요.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING, description: "SNS 포스트 본문 내용" },
            hashtags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "해시태그 목록" 
            }
          }
        }
      }
    });
    
    const jsonStr = response.text || "{}";
    return JSON.parse(jsonStr) as SocialPost;
  } catch (error) {
    console.error("Post generation error:", error);
    throw new Error("SNS 포스트 생성 중 오류가 발생했습니다.");
  }
};

export const generateImage = async (
  place: string,
  emotion: string,
  history: string,
  plan: ContentPlan,
  type: ContentType
): Promise<string | null> => {
  try {
    let prompt = "";
    // Default aspect ratio
    let aspectRatio = "4:3";

    const baseContext = `Location: ${place} (Busan, South Korea). Historical Context: ${history.slice(0, 500)}. Emotion: ${emotion}.`;

    if (type === ContentType.WEBTOON) {
      // Specific prompt for Webtoon using 'nano banana' (gemini-2.5-flash-image)
      prompt = `
        ${baseContext}
        Task: Create a 4-panel webtoon (comic strip) layout.
        Storyline: ${plan.plot}.
        Characters: ${plan.characters}.
        Style: Korean Webtoon style (Manhwa), colorful, digital illustration.
        
        Requirements:
        1. Create exactly 4 panels arranged in a grid or strip.
        2. Visuals must be based on the historical context and real features of ${place}.
        3. IMPORTANT: Include speech bubbles with KOREAN TEXT (Hangul) that matches the emotion and story.
        4. The art style should be modern and appealing.
      `;
      aspectRatio = "3:4"; // Vertical for webtoon
    } else {
      prompt = `
        ${baseContext}
        Task: Create a high-quality concept art poster.
        Subject: ${plan.characters} at ${place}.
        Style: Cinematic, atmospheric, detailed, reflecting the emotion of ${emotion}.
        Visuals: Incorporate specific details from the historical context provided.
      `;
      aspectRatio = "4:3";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
            aspectRatio: aspectRatio as any
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
       if (part.inlineData) {
         return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
       }
    }
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    return null;
  }
};