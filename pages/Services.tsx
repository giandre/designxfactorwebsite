import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Video,
  Headphones,
  GraduationCap,
  Shield,
  ArrowRight,
  Clock,
  Sparkles,
  Users,
  CheckCircle,
  Play,
  FileText,
  Mic,
  Eye,
  ScanLine
} from 'lucide-react';
import { PageView } from '../types';
import { SampleViewer } from '../components/SampleViewer';

interface ServicesProps {
  onNavigate: (page: PageView) => void;
}

const services = [
  {
    id: 'ebook',
    name: 'eBook Creation',
    tagline: 'From documents to digital experiences',
    description: 'Transform your PDFs, Word documents, and training manuals into beautifully designed, interactive eBooks that engage readers across all devices.',
    icon: BookOpen,
    color: 'brand-blue',
    hex: '#38bdf8',
    deliverables: [
      'Responsive digital eBook',
      'Interactive table of contents',
      'Embedded multimedia support',
      'WCAG 2.1 AA accessible'
    ],
    sampleType: 'ebook' as const,
    sampleTitle: 'Interactive Anatomy eBook',
    sampleDescription: 'Split-screen experience combining custom interactive learning on the left with the original source PDF on the right.',
    thumbnail: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/thumbnails/interactiveanatomyebook.jpg',
    sampleContent: {
      type: 'ebook',
      src: '/samples/Ebook Explainer/1_6_anatomical_terminology___anatomy_and_physiology_2e_contextualize.html'
    }
  },
  {
    id: 'video',
    name: 'Video Production',
    tagline: 'Give your content a voice and face',
    description: 'Convert text-based content into professional video lessons with AI-generated presenters, animations, and engaging visuals.',
    icon: Video,
    color: 'brand-purple',
    hex: '#d946ef',
    deliverables: [
      'Professional video modules',
      'AI or human presenters',
      'Captions and transcripts',
      'LMS-ready formats'
    ],
    sampleType: 'video' as const,
    sampleTitle: 'Interactive Math Videos',
    sampleDescription: 'OpenStax textbook content transformed into engaging video lessons with extracted source images.',
    thumbnail: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/thumbnails/interactive-math-video.jpg',
    sampleContent: {
      type: 'video',
      src: '/samples/Add & Substract Integers/Add and Subtract Integers -Regular Video.html'
    }
  },
  {
    id: 'audio',
    name: 'Audio & Podcasts',
    tagline: 'Learning on the go',
    description: 'Create podcast-style audio content from your materials, perfect for mobile learning and commute-time education.',
    icon: Headphones,
    color: 'brand-gold',
    hex: '#f59e0b',
    deliverables: [
      'Professional audio narration',
      'Podcast-style episodes',
      'Chapter markers',
      'Transcript documents'
    ],
    sampleType: 'audio' as const,
    sampleTitle: 'Conversational AI Experiences',
    sampleDescription: 'Live AI interviews and AI-generated podcasts showcasing our conversational AI capabilities.',
    thumbnail: null, // No thumbnail for audio - will use icon fallback
    sampleContent: {
      type: 'audio',
      items: [
        {
          id: 'ai-interview',
          title: 'Live AI Interview',
          description: 'Unedited real-time AI interview demonstrating conversational AI capabilities.',
          src: '/samples/ConversationalAI/AIInterview.wav',
          duration: '~5 min',
          captions: [
            { start: 0, end: 9.22, text: "Welcome to the show, folks. I'm your host, Alexa, bringing you the latest and greatest" },
            { start: 9.22, end: 16.62, text: "in, well, interesting topics. Today, we're diving into the topic on everyone's mind." },
            { start: 16.62, end: 23.56, text: "Is AI making us dumber? And to help me unravel this complex issue, I've got the brilliant" },
            { start: 23.56, end: 31.5, text: "Geo joining me today. Geo, it's a pleasure to have you. Now Geo, let's start with the" },
            { start: 31.5, end: 37.26, text: "big question. With all this AI doing all the work for us, are we actually becoming less" },
            { start: 37.26, end: 51.26, text: "capable? It depends. So I always say that AI is making the smart smarter and the dumb dumber." },
            { start: 51.26, end: 58.12, text: "And what I mean by that is that basically, it's all about how you're using it." },
            { start: 58.12, end: 70.84, text: "And those who want to use it for taking it easy, you know, completing an assignment quickly, without using the brains..." },
            { start: 70.84, end: 82.92, text: "They're going to be able to do that. But they are missing out really what AI can give us." },
            { start: 82.92, end: 101.78, text: "That's a very insightful perspective. So you're saying that the key is how we choose to utilize these tools..." },
            { start: 101.78, end: 122.84, text: "Oh, yeah, for sure. Those who truly use AI in the right way and leverage their critical thinking..." },
            { start: 122.84, end: 150.08, text: "There is going to be a gap that's going to be stretching farther apart from those who are just simply using it as a tool." },
            { start: 150.08, end: 172.52, text: "I come from Colombia, South America. My first language is Spanish. AI is the next language we all have to learn." },
            { start: 172.52, end: 206.44, text: "We have to become bilingual and really learn this language to be proficient, to be effective, and don't lag behind." },
            { start: 206.44, end: 250.16, text: "It is not making us dumber if you do it right. It can help you do things that you didn't do before..." },
            { start: 250.16, end: 298.24, text: "I've been learning in the last two years 10 times more than what I have done in the last 10 years because of AI." }
          ]
        },
        {
          id: 'ai-podcast',
          title: 'AI-Generated Podcast',
          description: 'Transforming Higher Education with AI-Ready Content - A fully AI-generated podcast episode.',
          spotifyEmbedUrl: 'https://open.spotify.com/embed/episode/237x5iKQGaC1fc3IfjG1MH?utm_source=generator&theme=0',
          duration: '~20 min'
        }
      ]
    }
  },
  {
    id: 'course',
    name: 'Full Course Development',
    tagline: 'Complete learning experiences',
    description: 'End-to-end course creation combining all formats: structured modules, assessments, videos, and interactive elements - delivered in weeks, not months.',
    icon: GraduationCap,
    color: 'brand-red',
    hex: '#ff4d6d',
    deliverables: [
      'Multi-module course structure',
      'Mixed media content',
      'Knowledge checks & quizzes',
      'LMS integration ready'
    ],
    sampleType: 'course' as const,
    sampleTitle: '7-Week Entrepreneurship Course',
    sampleDescription: 'Our baseline course tier: AI-generated audio, responsive design, and full accessibility.',
    thumbnail: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/thumbnails/enterprenurshipcourse.jpg',
    sampleContent: {
      type: 'course',
      basePath: '/samples/CourseExperience/output',
      weeks: [
        {
          number: 1,
          title: 'Foundation & Vision',
          locked: false,
          lessons: [
            { id: '1-1', title: 'Lesson 1.1', src: '/samples/CourseExperience/output/lessons/lesson-1-1.html' },
            { id: '1-2', title: 'Lesson 1.2', src: '/samples/CourseExperience/output/lessons/lesson-1-2.html' },
            { id: '1-3', title: 'Lesson 1.3', src: '/samples/CourseExperience/output/lessons/lesson-1-3.html' },
            { id: '1-4', title: 'Lesson 1.4', src: '/samples/CourseExperience/output/lessons/lesson-1-4.html' }
          ]
        },
        {
          number: 2,
          title: 'Market Research',
          locked: true,
          lessons: [
            { id: '2-1', title: 'Lesson 2.1', src: '/samples/CourseExperience/output/lessons/lesson-2-1.html' },
            { id: '2-2', title: 'Lesson 2.2', src: '/samples/CourseExperience/output/lessons/lesson-2-2.html' }
          ]
        },
        {
          number: 3,
          title: 'Business Model',
          locked: true,
          lessons: [
            { id: '3-1', title: 'Lesson 3.1', src: '/samples/CourseExperience/output/lessons/lesson-3-1.html' }
          ]
        }
      ]
    }
  },
  {
    id: 'accessibility',
    name: 'Accessibility Remediation',
    tagline: 'Compliance without compromise',
    description: 'Bring your existing content into WCAG 2.1 AA compliance. We audit, remediate, and certify your materials for accessibility.',
    icon: Shield,
    color: 'green',
    hex: '#10b981',
    deliverables: [
      'Accessibility audit report',
      'Document remediation',
      'Alt-text & captions',
      'Compliance certification'
    ],
    sampleType: null,
    isScanner: true
  }
];

