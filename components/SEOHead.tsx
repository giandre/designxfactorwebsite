import React, { useEffect } from 'react';
import { PageView } from '../types';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

const seoConfigs: Record<PageView, SEOConfig> = {
  home: {
    title: 'Design X Factor | AI-Powered Learning Transformation Platform',
    description: 'Transform static LMS content into accessible, WCAG 2.1 AA compliant learning experiences. AI-powered content transformation for higher education.',
    keywords: 'LMS accessibility, WCAG compliance, AI learning, content transformation, ADA compliance',
  },
  'learning-transformer': {
    title: 'Learning Transformer | Automated LMS Accessibility | Design X Factor',
    description: 'Automatically transform static LMS content into dynamic, accessible learning experiences. WCAG 2.1 AA compliant output with video, audio, and interactive elements.',
    keywords: 'LMS transformation, accessible learning, Canvas accessibility, Blackboard WCAG',
  },
  audit: {
    title: 'Content Debt Audit | Calculate ADA Compliance Risk | Design X Factor',
    description: 'Free tool to calculate your institution\'s content accessibility debt. Estimate remediation costs and discover AI-powered solutions.',
    keywords: 'ADA compliance calculator, WCAG audit, accessibility cost, content debt',
  },
  'thank-you': {
    title: 'Thank You | Design X Factor',
    description: 'Thank you for contacting Design X Factor. We\'ll be in touch shortly.',
  },
  terms: {
    title: 'Terms of Service | Design X Factor',
    description: 'Terms of Service for Design X Factor AI-powered learning platform.',
  },
  privacy: {
    title: 'Privacy Policy | Design X Factor',
    description: 'Privacy Policy for Design X Factor. Learn how we protect your data and comply with FERPA.',
  },
  api: {
    title: 'API Documentation | Design X Factor',
    description: 'API documentation for integrating Design X Factor into your learning management system.',
  },
  pipeline: {
    title: 'Transformation Pipeline | Design X Factor',
    description: 'See how we transform your content through our AI-powered production pipeline.',
  },
  services: {
    title: 'Services | Design X Factor',
    description: 'Explore our content transformation services: eBooks, videos, podcasts, courses, and accessibility remediation.',
    keywords: 'ebook creation, video production, podcast production, course development, accessibility remediation',
  },
  portfolio: {
    title: 'Portfolio | Design X Factor',
    description: 'View our portfolio of transformed learning content including interactive videos, eBooks, and full courses.',
    keywords: 'learning portfolio, content samples, course examples, ebook samples',
  },
};

export const SEOHead: React.FC<{ page: PageView }> = ({ page }) => {
  useEffect(() => {
    const config = seoConfigs[page] || seoConfigs.home;
    
    // Update document title
    document.title = config.title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.description);
    }
    
    // Update meta keywords if present
    if (config.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', config.keywords);
      }
    }
    
    // Update canonical URL
    const canonicalPath = page === 'home' ? '' : `#${page}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://designxfactor.com/${canonicalPath}`);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute('content', config.title);
    if (ogDesc) ogDesc.setAttribute('content', config.description);
    
  }, [page]);
  
  return null; // This component only manages side effects
};