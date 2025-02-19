exports.analyzeIncome = async (taxDocuments) => {
  const sortedDocs = taxDocuments.sort((a, b) => b.year - a.year);
  const latestIncome = sortedDocs[0]?.income || 0;
  
  const incomeAnalysis = {
    currentIncome: latestIncome,
    averageIncome: calculateAverageIncome(taxDocuments),
    incomeGrowth: calculateIncomeGrowth(taxDocuments),
    taxBracket: determineTaxBracket(latestIncome)
  };
  
  return incomeAnalysis;
};

exports.calculateTaxBenefits = (taxAnalysis) => {
  const benefits = {
    deductions: calculateDeductions(taxAnalysis),
    credits: calculateCredits(taxAnalysis),
    potentialSavings: calculatePotentialSavings(taxAnalysis)
  };
  
  return benefits;
};

const calculateAverageIncome = (documents) => {
  if (!documents.length) return 0;
  const sum = documents.reduce((acc, doc) => acc + doc.income, 0);
  return sum / documents.length;
};

const calculateIncomeGrowth = (documents) => {
  if (documents.length < 2) return 0;
  const sorted = documents.sort((a, b) => b.year - a.year);
  const latest = sorted[0].income;
  const previous = sorted[1].income;
  return ((latest - previous) / previous) * 100;
};

const determineTaxBracket = (income) => {
  // Simplified tax bracket determination
  if (income <= 40000) return "15%";
  if (income <= 85000) return "25%";
  if (income <= 163000) return "34%";
  return "39%";
}; 