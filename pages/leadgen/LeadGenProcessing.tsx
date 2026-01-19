import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface LeadGenProcessingProps {
  onComplete: () => void;
}

export const LeadGenProcessing: React.FC<LeadGenProcessingProps> = ({ onComplete }) => {
  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-space flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Animated Icon */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-red rounded-full opacity-20 animate-pulse" />
          <div className="absolute inset-4 bg-space rounded-full flex items-center justify-center">
            <Sparkles size={48} className="text-brand-gold animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
          Analyzing Your Needs...
        </h2>
        <p className="text-slate-300 text-lg mb-8">
          We're creating your personalized recommendations
        </p>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-brand-red rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};
