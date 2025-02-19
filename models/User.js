const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['borrower', 'lender'], required: true },
  bankAccounts: [{
    accountNumber: String,
    bankName: String,
    verified: Boolean
  }],
  taxDocuments: [{
    year: Number,
    income: Number,
    documentUrl: String
  }],
  creditScore: { type: Number, default: 0 },
  transactions: [{
    type: { type: String, enum: ['loan', 'repayment', 'income'] },
    amount: Number,
    date: Date,
    description: String
  }]
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);