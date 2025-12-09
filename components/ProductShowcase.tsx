import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, PlayCircle, Layers, Zap, X } from 'lucide-react';
import { PageView } from '../types';

const products = [
  {
    id: 1,
    name: "Learning Transformer",
    shortName: "Transformer",
    description: "The foundation. Seamlessly integrate compliance checking and analytics into your existing LMS.",
    iconUrl: "https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/LT-WhiteLine.png",
    bgColor: "#c73e4a",
    textHex: "#c73e4a",
    headerGradient: "linear-gradient(135deg, #1e3a5f 0%, #c73e4a 100%)",
    features: ["WCAG 2.1 Compliance", "Deep Analytics", "LMS Integration"],
    videoId: "I5ib4qt6nDQ",
    videoLabel: "Watch Promo"
  },
  {
    id: 2,
    name: "Catalyst Studio",
    shortName: "Studio",
    description: "Transform dense technical manuals into beautiful, mobile-first learning cards.",
    iconUrl: "https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/Catalyst_Studio_logo-whline.png",
    bgColor: "#1e3a5f",
    textHex: "#1e3a5f",
    headerGradient: "linear-gradient(135deg, #1e3a5f 0%, #9e4a5d 100%)",
    features: ["Drag & Drop Builder", "Responsive Output", "Asset Library"],
    videoId: null,
    videoLabel: "Watch Demo"
  },
  {
    id: 3,
    name: "Catalyst Architect",
    shortName: "Architect",
    description: "Generate podcasts and videos from text instantly using generative AI.",
    iconUrl: "https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/C2Alinewhite2.png",
    bgColor: "#8b3d4d",
    textHex: "#8b3d4d",
    headerGradient: "linear-gradient(135deg, #8b3d4d 0%, #c73e4a 100%)",
    features: ["Text-to-Video", "Audio Synthesis", "Interactive Overlays"],
    videoId: null,
    videoLabel: "Watch Demo"
  },
  {
    id: 4,
    name: "DidactaX",
    shortName: "DidactaX",
    description: "Transform your corporate training content into interactive video and audio experiences.",
    iconUrl: "https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/Didactaxwhitelines.png",
    bgColor: "#38bdf8",
    textHex: "#38bdf8",
    headerGradient: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
    features: ["Personalized Experience", "AI Tutor", "Knowledge Check Analysis"],
    videoId: null,
    videoLabel: "Watch Demo"
  }
];

