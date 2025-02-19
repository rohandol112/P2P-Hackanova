const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  term: { type: Number, required: true }, // in months
  status: {
    type: String,
    enum: ['pending', 'approved', 'active', 'completed', 'defaulted'],
    default: 'pending'
  },
  riskScore: { type: Number, required: true },
  repaymentSchedule: [{
    dueDate: Date,
    amount: Number,
    status: { type: String, enum: ['pending', 'paid', 'late'] }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', loanSchema);