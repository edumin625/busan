import React, { useState } from 'react';
import { AppStep, HistoryData, ContentPlan, ContentType, SocialPost } from './types';
import { fetchHistory, generateContentPlan, generateSocialPost, generateImage } from './services/geminiService';
import StepInput from './components/StepInput';
import StepHistory from './components/StepHistory';
import StepResult from './components/StepResult';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data State
  const [place, setPlace] = useState('');
  const [emotion, setEmotion] = useState('');
  const [historyData, setHistoryData] = useState<HistoryData | null>(null);
  const [selectedType, setSelectedType] = useState<ContentType | null>(null);
  const [contentPlan, setContentPlan] = useState<ContentPlan | null>(null);
  const [socialPost, setSocialPost] = useState<SocialPost | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Step 1 -> Step 2
  const handleInputSubmit = async (inputPlace: string, inputEmotion: string) => {
    setPlace(inputPlace);
    setEmotion(inputEmotion);
    setIsLoading(true);
    setError(null);

    try {
      const history = await fetchHistory(inputPlace);
      setHistoryData(history);
      setStep(AppStep.HISTORY);
    } catch (err: any) {
      setError(err.message || '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2 -> Step 3 & 4 (Combined for smoother UX)
  const handleTypeSelect = async (type: ContentType) => {
    if (!historyData) return;
    
    setSelectedType(type);
    setIsLoading(true);
    setError(null);
    setImageUrl(null); // Reset previous image

    try {
      // 1. Generate Plan
      const plan = await generateContentPlan(place, emotion, historyData.summary, type);
      setContentPlan(plan);

      // 2. Generate Post and Image in parallel
      const [post, img] = await Promise.all([
        generateSocialPost(place, emotion, plan, type),
        generateImage(place, emotion, historyData.summary, plan, type)
      ]);
      
      setSocialPost(post);
      setImageUrl(img);

      setStep(AppStep.RESULT);
    } catch (err: any) {
      setError(err.message || '콘텐츠 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(AppStep.INPUT);
    setPlace('');
    setEmotion('');
    setHistoryData(null);
    setSelectedType(null);
    setContentPlan(null);
    setSocialPost(null);
    setImageUrl(null);
    setError(null);
  };

  return (
    <div>
      {/* Header */}
      <header className="app-header">
        <div className="logo-container">
          <div className="logo-icon">B</div>
          <h1 className="logo-text">Busan Storyteller</h1>
        </div>
        {step !== AppStep.INPUT && (
            <button onClick={handleReset} className="header-btn">
                처음으로
            </button>
        )}
      </header>

      {/* Main Content */}
      <main className="main-content container">
        
        {/* Error Message */}
        {error && (
          <div className="error-box" role="alert">
            <p>{error}</p>
            <button onClick={() => setError(null)} style={{ fontWeight: 'bold' }}>✕</button>
          </div>
        )}

        {/* Step Views */}
        {step === AppStep.INPUT && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
             <StepInput onNext={handleInputSubmit} isLoading={isLoading} />
          </div>
        )}

        {step === AppStep.HISTORY && historyData && (
          <StepHistory 
            place={place} 
            data={historyData} 
            onNext={handleTypeSelect} 
            isLoading={isLoading} 
          />
        )}

        {step === AppStep.RESULT && contentPlan && socialPost && selectedType && (
          <StepResult 
            plan={contentPlan} 
            post={socialPost} 
            type={selectedType} 
            place={place}
            emotion={emotion}
            imageUrl={imageUrl}
            onReset={handleReset} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Busan Storyteller. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;