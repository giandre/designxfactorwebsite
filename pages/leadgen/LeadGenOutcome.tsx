import React, { useEffect, useState } from 'react';
import { useLeadGen } from '../../context/LeadGenContext';
import { determineOutcome, getChallengeLabel, getContentTypeLabel, getOrgTypeLabel, getReadinessLabel } from '../../utils/leadgenLogic';
import { CheckCircle, Download, Mail, ExternalLink, ArrowRight, Sparkles, BookOpen, Video, Headphones, GraduationCap, Shield } from 'lucide-react';
import { PageView } from '../../types';
import { generateLeadGenPDF } from '../../utils/generatePDF';
import { submitLead, trackContactMe } from '../../utils/api';

interface LeadGenOutcomeProps {
  onNavigate: (page: PageView) => void;
}

export const LeadGenOutcome: React.FC<LeadGenOutcomeProps> = ({ onNavigate }) => {
  const { data } = useLeadGen();
  const [outcomeData, setOutcomeData] = useState<ReturnType<typeof determineOutcome> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showContactSuccess, setShowContactSuccess] = useState(false);

  useEffect(() => {
    const result = determineOutcome(data);
    setOutcomeData(result);

    // Submit lead data to backend (only in production)
    if (import.meta.env.PROD) {
      const submit = async () => {
        const fullData = {
          ...data,
          outcome: result.outcome,
          recommendedServices: result.recommendedServices,
          timestamp: new Date().toISOString()
        };

        const response = await submitLead(fullData);
        if (response.success) {
          setHasSubmitted(true);
        } else {
          console.error('Failed to submit lead:', response.error);
          setSubmitError(response.error || 'Failed to submit');
        }
      };

      submit();
    }
  }, [data]);

  const handleDownloadPDF = async () => {
    if (!outcomeData) return;

    try {
      const fullData = {
        ...data,
        outcome: outcomeData.outcome,
        recommendedServices: outcomeData.recommendedServices,
        timestamp: new Date().toISOString()
      };

      // Track PDF download (only in production)
      if (import.meta.env.PROD) {
        await trackContactMe({
          leadData: fullData,
          action: 'pdf_download'
        });
      }

      // Generate and download PDF
      await generateLeadGenPDF(fullData);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Sorry, there was an error generating your PDF. Please try again.');
    }
  };

  const handleContactMe = async () => {
    if (!outcomeData) return;

    setIsSubmitting(true);
    try {
      const fullData = {
        ...data,
        outcome: outcomeData.outcome,
        recommendedServices: outcomeData.recommendedServices,
        timestamp: new Date().toISOString()
      };

      // Send contact request and email notifications via API
      if (import.meta.env.PROD) {
        const response = await trackContactMe({
          leadData: fullData,
          action: 'contact_me'
        });

        if (response.success) {
          // Show success message
          setShowContactSuccess(true);

          // Hide success message after 8 seconds
          setTimeout(() => {
            setShowContactSuccess(false);
          }, 8000);
        } else {
          throw new Error(response.error || 'Failed to send contact request');
        }
      } else {
        // In dev mode, just show success message
        setShowContactSuccess(true);
        setTimeout(() => {
          setShowContactSuccess(false);
        }, 8000);
      }
    } catch (error) {
      console.error('Error sending contact request:', error);
      alert('Sorry, there was an error sending your request. Please try emailing us directly at gio@designxfactor.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!outcomeData) {
    return <div className="min-h-screen bg-space" />;
  }

  const { outcome, recommendedServices } = outcomeData;
  const { contact, answers } = data;

  // Hot Lead View
  if (outcome === 'hot') {
    return (
      <div className="min-h-screen bg-space pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 border border-brand-red/30 rounded-full mb-6">
              <Sparkles size={20} className="text-brand-red" />
              <span className="text-brand-red font-semibold">Perfect Fit!</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Great News, {contact.name}! 🎉
            </h1>
            <p className="text-xl text-slate-300">
              We can help you {answers.challenge === 'engagement' ? 'boost engagement and completion rates' :
                answers.challenge === 'speed' ? 'create content faster without sacrificing quality' :
                answers.challenge === 'mobile' ? 'make your content mobile-friendly and accessible' :
                answers.challenge === 'budget' ? 'get quality production within budget' :
                'transform your training into engaging experiences'}
            </p>
          </div>

          {/* Your Answers Summary */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-black text-white mb-6">Your Answers</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-slate-400 text-sm mb-1">Content Type</div>
                <div className="text-white font-semibold">{getContentTypeLabel(answers.contentType)}</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-slate-400 text-sm mb-1">Main Challenge</div>
                <div className="text-white font-semibold">{getChallengeLabel(answers.challenge)}</div>
                {answers.challengeComment && (
                  <div className="text-slate-400 text-sm mt-1">{answers.challengeComment}</div>
                )}
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-slate-400 text-sm mb-1">Organization Type</div>
                <div className="text-white font-semibold">{getOrgTypeLabel(answers.orgType)}</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-slate-400 text-sm mb-1">Timeline</div>
                <div className="text-white font-semibold">{getReadinessLabel(answers.readiness)}</div>
              </div>
            </div>
          </div>

          {/* Recommended Services */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-black text-white mb-6">Recommended for You</h2>
            <div className="space-y-4 mb-6">
              {recommendedServices.map((service, idx) => {
                const icon = service.includes('eBook') ? BookOpen :
                           service.includes('Video') ? Video :
                           service.includes('Audio') ? Headphones :
                           service.includes('Accessibility') ? Shield :
                           GraduationCap;
                const Icon = icon;

                return (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-brand-red/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-brand-red" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white mb-1">{service}</div>
                      <div className="text-slate-400 text-sm">
                        {service.includes('eBook') && 'Interactive, accessible eBooks for learning'}
                        {service.includes('Video') && 'Professional video lessons with captions'}
                        {service.includes('Audio') && 'Podcast-style content for mobile learning'}
                        {service.includes('Course') && 'Full course creation and instructional design'}
                        {service.includes('Accessibility') && 'WCAG 2.1 AA compliance for existing content'}
                      </div>
                    </div>
                    <CheckCircle size={20} className="text-brand-red flex-shrink-0" />
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-brand-gold/10 border border-brand-gold/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles size={20} className="text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-brand-gold font-semibold mb-1">Why This Works</div>
                  <div className="text-slate-300 text-sm">
                    Based on your challenge ({getChallengeLabel(answers.challenge).toLowerCase()}), we recommend {recommendedServices[0].toLowerCase()} to create engaging experiences that your learners will actually complete. Timeline: 2-4 weeks. Fully accessible from day one.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-brand-red/20 via-brand-purple/10 to-brand-blue/20 border border-brand-red/30 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-black text-white mb-6">Next Steps</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0 font-bold text-white">
                  1
                </div>
                <div>
                  <div className="font-bold text-white mb-1">Schedule Your Discovery Call</div>
                  <div className="text-slate-300 text-sm mb-3">
                    Let's discuss your specific needs and show you exactly what we can create for you (30 minutes, no strings attached)
                  </div>
                  <button
                    onClick={handleContactMe}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-brand-red text-white font-bold rounded-xl shadow-[0_0_30px_rgba(255,77,109,0.3)] hover:shadow-[0_0_40px_rgba(255,77,109,0.5)] transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mail size={20} />
                    {isSubmitting ? 'Sending Request...' : 'Yes, Reach Out to Me'}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0 font-bold text-white">
                  2
                </div>
                <div>
                  <div className="font-bold text-white mb-1">Download Your Personalized Report</div>
                  <div className="text-slate-300 text-sm mb-3">
                    Get a PDF with your recommendations, timeline, and next steps
                  </div>
                  <button
                    onClick={handleDownloadPDF}
                    className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all inline-flex items-center gap-2"
                  >
                    <Download size={20} />
                    Download PDF Report
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0 font-bold text-white">
                  3
                </div>
                <div>
                  <div className="font-bold text-white mb-1">Explore Our Work</div>
                  <div className="text-slate-300 text-sm mb-3">
                    Check out live examples of what we've created for others
                  </div>
                  <button
                    onClick={() => onNavigate('portfolio')}
                    className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all inline-flex items-center gap-2"
                  >
                    View Portfolio
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showContactSuccess && (
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-2xl p-6 mb-8 animate-[slideIn_0.3s_ease-out]">
              <div className="flex items-start gap-4">
                <CheckCircle size={28} className="text-green-400 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Request Sent Successfully! ✅</h3>
                  <p className="text-slate-300 mb-2">
                    We've received your contact request and sent a confirmation to <strong>{data.contact.email}</strong>. Gio will reach out within 24 hours to schedule your discovery call.
                  </p>
                  <p className="text-slate-400 text-sm">
                    Check your inbox for confirmation details.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contact Card */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Let's Talk</h3>
            <div className="space-y-3">
              <a
                href="mailto:gio@designxfactor.com"
                className="block text-brand-blue hover:underline text-lg font-semibold"
              >
                gio@designxfactor.com
              </a>
              <p className="text-slate-400 text-sm">
                We typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Warm Lead View
  if (outcome === 'warm') {
    return (
      <div className="min-h-screen bg-space pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full mb-6">
              <Sparkles size={20} className="text-brand-gold" />
              <span className="text-brand-gold font-semibold">Great Fit!</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Thanks for Your Interest, {contact.name}!
            </h1>
            <p className="text-xl text-slate-300">
              We'd love to work with you when you're ready
            </p>
          </div>

          {/* Your Answers Summary */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-black text-white mb-6">Your Answers</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-slate-400 text-sm mb-1">Content Type</div>
                <div className="text-white font-semibold">{getContentTypeLabel(answers.contentType)}</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-slate-400 text-sm mb-1">Main Challenge</div>
                <div className="text-white font-semibold">{getChallengeLabel(answers.challenge)}</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-slate-400 text-sm mb-1">Organization Type</div>
                <div className="text-white font-semibold">{getOrgTypeLabel(answers.orgType)}</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-slate-400 text-sm mb-1">Timeline</div>
                <div className="text-white font-semibold">{getReadinessLabel(answers.readiness)}</div>
              </div>
            </div>
          </div>

          {/* Recommended Services */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-black text-white mb-6">What We Can Create for You</h2>
            <div className="space-y-4">
              {recommendedServices.map((service, idx) => {
                const icon = service.includes('eBook') ? BookOpen :
                           service.includes('Video') ? Video :
                           service.includes('Audio') ? Headphones :
                           service.includes('Accessibility') ? Shield :
                           GraduationCap;
                const Icon = icon;

                return (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-brand-gold" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">{service}</div>
                      <div className="text-slate-400 text-sm">
                        {service.includes('eBook') && 'Interactive, accessible eBooks that engage learners'}
                        {service.includes('Video') && 'Professional video lessons with full accessibility'}
                        {service.includes('Audio') && 'Podcast-style content for on-the-go learning'}
                        {service.includes('Course') && 'Complete learning experiences, delivered in weeks'}
                        {service.includes('Accessibility') && 'Make existing content WCAG 2.1 AA compliant'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* When You're Ready */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-black text-white mb-6">When You're Ready</h2>
            <div className="space-y-4 mb-6">
              <p className="text-slate-300">
                You mentioned you're looking to start in {answers.readiness === '1_3_months' ? '1-3 months' : '3-6 months'}. Here's what to prepare:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-brand-gold flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Gather your existing content (PDFs, docs, slide decks)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-brand-gold flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Define your learning objectives</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-brand-gold flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Identify your target audience</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('portfolio')}
              className="w-full md:w-auto px-8 py-4 bg-brand-gold text-black font-bold rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold inline-flex items-center justify-center gap-2"
            >
              Explore Our Portfolio
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Success Message */}
          {showContactSuccess && (
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-2xl p-6 mb-8 animate-[slideIn_0.3s_ease-out]">
              <div className="flex items-start gap-4">
                <CheckCircle size={28} className="text-green-400 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Request Sent Successfully! ✅</h3>
                  <p className="text-slate-300 mb-2">
                    We've received your contact request and sent a confirmation to <strong>{data.contact.email}</strong>. Gio will reach out within 24 hours.
                  </p>
                  <p className="text-slate-400 text-sm">
                    Check your inbox for confirmation details.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contact */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Want Us to Reach Out?</h3>
            <p className="text-slate-300 mb-6">
              We'd love to hear about your project and show you what we can create
            </p>
            <button
              onClick={handleContactMe}
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-4 bg-brand-gold text-black font-bold rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              <Mail size={20} />
              {isSubmitting ? 'Sending...' : 'Yes, Contact Me'}
            </button>
            <p className="text-slate-400 text-sm">
              Or email us directly: <a href="mailto:gio@designxfactor.com" className="text-brand-blue hover:underline">gio@designxfactor.com</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Nurture Lead View
  if (outcome === 'nurture') {
    return (
      <div className="min-h-screen bg-space pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 border border-brand-blue/30 rounded-full mb-6">
            <Sparkles size={20} className="text-brand-blue" />
            <span className="text-brand-blue font-semibold">Thanks for Stopping By!</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Keep Exploring, {contact.name}
          </h1>
          <p className="text-xl text-slate-300 mb-12">
            We're here when you're ready to transform your content
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <button
              onClick={() => onNavigate('portfolio')}
              className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-white/30 transition-all text-left group"
            >
              <GraduationCap size={32} className="text-brand-blue mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-blue transition-colors">
                View Our Portfolio
              </h3>
              <p className="text-slate-400">
                See live examples of courses, eBooks, and videos we've created
              </p>
            </button>

            <button
              onClick={() => onNavigate('services')}
              className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-white/30 transition-all text-left group"
            >
              <Sparkles size={32} className="text-brand-purple mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-purple transition-colors">
                Learn About Our Services
              </h3>
              <p className="text-slate-400">
                Discover what we can create for you
              </p>
            </button>
          </div>

          {/* Success Message */}
          {showContactSuccess && (
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-2xl p-6 mb-8 animate-[slideIn_0.3s_ease-out]">
              <div className="flex items-start gap-4">
                <CheckCircle size={28} className="text-green-400 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Request Sent Successfully! ✅</h3>
                  <p className="text-slate-300 mb-2">
                    We've received your contact request and sent a confirmation to <strong>{data.contact.email}</strong>. Gio will reach out within 24 hours.
                  </p>
                  <p className="text-slate-400 text-sm">
                    Check your inbox for confirmation details.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-3">Interested in Learning More?</h3>
            <p className="text-slate-300 mb-6">
              We'd be happy to answer your questions and show you what we can create
            </p>
            <button
              onClick={handleContactMe}
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-4 bg-brand-blue text-white font-bold rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              <Mail size={20} />
              {isSubmitting ? 'Sending...' : 'I\'d Like to Be Contacted'}
            </button>
            <p className="text-slate-400 text-sm">
              Or explore our <a href="https://designxfactor.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">website</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Not Fit View (fallback, shouldn't happen with current logic)
  return (
    <div className="min-h-screen bg-space pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-black text-white mb-4">
          Thank You for Your Interest
        </h1>
        <p className="text-xl text-slate-300 mb-8">
          Based on your answers, we may not be the best fit right now, but we appreciate you taking the time.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};
