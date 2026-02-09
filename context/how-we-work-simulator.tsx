import React, { useState, useEffect, useRef } from 'react';

// Icons as simple SVG components
const PlayIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const phases = [
  {
    id: 0,
    title: "Welcome",
    subtitle: "Your Journey Begins",
    color: "#ff4d6d",
    type: "intro"
  },
  {
    id: 1,
    title: "Discovery",
    subtitle: "Phase 01",
    color: "#38bdf8",
    type: "discovery"
  },
  {
    id: 2,
    title: "Meet Your Users",
    subtitle: "Phase 02",
    color: "#d946ef",
    type: "personas"
  },
  {
    id: 3,
    title: "Design Validation",
    subtitle: "Phase 03",
    color: "#f59e0b",
    type: "validation"
  },
  {
    id: 4,
    title: "Black & White Review",
    subtitle: "Phase 06",
    color: "#10b981",
    type: "review"
  },
  {
    id: 5,
    title: "Your Delivery",
    subtitle: "Phase 09",
    color: "#ff4d6d",
    type: "delivery"
  }
];

// Intro Screen
const IntroScreen = ({ onStart }) => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
    
    <div className="relative z-10 max-w-2xl">
      <div className="mb-8 text-red-400 text-sm font-bold tracking-widest uppercase animate-pulse">
        Interactive Experience
      </div>
      
      <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
        How We Work
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
          Is Better Experienced
        </span>
      </h1>
      
      <p className="text-xl text-slate-400 mb-12 leading-relaxed">
        Don't just read about our process. <strong className="text-white">Live it.</strong><br />
        Step into the role of a client and experience our 9-phase methodology firsthand.
      </p>
      
      <button
        onClick={onStart}
        className="group flex items-center gap-3 mx-auto bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/30"
      >
        <PlayIcon />
        Begin Your Journey
      </button>
      
      <p className="mt-8 text-slate-500 text-sm">
        ~3 minutes • Fully interactive • No signup required
      </p>
    </div>
  </div>
);

