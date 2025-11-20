import { NextRequest, NextResponse } from "next/server";
import { getAllUsers } from "@/lib/users";
import { verifyTokenAndRole } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const auth = await verifyTokenAndRole(req, "ADMIN");
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: 403 });

  const users = await getAllUsers();
  // console.log("users in /api/users:",users);
  return NextResponse.json(users);
}
