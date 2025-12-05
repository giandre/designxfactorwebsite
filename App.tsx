import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MonolithSection } from './components/MonolithSection';
import { ProductShowcase } from './components/ProductShowcase';

function App() {
  return (
    <div className="bg-space min-h-screen text-slate-200 selection:bg-brand-red selection:text-white font-sans">
      <Navbar />
      
      <main>
        <Hero />
        <MonolithSection />
        <ProductShowcase />
      </main>

      <footer id="contact" className="border-t border-white/10 bg-space py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your content?</h2>
            <p className="text-slate-400 mb-8 max-w-md text-lg">
              Join the waiting list for our pilot program. We are selecting 5 enterprise partners for Q4.
            </p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input 
                id="email"
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-lg px-6 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue w-full sm:w-auto flex-1"
                required
              />
              <button 
                type="submit" 
                className="bg-brand-blue hover:bg-sky-500 text-space font-bold px-8 py-3 rounded-lg transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/50"
              >
                Join Waitlist
              </button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#" className="hover:text-brand-blue transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">Accessibility Statement</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-slate-600 text-sm">
          © {new Date().getFullYear()} Design X Factor. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;