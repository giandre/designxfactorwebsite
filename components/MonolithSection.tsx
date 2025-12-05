import React, { useRef, useEffect, useState } from 'react';
import { ShieldCheck, Layout, Video, BrainCircuit, Activity, Smartphone, Sparkles, CheckCircle, FileText, Globe, Bot } from 'lucide-react';
import { LayerType } from '../types';

const layers = [
  {
    id: 1,
    type: LayerType.FOUNDATION,
    title: "Layer 01: Foundation",
    heading: "We capture chaos.",
    description: "Input raw files (PDFs, Legacy Data). We ingest, tag for WCAG 2.1 AA compliance, and enable deep usage analytics.",
    color: "text-brand-blue",
    border: "border-brand-blue",
    bg: "bg-brand-blue",
    hex: "#38bdf8",
    icon: <ShieldCheck size={32} />
  },
  {
    id: 2,
    type: LayerType.ENGAGEMENT,
    title: "Layer 02: Enhancement",
    heading: "We reshape experience.",
    description: "Static pages transform into responsive, mobile-first interactive cards with modern UI/UX design.",
    color: "text-brand-purple",
    border: "border-brand-purple",
    bg: "bg-brand-purple",
    hex: "#d946ef",
    icon: <Layout size={32} />
  },
  {
    id: 3,
    type: LayerType.MULTIMODAL,
    title: "Layer 03: Multimodal",
    heading: "We give it a voice.",
    description: "Automated generation of audio, video, and interactive formats to engage all senses.",
    color: "text-brand-gold",
    border: "border-brand-gold",
    bg: "bg-brand-gold",
    hex: "#f59e0b",
    icon: <Video size={32} />
  },
  {
    id: 4,
    type: LayerType.EMPOWERMENT,
    title: "Layer 04: Empowerment",
    heading: "We give it a brain.",
    description: "An AI Agent connects the dots, offering personalized learning paths and on-demand answers.",
    color: "text-brand-red",
    border: "border-brand-red",
    bg: "bg-brand-red",
    hex: "#ff4d6d",
    icon: <BrainCircuit size={32} />
  }
];

