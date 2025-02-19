from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.services.loan_service import LoanService
from app.api.models.loan import LoanCreate, LoanInDB
from app.core.security import get_current_user

router = APIRouter()
loan_service = LoanService()

@router.post("/", response_model=LoanInDB)
async def create_loan(
    loan: LoanCreate,
    current_user = Depends(get_current_user)
):
    loan.borrower_id = current_user.id
    return await loan_service.create_loan(loan)

@router.get("/", response_model=List[LoanInDB])
async def get_loans(current_user = Depends(get_current_user)):
    return await loan_service.get_user_loans(current_user.id)

@router.get("/{loan_id}", response_model=LoanInDB)
async def get_loan(
    loan_id: str,
    current_user = Depends(get_current_user)
):
    loan = await loan_service.get_loan_by_id(loan_id)
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    return loan

@router.post("/{loan_id}/invest")
async def invest_in_loan(
    loan_id: str,
    amount: float,
    current_user = Depends(get_current_user)
):
    return await loan_service.invest_in_loan(loan_id, current_user.id, amount) 