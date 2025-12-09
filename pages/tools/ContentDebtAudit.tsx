import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  NavProps, 
  InstitutionType, 
  AuditFormData, 
  AuditReport 
} from '../../types';
import { analyzeDocument } from '../../services/geminiService';
import { calculateContentDebt } from '../../services/auditLogic';
import { 
  AlertTriangle, Lock, Scale, Upload, CheckCircle, Loader2, Info,
  Clock, DollarSign, CheckCircle2, TrendingUp, XCircle, FileWarning, 
  ShieldCheck, X, Send, Paperclip, ArrowLeft, FileSearch, Cpu, BarChart3
} from 'lucide-react';

// ============ TYPES ============
enum AuditStep {
  LANDING = 'LANDING',
  FORM = 'FORM',
  ANALYZING = 'ANALYZING',
  REPORT = 'REPORT'
}

// ============ LANDING COMPONENT ============
const AuditLanding: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <section 
    className="relative overflow-hidden min-h-[80vh] flex items-center justify-center py-20"
    aria-labelledby="audit-landing-heading"
  >
    <div className="absolute inset-0 z-0 opacity-10" aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
      </svg>
    </div>

    <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
      <div 
        className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/20 border border-brand-red text-brand-red animate-pulse"
        role="status"
      >
        <AlertTriangle size={20} aria-hidden="true" />
        <span className="text-sm font-semibold tracking-wider uppercase">Critical Compliance Alert: April 2026 Deadline</span>
      </div>

      <h1 id="audit-landing-heading" className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
        Is Your LMS Hiding a <span className="text-brand-red">Multi-Million Dollar</span> Liability?
      </h1>

      <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-light">
        The <strong className="text-white">"One Big Beautiful Bill Act"</strong> demands ROI. 
        The <strong className="text-white">DOJ</strong> demands Accessibility. 
        Calculate your institution's "Content Debt" before it's too late.
      </p>

      <div className="grid md:grid-cols-2 gap-8 text-left mb-12 max-w-4xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
        <article className="flex items-start gap-3">
          <Lock className="text-brand-red mt-1 flex-shrink-0" size={24} aria-hidden="true" />
          <div>
            <h2 className="text-lg font-bold text-white">The Password Exception is Dead</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              On April 24, 2024, the DOJ removed the "password-protected" exception. Every PDF, slide, and syllabus behind your login screen is now a potential violation.
            </p>
          </div>
        </article>
        <article className="flex items-start gap-3">
          <Scale className="text-brand-blue mt-1 flex-shrink-0" size={24} aria-hidden="true" />
          <div>
            <h2 className="text-lg font-bold text-white">OBBBA Austerity Measures</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Capped student borrowing forces you to prove efficiency. You cannot hire your way out of this manual remediation debt.
            </p>
          </div>
        </article>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={onStart}
          className="w-full sm:w-auto px-8 py-4 bg-brand-red hover:bg-red-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-brand-red/30 transition-all transform hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/50"
        >
          Calculate Your Content Debt
        </button>
        <p className="text-slate-400 text-sm mt-2 sm:mt-0">
          Takes less than 2 minutes. No credit card required.
        </p>
      </div>
    </div>
  </section>
);

