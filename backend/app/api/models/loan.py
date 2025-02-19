from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class LoanBase(BaseModel):
    amount: float
    term_months: int
    interest_rate: float
    purpose: str

class LoanCreate(LoanBase):
    borrower_id: str

class LoanInDB(LoanBase):
    id: str
    borrower_id: str
    lender_id: Optional[str]
    status: str
    risk_score: float
    created_at: datetime
    repayment_schedule: List[dict]
    current_balance: float 