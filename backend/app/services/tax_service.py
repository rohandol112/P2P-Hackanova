from datetime import datetime
from app.core.database import get_database
from typing import List, Dict

class TaxService:
    async def analyze_tax_documents(self, user_id: str) -> Dict:
        db = await get_database()
        user = await db.users.find_one({"_id": user_id})
        
        tax_documents = user.get("tax_documents", [])
        return {
            "annual_income": self._calculate_annual_income(tax_documents),
            "tax_bracket": self._determine_tax_bracket(tax_documents),
            "deductions": self._calculate_deductions(tax_documents),
            "tax_savings": self._calculate_tax_savings(tax_documents)
        }

    def _calculate_annual_income(self, tax_documents: List[Dict]) -> float:
        if not tax_documents:
            return 0.0
        latest_doc = max(tax_documents, key=lambda x: x["year"])
        return latest_doc.get("income", 0.0)

    def _determine_tax_bracket(self, tax_documents: List[Dict]) -> str:
        annual_income = self._calculate_annual_income(tax_documents)
        if annual_income <= 40000:
            return "15%"
        elif annual_income <= 85000:
            return "25%"
        elif annual_income <= 163000:
            return "34%"
        return "39%"

    def _calculate_deductions(self, tax_documents: List[Dict]) -> Dict:
        # Implement deduction calculation logic
        return {
            "standard_deduction": 12550,
            "itemized_deductions": self._calculate_itemized_deductions(tax_documents)
        }

    def _calculate_tax_savings(self, tax_documents: List[Dict]) -> Dict:
        # Implement tax savings calculation logic
        return {
            "potential_savings": 0.0,
            "recommended_actions": []
        } 