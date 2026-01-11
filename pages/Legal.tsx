import React, { useEffect } from 'react';
import { NavProps, PageView } from '../types';
import { CheckCircle, ShieldCheck, Zap, BookOpen, Layers, Activity, BarChart3, Lock, Server } from 'lucide-react';

interface LegalProps {
  page: PageView;
}

export const Legal: React.FC<LegalProps> = ({ page }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderContent = () => {
    switch (page) {
      case 'terms':
        return (
          <>
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-slate-500 mb-8 border-b border-white/10 pb-8">Last Updated: January 24, 2025</p>
            
            <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-8">
              <p>Welcome to Design X Factor. These Terms of Service ("Terms") govern your access to and use of our website, platform, and services. By accessing or using our services, you agree to be bound by these Terms.</p>
              
              <div className="bg-brand-red/10 border-l-4 border-brand-red p-6 rounded-r">
                <p className="font-bold text-white m-0">Important: Please read these Terms carefully before using our services. If you do not agree with these Terms, you may not access or use our services.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h3>
                <p>By accessing or using Design X Factor's website (designxfactor.com) or platform services, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be bound by these Terms of Service</li>
                  <li>Comply with our Privacy Policy</li>
                  <li>Follow all applicable laws and regulations</li>
                  <li>Accept updates to these Terms as we may make from time to time</li>
                </ul>
                <p className="mt-4">If you are using our services on behalf of an educational institution or organization, you represent that you have the authority to bind that entity to these Terms.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">2. Description of Services</h3>
                <p>Design X Factor provides AI-powered educational content transformation services, including:</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <strong className="text-brand-blue block mb-1">2.1 Core Services</strong>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Learning Transformer:</strong> Transforms existing LMS course content into accessible, multimodal learning experiences</li>
                      <li><strong>Catalyst Studio:</strong> Converts technical manuals and textbooks into interactive learning modules</li>
                      <li><strong>Catalyst Course:</strong> Generates complete courses from multiple content sources</li>
                      <li><strong>Dynamic Platform:</strong> Personalized learning journeys (in development)</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-brand-blue block mb-1">2.2 Platform Features</strong>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>LMS integration (Canvas, Blackboard, Moodle, etc.)</li>
                      <li>Multimodal content generation (videos, podcasts, flashcards)</li>
                      <li>WCAG 2.1 Level AA accessibility compliance</li>
                      <li>Embedded knowledge checks and assessments</li>
                      <li>Comprehensive analytics and tracking</li>
                      <li>Faculty editing and approval workflows</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">3. Account Registration and Access</h3>
                <p>To use certain features of our services, you must provide accurate registration information, maintain security of your credentials, and notify us of unauthorized access.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">4. Intellectual Property Rights</h3>
                <p>Design X Factor retains all rights to the platform software, AI models, and technology. You retain all rights to the educational content you upload. By using our services, you grant us a limited license to process and transform your content using AI.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">5. Data Privacy and Security</h3>
                <p>Our collection, use, and protection of your data is governed by our Privacy Policy. We comply with FERPA and act as a "school official" with legitimate educational interests when processing student data.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h3>
                <p className="uppercase text-sm font-bold tracking-wide">OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.</p>
                <p className="mt-2">TO THE MAXIMUM EXTENT PERMITTED BY LAW, DESIGN X FACTOR SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">7. Contact Information</h3>
                <div className="bg-gradient-to-br from-[#111118] to-[#0a0a0f] p-8 rounded-xl border border-white/10 text-center">
                  <h4 className="text-xl font-bold text-white mb-4">Questions About These Terms?</h4>
                  <p><strong>Email:</strong> <a href="mailto:legal@designxfactor.com" className="text-brand-red hover:underline">legal@designxfactor.com</a></p>
                  <p><strong>Website:</strong> <a href="https://designxfactor.com" className="text-brand-red hover:underline">designxfactor.com</a></p>
                  <p className="text-sm mt-4 text-slate-500">Response Time: 5-7 business days</p>
                </div>
              </div>
            </div>
          </>
        );
      case 'privacy':
        return (
          <>
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-slate-500 mb-8 border-b border-white/10 pb-8">Last Updated: January 24, 2025</p>
            
            <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-8">
              <p>Design X Factor ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website designxfactor.com and use our AI-powered learning platform services.</p>

              <div className="bg-brand-red/10 border-l-4 border-brand-red p-6 rounded-r">
                <p className="font-bold text-white m-0">Important: By using our services, you agree to the collection and use of information in accordance with this policy.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Information You Provide:</strong> Name, email address, institution name, role/title, and message content.</li>
                  <li><strong>Automatically Collected:</strong> Usage Data, IP address, browser type, and cookies.</li>
                  <li><strong>Educational Data:</strong> Course materials, content, and anonymized student engagement metrics.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Delivery:</strong> To provide and improve our AI content transformation services.</li>
                  <li><strong>Content Generation:</strong> To process your educational materials using AI.</li>
                  <li><strong>Analytics:</strong> To analyze usage patterns and enhance platform functionality.</li>
                  <li><strong>Compliance:</strong> To ensure WCAG 2.1 Level AA compliance.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">3. FERPA Compliance</h3>
                <p>We understand our responsibilities under the Family Educational Rights and Privacy Act (FERPA):</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>We act as a "school official" with legitimate educational interests.</li>
                  <li>We do not share student education records without proper consent.</li>
                  <li>We use student data only for authorized educational purposes.</li>
                  <li>Institutions retain full control over student data.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">4. Data Security</h3>
                <p>We implement appropriate technical and organizational security measures:</p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/5 p-4 rounded-lg flex items-center gap-3">
                    <Lock className="text-brand-blue" /> <span>Encryption (TLS 1.3 & AES-256)</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg flex items-center gap-3">
                    <ShieldCheck className="text-brand-blue" /> <span>Role-based access control</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg flex items-center gap-3">
                    <Activity className="text-brand-blue" /> <span>Regular Security Audits</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg flex items-center gap-3">
                    <Server className="text-brand-blue" /> <span>Encrypted Backups</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">5. Data Retention</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Data:</strong> Retained while active and for 2 years after closure.</li>
                  <li><strong>Educational Content:</strong> Retained as long as needed for service delivery.</li>
                  <li><strong>Analytics Data:</strong> Aggregated data retained indefinitely; individual data for 3 years.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">6. Contact Us</h3>
                <div className="bg-gradient-to-br from-[#111118] to-[#0a0a0f] p-8 rounded-xl border border-white/10 text-center">
                  <h4 className="text-xl font-bold text-white mb-4">Questions About Privacy?</h4>
                  <p><strong>Email:</strong> <a href="mailto:privacy@designxfactor.com" className="text-brand-red hover:underline">privacy@designxfactor.com</a></p>
                </div>
              </div>
            </div>
          </>
        );
      case 'api':
        return (
          <div className="flex flex-col items-center justify-center py-10 text-center">
             <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20 backdrop-blur-md">
                <Zap className="text-white w-12 h-12" />
             </div>
             
             <span className="bg-brand-red text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest mb-8">COMING SOON</span>
             
             <h1 className="text-5xl font-black text-white mb-6">API Documentation</h1>
             <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-16">
               Build powerful integrations with Design X Factor's AI-powered learning platform. Our comprehensive API will enable you to programmatically transform educational content, integrate with your systems, and create custom learning experiences.
             </p>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-5xl w-full mb-16">
                {[
                  { icon: Zap, title: "RESTful API", desc: "Easy-to-use endpoints for transformation & analytics" },
                  { icon: BookOpen, title: "Comprehensive Docs", desc: "Detailed guides & interactive explorer" },
                  { icon: ShieldCheck, title: "Secure Auth", desc: "OAuth 2.0 & API key authentication" },
                  { icon: Layers, title: "LMS Integration", desc: "Pre-built connectors for Canvas & Blackboard" },
                  { icon: Activity, title: "Webhooks", desc: "Real-time notifications for events" },
                  { icon: BarChart3, title: "Analytics API", desc: "Access engagement metrics & outcomes" }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur hover:bg-white/10 transition-colors">
                    <h4 className="text-[#FCA5A5] font-bold mb-2 flex items-center gap-3 text-lg">
                       <item.icon size={20} /> {item.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>

             <div className="bg-white rounded-2xl p-8 max-w-lg w-full text-center">
                <h3 className="text-brand-blue text-2xl font-bold mb-4">Get Notified When We Launch</h3>
                <p className="text-slate-600 mb-6">Be the first to know when our API documentation is available.</p>
                <div className="space-y-4">
                  <input type="email" placeholder="your-email@institution.edu" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none text-slate-900" />
                  <button className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:bg-sky-600 transition-colors">
                    Notify Me
                  </button>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 max-w-4xl">
      {renderContent()}
    </div>
  );
};