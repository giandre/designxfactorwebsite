import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Layout, Video, Bot, ArrowRight, PlayCircle, Layers, Zap, MousePointer2, X } from 'lucide-react';
import { ProductData, PageView } from '../types';

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
    description: "The AI agent that adapts learning paths in real-time based on learner performance.",
    iconUrl: "https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/Didactaxwhitelines.png",
    bgColor: "#38bdf8",
    textHex: "#38bdf8",
    headerGradient: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
    features: ["Personalized Paths", "AI Tutor", "Skill Gap Analysis"],
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

  const getIcon = (product: typeof products[0], size = 24, className?: string) => {
    return (
      <img 
        src={product.iconUrl} 
        alt={`${product.name} Logo`}
        className={`${className} object-contain`}
        style={{
          width: size,
          height: size,
        }}
      />
    );
  };

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

  const closeVideo = () => {
    setShowVideo(false);
  };

  const handleLearnMore = () => {
    if (activeId === 1) {
      onNavigate('learning-transformer');
      window.scrollTo(0, 0);
    }
    // Future products can be added here
  };

  const activeProduct = products.find(p => p.id === activeId) || products[0];

  return (
    <section 
      id="solutions" 
      ref={sectionRef} 
      className="relative bg-space border-t border-white/10 lg:h-[400vh] pt-24 lg:pt-0"
      aria-label="Our Ecosystem Products"
    >
      {/* Video Modal */}
      {showVideo && activeProduct.videoId && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <div 
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeVideo}
              className="flex items-center justify-center ml-auto mb-3 p-2 bg-white/10 hover:bg-white/20 border-none rounded-full cursor-pointer text-white transition-colors"
              aria-label="Close video"
            >
              <X size={24} />
            </button>
            <div className="relative pt-[56.25%] rounded-xl overflow-hidden bg-black">
              <iframe
                className="absolute inset-0 w-full h-full border-none"
                src={`https://www.youtube.com/embed/${activeProduct.videoId}?autoplay=1&rel=0`}
                title={`${activeProduct.name} Demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.05),transparent_50%)] pointer-events-none"></div>

      {/* --- Mobile View (Segmented Control + Card) --- */}
      <div className="lg:hidden container mx-auto px-4 pb-20 relative z-10">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black text-white mb-1">Our Ecosystem</h2>
          <p className="text-slate-500 text-sm">Select a product</p>
        </div>

      {/* Segmented Control - 2x2 Grid for better mobile readability */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-2 bg-slate-900 border border-white/10 rounded-xl p-2">
          {products.map((product, idx) => {
            const isActive = activeId === product.id;
            return (
              <button
                key={product.id}
                onClick={() => handleNavClick(idx)}
                className="py-3 px-3 rounded-lg text-xs font-semibold transition-all border-none cursor-pointer flex items-center justify-center gap-2"
                style={{
                  backgroundColor: isActive ? product.bgColor : 'rgba(255,255,255,0.05)',
                  color: isActive ? 'white' : '#64748b',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                <img src={product.iconUrl} className="w-5 h-5 object-contain" alt="" />
                <span>{product.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

        {/* Product Card */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden">
          {/* Colored Header */}
          <div 
            className="p-4 flex items-center gap-3"
            style={{ background: activeProduct.headerGradient }}
          >
            <div className="p-2 bg-white/20 rounded-lg flex items-center justify-center text-white">
              {getIcon(activeProduct, 24)}
            </div>
            <h3 className="text-xl font-black text-white">{activeProduct.name}</h3>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="text-slate-300 text-sm leading-relaxed mb-5">{activeProduct.description}</p>

            {/* Features */}
            <div className="mb-6 space-y-3">
              {activeProduct.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${activeProduct.bgColor}33` }}
                  >
                    <Zap size={12} style={{ color: activeProduct.textHex }} />
                  </div>
                  <span className="text-sm text-slate-200">{feat}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <button 
              onClick={openVideo}
              disabled={!activeProduct.videoId}
              className="w-full py-3.5 font-bold rounded-xl border-none cursor-pointer flex items-center justify-center gap-2 mb-3 text-sm text-white transition-opacity"
              style={{
                backgroundColor: activeProduct.videoId ? activeProduct.bgColor : '#374151',
                opacity: activeProduct.videoId ? 1 : 0.6,
                cursor: activeProduct.videoId ? 'pointer' : 'not-allowed'
              }}
            >
              <PlayCircle size={18} /> 
              {activeProduct.videoId ? (activeProduct.videoLabel || 'Watch Demo') : 'Demo Coming Soon'}
            </button>
            
            <button 
              onClick={handleLearnMore}
              className="w-full py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-2 text-sm hover:bg-white/10 transition-colors"
            >
              Learn More <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>


      {/* --- Desktop View (Scroll Sticky) --- */}
      
      {/* Scroll Triggers (Desktop Only) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
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
              <h2 className="text-3xl font-bold text-white mb-2">Our Ecosystem</h2>
              <p className="text-slate-400 text-sm">Select a product or scroll to explore.</p>
            </div>
            
            <div className="space-y-3" role="tablist" aria-orientation="vertical">
              {products.map((product, idx) => (
                <button
                  key={product.id}
                  role="tab"
                  aria-selected={activeId === product.id}
                  onClick={() => setActiveId(product.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-space focus-visible:ring-brand-blue
                    ${activeId === product.id 
                      ? 'bg-white/10 border-white/20 shadow-lg translate-x-2' 
                      : 'bg-transparent border-transparent hover:bg-white/5 opacity-60 hover:opacity-100'}`}
                >
                  <div 
                    className={`flex items-center gap-4 ${activeId === product.id ? '' : 'text-slate-400 group-hover:text-white'}`}
                    style={{ color: activeId === product.id ? product.textHex : undefined }}
                  >
                    {getIcon(product, 24)}
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

          {/* 3D Stage Preview (Sticky on Desktop) */}
          <div className="lg:col-span-8 perspective-[1500px] min-h-[500px] flex items-center justify-center relative p-4 lg:p-8">
             
             {/* Ambient Glow behind card */}
             <div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[100px] opacity-20 transition-colors duration-700"
               style={{ backgroundColor: activeProduct.bgColor }}
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
                  cursor: 'default'
                }}
             >
                {/* Content Layer (Popped out) */}
                <div style={{ transform: 'translateZ(50px)' }}>
                  <div 
                    className="inline-flex p-4 rounded-2xl bg-white/5 mb-8 border border-white/10 shadow-lg transition-colors duration-500"
                    style={{ color: activeProduct.textHex }}
                  >
                    {getIcon(activeProduct, 48)}
                  </div>
                  
                  {/* Key prop ensures text animation re-triggers on change */}
                  <div key={activeProduct.id} className="animate-[pulse_0.5s_ease-out]">
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
                      {activeProduct.name}
                    </h3>
                    
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-lg">
                      {activeProduct.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                      {activeProduct.features.map((feat, i) => (
                        <div key={i} className="px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-sm text-slate-300 flex items-center gap-2">
                          <Zap size={14} style={{ color: activeProduct.textHex }} /> {feat}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={openVideo}
                      disabled={!activeProduct.videoId}
                      className="group flex items-center gap-2 bg-white text-space px-8 py-4 rounded-xl font-bold transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 hover:scale-105"
                    >
                      <PlayCircle size={20} className="group-hover:fill-current" /> 
                      {activeProduct.videoId ? (activeProduct.videoLabel || 'Watch Demo') : 'Demo Coming Soon'}
                    </button>
                    <button 
                      onClick={handleLearnMore}
                      className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                    >
                      Learn More <ArrowRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Decorative elements on the card surface */}
                <div className="absolute top-10 right-10 opacity-20" style={{ transform: 'translateZ(20px)' }}>
                   <Layers size={120} />
                </div>
                
                {/* Shine effect */}
                <div 
                  className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{ mixBlendMode: 'overlay' }}
                ></div>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
};