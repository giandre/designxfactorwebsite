import { AuditFormData, FileAnalysisResult, FinancialImpact } from "../types";

export const calculateContentDebt = (
  formData: AuditFormData,
  analysis: FileAnalysisResult
): FinancialImpact => {
  
  let estimatedCourses = 0;
  
  if (formData.enrollment < 5000) {
    estimatedCourses = 500;
  } else if (formData.enrollment < 20000) {
    estimatedCourses = 2000;
  } else {
    estimatedCourses = 5000;
  }

  const pagesPerCourse = 50; 
  const totalPages = estimatedCourses * pagesPerCourse;

  const manualCostPerPage = 15.00;
  const aiCostPerPage = 0.20;
  const manualMinutesPerPage = 30;

  const manualRemediationCost = totalPages * manualCostPerPage;
  const aiTransformationCost = totalPages * aiCostPerPage;

  const manualTimeHours = (totalPages * manualMinutesPerPage) / 60;
  const aiTimeHours = 24;

  const potentialFine = 115231;
  const defenseCost = 100000;

  return {
    totalPages,
    estimatedCourses,
    manualRemediationCost,
    manualTimeHours,
    aiTransformationCost,
    aiTimeHours,
    potentialFine,
    defenseCost,
    savings: manualRemediationCost - aiTransformationCost,
    savingsPercentage: ((manualRemediationCost - aiTransformationCost) / manualRemediationCost) * 100
  };
};