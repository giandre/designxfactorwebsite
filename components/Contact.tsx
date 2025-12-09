import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'd5ec859f-b3b7-49b9-830b-36b8a09c12ee',
          name: formData.name,
          email: formData.email,
          institution: formData.institution || 'Not provided',
          role: formData.role || 'Not provided',
          message: formData.message,
          pilot_program_interest: formData.pilot ? 'Yes' : 'No',
          subject: 'New Contact Form Submission - Design X Factor',
          from_name: 'Design X Factor Website'
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          institution: '',
          role: '',
          message: '',
          pilot: false
        });
        // Navigate to thank you page after a brief delay
        setTimeout(() => {
          onNavigate('thank-you');
        }, 1500);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('An error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, pilot: e.target.checked }));
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative z-30 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-lg text-slate-600">
            Join institutions already improving accessibility, reducing costs, and enhancing learning outcomes with Design X Factor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 md:p-12 rounded-3xl shadow-xl">
          {/* Honeypot field */}
          <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
              <CheckCircle size={20} />
              <span className="font-medium">Success! Redirecting you now...</span>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800">
              <AlertCircle size={20} className="mt-0.5" />
              <div>
                <p className="font-medium">Submission failed</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-slate-900 uppercase tracking-wider">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-slate-900 uppercase tracking-wider">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label htmlFor="institution" className="text-sm font-bold text-slate-900 uppercase tracking-wider">Institution</label>
              <input 
                type="text" 
                id="institution" 
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-bold text-slate-900 uppercase tracking-wider">Your Role</label>
              <select 
                id="role" 
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
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
            <label htmlFor="message" className="text-sm font-bold text-slate-900 uppercase tracking-wider">Message *</label>
            <textarea 
              id="message" 
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Tell us about your needs..."
            ></textarea>
          </div>

          <div className="flex items-center gap-3 mb-8 p-4 bg-brand-blue/5 rounded-lg border border-brand-blue/10">
            <input 
              type="checkbox" 
              id="pilot" 
              name="pilot"
              checked={formData.pilot}
              onChange={handleCheckbox}
              disabled={isSubmitting}
              className="w-5 h-5 text-brand-blue rounded focus:ring-brand-blue border-slate-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <label htmlFor="pilot" className="text-sm text-slate-700 cursor-pointer select-none">
              I'm interested in the <span className="text-brand-blue font-bold">free pilot program</span>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || submitStatus === 'success'}
            className="w-full bg-brand-red hover:bg-red-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-brand-red/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={20} /> Sending...</>
            ) : submitStatus === 'success' ? (
              <><CheckCircle size={20} /> Sent Successfully!</>
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