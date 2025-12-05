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
  icon: string; // Lucide icon name
  color: string; // Hex or tailwind class ref
  features: string[];
}

export interface LayerContent {
  id: number;
  type: LayerType;
  title: string;
  subtitle: string;
  description: string;
  color: string; // Tailwind color class core (e.g., 'brand-blue')
  hex: string;
}