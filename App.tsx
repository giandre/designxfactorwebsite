import React, { useState } from 'react';
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
import { PageView } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <main>
            <Hero />
            <MonolithSection />
            <ProductShowcase onNavigate={setCurrentPage} />
            <WhyUs />
            <Roadmap />
            <Contact onNavigate={setCurrentPage} />
          </main>
        );
      case 'learning-transformer':
        return <LearningTransformer onNavigate={setCurrentPage} />;
      case 'thank-you':
        return <ThankYou onNavigate={setCurrentPage} />;
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
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      {renderContent()}

      <Footer onNavigate={setCurrentPage} currentPage={currentPage} />
    </div>
  );
}

export default App;