const User = require('../models/User');
const { analyzeIncome, calculateTaxBenefits } = require('../utils/taxUtils');

exports.uploadTaxDocuments = async (req, res) => {
  try {
    const { year, income, documentUrl } = req.body;
    const user = await User.findById(req.user.id);
    
    user.taxDocuments.push({ year, income, documentUrl });
    await user.save();

    const taxAnalysis = await analyzeIncome(user.taxDocuments);
    const taxBenefits = calculateTaxBenefits(taxAnalysis);

    res.status(200).json({
      success: true,
      taxAnalysis,
      taxBenefits
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.generateTaxReport = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const taxReport = await generateDetailedTaxReport(user);
    
    res.status(200).json({
      success: true,
      taxReport
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 