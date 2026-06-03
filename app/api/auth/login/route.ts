import { NextResponse } from "next/server";
import { LoginSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
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
      if (email !== "admin@sumway.com" || password !== "sumwayadmin123") {
        return NextResponse.json(
          { success: false, error: "Invalid administrator email or password" },
          { status: 401 }
        );
      }
    }

    // Mock verification for other roles (allows any valid login for easy demonstration)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Auth Login API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
