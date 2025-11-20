import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyJwt } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const payload = token ? verifyJwt(token) : null;
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = await query(`
    SELECT c.id, c.quantity, p.id as product_id, p.name, p.price, p.description, p.stock
    FROM cart c 
    JOIN products p ON c.product_id = p.id 
    WHERE c.user_id = $1
  `, [payload.id]);
  
  return NextResponse.json(res.rows);
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const payload = token ? verifyJwt(token) : null;
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { product_id, quantity = 1 } = await req.json();
  
  const existing = await query(
    "SELECT id, quantity FROM cart WHERE user_id = $1 AND product_id = $2",
    [payload.id, product_id]
  );

  if (existing.rows.length > 0) {
    const res = await query(
      "UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *",
      [quantity, payload.id, product_id]
    );
    return NextResponse.json(res.rows[0]);
  } else {
    const res = await query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [payload.id, product_id, quantity]
    );
    return NextResponse.json(res.rows[0]);
  }
}

export async function PUT(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const payload = token ? verifyJwt(token) : null;
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { cart_id, quantity } = await req.json();
  
  if (quantity <= 0) {
    await query("DELETE FROM cart WHERE id = $1 AND user_id = $2", [cart_id, payload.id]);
    return NextResponse.json({ message: "Item removed" });
  }

  const res = await query(
    "UPDATE cart SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
    [quantity, cart_id, payload.id]
  );
  return NextResponse.json(res.rows[0]);
}

export async function DELETE(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const payload = token ? verifyJwt(token) : null;
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const cart_id = searchParams.get("id");
  
  if (!cart_id) {
    await query("DELETE FROM cart WHERE user_id = $1", [payload.id]);
    return NextResponse.json({ message: "Cart cleared" });
  }

  await query("DELETE FROM cart WHERE id = $1 AND user_id = $2", [cart_id, payload.id]);
  return NextResponse.json({ message: "Item removed" });
}