import React, { useRef, useEffect, useState } from 'react';
import { ShieldCheck, Layout, Video, BrainCircuit, CheckCircle, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { LayerType, NavProps } from '../types';

const layers = [
  {
    id: 1,
    type: LayerType.FOUNDATION,
    title: "Step 01: Analyze",
    heading: "We study your content.",
    description: "We audit your existing materials — PDFs, manuals, training docs — and create a transformation roadmap tailored to your goals.",
    color: "text-brand-blue",
    border: "border-brand-blue",
    bg: "bg-brand-blue",
    hex: "#38bdf8",
    icon: <ShieldCheck size={20} aria-hidden="true" />,
    screenDescription: "Document scanning animation showing content analysis with insights: topics identified, video opportunities, and quiz integration points"
  },
  {
    id: 2,
    type: LayerType.ENGAGEMENT,
    title: "Step 02: Design",
    heading: "We craft the experience.",
    description: "Our instructional designers create engaging, accessible learning journeys with modern UI/UX that works on any device.",
    color: "text-brand-purple",
    border: "border-brand-purple",
    bg: "bg-brand-purple",
    hex: "#d946ef",
    icon: <Layout size={20} aria-hidden="true" />,
    screenDescription: "Landing page wireframe being designed with header navigation, hero section with call-to-action buttons, and feature cards"
  },
  {
    id: 3,
    type: LayerType.MULTIMODAL,
    title: "Step 03: Produce",
    heading: "We bring it to life.",
    description: "We transform your content into multiple formats — eBooks, videos, podcasts, interactive modules — whatever your learners need.",
    color: "text-brand-gold",
    border: "border-brand-gold",
    bg: "bg-brand-gold",
    hex: "#f59e0b",
    icon: <Video size={20} aria-hidden="true" />,
    screenDescription: "Media generation interface with play button and audio waveform visualization showing content being converted to video and audio"
  },
  {
    id: 4,
    type: LayerType.EMPOWERMENT,
    title: "Step 04: Deliver",
    heading: "We launch your learning.",
    description: "We deliver LMS-ready packages with built-in analytics, knowledge checks, and optional AI tutoring for personalized learning paths.",
    color: "text-brand-red",
    border: "border-brand-red",
    bg: "bg-brand-red",
    hex: "#ff4d6d",
    icon: <BrainCircuit size={20} aria-hidden="true" />,
    screenDescription: "Course wireframe showing learning modules with progress tracking, completion status, and LMS Ready badge"
  }
];

// ============ MOBILE Screen Components ============

// Step 1: Analyze - Shows content being scanned with insights discovered
const MobileScreenLayer1 = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
    <div className="relative w-24 h-32 border-2 border-slate-700/50 rounded-lg bg-slate-800/20 p-2 flex flex-col gap-2 overflow-hidden shadow-xl">
      <div className="w-1/2 h-1.5 bg-slate-600/50 rounded"></div>
      <div className="w-full h-14 bg-slate-700/30 rounded flex items-center justify-center">
        <FileText size={20} className="text-slate-600" />
      </div>
      <div className="w-full h-1.5 bg-slate-600/50 rounded"></div>
      <div className="w-3/4 h-1.5 bg-slate-600/50 rounded"></div>
      <div className="absolute left-0 top-[-20%] w-full h-[20%] bg-brand-blue/20 blur-md animate-scan border-b-2 border-brand-blue"></div>
    </div>
    <div className="mt-3 w-36 bg-slate-900/80 border border-brand-blue/30 rounded-lg p-2 backdrop-blur-md">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[8px] text-brand-blue uppercase font-bold">Analysis</span>
        <span className="text-[8px] text-white font-mono">Complete</span>
      </div>
      <div className="space-y-1 mt-2">
        <div className="flex items-center gap-1 text-[7px] text-slate-300">
          <CheckCircle size={7} className="text-green-500" /> 12 Topics Found
        </div>
        <div className="flex items-center gap-1 text-[7px] text-slate-300">
          <CheckCircle size={7} className="text-green-500" /> 3 Video Opps
        </div>
        <div className="flex items-center gap-1 text-[7px] text-slate-300">
          <CheckCircle size={7} className="text-brand-blue" /> Ready to Design
        </div>
      </div>
    </div>
  </div>
);

