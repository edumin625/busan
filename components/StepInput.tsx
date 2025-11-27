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
    <div className="glass-card input-card fade-in">
      <h2 className="text-center" style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1f2937' }}>
        부산의 <span style={{ color: '#2563eb' }}>이야기</span>를<br />찾아드립니다
      </h2>
      <p className="text-center" style={{ color: '#4b5563', marginBottom: '2rem' }}>
        당신의 감정과 부산의 장소가 만나<br/>새로운 이야기가 시작됩니다.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="place" className="form-label">
            부산의 장소
          </label>
          <input
            id="place"
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="예: 40계단, 영도대교, 감천문화마을"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emotion" className="form-label">
            현재의 감정 키워드
          </label>
          <input
            id="emotion"
            type="text"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            placeholder="예: 그리움, 쓸쓸함, 설렘, 위로"
            className="form-input"
            style={{ borderColor: emotion ? '#ec4899' : '' }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <span className="spin" style={{ 
                marginRight: '0.75rem', 
                height: '1.25rem', 
                width: '1.25rem', 
                border: '2px solid transparent', 
                borderTopColor: 'white', 
                borderRadius: '50%' 
              }}></span>
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