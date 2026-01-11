import React from 'react';
import { NavProps } from '../types';

export const Footer: React.FC<NavProps> = ({ onNavigate }) => {
  const handleLink = (target: string, isPage = false) => {
    if (isPage) {
      // @ts-ignore
      onNavigate(target);
      window.scrollTo(0, 0);
    } else {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer
      className="relative z-30 border-t border-white/10 bg-space pt-20 pb-8 px-6"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <img
              src="https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/DXF_logo-white.png"
              alt="Design X Factor"
              className="h-8 w-auto"
            />
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            We design learning experiences. Transform your content into engaging eBooks, videos, podcasts, and courses.
          </p>
          <p className="text-slate-500 text-xs">
            Powered by our proprietary transformation technology.
          </p>
        </div>

        {/* Services Navigation */}
        <nav aria-labelledby="footer-services-heading">
          <h4
            id="footer-services-heading"
            className="font-bold text-white mb-6 uppercase tracking-wider text-sm"
          >
            Services
          </h4>
          <ul className="space-y-4 text-slate-300 text-sm">
            <li>
              <button
                onClick={() => handleLink('services', true)}
                className="hover:text-brand-blue transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                All Services
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('services', true)}
                className="hover:text-brand-blue transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                eBook Creation
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('services', true)}
                className="hover:text-brand-blue transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                Video Production
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('services', true)}
                className="hover:text-brand-blue transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                Course Development
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('services', true)}
                className="hover:text-brand-blue transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                Accessibility
              </button>
            </li>
          </ul>
        </nav>

        {/* Resources Navigation */}
        <nav aria-labelledby="footer-resources-heading">
          <h4
            id="footer-resources-heading"
            className="font-bold text-white mb-6 uppercase tracking-wider text-sm"
          >
            Resources
          </h4>
          <ul className="space-y-4 text-slate-300 text-sm">
            <li>
              <button
                onClick={() => handleLink('portfolio', true)}
                className="hover:text-brand-blue transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                Portfolio
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('comparison')}
                className="hover:text-brand-blue transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                Why Choose Us
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('audit', true)}
                className="hover:text-brand-blue transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                Content Debt Audit
              </button>
            </li>
          </ul>
        </nav>

        {/* Company Navigation */}
        <nav aria-labelledby="footer-company-heading">
          <h4
            id="footer-company-heading"
            className="font-bold text-white mb-6 uppercase tracking-wider text-sm"
          >
            Company
          </h4>
          <ul className="space-y-4 text-slate-300 text-sm">
            <li>
              <button
                onClick={() => handleLink('contact')}
                className="hover:text-brand-blue transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('privacy', true)}
                className="hover:text-brand-blue transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('terms', true)}
                className="hover:text-brand-blue transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                Terms of Service
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center text-slate-400 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Design X Factor. All rights reserved.</p>
        <p>Bueno. Bonito. Barato. — Quality, Beauty, Affordability.</p>
      </div>
    </footer>
  );
};
