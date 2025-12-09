import React, { useEffect, useState, useRef, useCallback } from 'react';
import { NavProps } from '../../types';
import { 
  ShieldCheck, 
  FileText, 
  File, 
  Briefcase, 
  Video, 
  Mic, 
  Link, 
  BarChart3, 
  Accessibility, 
  CheckCircle,
  ArrowRight,
  ArrowLeftRight,
  PlayCircle,
  X,
  Database,
  MonitorPlay,
  ArrowDown,
  Layout,
  ChevronRight,
  Home
} from 'lucide-react';

export const LearningTransformer: React.FC<{ onNavigate: NavProps['onNavigate'] }> = ({ onNavigate }) => {
  const [showVideo, setShowVideo] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Focus trap for video modal
  useEffect(() => {
    if (!showVideo || !modalRef.current) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
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

  const closeVideo = useCallback(() => {
    setShowVideo(false);
    previousFocusRef.current?.focus();
  }, []);

  const handleRequestAccess = () => {
    onNavigate('home');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const benefits = [
    {
      icon: Accessibility,
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/20",
      title: "Accessible",
      description: "ADA compliant content generated automatically for all learners, meeting WCAG 2.1 AA standards."
    },
    {
      icon: PlayCircle,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/20",
      title: "Engaging",
      description: "Video and audio formats transform static text into immersive, engaging experiences."
    },
    {
      icon: CheckCircle,
      iconColor: "text-orange-400",
      bgColor: "bg-orange-500/20",
      title: "Effective",
      description: "Embedded knowledge checks and interactive elements verify learning retention instantly."
    },
    {
      icon: BarChart3,
      iconColor: "text-green-400",
      bgColor: "bg-green-500/20",
      title: "Measurable",
      description: "Track engagement, completion statistics, and performance with built-in analytics."
    }
  ];

  return (
    <div className="min-h-screen bg-space text-slate-200 pt-20">
      
      {/* Breadcrumbs */}
      <nav 
        aria-label="Breadcrumb"
        className="px-6 py-4 border-b border-white/5 bg-space/50 backdrop-blur-sm sticky top-[70px] z-40"
      >
        <ol className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-slate-400">
          <li>
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-white transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
            >
              <Home size={14} aria-hidden="true" />
              <span>Home</span>
            </button>
          </li>
          <li aria-hidden="true"><ChevronRight size={14} /></li>
          <li><span>Solutions</span></li>
          <li aria-hidden="true"><ChevronRight size={14} /></li>
          <li aria-current="page">
            <span className="text-white font-medium">Learning Transformer</span>
          </li>
        </ol>
      </nav>

      {/* Video Modal */}
      {showVideo && (
        <div 
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-video-title"
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <div 
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="promo-video-title" className="sr-only">Learning Transformer Promotional Video</h2>
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
                src="https://www.youtube.com/embed/I5ib4qt6nDQ?autoplay=1&rel=0"
                title="Learning Transformer Promotional Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-24 lg:py-32 px-6"
        aria-labelledby="lt-hero-heading"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/20 via-transparent to-transparent pointer-events-none" aria-hidden="true"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/20 rounded-full text-brand-red text-xs font-bold uppercase tracking-widest mb-8">
              <ShieldCheck size={14} aria-hidden="true" /> Product Spotlight
            </div>
            <h1 id="lt-hero-heading" className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight lg:leading-tight">
              <span className="flex items-center gap-3 lg:gap-5">
                <img 
                  src="https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/LT_Icon.png" 
                  alt="" 
                  aria-hidden="true"
                  className="w-12 h-12 lg:w-20 lg:h-20 object-contain" 
                />
                <span>Learning</span>
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">Transformer</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Automatically transform static LMS content into a dynamic, accessible, and intelligent learning ecosystem.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setShowVideo(true)}
                className="flex items-center gap-2 bg-brand-red hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-red/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/50"
              >
                <PlayCircle size={20} aria-hidden="true" /> Watch Promo
              </button>
              <button 
                onClick={handleRequestAccess}
                className="px-8 py-4 border border-white/20 hover:bg-white/5 rounded-xl text-white font-bold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                Request Access
              </button>
            </div>
          </div>
          
          <div className="relative">
            {/* Video Embed */}
            <div className="relative z-10 bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/AdoFkMShHCA?rel=0"
                  title="Learning Transformer Engine Preview Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-blue/20 rounded-full blur-2xl" aria-hidden="true"></div>
            <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-brand-purple/20 rounded-full blur-2xl" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      {/* The Flow Section */}
      <section 
        className="py-20 bg-[#08080c] border-y border-white/5 relative overflow-hidden"
        aria-labelledby="flow-heading"
      >
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <header className="text-center mb-16">
            <h2 id="flow-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple Content Transformation Flow
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              From your existing LMS content to a fully accessible, engaging learning experience in seconds.
            </p>
          </header>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
            
            {/* 1. INPUT */}
            <article className="flex-1 w-full max-w-sm">
              <div className="bg-space border border-white/10 rounded-2xl p-8 relative group hover:border-brand-blue/50 transition-colors h-full flex flex-col items-center text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#08080c] px-4 py-1 border border-white/10 rounded-full text-xs font-bold text-slate-300 uppercase tracking-widest">
                  Your LMS Content
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 mt-4" aria-label="Supported input formats">
                  <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-lg">
                    <FileText className="text-slate-400" aria-hidden="true" />
                    <span className="text-[10px] text-slate-300">Documents</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-lg">
                    <Briefcase className="text-slate-400" aria-hidden="true" />
                    <span className="text-[10px] text-slate-300">Training</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-lg">
                    <File className="text-slate-400" aria-hidden="true" />
                    <span className="text-[10px] text-slate-300">Materials</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-lg">
                    <span className="text-red-400 font-bold text-xs border border-red-400/50 rounded px-1" aria-hidden="true">PDF</span>
                    <span className="text-[10px] text-slate-300">Files</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mt-auto">Existing Course Assets</p>
              </div>
            </article>

            {/* ARROW 1 */}
            <div className="flex flex-col items-center justify-center text-brand-blue/80 gap-3" aria-hidden="true">
              <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap lg:order-1">Automatic Ingestion</span>
              <ArrowRight size={32} className="hidden lg:block lg:order-2" />
              <ArrowDown size={32} className="lg:hidden" />
            </div>

            {/* 2. TRANSFORMER (CORE) */}
            <article className="flex-none relative w-80 h-80 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 rounded-full blur-3xl" aria-hidden="true"></div>
              
              <div className="relative w-64 h-64 bg-[#0a0a15] border-2 border-brand-blue/50 rounded-[3rem] shadow-[0_0_50px_rgba(56,189,248,0.3)] flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-space text-[10px] font-black uppercase px-3 py-1 rounded-full z-20">
                  The Engine
                </div>
                <ShieldCheck size={48} className="text-brand-blue mb-2" aria-hidden="true" />
                <h3 className="text-xl font-black text-white mb-1">LEARNING<br/>TRANSFORMER</h3>
                <p className="text-xs text-slate-300">Transforms Your Content Automatically</p>

                {/* Orbital Icons */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 flex flex-col items-center gap-1 z-10" aria-hidden="true">
                  <div className="w-10 h-10 rounded-full bg-space border border-brand-blue text-brand-blue flex items-center justify-center shadow-lg">
                    <Video size={16} />
                  </div>
                  <span className="text-[8px] font-bold uppercase bg-space px-1">Video</span>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 flex flex-col items-center gap-1" aria-hidden="true">
                  <div className="w-10 h-10 rounded-full bg-space border border-brand-purple text-brand-purple flex items-center justify-center shadow-lg">
                    <Accessibility size={16} />
                  </div>
                  <span className="text-[8px] font-bold uppercase bg-space px-1">ADA</span>
                </div>
                <div className="absolute top-1/4 -right-5 flex flex-col items-center gap-1" aria-hidden="true">
                  <div className="w-10 h-10 rounded-full bg-space border border-brand-gold text-brand-gold flex items-center justify-center shadow-lg">
                    <Mic size={16} />
                  </div>
                </div>
                <div className="absolute top-1/4 -left-5 flex flex-col items-center gap-1" aria-hidden="true">
                  <div className="w-10 h-10 rounded-full bg-space border border-brand-red text-brand-red flex items-center justify-center shadow-lg">
                    <Link size={16} />
                  </div>
                </div>
              </div>
            </article>

            {/* ARROW 2 */}
            <div className="flex flex-col items-center justify-center text-brand-blue/80 gap-3" aria-hidden="true">
              <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap lg:order-1">Instant Delivery</span>
              <ArrowLeftRight size={32} className="hidden lg:block lg:order-2" />
              <ArrowDown size={32} className="lg:hidden" />
            </div>

            {/* 3. OUTPUT */}
            <article className="flex-1 w-full max-w-sm">
              <div className="bg-space border border-white/10 rounded-2xl p-8 relative group hover:border-brand-purple/50 transition-colors h-full flex flex-col items-center text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#08080c] px-4 py-1 border border-white/10 rounded-full text-xs font-bold text-slate-300 uppercase tracking-widest">
                  Back to Your LMS
                </div>
                
                <div className="relative w-full aspect-video bg-slate-800 rounded-lg overflow-hidden mb-4 mt-2 border border-white/10 shadow-lg">
                  {/* Mock LMS Interface */}
                  <div className="absolute top-0 left-0 w-full h-6 bg-slate-900 flex items-center px-2 gap-1" aria-hidden="true">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-4 flex items-center justify-center h-full">
                    <MonitorPlay size={40} className="text-brand-purple opacity-50" aria-hidden="true" />
                  </div>
                  <div className="absolute bottom-2 right-2 flex gap-1" aria-hidden="true">
                    <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center"><Layout size={12} className="text-slate-400" /></div>
                    <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center"><BarChart3 size={12} className="text-slate-400" /></div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mt-auto">Automatically Displayed & Accessible</p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section 
        className="py-24 px-6 max-w-7xl mx-auto"
        aria-labelledby="benefits-heading"
      >
        <h2 id="benefits-heading" className="text-3xl font-bold text-white mb-12 text-center">The Benefits</h2>
        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 list-none">
          {benefits.map((benefit, i) => (
            <li key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
              <div className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center mb-4 ${benefit.iconColor}`}>
                <benefit.icon size={24} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Deep Dive Features */}
      <section 
        className="py-24 bg-slate-900/30 px-6"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className="sr-only">Key Features</h2>
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Feature 1 */}
          <article className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block p-3 rounded-lg bg-brand-red/10 mb-4" aria-hidden="true">
                <Video className="text-brand-red" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">HTML Video Transformation</h3>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Traditional video files are heavy, hard to search, and difficult to update. Our transformer generates lightweight, HTML-based video experiences.
              </p>
              <ul className="space-y-3 list-none">
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-brand-red mt-1 shrink-0" aria-hidden="true" />
                  <span>Searchable text content within video</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-brand-red mt-1 shrink-0" aria-hidden="true" />
                  <span>Bandwidth-friendly (no heavy MP4 downloads)</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-brand-red mt-1 shrink-0" aria-hidden="true" />
                  <span>Instant updates without re-rendering</span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 bg-gradient-to-br from-brand-red/20 to-transparent p-1 rounded-2xl" aria-hidden="true">
              <div className="bg-space border border-white/10 rounded-xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite]"></div>
                <PlayCircle size={64} className="text-white relative z-10" />
              </div>
            </div>
          </article>

          {/* Feature 2 */}
          <article className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-brand-blue/20 to-transparent p-1 rounded-2xl" aria-hidden="true">
              <div className="bg-space border border-white/10 rounded-xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
                <Database size={64} className="text-brand-blue relative z-10" />
                <div className="absolute bottom-8 left-8 right-8 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-blue w-3/4"></div>
                </div>
                <div className="absolute bottom-12 right-8 text-xs font-mono text-brand-blue">Analysis Complete</div>
              </div>
            </div>
            <div>
              <div className="inline-block p-3 rounded-lg bg-brand-blue/10 mb-4" aria-hidden="true">
                <Link className="text-brand-blue" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Seamless LMS Integration</h3>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Don't change your workflow. Learning Transformer integrates directly into Canvas, Blackboard, and Moodle.
              </p>
              <ul className="space-y-3 list-none">
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-brand-blue mt-1 shrink-0" aria-hidden="true" />
                  <span>One-click publishing to course modules</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-brand-blue mt-1 shrink-0" aria-hidden="true" />
                  <span>Gradebook synchronization</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-brand-blue mt-1 shrink-0" aria-hidden="true" />
                  <span>LTI 1.3 Advantage certified</span>
                </li>
              </ul>
            </div>
          </article>

        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-24 px-6 text-center"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-purple to-brand-blue" aria-hidden="true"></div>
          
          <h2 id="cta-heading" className="text-4xl font-black text-white mb-6">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join the institutions that are already saving time and improving accessibility with Design X Factor.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleRequestAccess}
              className="bg-white text-space hover:bg-slate-200 font-bold px-8 py-4 rounded-xl transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              Get Started Now
            </button>
            <button 
              onClick={() => onNavigate('home')}
              className="bg-transparent border border-white/20 text-white hover:bg-white/5 font-bold px-8 py-4 rounded-xl transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};