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
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 fade-in pb-12">
      
      {/* Content Plan Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full border border-white/50">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-wider mb-2">
              {type} 기획안
            </span>
            <h2 className="text-3xl font-bold mb-2">{plan.title}</h2>
            <p className="text-white/80 text-sm">
              {place} × {emotion}
            </p>
          </div>
        </div>

        <div className="p-8 space-y-8 flex-grow">
          <div>
            <h3 className="text-sm uppercase tracking-wide text-indigo-500 font-bold mb-3 flex items-center">
              <span className="w-8 h-px bg-indigo-500 mr-3"></span>
              등장인물 / 소재
            </h3>
            <p className="text-gray-700 leading-relaxed bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              {plan.characters}
            </p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wide text-indigo-500 font-bold mb-3 flex items-center">
              <span className="w-8 h-px bg-indigo-500 mr-3"></span>
              스토리 개요
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {plan.plot}
            </p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wide text-pink-500 font-bold mb-3 flex items-center">
              <span className="w-8 h-px bg-pink-500 mr-3"></span>
              치유 포인트
            </h3>
            <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-r-lg">
              <p className="text-gray-800 italic">
                "{plan.healingPoint}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Post Card */}
      <div className="flex flex-col space-y-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                B
              </div>
              <span className="font-semibold text-sm">busan_storyteller</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="12" r="2"/></svg>
          </div>
          
          {/* Generated Image */}
          <div className="bg-gray-100 flex items-center justify-center relative overflow-hidden group">
             {imageUrl ? (
               <img 
                 src={imageUrl} 
                 alt={plan.title} 
                 className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${type === ContentType.WEBTOON ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
               />
             ) : (
                <div className="aspect-square w-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span>이미지 생성 중 오류가 발생했거나<br/>이미지가 없습니다.</span>
                </div>
             )}
             
             {imageUrl && (
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
             )}

             <div className="absolute bottom-6 left-6 text-white text-left z-10">
                <p className="text-xl font-bold drop-shadow-lg leading-tight mb-1">{plan.title}</p>
                <p className="text-xs opacity-90 drop-shadow-md">{place}</p>
             </div>
          </div>

          <div className="p-5">
            <div className="flex space-x-4 mb-4">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </div>
            
            <p className="text-gray-800 text-sm leading-relaxed mb-4 whitespace-pre-line">
              <span className="font-bold mr-2">busan_storyteller</span>
              {post.content}
            </p>
            
            <div className="flex flex-wrap gap-2 text-blue-600 text-sm font-medium">
              {post.hashtags.map((tag, i) => (
                <span key={i} className="hover:underline cursor-pointer">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={onReset}
          className="w-full py-4 rounded-xl bg-white text-gray-800 font-bold shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          <span>새로운 이야기 만들기</span>
        </button>
      </div>
    </div>
  );
};

export default StepResult;