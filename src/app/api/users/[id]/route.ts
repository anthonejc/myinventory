import { NextRequest, NextResponse } from "next/server";
import { getUserById, updateUserRole, deleteUser } from "@/lib/users";
import { verifyTokenAndRole } from "@/lib/auth";
import { use } from "react";

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   const auth = await verifyTokenAndRole(req, "ADMIN");
//   if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: 403 });

//   const user = await getUserById(Number(params.id));
//   if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

//   return NextResponse.json(user);
// }

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyTokenAndRole(req, "ADMIN");
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: 403 });

  const { role } = await req.json();
  const upperRole = role.toUpperCase() as "ADMIN" | "USER";
  const updatedUser = await updateUserRole(Number(params.id), upperRole);

  return NextResponse.json(updatedUser);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyTokenAndRole(req, "ADMIN");
  if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: 403 });

  const result = await deleteUser(Number(params.id));
  return NextResponse.json(result);
}
