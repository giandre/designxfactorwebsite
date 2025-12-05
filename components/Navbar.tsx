import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavProps } from '../types';

export const Navbar: React.FC<NavProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav className="fixed top-0 w-full h-[70px] bg-space/90 backdrop-blur-xl border-b border-white/10 z-50 px-6 lg:px-12 flex items-center justify-between transition-all duration-300">
      <a href="#" onClick={handleHomeClick} className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg p-1">
        <img src="/images/DXF_logo.png" alt="Design X Factor" className="h-8 md:h-10 w-auto" />
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {[
          { name: 'Solutions', id: 'solutions' },
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
        <div className="absolute top-[70px] left-0 w-full bg-space border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl h-screen">
          {[
            { name: 'Solutions', id: 'solutions' },
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