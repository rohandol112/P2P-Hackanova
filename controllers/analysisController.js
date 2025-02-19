const User = require('../models/User');
const { analyzeSpending, generateAlerts } = require('../utils/analysisUtils');

exports.getSpendingAnalysis = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('transactions');

    const analysis = await analyzeSpending(user.transactions);
    const alerts = await generateAlerts(analysis);
    
    res.status(200).json({
      success: true,
      analysis,
      alerts,
      recommendations: generateRecommendations(analysis)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 