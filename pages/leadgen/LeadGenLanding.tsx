import React, { useState } from 'react';
import { Play, ArrowRight, Clock, Shield, Sparkles } from 'lucide-react';
import { PageView } from '../../types';

interface LeadGenLandingProps {
  onNavigate: (page: PageView) => void;
  onStartJourney: () => void;
}

export const LeadGenLanding: React.FC<LeadGenLandingProps> = ({ onNavigate, onStartJourney }) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleStartClick = () => {
    onStartJourney();
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
          <div className="max-w-5xl mx-auto">
            {/* Logo */}
            <div className="text-center mb-8">
              <button
                onClick={() => onNavigate('home')}
                className="inline-block hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-space"
              >
                <img
                  src="https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/DXF_logo-white.png"
                  alt="Design X Factor"
                  className="h-12 md:h-16 mx-auto"
                />
              </button>
            </div>

            {/* Hero Text */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                Let's Make Learning{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-red">
                  An Unforgettable Experience
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                In 2 minutes, discover exactly what we can create for you
              </p>
            </div>

            {/* Video Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-brand-red/20 via-brand-purple/20 to-brand-blue/20 group shadow-2xl">
                {!showVideo ? (
                  <>
                    {/* Video Placeholder */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="text-center space-y-6">
                        <div
                          className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto transition-all group-hover:scale-110 group-hover:bg-white/20 cursor-pointer border-2 border-white/20"
                          onClick={() => setShowVideo(true)}
                        >
                          <Play size={48} className="text-white ml-2" />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Your Content. Their Experience.
                          </h2>
                          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                            Watch how we transform training from information delivery to engaging experiences
                          </p>
                          <p className="text-slate-400 text-sm mt-4">
                            ⏱️ 60 seconds
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowVideo(true)}
                      className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-space"
                      aria-label="Play video"
                    >
                      <span className="sr-only">Play introduction video</span>
                    </button>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-8">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-white text-lg">Video player coming soon...</p>
                      <p className="text-slate-400 text-sm max-w-lg">
                        <strong>Script:</strong> "You've got the expertise. You've got the content. But turning that into actual training? That's a whole different challenge. Traditional training focuses on delivering information. We don't do that. At Design X Factor, we obsess over the experience—because learning isn't just about delivering content, it's about creating journeys that feel personal to each learner. We use UX design, instructional strategy, and AI to craft training that adapts, engages, and actually sticks. Design X Factor. Where your content becomes their experience."
                      </p>
                      <button
                        onClick={() => setShowVideo(false)}
                        className="mt-4 px-6 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
                      >
                        Close Preview
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/10">
                <Clock size={32} className="text-brand-gold mx-auto mb-3" />
                <div className="text-2xl font-black text-white mb-1">2-4 Weeks</div>
                <div className="text-sm text-slate-400">Delivery Time</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/10">
                <Shield size={32} className="text-brand-blue mx-auto mb-3" />
                <div className="text-2xl font-black text-white mb-1">WCAG 2.1 AA</div>
                <div className="text-sm text-slate-400">Compliant</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/10">
                <Sparkles size={32} className="text-brand-purple mx-auto mb-3" />
                <div className="text-2xl font-black text-white mb-1">3 B's</div>
                <div className="text-sm text-slate-400">Bueno • Bonito • Barato</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={handleStartClick}
                className="group px-10 py-5 bg-brand-red text-white font-bold text-lg rounded-xl shadow-[0_0_40px_rgba(255,77,109,0.4)] hover:shadow-[0_0_60px_rgba(255,77,109,0.6)] transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-space inline-flex items-center gap-3"
              >
                Start Your Project Discovery
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-slate-400 text-sm mt-4">
                ⏱️ Takes 2 minutes • 📱 Mobile-friendly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <p className="text-center text-slate-400 text-sm">
            Trusted by organizations that care about engagement and accessibility
          </p>
        </div>
      </section>
    </div>
  );
};
