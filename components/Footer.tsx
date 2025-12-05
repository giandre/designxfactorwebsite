import React from 'react';
import { Layers } from 'lucide-react';
import { NavProps } from '../types';

export const Footer: React.FC<NavProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/10 bg-space pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-white mb-6">
            <Layers className="text-brand-red" size={24} />
            <span>DESIGN X FACTOR</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Transforming learning experiences through AI-powered solutions built on Universal Design principles.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Solutions</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><button onClick={() => onNavigate('home')} className="hover:text-brand-blue transition-colors">Learning Transformer</button></li>
            <li><button onClick={() => onNavigate('home')} className="hover:text-brand-blue transition-colors">Catalyst Studio</button></li>
            <li><button onClick={() => onNavigate('home')} className="hover:text-brand-blue transition-colors">Catalyst Course</button></li>
            <li><button onClick={() => onNavigate('home')} className="hover:text-brand-blue transition-colors">Dynamic Platform</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Platform</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><button onClick={() => onNavigate('home')} className="hover:text-brand-blue transition-colors">Why Design X Factor</button></li>
            <li><button onClick={() => onNavigate('home')} className="hover:text-brand-blue transition-colors">Features</button></li>
            <li><button onClick={() => onNavigate('home')} className="hover:text-brand-blue transition-colors">Roadmap</button></li>
            <li><button onClick={() => onNavigate('api')} className="hover:text-brand-blue transition-colors">API Documentation</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><button onClick={() => onNavigate('home')} className="hover:text-brand-blue transition-colors">About Us</button></li>
            <li><button onClick={() => onNavigate('home')} className="hover:text-brand-blue transition-colors">Contact</button></li>
            <li><button onClick={() => onNavigate('privacy')} className="hover:text-brand-blue transition-colors">Privacy Policy</button></li>
            <li><button onClick={() => onNavigate('terms')} className="hover:text-brand-blue transition-colors">Terms of Service</button></li>
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