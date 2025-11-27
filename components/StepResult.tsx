import React from 'react';
import { ContentPlan, SocialPost, ContentType } from '../types';

interface StepResultProps {
  plan: ContentPlan;
  post: SocialPost;
  type: ContentType;
  place: string;
  emotion: string;
  imageUrl: string | null;
  onReset: () => void;
}

const StepResult: React.FC<StepResultProps> = ({ plan, post, type, place, emotion, imageUrl, onReset }) => {
  return (
    <div className="result-container fade-in">
      
      {/* Content Plan Card */}
      <div className="plan-card">
        <div className="plan-header">
          <div className="plan-header-deco"></div>
          <div className="relative">
            <span className="plan-tag">
              {type} 기획안
            </span>
            <h2 className="plan-title">{plan.title}</h2>
            <p className="plan-subtitle">
              {place} × {emotion}
            </p>
          </div>
        </div>

        <div className="plan-content">
          <div className="plan-section">
            <h3>등장인물 / 소재</h3>
            <div className="plan-text-box" style={{ background: '#eef2ff', borderColor: '#c7d2fe' }}>
              {plan.characters}
            </div>
          </div>

          <div className="plan-section">
            <h3>스토리 개요</h3>
            <p style={{ color: '#374151', lineHeight: 1.6 }}>
              {plan.plot}
            </p>
          </div>

          <div className="plan-section">
            <h3 style={{ color: '#ec4899' }}>치유 포인트</h3>
            <div className="healing-box">
              <p>"{plan.healingPoint}"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Post Card */}
      <div className="social-column">
        <div className="instagram-card">
          <div className="instagram-header">
            <div className="user-profile">
              <div className="user-avatar">
                B
              </div>
              <span className="username">busan_storyteller</span>
            </div>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#9ca3af' }}><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="12" r="2"/></svg>
          </div>
          
          {/* Generated Image */}
          <div className="post-image-container">
             {imageUrl ? (
               <img 
                 src={imageUrl} 
                 alt={plan.title} 
                 className={`post-img ${type === ContentType.WEBTOON ? 'aspect-3-4' : 'aspect-4-3'}`}
               />
             ) : (
                <div className="placeholder-img">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginBottom: '0.5rem' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>이미지 생성 중 오류가 발생했거나<br/>이미지가 없습니다.</span>
                </div>
             )}
             
             {imageUrl && (
                 <div className="image-overlay">
                    <p className="overlay-title">{plan.title}</p>
                    <p className="overlay-place">{place}</p>
                 </div>
             )}
          </div>

          <div className="post-actions">
            <svg className="action-icon" style={{ color: '#ef4444' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </div>

          <div className="post-content">
            <p style={{ marginBottom: '0.5rem', whiteSpace: 'pre-line' }}>
              <span style={{ fontWeight: 700, marginRight: '0.5rem' }}>busan_storyteller</span>
              {post.content}
            </p>
            
            <div className="hashtags">
              {post.hashtags.map((tag, i) => (
                <span key={i} className="hashtag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={onReset}
          className="btn-reset"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          <span>새로운 이야기 만들기</span>
        </button>
      </div>
    </div>
  );
};

export default StepResult;