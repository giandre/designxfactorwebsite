import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MonolithSection } from './components/MonolithSection';
import { Process } from './components/Process';
import { WhyUs } from './components/WhyUs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Legal } from './pages/Legal';
import { ThankYou } from './pages/ThankYou';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { LearningTransformer } from './pages/products/LearningTransformer';
import { ContentDebtAudit } from './pages/tools/ContentDebtAudit';
import { TransformationPipeline } from './pages/products/TransformationPipeline';
import { LeadGen } from './pages/leadgen/LeadGen';
import { HowWeWork } from './pages/HowWeWork';
import { PageView } from './types';

// SEO Configuration per page
const seoConfigs: Record<PageView, { title: string; description: string }> = {
  home: {
    title: 'Design X Factor | Learning Experience Design Services',
    description: 'We design learning experiences. Transform your content into engaging eBooks, videos, podcasts, and courses — in weeks, not months.',
  },
  services: {
    title: 'Services | eBooks, Videos, Courses & More | Design X Factor',
    description: 'Full-service learning experience design: eBook creation, video production, audio/podcasts, course development, and accessibility remediation.',
  },
  portfolio: {
    title: 'Portfolio | Our Work | Design X Factor',
    description: 'See how we transform content into engaging learning experiences. Browse our portfolio of eBooks, videos, and courses.',
  },
  'learning-transformer': {
    title: 'Learning Transformer | Automated LMS Accessibility | Design X Factor',
    description: 'Automatically transform static LMS content into dynamic, accessible learning experiences.',
  },
  pipeline: {
    title: 'Content Transformation Pipeline | Scale & Remediation | Design X Factor',
    description: 'Migrate legacy content at scale while achieving WCAG 2.1 AA compliance. Keep original formats or transform to mobile-ready HTML.',
  },
  audit: {
    title: 'Content Debt Audit | Calculate ADA Compliance Risk | Design X Factor',
    description: "Free tool to calculate your institution's content accessibility debt.",
  },
  'thank-you': {
    title: 'Thank You | Design X Factor',
    description: 'Thank you for contacting Design X Factor.',
  },
  terms: {
    title: 'Terms of Service | Design X Factor',
    description: 'Terms of Service for Design X Factor learning experience design services.',
  },
  privacy: {
    title: 'Privacy Policy | Design X Factor',
    description: 'Privacy Policy for Design X Factor. Learn how we protect your data.',
  },
  api: {
    title: 'API Documentation | Design X Factor',
    description: 'API documentation for integrating Design X Factor.',
  },
  start: {
    title: 'Discover What We Can Create for You | Design X Factor',
    description: 'Interactive discovery experience - find out exactly what we can create for your organization in 2 minutes.',
  },
  'how-we-work': {
    title: 'How We Work | Interactive Process Experience | Design X Factor',
    description: 'Experience our 9-phase methodology firsthand. Step into the role of a client and see how we transform content into engaging learning experiences.',
  },
};

// Page titles for screen reader announcements
const pageTitles: Record<PageView, string> = {
  home: 'Home',
  services: 'Our Services',
  portfolio: 'Our Portfolio',
  'learning-transformer': 'Learning Transformer product',
  pipeline: 'Content Transformation Pipeline',
  audit: 'Content Debt Audit tool',
  'thank-you': 'Thank you',
  terms: 'Terms of Service',
  privacy: 'Privacy Policy',
  api: 'API Documentation',
  start: 'Project Discovery',
  'how-we-work': 'How We Work Process Experience',
};

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const mainRef = useRef<HTMLElement>(null);
  const previousPage = useRef<PageView>('home');

  // Handle routing based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      
      if (!hash || hash === '') {
        setCurrentPage('home');
        return;
      }
      
      const validPages: PageView[] = [
        'services',
        'portfolio',
        'learning-transformer',
        'thank-you',
        'terms',
        'privacy',
        'api',
        'audit',
        'pipeline',
        'start',
        'how-we-work'
      ];

      if (validPages.includes(hash as PageView)) {
        setCurrentPage(hash as PageView);
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update SEO meta tags and announce route changes
  useEffect(() => {
    const config = seoConfigs[currentPage];
    
    // Update document title
    document.title = config.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.description);
    }
    
    // Update canonical URL
    const canonicalPath = currentPage === 'home' ? '' : `#${currentPage}`;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://designxfactor.com/${canonicalPath}`);
    }
    
    // Announce route change to screen readers
    if (previousPage.current !== currentPage) {
      const announcer = document.getElementById('route-announcer');
      if (announcer) {
        announcer.textContent = `Navigated to ${pageTitles[currentPage]} page`;
      }
      
      // Focus main content for keyboard users (after a short delay for render)
      setTimeout(() => {
        mainRef.current?.focus();
      }, 100);
      
      previousPage.current = currentPage;
    }
  }, [currentPage]);

  const handleNavigate = (page: PageView) => {
    if (page === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = page;
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <MonolithSection onNavigate={handleNavigate} />
            <Process />
            <WhyUs />
            <Contact onNavigate={handleNavigate} />
          </>
        );
      case 'services':
        return <Services onNavigate={handleNavigate} />;
      case 'portfolio':
        return <Portfolio onNavigate={handleNavigate} />;
      case 'learning-transformer':
        return <LearningTransformer onNavigate={handleNavigate} />;
      case 'pipeline':
        return <TransformationPipeline onNavigate={handleNavigate} />;
      case 'audit':
        return <ContentDebtAudit onNavigate={handleNavigate} />;
      case 'start':
        return <LeadGen onNavigate={handleNavigate} />;
      case 'how-we-work':
        return <HowWeWork onNavigate={handleNavigate} />;
      case 'thank-you':
        return <ThankYou onNavigate={handleNavigate} />;
      case 'terms':
      case 'privacy':
      case 'api':
        return <Legal page={currentPage} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-space min-h-screen text-slate-200 selection:bg-brand-red selection:text-white font-sans flex flex-col">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      
      <main 
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="flex-1 outline-none"
        role="main"
        aria-label={`${pageTitles[currentPage]} content`}
      >
        {renderContent()}
      </main>

      <Footer onNavigate={handleNavigate} currentPage={currentPage} />
    </div>
  );
}

export default App;