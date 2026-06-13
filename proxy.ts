import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect the admin routes
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("sumway_session");
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    const payload = await verifyJwt(sessionCookie.value);
    
    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Matching paths
export const config = {
  matcher: ["/admin/:path*"]
};
