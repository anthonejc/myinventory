import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { verifyJwt } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = verifyJwt(token);
    if (!decoded || decoded.role !== "ADMIN")
      return NextResponse.json({ error: "Access denied" }, { status: 403 });

    const totalProductsRes = await pool.query("SELECT COUNT(*) FROM products");
    const totalOrdersRes = await pool.query("SELECT COUNT(*) FROM orders");
    const totalRevenueRes = await pool.query(
      "SELECT COALESCE(SUM(total_price), 0) FROM orders WHERE status = 'Completed'"
    );
    const lowStockRes = await pool.query(
      "SELECT * FROM products WHERE stock < 10 ORDER BY stock ASC"
    );

    const summary = {
      totalProducts: parseInt(totalProductsRes.rows[0].count, 10),
      totalOrders: parseInt(totalOrdersRes.rows[0].count, 10),
      totalRevenue: parseFloat(totalRevenueRes.rows[0].coalesce || 0),
      lowStock: lowStockRes.rows,
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
