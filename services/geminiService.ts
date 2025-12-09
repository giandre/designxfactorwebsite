import { FileAnalysisResult, ComplianceIssue } from "../types";

/**
 * Content Debt Audit - Document Analyzer
 * 
 * This service analyzes uploaded documents for ADA/WCAG compliance.
 * - HTML files: Full client-side parsing and analysis
 * - Binary files (PDF/DOC/PPT): Conservative risk assessment based on format
 * 
 * No API key required - runs entirely in the browser.
 */

// ============ UTILITIES ============

const fileToText = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

// ============ HTML ANALYZER (Client-Side) ============

interface HTMLAnalysisResult {
  isCompliant: boolean;
  issues: ComplianceIssue[];
  stats: {
    hasSemanticStructure: boolean;
    imagesWithoutAlt: number;
    totalImages: number;
    hasHeadingHierarchy: boolean;
    hasLandmarks: boolean;
    linksWithoutText: number;
    tablesWithoutHeaders: number;
    formsWithoutLabels: number;
  };
}

const analyzeHTML = (htmlContent: string): HTMLAnalysisResult => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  
  const issues: ComplianceIssue[] = [];
  
  // 1. Check for images without alt text
  const images = doc.querySelectorAll('img');
  const imagesWithoutAlt = Array.from(images).filter(img => {
    const alt = img.getAttribute('alt');
    return alt === null || alt === undefined;
  });
  
  if (imagesWithoutAlt.length > 0) {
    issues.push({
      severity: 'high',
      issue: 'Missing Alt Text',
      description: `${imagesWithoutAlt.length} image(s) missing alt attributes. Screen readers cannot describe these images.`
    });
  }
  
  // 2. Check heading hierarchy
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const headingLevels = Array.from(headings).map(h => parseInt(h.tagName[1]));
  let hasHeadingHierarchy = true;
  let hasSkippedLevels = false;
  
  for (let i = 1; i < headingLevels.length; i++) {
    if (headingLevels[i] - headingLevels[i-1] > 1) {
      hasSkippedLevels = true;
      hasHeadingHierarchy = false;
    }
  }
  
  if (headings.length === 0) {
    issues.push({
      severity: 'high',
      issue: 'No Heading Structure',
      description: 'Document lacks heading tags (H1-H6). Screen readers use headings for navigation.'
    });
    hasHeadingHierarchy = false;
  } else if (hasSkippedLevels) {
    issues.push({
      severity: 'medium',
      issue: 'Skipped Heading Levels',
      description: 'Heading hierarchy skips levels (e.g., H1 to H3). This can confuse assistive technology.'
    });
  }
  
  // 3. Check for landmark regions
  const landmarks = doc.querySelectorAll('nav, main, header, footer, aside, [role="navigation"], [role="main"], [role="banner"], [role="contentinfo"]');
  const hasLandmarks = landmarks.length > 0;
  
  if (!hasLandmarks) {
    issues.push({
      severity: 'medium',
      issue: 'No Landmark Regions',
      description: 'No semantic landmarks (<nav>, <main>, <header>, etc.) found. Landmarks help users navigate.'
    });
  }
  
  // 4. Check links without accessible text
  const links = doc.querySelectorAll('a');
  const linksWithoutText = Array.from(links).filter(link => {
    const text = link.textContent?.trim();
    const ariaLabel = link.getAttribute('aria-label');
    const title = link.getAttribute('title');
    return !text && !ariaLabel && !title;
  });
  
  if (linksWithoutText.length > 0) {
    issues.push({
      severity: 'high',
      issue: 'Links Without Accessible Text',
      description: `${linksWithoutText.length} link(s) have no readable text or aria-label.`
    });
  }
  
  // 5. Check tables without headers
  const tables = doc.querySelectorAll('table');
  const tablesWithoutHeaders = Array.from(tables).filter(table => {
    const ths = table.querySelectorAll('th');
    const hasScope = Array.from(ths).some(th => th.hasAttribute('scope'));
    return ths.length === 0 || (ths.length > 0 && !hasScope);
  });
  
  if (tablesWithoutHeaders.length > 0) {
    issues.push({
      severity: 'medium',
      issue: 'Tables Missing Headers',
      description: `${tablesWithoutHeaders.length} table(s) lack proper header cells (<th>) or scope attributes.`
    });
  }
  
  // 6. Check form inputs without labels
  const inputs = doc.querySelectorAll('input, select, textarea');
  const formsWithoutLabels = Array.from(inputs).filter(input => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    const hasAssociatedLabel = id ? doc.querySelector(`label[for="${id}"]`) : false;
    const type = input.getAttribute('type');
    
    // Skip hidden and submit/button types
    if (type === 'hidden' || type === 'submit' || type === 'button') return false;
    
    return !hasAssociatedLabel && !ariaLabel && !ariaLabelledBy;
  });
  
  if (formsWithoutLabels.length > 0) {
    issues.push({
      severity: 'high',
      issue: 'Form Fields Missing Labels',
      description: `${formsWithoutLabels.length} form field(s) lack associated labels. Users won't know what to enter.`
    });
  }
  
  // 7. Check for semantic structure (not just divs/spans)
  const semanticTags = doc.querySelectorAll('article, section, nav, aside, header, footer, main, figure, figcaption');
  const hasSemanticStructure = semanticTags.length > 0 || headings.length > 0;
  
  if (!hasSemanticStructure) {
    issues.push({
      severity: 'medium',
      issue: 'Lack of Semantic Structure',
      description: 'Document uses mostly generic elements. Semantic HTML improves accessibility.'
    });
  }
  
  // Determine overall compliance
  const highSeverityCount = issues.filter(i => i.severity === 'high').length;
  const isCompliant = highSeverityCount === 0;
  
  return {
    isCompliant,
    issues,
    stats: {
      hasSemanticStructure,
      imagesWithoutAlt: imagesWithoutAlt.length,
      totalImages: images.length,
      hasHeadingHierarchy,
      hasLandmarks,
      linksWithoutText: linksWithoutText.length,
      tablesWithoutHeaders: tablesWithoutHeaders.length,
      formsWithoutLabels: formsWithoutLabels.length
    }
  };
};

