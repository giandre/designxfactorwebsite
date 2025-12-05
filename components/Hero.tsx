import React, { useEffect, useState, useMemo, useRef } from 'react';
import { FileText, FileType, Presentation, FileSpreadsheet, FileCode, Files } from 'lucide-react';

interface DocItem {
  id: number;
  x: number; // Starting X %
  y: number; // Starting Y %
  z: number; // Starting Z px
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scale: number;
  type: 'pdf' | 'doc' | 'ppt' | 'xls';
  delay: number;
}

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate the "Document Cloud"
  const docs = useMemo<DocItem[]>(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const types: ('pdf' | 'doc' | 'ppt' | 'xls')[] = ['pdf', 'doc', 'ppt', 'xls'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      // Distribute randomly but avoid the very center where text is initially
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * 60; // 30% to 90% distance from center
      
      return {
        id: i,
        x: Math.cos(angle) * radius, // % from center
        y: Math.sin(angle) * radius, // % from center
        z: (Math.random() - 0.5) * 800, // Depth
        rotateX: (Math.random() - 0.5) * 60,
        rotateY: (Math.random() - 0.5) * 60,
        rotateZ: (Math.random() - 0.5) * 45,
        scale: 0.6 + Math.random() * 0.5,
        type,
        delay: Math.random() * 0.5
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

  // Animation Progress: 0 to 1 based on first 800px of scroll
  const scrollThreshold = 800;
  const progress = Math.min(Math.max(scrollY / scrollThreshold, 0), 1);
  
  // Opacity of the Hero Text (fades out slightly at the very end to let Monolith take over)
  const heroOpacity = 1 - Math.pow(progress, 4);

  // Helper to render the specific file look
  const renderFileIcon = (type: string) => {
    switch(type) {
      case 'pdf': return { icon: <FileType size={24} className="text-red-500" />, color: 'bg-red-500', label: 'PDF' };
      case 'doc': return { icon: <FileText size={24} className="text-blue-500" />, color: 'bg-blue-500', label: 'DOCX' };
      case 'ppt': return { icon: <Presentation size={24} className="text-orange-500" />, color: 'bg-orange-500', label: 'PPTX' };
      case 'xls': return { icon: <FileSpreadsheet size={24} className="text-green-500" />, color: 'bg-green-500', label: 'XLSX' };
      default: return { icon: <FileCode size={24} className="text-slate-500" />, color: 'bg-slate-500', label: 'FILE' };
    }
  };

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-space">
      {/* Sticky Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center perspective-[1200px]">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-space via-[#0a0a15] to-space opacity-80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[100px] animate-pulse-slow" />

        {/* Floating Documents Layer */}
        <div className="absolute inset-0 preserve-3d">
          {docs.map((doc) => {
            // Physics:
            // At progress 0: They are at their start (x,y,z) positions floating.
            // At progress 1: They converge to (0,0,0) - the center of screen.
            
            // Non-linear easing for "sucking" effect (starts slow, speeds up)
            const moveProgress = Math.pow(progress, 0.8);
            
            const currentX = doc.x * (1 - moveProgress);
            const currentY = doc.y * (1 - moveProgress);
            const currentZ = doc.z * (1 - moveProgress);
            
            // As they get close, they scale down to 0 and spin faster
            const currentScale = doc.scale * (1 - progress); 
            const spin = progress * 720; // 2 full spins while entering

            // Fade out at the very end so they don't just "pop"
            const opacity = 1 - Math.pow(progress, 6);

            const style = renderFileIcon(doc.type);

            return (
              <div
                key={doc.id}
                className="absolute top-1/2 left-1/2 w-[120px] h-[160px] will-change-transform"
                style={{
                  transform: `
                    translate3d(calc(-50% + ${currentX}vw), calc(-50% + ${currentY}vh), ${currentZ}px)
                    rotateX(${doc.rotateX + spin}deg)
                    rotateY(${doc.rotateY + spin}deg)
                    rotateZ(${doc.rotateZ}deg)
                    scale(${currentScale})
                  `,
                  opacity: opacity,
                }}
              >
                {/* File Card UI */}
                <div className="w-full h-full bg-slate-100 rounded-lg shadow-2xl overflow-hidden flex flex-col border border-slate-300 relative group">
                  {/* Colored Header */}
                  <div className={`h-3 w-full ${style.color} opacity-80`} />
                  
                  {/* Content Mockup */}
                  <div className="p-3 flex-1 flex flex-col gap-2 bg-gradient-to-b from-white to-slate-50">
                     <div className="flex justify-between items-center mb-2">
                        {style.icon}
                        <span className="text-[10px] font-bold text-slate-400">{style.label}</span>
                     </div>
                     
                     {/* Skeleton Lines */}
                     <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                     <div className="h-1.5 w-3/4 bg-slate-200 rounded-full" />
                     <div className="h-1.5 w-5/6 bg-slate-200 rounded-full" />
                     <div className="h-1.5 w-full bg-slate-200 rounded-full mt-2" />
                     
                     {/* Mini Image placeholder */}
                     <div className="mt-auto h-12 w-full bg-slate-100 rounded border border-slate-200/50 flex items-center justify-center">
                        <Files size={16} className="text-slate-300" />
                     </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Text */}
        <div 
          className="relative z-10 text-center max-w-4xl px-6 transition-all duration-300"
          style={{ opacity: heroOpacity }}
        >
          {/* Subtle glow behind text to ensure readability against flying files */}
          <div className="absolute inset-0 bg-space/60 blur-3xl -z-10 rounded-full"></div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 drop-shadow-2xl">
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
