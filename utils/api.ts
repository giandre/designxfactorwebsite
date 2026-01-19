import type { LeadGenData } from '../types/leadgen';

const API_BASE = import.meta.env.PROD ? '/api' : '/api';

interface SubmitLeadResponse {
  success: boolean;
  id?: number;
  error?: string;
}

interface ContactMeRequest {
  leadData: LeadGenData;
  action: 'contact_me' | 'pdf_download';
}

/**
 * Submit lead generation data to the backend
 */
export const submitLead = async (data: LeadGenData): Promise<SubmitLeadResponse> => {
  try {
    const response = await fetch(`${API_BASE}/leadgen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to submit lead:', error);
      return { success: false, error };
    }

    const result = await response.json();
    return { success: true, id: result.id };
  } catch (error) {
    console.error('Error submitting lead:', error);
    return { success: false, error: String(error) };
  }
};

/**
 * Track contact me button click and send notification
 */
export const trackContactMe = async (data: ContactMeRequest): Promise<SubmitLeadResponse> => {
  try {
    const response = await fetch(`${API_BASE}/leadgen/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to track contact:', error);
      return { success: false, error };
    }

    const result = await response.json();
    return { success: true, id: result.id };
  } catch (error) {
    console.error('Error tracking contact:', error);
    return { success: false, error: String(error) };
  }
};
