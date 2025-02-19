from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    username: str
    role: str
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: str
    hashed_password: str
    created_at: datetime
    updated_at: datetime
    credit_score: Optional[float] = None
    tax_documents: List[dict] = []
    bank_accounts: List[dict] = []

class User(UserBase):
    id: str
    created_at: datetime 