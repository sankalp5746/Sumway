import { NextResponse } from "next/server";
import { RegisterSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate registration schemas
    const result = RegisterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten() },
        { status: 400 }
      );
    }

    // Mock registration (allows easy client demonstrations)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Auth Register API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
