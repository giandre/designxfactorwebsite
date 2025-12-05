import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Layout, Video, Bot, ArrowRight, PlayCircle, Layers, Zap, MousePointer2 } from 'lucide-react';
import { ProductData } from '../types';

const products: ProductData[] = [
  {
    id: 1,
    name: "Learning Transformer",
    description: "The foundation. Seamlessly integrate compliance checking and analytics into your existing LMS.",
    icon: "ShieldCheck",
    color: "text-brand-blue",
    features: ["WCAG 2.1 Compliance", "Deep Analytics", "LMS Integration"]
  },
  {
    id: 2,
    name: "Catalyst Studio",
    description: "Transform dense technical manuals into beautiful, mobile-first learning cards.",
    icon: "Layout",
    color: "text-brand-purple",
    features: ["Drag & Drop Builder", "Responsive Output", "Asset Library"]
  },
  {
    id: 3,
    name: "Catalyst Course",
    description: "Generate podcasts and videos from text instantly using generative AI.",
    icon: "Video",
    color: "text-brand-gold",
    features: ["Text-to-Video", "Audio Synthesis", "Interactive Overlays"]
  },
  {
    id: 4,
    name: "Dynamic Platform",
    description: "The AI agent that adapts learning paths in real-time based on learner performance.",
    icon: "Bot",
    color: "text-brand-red",
    features: ["Personalized Paths", "AI Tutor", "Skill Gap Analysis"]
  }
];

export const ProductShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll Observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    // Only run observer on desktop/large screens where the layout is sticky
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

  const getIcon = (name: string, size = 24) => {
    switch(name) {
      case 'ShieldCheck': return <ShieldCheck size={size} />;
      case 'Layout': return <Layout size={size} />;
      case 'Video': return <Video size={size} />;
      case 'Bot': return <Bot size={size} />;
      default: return <ShieldCheck size={size} />;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleNavClick = (index: number) => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      const scrollPos = sectionTop + (index * window.innerHeight);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  const activeProduct = products.find(p => p.id === activeId) || products[0];

  return (
    <section 
      id="solutions" 
      ref={sectionRef} 
      className="relative bg-space border-t border-white/10 lg:h-[400vh]"
    >
      {/* Scroll Triggers (Desktop Only) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {products.map((_, idx) => (
          <div 
            key={idx} 
            // @ts-ignore
            ref={el => triggerRefs.current[idx] = el}
            className="h-[100vh] w-full" 
          />
        ))}
      </div>

      {/* Sticky Content Container */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex items-center py-20 lg:py-0">
        
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.05),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Navigation List */}
          <div className="lg:col-span-4 space-y-6">
            <div className="mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-white mb-2">Our Ecosystem</h2>
              <p className="text-slate-400 text-sm">Select a product or scroll to explore.</p>
            </div>
            
            <div className="space-y-3">
              {products.map((product, idx) => (
                <button
                  key={product.id}
                  onClick={() => handleNavClick(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-space focus-visible:ring-brand-blue
                    ${activeId === product.id 
                      ? 'bg-white/10 border-white/20 shadow-lg translate-x-2' 
                      : 'bg-transparent border-transparent hover:bg-white/5 opacity-60 hover:opacity-100'}`}
                >
                  <div className={`flex items-center gap-4 ${activeId === product.id ? product.color : 'text-slate-400 group-hover:text-white'}`}>
                    {getIcon(product.icon, 24)}
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
               className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[100px] opacity-20 transition-colors duration-700 ${activeProduct.color.replace('text-', 'bg-')}`}
             ></div>

             {/* The 3D Card */}
             <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out cursor-none"
                style={{
                  transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                  transformStyle: 'preserve-3d'
                }}
             >
                {/* Content Layer (Popped out) */}
                <div style={{ transform: 'translateZ(50px)' }}>
                  <div className={`inline-flex p-4 rounded-2xl bg-white/5 mb-8 border border-white/10 shadow-lg ${activeProduct.color} transition-colors duration-500`}>
                    {getIcon(activeProduct.icon, 48)}
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
                        <div key={i} className={`px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-sm text-slate-300 flex items-center gap-2`}>
                          <Zap size={14} className={activeProduct.color} /> {feat}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button className="group flex items-center gap-2 bg-white text-space px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30">
                      <PlayCircle size={20} className="group-hover:fill-current" /> Watch Demo
                    </button>
                    <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30">
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

             {/* Custom Cursor Hint (Desktop only) */}
             <div className="hidden lg:flex absolute bottom-10 right-10 text-slate-500 text-sm items-center gap-2 animate-pulse pointer-events-none">
               <MousePointer2 size={16} /> Hover to interact
             </div>

          </div>

        </div>
      </div>
    </section>
  );
};