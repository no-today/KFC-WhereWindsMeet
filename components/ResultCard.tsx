import React, { useState } from 'react';
import { CopyResult } from '../types';
import { InkButton } from './InkButton';

interface ResultCardProps {
  result: CopyResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <div className="relative bg-yanyun-paper text-yanyun-dark p-1 rounded-sm shadow-2xl">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-yanyun-dark -mt-1 -ml-1"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-yanyun-dark -mt-1 -mr-1"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-yanyun-dark -mb-1 -ml-1"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-yanyun-dark -mb-1 -mr-1"></div>

        <div className="border border-yanyun-dark/20 p-8 relative overflow-hidden">
          {/* Watermark effect */}
          <div className="absolute pointer-events-none select-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
             <span className="text-9xl font-serif font-black">燕云</span>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold text-center mb-6 text-black tracking-widest border-b border-black/10 pb-4">
              {result.title}
            </h2>
            
            <div className="prose prose-lg font-serif leading-relaxed text-justify whitespace-pre-wrap mb-8 text-gray-800">
              {result.content}
            </div>

            <div className="flex justify-center pt-4 border-t border-black/10">
              <InkButton onClick={handleCopy} variant="primary" className="min-w-[150px]">
                {copied ? '已复制' : '复制文案'}
              </InkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};