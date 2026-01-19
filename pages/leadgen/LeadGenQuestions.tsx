import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, BookOpen, Video, Headphones, GraduationCap, Shield, Target, Clock, Smartphone, DollarSign, RefreshCw, BarChart, Globe, Building } from 'lucide-react';
import { useLeadGen } from '../../context/LeadGenContext';
import { ContentType, Challenge, Location, OrgType, Readiness } from '../../types/leadgen';

interface LeadGenQuestionsProps {
  onNext: () => void;
  onBack: () => void;
}

const questions = [
  {
    id: 1,
    question: 'What type of content do you need?',
    options: [
      { value: 'ebooks', label: 'Interactive eBooks', icon: BookOpen, color: '#38bdf8' },
      { value: 'video', label: 'Video Lessons', icon: Video, color: '#d946ef' },
      { value: 'audio', label: 'Audio/Podcasts', icon: Headphones, color: '#f59e0b' },
      { value: 'course', label: 'Full Course Development', icon: GraduationCap, color: '#ff4d6d' },
      { value: 'accessibility', label: 'Accessibility Remediation', icon: Shield, color: '#10b981' },
      { value: 'multiple', label: 'Multiple/Not Sure', icon: Target, color: '#94a3b8' }
    ]
  },
  {
    id: 2,
    question: "What's your biggest content challenge?",
    hasOther: true,
    options: [
      { value: 'engagement', label: 'Low engagement/completion rates', icon: BarChart },
      { value: 'speed', label: 'Content takes too long to create', icon: Clock },
      { value: 'mobile', label: 'Not mobile-friendly or accessible', icon: Smartphone },
      { value: 'budget', label: 'Budget constraints for quality', icon: DollarSign },
      { value: 'updates', label: 'Content needs constant updates', icon: RefreshCw },
      { value: 'tracking', label: "Can't track if message lands", icon: BarChart }
    ]
  },
  {
    id: 3,
    question: 'Where is your organization based?',
    options: [
      { value: 'us', label: 'United States', icon: Building },
      { value: 'intl_english', label: 'International (English content)', icon: Globe },
      { value: 'intl_multilang', label: 'International (Multi-language needs)', icon: Globe }
    ]
  },
  {
    id: 4,
    question: 'What type of organization are you?',
    hasOther: true,
    options: [
      { value: 'corporate', label: 'Corporate Training/L&D', icon: Building },
      { value: 'higher_ed', label: 'Higher Education', icon: GraduationCap },
      { value: 'k12', label: 'K-12 Education', icon: BookOpen },
      { value: 'healthcare', label: 'Healthcare/Medical', icon: Shield },
      { value: 'government', label: 'Government/Non-Profit', icon: Building },
      { value: 'marketing', label: 'Marketing/Lead Gen', icon: Target }
    ]
  },
  {
    id: 5,
    question: 'When are you looking to start?',
    options: [
      { value: 'ready_now', label: 'Ready now (have content & budget)', icon: Target },
      { value: '1_3_months', label: 'In 1-3 months (planning phase)', icon: Clock },
      { value: '3_6_months', label: '3-6 months (exploring options)', icon: Clock },
      { value: 'researching', label: 'Just researching', icon: BookOpen }
    ]
  }
];

