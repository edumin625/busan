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
    <div className="history-container fade-in">
      {/* History Section */}
      <div className="shadow-lg rounded-2xl overflow-hidden">
        <div className="history-header-bar">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {place}의 역사적 사실
        </div>
        <div className="history-body">
          <div className="history-text">
            {data.summary}
          </div>
          
          {data.sourceUrls.length > 0 && (
            <div className="source-section">
              <h4 className="source-title">정보 출처 (Google Search)</h4>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {data.sourceUrls.map((source, index) => (
                  <li key={index}>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="source-link"
                    >
                      <span style={{ width: '6px', height: '6px', background: '#60a5fa', borderRadius: '50%' }}></span>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                        {source.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Selection Section */}
      <div className="glass-card">
        <h3 className="text-center" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1f2937' }}>
          어떤 콘텐츠로 만들어볼까요?
        </h3>
        <p className="text-center" style={{ color: '#4b5563', marginBottom: '2rem' }}>
          당신의 감정을 담아낼 그릇을 선택해주세요.
        </p>
        
        {isLoading ? (
          <div className="text-center" style={{ padding: '3rem 0' }}>
            <div className="spin" style={{ 
              display: 'inline-block', 
              height: '3rem', 
              width: '3rem', 
              border: '4px solid #3b82f6', 
              borderTopColor: 'transparent', 
              borderRadius: '50%',
              marginBottom: '1rem'
            }}></div>
            <p style={{ fontSize: '1.125rem', fontWeight: 500, color: '#4b5563' }}>콘텐츠를 기획하고 있습니다...</p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>잠시만 기다려주세요.</p>
          </div>
        ) : (
          <div className="selection-grid">
            {contentTypes.map((type) => (
              <button
                key={type}
                onClick={() => onNext(type)}
                className="selection-btn"
              >
                <div className="selection-bg-hover"></div>
                <span className="selection-icon">
                  {type === ContentType.DOCUMENTARY && '🎥'}
                  {type === ContentType.WEBTOON && '🎨'}
                  {type === ContentType.AUDIO_DRAMA && '🎧'}
                  {type === ContentType.EXHIBITION && '🏛️'}
                </span>
                <span className="selection-label">
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