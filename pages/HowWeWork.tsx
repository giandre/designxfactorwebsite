import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, Check, User, FileText, Sparkles, Rocket, ChevronRight, Calendar } from 'lucide-react';
import { PageView } from '../types';

interface HowWeWorkProps {
  onNavigate: (page: PageView) => void;
}

const phases = [
  { id: 0, title: "Welcome", subtitle: "Your Journey Begins", color: "#ff4d6d", type: "intro" },
  { id: 1, title: "Discovery", subtitle: "Phase 01", color: "#38bdf8", type: "discovery" },
  { id: 2, title: "Meet Your Users", subtitle: "Phase 02", color: "#d946ef", type: "personas" },
  { id: 3, title: "Design Validation", subtitle: "Phase 03", color: "#f59e0b", type: "validation" },
  { id: 4, title: "Black & White Review", subtitle: "Phase 06", color: "#10b981", type: "review" },
  { id: 5, title: "Your Delivery", subtitle: "Phase 09", color: "#ff4d6d", type: "delivery" }
];

// Intro Screen with enhanced animations
const IntroScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Multiple ambient glows for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className={`relative z-10 max-w-3xl transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-8 flex items-center justify-center gap-2">
          <Sparkles size={20} className="text-brand-red animate-pulse" />
          <span className="text-brand-red text-sm font-bold tracking-widest uppercase">Interactive Experience</span>
          <Sparkles size={20} className="text-brand-red animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          How We Work
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-purple to-brand-blue animate-gradient">
            Is Better Experienced
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 mb-4 leading-relaxed">
          Don't just read about our process. <strong className="text-white">Live it.</strong>
        </p>
        <p className="text-lg text-slate-500 mb-12">
          Step into the role of a client and experience our 9-phase methodology firsthand.
        </p>

        <button
          onClick={onStart}
          className="group relative flex items-center gap-3 mx-auto bg-gradient-to-r from-brand-red to-orange-500 hover:from-brand-red/90 hover:to-orange-500/90 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-2xl shadow-brand-red/30"
        >
          <Play size={28} className="group-hover:scale-110 transition-transform" />
          <span>Begin Your Journey</span>
          <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-10 flex items-center justify-center gap-6 text-slate-500 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
            ~3-5 minutes
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            Fully interactive
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            No signup required
          </span>
        </div>
      </div>
    </div>
  );
};

// Discovery Phase with progressive reveals
const DiscoveryPhase: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [answered, setAnswered] = useState<number[]>([]);
  const [showInsight, setShowInsight] = useState(false);

  const questions = [
    {
      q: "What content needs to be transformed?",
      reveal: "We assess your existing materials — PDFs, slides, videos — and identify transformation opportunities.",
      icon: FileText
    },
    {
      q: "Who will be using this training?",
      reveal: "Understanding your learners is crucial. This leads us to Phase 2 where we meet them directly.",
      icon: User
    },
    {
      q: "What does success look like for you?",
      reveal: "We define measurable outcomes so we can track real impact, not just completion rates.",
      icon: Sparkles
    }
  ];

  const handleAnswer = (idx: number) => {
    if (!answered.includes(idx)) {
      setAnswered([...answered, idx]);
      if (answered.length === 2) {
        setTimeout(() => setShowInsight(true), 500);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue/20 border border-brand-blue/30 rounded-full text-brand-blue text-sm font-bold mb-8 animate-fadeIn">
            <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
            Phase 01: Discovery & Scoping
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Let's Start With <span className="text-brand-blue">Your Goals</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            In our first meeting, we ask the questions that matter. Click each to explore what we learn.
          </p>
          <div className="mt-6 text-slate-500 text-sm">
            {answered.length} of {questions.length} explored
          </div>
        </div>

        <div className="space-y-6 mb-12">
          {questions.map((item, idx) => {
            const Icon = item.icon;
            const isAnswered = answered.includes(idx);

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-8 rounded-2xl border-2 transition-all transform hover:scale-[1.02] ${
                  isAnswered
                    ? 'bg-brand-blue/10 border-brand-blue/50 shadow-lg shadow-brand-blue/20'
                    : 'bg-white/5 border-white/10 hover:border-brand-blue/30 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    isAnswered ? 'bg-brand-blue text-white scale-110' : 'bg-white/10 text-slate-400'
                  }`}>
                    {isAnswered ? <Check size={24} /> : <Icon size={24} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-bold text-white mb-2">{item.q}</p>
                    {isAnswered && (
                      <p className="text-slate-400 leading-relaxed animate-fadeIn">
                        {item.reveal}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {showInsight && (
          <div className="text-center animate-fadeIn">
            <div className="bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 border border-brand-blue/30 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
              <Sparkles className="w-8 h-8 text-brand-blue mx-auto mb-4" />
              <p className="text-white text-lg font-medium mb-2">Discovery Complete!</p>
              <p className="text-slate-400">
                Now that we understand your goals, let's meet the people who will actually use your training.
              </p>
            </div>
            <button
              onClick={onNext}
              className="inline-flex items-center gap-3 bg-brand-blue hover:bg-brand-blue/90 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-brand-blue/30"
            >
              Continue to Personas <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Personas Phase with flip card animations
const PersonasPhase: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [allRevealed, setAllRevealed] = useState(false);

  const personas = [
    {
      name: "Maria Rodriguez",
      role: "Warehouse Associate",
      context: "Completes training on phone during 15-minute breaks",
      needs: "Quick, mobile-friendly, visual learning with audio support",
      avatar: "👩🏽‍🔧",
      challenge: "Limited time, always on the move"
    },
    {
      name: "James Chen",
      role: "New Hire Manager",
      context: "Desktop user who needs comprehensive documentation",
      needs: "Detailed content with easy navigation and search",
      avatar: "👨🏻‍💼",
      challenge: "Needs to reference materials frequently"
    },
    {
      name: "Aisha Okonkwo",
      role: "Field Technician",
      context: "Works in areas with limited connectivity",
      needs: "Downloadable resources, works offline, concise steps",
      avatar: "👩🏾‍🔬",
      challenge: "Unreliable internet access"
    }
  ];

  const revealPersona = (idx: number) => {
    if (!revealed.includes(idx)) {
      const newRevealed = [...revealed, idx];
      setRevealed(newRevealed);
      if (newRevealed.length === personas.length) {
        setTimeout(() => setAllRevealed(true), 500);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple/20 border border-brand-purple/30 rounded-full text-brand-purple text-sm font-bold mb-8">
            <User size={18} />
            Phase 02: Persona Identification
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            We Meet Your <span className="text-brand-purple">Actual</span> Users
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4">
            Not just stakeholders. We interview the <em>real people</em> who will use your training.
          </p>
          <p className="text-slate-500">
            Click each card to discover who we found.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {personas.map((persona, idx) => {
            const isRevealed = revealed.includes(idx);

            return (
              <div
                key={idx}
                onClick={() => revealPersona(idx)}
                className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                  isRevealed
                    ? 'bg-brand-purple/10 border-brand-purple/50 shadow-2xl shadow-brand-purple/20'
                    : 'bg-white/5 border-white/10 hover:border-brand-purple/30'
                }`}
                style={{ perspective: '1000px' }}
              >
                {!isRevealed ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-brand-purple/20 to-brand-red/20 rounded-full flex items-center justify-center mb-6 border-2 border-white/20">
                      <span className="text-5xl animate-pulse">?</span>
                    </div>
                    <p className="text-slate-400 font-medium">Click to reveal</p>
                    <p className="text-slate-600 text-sm mt-2">Persona #{idx + 1}</p>
                  </div>
                ) : (
                  <div className="animate-fadeIn">
                    <div className="text-7xl mb-6 text-center">{persona.avatar}</div>
                    <h3 className="text-2xl font-black text-white mb-2">{persona.name}</h3>
                    <p className="text-brand-purple text-base font-bold mb-6">{persona.role}</p>
                    <div className="space-y-4 text-sm">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-slate-400"><span className="text-white font-semibold">Context:</span><br/>{persona.context}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-slate-400"><span className="text-white font-semibold">Needs:</span><br/>{persona.needs}</p>
                      </div>
                      <div className="bg-brand-purple/10 rounded-xl p-4 border border-brand-purple/30">
                        <p className="text-brand-purple text-xs font-semibold uppercase mb-1">Challenge</p>
                        <p className="text-slate-300 text-sm">{persona.challenge}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allRevealed && (
          <div className="text-center animate-fadeIn">
            <div className="bg-gradient-to-r from-brand-purple/20 to-brand-red/20 border-2 border-brand-purple/30 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
              <p className="text-2xl text-brand-purple italic font-medium mb-2">
                "We design for your audience,
              </p>
              <p className="text-2xl text-white italic font-medium">
                not assumptions about your audience."
              </p>
            </div>
            <button
              onClick={onNext}
              className="inline-flex items-center gap-3 bg-brand-purple hover:bg-brand-purple/90 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-brand-purple/30"
            >
              See Design Validation <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Validation Phase with interactive choice
const ValidationPhase: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: 'A' | 'B') => {
    setSelected(option);
    setTimeout(() => {
      setShowFeedback(true);
      // Scroll to feedback on mobile
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-bold mb-6">
            <Sparkles size={18} />
            Phase 03: Design Concept & Validation
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            We Test <span className="text-amber-400">Before</span> We Build
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-2">
            Before investing in production, we validate our design direction with real users.
          </p>
          <p className="text-base text-slate-500">
            Which approach would work best for Maria's needs?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-3xl mx-auto">
          {/* Option A */}
          {(selected === null || selected === 'A') && (
            <button
              onClick={() => handleSelect('A')}
              disabled={selected !== null}
              className={`group relative p-4 rounded-xl border-2 text-left transition-all transform hover:scale-[1.02] ${
                selected === 'A'
                  ? 'bg-amber-500/20 border-amber-500/50 ring-2 ring-amber-500/30 scale-[1.02] md:col-span-2'
                  : 'bg-white/5 border-white/10 hover:border-amber-500/30'
              }`}
            >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-black text-amber-400">Option A</span>
              {selected === 'A' && <Check className="text-amber-400" size={18} />}
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 mb-3 flex items-center justify-center border border-white/10" style={{ height: '120px' }}>
              <div className="text-center">
                <div className="text-4xl mb-2">📱</div>
                <p className="text-sm font-bold text-white">Mobile-First Cards</p>
                <p className="text-xs text-slate-400">Swipe • Quick lessons</p>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              Quick, visual, tap-through experience optimized for 15-minute breaks.
            </p>
            </button>
          )}

          {/* Option B */}
          {(selected === null || selected === 'B') && (
            <button
              onClick={() => handleSelect('B')}
              disabled={selected !== null}
              className={`group relative p-4 rounded-xl border-2 text-left transition-all transform hover:scale-[1.02] ${
                selected === 'B'
                  ? 'bg-amber-500/20 border-amber-500/50 ring-2 ring-amber-500/30 scale-[1.02] md:col-span-2'
                  : 'bg-white/5 border-white/10 hover:border-amber-500/30'
              }`}
            >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-black text-amber-400">Option B</span>
              {selected === 'B' && <Check className="text-amber-400" size={18} />}
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 mb-3 flex items-center justify-center border border-white/10" style={{ height: '120px' }}>
              <div className="text-center">
                <div className="text-4xl mb-2">🖥️</div>
                <p className="text-sm font-bold text-white">Desktop Documentation</p>
                <p className="text-xs text-slate-400">Long-form • Sidebar nav</p>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              Comprehensive documentation with sidebar navigation and search.
            </p>
            </button>
          )}
        </div>

        {showFeedback && selected && (
          <div ref={feedbackRef} className="text-center animate-fadeIn">
            <div className={`rounded-2xl p-8 mb-8 max-w-2xl mx-auto border-2 ${
              selected === 'A'
                ? 'bg-gradient-to-br from-emerald-500/20 to-brand-blue/20 border-emerald-500/50'
                : 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/50'
            }`}>
              {selected === 'A' ? (
                <>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Check className="text-emerald-400" size={32} />
                    <p className="text-2xl font-black text-emerald-400">Great Choice!</p>
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Based on Maria's context (15-minute phone breaks), this is exactly what we'd recommend.
                    <span className="text-white font-semibold"> User validation confirmed!</span>
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="text-amber-400" size={32} />
                    <p className="text-2xl font-black text-amber-400">Interesting Choice</p>
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    This might work for James (desktop manager), but Maria needs mobile-first.
                    <span className="text-white font-semibold"> That's why we test — we catch these mismatches early!</span>
                  </p>
                </>
              )}
            </div>
            <button
              onClick={onNext}
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black px-10 py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Review Content <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Review Phase with document approval
const ReviewPhase: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [approved, setApproved] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setScrolled(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-bold mb-8">
            <FileText size={18} />
            Phase 06: Black & White Content Review
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            You See <span className="text-emerald-400">Everything</span> First
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-4">
            Before any production begins, you review and approve all content in plain text.
          </p>
          <p className="text-lg text-slate-500">
            No expensive surprises. No scope creep.
          </p>
        </div>

        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="bg-white rounded-3xl p-10 mb-8 max-w-3xl mx-auto shadow-2xl max-h-[500px] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-slate-200">
            <div>
              <h3 className="text-2xl text-slate-900 font-black mb-1">Module 1: Warehouse Safety</h3>
              <p className="text-slate-600 text-sm">Black & White Content Review</p>
            </div>
            <span className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
              approved
                ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300'
                : 'bg-amber-100 text-amber-700 border-2 border-amber-300'
            }`}>
              {approved ? '✓ Approved' : 'Pending Review'}
            </span>
          </div>

          <div className="space-y-6 text-slate-700">
            <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-brand-blue">
              <p className="font-bold text-slate-900 mb-2">Learning Objective</p>
              <p>By the end of this module, learners will be able to identify and respond to common warehouse hazards according to OSHA standards.</p>
            </div>

            <div>
              <p className="font-bold text-slate-900 mb-3">Lesson 1.1: Introduction to Warehouse Safety</p>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-4">
                <p className="text-slate-600 text-sm font-semibold mb-2">[VIDEO SCRIPT - Duration: 2:30]</p>
                <p className="italic text-slate-600 leading-relaxed">
                  "Welcome to your warehouse safety training. In the next 10 minutes, we'll cover the essential protocols that keep you and your team safe every day.
                  We'll walk through real scenarios you might encounter, starting with the most common: spills and obstructions..."
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-4">
                <p className="font-semibold text-slate-900 mb-3">Interactive Scenario</p>
                <p className="text-slate-700 mb-3">
                  You're walking through the warehouse and notice a liquid spill near the loading dock. What should you do first?
                </p>
                <div className="space-y-2 ml-4">
                  <div className="flex items-start gap-3">
                    <span className="text-slate-400">○</span>
                    <span>Clean it up immediately with nearby materials</span>
                  </div>
                  <div className="flex items-start gap-3 text-emerald-700 font-medium">
                    <span className="text-emerald-600">●</span>
                    <span>Mark the area with a warning cone and report to supervisor <span className="text-emerald-600 text-sm">[CORRECT]</span></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-slate-400">○</span>
                    <span>Walk around it and continue with your task</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-slate-900 mb-3">Knowledge Check</p>
              <div className="bg-brand-blue/5 rounded-xl p-6 border-2 border-brand-blue/20">
                <p className="text-slate-800 font-medium mb-4">
                  Which THREE actions are part of the spill response protocol?
                </p>
                <div className="space-y-2 ml-4">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" checked disabled className="mt-1" />
                    <span>Secure the area immediately</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1" />
                    <span>Wait for someone else to handle it</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" checked disabled className="mt-1" />
                    <span>Report to your supervisor</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" checked disabled className="mt-1" />
                    <span>Document the incident</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 rounded-xl p-6 border border-slate-300">
              <p className="text-xs text-slate-500 uppercase font-bold mb-2">Accessibility Notes</p>
              <p className="text-slate-600 text-sm">
                ✓ All videos include closed captions<br/>
                ✓ Interactive elements have keyboard navigation<br/>
                ✓ WCAG 2.1 AA compliant color contrast<br/>
                ✓ Screen reader compatible
              </p>
            </div>
          </div>

          {!scrolled && (
            <div className="sticky bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white to-transparent flex items-end justify-center pb-4">
              <p className="text-slate-400 text-sm animate-bounce">Scroll to see full content ↓</p>
            </div>
          )}
        </div>

        <div className="text-center">
          {!approved ? (
            <button
              onClick={() => setApproved(true)}
              disabled={!scrolled}
              className={`inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-lg transition-all transform ${
                scrolled
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-white hover:scale-105 shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-600 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Check size={24} />
              {scrolled ? 'Approve Content' : 'Review full content to approve'}
            </button>
          ) : (
            <div className="animate-fadeIn space-y-6">
              <div className="bg-gradient-to-r from-emerald-500/20 to-brand-blue/20 border-2 border-emerald-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Check className="text-emerald-400" size={36} />
                  <p className="text-2xl font-black text-emerald-400">Content Approved!</p>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Now we move to production with confidence. No expensive rework. No scope creep.
                  <span className="text-white font-semibold"> You know exactly what you're getting.</span>
                </p>
              </div>
              <button
                onClick={onNext}
                className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30"
              >
                See Your Delivery <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Delivery Phase with celebration
const DeliveryPhase: React.FC<{ onRestart: () => void; onNavigate: (page: PageView) => void }> = ({ onRestart, onNavigate }) => {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCelebration(true), 300);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Celebration effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className={`max-w-5xl w-full relative z-10 transition-all duration-1000 ${showCelebration ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red/20 border border-brand-red/30 rounded-full text-brand-red text-sm font-bold mb-8">
            <Rocket size={18} />
            Phase 09: Delivery & Launch
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Your Transformation is <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-purple to-brand-blue animate-gradient">Complete</span>
          </h2>
          <p className="text-2xl text-slate-400 max-w-3xl mx-auto">
            From static PDFs to an accessible, engaging, mobile-first learning experience.
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="text-center">
            <p className="text-sm font-black text-brand-red mb-6 uppercase tracking-wider flex items-center justify-center gap-2">
              <span className="w-12 h-0.5 bg-brand-red/30" />
              Before
              <span className="w-12 h-0.5 bg-brand-red/30" />
            </p>
            <div className="bg-slate-900/50 rounded-3xl p-10 border-2 border-white/10 backdrop-blur">
              <div className="flex items-center justify-center gap-4 mb-6 opacity-40 grayscale">
                <div className="text-6xl">📊</div>
                <div className="text-6xl">📝</div>
                <div className="text-6xl">📄</div>
              </div>
              <p className="text-xl font-bold text-slate-400 mb-3">Static Content</p>
              <p className="text-sm text-slate-500 mb-4">PowerPoint • Word Docs • Old Courses</p>
              <div className="space-y-2 text-sm text-slate-600">
                <p>❌ Not accessible</p>
                <p>❌ Not mobile-friendly</p>
                <p>❌ No tracking</p>
                <p>❌ No engagement</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm font-black text-emerald-400 mb-6 uppercase tracking-wider flex items-center justify-center gap-2">
              <span className="w-12 h-0.5 bg-emerald-400/30" />
              After
              <span className="w-12 h-0.5 bg-emerald-400/30" />
            </p>
            <div className="bg-gradient-to-br from-emerald-500/20 via-brand-blue/20 to-brand-purple/20 rounded-3xl p-10 border-2 border-emerald-500/50 backdrop-blur shadow-2xl shadow-emerald-500/20">
              <div className="text-8xl mb-6 animate-bounce">✨</div>
              <p className="text-2xl font-black text-white mb-3">Interactive Experience</p>
              <div className="space-y-2 text-sm text-emerald-300 font-medium">
                <p>✓ WCAG 2.1 AA compliant</p>
                <p>✓ Mobile-first responsive</p>
                <p>✓ SCORM tracking built-in</p>
                <p>✓ Highly engaging</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="bg-white/5 rounded-3xl p-10 border-2 border-white/10 backdrop-blur mb-16">
          <h3 className="text-2xl font-black text-white mb-8 text-center">Choose Your Delivery Format</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl text-center border border-white/10 hover:border-brand-blue/50 transition-all transform hover:scale-105">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-xl font-bold text-white mb-2">HTML Package</p>
              <p className="text-slate-400 text-sm leading-relaxed">Full source code delivered. Host anywhere, edit anytime.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl text-center border border-white/10 hover:border-brand-purple/50 transition-all transform hover:scale-105">
              <div className="text-5xl mb-4">🎓</div>
              <p className="text-xl font-bold text-white mb-2">SCORM Package</p>
              <p className="text-slate-400 text-sm leading-relaxed">LMS tracking and completion data built-in.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl text-center border border-white/10 hover:border-brand-red/50 transition-all transform hover:scale-105">
              <div className="text-5xl mb-4">⚡</div>
              <p className="text-xl font-bold text-white mb-2">API Integration</p>
              <p className="text-slate-400 text-sm leading-relaxed">Direct push to your LMS via API.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-red/10 via-brand-purple/10 to-brand-blue/10 border-2 border-white/20 rounded-3xl p-10 mb-10 backdrop-blur">
            <Sparkles className="w-12 h-12 text-brand-red mx-auto mb-6 animate-pulse" />
            <p className="text-2xl text-white font-medium mb-4">
              You just experienced our 9-phase methodology.
            </p>
            <p className="text-xl text-slate-400">
              Ready to transform your content for real?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => onNavigate('start')}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-red to-orange-500 hover:from-brand-red/90 hover:to-orange-500/90 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-2xl shadow-brand-red/30"
            >
              <Calendar size={28} />
              <span>Start Your Project</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onRestart}
              className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-10 py-6 rounded-2xl font-bold text-lg transition-all border-2 border-white/20 hover:border-white/40"
            >
              Experience Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Progress Indicator
const ProgressIndicator: React.FC<{ currentPhase: number; phases: typeof phases }> = ({ currentPhase, phases }) => (
  <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
    {phases.map((phase, idx) => (
      <div
        key={idx}
        className="group relative"
      >
        <div
          className={`w-3 h-12 rounded-full transition-all duration-500 ${
            idx === currentPhase
              ? 'w-4 h-16'
              : idx < currentPhase
                ? 'opacity-100'
                : 'opacity-30'
          }`}
          style={{
            backgroundColor: idx <= currentPhase ? phase.color : '#475569',
            boxShadow: idx === currentPhase ? `0 0 20px ${phase.color}` : 'none'
          }}
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-900 border border-white/20 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          <p className="text-sm font-bold text-white">{phase.title}</p>
          <p className="text-xs text-slate-400">{phase.subtitle}</p>
        </div>
      </div>
    ))}
  </div>
);

// Main Component
export const HowWeWork: React.FC<HowWeWorkProps> = ({ onNavigate }) => {
  const [currentPhase, setCurrentPhase] = useState(0);

  const nextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const restart = () => {
    setCurrentPhase(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPhase = () => {
    switch (phases[currentPhase].type) {
      case 'intro':
        return <IntroScreen onStart={nextPhase} />;
      case 'discovery':
        return <DiscoveryPhase onNext={nextPhase} />;
      case 'personas':
        return <PersonasPhase onNext={nextPhase} />;
      case 'validation':
        return <ValidationPhase onNext={nextPhase} />;
      case 'review':
        return <ReviewPhase onNext={nextPhase} />;
      case 'delivery':
        return <DeliveryPhase onRestart={restart} onNavigate={onNavigate} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-space text-white relative">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>

      <ProgressIndicator currentPhase={currentPhase} phases={phases} />

      <div className="transition-all duration-700">
        {renderPhase()}
      </div>
    </div>
  );
};
