import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib

class LoanRiskModel:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100)
        self.scaler = StandardScaler()
        
    def preprocess_data(self, data):
        features = [
            'credit_score', 'income', 'loan_amount', 'loan_term',
            'debt_to_income', 'payment_history_score'
        ]
        return self.scaler.transform(data[features])
        
    def predict_risk(self, user_data):
        processed_data = self.preprocess_data(user_data)
        risk_score = self.model.predict_proba(processed_data)[0][1]
        return {
            'risk_score': float(risk_score),
            'risk_category': self.categorize_risk(risk_score)
        }
    
    def categorize_risk(self, risk_score):
        if risk_score < 0.2:
            return 'LOW'
        elif risk_score < 0.5:
            return 'MEDIUM'
        else:
            return 'HIGH'

# API endpoint for risk assessment
def assess_loan_risk(user_data):
    model = LoanRiskModel()
    return model.predict_risk(user_data)

if __name__ == "__main__":
    import sys
    import json
    
    input_data = json.loads(sys.argv[1])
    result = assess_loan_risk(input_data)
    print(json.dumps(result))