import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib

class RiskAssessmentModel:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.load_model()

    def load_model(self):
        try:
            self.model = joblib.load('ml/models/risk_model.joblib')
        except:
            self.model = RandomForestClassifier(n_estimators=100)
            print("New model initialized")

    def predict_risk(self, features):
        scaled_features = self.scaler.transform([features])
        risk_score = self.model.predict_proba(scaled_features)[0][1]
        return {
            'risk_score': float(risk_score),
            'risk_level': self.get_risk_level(risk_score)
        }

    @staticmethod
    def get_risk_level(score):
        if score < 0.3:
            return "LOW"
        elif score < 0.7:
            return "MEDIUM"
        return "HIGH" 