import React, { useEffect, useState, useMemo, useRef } from 'react';
import { FileText, FileType, Presentation, FileSpreadsheet, FileCode, Code } from 'lucide-react';

interface DocItem {
  id: number;
  x: number; // Starting X % (vw)
  y: number; // Starting Y % (vh)
  z: number; // Starting Z px
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scale: number;
  type: 'pdf' | 'doc' | 'ppt' | 'xls' | 'html';
  delay: number;
  floatDuration: number;
}

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate the "Document Cloud"
  const docs = useMemo<DocItem[]>(() => {
    return Array.from({ length: 32 }).map((_, i) => {
      const types: ('pdf' | 'doc' | 'ppt' | 'xls' | 'html')[] = ['pdf', 'doc', 'ppt', 'xls', 'html'];
      // Weight selection slightly away from xls/ppt to favor docs/pdfs/html
      const type = types[Math.floor(Math.random() * types.length)];
      
      // Distribute in a ring/disc pattern around the Z-axis for circular motion
      const angle = Math.random() * Math.PI * 2;
      
      // INCREASED RADIUS to create a larger "safe zone" around the text
      // We start further out so documents don't overlap the center text initially.
      const minRadius = 40; 
      const maxRadius = 85;
      const dist = minRadius + Math.random() * (maxRadius - minRadius);
      
      return {
        id: i,
        // Position relative to center
        x: Math.cos(angle) * dist, 
        y: Math.sin(angle) * dist, 
        // Bias Z towards negative (background) so they sit behind the text plane
        z: (Math.random() - 0.8) * 400, 
        rotateX: (Math.random() - 0.5) * 30,
        rotateY: (Math.random() - 0.5) * 30,
        rotateZ: (Math.random() - 0.5) * 10,
        scale: 0.6 + Math.random() * 0.4,
        type,
        delay: Math.random() * -5, 
        floatDuration: 5 + Math.random() * 5 
      };
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation Progress: 0 to 1 based on first 900px of scroll
  const scrollThreshold = 900;
  const progress = Math.min(Math.max(scrollY / scrollThreshold, 0), 1);
  
  // Opacity of the Hero Text
  const heroOpacity = 1 - Math.pow(progress, 2);

  // Helper to render the specific file look
  const renderFileIcon = (type: string) => {
    switch(type) {
      case 'pdf': return { icon: <FileType size={20} className="text-red-500" />, color: 'bg-red-500', label: 'PDF' };
      case 'doc': return { icon: <FileText size={20} className="text-blue-500" />, color: 'bg-blue-500', label: 'DOCX' };
      case 'ppt': return { icon: <Presentation size={20} className="text-orange-500" />, color: 'bg-orange-500', label: 'PPTX' };
      case 'xls': return { icon: <FileSpreadsheet size={20} className="text-green-500" />, color: 'bg-green-500', label: 'XLSX' };
      case 'html': return { icon: <Code size={20} className="text-orange-600" />, color: 'bg-orange-600', label: 'HTML' };
      default: return { icon: <FileText size={20} className="text-slate-500" />, color: 'bg-slate-500', label: 'FILE' };
    }
  };

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-space">
      <style>{`
        /* Clockwise Orbit around Z-axis */
        @keyframes orbit-z {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }
        /* Counter-rotation to keep items upright */
        @keyframes counter-orbit-z {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(-360deg); }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>

      {/* Sticky Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center perspective-[1200px]">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0a0a15] to-[#050508] opacity-90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[80px] animate-pulse-slow" />

        {/* 
          3D Universe Container 
          - Rotating around Z-axis (Clockwise)
          - Very slow (120s)
          - pointer-events-none ensures they don't block text selection
        */}
        <div 
          className="absolute inset-0 preserve-3d pointer-events-none"
          style={{ animation: 'orbit-z 120s linear infinite' }}
        >
          {docs.map((doc) => {
            // Physics Engine:
            // 1. Ingestion: Move from starting (x,y,z) to (0,0,0) based on scroll progress
            const moveProgress = Math.pow(progress, 0.8);
            
            const currentX = doc.x * (1 - moveProgress);
            const currentY = doc.y * (1 - moveProgress);
            const currentZ = doc.z * (1 - moveProgress);
            
            // 2. Scale: Shrink down to 0 as they enter the singularity
            const currentScale = doc.scale * (1 - moveProgress); 
            
            // 3. Spin: Tumble faster as they get sucked in
            const spin = progress * 720; // 2 spins during ingestion

            // 4. Opacity: Fade out FASTER as they approach center to prevent text overlap
            // They will be invisible by the time they hit the text area (progress > 0.7)
            const opacity = Math.max(0, 1 - Math.pow(progress * 1.4, 3));

            const style = renderFileIcon(doc.type);

            return (
              <div
                key={doc.id}
                className="absolute top-1/2 left-1/2 w-[100px] h-[140px] will-change-transform"
                style={{
                  transform: `
                    translate3d(calc(-50% + ${currentX}vw), calc(-50% + ${currentY}vh), ${currentZ}px)
                    scale(${currentScale})
                  `,
                  opacity: opacity,
                }}
              >
                {/* 
                  Counter-Orbit Wrapper:
                  - Rotates counter-clockwise to keep the document upright 
                    while the universe rotates clockwise.
                */}
                <div style={{ 
                    animation: 'counter-orbit-z 120s linear infinite',
                    width: '100%', height: '100%' 
                }}>
                    {/* Tumble & Tilt Wrapper */}
                    <div style={{
                        transform: `
                            rotateX(${doc.rotateX + spin}deg) 
                            rotateY(${doc.rotateY + spin}deg) 
                            rotateZ(${doc.rotateZ}deg)
                        `,
                        width: '100%', height: '100%',
                        transformStyle: 'preserve-3d'
                    }}>
                        {/* Inner Float Animation */}
                        <div 
                           className="w-full h-full"
                           style={{ 
                             animation: `float-y ${doc.floatDuration}s ease-in-out infinite`,
                             animationDelay: `${doc.delay}s`
                           }}
                        >
                          {/* File Card UI */}
                          <div className="w-full h-full bg-slate-100/95 backdrop-blur-sm rounded-md shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-white/20">
                            {/* Colored Header */}
                            <div className={`h-2.5 w-full ${style.color}`} />
                            
                            {/* Content Mockup */}
                            <div className="p-2.5 flex-1 flex flex-col gap-1.5 bg-gradient-to-b from-white to-slate-50">
                              <div className="flex justify-between items-center mb-1">
                                  {style.icon}
                                  <span className="text-[8px] font-bold text-slate-400 tracking-wider">{style.label}</span>
                              </div>
                              
                              {/* Content Lines */}
                              <div className="space-y-1.5 opacity-60">
                                 {doc.type === 'html' ? (
                                   <>
                                     <div className="h-1 w-full bg-orange-200 rounded-sm" />
                                     <div className="h-1 w-3/4 bg-slate-200 rounded-sm ml-2" />
                                     <div className="h-1 w-1/2 bg-slate-200 rounded-sm ml-2" />
                                     <div className="h-1 w-full bg-slate-200 rounded-sm" />
                                   </>
                                 ) : (
                                   <>
                                     <div className="h-1 w-full bg-slate-300 rounded-sm" />
                                     <div className="h-1 w-5/6 bg-slate-200 rounded-sm" />
                                     <div className="h-1 w-full bg-slate-200 rounded-sm" />
                                     <div className="h-1 w-4/5 bg-slate-200 rounded-sm" />
                                   </>
                                 )}
                              </div>
                              
                              {/* Footer/Image Area */}
                              <div className="mt-auto h-8 w-full bg-slate-100 rounded border border-slate-200 flex items-center justify-center opacity-50">
                                  {doc.type === 'html' ? (
                                     <div className="text-[6px] font-mono text-orange-400">&lt;/&gt;</div>
                                  ) : (
                                     <div className="h-full w-full bg-slate-200/50" />
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Text */}
        <div 
          className="relative z-20 text-center max-w-5xl px-6 transition-all duration-300"
          style={{ 
            opacity: heroOpacity,
            transform: `scale(${1 + progress * 0.2})`, 
            filter: `blur(${progress * 10}px)` 
          }}
        >
          {/* Glow behind text */}
          <div className="absolute inset-0 bg-brand-blue/5 blur-[60px] -z-10 rounded-full"></div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter mb-8 drop-shadow-2xl">
            Transforming Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-white to-brand-purple">
              Content Experience
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Turn your static documents into an intelligent, accessible, and interactive ecosystem.
          </p>

          <div className="flex flex-col items-center gap-4 animate-bounce-slow opacity-60">
             <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Scroll to Ingest Content</span>
             <div className="w-px h-12 bg-gradient-to-b from-brand-blue to-transparent"></div>
          </div>
        </div>

      </div>
    </div>
  );
};