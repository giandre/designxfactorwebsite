import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Menu, X, ChevronDown, Calculator, Wrench, BookOpen, Video, Headphones, GraduationCap, Shield, FolderOpen } from 'lucide-react';
import { NavProps, PageView } from '../types';

export const Navbar: React.FC<NavProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const toolsButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key for dropdowns
  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent, type: 'tools' | 'services') => {
    if (e.key === 'Escape') {
      if (type === 'tools') {
        setIsToolsOpen(false);
        toolsButtonRef.current?.focus();
      } else {
        setIsServicesOpen(false);
        servicesButtonRef.current?.focus();
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
    setIsServicesOpen(false);
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

  const handlePageClick = (page: PageView) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
    setIsServicesOpen(false);
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

          {/* Services Dropdown */}
          <div className="relative" ref={servicesRef}>
            <button
              ref={servicesButtonRef}
              id="services-button"
              onClick={() => {
                setIsServicesOpen(!isServicesOpen);
                setIsToolsOpen(false);
              }}
              onKeyDown={(e) => handleDropdownKeyDown(e, 'services')}
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
              aria-controls="services-menu"
              className={`flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-2 py-1 ${
                isServicesOpen || currentPage === 'services' ? 'text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Services
              <ChevronDown
                size={14}
                className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {isServicesOpen && (
              <div
                id="services-menu"
                role="menu"
                aria-labelledby="services-button"
                onKeyDown={(e) => handleDropdownKeyDown(e, 'services')}
                className="absolute top-full left-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-2">
                  <button
                    role="menuitem"
                    onClick={() => handlePageClick('services')}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left group mb-1"
                  >
                    <div className="p-2 bg-brand-red/20 rounded-lg text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                      <GraduationCap size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm block">All Services</span>
                      <span className="text-slate-300 text-xs">View our complete offering</span>
                    </div>
                  </button>

                  <div className="border-t border-white/10 my-2" role="separator"></div>

                  <button
                    role="menuitem"
                    onClick={() => handlePageClick('services')}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left group"
                  >
                    <div className="p-2 bg-brand-blue/20 rounded-lg text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      <BookOpen size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm block">eBook Creation</span>
                      <span className="text-slate-300 text-xs">Documents to digital experiences</span>
                    </div>
                  </button>

                  <button
                    role="menuitem"
                    onClick={() => handlePageClick('services')}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left group"
                  >
                    <div className="p-2 bg-brand-purple/20 rounded-lg text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
                      <Video size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm block">Video Production</span>
                      <span className="text-slate-300 text-xs">Professional video lessons</span>
                    </div>
                  </button>

                  <button
                    role="menuitem"
                    onClick={() => handlePageClick('services')}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left group"
                  >
                    <div className="p-2 bg-brand-gold/20 rounded-lg text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-colors">
                      <Headphones size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm block">Audio & Podcasts</span>
                      <span className="text-slate-300 text-xs">Learning on the go</span>
                    </div>
                  </button>

                  <button
                    role="menuitem"
                    onClick={() => handlePageClick('services')}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left group"
                  >
                    <div className="p-2 bg-green-500/20 rounded-lg text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <Shield size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm block">Accessibility</span>
                      <span className="text-slate-300 text-xs">WCAG 2.1 AA compliance</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Portfolio Link */}
          <button
            onClick={() => handlePageClick('portfolio')}
            className={`flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-2 py-1 ${
              currentPage === 'portfolio' ? 'text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FolderOpen size={16} className="mr-1" />
            Portfolio
          </button>

          {/* Tools Dropdown */}
          <div className="relative" ref={toolsRef}>
            <button
              ref={toolsButtonRef}
              id="tools-button"
              onClick={() => {
                setIsToolsOpen(!isToolsOpen);
                setIsServicesOpen(false);
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
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="bg-brand-red hover:bg-red-500 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50 shadow-lg shadow-brand-red/20"
          >
            Let's Talk
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
            {/* Mobile Services Section */}
            <div className="space-y-3">
              <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                Services
              </span>
              <button
                onClick={() => handlePageClick('services')}
                className="w-full flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <GraduationCap size={18} className="text-brand-red" aria-hidden="true" />
                <div className="text-left">
                  <span className="text-white font-medium block">All Services</span>
                  <span className="text-slate-300 text-xs">eBooks, Videos, Courses & more</span>
                </div>
              </button>
              <button
                onClick={() => handlePageClick('portfolio')}
                className="w-full flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <FolderOpen size={18} className="text-brand-purple" aria-hidden="true" />
                <div className="text-left">
                  <span className="text-white font-medium block">Portfolio</span>
                  <span className="text-slate-300 text-xs">See our work</span>
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
                <Calculator size={18} className="text-brand-gold" aria-hidden="true" />
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
              href="#contact"
              className="bg-brand-red text-center text-white px-6 py-3 rounded-lg font-bold mt-4"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Let's Talk
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};