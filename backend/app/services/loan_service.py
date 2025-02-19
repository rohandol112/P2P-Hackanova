from app.core.database import get_database
from app.api.models.loan import LoanCreate, LoanInDB
from app.ml.models.risk_assessment import RiskAssessmentModel
from datetime import datetime

class LoanService:
    def __init__(self):
        self.risk_model = RiskAssessmentModel()

    async def create_loan(self, loan: LoanCreate):
        db = await get_database()
        
        # Assess risk
        risk_assessment = self.risk_model.predict_risk([
            loan.amount,
            loan.term_months,
            # Add other relevant features
        ])

        loan_data = LoanInDB(
            **loan.dict(),
            risk_score=risk_assessment['risk_score'],
            status="PENDING",
            created_at=datetime.utcnow(),
            repayment_schedule=self.generate_repayment_schedule(loan),
            current_balance=loan.amount
        )

        result = await db.loans.insert_one(loan_data.dict())
        return await self.get_loan_by_id(result.inserted_id)

    def generate_repayment_schedule(self, loan: LoanCreate):
        # Implementation of repayment schedule calculation
        pass 