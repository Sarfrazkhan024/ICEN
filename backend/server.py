"""ICEN — International Council for Emerging Nations
FastAPI backend: membership applications, admin auth, admin dashboard API, email notifications.
"""
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import logging
import asyncio
import uuid
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Literal

import bcrypt
import jwt
import resend
from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr

# ---------- Config ----------
MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGORITHM = "HS256"
JWT_EXP_HOURS = 24

ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@icen.org")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "ICEN@Admin2026")

RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
ADMIN_NOTIFY_EMAIL = os.environ.get("ADMIN_NOTIFY_EMAIL")
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# ---------- Logging ----------
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("icen")

# ---------- DB ----------
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# ---------- App ----------
app = FastAPI(title="ICEN API", version="1.0.0")
api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)

# ---------- Utils ----------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXP_HOURS),
        "iat": datetime.now(timezone.utc),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_admin(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> dict:
    if not credentials or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = await db.users.find_one({"id": payload.get("sub")}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    return user


# ---------- Models ----------
MembershipTier = Literal["observer", "fellow", "council", "founding"]
AppStatus = Literal["pending", "reviewing", "approved", "rejected"]


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


class ApplicationCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    country: str = Field(..., min_length=2, max_length=80)
    organization: Optional[str] = Field(None, max_length=160)
    role_title: Optional[str] = Field(None, max_length=120)
    membership_tier: MembershipTier = "fellow"
    focus_pillars: List[str] = Field(default_factory=list)
    motivation: str = Field(..., min_length=30, max_length=2000)
    linkedin: Optional[str] = Field(None, max_length=300)


class Application(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    full_name: str
    email: str
    country: str
    organization: Optional[str] = None
    role_title: Optional[str] = None
    membership_tier: str
    focus_pillars: List[str] = []
    motivation: str
    linkedin: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: datetime


class StatusUpdate(BaseModel):
    status: AppStatus


# ---------- Email ----------
def _send_resend_email_sync(to_email: str, subject: str, html: str) -> Optional[str]:
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY missing — skipping email to %s", to_email)
        return None
    try:
        res = resend.Emails.send({
            "from": f"ICEN <{SENDER_EMAIL}>",
            "to": [to_email],
            "subject": subject,
            "html": html,
        })
        return res.get("id") if isinstance(res, dict) else None
    except Exception as e:
        logger.error("Resend email failed to %s: %s", to_email, e)
        return None


async def send_email_async(to_email: str, subject: str, html: str) -> Optional[str]:
    return await asyncio.to_thread(_send_resend_email_sync, to_email, subject, html)


def build_applicant_email(app_doc: dict) -> str:
    return f"""
    <div style="font-family:-apple-system,Helvetica,Arial,sans-serif;background:#020617;padding:40px 0;color:#e2e8f0">
      <table width="600" align="center" cellpadding="0" cellspacing="0" style="margin:0 auto;background:#0F172A;border:1px solid rgba(255,255,255,0.08);border-radius:6px;overflow:hidden">
        <tr><td style="padding:32px 40px;border-bottom:1px solid rgba(255,255,255,0.08)">
          <div style="font-family:Georgia,'Playfair Display',serif;font-size:22px;letter-spacing:2px;color:#ffffff">ICEN</div>
          <div style="font-size:11px;letter-spacing:3px;color:#0057FF;margin-top:4px;text-transform:uppercase">International Council for Emerging Nations</div>
        </td></tr>
        <tr><td style="padding:36px 40px">
          <h1 style="font-family:Georgia,serif;font-size:26px;color:#ffffff;margin:0 0 16px">Application Received</h1>
          <p style="font-size:15px;line-height:1.7;color:#94A3B8;margin:0 0 16px">
            Dear {app_doc['full_name']},
          </p>
          <p style="font-size:15px;line-height:1.7;color:#94A3B8;margin:0 0 16px">
            Thank you for applying to the International Council for Emerging Nations. Your application for the
            <strong style="color:#ffffff">{app_doc['membership_tier'].title()}</strong> track has been received and is under review by our Secretariat.
          </p>
          <p style="font-size:15px;line-height:1.7;color:#94A3B8;margin:0 0 24px">
            You will hear from us within 7–10 business days.
          </p>
          <div style="border-left:2px solid #0057FF;padding:8px 16px;margin:24px 0;color:#cbd5e1;font-style:italic">
            "The world does not wait. Neither should you."
          </div>
          <p style="font-size:13px;color:#64748B;margin:24px 0 0">Reference ID: {app_doc['id']}</p>
        </td></tr>
        <tr><td style="padding:20px 40px;background:#020617;font-size:12px;color:#64748B">
          ICEN Secretariat — A Global Council Where Emerging Nations Shape the Future Together.
        </td></tr>
      </table>
    </div>
    """


def build_admin_email(app_doc: dict) -> str:
    pillars = ", ".join(app_doc.get("focus_pillars", [])) or "—"
    return f"""
    <div style="font-family:-apple-system,Helvetica,Arial,sans-serif;background:#0F172A;padding:24px;color:#e2e8f0">
      <h2 style="font-family:Georgia,serif;color:#ffffff;margin:0 0 12px">New ICEN Membership Application</h2>
      <table cellpadding="6" style="font-size:14px;color:#cbd5e1;border-collapse:collapse">
        <tr><td style="color:#64748B">Name</td><td>{app_doc['full_name']}</td></tr>
        <tr><td style="color:#64748B">Email</td><td>{app_doc['email']}</td></tr>
        <tr><td style="color:#64748B">Country</td><td>{app_doc['country']}</td></tr>
        <tr><td style="color:#64748B">Organization</td><td>{app_doc.get('organization') or '—'}</td></tr>
        <tr><td style="color:#64748B">Role</td><td>{app_doc.get('role_title') or '—'}</td></tr>
        <tr><td style="color:#64748B">Tier</td><td>{app_doc['membership_tier']}</td></tr>
        <tr><td style="color:#64748B">Pillars</td><td>{pillars}</td></tr>
        <tr><td style="color:#64748B">LinkedIn</td><td>{app_doc.get('linkedin') or '—'}</td></tr>
      </table>
      <p style="margin-top:16px;color:#94A3B8;font-size:14px"><strong>Motivation:</strong><br>{app_doc['motivation']}</p>
      <p style="margin-top:20px;font-size:12px;color:#64748B">Reference ID: {app_doc['id']}</p>
    </div>
    """


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"service": "ICEN API", "status": "ok"}


@api_router.get("/stats")
async def public_stats():
    total = await db.applications.count_documents({})
    return {
        "nations": 50,
        "pillars": 12,
        "regions": 8,
        "members": 10000 + total,
    }


# ---- Applications ----
@api_router.post("/applications", response_model=Application)
async def create_application(payload: ApplicationCreate):
    now = datetime.now(timezone.utc)
    doc = {
        "id": str(uuid.uuid4()),
        **payload.model_dump(),
        "status": "pending",
        "created_at": now.isoformat(),
        "updated_at": now.isoformat(),
    }
    await db.applications.insert_one(doc.copy())

    # Fire-and-forget email (best effort, doesn't block response)
    async def _notify():
        try:
            await send_email_async(doc["email"], "ICEN — Application Received", build_applicant_email(doc))
            if ADMIN_NOTIFY_EMAIL:
                await send_email_async(
                    ADMIN_NOTIFY_EMAIL,
                    f"New ICEN Application — {doc['full_name']} ({doc['country']})",
                    build_admin_email(doc),
                )
        except Exception as e:
            logger.error("Email notification failed: %s", e)

    asyncio.create_task(_notify())

    return Application(
        id=doc["id"],
        full_name=doc["full_name"],
        email=doc["email"],
        country=doc["country"],
        organization=doc.get("organization"),
        role_title=doc.get("role_title"),
        membership_tier=doc["membership_tier"],
        focus_pillars=doc["focus_pillars"],
        motivation=doc["motivation"],
        linkedin=doc.get("linkedin"),
        status=doc["status"],
        created_at=now,
        updated_at=now,
    )


# ---- Auth ----
@api_router.post("/auth/login", response_model=LoginResponse)
async def login(payload: LoginRequest):
    email = payload.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user["id"], user["email"], user.get("role", "admin"))
    safe_user = {"id": user["id"], "email": user["email"], "name": user.get("name"), "role": user.get("role")}
    return LoginResponse(access_token=token, user=safe_user)


@api_router.get("/auth/me")
async def me(current: dict = Depends(get_current_admin)):
    return current


# ---- Admin ----
@api_router.get("/admin/applications")
async def list_applications(current: dict = Depends(get_current_admin), status_filter: Optional[str] = None):
    query = {}
    if status_filter and status_filter in ("pending", "reviewing", "approved", "rejected"):
        query["status"] = status_filter
    cursor = db.applications.find(query, {"_id": 0}).sort("created_at", -1)
    items = await cursor.to_list(length=500)
    return {"items": items, "count": len(items)}


@api_router.patch("/admin/applications/{app_id}/status")
async def update_status(app_id: str, payload: StatusUpdate, current: dict = Depends(get_current_admin)):
    now = datetime.now(timezone.utc).isoformat()
    result = await db.applications.find_one_and_update(
        {"id": app_id},
        {"$set": {"status": payload.status, "updated_at": now}},
        projection={"_id": 0},
        return_document=True,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Application not found")
    return result


@api_router.get("/admin/stats")
async def admin_stats(current: dict = Depends(get_current_admin)):
    pipeline = [{"$group": {"_id": "$status", "count": {"$sum": 1}}}]
    agg = await db.applications.aggregate(pipeline).to_list(length=20)
    by_status = {row["_id"]: row["count"] for row in agg}
    total = await db.applications.count_documents({})
    return {
        "total": total,
        "pending": by_status.get("pending", 0),
        "reviewing": by_status.get("reviewing", 0),
        "approved": by_status.get("approved", 0),
        "rejected": by_status.get("rejected", 0),
    }


# ---------- Startup ----------
@app.on_event("startup")
async def on_startup():
    await db.users.create_index("email", unique=True)
    await db.applications.create_index("email")
    await db.applications.create_index("created_at")

    existing = await db.users.find_one({"email": ADMIN_EMAIL.lower()})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": ADMIN_EMAIL.lower(),
            "password_hash": hash_password(ADMIN_PASSWORD),
            "name": "ICEN Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Seeded admin: %s", ADMIN_EMAIL)
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        await db.users.update_one(
            {"email": ADMIN_EMAIL.lower()},
            {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}},
        )
        logger.info("Admin password re-synced.")


@app.on_event("shutdown")
async def on_shutdown():
    client.close()


# ---------- CORS + include ----------
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