// ============ FORM COMPONENT ============
const AuditForm: React.FC<{ 
  onSubmit: (data: AuditFormData, file: File) => void; 
  isLoading: boolean;
  onBack: () => void;
}> = ({ onSubmit, isLoading, onBack }) => {
  const [formData, setFormData] = useState<AuditFormData>({
    institutionType: InstitutionType.PUBLIC_UNIVERSITY,
    enrollment: 10000,
    email: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dropZoneRef.current?.classList.add('border-brand-blue', 'bg-brand-blue/10');
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dropZoneRef.current?.classList.remove('border-brand-blue', 'bg-brand-blue/10');
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dropZoneRef.current?.classList.remove('border-brand-blue', 'bg-brand-blue/10');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) onSubmit(formData, file);
  };

  return (
    <section 
      className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-4"
      aria-labelledby="audit-form-heading"
    >
      <div className="w-full max-w-2xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
        >
          <ArrowLeft size={18} aria-hidden="true" /> Back
        </button>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 p-6 text-center border-b border-white/10">
            <h1 id="audit-form-heading" className="text-2xl font-bold text-white uppercase tracking-wider">
              Configure Audit Parameters
            </h1>
            <p className="text-slate-300 text-sm mt-2">Enter your institution details to extrapolate risk.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="institutionType" className="block text-sm font-semibold text-slate-300">
                  Institution Type
                </label>
                <select 
                  id="institutionType"
                  className="w-full p-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                  value={formData.institutionType}
                  onChange={(e) => setFormData({...formData, institutionType: e.target.value as InstitutionType})}
                >
                  {Object.values(InstitutionType).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="enrollment" className="block text-sm font-semibold text-slate-300">
                  Approximate Enrollment
                </label>
                <input 
                  type="number" 
                  id="enrollment"
                  required
                  aria-required="true"
                  min="100"
                  className="w-full p-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                  value={formData.enrollment}
                  onChange={(e) => setFormData({...formData, enrollment: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300">
                Work Email <span className="text-brand-red" aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input 
                type="email" 
                id="email"
                required
                aria-required="true"
                autoComplete="email"
                placeholder="admin@university.edu"
                className="w-full p-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="file-upload" className="text-sm font-semibold text-slate-300">
                  Upload Representative Sample
                </label>
                <div className="group relative">
                  <button 
                    type="button"
                    className="text-slate-500 hover:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-full"
                    aria-label="File format information"
                  >
                    <Info size={14} />
                  </button>
                  <div 
                    role="tooltip"
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg border border-white/10"
                  >
                    <p className="font-bold mb-1">Supported formats:</p>
                    <p>PDF, PPT, DOCX (Legacy/High Risk)</p>
                    <p>HTML (Preferred Standard)</p>
                  </div>
                </div>
              </div>
              
              <div 
                ref={dropZoneRef}
                role="button"
                tabIndex={0}
                aria-label={file ? `Selected file: ${file.name}. Press Enter or Space to change file.` : "Upload file. Drag and drop or press Enter to select. Supported formats: PDF, PPT, DOCX, HTML, images"}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${file ? 'border-green-500 bg-green-500/10' : 'border-white/20 hover:border-brand-blue hover:bg-white/5'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={handleKeyDown}
              >
                <input 
                  type="file" 
                  id="file-upload"
                  ref={fileInputRef} 
                  className="sr-only" 
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.html,.htm,image/*" 
                  onChange={(e) => e.target.files && setFile(e.target.files[0])}
                  aria-describedby="file-help"
                />
                
                {file ? (
                  <div className="flex flex-col items-center text-green-400">
                    <CheckCircle size={48} className="mb-2" aria-hidden="true" />
                    <span className="font-semibold">{file.name}</span>
                    <span className="text-sm text-slate-400">Click or press Enter to change</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <Upload size={48} className="mb-2" aria-hidden="true" />
                    <span className="font-semibold">Click to upload or drag & drop</span>
                    <span id="file-help" className="text-xs mt-1">Syllabus (PDF/HTML/DOC) or Slide Deck</span>
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={!file || isLoading}
              aria-disabled={!file || isLoading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/50
                ${!file || isLoading ? 'bg-slate-700 cursor-not-allowed text-slate-400' : 'bg-brand-blue hover:bg-sky-500 text-white transform hover:-translate-y-1'}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  <span>Processing...</span>
                  <span className="sr-only">Please wait while we analyze your document</span>
                </>
              ) : (
                "Calculate Content Debt"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// ============ ANALYZING SCREEN ============
const AnalyzingScreen: React.FC<{ fileName: string; progress: number }> = ({ fileName, progress }) => {
  const steps = [
    { icon: FileSearch, label: 'Reading document structure...', threshold: 0 },
    { icon: Cpu, label: 'Analyzing accessibility compliance...', threshold: 25 },
    { icon: ShieldCheck, label: 'Checking WCAG 2.1 AA standards...', threshold: 50 },
    { icon: BarChart3, label: 'Calculating financial impact...', threshold: 75 },
  ];

  const currentStepIndex = steps.findIndex((step, idx) => {
    const nextThreshold = steps[idx + 1]?.threshold ?? 100;
    return progress >= step.threshold && progress < nextThreshold;
  });

  return (
    <section 
      className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-4"
      aria-labelledby="analyzing-heading"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="w-full max-w-lg text-center">
        
        {/* Animated Icon */}
        <div className="relative w-32 h-32 mx-auto mb-8" aria-hidden="true">
          <div className="absolute inset-0 border-4 border-brand-blue/20 rounded-full"></div>
          <div 
            className="absolute inset-0 border-4 border-brand-blue rounded-full border-t-transparent animate-spin"
            style={{ animationDuration: '1.5s' }}
          ></div>
          <div className="absolute inset-4 bg-slate-900 rounded-full flex items-center justify-center">
            <FileSearch size={40} className="text-brand-blue" />
          </div>
        </div>

        <h1 id="analyzing-heading" className="text-2xl font-bold text-white mb-2">Analyzing Your Document</h1>
        <p className="text-slate-400 mb-8 text-sm">{fileName}</p>

        {/* Progress Bar */}
        <div 
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Analysis progress: ${Math.round(progress)}%`}
          className="w-full bg-slate-800 rounded-full h-2 mb-8 overflow-hidden"
        >
          <div 
            className="h-full bg-gradient-to-r from-brand-blue to-brand-purple rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Steps */}
        <ol className="space-y-3 text-left" aria-label="Analysis steps">
          {steps.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isComplete = progress > step.threshold + 20;
            const Icon = step.icon;
            
            return (
              <li 
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-brand-blue/10 border border-brand-blue/30' : 
                  isComplete ? 'bg-green-500/10 border border-green-500/20' : 
                  'bg-slate-800/50 border border-transparent opacity-50'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                {isComplete ? (
                  <CheckCircle size={20} className="text-green-500" aria-hidden="true" />
                ) : isActive ? (
                  <Loader2 size={20} className="text-brand-blue animate-spin" aria-hidden="true" />
                ) : (
                  <Icon size={20} className="text-slate-500" aria-hidden="true" />
                )}
                <span className={`text-sm ${isActive ? 'text-white' : isComplete ? 'text-green-400' : 'text-slate-500'}`}>
                  {step.label}
                  {isComplete && <span className="sr-only"> - Complete</span>}
                  {isActive && <span className="sr-only"> - In progress</span>}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

// ============ HELPER FUNCTION ============
const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
// ContentDebtAudit.tsx - Part 3 (Report Component + Main Export)
// Combine with Part 1 and Part 2

// ============ REPORT COMPONENT ============
const AuditReportView: React.FC<{ 
  report: AuditReport; 
  onReset: () => void;
  onNavigate: NavProps['onNavigate'];
}> = ({ report, onReset, onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap for modal
  useEffect(() => {
    if (!isModalOpen || !modalRef.current) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        previousFocusRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'd5ec859f-b3b7-49b9-830b-36b8a09c12ee',
          subject: `Content Debt Audit Request: ${report.formData.institutionType}`,
          from_name: 'Design X Factor - Audit Tool',
          name: contactName,
          email: report.formData.email,
          phone: contactPhone || 'Not provided',
          institution_type: report.formData.institutionType,
          enrollment: report.formData.enrollment.toLocaleString(),
          analyzed_file: report.analysis.fileName,
          compliance_status: report.analysis.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT',
          projected_savings: formatCurrency(report.financials.savings),
          notes: notes || 'No additional notes',
          message: `Content Debt Audit Request from ${contactName} (${report.formData.email})`
        })
      });

      const result = await response.json();

      if (result.success) {
        setEmailSent(true);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert("Submission failed. Please contact us directly at hello@designxfactor.com");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-20 px-4 relative" aria-labelledby="report-heading">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-brand-red mb-2 font-bold uppercase tracking-widest text-sm">
              <AlertTriangle size={16} aria-hidden="true" /> Audit Complete
            </div>
            <h1 id="report-heading" className="text-3xl md:text-4xl font-black text-white">
              Projected Content Debt: <span className="text-brand-red">{formatCurrency(report.financials.manualRemediationCost)}</span>
            </h1>
            <p className="text-slate-300 mt-2">Prepared for: {report.formData.email}</p>
          </div>
          <button 
            onClick={onReset} 
            className="px-6 py-2 border border-white/20 hover:bg-white/10 rounded-lg text-sm text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Run Another Audit
          </button>
        </header>

        {/* Executive Summary */}
        <article className="bg-slate-900/50 backdrop-blur border border-white/10 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            {report.analysis.isCompliant ? (
              <><ShieldCheck className="text-green-500" aria-hidden="true" /> 1. Executive Summary</>
            ) : (
              <><FileWarning className="text-brand-red" aria-hidden="true" /> 1. Executive Summary: Compliance Issues Detected</>
            )}
          </h2>
          
          <div className="text-slate-300 space-y-4">
            <p className="text-lg">
              Based on the sample file <strong className="text-white">{report.analysis.fileName}</strong> and your enrollment of <strong className="text-white">{report.formData.enrollment.toLocaleString()} students</strong>, 
              we estimate a total institutional Content Debt of approximately <strong className="text-white">{report.financials.totalPages.toLocaleString()} pages</strong>.
            </p>

            <div 
              className={`border-l-4 p-4 my-6 rounded-r-lg ${report.analysis.isCompliant ? 'bg-green-500/10 border-green-500' : 'bg-brand-red/10 border-brand-red'}`}
              role="status"
            >
              <p className={`font-semibold ${report.analysis.isCompliant ? 'text-green-400' : 'text-brand-red'}`}>
                Sample Analysis: {report.analysis.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
              </p>
              <p className="text-slate-300 mt-2">{report.analysis.summary}</p>
              
              {report.analysis.issues.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Issues Found:</p>
                  <ul className="space-y-2 list-none">
                    {report.analysis.issues.map((issue, idx) => (
                      <li 
                        key={idx} 
                        className={`flex items-start gap-2 text-sm p-2 rounded ${
                          issue.severity === 'high' ? 'bg-red-500/10 text-red-300' :
                          issue.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-300' :
                          'bg-blue-500/10 text-blue-300'
                        }`}
                      >
                        <XCircle size={16} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span><strong>{issue.issue}:</strong> {issue.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Financial Comparison */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Option A */}
          <article className="bg-slate-900/50 border border-white/10 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-600" aria-hidden="true"></div>
            <h3 className="text-xl font-bold text-white mb-2">Option A: Manual Remediation</h3>
            <p className="text-sm text-slate-400 mb-6 uppercase tracking-wide">"Business as Usual"</p>
            
            <dl className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-800 rounded-full text-slate-400" aria-hidden="true"><Clock size={24} /></div>
                <div>
                  <dt className="text-sm text-slate-400">Estimated Time</dt>
                  <dd className="text-2xl font-bold text-white">{report.financials.manualTimeHours.toLocaleString()} Hours</dd>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-red/20 rounded-full text-brand-red" aria-hidden="true"><DollarSign size={24} /></div>
                <div>
                  <dt className="text-sm text-slate-400">Estimated Cost</dt>
                  <dd className="text-3xl font-bold text-brand-red">{formatCurrency(report.financials.manualRemediationCost)}</dd>
                </div>
              </div>
            </dl>
          </article>

          {/* Option B */}
          <article className="bg-slate-900/50 border-2 border-brand-blue p-8 rounded-2xl relative overflow-hidden transform md:-translate-y-2 shadow-lg shadow-brand-blue/20">
            <div className="absolute top-0 right-0 bg-brand-blue text-space text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
            <h3 className="text-xl font-bold text-white mb-2">Option B: Design X Factor</h3>
            <p className="text-sm text-brand-blue mb-6 uppercase tracking-wide">AI Transformation</p>
            
            <dl className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-blue/20 rounded-full text-brand-blue" aria-hidden="true"><Clock size={24} /></div>
                <div>
                  <dt className="text-sm text-slate-400">Estimated Time</dt>
                  <dd className="text-2xl font-bold text-white">&lt; {report.financials.aiTimeHours} Hours</dd>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-full text-green-500" aria-hidden="true"><CheckCircle2 size={24} /></div>
                <div>
                  <dt className="text-sm text-slate-400">Estimated Cost</dt>
                  <dd className="text-3xl font-bold text-green-500">{formatCurrency(report.financials.aiTransformationCost)}</dd>
                  <dd className="text-xs text-green-400 font-bold">{report.financials.savingsPercentage.toFixed(0)}% Savings</dd>
                </div>
              </div>
            </dl>
          </article>
        </div>

        {/* ROI Section */}
        <article className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="text-brand-gold" aria-hidden="true" /> 2. The ROI Bonus
          </h2>
          <p className="text-slate-300 mb-4">
            Compliance is just the baseline. By using Design X Factor, you convert static files into multimodal learning assets.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h3 className="text-white font-bold mb-2">Retention Lift</h3>
              <p className="text-sm text-slate-300">Multimodal content improves retention by up to <strong className="text-white">65%</strong>.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h3 className="text-white font-bold mb-2">OBBBA Alignment</h3>
              <p className="text-sm text-slate-300">Directly supports the "student outcomes" metrics required by new legislation.</p>
            </div>
          </div>
        </article>

        {/* CTA */}
        <div className="bg-gradient-to-r from-brand-red/20 to-brand-purple/20 border border-brand-red/30 p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-black text-white mb-4">Don't let legacy content become a legal liability.</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Book a consultation to see the full breakdown and our automated solution in action.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-red hover:bg-red-500 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-brand-red/30 transform hover:-translate-y-1 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/50"
          >
            Book Consultation
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => { setIsModalOpen(false); previousFocusRef.current?.focus(); }}
        >
          <div 
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-modal-title"
            className="bg-slate-900 border border-white/20 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {emailSent ? (
              <div className="p-12 text-center">
                <div className="mx-auto w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6" aria-hidden="true">
                  <CheckCircle2 size={32} />
                </div>
                <h2 id="consultation-modal-title" className="text-2xl font-bold text-white mb-2">Request Sent!</h2>
                <p className="text-slate-300 mb-6">We will contact you at <strong className="text-white">{report.formData.email}</strong> shortly.</p>
                <button 
                  onClick={() => { setIsModalOpen(false); previousFocusRef.current?.focus(); }} 
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="bg-slate-800 p-6 flex justify-between items-center">
                  <h2 id="consultation-modal-title" className="text-xl font-bold text-white">Book Consultation</h2>
                  <button 
                    ref={closeButtonRef}
                    onClick={() => { setIsModalOpen(false); previousFocusRef.current?.focus(); }} 
                    className="text-slate-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                    aria-label="Close dialog"
                  >
                    <X size={24} aria-hidden="true" />
                  </button>
                </div>
                
                <form onSubmit={handleSendEmail} className="p-6 space-y-4">
                  <div className="p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-lg text-sm">
                    <p className="font-bold text-brand-blue flex items-center gap-1 mb-2">
                      <Paperclip size={14} aria-hidden="true" /> Audit Summary Included:
                    </p>
                    <ul className="text-slate-300 text-xs space-y-1 list-none">
                      <li>• File: {report.analysis.fileName}</li>
                      <li>• Status: {report.analysis.isCompliant ? 'Compliant' : 'Non-Compliant'}</li>
                      <li>• Projected Debt: {formatCurrency(report.financials.manualRemediationCost)}</li>
                      <li>• Potential Savings: {formatCurrency(report.financials.savings)}</li>
                    </ul>
                  </div>

                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-bold text-slate-300 mb-1">
                      Your Name <span className="text-brand-red" aria-hidden="true">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="contact-name"
                      required 
                      aria-required="true"
                      autoComplete="name"
                      className="w-full p-3 bg-slate-800 border border-white/10 rounded-lg text-white outline-none focus:ring-2 focus:ring-brand-blue" 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)} 
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-bold text-slate-300 mb-1">Email</label>
                    <input 
                      type="email"
                      id="contact-email" 
                      disabled 
                      className="w-full p-3 bg-slate-700 border border-white/10 rounded-lg text-slate-400 outline-none cursor-not-allowed" 
                      value={report.formData.email} 
                    />
                    <p className="text-xs text-slate-500 mt-1">Email from your audit submission</p>
                  </div>
                  
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-bold text-slate-300 mb-1">Phone (Optional)</label>
                    <input 
                      type="tel"
                      id="contact-phone"
                      autoComplete="tel" 
                      className="w-full p-3 bg-slate-800 border border-white/10 rounded-lg text-white outline-none focus:ring-2 focus:ring-brand-blue" 
                      value={contactPhone} 
                      onChange={(e) => setContactPhone(e.target.value)} 
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-notes" className="block text-sm font-bold text-slate-300 mb-1">Notes or Questions</label>
                    <textarea 
                      id="contact-notes"
                      className="w-full p-3 bg-slate-800 border border-white/10 rounded-lg text-white outline-none focus:ring-2 focus:ring-brand-blue h-24 resize-none" 
                      placeholder="Any specific concerns or questions about your content debt..." 
                      value={notes} 
                      onChange={(e) => setNotes(e.target.value)} 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSending} 
                    aria-disabled={isSending}
                    className="w-full py-4 bg-brand-red hover:bg-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/50"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="animate-spin" aria-hidden="true" /> 
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} aria-hidden="true" /> 
                        <span>Send Consultation Request</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

// ============ MAIN COMPONENT EXPORT ============
export const ContentDebtAudit: React.FC<{ onNavigate: NavProps['onNavigate'] }> = ({ onNavigate }) => {
  const [step, setStep] = useState<AuditStep>(AuditStep.LANDING);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [analyzingFileName, setAnalyzingFileName] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleAuditSubmit = async (data: AuditFormData, file: File) => {
    setIsLoading(true);
    setAnalyzingFileName(file.name);
    setAnalyzingProgress(0);
    setStep(AuditStep.ANALYZING);

    // Simulate progress while actually analyzing
    const progressInterval = setInterval(() => {
      setAnalyzingProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 400);

    try {
      const [analysisResult] = await Promise.all([
        analyzeDocument(file),
        new Promise(resolve => setTimeout(resolve, 3000))
      ]);

      clearInterval(progressInterval);
      setAnalyzingProgress(100);

      await new Promise(resolve => setTimeout(resolve, 500));

      const financials = calculateContentDebt(data, analysisResult);
      setReport({ formData: data, analysis: analysisResult, financials, file });
      setStep(AuditStep.REPORT);
    } catch (error) {
      console.error("Audit failed", error);
      alert("There was an error analyzing your document. Please try again.");
      setStep(AuditStep.FORM);
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
    }
  };

  const reset = () => {
    setReport(null);
    setAnalyzingProgress(0);
    setStep(AuditStep.LANDING);
  };

  return (
    <div className="min-h-screen pt-[70px]">
      {step === AuditStep.LANDING && <AuditLanding onStart={() => setStep(AuditStep.FORM)} />}
      {step === AuditStep.FORM && <AuditForm onSubmit={handleAuditSubmit} isLoading={isLoading} onBack={() => setStep(AuditStep.LANDING)} />}
      {step === AuditStep.ANALYZING && <AnalyzingScreen fileName={analyzingFileName} progress={analyzingProgress} />}
      {step === AuditStep.REPORT && report && <AuditReportView report={report} onReset={reset} onNavigate={onNavigate} />}
    </div>
  );
};                      