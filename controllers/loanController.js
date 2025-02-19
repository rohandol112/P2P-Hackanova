const { PythonShell } = require('python-shell');
const Loan = require('../models/Loan');
const User = require('../models/User');
const { assessRisk, calculateRepaymentSchedule } = require('../utils/loanUtils');

exports.createLoan = async (req, res) => {
  try {
    if (req.user.isLender) throw new Error('Lenders cannot create loans');
    
    // Get ML risk assessment
    const options = {
      scriptPath: './ml',
      args: [JSON.stringify({
        amount: req.body.amount,
        term: req.body.term,
        creditScore: req.user.creditScore
      })]
    };

    const result = await new Promise((resolve, reject) => {
      PythonShell.run('risk_model.py', options, (err, results) => {
        if (err) {
          reject(new Error('Error running ML model'));
        } else {
          resolve(JSON.parse(results[0]));
        }
      });
    });

    const loan = await Loan.create({
      ...req.body,
      borrower: req.user._id,
      interestRate: result.interest_rate,
      riskScore: result.risk_score
    });

    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ status: 'pending' })
      .populate('borrower', 'username creditScore');
    res.json(loans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createLoanRequest = async (req, res) => {
  try {
    const { amount, term } = req.body;
    const borrower = await User.findById(req.user.id);

    // AI Risk Assessment
    const riskScore = await assessRisk({
      creditScore: borrower.creditScore,
      income: borrower.taxDocuments,
      loanAmount: amount,
      term: term,
      transactionHistory: borrower.transactions
    });

    // Calculate interest rate based on risk score
    const interestRate = calculateInterestRate(riskScore);

    // Generate repayment schedule
    const repaymentSchedule = calculateRepaymentSchedule(amount, interestRate, term);

    const loan = await Loan.create({
      borrower: req.user.id,
      amount,
      term,
      interestRate,
      riskScore,
      repaymentSchedule
    });

    res.status(201).json({
      success: true,
      loan
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.approveLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const loan = await Loan.findById(loanId);
    
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    loan.lender = req.user.id;
    loan.status = 'approved';
    await loan.save();

    // Trigger automatic disbursement
    await disburseFunds(loan);

    res.status(200).json({
      success: true,
      loan
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};