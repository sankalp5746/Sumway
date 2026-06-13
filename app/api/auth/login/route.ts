import { NextResponse } from "next/server";
import { LoginSchema } from "@/lib/validations";
import crypto from "crypto";
import { signJwt } from "@/lib/jwt";

// Simple IP Rate Limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

const ADMIN_EMAIL = "admin@sumway.com";
const ADMIN_PASSWORD_SALT = "sumway_secure_salt_2026_ab12";
const ADMIN_PASSWORD_HASH = "c9537b4649414be4d4e6fcfefb0e12561ff6a384d83bee9f6b2c830f162ee2fe7a270257f1472574b3dfdca8ea23827abb06d1a56755ab251340667153072944";

function verifyAdminPassword(password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, ADMIN_PASSWORD_SALT, 100000, 64, "sha512").toString("hex");
  const hashBuf = Buffer.from(hash);
  const expectedHashBuf = Buffer.from(ADMIN_PASSWORD_HASH);
  
  if (hashBuf.length !== expectedHashBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(hashBuf, expectedHashBuf);
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "unknown";
    
    // Check Rate Limiting
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (record) {
      if (now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
      } else if (record.count >= MAX_ATTEMPTS) {
        const minutesLeft = Math.ceil((record.resetTime - now) / 60000);
        return NextResponse.json(
          { success: false, error: `Too many login attempts. Please try again in ${minutesLeft} minute(s).` },
          { status: 429 }
        );
      } else {
        record.count++;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    }

    const body = await req.json();

    // Validate login schemas
    const result = LoginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten() },
        { status: 400 }
      );
    }

    const { role, email, password } = result.data;

    // Enforce fixed admin credentials
    if (role === "admin") {
      const isEmailValid = email === ADMIN_EMAIL;
      const isPasswordValid = verifyAdminPassword(password);
      
      if (!isEmailValid || !isPasswordValid) {
        return NextResponse.json(
          { success: false, error: "Invalid administrator email or password" },
          { status: 401 }
        );
      }
    }

    // Generate session JWT
    const payload = {
      email,
      role,
      name: email.split("@")[0].toUpperCase()
    };
    
    const token = await signJwt(payload);
    
    // Clear rate limit on successful login
    rateLimitMap.delete(ip);

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: "sumway_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600 * 2, // 2 hours
      path: "/"
    });
    
    return response;
  } catch (error) {
    console.error("Auth Login API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
