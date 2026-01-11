import React from 'react';
import {
  MessageSquare,
  Search,
  Palette,
  RefreshCw,
  Rocket,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Discovery',
    description: 'We understand your content, goals, and learners',
    icon: MessageSquare,
    color: '#38bdf8',
    details: [
      'Review your existing materials',
      'Define target audience',
      'Establish success metrics'
    ]
  },
  {
    id: 2,
    title: 'Analysis',
    description: 'We audit and plan the transformation',
    icon: Search,
    color: '#d946ef',
    details: [
      'Content structure mapping',
      'Accessibility assessment',
      'Format recommendations'
    ]
  },
  {
    id: 3,
    title: 'Design & Build',
    description: 'We create the learning experience',
    icon: Palette,
    color: '#f59e0b',
    details: [
      'Instructional design',
      'Visual design & branding',
      'Content production'
    ]
  },
  {
    id: 4,
    title: 'Review',
    description: 'You provide feedback, we refine',
    icon: RefreshCw,
    color: '#10b981',
    details: [
      'Collaborative review sessions',
      'Revision rounds included',
      'Quality assurance'
    ]
  },
  {
    id: 5,
    title: 'Delivery',
    description: 'LMS-ready or standalone formats',
    icon: Rocket,
    color: '#ff4d6d',
    details: [
      'Final asset delivery',
      'LMS integration support',
      'Training & handoff'
    ]
  }
];

export const Process: React.FC = () => {
  return (
    <section
      className="py-24 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent relative overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_50%)]" aria-hidden="true" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 border border-brand-gold/20 rounded-full mb-6">
            <Rocket size={16} className="text-brand-gold" />
            <span className="text-sm text-brand-gold font-semibold">Rapid Delivery</span>
          </div>
          <h2 id="process-heading" className="text-4xl md:text-5xl font-black text-white mb-6">
            From Content to Learning Experience in Weeks
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Our streamlined process delivers enterprise-quality results at startup speed.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connection Line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue via-brand-purple via-brand-gold via-green-500 to-brand-red" aria-hidden="true" />

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <div key={step.id} className="relative">
                {/* Node */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-6 relative z-10 border-4 border-space"
                    style={{ backgroundColor: step.color }}
                  >
                    <step.icon size={20} className="text-white" />
                  </div>

                  {/* Content Card */}
                  <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 w-full hover:border-white/20 transition-all group">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white/90">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                          <CheckCircle size={12} style={{ color: step.color }} className="mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, idx) => (
            <div key={step.id} className="relative flex gap-4">
              {/* Vertical Line */}
              {idx < steps.length - 1 && (
                <div
                  className="absolute left-6 top-12 w-0.5 h-[calc(100%-24px)]"
                  style={{ backgroundColor: `${step.color}30` }}
                  aria-hidden="true"
                />
              )}

              {/* Node */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                style={{ backgroundColor: step.color }}
              >
                <step.icon size={20} className="text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{step.description}</p>
                <ul className="space-y-1.5">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
                      <CheckCircle size={10} style={{ color: step.color }} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm mb-6">
            Timeline may vary based on project scope. Complex courses may require additional time.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold/80 font-semibold transition-colors"
          >
            Discuss Your Project <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
