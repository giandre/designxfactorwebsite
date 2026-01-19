import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, User, Mail, Building, Briefcase } from 'lucide-react';
import { useLeadGen } from '../../context/LeadGenContext';

interface LeadGenContactProps {
  onNext: () => void;
  onBack: () => void;
}

export const LeadGenContact: React.FC<LeadGenContactProps> = ({ onNext, onBack }) => {
  const { data, updateContact } = useLeadGen();

  const [formData, setFormData] = useState({
    name: data.contact.name || '',
    email: data.contact.email || '',
    company: data.contact.company || '',
    role: data.contact.role || ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    company: ''
  });

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      email: '',
      company: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company/Organization is required';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.company;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      updateContact(formData);
      onNext();
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field as keyof typeof errors] !== undefined) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-space flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-brand-red" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <p className="text-slate-400 text-sm">Step 1 of 6</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
            Let's Get to Know You
          </h1>
          <p className="text-slate-300 text-lg mb-8">
            We'll use this to personalize your recommendations and send you a custom report.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                Name <span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all`}
                  placeholder="Your full name"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-2">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                Email <span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all`}
                  placeholder="you@company.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-slate-300 mb-2">
                Company/Organization <span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <Building size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 bg-white/5 border ${errors.company ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all`}
                  placeholder="Your organization"
                />
              </div>
              {errors.company && (
                <p className="text-red-400 text-sm mt-2">{errors.company}</p>
              )}
            </div>

            {/* Role (Optional) */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-slate-300 mb-2">
                Role/Title <span className="text-slate-500 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <Briefcase size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all"
                  placeholder="e.g., Training Manager, L&D Director"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="px-8 py-4 bg-white/5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-space inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} />
                Back
              </button>
              <button
                type="submit"
                className="flex-1 px-8 py-4 bg-brand-red text-white font-bold rounded-xl shadow-[0_0_30px_rgba(255,77,109,0.3)] hover:shadow-[0_0_40px_rgba(255,77,109,0.5)] transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-space inline-flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-slate-500 text-sm mt-6">
          🔒 Your information is secure and will only be used to personalize your experience
        </p>
      </div>
    </div>
  );
};
