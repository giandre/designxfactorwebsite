import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemStatement } from './components/ProblemStatement';
import { TransformationShowcase } from './components/TransformationShowcase';
import { Process } from './components/Process';
import { WhyUs } from './components/WhyUs';
import { ProofStrip } from './components/ProofStrip';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Legal } from './pages/Legal';
import { ThankYou } from './pages/ThankYou';
import { HowWeWork } from './pages/HowWeWork';
import { PageView } from './types';

// SEO Configuration per page
const seoConfigs: Record<PageView, { title: string; description: string }> = {
  home: {
    title: 'DesignXFactor | Your Training Content Exists. We Make It Unforgettable.',
    description: 'We transform static corporate training into experiences learners actually remember. Custom design for YOUR audience — in weeks, not months. WCAG 2.1 AA compliant.',
  },
  'how-we-work': {
    title: 'How We Work | Interactive Process Experience | Design X Factor',
    description: 'Experience our 9-phase methodology firsthand. Step into the role of a client and see how we transform content into engaging learning experiences.',
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
};

// Page titles for screen reader announcements
const pageTitles: Record<PageView, string> = {
  home: 'Home',
  'how-we-work': 'How We Work Process Experience',
  'thank-you': 'Thank you',
  terms: 'Terms of Service',
  privacy: 'Privacy Policy',
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
        'how-we-work',
        'thank-you',
        'terms',
        'privacy',
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
            <ProblemStatement />
            <TransformationShowcase />
            <Process onNavigate={handleNavigate} />
            <WhyUs />
            <ProofStrip />
            <Contact onNavigate={handleNavigate} />
          </>
        );
      case 'how-we-work':
        return <HowWeWork onNavigate={handleNavigate} />;
      case 'thank-you':
        return <ThankYou onNavigate={handleNavigate} />;
      case 'terms':
      case 'privacy':
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
