const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const loanController = require('../controllers/loanController');
const taxController = require('../controllers/taxController');
const analysisController = require('../controllers/analysisController');

// Loan routes
router.post('/loans/request', auth, loanController.createLoanRequest);
router.put('/loans/:loanId/approve', auth, loanController.approveLoan);

// Tax routes
router.post('/tax/upload', auth, taxController.uploadTaxDocuments);
router.get('/tax/report', auth, taxController.generateTaxReport);

// Analysis routes
router.get('/analysis/spending', auth, analysisController.getSpendingAnalysis);

module.exports = router; 