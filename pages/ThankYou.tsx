import React, { useEffect, useRef } from 'react';
import { NavProps } from '../types';
import { CheckCircle } from 'lucide-react';

export const ThankYou: React.FC<{ onNavigate: NavProps['onNavigate'] }> = ({ onNavigate }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Focus the heading for screen readers
    headingRef.current?.focus();
  }, []);

  return (
    <div 
      className="min-h-[80vh] flex items-center justify-center px-6 pt-20"
      role="main"
      aria-labelledby="thank-you-heading"
    >
      <div className="text-center max-w-xl">
        <div 
          className="mx-auto mb-8 w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
          aria-hidden="true"
        >
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 
          id="thank-you-heading"
          ref={headingRef}
          tabIndex={-1}
          className="text-4xl md:text-5xl font-bold text-white mb-6 outline-none"
        >
          Thank You!
        </h1>
        
        <p className="text-xl text-slate-300 leading-relaxed mb-8">
          We've received your message and will get back to you within 24 hours.
        </p>
        
        <p className="text-slate-400 mb-10">
          In the meantime, feel free to explore more about our solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate('home')}
            className="bg-brand-blue hover:bg-sky-500 text-space font-bold px-8 py-3 rounded-lg transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/50"
          >
            Return to Home
          </button>
          <button 
            onClick={() => { 
              onNavigate('home'); 
              setTimeout(() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' }), 100); 
            }}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-lg transition-colors border border-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
          >
            View Solutions
          </button>
        </div>
      </div>
    </div>
  );
};