// Step 2: Design - Shows a beautiful landing page being crafted
const MobileScreenLayer2 = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
    {/* Mini landing page preview */}
    <div className="relative w-36 bg-slate-900 border border-brand-purple/40 rounded-xl overflow-hidden shadow-xl animate-float">
      {/* Header */}
      <div className="h-8 bg-gradient-to-r from-brand-purple/30 to-brand-blue/20 flex items-center px-2 gap-1">
        <div className="w-4 h-4 rounded bg-white/20"></div>
        <div className="flex-1"></div>
        <div className="w-6 h-1.5 bg-white/20 rounded"></div>
        <div className="w-6 h-1.5 bg-white/20 rounded"></div>
      </div>
      {/* Hero section */}
      <div className="p-2">
        <div className="h-1.5 w-3/4 bg-white/30 rounded mb-1"></div>
        <div className="h-1 w-1/2 bg-white/15 rounded mb-2"></div>
        <div className="w-10 h-4 bg-brand-purple rounded text-[6px] text-white flex items-center justify-center font-bold">START</div>
      </div>
      {/* Cards section */}
      <div className="px-2 pb-2 grid grid-cols-3 gap-1">
        <div className="h-10 bg-white/5 rounded border border-white/10"></div>
        <div className="h-10 bg-white/5 rounded border border-white/10"></div>
        <div className="h-10 bg-white/5 rounded border border-white/10"></div>
      </div>
    </div>
    {/* Design label */}
    <div className="mt-3 flex items-center gap-2">
      <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse"></div>
      <span className="text-[8px] text-brand-purple font-bold uppercase tracking-wider">Designing Experience</span>
    </div>
  </div>
);

// Step 3: Produce - Shows media being generated (keep similar)
const MobileScreenLayer3 = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
    <div className="relative w-20 h-20 flex items-center justify-center mb-4">
      <div className="absolute inset-0 border border-brand-gold/30 rounded-full animate-ping"></div>
      <div className="relative z-10 w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center shadow-lg">
        <Video size={20} className="text-black fill-current ml-0.5" />
      </div>
    </div>
    <div className="flex items-end justify-center gap-1 h-10 w-full px-6">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="w-1 bg-gradient-to-t from-brand-gold to-yellow-200 rounded-full animate-wave" style={{ height: '30%' }}></div>
      ))}
    </div>
    <div className="mt-3 font-mono text-[8px] text-brand-gold tracking-widest uppercase animate-pulse">Producing Content...</div>
  </div>
);

// Step 4: Deliver - Shows a course wireframe/LMS layout
const MobileScreenLayer4 = () => (
  <div className="absolute inset-0 flex flex-col p-2">
    {/* Course header */}
    <div className="mt-4 px-2 pb-2 border-b border-white/10">
      <div className="text-[9px] font-bold text-white mb-1">Your Course</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-brand-red rounded-full"></div>
        </div>
        <span className="text-[7px] text-slate-400">75%</span>
      </div>
    </div>
    {/* Module list */}
    <div className="flex-1 p-2 space-y-1.5 overflow-hidden">
      <div className="flex items-center gap-2 p-1.5 bg-brand-red/20 rounded border border-brand-red/30">
        <div className="w-4 h-4 rounded bg-brand-red flex items-center justify-center">
          <CheckCircle size={8} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="text-[7px] font-bold text-white">Module 1</div>
          <div className="text-[6px] text-slate-400">Complete</div>
        </div>
      </div>
      <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded border border-white/10">
        <div className="w-4 h-4 rounded bg-slate-700 flex items-center justify-center">
          <span className="text-[7px] text-white font-bold">2</span>
        </div>
        <div className="flex-1">
          <div className="text-[7px] font-bold text-white">Module 2</div>
          <div className="text-[6px] text-slate-400">In Progress</div>
        </div>
      </div>
      <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded border border-white/10 opacity-60">
        <div className="w-4 h-4 rounded bg-slate-700 flex items-center justify-center">
          <span className="text-[7px] text-slate-400 font-bold">3</span>
        </div>
        <div className="flex-1">
          <div className="text-[7px] text-slate-400">Module 3</div>
          <div className="text-[6px] text-slate-500">Locked</div>
        </div>
      </div>
    </div>
    {/* LMS Ready badge */}
    <div className="mx-2 mb-2 py-1.5 bg-brand-red/10 border border-brand-red/30 rounded text-center">
      <span className="text-[7px] text-brand-red font-bold uppercase tracking-wider">LMS Ready</span>
    </div>
  </div>
);

