import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Menu, X, ChevronDown, Calculator, Wrench, Layers } from 'lucide-react';
import { NavProps } from '../types';

export const Navbar: React.FC<NavProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const toolsButtonRef = useRef<HTMLButtonElement>(null);
  const solutionsButtonRef = useRef<HTMLButtonElement>(null);

  const productIcons = {
    learningTransformer: "https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/LT-WhiteLine.png",
    catalystStudio: "https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/Catalyst_Studio_logo-whline.png",
    catalystArchitect: "https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/C2Alinewhite2.png",
    didactaX: "https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/Didactaxwhitelines.png",
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key for dropdowns
  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent, type: 'tools' | 'solutions') => {
    if (e.key === 'Escape') {
      if (type === 'tools') {
        setIsToolsOpen(false);
        toolsButtonRef.current?.focus();
      } else {
        setIsSolutionsOpen(false);
        solutionsButtonRef.current?.focus();
      }
    }
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setIsToolsOpen(false);
    setIsSolutionsOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleToolClick = (tool: 'audit') => {
    onNavigate(tool);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
    setIsToolsOpen(false);
  };

  const handleSolutionClick = (solution: 'learning-transformer') => {
    onNavigate(solution);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
    setIsSolutionsOpen(false);
  };

  const handleScrollToSolutions = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('solutions');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('solutions');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsSolutionsOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header>
      <nav 
        className="fixed top-0 w-full h-[70px] bg-space/90 backdrop-blur-xl border-b border-white/10 z-50 px-6 lg:px-12 flex items-center justify-between transition-all duration-300"
        aria-label="Main navigation"
      >
        <a 
          href="#" 
          onClick={handleHomeClick} 
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg p-1"
          aria-label="Design X Factor - Go to homepage"
        >
          <img 
            src="https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/DXF_logo-white.png" 
            alt="Design X Factor" 
            className="h-8 w-auto" 
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          
          {/* Solutions Dropdown */}
          <div className="relative" ref={solutionsRef}>
            <button
              ref={solutionsButtonRef}
              id="solutions-button"
              onClick={() => {
                setIsSolutionsOpen(!isSolutionsOpen);
                setIsToolsOpen(false);
              }}
              onKeyDown={(e) => handleDropdownKeyDown(e, 'solutions')}
              aria-expanded={isSolutionsOpen}
              aria-haspopup="true"
              aria-controls="solutions-menu"
              className={`flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-2 py-1 ${
                isSolutionsOpen || currentPage === 'learning-transformer' ? 'text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Solutions
              <ChevronDown 
                size={14} 
                className={`transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} 
                aria-hidden="true"
              />
            </button>
            
            {isSolutionsOpen && (
              <div 
                id="solutions-menu"
                role="menu"
                aria-labelledby="solutions-button"
                onKeyDown={(e) => handleDropdownKeyDown(e, 'solutions')}
                className="absolute top-full left-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-2">
                  <button
                    role="menuitem"
                    onClick={handleScrollToSolutions}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left group mb-1"
                  >
                    <div className="p-2 bg-brand-blue/20 rounded-lg text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      <Layers size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm block">View All Solutions</span>
                      <span className="text-slate-300 text-xs">See our complete ecosystem</span>
                    </div>
                  </button>

                  <div className="border-t border-white/10 my-2" role="separator"></div>

                  <button
                    role="menuitem"
                    onClick={() => handleSolutionClick('learning-transformer')}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left group"
                  >
                    <div className="p-2 bg-[#c73e4a]/20 rounded-lg group-hover:bg-[#c73e4a] transition-colors flex items-center justify-center">
                      <img src={productIcons.learningTransformer} alt="" className="w-5 h-5 object-contain" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm block">Learning Transformer</span>
                      <span className="text-slate-300 text-xs">Transform LMS content automatically</span>
                    </div>
                  </button>
                  
                  {/* Coming Soon Items - not interactive */}
                  <div className="w-full flex items-start gap-3 p-3 rounded-lg opacity-50" aria-disabled="true">
                    <div className="p-2 bg-slate-700/50 rounded-lg flex items-center justify-center">
                      <img src={productIcons.catalystStudio} alt="" className="w-5 h-5 object-contain opacity-50" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold text-sm block">Catalyst Studio</span>
                      <span className="text-slate-600 text-xs">Coming Soon</span>
                    </div>
                  </div>

                  <div className="w-full flex items-start gap-3 p-3 rounded-lg opacity-50" aria-disabled="true">
                    <div className="p-2 bg-slate-700/50 rounded-lg flex items-center justify-center">
                      <img src={productIcons.catalystArchitect} alt="" className="w-5 h-5 object-contain opacity-50" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold text-sm block">Catalyst Architect</span>
                      <span className="text-slate-600 text-xs">Coming Soon</span>
                    </div>
                  </div>

                  <div className="w-full flex items-start gap-3 p-3 rounded-lg opacity-50" aria-disabled="true">
                    <div className="p-2 bg-slate-700/50 rounded-lg flex items-center justify-center">
                      <img src={productIcons.didactaX} alt="" className="w-5 h-5 object-contain opacity-50" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold text-sm block">DidactaX</span>
                      <span className="text-slate-600 text-xs">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div className="relative" ref={toolsRef}>
            <button
              ref={toolsButtonRef}
              id="tools-button"
              onClick={() => {
                setIsToolsOpen(!isToolsOpen);
                setIsSolutionsOpen(false);
              }}
              onKeyDown={(e) => handleDropdownKeyDown(e, 'tools')}
              aria-expanded={isToolsOpen}
              aria-haspopup="true"
              aria-controls="tools-menu"
              className={`flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-2 py-1 ${
                isToolsOpen || currentPage === 'audit' ? 'text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Tools
              <ChevronDown 
                size={14} 
                className={`transition-transform ${isToolsOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            
            {isToolsOpen && (
              <div 
                id="tools-menu"
                role="menu"
                aria-labelledby="tools-button"
                onKeyDown={(e) => handleDropdownKeyDown(e, 'tools')}
                className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-2">
                  <button
                    role="menuitem"
                    onClick={() => handleToolClick('audit')}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left group"
                  >
                    <div className="p-2 bg-brand-red/20 rounded-lg text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                      <Calculator size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm block">Content Debt Audit</span>
                      <span className="text-slate-300 text-xs">Calculate your ADA compliance risk</span>
                    </div>
                  </button>
                  
                  <div className="w-full flex items-start gap-3 p-3 rounded-lg opacity-50" aria-disabled="true">
                    <div className="p-2 bg-slate-700/50 rounded-lg text-slate-500">
                      <Wrench size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold text-sm block">ROI Calculator</span>
                      <span className="text-slate-600 text-xs">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a 
            href="#comparison"
            onClick={(e) => handleNavClick(e, 'comparison')}
            className="text-slate-300 hover:text-white transition-colors text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-2 py-1"
          >
            Why Us
          </a>
          
          <a 
            href="#roadmap"
            onClick={(e) => handleNavClick(e, 'roadmap')}
            className="text-slate-300 hover:text-white transition-colors text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-2 py-1"
          >
            Roadmap
          </a>

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
          className="md:hidden text-white p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            className="absolute top-[70px] left-0 w-full bg-space border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {/* Mobile Solutions Section */}
            <div className="space-y-3">
              <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                Solutions
              </span>
              <button
                onClick={handleScrollToSolutions}
                className="w-full flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <Layers size={18} className="text-brand-blue" aria-hidden="true" />
                <div className="text-left">
                  <span className="text-white font-medium block">View All Solutions</span>
                  <span className="text-slate-300 text-xs">See our complete ecosystem</span>
                </div>
              </button>
              <button
                onClick={() => handleSolutionClick('learning-transformer')}
                className="w-full flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="p-1 bg-[#c73e4a]/20 rounded">
                  <img src={productIcons.learningTransformer} alt="" className="w-5 h-5 object-contain" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <span className="text-white font-medium block">Learning Transformer</span>
                  <span className="text-slate-300 text-xs">Transform LMS content</span>
                </div>
              </button>
            </div>
            
            {/* Mobile Tools Section */}
            <div className="space-y-3">
              <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                Tools
              </span>
              <button
                onClick={() => handleToolClick('audit')}
                className="w-full flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <Calculator size={18} className="text-brand-red" aria-hidden="true" />
                <div className="text-left">
                  <span className="text-white font-medium block">Content Debt Audit</span>
                  <span className="text-slate-300 text-xs">Calculate ADA risk</span>
                </div>
              </button>
            </div>
            
            <a 
              href="#comparison"
              className="text-slate-200 text-lg font-medium"
              onClick={(e) => handleNavClick(e, 'comparison')}
            >
              Why Us
            </a>

            <a 
              href="#roadmap"
              className="text-slate-200 text-lg font-medium"
              onClick={(e) => handleNavClick(e, 'roadmap')}
            >
              Roadmap
            </a>
            
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
    </header>
  );
};