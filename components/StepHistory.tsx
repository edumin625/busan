import React from 'react';
import { HistoryData, ContentType } from '../types';

interface StepHistoryProps {
  place: string;
  data: HistoryData;
  onNext: (type: ContentType) => void;
  isLoading: boolean;
}

const StepHistory: React.FC<StepHistoryProps> = ({ place, data, onNext, isLoading }) => {
  const contentTypes = Object.values(ContentType);

  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in">
      {/* History Section */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {place}의 역사적 사실
          </h2>
        </div>
        <div className="p-8">
          <div className="prose max-w-none text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
            {data.summary}
          </div>
          
          {data.sourceUrls.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">정보 출처 (Google Search)</h4>
              <ul className="space-y-2">
                {data.sourceUrls.map((source, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline truncate"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Selection Section */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">어떤 콘텐츠로 만들어볼까요?</h3>
        <p className="text-center text-gray-600 mb-8">당신의 감정을 담아낼 그릇을 선택해주세요.</p>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-lg text-gray-600 font-medium">콘텐츠를 기획하고 있습니다...</p>
            <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contentTypes.map((type) => (
              <button
                key={type}
                onClick={() => onNext(type)}
                className="group relative p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center h-40"
              >
                <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                <span className="relative z-10 text-3xl mb-3">
                  {type === ContentType.DOCUMENTARY && '🎥'}
                  {type === ContentType.WEBTOON && '🎨'}
                  {type === ContentType.AUDIO_DRAMA && '🎧'}
                  {type === ContentType.EXHIBITION && '🏛️'}
                </span>
                <span className="relative z-10 font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {type}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepHistory;
