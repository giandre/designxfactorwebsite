export type ContentType =
  | 'ebooks'
  | 'video'
  | 'audio'
  | 'course'
  | 'accessibility'
  | 'multiple';

export type Challenge =
  | 'engagement'
  | 'speed'
  | 'mobile'
  | 'budget'
  | 'updates'
  | 'tracking'
  | 'other';

export type Location =
  | 'us'
  | 'intl_english'
  | 'intl_multilang';

export type OrgType =
  | 'corporate'
  | 'higher_ed'
  | 'k12'
  | 'healthcare'
  | 'government'
  | 'marketing'
  | 'other';

export type Readiness =
  | 'ready_now'
  | '1_3_months'
  | '3_6_months'
  | 'researching';

export type Outcome =
  | 'hot'
  | 'warm'
  | 'nurture'
  | 'not_fit';

export interface ContactInfo {
  name: string;
  email: string;
  company: string;
  role?: string;
}

export interface LeadGenAnswers {
  contentType: ContentType | null;
  challenge: Challenge | null;
  challengeComment?: string;
  location: Location | null;
  orgType: OrgType | null;
  orgTypeComment?: string;
  readiness: Readiness | null;
}

export interface LeadGenData {
  contact: ContactInfo;
  answers: LeadGenAnswers;
  outcome?: Outcome;
  recommendedServices?: string[];
  timestamp?: string;
}
