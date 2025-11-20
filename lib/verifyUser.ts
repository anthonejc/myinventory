import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { api } from "./api";

interface DecodedToken {
  id: number;
  role: "admin" | "user";
  email: string;
}

export async function verifyUser() {
  const token = localStorage.get("token")?.value;
  if (!token) {
    return { authenticated: false, user: null };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return { authenticated: true, user: decoded };
  } catch (error) {
    console.error("Invalid token:", error);
    return { authenticated: false, user: null };
  }
}