// ============ BINARY FILE ANALYZER (Heuristic) ============

const analyzeBinaryFile = (file: File): FileAnalysisResult => {
  const fileName = file.name.toLowerCase();
  const isSlideDeck = /\.(ppt|pptx)$/i.test(fileName);
  const isDoc = /\.(doc|docx)$/i.test(fileName);
  const isPDF = /\.pdf$/i.test(fileName);
  const isImage = file.type.startsWith('image/');
  
  // Estimate pages based on file size and type
  let estimatedPages = 10;
  const fileSizeMB = file.size / (1024 * 1024);
  
  if (isPDF) {
    // Rough estimate: ~100KB per page for text-heavy, ~500KB for image-heavy
    estimatedPages = Math.max(1, Math.round(fileSizeMB * 5));
  } else if (isSlideDeck) {
    // Slides: ~200KB per slide average
    estimatedPages = Math.max(5, Math.round(fileSizeMB * 3));
  } else if (isDoc) {
    // Docs: ~50KB per page
    estimatedPages = Math.max(1, Math.round(fileSizeMB * 10));
  } else if (isImage) {
    estimatedPages = 1;
  }
  
  // Cap at reasonable numbers
  estimatedPages = Math.min(estimatedPages, 100);
  
  const issues: ComplianceIssue[] = [];
  let summary = '';
  
  if (isPDF) {
    issues.push({
      severity: 'high',
      issue: 'PDF Format Risk',
      description: 'PDF accessibility cannot be verified client-side. Many PDFs lack proper tagging for screen readers.'
    });
    issues.push({
      severity: 'high',
      issue: 'Reading Order Unknown',
      description: 'PDF reading order may not match visual layout, causing confusion for assistive technology.'
    });
    issues.push({
      severity: 'medium',
      issue: 'Text Extraction Risk',
      description: 'Scanned PDFs or "Print to PDF" files often contain image-only content that cannot be read.'
    });
    summary = `PDF files require server-side analysis for complete accessibility verification. Industry data shows approximately 85% of legacy course PDFs contain WCAG 2.1 violations. Common issues include missing document tags, undefined reading order, and images without alt text. File size suggests approximately ${estimatedPages} pages.`;
    
  } else if (isSlideDeck) {
    issues.push({
      severity: 'high',
      issue: 'Slide Reading Order',
      description: 'PowerPoint slides often have undefined reading order. Content boxes may be read in wrong sequence.'
    });
    issues.push({
      severity: 'high',
      issue: 'Slide Master Accessibility',
      description: 'Slide templates rarely include proper accessibility settings by default.'
    });
    issues.push({
      severity: 'medium',
      issue: 'Chart/SmartArt Issues',
      description: 'Charts and SmartArt graphics typically lack alternative text descriptions.'
    });
    summary = `PowerPoint presentations have inherent accessibility challenges. Slide masters rarely enforce reading order, and embedded charts/graphics often lack descriptions. Estimated ${estimatedPages} slides require remediation.`;
    
  } else if (isDoc) {
    issues.push({
      severity: 'high',
      issue: 'Document Structure',
      description: 'Word documents may use visual formatting instead of proper heading styles.'
    });
    issues.push({
      severity: 'medium',
      issue: 'Table Accessibility',
      description: 'Tables in Word documents often lack header row designations.'
    });
    issues.push({
      severity: 'medium',
      issue: 'Export Compatibility',
      description: 'Accessibility features may not transfer when exported to PDF.'
    });
    summary = `Word documents require verification of heading styles, table structures, and image alt text. Even well-formatted documents can lose accessibility when exported. Estimated ${estimatedPages} pages.`;
    
  } else if (isImage) {
    issues.push({
      severity: 'high',
      issue: 'No Text Alternative',
      description: 'Standalone images provide no accessible text content without context.'
    });
    summary = `Image files cannot be read by screen readers without alt text provided by the surrounding context. If this image is used in course content, ensure it has a descriptive text alternative.`;
    
  } else {
    issues.push({
      severity: 'medium',
      issue: 'Unknown Format',
      description: 'This file format cannot be analyzed for accessibility compliance.'
    });
    summary = `Unable to analyze this file format. Manual review recommended.`;
  }
  
  return {
    fileName: file.name,
    estimatedPages,
    isCompliant: false,
    issues,
    summary
  };
};

