import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LeadGenData, ContactInfo, LeadGenAnswers } from '../types/leadgen';

interface LeadGenContextType {
  data: LeadGenData;
  updateContact: (contact: ContactInfo) => void;
  updateAnswers: (answers: Partial<LeadGenAnswers>) => void;
  resetData: () => void;
}

const LeadGenContext = createContext<LeadGenContextType | undefined>(undefined);

const STORAGE_KEY = 'dxf_leadgen_data';

const initialData: LeadGenData = {
  contact: {
    name: '',
    email: '',
    company: '',
    role: ''
  },
  answers: {
    contentType: null,
    challenge: null,
    challengeComment: '',
    location: null,
    orgType: null,
    orgTypeComment: '',
    readiness: null
  }
};

export const LeadGenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<LeadGenData>(() => {
    // Load from sessionStorage on mount
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return initialData;
        }
      }
    }
    return initialData;
  });

  // Save to sessionStorage whenever data changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data]);

  const updateContact = (contact: ContactInfo) => {
    setData(prev => ({
      ...prev,
      contact: { ...prev.contact, ...contact }
    }));
  };

  const updateAnswers = (answers: Partial<LeadGenAnswers>) => {
    setData(prev => ({
      ...prev,
      answers: { ...prev.answers, ...answers }
    }));
  };

  const resetData = () => {
    setData(initialData);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <LeadGenContext.Provider value={{ data, updateContact, updateAnswers, resetData }}>
      {children}
    </LeadGenContext.Provider>
  );
};

export const useLeadGen = () => {
  const context = useContext(LeadGenContext);
  if (context === undefined) {
    throw new Error('useLeadGen must be used within a LeadGenProvider');
  }
  return context;
};
