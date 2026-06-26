import { NextResponse } from "next/server";
import { RegisterSchema } from "@/lib/validations";
import { findUserByEmail, createUser } from "@/lib/db";

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

    const data = result.data;

    // Check if user already exists in local database
    const existingUser = findUserByEmail(data.email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: { message: "This email address is already registered." } },
        { status: 400 }
      );
    }

    if (data.role === "admin") {
      // Server-side passkey verification (never exposed to client bundles)
      const expectedPasskey = process.env.ADMIN_PASSKEY || "SUMWAY_ADMIN_2026";
      if (!data.adminPasskey || data.adminPasskey !== expectedPasskey) {
        return NextResponse.json(
          { success: false, error: { message: "Invalid Security Admin Passkey" } },
          { status: 403 }
        );
      }

      // Create active admin
      createUser({
        role: "admin",
        email: data.email,
        name: data.name,
        mobile: data.mobile,
        status: "active",
        password: data.password
      });

      return NextResponse.json({ success: true, role: "admin" });
    } else {
      // Create pending vendor
      createUser({
        role: "vendor",
        email: data.email,
        name: data.name,
        mobile: data.mobile,
        status: "pending",
        password: data.password,
        vendorCategory: data.vendorCategory,
        companyName: data.companyName || "",
        gstCertificate: data.gstCertificate || "",
        msmeCertificate: data.msmeCertificate || "",
        otherDocs: data.otherDocs || "",
        addressProofType: data.addressProofType,
        addressProofFile: data.addressProofFile || "",
        bankName: data.bankName || "",
        bankAccountNumber: data.bankAccountNumber || "",
        bankIfsc: data.bankIfsc || "",
        bankAccountName: data.bankAccountName || ""
      });

      return NextResponse.json({ success: true, role: "vendor" });
    }
  } catch (error) {
    console.error("Auth Register API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
