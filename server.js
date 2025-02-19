require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authController = require('./controllers/authController');
const loanController = require('./controllers/loanController');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Authentication middleware
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/loans', auth, loanController.createLoan);
app.get('/loans', auth, loanController.getLoans);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));