export const LeadGenQuestions: React.FC<LeadGenQuestionsProps> = ({ onNext, onBack }) => {
  const { data, updateAnswers } = useLeadGen();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState('');

  const currentQ = questions[currentQuestion - 1];

  const getAnswer = () => {
    switch (currentQuestion) {
      case 1: return data.answers.contentType;
      case 2: return data.answers.challenge;
      case 3: return data.answers.location;
      case 4: return data.answers.orgType;
      case 5: return data.answers.readiness;
      default: return null;
    }
  };

  const handleSelect = (value: string) => {
    if (value === 'other') {
      setShowOtherInput(true);
      return;
    }

    const updates: any = {};
    switch (currentQuestion) {
      case 1:
        updates.contentType = value as ContentType;
        break;
      case 2:
        updates.challenge = value as Challenge;
        break;
      case 3:
        updates.location = value as Location;
        break;
      case 4:
        updates.orgType = value as OrgType;
        break;
      case 5:
        updates.readiness = value as Readiness;
        break;
    }
    updateAnswers(updates);

    // Auto-advance after selection
    setTimeout(() => {
      if (currentQuestion < 5) {
        setCurrentQuestion(currentQuestion + 1);
        setShowOtherInput(false);
        setOtherText('');
      } else {
        onNext();
      }
    }, 300);
  };

  const handleOtherSubmit = () => {
    if (!otherText.trim()) return;

    const updates: any = {};
    if (currentQuestion === 2) {
      updates.challenge = 'other' as Challenge;
      updates.challengeComment = otherText;
    } else if (currentQuestion === 4) {
      updates.orgType = 'other' as OrgType;
      updates.orgTypeComment = otherText;
    }
    updateAnswers(updates);

    setTimeout(() => {
      if (currentQuestion < 5) {
        setCurrentQuestion(currentQuestion + 1);
        setShowOtherInput(false);
        setOtherText('');
      } else {
        onNext();
      }
    }, 300);
  };

  const handleBack = () => {
    if (showOtherInput) {
      setShowOtherInput(false);
      setOtherText('');
    } else if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const selectedValue = getAnswer();

  return (
    <div className="min-h-screen bg-space flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-4xl">
        {/* Progress */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <div className={`w-2 h-2 rounded-full ${currentQuestion >= 1 ? 'bg-brand-red' : 'bg-white/20'}`} />
            <div className={`w-2 h-2 rounded-full ${currentQuestion >= 2 ? 'bg-brand-red' : 'bg-white/20'}`} />
            <div className={`w-2 h-2 rounded-full ${currentQuestion >= 3 ? 'bg-brand-red' : 'bg-white/20'}`} />
            <div className={`w-2 h-2 rounded-full ${currentQuestion >= 4 ? 'bg-brand-red' : 'bg-white/20'}`} />
            <div className={`w-2 h-2 rounded-full ${currentQuestion >= 5 ? 'bg-brand-red' : 'bg-white/20'}`} />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <p className="text-slate-400 text-sm">Question {currentQuestion} of 5</p>
        </div>

        {/* Question Card */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8 text-center">
            {currentQ.question}
          </h2>

          {!showOtherInput ? (
            <div className="grid md:grid-cols-2 gap-4">
              {currentQ.options.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedValue === option.value;
                const color = option.color || '#38bdf8';

                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`group relative p-6 rounded-xl border-2 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-space ${
                      isSelected
                        ? 'border-brand-red bg-brand-red/10'
                        : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                    }`}
                    style={{
                      boxShadow: isSelected ? `0 0 30px ${color}30` : undefined
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-brand-red/20' : 'bg-white/10'
                        }`}
                        style={{
                          backgroundColor: isSelected ? `${color}20` : undefined
                        }}
                      >
                        <Icon
                          size={24}
                          style={{ color: isSelected ? color : '#94a3b8' }}
                        />
                      </div>
                      <span className={`text-left font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}

              {currentQ.hasOther && (
                <button
                  onClick={() => handleSelect('other')}
                  className="group relative p-6 rounded-xl border-2 border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-space"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl text-slate-400">✏️</span>
                    </div>
                    <span className="text-left font-semibold text-slate-300">
                      Other (please specify)
                    </span>
                  </div>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder="Please describe your challenge or organization type..."
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all resize-none"
                rows={4}
                autoFocus
              />
              <button
                onClick={handleOtherSubmit}
                disabled={!otherText.trim()}
                className="w-full px-8 py-4 bg-brand-red text-white font-bold rounded-xl shadow-[0_0_30px_rgba(255,77,109,0.3)] hover:shadow-[0_0_40px_rgba(255,77,109,0.5)] transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-space inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Continue
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-white/5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-space inline-flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Your answers help us provide personalized recommendations
        </p>
      </div>
    </div>
  );
};
