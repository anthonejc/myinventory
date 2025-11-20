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

    // Debug: Check if orders exist
    const debugRes = await pool.query("SELECT id, status, created_at FROM orders LIMIT 5");
    console.log('Sample orders:', debugRes.rows);

    // 1. Order summary
    const totalRes = await pool.query("SELECT COUNT(*) FROM orders");
    const pendingRes = await pool.query(
      "SELECT COUNT(*) FROM orders WHERE status = 'Pending'"
    );
    const completedRes = await pool.query(
      "SELECT COUNT(*) FROM orders WHERE status = 'Completed'"
    );

    // 2. Low stock
    const lowStockRes = await pool.query(
      "SELECT id, name, stock FROM products WHERE stock < 10 ORDER BY stock ASC"
    );

    // 3. Fast/slow moving (based on order count per product)
    const movementRes = await pool.query(`
      SELECT 
        p.id,
        p.name,
        COUNT(oi.id) AS order_count
      FROM products p
      LEFT JOIN order_items oi ON p.id = oi.product_id
      GROUP BY p.id, p.name
      ORDER BY order_count DESC
    `);

    const fastMoving = movementRes.rows.slice(0, 5);
    const slowMoving = movementRes.rows.slice(-5);

    // 4. Last 7 days activity
    const last7DaysRes = await pool.query(`
      SELECT 
        DATE(created_at) AS day,
        COUNT(*) AS orders
      FROM orders
      WHERE DATE(created_at) >= CURRENT_DATE - INTERVAL '6 days'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `);

    console.log('Database results:', last7DaysRes.rows);

    // Fill missing days with 0
    const today = new Date();
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const dayStr = d.toISOString().split("T")[0];
      const row = last7DaysRes.rows.find((r) => {
        const dbDate = r.day instanceof Date ? r.day.toISOString().split('T')[0] : r.day;
        return dbDate === dayStr;
      });

      last7Days.push({
        day: dayStr,
        orders: row ? Number(row.orders) : 0,
      });
    }

    console.log('Final last7Days:', last7Days);

    return NextResponse.json({
      totalOrders: Number(totalRes.rows[0].count),
      pendingOrders: Number(pendingRes.rows[0].count),
      completedOrders: Number(completedRes.rows[0].count),
      lowStock: lowStockRes.rows,
      fastMoving,
      slowMoving,
      last7Days,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
