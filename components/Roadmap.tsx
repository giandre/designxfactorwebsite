import React from 'react';
import { UserCheck, GitBranch, Cpu, TrendingUp, Target, BarChart, Clock } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const features = [
    { icon: UserCheck, text: "Learner profile creation & evolution" },
    { icon: GitBranch, text: "Dynamic content sequencing" },
    { icon: Cpu, text: "Machine learning optimization" },
    { icon: TrendingUp, text: "Cross-course insights" },
    { icon: Target, text: "Efficient outcome achievement" },
    { icon: BarChart, text: "Comprehensive learning analytics" },
  ];

  return (
    <section 
      id="roadmap" 
      className="py-24 bg-space relative scroll-mt-24"
      aria-labelledby="roadmap-heading"
    >
      {/* Background Glow - Decorative */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <header className="text-center mb-16">
          <h2 id="roadmap-heading" className="text-4xl md:text-5xl font-black text-white mb-6">
            Our Vision: The Dynamic Platform
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Where we're headed—building the future of personalized learning.
          </p>
        </header>

        <article className="bg-gradient-to-br from-[#111118] to-[#0a0a0f] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative Icon */}
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none" aria-hidden="true">
            <Cpu size={200} className="text-brand-purple" />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="bg-brand-red/20 text-brand-red border border-brand-red/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
              Coming Soon
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Dynamic Learning Platform
          </h3>
          
          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4 mb-10">
            <p>
              Imagine a learning experience that adapts to each student in real-time. Once you've built rich, multimodal courses with our platform, the Dynamic Platform takes it further—creating personalized learning journeys that evolve based on student performance, preferences, and goals.
            </p>
            <div>
              <strong className="text-white block mb-2">How It Works:</strong>
              <p>
                Students complete an initial assessment that creates their unique learner profile. The platform then generates a customized learning path, continuously adapting based on their progress. Knowledge they've already mastered? Skipped. Areas where they struggle? Reinforced with multiple approaches and spaced repetition.
              </p>
            </div>
          </div>

          <ul 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Dynamic Platform features"
          >
            {features.map((feat, i) => (
              <li 
                key={i} 
                className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-brand-purple/50 transition-colors group"
              >
                <feat.icon 
                  size={20} 
                  className="text-slate-400 group-hover:text-brand-purple transition-colors flex-shrink-0" 
                  aria-hidden="true"
                />
                <span className="text-slate-200 text-sm font-medium">{feat.text}</span>
              </li>
            ))}
          </ul>

          <footer className="mt-10 pt-8 border-t border-white/5 flex items-start gap-4 text-slate-300 text-sm italic">
            <Clock size={20} className="shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              The result? Students achieve the same learning outcomes in less time, with better retention—while faculty gain unprecedented insights into what works and what doesn't.
            </p>
          </footer>
        </article>
      </div>
    </section>
  );
};