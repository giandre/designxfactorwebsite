import { jsPDF } from 'jspdf';
import type { LeadGenData, ContentType, Challenge, Readiness } from '../types/leadgen';

// Design X Factor Brand Colors
const DXF_RED = '#FF4D6D';
const DXF_DARK = '#0F172A';
const DXF_GRAY = '#64748B';
const DXF_LIGHT_GRAY = '#F8FAFC';
const DXF_WHITE = '#FFFFFF';
const DXF_BLACK = '#1E293B';

// Logo URL
const LOGO_URL = 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/DXF_logo-white.png';

// Map content types to display names
const contentTypeLabels: Record<ContentType, string> = {
  'ebooks': 'eBooks',
  'video': 'Video Production',
  'audio': 'Audio/Podcasts',
  'course': 'Course Development',
  'accessibility': 'Accessibility Remediation',
  'multiple': 'Multiple Services'
};

// Map challenges to display names
const challengeLabels: Record<Challenge, string> = {
  'engagement': 'Low Engagement',
  'speed': 'Need Fast Turnaround',
  'mobile': 'Mobile Compatibility',
  'budget': 'Budget Constraints',
  'updates': 'Content Updates',
  'tracking': 'Progress Tracking',
  'other': 'Other Challenges'
};

// Map readiness to display names
const readinessLabels: Record<Readiness, string> = {
  'ready_now': 'Ready to Start Now',
  '1_3_months': '1-3 Months',
  '3_6_months': '3-6 Months',
  'researching': 'Just Researching'
};

// Helper to load image and convert to base64
const loadImageAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url, { mode: 'cors' });
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn('Failed to load image:', error);
    return null;
  }
};

