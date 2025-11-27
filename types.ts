export enum AppStep {
  INPUT = 'INPUT',
  HISTORY = 'HISTORY',
  PLANNING = 'PLANNING',
  RESULT = 'RESULT'
}

export enum ContentType {
  DOCUMENTARY = '다큐멘터리',
  WEBTOON = '웹툰',
  AUDIO_DRAMA = '오디오 드라마',
  EXHIBITION = '전시회'
}

export interface HistoryData {
  summary: string;
  sourceUrls: Array<{ title: string; url: string }>;
}

export interface ContentPlan {
  title: string;
  characters: string;
  plot: string;
  healingPoint: string;
}

export interface SocialPost {
  content: string;
  hashtags: string[];
}
