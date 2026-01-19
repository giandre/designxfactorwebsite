import { LeadGenData, Outcome, ContentType } from '../types/leadgen';

interface OutcomeResult {
  outcome: Outcome;
  recommendedServices: string[];
  reasoning: string;
}

export const determineOutcome = (data: LeadGenData): OutcomeResult => {
  const { answers } = data;

  // NOT A FIT criteria
  // Currently no automatic disqualifiers, but structure is here for future
  const notFitReasons: string[] = [];

  if (notFitReasons.length > 0) {
    return {
      outcome: 'not_fit',
      recommendedServices: [],
      reasoning: notFitReasons.join('; ')
    };
  }

  // Determine recommended services based on content type
  const recommendedServices = getRecommendedServices(answers.contentType);

  // Determine readiness level
  if (answers.readiness === 'ready_now') {
    // Additional check: are they in target segments?
    const isTargetSegment = ['corporate', 'higher_ed', 'marketing', 'healthcare'].includes(answers.orgType || '');
    const hasClearNeed = answers.challenge && answers.challenge !== 'researching';

    if (isTargetSegment && hasClearNeed) {
      return {
        outcome: 'hot',
        recommendedServices,
        reasoning: 'Ready now with clear need in target segment'
      };
    }

    // Still hot, but maybe less priority
    return {
      outcome: 'hot',
      recommendedServices,
      reasoning: 'Ready now'
    };
  }

  if (answers.readiness === '1_3_months' || answers.readiness === '3_6_months') {
    return {
      outcome: 'warm',
      recommendedServices,
      reasoning: 'Good fit but not ready immediately'
    };
  }

  // Just researching
  return {
    outcome: 'nurture',
    recommendedServices,
    reasoning: 'Early stage exploration'
  };
};

const getRecommendedServices = (contentType: ContentType | null): string[] => {
  if (!contentType) return ['Full Course Development'];

  switch (contentType) {
    case 'ebooks':
      return ['eBook Creation', 'Accessibility Remediation'];
    case 'video':
      return ['Video Production', 'Full Course Development'];
    case 'audio':
      return ['Audio & Podcasts', 'Full Course Development'];
    case 'course':
      return ['Full Course Development', 'Video Production', 'eBook Creation'];
    case 'accessibility':
      return ['Accessibility Remediation', 'eBook Creation'];
    case 'multiple':
      return ['Full Course Development', 'Video Production', 'eBook Creation', 'Audio & Podcasts'];
    default:
      return ['Full Course Development'];
  }
};

export const getChallengeLabel = (challenge: string | null): string => {
  const labels: Record<string, string> = {
    engagement: 'Low engagement/completion rates',
    speed: 'Content takes too long to create',
    mobile: 'Not mobile-friendly or accessible',
    budget: 'Budget constraints for quality production',
    updates: 'Content needs constant updates',
    tracking: "Can't track if message is landing",
    other: 'Custom challenge'
  };
  return labels[challenge || ''] || 'Not specified';
};

export const getOrgTypeLabel = (orgType: string | null): string => {
  const labels: Record<string, string> = {
    corporate: 'Corporate Training/L&D',
    higher_ed: 'Higher Education',
    k12: 'K-12 Education',
    healthcare: 'Healthcare/Medical',
    government: 'Government/Non-Profit',
    marketing: 'Marketing/Lead Gen',
    other: 'Other'
  };
  return labels[orgType || ''] || 'Not specified';
};

export const getContentTypeLabel = (contentType: string | null): string => {
  const labels: Record<string, string> = {
    ebooks: 'Interactive eBooks',
    video: 'Video Lessons',
    audio: 'Audio/Podcasts',
    course: 'Full Course Development',
    accessibility: 'Accessibility Remediation',
    multiple: 'Multiple Services'
  };
  return labels[contentType || ''] || 'Not specified';
};

export const getReadinessLabel = (readiness: string | null): string => {
  const labels: Record<string, string> = {
    ready_now: 'Ready now (have content & budget)',
    '1_3_months': 'In 1-3 months (planning phase)',
    '3_6_months': '3-6 months (exploring options)',
    researching: 'Just researching'
  };
  return labels[readiness || ''] || 'Not specified';
};
