const { PythonShell } = require('python-shell');
const path = require('path');

exports.assessRisk = async (userData) => {
  const options = {
    mode: 'json',
    pythonPath: 'python3',
    scriptPath: path.join(__dirname, '../ml'),
    args: [JSON.stringify(userData)]
  };

  try {
    const result = await new Promise((resolve, reject) => {
      PythonShell.run('risk_model.py', options, (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
    return result.risk_score;
  } catch (error) {
    throw new Error('Risk assessment failed');
  }
};

exports.calculateRepaymentSchedule = (amount, interestRate, term) => {
  const monthlyRate = interestRate / 12 / 100;
  const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  
  let schedule = [];
  let balance = amount;
  
  for (let month = 1; month <= term; month++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;
    
    schedule.push({
      dueDate: new Date(Date.now() + month * 30 * 24 * 60 * 60 * 1000),
      amount: monthlyPayment,
      status: 'pending'
    });
  }
  
  return schedule;
};

exports.calculateInterestRate = (riskScore) => {
  // Base rate of 5%
  const baseRate = 5;
  // Add up to 15% based on risk score
  const riskPremium = riskScore * 15;
  return baseRate + riskPremium;
}; 