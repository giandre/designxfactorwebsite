import React, { useEffect } from 'react';
import { NavProps } from '../types';

export const ThankYou: React.FC<{ onNavigate: NavProps['onNavigate'] }> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-xl">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" className="mx-auto mb-8">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="9 12 11 14 15 10"></polyline>
        </svg>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Thank You!</h1>
        <p className="text-xl text-slate-400 leading-relaxed mb-8">
          We've received your message and will get back to you within 24 hours.
        </p>
        <p className="text-slate-500 mb-10">
          In the meantime, feel free to explore more about our solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate('home')}
            className="bg-brand-blue hover:bg-sky-500 text-space font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Return to Home
          </button>
          <button 
            onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-lg transition-colors border border-white/10"
          >
            View Solutions
          </button>
        </div>
      </div>
    </div>
  );
};