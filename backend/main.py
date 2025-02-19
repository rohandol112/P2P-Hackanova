from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import auth, loans, tax, users

app = FastAPI(title="P2P Lending Platform")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(loans.router, prefix="/api/loans", tags=["loans"])
app.include_router(tax.router, prefix="/api/tax", tags=["tax"])
app.include_router(users.router, prefix="/api/users", tags=["users"]) 