// ============ DESKTOP Screen Components ============

// Step 1: Analyze - Shows content being scanned with insights discovered
const DesktopScreenLayer1 = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center animate-fadeIn">
    <div className="relative w-48 h-64 border-2 border-slate-700/50 rounded-lg bg-slate-800/20 p-4 flex flex-col gap-3 overflow-hidden shadow-2xl">
      <div className="w-1/2 h-2 bg-slate-600/50 rounded"></div>
      <div className="w-full h-32 bg-slate-700/30 rounded flex items-center justify-center">
        <FileText size={32} className="text-slate-600" />
      </div>
      <div className="w-full h-2 bg-slate-600/50 rounded"></div>
      <div className="w-3/4 h-2 bg-slate-600/50 rounded"></div>
      <div className="absolute left-0 top-[-20%] w-full h-[20%] bg-brand-blue/20 blur-md animate-scan border-b-2 border-brand-blue shadow-[0_0_20px_#38bdf8]"></div>
    </div>
    <div className="mt-8 w-72 bg-slate-900/80 border border-brand-blue/30 rounded-xl p-4 backdrop-blur-md">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-brand-blue uppercase font-bold">Analysis</span>
        <span className="text-xs text-white font-mono bg-brand-blue/20 px-2 py-0.5 rounded">Complete</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <CheckCircle size={14} className="text-green-500" /> 12 Topics Identified
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <CheckCircle size={14} className="text-green-500" /> 3 Video Opportunities
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <CheckCircle size={14} className="text-green-500" /> Quiz Integration Points
        </div>
        <div className="flex items-center gap-2 text-sm text-brand-blue font-semibold mt-3">
          <Sparkles size={14} className="text-brand-blue" /> Ready to Design
        </div>
      </div>
    </div>
  </div>
);

// Step 2: Design - Shows a beautiful landing page being crafted
const DesktopScreenLayer2 = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 animate-fadeIn">
    {/* Design grid background */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]"></div>

    {/* Landing page preview */}
    <div className="relative w-full max-w-[300px] bg-slate-900 border border-brand-purple/40 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(217,70,239,0.2)] animate-float">
      {/* Header */}
      <div className="h-12 bg-gradient-to-r from-brand-purple/30 to-brand-blue/20 flex items-center px-4 gap-3 border-b border-white/5">
        <div className="w-6 h-6 rounded bg-white/20"></div>
        <div className="flex-1"></div>
        <div className="w-12 h-2 bg-white/20 rounded"></div>
        <div className="w-12 h-2 bg-white/20 rounded"></div>
        <div className="w-12 h-2 bg-white/20 rounded"></div>
      </div>

      {/* Hero section */}
      <div className="p-5">
        <div className="h-3 w-3/4 bg-white/30 rounded mb-2"></div>
        <div className="h-2 w-1/2 bg-white/15 rounded mb-4"></div>
        <div className="flex gap-2 mb-5">
          <div className="w-20 h-8 bg-brand-purple rounded text-[10px] text-white flex items-center justify-center font-bold">Get Started</div>
          <div className="w-20 h-8 bg-white/10 rounded border border-white/20 text-[10px] text-white/60 flex items-center justify-center">Learn More</div>
        </div>
      </div>

      {/* Feature cards section */}
      <div className="px-5 pb-5 grid grid-cols-3 gap-3">
        <div className="h-20 bg-white/5 rounded-lg border border-white/10 p-2">
          <div className="w-5 h-5 rounded bg-brand-blue/30 mb-2"></div>
          <div className="h-1.5 w-full bg-white/10 rounded mb-1"></div>
          <div className="h-1 w-2/3 bg-white/5 rounded"></div>
        </div>
        <div className="h-20 bg-white/5 rounded-lg border border-white/10 p-2">
          <div className="w-5 h-5 rounded bg-brand-purple/30 mb-2"></div>
          <div className="h-1.5 w-full bg-white/10 rounded mb-1"></div>
          <div className="h-1 w-2/3 bg-white/5 rounded"></div>
        </div>
        <div className="h-20 bg-white/5 rounded-lg border border-white/10 p-2">
          <div className="w-5 h-5 rounded bg-brand-gold/30 mb-2"></div>
          <div className="h-1.5 w-full bg-white/10 rounded mb-1"></div>
          <div className="h-1 w-2/3 bg-white/5 rounded"></div>
        </div>
      </div>
    </div>

    {/* Design indicator */}
    <div className="mt-6 flex items-center gap-3">
      <div className="w-3 h-3 bg-brand-purple rounded-full animate-pulse"></div>
      <span className="text-xs text-brand-purple font-bold uppercase tracking-wider">Crafting Experience</span>
    </div>
  </div>
);