// Discovery Phase
const DiscoveryPhase = ({ onNext }) => {
  const [answered, setAnswered] = useState([]);
  const questions = [
    "What content needs to be transformed?",
    "Who will be using this training?",
    "What does success look like for you?"
  ];

  const handleAnswer = (idx) => {
    if (!answered.includes(idx)) {
      setAnswered([...answered, idx]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 border border-sky-500/30 rounded-full text-sky-400 text-sm font-bold mb-6">
            <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
            Phase 01: Discovery
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Let's Start With Your Goals
          </h2>
          <p className="text-slate-400">
            In our first meeting, we ask the questions that matter. Click each to explore.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {questions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-6 rounded-2xl border transition-all ${
                answered.includes(idx)
                  ? 'bg-sky-500/10 border-sky-500/50'
                  : 'bg-white/5 border-white/10 hover:border-sky-500/30 hover:bg-white/10'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  answered.includes(idx) ? 'bg-sky-500 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  {answered.includes(idx) ? <CheckIcon /> : idx + 1}
                </div>
                <div>
                  <p className="text-lg font-medium text-white">{q}</p>
                  {answered.includes(idx) && (
                    <p className="mt-2 text-sm text-slate-400 animate-fadeIn">
                      {idx === 0 && "We assess your existing materials — PDFs, slides, videos — and identify transformation opportunities."}
                      {idx === 1 && "Understanding your learners is crucial. This leads us to Phase 2..."}
                      {idx === 2 && "We define measurable outcomes so we can track real impact."}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {answered.length === 3 && (
          <div className="text-center animate-fadeIn">
            <p className="text-slate-400 mb-6">Great! Discovery complete. Now let's meet your actual users.</p>
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              Continue to Personas <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Personas Phase
const PersonasPhase = ({ onNext }) => {
  const [revealedPersona, setRevealedPersona] = useState(null);
  
  const personas = [
    {
      name: "Maria",
      role: "Warehouse Associate",
      context: "Completes training on phone during breaks",
      needs: "Quick, mobile-friendly, visual learning",
      avatar: "👩🏽‍🔧"
    },
    {
      name: "James",
      role: "New Hire Manager",
      context: "Desktop user, detailed documentation reader",
      needs: "Comprehensive content with easy navigation",
      avatar: "👨🏻‍💼"
    },
    {
      name: "Aisha",
      role: "Field Technician",
      context: "Limited connectivity, needs offline access",
      needs: "Downloadable resources, concise steps",
      avatar: "👩🏾‍🔬"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-bold mb-6">
            <UserIcon className="w-4 h-4" />
            Phase 02: Persona Identification
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            We Meet Your <span className="text-purple-400">Actual</span> Users
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Not just stakeholders. We interview the real people who will use your training. Click each persona to reveal who we discovered.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {personas.map((persona, idx) => (
            <button
              key={idx}
              onClick={() => setRevealedPersona(idx)}
              className={`relative p-6 rounded-2xl border text-left transition-all transform hover:scale-105 ${
                revealedPersona === idx
                  ? 'bg-purple-500/20 border-purple-500/50'
                  : 'bg-white/5 border-white/10 hover:border-purple-500/30'
              }`}
            >
              {revealedPersona !== idx ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">?</span>
                  </div>
                  <p className="text-slate-400">Click to reveal</p>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <div className="text-5xl mb-4">{persona.avatar}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{persona.name}</h3>
                  <p className="text-purple-400 text-sm font-medium mb-4">{persona.role}</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-400"><span className="text-slate-300">Context:</span> {persona.context}</p>
                    <p className="text-slate-400"><span className="text-slate-300">Needs:</span> {persona.needs}</p>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {revealedPersona !== null && (
          <div className="text-center animate-fadeIn">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 mb-8 max-w-xl mx-auto">
              <p className="text-purple-300 italic">
                "We design for your audience, not assumptions about your audience."
              </p>
            </div>
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              See Design Validation <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Validation Phase
const ValidationPhase = ({ onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-bold mb-6">
            <SparklesIcon />
            Phase 03: Design Validation
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            We Test Before We Build
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Before investing in production, we validate our design direction with real users. Which approach would work best for Maria?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Option A */}
          <button
            onClick={() => setSelectedOption('A')}
            className={`p-6 rounded-2xl border text-left transition-all ${
              selectedOption === 'A'
                ? 'bg-amber-500/20 border-amber-500/50 ring-2 ring-amber-500/30'
                : 'bg-white/5 border-white/10 hover:border-amber-500/30'
            }`}
          >
            <div className="text-sm font-bold text-amber-400 mb-4">Option A</div>
            <div className="bg-slate-800 rounded-xl p-4 mb-4 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📱</div>
                <p className="text-sm text-slate-400">Mobile-first cards</p>
                <p className="text-xs text-slate-500">Swipe navigation</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">Quick, visual, tap-through experience optimized for breaks</p>
          </button>

          {/* Option B */}
          <button
            onClick={() => setSelectedOption('B')}
            className={`p-6 rounded-2xl border text-left transition-all ${
              selectedOption === 'B'
                ? 'bg-amber-500/20 border-amber-500/50 ring-2 ring-amber-500/30'
                : 'bg-white/5 border-white/10 hover:border-amber-500/30'
            }`}
          >
            <div className="text-sm font-bold text-amber-400 mb-4">Option B</div>
            <div className="bg-slate-800 rounded-xl p-4 mb-4 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🖥️</div>
                <p className="text-sm text-slate-400">Traditional scroll</p>
                <p className="text-xs text-slate-500">Long-form content</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">Comprehensive documentation with sidebar navigation</p>
          </button>
        </div>

        {selectedOption && (
          <div className="text-center animate-fadeIn">
            <div className={`rounded-xl p-6 mb-8 max-w-xl mx-auto ${
              selectedOption === 'A' 
                ? 'bg-green-500/10 border border-green-500/20' 
                : 'bg-amber-500/10 border border-amber-500/20'
            }`}>
              {selectedOption === 'A' ? (
                <p className="text-green-300">
                  <strong>Great choice!</strong> Based on Maria's context (phone during breaks), this is exactly what we'd recommend. User validation confirmed!
                </p>
              ) : (
                <p className="text-amber-300">
                  <strong>Interesting choice.</strong> This might work for James, but Maria needs mobile-first. That's why we test — we catch these mismatches early!
                </p>
              )}
            </div>
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-xl font-bold transition-all"
            >
              Review Content <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Black & White Review Phase
const ReviewPhase = ({ onNext }) => {
  const [approved, setApproved] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-bold mb-6">
            <FileIcon />
            Phase 06: Black & White Content
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            You See Everything First
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Before any production begins, you review and approve all content in plain text. No expensive surprises.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-8 max-w-2xl mx-auto shadow-2xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <h3 className="text-slate-900 font-bold">Module 1: Warehouse Safety</h3>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
              Pending Review
            </span>
          </div>
          
          <div className="prose prose-slate text-sm">
            <p className="text-slate-700 mb-4">
              <strong>Learning Objective:</strong> By the end of this module, learners will be able to identify and respond to common warehouse hazards.
            </p>
            <p className="text-slate-600 mb-4">
              <strong>Lesson 1.1:</strong> Introduction to Warehouse Safety
            </p>
            <p className="text-slate-500 mb-4 italic">
              [VIDEO SCRIPT]<br />
              "Welcome to your warehouse safety training. In the next 10 minutes, we'll cover the essential protocols that keep you and your team safe every day..."
            </p>
            <p className="text-slate-600">
              <strong>Knowledge Check:</strong> Which of the following is the first step when you notice a spill?
            </p>
            <ul className="text-slate-500 text-sm">
              <li>A) Clean it immediately</li>
              <li>B) Mark the area and report it ✓</li>
              <li>C) Walk around it</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          {!approved ? (
            <button
              onClick={() => setApproved(true)}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              <CheckIcon /> Approve Content
            </button>
          ) : (
            <div className="animate-fadeIn">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-8 max-w-xl mx-auto">
                <p className="text-emerald-300">
                  <strong>Content Approved!</strong> Now we move to production with confidence. No expensive rework, no scope creep.
                </p>
              </div>
              <button
                onClick={onNext}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-xl font-bold transition-all"
              >
                See Your Delivery <ArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Delivery Phase
const DeliveryPhase = ({ onRestart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Celebration effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-3xl w-full relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-bold mb-6">
            🎉 Phase 09: Delivery
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Your Transformation is Complete
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            From chaotic PDFs to an accessible, engaging, mobile-first learning experience.
          </p>
        </div>

        {/* Before/After */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="text-center">
            <p className="text-sm font-bold text-red-400 mb-4 uppercase tracking-wider">Before</p>
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
              <div className="text-6xl mb-4 opacity-50">📄</div>
              <p className="text-slate-500">Static PDF</p>
              <p className="text-slate-600 text-sm">Not accessible • Not mobile-friendly</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-emerald-400 mb-4 uppercase tracking-wider">After</p>
            <div className="bg-gradient-to-br from-emerald-500/20 to-sky-500/20 rounded-2xl p-6 border border-emerald-500/30">
              <div className="text-6xl mb-4">✨</div>
              <p className="text-white font-bold">Interactive Experience</p>
              <p className="text-emerald-300 text-sm">WCAG 2.1 AA • Mobile-first • Engaging</p>
            </div>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-12">
          <h3 className="text-white font-bold mb-6 text-center">Choose Your Delivery</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-2xl mb-2">📦</div>
              <p className="text-white font-medium">HTML Package</p>
              <p className="text-slate-500 text-xs">Full source, you edit</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-2xl mb-2">🎓</div>
              <p className="text-white font-medium">SCORM</p>
              <p className="text-slate-500 text-xs">LMS tracking built-in</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-white font-medium">API Push</p>
              <p className="text-slate-500 text-xs">Direct to your LMS</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-slate-400 mb-6">
            You just experienced our 9-phase methodology. Ready to do this for real?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {}}
              className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              Schedule Discovery Call
            </button>
            <button
              onClick={onRestart}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all border border-white/20"
            >
              Experience Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Progress indicator
const ProgressIndicator = ({ currentPhase, phases }) => (
  <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
    {phases.map((phase, idx) => (
      <div
        key={idx}
        className={`w-2 h-8 rounded-full transition-all ${
          idx === currentPhase 
            ? 'w-3' 
            : idx < currentPhase 
              ? 'opacity-100' 
              : 'opacity-30'
        }`}
        style={{ 
          backgroundColor: idx <= currentPhase ? phase.color : '#374151' 
        }}
        title={phase.title}
      />
    ))}
  </div>
);

// Main App
export default function HowWeWorkSimulator() {
  const [currentPhase, setCurrentPhase] = useState(0);

  const nextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    }
  };

  const restart = () => {
    setCurrentPhase(0);
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
        return <DeliveryPhase onRestart={restart} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
      
      <ProgressIndicator currentPhase={currentPhase} phases={phases} />
      
      <div className="transition-all duration-500">
        {renderPhase()}
      </div>
    </div>
  );
}
