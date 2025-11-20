import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { verifyJwt } from "@/lib/auth";
// import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = verifyJwt(token);
    if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 403 });

    // Fetch orders with product info
    const result = await pool.query(
      `
      SELECT 
        o.id AS order_id,
        p.name AS product_name,
        oi.quantity,
        oi.price AS total_price,
        o.status,
        o.created_at
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
      `,
      [decoded.id]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching order history:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