const valuePillars = [
  {
    spanish: 'Bueno',
    english: 'Quality',
    description: 'Expert instructional design and pedagogically sound content',
    icon: Sparkles
  },
  {
    spanish: 'Bonito',
    english: 'Beautiful',
    description: 'Stunning visual design that engages and inspires learners',
    icon: Users
  },
  {
    spanish: 'Barato',
    english: 'Affordable',
    description: 'Enterprise-level quality without enterprise-level budgets',
    icon: Clock
  }
];

// Accessibility Scanner Animation Component
const AccessibilityScanner: React.FC<{ hex: string }> = ({ hex }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [issues, setIssues] = useState<{ id: number; type: string; fixed: boolean }[]>([]);
  const [phase, setPhase] = useState<'scanning' | 'fixing' | 'complete'>('scanning');

  useEffect(() => {
    // Reset animation on mount
    setScanProgress(0);
    setIssues([]);
    setPhase('scanning');

    // Scanning phase
    const scanInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          return 100;
        }
        // Add issues at certain progress points
        if (prev === 20) setIssues(i => [...i, { id: 1, type: 'Missing alt text', fixed: false }]);
        if (prev === 40) setIssues(i => [...i, { id: 2, type: 'Low contrast', fixed: false }]);
        if (prev === 60) setIssues(i => [...i, { id: 3, type: 'Missing labels', fixed: false }]);
        if (prev === 80) setIssues(i => [...i, { id: 4, type: 'Focus order', fixed: false }]);
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(scanInterval);
  }, []);

  // Switch to fixing phase when scan completes
  useEffect(() => {
    if (scanProgress === 100 && phase === 'scanning') {
      const timer = setTimeout(() => setPhase('fixing'), 500);
      return () => clearTimeout(timer);
    }
  }, [scanProgress, phase]);

  // Fix issues one by one
  useEffect(() => {
    if (phase === 'fixing') {
      const unfixedIndex = issues.findIndex(i => !i.fixed);
      if (unfixedIndex >= 0) {
        const timer = setTimeout(() => {
          setIssues(prev => prev.map((issue, idx) =>
            idx === unfixedIndex ? { ...issue, fixed: true } : issue
          ));
        }, 600);
        return () => clearTimeout(timer);
      } else if (issues.length > 0) {
        const timer = setTimeout(() => setPhase('complete'), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, issues]);

  // Restart animation after complete
  useEffect(() => {
    if (phase === 'complete') {
      const timer = setTimeout(() => {
        setScanProgress(0);
        setIssues([]);
        setPhase('scanning');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
      {/* Document representation */}
      <div className="relative w-48 h-56 bg-white/5 border border-white/20 rounded-lg overflow-hidden mb-4">
        {/* Fake document lines */}
        <div className="absolute inset-4 space-y-2">
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-3 bg-white/5 rounded w-full" />
          <div className="h-3 bg-white/5 rounded w-5/6" />
          <div className="h-8 bg-white/5 rounded w-1/2 mt-3" />
          <div className="h-3 bg-white/5 rounded w-full mt-3" />
          <div className="h-3 bg-white/5 rounded w-4/5" />
          <div className="h-3 bg-white/5 rounded w-full" />
          <div className="h-3 bg-white/5 rounded w-2/3" />
        </div>

        {/* Scanning line */}
        {phase === 'scanning' && (
          <div
            className="absolute left-0 right-0 h-1 transition-all duration-100"
            style={{
              top: `${scanProgress}%`,
              background: `linear-gradient(90deg, transparent, ${hex}, transparent)`,
              boxShadow: `0 0 20px ${hex}`
            }}
          />
        )}

        {/* Complete checkmark overlay */}
        {phase === 'complete' && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-green-500/30 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-400" />
            </div>
          </div>
        )}
      </div>

      {/* Progress info */}
      <div className="text-center w-full max-w-xs">
        {phase === 'scanning' && (
          <>
            <div className="flex items-center justify-center gap-2 text-sm mb-2">
              <ScanLine size={16} style={{ color: hex }} className="animate-pulse" />
              <span style={{ color: hex }}>Scanning document...</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-100 rounded-full"
                style={{ width: `${scanProgress}%`, backgroundColor: hex }}
              />
            </div>
          </>
        )}

        {phase === 'fixing' && (
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${hex} transparent ${hex} ${hex}` }} />
            <span style={{ color: hex }}>Auto-remediating issues...</span>
          </div>
        )}

        {phase === 'complete' && (
          <div className="flex items-center justify-center gap-2 text-sm text-green-400">
            <CheckCircle size={16} />
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        )}
      </div>

      {/* Issues list */}
      {issues.length > 0 && (
        <div className="mt-4 space-y-1.5 w-full max-w-xs">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded transition-all ${
                issue.fixed
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-red-500/10 text-red-400'
              }`}
            >
              {issue.fixed ? (
                <CheckCircle size={12} />
              ) : (
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
              )}
              <span>{issue.type}</span>
              {issue.fixed && <span className="ml-auto text-green-500">Fixed</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const [activeService, setActiveService] = useState<string>('course');
  const [viewerOpen, setViewerOpen] = useState(false);
  const activeServiceData = services.find(s => s.id === activeService) || services[3];

  const scrollToContact = () => {
    onNavigate('home');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-space">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px]" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px]" aria-hidden="true" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <Sparkles size={16} className="text-brand-gold" />
              <span className="text-sm text-slate-300">Transform Satisfactory Into Extraordinary</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              We Design{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-red">
                Learning Experiences
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              From PDF to podcast. From manual to masterclass. We transform your content into engaging, accessible learning experiences — <span className="text-white font-semibold">in weeks, not months</span>.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 bg-brand-red text-white font-bold rounded-xl shadow-[0_0_30px_rgba(255,77,109,0.3)] hover:shadow-[0_0_40px_rgba(255,77,109,0.5)] transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-space"
              >
                Start Your Transformation
              </button>
              <button
                onClick={() => onNavigate('portfolio')}
                className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-space flex items-center gap-2"
              >
                View Our Work <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars - Bueno, Bonito, Barato */}
      <section className="py-16 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {valuePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 mb-6 group-hover:bg-white/10 transition-colors">
                  <pillar.icon size={28} className="text-brand-gold" />
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-black text-white">{pillar.spanish}</span>
                  <span className="text-slate-500 mx-2">·</span>
                  <span className="text-lg text-slate-400">{pillar.english}</span>
                </div>
                <p className="text-slate-400">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24" aria-labelledby="services-heading">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="services-heading" className="text-4xl md:text-5xl font-black text-white mb-6">
              Our Services
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Choose the format that fits your needs, or combine them for a complete learning experience.
            </p>
          </div>

          {/* Service Navigation - Desktop */}
          <div className="hidden lg:flex justify-center gap-2 mb-12">
            {services.map((service) => {
              const isActive = activeService === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-space ${
                    isActive
                      ? 'bg-white text-space shadow-lg'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                  style={{
                    focusVisibleRingColor: service.hex
                  }}
                >
                  <service.icon size={18} />
                  {service.name}
                </button>
              );
            })}
          </div>

          {/* Service Navigation - Mobile */}
          <div className="lg:hidden mb-8">
            <div className="grid grid-cols-2 gap-2">
              {services.map((service) => {
                const isActive = activeService === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`p-4 rounded-xl font-semibold transition-all flex flex-col items-center gap-2 text-sm focus:outline-none focus-visible:ring-2 ${
                      isActive
                        ? 'bg-white text-space shadow-lg'
                        : 'bg-white/5 text-slate-300 border border-white/10'
                    }`}
                  >
                    <service.icon size={20} />
                    {service.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Service Detail */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="order-2 lg:order-1">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: `${activeServiceData.hex}20` }}
              >
                <activeServiceData.icon size={18} style={{ color: activeServiceData.hex }} />
                <span className="text-sm font-semibold" style={{ color: activeServiceData.hex }}>
                  {activeServiceData.tagline}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
                {activeServiceData.name}
              </h3>

              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {activeServiceData.description}
              </p>

              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                  What You Get
                </h4>
                <ul className="space-y-3">
                  {activeServiceData.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle size={18} style={{ color: activeServiceData.hex }} />
                      <span className="text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={scrollToContact}
                className="px-8 py-4 font-bold rounded-xl transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-space flex items-center gap-2 text-white"
                style={{
                  backgroundColor: activeServiceData.hex,
                  boxShadow: `0 0 30px ${activeServiceData.hex}40`
                }}
              >
                Get Started <ArrowRight size={18} />
              </button>
            </div>

            {/* Preview Side */}
            <div className="order-1 lg:order-2">
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${activeServiceData.hex}10, transparent)`
                }}
                onClick={() => !('isScanner' in activeServiceData && activeServiceData.isScanner) && setViewerOpen(true)}
              >
                {/* Accessibility Scanner Animation */}
                {'isScanner' in activeServiceData && activeServiceData.isScanner ? (
                  <AccessibilityScanner hex={activeServiceData.hex} />
                ) : (
                  <>
                    {/* Thumbnail Background */}
                    {'thumbnail' in activeServiceData && activeServiceData.thumbnail ? (
                      <img
                        src={activeServiceData.thumbnail}
                        alt={'sampleTitle' in activeServiceData ? activeServiceData.sampleTitle : activeServiceData.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : null}

                    {/* Overlay with play button */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-all ${
                      'thumbnail' in activeServiceData && activeServiceData.thumbnail
                        ? 'bg-black/50 group-hover:bg-black/40'
                        : ''
                    }`}>
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: 'thumbnail' in activeServiceData && activeServiceData.thumbnail
                            ? `${activeServiceData.hex}90`
                            : `${activeServiceData.hex}20`
                        }}
                      >
                        {activeServiceData.id === 'video' ? (
                          <Play size={32} className="text-white ml-1" />
                        ) : activeServiceData.id === 'audio' ? (
                          <Mic size={32} className="text-white" />
                        ) : activeServiceData.id === 'ebook' ? (
                          <BookOpen size={32} className="text-white" />
                        ) : (
                          <activeServiceData.icon size={32} className="text-white" />
                        )}
                      </div>
                      <p className="text-white text-sm text-center mb-2 font-semibold drop-shadow-lg">
                        {'sampleTitle' in activeServiceData ? activeServiceData.sampleTitle : ''}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewerOpen(true);
                        }}
                        className="mt-2 px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 hover:scale-105 bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                      >
                        <Eye size={16} />
                        View Live Demo
                      </button>
                    </div>
                  </>
                )}

                {/* Decorative grid - only show if no thumbnail */}
                {!('thumbnail' in activeServiceData && activeServiceData.thumbnail) && (
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(${activeServiceData.hex}10 1px, transparent 1px), linear-gradient(90deg, ${activeServiceData.hex}10 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Advantage Section */}
      <section className="py-24 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 border border-brand-gold/20 rounded-full mb-8">
              <Clock size={16} className="text-brand-gold" />
              <span className="text-sm text-brand-gold font-semibold">Rapid Delivery</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Weeks, Not Months
            </h2>

            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Traditional course development takes 3-6 months. Our AI-enhanced workflow delivers the same quality in a fraction of the time.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-5xl font-black text-slate-500 mb-2">3-6</div>
                <div className="text-slate-400">months traditional</div>
              </div>
              <div className="p-8 rounded-2xl bg-brand-gold/10 border border-brand-gold/30">
                <div className="text-5xl font-black text-brand-gold mb-2">2-4</div>
                <div className="text-brand-gold/80">weeks with us</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-brand-red/20 via-brand-purple/10 to-brand-blue/20 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Ready to Transform Your Content?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Let's discuss your project and show you what's possible.
            </p>
            <button
              onClick={scrollToContact}
              className="px-10 py-5 bg-brand-red text-white font-bold text-lg rounded-xl shadow-[0_0_40px_rgba(255,77,109,0.4)] hover:shadow-[0_0_60px_rgba(255,77,109,0.6)] transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-space"
            >
              Schedule a Conversation
            </button>
          </div>
        </div>
      </section>

      {/* Powered By Footer Note */}
      <section className="py-8 border-t border-white/5">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm text-slate-500">
            Powered by our proprietary transformation technology
          </p>
        </div>
      </section>

      {/* Sample Viewer Modal */}
      {'sampleContent' in activeServiceData && activeServiceData.sampleContent && (
        <SampleViewer
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
          type={activeServiceData.sampleType!}
          title={'sampleTitle' in activeServiceData ? activeServiceData.sampleTitle : activeServiceData.name}
          description={'sampleDescription' in activeServiceData ? activeServiceData.sampleDescription : activeServiceData.description}
          content={activeServiceData.sampleContent}
        />
      )}
    </div>
  );
};
