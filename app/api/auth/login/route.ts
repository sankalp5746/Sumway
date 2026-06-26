import { NextResponse } from "next/server";
import { LoginSchema } from "@/lib/validations";
import { signJwt } from "@/lib/jwt";
import { findUserByEmail, hashPassword } from "@/lib/db";

// Simple IP Rate Limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

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

    const dbUser = findUserByEmail(email);

    if (role === "admin") {
      // Verify admin credentials from database
      if (!dbUser || dbUser.role !== "admin") {
        return NextResponse.json(
          { success: false, error: "Invalid administrator email or password" },
          { status: 401 }
        );
      }

      const hash = hashPassword(password, dbUser.passwordSalt);
      if (hash !== dbUser.passwordHash) {
        return NextResponse.json(
          { success: false, error: "Invalid administrator email or password" },
          { status: 401 }
        );
      }
    } else if (role === "vendor") {
      // Check database registered vendors
      if (!dbUser || dbUser.role !== "vendor") {
        return NextResponse.json(
          { success: false, error: "Invalid email or password" },
          { status: 401 }
        );
      }

      // Check registration approval status
      if (dbUser.status === "pending") {
        return NextResponse.json(
          { success: false, error: "Your registration request is pending approval by the administrator." },
          { status: 403 }
        );
      }

      if (dbUser.status === "rejected") {
        return NextResponse.json(
          { success: false, error: "Your registration request has been rejected." },
          { status: 403 }
        );
      }

      // Verify vendor password
      const hash = hashPassword(password, dbUser.passwordSalt);
      if (hash !== dbUser.passwordHash) {
        return NextResponse.json(
          { success: false, error: "Invalid email or password" },
          { status: 401 }
        );
      }
    }

    // Generate session JWT
    const name = dbUser ? dbUser.name : email.split("@")[0].toUpperCase();
    const payload = {
      email,
      role,
      name,
      companyName: dbUser?.companyName || dbUser?.bankAccountName || "",
      businessType: dbUser?.vendorCategory === "b2b" ? "B2B Vendor" : dbUser?.vendorCategory === "b2c" ? "B2C Vendor" : undefined
    };
    
    const token = await signJwt(payload);
    
    // Clear rate limit on successful login
    rateLimitMap.delete(ip);

    const response = NextResponse.json({ 
      success: true, 
      user: {
        name,
        email,
        role,
        companyName: payload.companyName,
        businessType: payload.businessType
      } 
    });
    
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
