import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import { readUsers, writeUsers } from "@/lib/db";

async function verifyAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sumway_session")?.value;
    if (!sessionToken) return false;
    
    const payload = await verifyJwt(sessionToken);
    return payload && payload.role === "admin";
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
}

export async function GET(req: Request) {
  try {
    const isAdmin = await verifyAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const users = readUsers();
    // Strip sensitive fields (password hashes) before sending to client
    const vendors = users
      .filter((u) => u.role === "vendor")
      .map(({ passwordHash, passwordSalt, ...rest }) => rest);
    
    return NextResponse.json({ success: true, vendors });
  } catch (error) {
    console.error("Admin Vendors GET error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { email, action } = body;

    if (!email || !action || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ success: false, error: "Invalid action parameters" }, { status: 400 });
    }

    const users = readUsers();
    const userIndex = users.findIndex(
      (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim() && u.role === "vendor"
    );

    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: "Vendor not found" }, { status: 404 });
    }

    // Update status
    users[userIndex].status = action === "approve" ? "approved" : "rejected";

    writeUsers(users);

    return NextResponse.json({ success: true, status: users[userIndex].status });
  } catch (error) {
    console.error("Admin Vendors POST error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

