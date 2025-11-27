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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 font-sans text-gray-800">
      
      {/* Header */}
      <header className="w-full p-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">B</div>
          <h1 className="text-xl font-bold tracking-tight text-indigo-900">Busan Storyteller</h1>
        </div>
        {step !== AppStep.INPUT && (
            <button onClick={handleReset} className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                처음으로
            </button>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-12 min-h-screen flex flex-col justify-center">
        
        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md flex items-center justify-between" role="alert">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="font-bold">✕</button>
          </div>
        )}

        {/* Step Views */}
        {step === AppStep.INPUT && (
          <StepInput onNext={handleInputSubmit} isLoading={isLoading} />
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
      <footer className="w-full text-center py-6 text-gray-500 text-sm">
        <p>© 2024 Busan Storyteller. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;