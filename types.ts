export enum LayerType {
  FOUNDATION = 'FOUNDATION',
  ENGAGEMENT = 'ENGAGEMENT',
  MULTIMODAL = 'MULTIMODAL',
  EMPOWERMENT = 'EMPOWERMENT'
}

export interface ProductData {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export interface LayerContent {
  id: number;
  type: LayerType;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  hex: string;
}

export type PageView = 'home' | 'terms' | 'privacy' | 'api' | 'thank-you' | 'learning-transformer';

export interface NavProps {
  onNavigate: (page: PageView) => void;
  currentPage: PageView;
}