const DesktopScreenLayer3 = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center animate-fadeIn">
    <div className="relative w-40 h-40 flex items-center justify-center mb-10">
      <div className="absolute inset-0 border border-brand-gold/30 rounded-full animate-[ping_3s_linear_infinite]"></div>
      <div className="absolute inset-4 border border-brand-gold/50 rounded-full animate-[ping_3s_linear_infinite_0.5s]"></div>
      <div className="relative z-10 w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.6)]">
        <Video size={28} className="text-black fill-current ml-1" />
      </div>
    </div>
    <div className="flex items-end justify-center gap-1.5 h-16 w-full px-12">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="w-1.5 bg-gradient-to-t from-brand-gold to-yellow-200 rounded-full animate-wave" style={{ height: '30%', animationDelay: `${i * 0.1}s` }}></div>
      ))}
    </div>
    <div className="mt-6 font-mono text-xs text-brand-gold tracking-widest uppercase animate-pulse">Generating Media...</div>
  </div>
);

// Step 4: Deliver - Shows a course wireframe/LMS layout
const DesktopScreenLayer4 = () => (
  <div className="absolute inset-0 flex flex-col animate-fadeIn p-4">
    {/* Course header */}
    <div className="mt-10 px-4 pb-4 border-b border-white/10">
      <div className="text-lg font-bold text-white mb-2">Your Learning Experience</div>
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-brand-red to-rose-500 rounded-full shadow-[0_0_10px_rgba(255,77,109,0.5)]"></div>
        </div>
        <span className="text-sm text-slate-400 font-mono">75%</span>
      </div>
    </div>

    {/* Module list */}
    <div className="flex-1 p-4 space-y-3 overflow-hidden">
      <div className="flex items-center gap-4 p-4 bg-brand-red/20 rounded-xl border border-brand-red/30 shadow-lg">
        <div className="w-10 h-10 rounded-lg bg-brand-red flex items-center justify-center shadow-[0_0_15px_rgba(255,77,109,0.4)]">
          <CheckCircle size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-white">Module 1: Introduction</div>
          <div className="text-xs text-slate-400">Complete - 5 lessons</div>
        </div>
        <div className="text-xs text-green-400 font-semibold">100%</div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
          <span className="text-sm text-white font-bold">2</span>
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-white">Module 2: Core Concepts</div>
          <div className="text-xs text-slate-400">In Progress - 8 lessons</div>
        </div>
        <div className="text-xs text-brand-gold font-semibold">60%</div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 opacity-50">
        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
          <span className="text-sm text-slate-500 font-bold">3</span>
        </div>
        <div className="flex-1">
          <div className="text-sm text-slate-400">Module 3: Advanced Topics</div>
          <div className="text-xs text-slate-500">Locked - 6 lessons</div>
        </div>
      </div>
    </div>

    {/* LMS Ready badge */}
    <div className="mx-4 mb-4 py-3 bg-gradient-to-r from-brand-red/20 to-rose-500/10 border border-brand-red/30 rounded-xl text-center shadow-lg">
      <span className="text-sm text-brand-red font-bold uppercase tracking-wider">LMS Ready Package</span>
    </div>
  </div>
);