interface ProductShowcaseProps {
  onNavigate: (page: PageView) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onNavigate }) => {
  const [activeId, setActiveId] = useState<number>(1);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [showVideo, setShowVideo] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap for modal
  useEffect(() => {
    if (!showVideo || !modalRef.current) return;

    // Store previous focus
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus close button
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeVideo();
      }

      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), iframe'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showVideo]);

  // Scroll Observer (Desktop Only)
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    if (window.matchMedia("(min-width: 1024px)").matches) {
      triggerRefs.current.forEach((trigger, index) => {
        if (!trigger) return;
        
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveId(products[index].id);
              }
            });
          },
          { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
        );
        
        observer.observe(trigger);
        observers.push(observer);
      });
    }

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleNavClick = (index: number) => {
    if (sectionRef.current && window.innerWidth >= 1024) {
      const sectionTop = sectionRef.current.offsetTop;
      const scrollPos = sectionTop + (index * window.innerHeight);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    } else {
      setActiveId(products[index].id);
    }
  };

  const openVideo = () => {
    const product = products.find(p => p.id === activeId);
    if (product?.videoId) {
      setShowVideo(true);
    }
  };

  const closeVideo = useCallback(() => {
    setShowVideo(false);
    // Restore focus
    previousFocusRef.current?.focus();
  }, []);

  const handleLearnMore = () => {
    if (activeId === 1) {
      onNavigate('learning-transformer');
      window.scrollTo(0, 0);
    }
  };

  const activeProduct = products.find(p => p.id === activeId) || products[0];

  return (
    <section 
      id="solutions" 
      ref={sectionRef} 
      className="relative bg-space border-t border-white/10 lg:h-[400vh] pt-24 lg:pt-0 scroll-mt-24"
      aria-labelledby="solutions-heading"
    >
      <h2 id="solutions-heading" className="sr-only">Our Product Ecosystem</h2>

      {/* Video Modal */}
      {showVideo && activeProduct.videoId && (
        <div 
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <div 
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="video-modal-title" className="sr-only">
              {activeProduct.name} Demo Video
            </h3>
            <button 
              ref={closeButtonRef}
              onClick={closeVideo}
              className="flex items-center justify-center ml-auto mb-3 p-2 bg-white/10 hover:bg-white/20 border-none rounded-full cursor-pointer text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close video"
            >
              <X size={24} aria-hidden="true" />
            </button>
            <div className="relative pt-[56.25%] rounded-xl overflow-hidden bg-black">
              <iframe
                className="absolute inset-0 w-full h-full border-none"
                src={`https://www.youtube.com/embed/${activeProduct.videoId}?autoplay=1&rel=0`}
                title={`${activeProduct.name} Demo Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.05),transparent_50%)] pointer-events-none" aria-hidden="true"></div>

      {/* --- Mobile View --- */}
      <div className="lg:hidden container mx-auto px-4 pb-20 relative z-10">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-black text-white mb-1">Our Ecosystem</h3>
          <p className="text-slate-400 text-sm">Select a product</p>
        </div>

        {/* Segmented Control */}
        <div className="mb-6">
          <div 
            role="tablist" 
            aria-label="Product selection"
            className="grid grid-cols-2 gap-2 bg-slate-900 border border-white/10 rounded-xl p-2"
          >
            {products.map((product, idx) => {
              const isActive = activeId === product.id;
              return (
                <button
                  key={product.id}
                  role="tab"
                  id={`tab-${product.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${product.id}`}
                  onClick={() => handleNavClick(idx)}
                  className="py-3 px-3 rounded-lg text-xs font-semibold transition-all border-none cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  style={{
                    backgroundColor: isActive ? product.bgColor : 'rgba(255,255,255,0.05)',
                    color: isActive ? 'white' : '#94a3b8',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'
                  }}
                >
                  <img src={product.iconUrl} className="w-5 h-5 object-contain" alt="" aria-hidden="true" />
                  <span>{product.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Card */}
        <div 
          id={`panel-${activeProduct.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeProduct.id}`}
          className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Colored Header */}
          <div 
            className="p-4 flex items-center gap-3"
            style={{ background: activeProduct.headerGradient }}
          >
            <div className="p-2 bg-white/20 rounded-lg flex items-center justify-center text-white">
              <img src={activeProduct.iconUrl} alt="" className="w-6 h-6 object-contain" aria-hidden="true" />
            </div>
            <h4 className="text-xl font-black text-white">{activeProduct.name}</h4>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="text-slate-300 text-sm leading-relaxed mb-5">{activeProduct.description}</p>

            {/* Features */}
            <ul className="mb-6 space-y-3" aria-label={`${activeProduct.name} features`}>
              {activeProduct.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${activeProduct.bgColor}33` }}
                    aria-hidden="true"
                  >
                    <Zap size={12} style={{ color: activeProduct.textHex }} />
                  </div>
                  <span className="text-sm text-slate-200">{feat}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <button 
              onClick={openVideo}
              disabled={!activeProduct.videoId}
              aria-disabled={!activeProduct.videoId}
              className="w-full py-3.5 font-bold rounded-xl border-none cursor-pointer flex items-center justify-center gap-2 mb-3 text-sm text-white transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              style={{
                backgroundColor: activeProduct.videoId ? activeProduct.bgColor : '#374151',
                opacity: activeProduct.videoId ? 1 : 0.6,
                cursor: activeProduct.videoId ? 'pointer' : 'not-allowed'
              }}
            >
              <PlayCircle size={18} aria-hidden="true" /> 
              {activeProduct.videoId ? (activeProduct.videoLabel || 'Watch Demo') : 'Demo Coming Soon'}
            </button>
            
            <button 
              onClick={handleLearnMore}
              className="w-full py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-2 text-sm hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Learn More <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Desktop View --- */}
      
      {/* Scroll Triggers */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden="true">
        {products.map((_, idx) => (
          <div 
            key={idx} 
            ref={el => { triggerRefs.current[idx] = el; }}
            className="h-[100vh] w-full" 
          />
        ))}
      </div>

      <div className="hidden lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden lg:flex items-center py-20 lg:py-0">
        
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Navigation List */}
          <div className="lg:col-span-4 space-y-6">
            <div className="mb-8 lg:mb-0">
              <h3 className="text-3xl font-bold text-white mb-2">Our Ecosystem</h3>
              <p className="text-slate-300 text-sm">Select a product or scroll to explore.</p>
            </div>
            
            <div role="tablist" aria-orientation="vertical" aria-label="Product navigation" className="space-y-3">
              {products.map((product, idx) => (
                <button
                  key={product.id}
                  role="tab"
                  id={`desktop-tab-${product.id}`}
                  aria-selected={activeId === product.id}
                  aria-controls={`desktop-panel-${product.id}`}
                  onClick={() => setActiveId(product.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-space focus-visible:ring-brand-blue
                    ${activeId === product.id 
                      ? 'bg-white/10 border-white/20 shadow-lg translate-x-2' 
                      : 'bg-transparent border-transparent hover:bg-white/5 opacity-60 hover:opacity-100'}`}
                >
                  <div 
                    className={`flex items-center gap-4 ${activeId === product.id ? '' : 'text-slate-300 group-hover:text-white'}`}
                    style={{ color: activeId === product.id ? product.textHex : undefined }}
                  >
                    <img src={product.iconUrl} alt="" className="w-6 h-6 object-contain" aria-hidden="true" />
                    <div>
                      <span className="font-bold text-base block">{product.name}</span>
                      {activeId === product.id && (
                        <span className="text-xs text-slate-300 font-normal hidden lg:block">Viewing</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3D Stage Preview */}
          <div 
            className="lg:col-span-8 perspective-[1500px] min-h-[500px] flex items-center justify-center relative p-4 lg:p-8"
            id={`desktop-panel-${activeProduct.id}`}
            role="tabpanel"
            aria-labelledby={`desktop-tab-${activeProduct.id}`}
          >
            {/* Ambient Glow */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[100px] opacity-20 transition-colors duration-700"
              style={{ backgroundColor: activeProduct.bgColor }}
              aria-hidden="true"
            ></div>

            {/* The 3D Card */}
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Content Layer */}
              <div style={{ transform: 'translateZ(50px)' }}>
                <div 
                  className="inline-flex p-4 rounded-2xl bg-white/5 mb-8 border border-white/10 shadow-lg transition-colors duration-500"
                  style={{ color: activeProduct.textHex }}
                >
                  <img src={activeProduct.iconUrl} alt="" className="w-12 h-12 object-contain" aria-hidden="true" />
                </div>
                
                <div key={activeProduct.id}>
                  <h4 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
                    {activeProduct.name}
                  </h4>
                  
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-lg">
                    {activeProduct.description}
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12" aria-label={`${activeProduct.name} features`}>
                    {activeProduct.features.map((feat, i) => (
                      <li key={i} className="px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-sm text-slate-300 flex items-center gap-2">
                        <Zap size={14} style={{ color: activeProduct.textHex }} aria-hidden="true" /> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={openVideo}
                    disabled={!activeProduct.videoId}
                    aria-disabled={!activeProduct.videoId}
                    className="group flex items-center gap-2 bg-white text-space px-8 py-4 rounded-xl font-bold transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 hover:scale-105"
                  >
                    <PlayCircle size={20} className="group-hover:fill-current" aria-hidden="true" /> 
                    {activeProduct.videoId ? (activeProduct.videoLabel || 'Watch Demo') : 'Demo Coming Soon'}
                  </button>
                  <button 
                    onClick={handleLearnMore}
                    className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                  >
                    Learn More <ArrowRight size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-10 right-10 opacity-20" style={{ transform: 'translateZ(20px)' }} aria-hidden="true">
                <Layers size={120} />
              </div>
              
              {/* Shine effect */}
              <div 
                className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{ mixBlendMode: 'overlay' }}
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};