// ============ MAIN EXPORT ============

export const analyzeDocument = async (file: File): Promise<FileAnalysisResult> => {
  const isHtml = file.type === 'text/html' || /\.(html|htm)$/i.test(file.name);
  
  if (isHtml) {
    // Full client-side HTML analysis
    try {
      const htmlContent = await fileToText(file);
      const analysis = analyzeHTML(htmlContent);
      
      // Estimate pages from content length (~3000 chars per page)
      const estimatedPages = Math.max(1, Math.round(htmlContent.length / 3000));
      
      let summary = '';
      if (analysis.isCompliant) {
        summary = `Great news! This HTML document passes basic accessibility checks. It uses semantic structure and has no critical violations detected. ${analysis.stats.totalImages > 0 ? `All ${analysis.stats.totalImages} images have alt attributes.` : ''} ${analysis.stats.hasLandmarks ? 'Proper landmark regions are in place.' : ''} For full WCAG 2.1 AA compliance, we recommend additional testing for color contrast and keyboard navigation.`;
      } else {
        const highCount = analysis.issues.filter(i => i.severity === 'high').length;
        const medCount = analysis.issues.filter(i => i.severity === 'medium').length;
        summary = `This HTML document has ${highCount} critical and ${medCount} moderate accessibility issues that need attention. ${analysis.stats.imagesWithoutAlt > 0 ? `${analysis.stats.imagesWithoutAlt} images are missing alt text.` : ''} ${!analysis.stats.hasHeadingHierarchy ? 'The heading structure needs improvement.' : ''} These issues can impact users relying on assistive technology.`;
      }
      
      return {
        fileName: file.name,
        estimatedPages,
        isCompliant: analysis.isCompliant,
        issues: analysis.issues,
        summary
      };
      
    } catch (error) {
      console.error('HTML parsing failed:', error);
      return {
        fileName: file.name,
        estimatedPages: 5,
        isCompliant: false,
        issues: [{ severity: 'medium', issue: 'Parse Error', description: 'Could not fully parse HTML content.' }],
        summary: 'The HTML file could not be fully analyzed. Manual review recommended.'
      };
    }
    
  } else {
    // Binary file - use heuristic analysis
    return analyzeBinaryFile(file);
  }
};