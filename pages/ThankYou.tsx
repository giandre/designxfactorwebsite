import React, { useEffect } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { NavProps } from '../types';

export const ThankYou: React.FC<{ onNavigate: NavProps['onNavigate'] }> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
          <CheckCircle className="text-green-500 w-12 h-12" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Request Received!</h1>
        <p className="text-lg text-slate-400 leading-relaxed mb-10">
          Thank you for your interest in Design X Factor. We have received your message and a member of our team will get back to you within 24 hours.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate('home')}
            className="bg-brand-blue hover:bg-sky-500 text-space font-bold px-8 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} /> Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};