// ============ MAIN COMPONENT ============

export const MonolithSection: React.FC<{ onNavigate: NavProps['onNavigate'] }> = ({ onNavigate }) => {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile scroll detection
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const cards = mobileCardRefs.current;
      if (!cards.length) return;

      const triggerPoint = window.innerHeight * 0.6;

      for (let i = cards.length - 1; i >= 0; i--) {
        const card = cards[i];
        if (!card) continue;
        const rect = card.getBoundingClientRect();
        if (rect.top <= triggerPoint) {
          if (activeLayerIndex !== i) {
            setActiveLayerIndex(i);
          }
          break;
        }
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isMobile, activeLayerIndex]);

  // Desktop scroll observer
  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  const activeLayer = layers[activeLayerIndex];

  const mobileScreenComponents = [
    <MobileScreenLayer1 key="m1" />,
    <MobileScreenLayer2 key="m2" />,
    <MobileScreenLayer3 key="m3" />,
    <MobileScreenLayer4 key="m4" />
  ];

  const desktopScreenComponents = [
    <DesktopScreenLayer1 key="d1" />,
    <DesktopScreenLayer2 key="d2" />,
    <DesktopScreenLayer3 key="d3" />,
    <DesktopScreenLayer4 key="d4" />
  ];

  return (
    <section 
      className="relative z-20" 
      aria-labelledby="engine-heading"
    >
      {/* Screen reader description */}
      <h2 id="engine-heading" className="sr-only">
        How We Work - Our Four-Step Process
      </h2>

      {/* ============ MOBILE VIEW ============ */}
      <div ref={mobileSectionRef} className="lg:hidden bg-space">

        {/* Sticky Phone Container */}
        <div className="sticky top-[70px] z-30 bg-gradient-to-b from-space via-space to-transparent pt-6 pb-8">
          <div className="text-center mb-4 px-4">
            <h3 className="text-2xl font-black text-white mb-1">How We Work</h3>
            <p className="text-slate-400 text-xs">Scroll to explore each step</p>
          </div>
          
          {/* Mini Phone Device */}
          <div 
            className="relative mx-auto w-[180px] h-[280px]"
            role="img"
            aria-label={activeLayer.screenDescription}
          >
            {/* Layer indicator pills */}
            <div 
              className="absolute -left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40"
              role="tablist"
              aria-label="Transformation layers"
            >
              {layers.map((layer, idx) => (
                <div 
                  key={layer.id}
                  role="tab"
                  aria-selected={activeLayerIndex === idx}
                  aria-label={`Layer ${idx + 1}: ${layer.heading}`}
                  className={`w-1.5 h-6 rounded-full transition-all duration-300 ${activeLayerIndex === idx ? layer.bg + ' shadow-lg' : 'bg-white/20'}`}
                />
              ))}
            </div>

            {/* Phone Frame */}
            <div className="absolute inset-0 bg-[#0c0c12] border-2 border-slate-700 rounded-[28px] shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-b-xl z-20" aria-hidden="true"></div>
              
              <div className="absolute inset-1 bg-[#080810] rounded-[24px] overflow-hidden">
                <div className={`absolute top-5 left-1/2 -translate-x-1/2 z-30 px-2 py-0.5 rounded-full text-[7px] font-bold uppercase tracking-wider ${activeLayer.bg} text-white shadow-lg`}>
                  Layer {activeLayerIndex + 1}
                </div>
                
                {layers.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 transition-all duration-500 ${activeLayerIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                    aria-hidden={activeLayerIndex !== idx}
                  >
                    {mobileScreenComponents[idx]}
                  </div>
                ))}
              </div>
              
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full" aria-hidden="true"></div>
            </div>
          </div>
        </div>

        {/* Scrolling Layer Cards */}
        <div className="relative z-20 px-4 pb-20 -mt-4" role="list" aria-label="Layer descriptions">
          {layers.map((layer, idx) => {
            const isActive = activeLayerIndex === idx;
            return (
              <article 
                key={layer.id}
                ref={el => { mobileCardRefs.current[idx] = el; }}
                className="min-h-[50vh] flex items-center py-8"
                role="listitem"
                aria-current={isActive ? 'step' : undefined}
              >
                <div className={`w-full p-6 rounded-2xl border transition-all duration-500 ${isActive ? layer.border + ' bg-white/5 shadow-xl' : 'border-white/5 bg-transparent opacity-40'}`}>
                  <div className={`flex items-center gap-3 mb-4 ${isActive ? layer.color : 'text-slate-500'}`}>
                    <span className={`p-2 rounded-lg border transition-colors duration-300 ${isActive ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5'}`}>
                      {layer.icon}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">{layer.title}</span>
                  </div>
                  <h4 className={`text-2xl font-black mb-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {layer.heading}
                  </h4>
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {layer.description}

                  </p>
                  {/* ADD THIS BUTTON - Only show on first layer (Foundation) */}
                  {layer.id === 1 && (
                    <button
                      onClick={() => onNavigate('services')}
                      className="mt-6 flex items-center gap-2 px-6 py-3 bg-brand-blue/20 hover:bg-brand-blue text-brand-blue hover:text-white border border-brand-blue/30 rounded-lg font-semibold transition-all"
                    >
                      View Our Services <ArrowRight size={18} />
                    </button>
                  )}
                  </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ============ DESKTOP VIEW ============ */}
      <div ref={containerRef} className="hidden lg:block h-[500vh] relative">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-[1000px]">
          <div 
            className="relative w-[380px] h-[720px] transition-all duration-700 ease-out preserve-3d"
            style={{ transform: `rotateY(${activeLayerIndex % 2 === 0 ? '15deg' : '-15deg'}) rotateX(5deg) translateZ(50px)` }}
            role="img"
            aria-label={activeLayer.screenDescription}
          >
            <div className="absolute inset-0 bg-space/90 border border-white/20 rounded-[45px] shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_0_40px_rgba(255,255,255,0.05)] backdrop-blur-xl overflow-hidden flex flex-col z-20 ring-1 ring-white/10">
              <div className="flex-1 relative m-3 bg-[#0a0a0f] rounded-[38px] overflow-hidden flex flex-col shadow-inner">
                <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-30 opacity-70" aria-hidden="true">
                  <span className="text-xs font-medium text-white tracking-widest">DXF-OS</span>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                  </div>
                </div>
                
                {layers.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 transition-all duration-700 ${activeLayerIndex === idx ? 'opacity-100' : 'opacity-0 scale-90 pointer-events-none'}`}
                    aria-hidden={activeLayerIndex !== idx}
                  >
                    {desktopScreenComponents[idx]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {layers.map((layer, idx) => (
            <div 
              key={layer.id} 
              ref={el => { triggerRefs.current[idx] = el; }}
              className={`h-screen flex items-center ${idx % 2 === 0 ? 'justify-start pl-[8%] lg:pl-[12%]' : 'justify-end pr-[8%] lg:pr-[12%]'} pointer-events-auto`}
            >
              <article 
                className={`max-w-md p-8 rounded-2xl transition-all duration-700 transform ${activeLayerIndex === idx ? 'opacity-100 translate-y-0 blur-0' : 'opacity-20 translate-y-10 blur-sm'}`}
                aria-current={activeLayerIndex === idx ? 'step' : undefined}
              >
                <div className={`flex items-center gap-3 mb-6 ${layer.color}`}>
                  <span className="p-2 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">{layer.icon}</span>
                  <span className="text-sm font-bold tracking-[0.2em] uppercase">{layer.title}</span>
                </div>
                <h3 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                  {layer.heading}
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed border-l-2 border-white/10 pl-6">
                  {layer.description}
                </p>
                {/* ADD THIS BUTTON - Only show on first layer (Foundation) */}
                {layer.id === 1 && (
                  <button
                    onClick={() => onNavigate('services')}
                    className="mt-6 flex items-center gap-2 px-6 py-3 bg-brand-blue/20 hover:bg-brand-blue text-brand-blue hover:text-white border border-brand-blue/30 rounded-lg font-semibold transition-all"
                  >
                    View Our Services <ArrowRight size={18} />
                  </button>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};