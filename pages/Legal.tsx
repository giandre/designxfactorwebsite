import React, { useEffect } from 'react';
import { NavProps, PageView } from '../types';

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
            
            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
              <p>Welcome to Design X Factor. These Terms of Service ("Terms") govern your access to and use of our website, platform, and services. By accessing or using our services, you agree to be bound by these Terms.</p>
              
              <div className="bg-brand-red/10 border-l-4 border-brand-red p-6 my-8 rounded-r">
                <p className="font-bold text-white m-0">Important: Please read these Terms carefully before using our services. If you do not agree with these Terms, you may not access or use our services.</p>
              </div>

              <h3>1. Acceptance of Terms</h3>
              <p>By accessing or using Design X Factor's website or platform services, you agree to be bound by these Terms of Service, comply with our Privacy Policy, and follow all applicable laws and regulations.</p>

              <h3>2. Description of Services</h3>
              <p>Design X Factor provides AI-powered educational content transformation services, including Learning Transformer, Catalyst Studio, and Catalyst Course.</p>

              <h3>3. Pilot Program Terms</h3>
              <p>Our free pilot program is offered to select educational institutions. Duration is typically 30-90 days. We make no guarantee of service availability or uptime during the pilot phase.</p>

              <h3>4. Intellectual Property Rights</h3>
              <p>Design X Factor retains all rights, title, and interest in the platform software, AI models, and technology. You retain all rights to the educational content you upload.</p>

              <h3>5. Data Privacy</h3>
              <p>We comply with FERPA and other applicable education privacy laws. Student data is used only for authorized educational purposes.</p>

              <h3>6. Limitation of Liability</h3>
              <p>OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. Design X Factor shall not be liable for indirect, incidental, special, or consequential damages.</p>
            </div>
          </>
        );
      case 'privacy':
        return (
          <>
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-slate-500 mb-8 border-b border-white/10 pb-8">Last Updated: January 24, 2025</p>
            
            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
              <p>Design X Factor is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.</p>

              <h3>1. Information We Collect</h3>
              <ul>
                <li><strong>Information You Provide:</strong> Name, email, institution details, and message content.</li>
                <li><strong>Automatically Collected:</strong> Usage data, device info, IP address, and analytics.</li>
                <li><strong>Educational Data:</strong> Course materials and anonymized student engagement metrics.</li>
              </ul>

              <h3>2. How We Use Your Information</h3>
              <p>We use information to provide and improve our services, transform content using AI, ensure WCAG compliance, and communicate with you.</p>

              <h3>3. FERPA Compliance</h3>
              <p>We act as a "school official" with legitimate educational interests when processing student data. We do not share student education records without proper consent.</p>

              <h3>4. Data Security</h3>
              <p>We implement encryption (TLS 1.3), access controls, and regular audits to protect your information.</p>

              <h3>5. Contact Us</h3>
              <p>If you have questions about privacy, please contact us at privacy@designxfactor.com.</p>
            </div>
          </>
        );
      case 'api':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20">
                <div className="text-4xl">🛠️</div>
             </div>
             <span className="bg-brand-red text-white px-4 py-1 rounded-full text-xs font-bold mb-6">COMING SOON</span>
             <h1 className="text-5xl font-bold text-white mb-6">API Documentation</h1>
             <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
               Build powerful integrations with Design X Factor's AI-powered learning platform. Our comprehensive API will enable you to programmatically transform educational content and access analytics.
             </p>
             
             <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl w-full">
                {['RESTful API Endpoints', 'OAuth 2.0 Authentication', 'LMS Webhooks', 'Analytics Data Access'].map((feat, i) => (
                  <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                       <span className="w-2 h-2 bg-brand-blue rounded-full"></span> {feat}
                    </h4>
                    <p className="text-slate-500 text-sm">Detailed documentation and SDKs coming in Q4 2025.</p>
                  </div>
                ))}
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