import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // public routes
  if (path.startsWith("/login") || path.startsWith("/signup") || path.startsWith("/api")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value || req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const payload = verifyJwt(token);
  if (!payload) return NextResponse.redirect(new URL("/login", req.url));

  // Example role-based redirect
  if (path.startsWith("/admin") && payload.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
