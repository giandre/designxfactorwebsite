import React, { useState } from 'react';
import { Layers, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full h-[70px] bg-space/80 backdrop-blur-xl border-b border-white/10 z-50 px-6 lg:px-12 flex items-center justify-between transition-all duration-300">
      <a href="#" className="flex items-center gap-3 font-extrabold text-xl tracking-tight text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg p-1">
        <Layers className="text-brand-red" size={28} aria-hidden="true" />
        <span>DESIGN X FACTOR</span>
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {['Solutions', 'Why Us', 'Process'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase().replace(' ', '-')}`} 
            className="text-slate-400 hover:text-white transition-colors text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-2 py-1"
          >
            {item}
          </a>
        ))}
        <a 
          href="#contact" 
          className="bg-brand-red hover:bg-red-500 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50"
        >
          Schedule Pilot
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
        <div className="absolute top-[70px] left-0 w-full bg-space border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl">
          {['Solutions', 'Why Us', 'Process'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className="text-slate-300 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
           <a 
            href="#contact" 
            className="bg-brand-red text-center text-white px-6 py-3 rounded-lg font-bold"
            onClick={() => setIsMenuOpen(false)}
          >
            Schedule Pilot
          </a>
        </div>
      )}
    </nav>
  );
};