export const MonolithSection: React.FC = () => {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    triggerRefs.current.forEach((trigger, index) => {
      if (!trigger) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveLayerIndex(index);
            }
          });
        },
        { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
      );
      
      observer.observe(trigger);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <section className="relative z-20">
      {/* Mobile View (Card Stack) */}
      <div className="lg:hidden px-4 py-20 bg-space space-y-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">The Transformation Engine</h2>
        {layers.map((layer) => (
          <div key={layer.id} className={`p-6 rounded-2xl border ${layer.border} bg-white/5 backdrop-blur-md`}>
            <div className={`flex items-center gap-3 mb-4 ${layer.color}`}>
              {layer.icon}
              <span className="uppercase tracking-widest text-xs font-bold">{layer.title}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{layer.heading}</h3>
            <p className="text-slate-300 leading-relaxed">{layer.description}</p>
          </div>
        ))}
      </div>

      {/* Desktop View (Monolith Scroll) */}
      <div ref={containerRef} className="hidden lg:block h-[500vh] relative">
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-[1000px]">
          
          {/* The Monolith Device */}
          <div 
            className="relative w-[380px] h-[720px] transition-all duration-700 ease-out preserve-3d"
            style={{ 
              transform: `rotateY(${activeLayerIndex % 2 === 0 ? '15deg' : '-15deg'}) rotateX(5deg) translateZ(50px)` 
            }}
          >
            {/* Device Frame */}
            <div className="absolute inset-0 bg-space/90 border border-white/20 rounded-[45px] shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_0_40px_rgba(255,255,255,0.05)] backdrop-blur-xl overflow-hidden flex flex-col z-20 ring-1 ring-white/10">
              
              {/* Screen Area */}
              <div className="flex-1 relative m-3 bg-[#0a0a0f] rounded-[38px] overflow-hidden flex flex-col shadow-inner">
                
                {/* Status Bar */}
                <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-30 opacity-70">
                  <span className="text-xs font-medium text-white tracking-widest">DXF-OS</span>
                  <div className="flex gap-1.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                  </div>
                </div>

                {/* --- Layer 1: FOUNDATION (Scanner) --- */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${activeLayerIndex === 0 ? 'opacity-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                  <div className="relative w-48 h-64 border-2 border-slate-700/50 rounded-lg bg-slate-800/20 p-4 flex flex-col gap-3 overflow-hidden shadow-2xl">
                     {/* Document Skeleton */}
                     <div className="w-1/2 h-2 bg-slate-600/50 rounded"></div>
                     <div className="w-full h-32 bg-slate-700/30 rounded flex items-center justify-center">
                        <FileText size={40} className="text-slate-600" />
                     </div>
                     <div className="w-full h-2 bg-slate-600/50 rounded"></div>
                     <div className="w-3/4 h-2 bg-slate-600/50 rounded"></div>
                     
                     {/* Scanning Beam */}
                     <div className="absolute left-0 top-[-20%] w-full h-[20%] bg-brand-blue/20 blur-md animate-scan border-b-2 border-brand-blue shadow-[0_0_20px_#38bdf8]"></div>
                  </div>
                  
                  {/* Stats Card */}
                  <div className="mt-8 w-64 bg-slate-900/80 border border-brand-blue/30 rounded-xl p-4 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs text-brand-blue uppercase font-bold">Accessibility</span>
                       <span className="text-xs text-white font-mono">100%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-brand-blue w-full shadow-[0_0_10px_#38bdf8]"></div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-400">
                       <CheckCircle size={10} className="text-green-500" /> WCAG 2.1 AA Compliant
                    </div>
                  </div>
                </div>

                {/* --- Layer 2: ENGAGEMENT (Morphing UI) --- */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-700 ${activeLayerIndex === 1 ? 'opacity-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                   {/* Background Grid */}
                   <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                   
                   {/* Floating Cards */}
                   <div className="relative w-full max-w-[280px] perspective-[1000px]">
                      <div className="bg-gradient-to-br from-slate-800 to-black border border-white/10 rounded-2xl p-4 shadow-2xl mb-4 transform translate-x-2 translate-y-2 opacity-50 scale-95">
                         <div className="h-2 w-1/3 bg-white/20 rounded mb-2"></div>
                         <div className="h-20 bg-slate-700/30 rounded"></div>
                      </div>
                      
                      {/* Main Active Card */}
                      <div className="relative bg-space border border-brand-purple/50 rounded-2xl p-5 shadow-[0_20px_50px_rgba(217,70,239,0.15)] z-10 animate-float">
                         <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                               <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center">
                                  <Smartphone size={16} className="text-brand-purple" />
                               </div>
                               <div className="h-2 w-16 bg-white/20 rounded"></div>
                            </div>
                            <Globe size={16} className="text-slate-600" />
                         </div>
                         <div className="h-24 rounded-lg bg-gradient-to-r from-brand-purple/10 via-brand-purple/5 to-transparent border border-brand-purple/20 mb-3 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-brand-purple/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                         </div>
                         <div className="h-2 w-full bg-white/10 rounded mb-2"></div>
                         <div className="h-2 w-2/3 bg-white/10 rounded"></div>
                         
                         <button className="mt-4 w-full py-2 bg-brand-purple text-white text-xs font-bold rounded shadow-lg hover:bg-fuchsia-400 transition-colors">
                            START LEARNING
                         </button>
                      </div>
                   </div>
                </div>

                {/* --- Layer 3: MULTIMODAL (Audio/Video) --- */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${activeLayerIndex === 2 ? 'opacity-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                   <div className="relative w-40 h-40 flex items-center justify-center mb-10">
                      {/* Ripples */}
                      <div className="absolute inset-0 border border-brand-gold/30 rounded-full animate-[ping_3s_linear_infinite]"></div>
                      <div className="absolute inset-4 border border-brand-gold/50 rounded-full animate-[ping_3s_linear_infinite_0.5s]"></div>
                      
                      {/* Play Button */}
                      <div className="relative z-10 w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.6)]">
                         <Video size={32} className="text-black fill-current ml-1" />
                      </div>
                   </div>

                   {/* Audio Waveform */}
                   <div className="flex items-end justify-center gap-1.5 h-16 w-full px-12">
                      {[...Array(12)].map((_, i) => (
                        <div 
                           key={i} 
                           className="w-1.5 bg-gradient-to-t from-brand-gold to-yellow-200 rounded-full animate-wave"
                           style={{ 
                              height: '30%', 
                              animationDelay: `${Math.random() * -1}s`,
                              animationDuration: `${0.5 + Math.random() * 0.5}s` 
                           }}
                        ></div>
                      ))}
                   </div>
                   <div className="mt-6 font-mono text-xs text-brand-gold tracking-widest uppercase animate-pulse">
                      Generating Audio...
                   </div>
                </div>

                {/* --- Layer 4: EMPOWERMENT (AI Chat) --- */}
                <div className={`absolute inset-0 flex flex-col transition-all duration-700 ${activeLayerIndex === 3 ? 'opacity-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                   {/* Chat Header */}
                   <div className="mt-12 px-6 pb-4 border-b border-white/5">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center shadow-[0_0_15px_rgba(255,77,109,0.5)]">
                            <Bot size={20} className="text-white" />
                         </div>
                         <div>
                            <div className="text-sm font-bold text-white">AI Tutor</div>
                            <div className="text-[10px] text-green-400 flex items-center gap-1">
                               <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Chat Area */}
                   <div className="flex-1 p-6 space-y-4 overflow-hidden relative">
                      {/* User Msg */}
                      <div className="flex justify-end">
                         <div className="bg-slate-800 text-slate-200 text-xs py-2.5 px-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                            I'm struggling with Section 3.
                         </div>
                      </div>
                      
                      {/* AI Response */}
                      <div className="flex justify-start">
                         <div className="bg-gradient-to-br from-brand-red/90 to-rose-600 text-white text-xs py-3 px-4 rounded-2xl rounded-tl-sm max-w-[85%] shadow-lg">
                            <p className="mb-2">No problem! I've analyzed your quiz results.</p>
                            <div className="bg-black/20 rounded p-2 mb-2 border border-white/10">
                               <div className="flex items-center gap-2 mb-1">
                                  <Sparkles size={10} className="text-yellow-300" />
                                  <span className="font-bold text-[10px] uppercase opacity-80">Recommendation</span>
                               </div>
                               <div className="text-[10px] opacity-90 leading-relaxed">
                                  Review the "Interactive Compliance" module. It covers your weak spots.
                               </div>
                            </div>
                            <button className="bg-white text-brand-red text-[10px] font-bold py-1.5 px-3 rounded-full w-full hover:bg-slate-100 transition-colors">
                               Start Personalized Lesson
                            </button>
                         </div>
                      </div>
                   </div>
                   
                   {/* Input Area Placeholder */}
                   <div className="p-4 bg-slate-900/50 backdrop-blur border-t border-white/5 mx-3 mb-4 rounded-2xl flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center">
                         <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded w-full"></div>
                   </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Scroll Triggers */}
        <div className="absolute inset-0 pointer-events-none">
          {layers.map((layer, idx) => (
            <div 
              key={layer.id} 
              id={`trigger-${idx}`}
              // @ts-ignore
              ref={el => triggerRefs.current[idx] = el}
              className={`h-screen flex items-center ${idx % 2 === 0 ? 'justify-start pl-[8%] lg:pl-[12%]' : 'justify-end pr-[8%] lg:pr-[12%]'} pointer-events-auto`}
            >
              <div className={`max-w-md p-8 rounded-2xl transition-all duration-700 transform ${activeLayerIndex === idx ? 'opacity-100 translate-y-0 blur-0' : 'opacity-20 translate-y-10 blur-sm'}`}>
                <div className={`flex items-center gap-3 mb-6 ${layer.color}`}>
                   <span className="p-2 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                      {layer.icon}
                   </span>
                   <span className={`text-sm font-bold tracking-[0.2em] uppercase`}>{layer.title}</span>
                </div>
                <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-[0.9] tracking-tight">{layer.heading}</h2>
                <p className="text-lg text-slate-400 leading-relaxed border-l-2 border-white/10 pl-6">{layer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};