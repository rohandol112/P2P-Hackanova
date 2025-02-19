from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.core.config import settings
from app.core.database import get_database
from app.api.models.user import UserCreate, UserInDB

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_password_hash(password: str) -> str:
        return pwd_context.hash(password)

    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt

    async def authenticate_user(self, email: str, password: str):
        db = await get_database()
        user = await db.users.find_one({"email": email})
        if not user:
            return False
        if not self.verify_password(password, user["hashed_password"]):
            return False
        return UserInDB(**user)

    async def register_user(self, user: UserCreate):
        db = await get_database()
        existing_user = await db.users.find_one({"email": user.email})
        if existing_user:
            raise ValueError("Email already registered")
        
        user_in_db = UserInDB(
            **user.dict(),
            hashed_password=self.get_password_hash(user.password),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        result = await db.users.insert_one(user_in_db.dict())
        return user_in_db 