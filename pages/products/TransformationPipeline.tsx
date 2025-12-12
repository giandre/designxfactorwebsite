import React, { useEffect, useState } from 'react';
import { NavProps } from '../../types';
import { 
  FileText, FileType, Scan, CheckCircle, 
  Monitor, Smartphone, ArrowRight, ChevronRight, Home,
  Eye, Video, Layers, ShieldCheck, Zap, Users, RefreshCw,
  FileCheck, LayoutGrid, Sparkles, X
} from 'lucide-react';

export const TransformationPipeline: React.FC<{ onNavigate: NavProps['onNavigate'] }> = ({ onNavigate }) => {
  const [activeStage, setActiveStage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRequestDemo = () => {
    onNavigate('home');
    // Longer timeout to ensure home page fully renders before scrolling
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const handleRunAudit = () => {
    onNavigate('audit');
    window.scrollTo(0, 0);
  };

  const stages = [
    {
      id: 1,
      number: "01",
      title: "Legacy Content Chaos",
      subtitle: "SOURCE",
      color: "#ef4444",
      description: "Unstructured, locked, non-compliant files at scale",
      details: [
        "PDFs, Word docs, PowerPoints scattered across your LMS",
        "Scanned documents with no text layer",
        "Inaccessible images without descriptions",
        "Inconsistent formatting and structure"
      ],
      icon: FileType
    },
    {
      id: 2,
      number: "02",
      title: "Intelligent Intake & Analysis",
      subtitle: "PROCESSING",
      color: "#38bdf8",
      description: "AI-powered document analysis and extraction",
      details: [
        "AI OCR text extraction from any document",
        "Image analysis with auto-generated alt-text",
        "Semantic structure identification (headings, lists)",
        "Dual-path options: Keep PDF or convert to HTML"
      ],
      icon: Scan
    },
    {
      id: 3,
      number: "03",
      title: "Automated Compliance Loop",
      subtitle: "VALIDATION",
      color: "#f59e0b",
      description: "WCAG alignment checking with iterative remediation",
      details: [
        "Automated WCAG 2.1 AA compliance checking",
        "Issues flagged and auto-remediated",
        "Multiple passes until 100% match achieved",
        "Complex elements flagged for human review"
      ],
      icon: RefreshCw
    },
    {
      id: 4,
      number: "04",
      title: "Human-in-the-Loop Dashboard",
      subtitle: "REVIEW",
      color: "#d946ef",
      description: "Visualize issues, make adjustments, final approval",
      details: [
        "Course-level compliance overview dashboard",
        "Drill down to individual content items",
        "Visual editor for manual adjustments",
        "Approve or request re-processing"
      ],
      icon: Monitor
    },
    {
      id: 5,
      number: "05",
      title: "LMS Integration & Delivery",
      subtitle: "DESTINATION",
      color: "#10b981",
      description: "Compliant, mobile-ready, accessible learning experiences",
      details: [
        "One-click publish back to your LMS",
        "Mobile-responsive HTML output",
        "Full audit trail and compliance reports",
        "Optional: Fully automated pipeline"
      ],
      icon: Layers
    }
  ];

  const currentStage = stages.find(s => s.id === activeStage);

  return (
    <div className="min-h-screen bg-space text-slate-200 pt-20">
      
      {/* Breadcrumbs */}
      <div className="px-6 py-4 border-b border-white/5 bg-space/50 backdrop-blur-sm sticky top-[70px] z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-slate-500">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Home size={14} /> Home
          </button>
          <ChevronRight size={14} />
          <span>Solutions</span>
          <ChevronRight size={14} />
          <span className="text-white font-medium">Content Transformation Pipeline</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-brand-blue text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} /> Scale & Remediation
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            The Accessible Content<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
              Transformation Pipeline
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mb-8 leading-relaxed">
            Migrate your legacy content at scale while achieving WCAG 2.1 AA compliance. 
            Keep your original formats or transform them into mobile-ready, accessible HTML—the choice is yours.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleRequestDemo}
              className="flex items-center gap-2 bg-brand-red hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-red/20"
            >
              Schedule Demo <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Key Value Props */}
      <section className="py-16 px-6 bg-[#08080c] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <FileCheck className="text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Keep or Convert</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Maintain original PDF format or transform to responsive HTML—your choice, our execution.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/20 rounded-2xl flex items-center justify-center">
                <Smartphone className="text-brand-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile-Ready Output</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                HTML renders beautifully on any device. No more pinching and zooming on PDFs.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-purple/20 rounded-2xl flex items-center justify-center">
                <Users className="text-brand-purple" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Human-in-the-Loop</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Review everything before publishing, or fully automate—control is in your hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Pipeline Visualization */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The 5-Stage Pipeline</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Click each stage to explore how we transform your content from chaos to compliance.
            </p>
          </div>

          {/* Stage Selector - Horizontal on Desktop */}
          <div className="hidden lg:flex items-center justify-between mb-12 relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-purple -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${((activeStage - 1) / 4) * 100}%` }}
            />
            
            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`relative z-10 flex flex-col items-center gap-2 p-4 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                  activeStage === stage.id 
                    ? 'bg-slate-800 scale-110' 
                    : 'bg-slate-900/50 hover:bg-slate-800/50 opacity-60 hover:opacity-100'
                }`}
              >
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                    activeStage === stage.id ? 'border-current' : 'border-slate-700'
                  }`}
                  style={{ 
                    color: activeStage === stage.id ? stage.color : '#64748b',
                    backgroundColor: activeStage === stage.id ? `${stage.color}20` : 'transparent'
                  }}
                >
                  <stage.icon size={24} />
                </div>
                <span className="text-xs font-bold" style={{ color: activeStage === stage.id ? stage.color : '#64748b' }}>
                  {stage.number}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Stage Selector */}
          <div className="lg:hidden grid grid-cols-3 gap-2 mb-8">
            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all text-center ${
                  activeStage === stage.id 
                    ? 'text-white' 
                    : 'bg-slate-800/50 text-slate-400'
                }`}
                style={{ 
                  backgroundColor: activeStage === stage.id ? stage.color : undefined 
                }}
              >
                {stage.number}
              </button>
            ))}
          </div>

          {/* Active Stage Detail */}
          {currentStage && (
            <div 
              className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500"
              key={currentStage.id}
            >
              <div 
                className="p-6 border-b border-white/10"
                style={{ background: `linear-gradient(135deg, ${currentStage.color}20, transparent)` }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${currentStage.color}30` }}
                  >
                    <currentStage.icon size={32} style={{ color: currentStage.color }} />
                  </div>
                  <div>
                    <span 
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: currentStage.color }}
                    >
                      Stage {currentStage.number} — {currentStage.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-white">{currentStage.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-lg text-slate-300 mb-6">{currentStage.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {currentStage.details.map((detail, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/5"
                    >
                      <CheckCircle size={18} style={{ color: currentStage.color }} className="mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Stage-specific callouts */}
                {currentStage.id === 2 && (
                  <div className="mt-6 p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-xl">
                    <h4 className="font-bold text-brand-blue mb-2 flex items-center gap-2">
                      <Zap size={16} /> Dual-Path Migration
                    </h4>
                    <p className="text-sm text-slate-300">
                      Choose to keep your original PDF format (migrated as-is) or transform to HTML5 for 
                      improved mobile responsiveness and readability. Both paths include accessibility remediation.
                    </p>
                  </div>
                )}

                {currentStage.id === 4 && (
                  <div className="mt-6 p-4 bg-brand-purple/10 border border-brand-purple/20 rounded-xl">
                    <h4 className="font-bold text-brand-purple mb-2 flex items-center gap-2">
                      <Eye size={16} /> Full Visibility & Control
                    </h4>
                    <p className="text-sm text-slate-300">
                      View compliance status at the course, module, or individual content level. 
                      See what's been resolved, what needs review, and approve changes before they go live.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PDF vs HTML Comparison */}
      <section className="py-20 px-6 bg-[#08080c] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">PDF vs HTML: Why It Matters</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Both formats can be made compliant. But HTML unlocks a better experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* PDF Column */}
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <FileType className="text-red-400" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">PDF (Migrated As-Is)</h3>
                  <span className="text-sm text-slate-500">Original format preserved</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Accessibility tags added
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Reading order defined
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Alt text for images
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <X size={16} className="text-red-400 flex-shrink-0" /> Fixed layout on mobile
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <X size={16} className="text-red-400 flex-shrink-0" /> Requires pinch/zoom
                </li>
              </ul>
            </div>

            {/* HTML Column */}
            <div className="bg-slate-900/50 border-2 border-green-500/30 rounded-2xl p-8 relative">
              <div className="absolute -top-3 right-4 bg-green-500 text-space text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <LayoutGrid className="text-green-400" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">HTML5 (Transformed)</h3>
                  <span className="text-sm text-green-400">Enhanced experience</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Semantic structure built-in
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Fully responsive design
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Native mobile experience
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Searchable text content
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Ready for multimodal upgrades
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Future Layers Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
              Foundation for Growth
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">Beyond Compliance: Future Layers</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Once your content is compliant, unlock additional value-add services to transform the learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-brand-purple/30 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-purple/20 rounded-xl group-hover:bg-brand-purple/30 transition-colors">
                  <Sparkles className="text-brand-purple" size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-purple uppercase tracking-wider">Layer 2</span>
                  <h3 className="text-lg font-bold text-white mt-1">Engagement & Themes</h3>
                  <p className="text-sm text-slate-400 mt-2">
                    Re-theme your pages with modern, visually engaging designs that improve learner engagement.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-brand-gold/30 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-gold/20 rounded-xl group-hover:bg-brand-gold/30 transition-colors">
                  <Video className="text-brand-gold" size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">Layer 3</span>
                  <h3 className="text-lg font-bold text-white mt-1">Multimodal Voice & Video</h3>
                  <p className="text-sm text-slate-400 mt-2">
                    Add AI-generated audio narration and video content for a true multimodal learning experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue via-brand-purple to-green-500" />
          
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to Transform Your Content?
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            See how the Transformation Pipeline can remediate your legacy content at scale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleRequestDemo}
              className="bg-white text-space hover:bg-slate-200 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Request a Demo
            </button>
            <button 
              onClick={handleRunAudit}
              className="border border-white/20 text-white hover:bg-white/5 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Run Content Audit
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};