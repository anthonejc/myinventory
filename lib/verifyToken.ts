import jwt from "jsonwebtoken";

interface DecodedToken {
  id: number;
  role: "admin" | "user";
  email: string;
}

export function verifyToken(token: string): DecodedToken {
  return jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
}