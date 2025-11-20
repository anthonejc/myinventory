import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyJwt } from "@/lib/auth";

export async function GET() {
  const res = await query("SELECT id, name, description, price, stock, category FROM products ORDER BY id DESC");
  return NextResponse.json(res.rows);
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const payload = token ? verifyJwt(token) : null;
  if (!payload || payload.role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { name, description, price, stock, category } = await req.json();
  const res = await query(
    `INSERT INTO products (name, description, price, stock, category) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [name, description ?? "", price, stock ?? 0, category ?? ""]
  );
  return NextResponse.json(res.rows[0]);
}

export async function PUT(req: NextRequest) {
  console.log('PUT method called!');
  const token = req.headers.get("authorization")?.split(" ")[1];
  console.log('PUT request - Token:', token);
  const payload = token ? verifyJwt(token) : null;
  console.log('PUT request - Payload:', payload);
  if (!payload || payload.role !== "ADMIN") {
    console.log('PUT request - Auth failed. Payload:', payload, 'Role:', payload?.role);
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { name, description, price, quantity, category } = await req.json();
  const res = await query(
    `UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category = $5 WHERE id = $6 RETURNING *`,
    [name, description ?? "", price, quantity ?? 0, category, id]
  );
  return NextResponse.json(res.rows[0]);
}

export async function DELETE(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const payload = token ? verifyJwt(token) : null;
  if (!payload || payload.role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await query("DELETE FROM products WHERE id = $1", [id]);
  return NextResponse.json({ message: "Deleted" });
}
