import React from 'react';
import { NavProps } from '../types';

export const Footer: React.FC<NavProps> = ({ onNavigate }) => {
  const handleLink = (target: string, isPage = false) => {
    if (isPage) {
      // @ts-ignore
      onNavigate(target);
      window.scrollTo(0, 0);
    } else {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="relative z-30 border-t border-white/10 bg-space pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
          <img src="https://raw.githubusercontent.com/giandre/designxfactorwebsite/main/images/DXF_logo-white.png" alt="Design X Factor" className="h-8 w-auto" />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Transforming learning experiences through AI-powered solutions built on Universal Design principles.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Solutions</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><button onClick={() => handleLink('solutions')} className="hover:text-brand-blue transition-colors text-left">Learning Transformer</button></li>
            <li><button onClick={() => handleLink('solutions')} className="hover:text-brand-blue transition-colors text-left">Catalyst Studio</button></li>
            <li><button onClick={() => handleLink('solutions')} className="hover:text-brand-blue transition-colors text-left">Catalyst Course</button></li>
            <li><button onClick={() => handleLink('roadmap')} className="hover:text-brand-blue transition-colors text-left">Dynamic Platform</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Platform</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><button onClick={() => handleLink('comparison')} className="hover:text-brand-blue transition-colors text-left">Why Design X Factor</button></li>
            <li><button onClick={() => handleLink('solutions')} className="hover:text-brand-blue transition-colors text-left">Features</button></li>
            <li><button onClick={() => handleLink('roadmap')} className="hover:text-brand-blue transition-colors text-left">Roadmap</button></li>
            <li><button onClick={() => handleLink('api', true)} className="hover:text-brand-blue transition-colors text-left">API Documentation</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><button onClick={() => handleLink('home', true)} className="hover:text-brand-blue transition-colors text-left">About Us</button></li>
            <li><button onClick={() => handleLink('contact')} className="hover:text-brand-blue transition-colors text-left">Contact</button></li>
            <li><button onClick={() => handleLink('privacy', true)} className="hover:text-brand-blue transition-colors text-left">Privacy Policy</button></li>
            <li><button onClick={() => handleLink('terms', true)} className="hover:text-brand-blue transition-colors text-left">Terms of Service</button></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center text-slate-600 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Design X Factor. All rights reserved.</p>
        <p>Built with accessibility and Universal Design at its core.</p>
      </div>
    </footer>
  );
};