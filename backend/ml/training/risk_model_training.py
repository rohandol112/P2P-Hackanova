import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib

def train_risk_model():
    # Load and prepare data
    data = pd.read_csv('ml/data/loan_data.csv')
    
    # Feature engineering
    features = [
        'loan_amount', 'term_months', 'credit_score',
        'annual_income', 'debt_to_income', 'employment_length'
    ]
    
    X = data[features]
    y = data['default']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42
    )
    model.fit(X_train_scaled, y_train)
    
    # Save model and scaler
    joblib.dump(model, 'ml/models/risk_model.joblib')
    joblib.dump(scaler, 'ml/models/scaler.joblib')
    
    # Evaluate model
    train_score = model.score(X_train_scaled, y_train)
    test_score = model.score(X_test_scaled, y_test)
    
    print(f"Training accuracy: {train_score:.4f}")
    print(f"Testing accuracy: {test_score:.4f}")

if __name__ == "__main__":
    train_risk_model() 