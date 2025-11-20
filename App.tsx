import React, { useState } from 'react';
import { InkButton } from './components/InkButton';
import { ResultCard } from './components/ResultCard';
import { generateCrazyThursdayCopy } from './services/geminiService';
import { ToneType, CopyResult } from './types';
import { TONE_LABELS } from './constants';

const App: React.FC = () => {
  const [tone, setTone] = useState<ToneType>(ToneType.HEROIC);
  const [keywords, setKeywords] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CopyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generateSuccess, setGenerateSuccess] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setGenerateSuccess(false);

    try {
      const data = await generateCrazyThursdayCopy({ tone, keywords });
      setResult(data);
      setGenerateSuccess(true);
      setTimeout(() => setGenerateSuccess(false), 400); // Reset after animation
    } catch (e) {
      setError(e instanceof Error ? e.message : '发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative text-yanyun-paper font-sans selection:bg-yanyun-gold selection:text-black">
      {/* Background Overlay with Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4 border-b-2 border-yanyun-gold pb-2">
             <span className="text-yanyun-gold tracking-[0.5em] text-sm uppercase">Where Winds Meet</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-wide mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
            燕云十六声
          </h1>
          <div className="flex items-center justify-center gap-4 text-2xl md:text-3xl font-serif italic text-gray-400">
            <span className="h-px w-12 bg-gray-600"></span>
            <span>疯狂星期四文案生成</span>
            <span className="h-px w-12 bg-gray-600"></span>
          </div>
        </header>

        {/* Controls */}
        <div className="w-full max-w-2xl bg-yanyun-ink/80 backdrop-blur-md p-8 rounded-sm border border-white/10 shadow-xl animate-fade-in" style={{animationDelay: '0.2s'}}>
          
          {/* Tone Selection */}
          <div className="mb-8">
            <label className="block text-yanyun-gold text-sm font-bold mb-3 tracking-wider">
              选择风格 / TONE
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.values(ToneType).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`py-2 px-4 rounded-sm border transition-all duration-300 font-serif ${
                    tone === t 
                      ? 'bg-white text-black border-white' 
                      : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
                  }`}
                >
                  {TONE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>

          {/* Keywords Input */}
          <div className="mb-8">
            <label className="block text-yanyun-gold text-sm font-bold mb-3 tracking-wider">
              附加关键词 (选填) / KEYWORDS
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="例如：无师无派, 没钱吃饭, 乱世浮萍..."
              className="w-full bg-black/50 border border-gray-700 rounded-sm p-4 text-white placeholder-gray-600 focus:outline-none focus:border-yanyun-gold transition-colors font-serif"
            />
          </div>

          {/* Action */}
          <div className="text-center">
            <InkButton 
              onClick={handleGenerate} 
              isLoading={loading} 
              className={`w-full md:w-auto md:min-w-[200px] ${generateSuccess ? 'animate-success-bump' : ''}`}
            >
              生成文案
            </InkButton>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-sm max-w-2xl w-full text-center font-serif animate-pulse">
            {error}
          </div>
        )}

        {/* Results */}
        {result && <ResultCard result={result} />}
        
        <footer className="mt-20 text-gray-600 text-xs tracking-widest">
            POWERED BY GEMINI 2.5 · YANYUN FAN TOOL
        </footer>
      </div>
    </div>
  );
};

export default App;