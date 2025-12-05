import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { NavProps } from '../types';

export const Contact: React.FC<{ onNavigate: NavProps['onNavigate'] }> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    role: '',
    message: '',
    pilot: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call since we don't have a backend in this environment
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form Submitted:", formData);
    setIsSubmitting(false);
    onNavigate('thank-you');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, pilot: e.target.checked }));
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0f] border-t border-white/10 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-lg text-slate-400">
            Join institutions already improving accessibility, reducing costs, and enhancing learning outcomes with Design X Factor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-2xl">
          {/* Honeypot field */}
          <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-white uppercase tracking-wider">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#15151a] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-white uppercase tracking-wider">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#15151a] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label htmlFor="institution" className="text-sm font-bold text-white uppercase tracking-wider">Institution</label>
              <input 
                type="text" 
                id="institution" 
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full bg-[#15151a] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-bold text-white uppercase tracking-wider">Your Role</label>
              <select 
                id="role" 
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-[#15151a] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors appearance-none"
              >
                <option value="">Select your role...</option>
                <option value="Dean">Dean</option>
                <option value="Director of Instructional Design">Director of Instructional Design</option>
                <option value="Faculty Member">Faculty Member</option>
                <option value="Instructional Designer">Instructional Designer</option>
                <option value="IT Administrator">IT Administrator</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <label htmlFor="message" className="text-sm font-bold text-white uppercase tracking-wider">Message *</label>
            <textarea 
              id="message" 
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-[#15151a] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
              placeholder="Tell us about your needs..."
            ></textarea>
          </div>

          <div className="flex items-center gap-3 mb-8 p-4 bg-brand-blue/10 rounded-lg border border-brand-blue/20">
            <input 
              type="checkbox" 
              id="pilot" 
              name="pilot"
              checked={formData.pilot}
              onChange={handleCheckbox}
              className="w-5 h-5 text-brand-blue rounded focus:ring-brand-blue bg-[#15151a] border-white/30 cursor-pointer"
            />
            <label htmlFor="pilot" className="text-sm text-slate-200 cursor-pointer select-none">
              I'm interested in the <span className="text-white font-bold">free pilot program</span>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-brand-red hover:bg-red-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-brand-red/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" /> Sending...</>
            ) : (
              <><Send size={20} /> Request Consultation</>
            )}
          </button>
          
          <p className="mt-6 text-center text-sm text-slate-500">
            We're currently offering free pilot programs for select institutions. Limited spots available.
          </p>
        </form>
      </div>
    </section>
  );
};