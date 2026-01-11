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
    title: 'Design X Factor | Premium Learning Content Creation',
    description: 'We create engaging eBooks, videos, podcasts, and full courses that captivate learners. Professional content production for education and corporate training.',
    keywords: 'ebook creation, video production, course development, podcast production, learning content, corporate training, educational videos, accessible content',
  },
  'learning-transformer': {
    title: 'Learning Transformer | Content Transformation | Design X Factor',
    description: 'Transform your existing content into engaging, accessible learning experiences. We convert documents, presentations, and text into videos, eBooks, and interactive courses.',
    keywords: 'content transformation, document conversion, learning content, accessible learning',
  },
  audit: {
    title: 'Content Audit | Assess Your Learning Materials | Design X Factor',
    description: 'Free tool to assess your learning content and discover opportunities for improvement. Get a roadmap for creating more engaging, accessible materials.',
    keywords: 'content audit, learning assessment, content improvement, accessibility review',
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
    title: 'Services | Premium Learning Content Creation | Design X Factor',
    description: 'Professional content creation services: engaging eBooks, captivating videos, immersive podcasts, and complete course development. See what we can create for you.',
    keywords: 'ebook creation, video production, podcast production, course development, learning content services',
  },
  portfolio: {
    title: 'Portfolio | Our Work | Design X Factor',
    description: 'Explore our portfolio of learning content: interactive videos, engaging eBooks, immersive audio experiences, and complete courses. See the quality we deliver.',
    keywords: 'learning portfolio, content samples, course examples, ebook samples, video examples',
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