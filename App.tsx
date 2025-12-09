import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MonolithSection } from './components/MonolithSection';
import { ProductShowcase } from './components/ProductShowcase';
import { WhyUs } from './components/WhyUs';
import { Roadmap } from './components/Roadmap';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Legal } from './pages/Legal';
import { ThankYou } from './pages/ThankYou';
import { LearningTransformer } from './pages/products/LearningTransformer';
import { ContentDebtAudit } from './pages/tools/ContentDebtAudit';
import { PageView } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  // Handle routing based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the '#'
      
      // If no hash or empty hash, go to home
      if (!hash || hash === '') {
        setCurrentPage('home');
        return;
      }
      
      // UPDATED: Added 'audit' to valid pages
      const validPages: PageView[] = [
        'learning-transformer', 
        'thank-you', 
        'terms', 
        'privacy', 
        'api',
        'audit'
      ];

      if (validPages.includes(hash as PageView)) {
        setCurrentPage(hash as PageView);
      } else {
        // Invalid hash (could be a section anchor like #contact), stay on home
        setCurrentPage('home');
      }
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes (back/forward button)
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageView) => {
    if (page === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = page;
    }
    // State update is handled by the hashchange listener
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <main>
            <Hero />
            <MonolithSection />
            <ProductShowcase onNavigate={handleNavigate} />
            <WhyUs />
            <Roadmap />
            <Contact onNavigate={handleNavigate} />
          </main>
        );
      case 'learning-transformer':
        return <LearningTransformer onNavigate={handleNavigate} />;
      case 'audit':
        return <ContentDebtAudit onNavigate={handleNavigate} />;
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
      
      {renderContent()}

      <Footer onNavigate={handleNavigate} currentPage={currentPage} />
    </div>
  );
}

export default App;