// lib/auth.ts
import jwt from "jsonwebtoken"
import { NextRequest } from "next/server";

type JwtPayload = {
  id: number;
  role: "ADMIN" | "USER";
  iat?: number;
  exp?: number;
};

const SECRET = process.env.JWT_SECRET as string;
if (!SECRET) throw new Error("JWT_SECRET not set in env");

export function signJwt(payload: Omit<JwtPayload, "iat" | "exp">, expiresIn = "1h"): string {
  return jwt.sign(payload, SECRET, { expiresIn } as jwt.SignOptions);
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    // console.log('Verifying token:', token);
    // console.log('Using SECRET:', SECRET ? 'SECRET exists' : 'SECRET missing');
    const result = jwt.verify(token, SECRET) as JwtPayload;
    // console.log('JWT verification successful:', result);
    return result;
  } catch (err) {
    // console.log('JWT verification failed:', err);
    return null;
  }
}

export async function verifyTokenAndRole(req: NextRequest, requiredRole: "ADMIN" | "USER") {
  try {
    // console.log('=== TOKEN VERIFICATION DEBUG ===');
    // console.log('Request URL:', req.url);
    // console.log('Required Role:', requiredRole);
    
    // Log all headers to see what's being sent
    // console.log('All Headers:');
    req.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });
    
    // Check both Authorization header and cookies
    const authHeader = req.headers.get("authorization");
    const cookieToken = req.cookies.get("token")?.value;
    
    // console.log('Authorization Header:', authHeader);
    // console.log('Cookie Token:', cookieToken);
    
    const token = authHeader?.replace("Bearer ", "") || cookieToken;
    // console.log('Final Token Used:', token ? `${token.substring(0, 20)}...` : 'None');
    
    if (!token) {
      // console.log('❌ No token found in headers or cookies');
      return { ok: false, message: "No token provided" };
    }

    const decoded = jwt.verify(token, SECRET) as { id: number; role: string };
    // console.log('Decoded Token:', decoded);
    // console.log('Token Role:', decoded.role, 'vs Required:', requiredRole);

    if (decoded.role !== requiredRole) {
      // console.log('❌ Role mismatch');
      return { ok: false, message: "Access denied" };
    }

    // console.log('✅ Token verification successful');
    return { ok: true, user: decoded };
  } catch (error) {
    // console.log('❌ Token verification failed:', error);
    return { ok: false, message: "Invalid token" };
  }
}