export const generateLeadGenPDF = async (data: LeadGenData): Promise<void> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  const userName = data.contact.name || 'Valued Partner';

  let currentY = margin;

  // Load logo as base64
  const logoBase64 = await loadImageAsBase64(LOGO_URL);

  // Helper functions
  const addPage = () => {
    doc.addPage();
    currentY = margin;
  };

  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number = 7): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * lineHeight);
  };

  const checkPageBreak = (spaceNeeded: number = 40) => {
    if (currentY > pageHeight - spaceNeeded) {
      addPage();
      addHeaderBar();
    }
  };

  const addHeaderBar = () => {
    // Dark header bar (like website)
    doc.setFillColor(DXF_DARK);
    doc.rect(0, 0, pageWidth, 35, 'F');

    // Add logo if loaded
    if (logoBase64) {
      try {
        // Logo dimensions: use aspect ratio approximately 4:1 (width:height)
        const logoHeight = 20;
        const logoWidth = 80; // Approximate width based on your logo
        const logoX = (pageWidth - logoWidth) / 2;
        doc.addImage(logoBase64, 'PNG', logoX, 7.5, logoWidth, logoHeight);
      } catch (error) {
        console.warn('Failed to add logo to PDF:', error);
        // Fallback to text logo
        addTextLogo();
      }
    } else {
      // Fallback to text logo
      addTextLogo();
    }

    currentY = 50;
  };

  const addTextLogo = () => {
    // Fallback text-based logo
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');

    // Calculate positions for centered text
    const textY = 20;

    // "Design"
    doc.setTextColor(DXF_WHITE);
    const designWidth = doc.getTextWidth('Design ');

    // "X"
    doc.setTextColor(DXF_RED);
    const xWidth = doc.getTextWidth('X');

    // "Factor"
    doc.setTextColor(DXF_WHITE);
    const factorWidth = doc.getTextWidth(' Factor');

    const totalWidth = designWidth + xWidth + factorWidth;
    const startX = (pageWidth - totalWidth) / 2;

    // Draw the text
    doc.setTextColor(DXF_WHITE);
    doc.text('Design ', startX, textY);

    doc.setTextColor(DXF_RED);
    doc.text('X', startX + designWidth, textY);

    doc.setTextColor(DXF_WHITE);
    doc.text(' Factor', startX + designWidth + xWidth, textY);
  };

  // ========================================
  // PAGE 1: COVER PAGE
  // ========================================

  // White background
  doc.setFillColor(DXF_WHITE);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Add header bar
  addHeaderBar();

  // Personalized greeting
  doc.setFontSize(28);
  doc.setTextColor(DXF_BLACK);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Personalized', pageWidth / 2, currentY, { align: 'center' });

  currentY += 12;
  doc.text('Project Discovery', pageWidth / 2, currentY, { align: 'center' });

  currentY += 20;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(DXF_GRAY);
  doc.text(`Prepared for ${userName}`, pageWidth / 2, currentY, { align: 'center' });

  currentY += 25;

  // Recommendation badge
  if (data.recommendedServices && data.recommendedServices.length > 0) {
    doc.setFillColor(DXF_LIGHT_GRAY);
    doc.roundedRect(margin + 10, currentY, contentWidth - 20, 50, 5, 5, 'F');

    // Red accent bar on left
    doc.setFillColor(DXF_RED);
    doc.roundedRect(margin + 10, currentY, 4, 50, 2, 2, 'F');

    doc.setTextColor(DXF_BLACK);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended Solution', pageWidth / 2, currentY + 18, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(DXF_GRAY);
    const servicesText = data.recommendedServices.join(' + ');
    const lines = doc.splitTextToSize(servicesText, contentWidth - 40);
    const textY = currentY + 30;
    lines.forEach((line: string, index: number) => {
      doc.text(line, pageWidth / 2, textY + (index * 6), { align: 'center' });
    });
  }

  currentY += 70;

  // Date
  doc.setTextColor(DXF_GRAY);
  doc.setFontSize(10);
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.text(`Generated on ${today}`, pageWidth / 2, currentY, { align: 'center' });

  // Footer with stats
  currentY = pageHeight - 45;
  doc.setFillColor(DXF_LIGHT_GRAY);
  doc.roundedRect(margin, currentY, contentWidth, 30, 5, 5, 'F');

  // Red accent on top
  doc.setFillColor(DXF_RED);
  doc.roundedRect(margin, currentY, contentWidth, 3, 0, 0, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(DXF_BLACK);

  const statX1 = margin + 30;
  const statX2 = pageWidth / 2;
  const statX3 = pageWidth - margin - 30;

  doc.text('2-4 Weeks', statX1, currentY + 14, { align: 'center' });
  doc.text('WCAG 2.1 AA', statX2, currentY + 14, { align: 'center' });
  doc.text('Beautiful', statX3, currentY + 14, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(DXF_GRAY);
  doc.text('Delivery Time', statX1, currentY + 22, { align: 'center' });
  doc.text('Compliance', statX2, currentY + 22, { align: 'center' });
  doc.text('Branded', statX3, currentY + 22, { align: 'center' });

  // ========================================
  // PAGE 2: YOUR DISCOVERY SUMMARY
  // ========================================
  addPage();

  // White background
  doc.setFillColor(DXF_WHITE);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  addHeaderBar();

  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(DXF_BLACK);
  doc.text('Your Discovery Summary', margin, currentY);
  currentY += 8;

  // Red accent line
  doc.setFillColor(DXF_RED);
  doc.rect(margin, currentY, 40, 2, 'F');
  currentY += 12;

  // Introduction
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(DXF_GRAY);
  const intro = `Based on your responses, we've identified the best learning experience solutions for ${data.contact.company}. Here's what we learned about your needs:`;
  currentY = addWrappedText(intro, margin, currentY, contentWidth, 6);
  currentY += 15;

  // Response cards
  const responses = [
    { label: 'What You Need', value: contentTypeLabels[data.answers.contentType || 'ebooks'] },
    { label: 'Your Challenge', value: data.answers.challengeComment || challengeLabels[data.answers.challenge || 'engagement'] },
    { label: 'Your Location', value: data.answers.location === 'us' ? 'United States' : data.answers.location === 'intl_english' ? 'International (English)' : 'International (Multilingual)' },
    { label: 'Organization Type', value: data.answers.orgTypeComment || (data.answers.orgType ? data.answers.orgType.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Unknown') },
    { label: 'Timeline', value: readinessLabels[data.answers.readiness || 'researching'] }
  ];

  responses.forEach((response) => {
    checkPageBreak(25);

    doc.setFillColor(DXF_LIGHT_GRAY);
    doc.roundedRect(margin, currentY, contentWidth, 20, 3, 3, 'F');

    // Red accent line
    doc.setFillColor(DXF_RED);
    doc.roundedRect(margin, currentY, 3, 20, 2, 2, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(DXF_RED);
    doc.text(response.label, margin + 8, currentY + 8);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(DXF_BLACK);
    doc.text(response.value, margin + 8, currentY + 15);

    currentY += 25;
  });

  // ========================================
  // PAGE 3: RECOMMENDED SERVICES
  // ========================================
  addPage();

  // White background
  doc.setFillColor(DXF_WHITE);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  addHeaderBar();

  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(DXF_BLACK);
  doc.text('What We Recommend', margin, currentY);
  currentY += 8;

  // Red accent line
  doc.setFillColor(DXF_RED);
  doc.rect(margin, currentY, 40, 2, 'F');
  currentY += 12;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(DXF_GRAY);
  const recIntro = 'Based on your needs, here are the services we recommend:';
  currentY = addWrappedText(recIntro, margin, currentY, contentWidth, 6);
  currentY += 15;

  // Service descriptions
  const serviceDescriptions: Record<string, string[]> = {
    'eBook Creation': [
      'Transform your content into engaging, interactive eBooks',
      'WCAG 2.1 AA compliant from day one',
      'Mobile-responsive design for any device',
      'Built-in assessments and knowledge checks',
      'Beautiful branded design'
    ],
    'Video Production': [
      'Professional instructional video creation',
      'Full accessibility: captions, transcripts, audio descriptions',
      'Scripting and storyboarding included',
      'Motion graphics and animations',
      'Optimized for LMS integration'
    ],
    'Audio & Podcasts': [
      'Podcast-style learning content',
      'Perfect for on-the-go learners',
      'Professional audio editing and production',
      'Full transcripts provided',
      'RSS feed setup for easy distribution'
    ],
    'Full Course Development': [
      'Complete instructional design from scratch',
      'Learning objectives and assessment strategy',
      'Multi-modal content (video, text, interactive)',
      'SCORM/xAPI compliant',
      'Launch support and training'
    ],
    'Accessibility Remediation': [
      'Make existing content WCAG 2.1 AA compliant',
      'PDF remediation and tagging',
      'Alternative text for images',
      'Screen reader optimization',
      'Keyboard navigation testing'
    ]
  };

  if (data.recommendedServices) {
    data.recommendedServices.forEach((service, index) => {
      checkPageBreak(55);

      // Service header with number badge
      doc.setFillColor(DXF_RED);
      doc.circle(margin + 5, currentY + 4, 5, 'F');
      doc.setTextColor(DXF_WHITE);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}`, margin + 5, currentY + 6, { align: 'center' });

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(DXF_BLACK);
      doc.text(service, margin + 15, currentY + 6);

      currentY += 15;

      // Service bullets
      const descriptions = serviceDescriptions[service] || [`We'll create custom ${service.toLowerCase()} solutions for your organization.`];
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(DXF_GRAY);

      descriptions.forEach((desc) => {
        checkPageBreak(18);

        // Red bullet - positioned at text baseline
        const textBaseline = currentY;
        doc.setFillColor(DXF_RED);
        doc.circle(margin + 17, textBaseline - 1, 1.5, 'F');

        currentY = addWrappedText(desc, margin + 22, textBaseline, contentWidth - 22, 5);
        currentY += 3;
      });

      currentY += 8;
    });
  }

  // ========================================
  // PAGE 4: WHY DESIGN X FACTOR
  // ========================================
  addPage();

  // White background
  doc.setFillColor(DXF_WHITE);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  addHeaderBar();

  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(DXF_BLACK);
  doc.text('Why Design X Factor?', margin, currentY);
  currentY += 8;

  // Red accent line
  doc.setFillColor(DXF_RED);
  doc.rect(margin, currentY, 40, 2, 'F');
  currentY += 12;

  const whyPoints = [
    {
      title: 'Fast Turnaround',
      description: 'We deliver high-quality learning experiences in 2-4 weeks, not months. Our streamlined process ensures you meet tight deadlines without compromising quality.'
    },
    {
      title: 'Accessibility Built-In',
      description: 'Every project is WCAG 2.1 AA compliant from day one. No retrofitting needed. We build accessibility into every step of the process.'
    },
    {
      title: 'Proven Process',
      description: 'Our transformation pipeline has processed thousands of content pieces. We know what works and deliver consistent, reliable results.'
    }
  ];

  whyPoints.forEach((point, index) => {
    checkPageBreak(35);

    // Number badge
    doc.setFillColor(DXF_LIGHT_GRAY);
    doc.roundedRect(margin, currentY, 12, 12, 2, 2, 'F');

    doc.setFillColor(DXF_RED);
    doc.roundedRect(margin, currentY, 3, 12, 2, 2, 'F');

    doc.setTextColor(DXF_BLACK);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}`, margin + 7, currentY + 8, { align: 'center' });

    doc.setFontSize(13);
    doc.setTextColor(DXF_BLACK);
    doc.text(point.title, margin + 18, currentY + 8);

    currentY += 13;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(DXF_GRAY);
    currentY = addWrappedText(point.description, margin + 18, currentY, contentWidth - 18, 5);

    currentY += 12;
  });

  // ========================================
  // PAGE 5: NEXT STEPS
  // ========================================
  addPage();

  // White background
  doc.setFillColor(DXF_WHITE);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  addHeaderBar();

  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(DXF_BLACK);
  doc.text('Your Next Steps', margin, currentY);
  currentY += 8;

  // Red accent line
  doc.setFillColor(DXF_RED);
  doc.rect(margin, currentY, 40, 2, 'F');
  currentY += 12;

  const nextSteps = [
    {
      title: 'Schedule a Call',
      description: 'Reach out to discuss your specific needs, timeline, and budget. We\'ll answer all your questions and explore how we can help.',
      action: 'Email: gio@designxfactor.com'
    },
    {
      title: 'Review Our Portfolio',
      description: 'Check out live examples of courses, eBooks, and videos we\'ve created for organizations like yours.',
      action: 'Visit: designxfactor.com/#portfolio'
    }
  ];

  nextSteps.forEach((step, index) => {
    checkPageBreak(40);

    // Number badge with red background
    doc.setFillColor(DXF_RED);
    doc.roundedRect(margin, currentY, 12, 12, 2, 2, 'F');

    doc.setTextColor(DXF_WHITE);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}`, margin + 6, currentY + 8, { align: 'center' });

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(DXF_BLACK);
    doc.text(step.title, margin + 18, currentY + 8);

    currentY += 13;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(DXF_GRAY);
    currentY = addWrappedText(step.description, margin + 18, currentY, contentWidth - 18, 5);

    currentY += 5;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(DXF_RED);
    doc.text(step.action, margin + 18, currentY);

    currentY += 15;
  });

  currentY += 10;

  // Contact card
  doc.setFillColor(DXF_LIGHT_GRAY);
  doc.roundedRect(margin, currentY, contentWidth, 35, 5, 5, 'F');

  doc.setFillColor(DXF_RED);
  doc.roundedRect(margin, currentY, contentWidth, 3, 5, 5, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(DXF_BLACK);
  doc.text('Ready to Get Started?', pageWidth / 2, currentY + 12, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(DXF_GRAY);
  doc.text('We typically respond within 24 hours', pageWidth / 2, currentY + 20, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(DXF_RED);
  doc.text('gio@designxfactor.com', pageWidth / 2, currentY + 28, { align: 'center' });

  // Save the PDF
  const fileName = `DXF-Discovery-${userName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
