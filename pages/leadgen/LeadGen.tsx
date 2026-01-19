import React, { useState } from 'react';
import { LeadGenProvider } from '../../context/LeadGenContext';
import { LeadGenLanding } from './LeadGenLanding';
import { LeadGenContact } from './LeadGenContact';
import { LeadGenQuestions } from './LeadGenQuestions';
import { LeadGenProcessing } from './LeadGenProcessing';
import { LeadGenOutcome } from './LeadGenOutcome';
import { PageView } from '../../types';

type LeadGenStep = 'landing' | 'contact' | 'questions' | 'processing' | 'outcome';

interface LeadGenProps {
  onNavigate: (page: PageView) => void;
}

const LeadGenFlow: React.FC<LeadGenProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<LeadGenStep>('landing');

  const handleStartJourney = () => {
    setStep('contact');
  };

  const handleContactComplete = () => {
    setStep('questions');
  };

  const handleQuestionsComplete = () => {
    setStep('processing');
  };

  const handleProcessingComplete = () => {
    setStep('outcome');
  };

  const handleBack = () => {
    if (step === 'contact') {
      setStep('landing');
    } else if (step === 'questions') {
      setStep('contact');
    }
  };

  return (
    <>
      {step === 'landing' && (
        <LeadGenLanding
          onNavigate={onNavigate}
          onStartJourney={handleStartJourney}
        />
      )}
      {step === 'contact' && (
        <LeadGenContact
          onNext={handleContactComplete}
          onBack={handleBack}
        />
      )}
      {step === 'questions' && (
        <LeadGenQuestions
          onNext={handleQuestionsComplete}
          onBack={handleBack}
        />
      )}
      {step === 'processing' && (
        <LeadGenProcessing
          onComplete={handleProcessingComplete}
        />
      )}
      {step === 'outcome' && (
        <LeadGenOutcome
          onNavigate={onNavigate}
        />
      )}
    </>
  );
};

export const LeadGen: React.FC<LeadGenProps> = ({ onNavigate }) => {
  return (
    <LeadGenProvider>
      <LeadGenFlow onNavigate={onNavigate} />
    </LeadGenProvider>
  );
};
