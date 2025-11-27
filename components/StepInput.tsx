import React, { useState } from 'react';

interface StepInputProps {
  onNext: (place: string, emotion: string) => void;
  isLoading: boolean;
}

const StepInput: React.FC<StepInputProps> = ({ onNext, isLoading }) => {
  const [place, setPlace] = useState('');
  const [emotion, setEmotion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (place.trim() && emotion.trim()) {
      onNext(place, emotion);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        부산의 <span className="text-blue-600">이야기</span>를<br />찾아드립니다
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        당신의 감정과 부산의 장소가 만나<br/>새로운 이야기가 시작됩니다.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="place" className="block text-sm font-medium text-gray-700 mb-2">
            부산의 장소
          </label>
          <input
            id="place"
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="예: 40계단, 영도대교, 감천문화마을"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="emotion" className="block text-sm font-medium text-gray-700 mb-2">
            현재의 감정 키워드
          </label>
          <input
            id="emotion"
            type="text"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            placeholder="예: 그리움, 쓸쓸함, 설렘, 위로"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-transform transform hover:scale-[1.02] ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              역사를 탐색 중입니다...
            </span>
          ) : (
            '이야기 시작하기'
          )}
        </button>
      </form>
    </div>
  );
};

export default StepInput;
