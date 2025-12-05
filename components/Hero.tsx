import React, { useEffect, useState } from 'react';

export const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - offsetY / 500);
  const scale = Math.max(0.8, 1 - offsetY / 2000);

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden perspective-[1000px]">
      {/* Background Universe */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_30%,#1a1a2e_0%,#050508_70%)]" />
      <div className="absolute inset-0 stars z-0" />

      {/* Orbit System */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-100"
        style={{ opacity, transform: `scale(${scale})` }}
        aria-hidden="true"
      >
        {/* Ring 1 */}
        <div className="absolute w-[350px] h-[350px] border border-white/5 rounded-full animate-spin-slow">
           <div className="absolute top-1/2 left-full -mt-[35px] -ml-[25px] w-[50px] h-[70px] bg-slate-100/10 backdrop-blur-sm border border-white/10 rounded shadow-lg orbit-obj-r1 flex flex-col p-1">
             <div className="h-2 w-full bg-red-500/80 mb-1 rounded-sm"></div>
             <div className="h-1 w-3/4 bg-slate-400/50 rounded-sm"></div>
           </div>
        </div>

        {/* Ring 2 */}
        <div className="absolute w-[550px] h-[550px] border border-white/5 rounded-full animate-spin-slower">
          <div className="absolute top-1/2 left-full -mt-[35px] -ml-[25px] w-[50px] h-[70px] bg-slate-100/10 backdrop-blur-sm border border-white/10 rounded shadow-lg orbit-obj-r2 flex flex-col p-1">
             <div className="h-2 w-full bg-blue-500/80 mb-1 rounded-sm"></div>
             <div className="h-1 w-full bg-slate-400/50 rounded-sm mb-1"></div>
             <div className="h-1 w-1/2 bg-slate-400/50 rounded-sm"></div>
           </div>
        </div>

        {/* Ring 3 */}
        <div className="absolute w-[750px] h-[750px] border border-white/5 rounded-full animate-spin-slowest">
          <div className="absolute top-1/2 left-full -mt-[35px] -ml-[25px] w-[50px] h-[70px] bg-slate-100/10 backdrop-blur-sm border border-white/10 rounded shadow-lg orbit-obj-r3 flex flex-col p-1">
             <div className="h-2 w-full bg-yellow-500/80 mb-1 rounded-sm"></div>
             <div className="grid grid-cols-2 gap-1 mt-1">
               <div className="h-6 bg-slate-400/20 rounded-sm"></div>
               <div className="h-6 bg-slate-400/20 rounded-sm"></div>
             </div>
           </div>
        </div>
      </div>

      {/* Hero Content */}
      <div 
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-[0_0_80px_rgba(255,255,255,0.2)]">
          TRANSFORMING<br />YOUR CONTENT<br />EXPERIENCE
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-slate-400 uppercase tracking-[0.2em] font-light">
          From Chaos to Intelligent Ecosystem
        </p>
      </div>
    </header>
  );
};