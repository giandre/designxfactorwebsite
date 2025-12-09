import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavProps } from '../types';

export const Navbar: React.FC<NavProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      onNavigate('home');
      // Allow time for render then scroll
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('learning-transformer');
    setIsMenuOpen(false);
    setIsSolutionsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full h-[70px] bg-space/90 backdrop-blur-xl border-b border-white/10 z-50 px-6 lg:px-12 flex items-center justify-between transition-all duration-300">
      <a href="#" onClick={handleHomeClick} className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg p-1">
      <img src="https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/DXF_logo-white.png" alt="Design X Factor" className="h-8 w-auto" />
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        
        {/* Solutions Dropdown */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsSolutionsOpen(true)}
          onMouseLeave={() => setIsSolutionsOpen(false)}
        >
          <button 
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-2 py-1"
          >
            Solutions <ChevronDown size={14} className={`transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`absolute top-full left-0 pt-2 w-56 transition-all duration-200 ${isSolutionsOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
            <div className="bg-[#0a0a0f] border border-white/10 rounded-xl shadow-xl overflow-hidden p-1">
              <a 
                href="#solutions"
                onClick={(e) => { handleNavClick(e, 'solutions'); setIsSolutionsOpen(false); }}
                className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Overview
              </a>
              <a 
                href="#learning-transformer"
                onClick={handleProductClick}
                className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Learning Transformer
              </a>
            </div>
          </div>
        </div>

        {[
          { name: 'Why Us', id: 'comparison' },
          { name: 'Roadmap', id: 'roadmap' }
        ].map((item) => (
          <a 
            key={item.name} 
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            className="text-slate-400 hover:text-white transition-colors text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-2 py-1"
          >
            {item.name}
          </a>
        ))}
        <a 
          href="#contact"
          onClick={(e) => handleNavClick(e, 'contact')}
          className="bg-brand-red hover:bg-red-500 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50 shadow-lg shadow-brand-red/20"
        >
          Schedule Meeting
        </a>
      </div>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden text-white p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-space border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl h-[calc(100vh-70px)] overflow-y-auto">
          
          <div className="space-y-4">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Solutions</div>
            <a 
              href="#solutions"
              onClick={(e) => handleNavClick(e, 'solutions')}
              className="block text-slate-300 text-lg font-medium pl-4 border-l border-white/10"
            >
              Overview
            </a>
            <a 
              href="#learning-transformer"
              onClick={handleProductClick}
              className="block text-slate-300 text-lg font-medium pl-4 border-l border-brand-red/50 text-white"
            >
              Learning Transformer
            </a>
          </div>

          {[
            { name: 'Why Us', id: 'comparison' },
            { name: 'Roadmap', id: 'roadmap' }
          ].map((item) => (
            <a 
              key={item.name} 
              href={`#${item.id}`}
              className="text-slate-300 text-lg font-medium"
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.name}
            </a>
          ))}
           <a 
            href="#contact" 
            className="bg-brand-red text-center text-white px-6 py-3 rounded-lg font-bold mt-4"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Schedule Meeting
          </a>
        </div>
      )}
    </nav>
  );
};