import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";

export async function POST(req: Request) {
  try {
    // console.log("=== ORDER API START ===");
    const token = req.headers.get("authorization")?.split(" ")[1];
    // console.log("Token:", token);

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // console.log("Verifying token...");
    const decoded = verifyToken(token);
    // console.log("Decoded token:", decoded);

    // console.log("Parsing request body...");
    const { productId, quantity } = await req.json();
    // console.log("Request data:", { productId, quantity });

    // Check product stock
    // console.log("Checking product stock...");
    const productRes = await pool.query("SELECT * FROM products WHERE id = $1", [productId]);
    const product = productRes.rows[0];
    // console.log("Product found:", product);

    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    if (product.stock < quantity)
      return NextResponse.json({ error: "Not enough stock" }, { status: 400 });

    // Create order
    // console.log("Creating order...");
    const total_amount = product.price * quantity;
    // console.log("Order details:", { user_id: decoded.id });

    const orderResult = await pool.query(
      "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING id",
      [decoded.id, "pending"]
    );
    const orderId = orderResult.rows[0].id;
    // console.log("Order created with ID:", orderId);

    // Create order item
    // console.log("Creating order item...");
    await pool.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
      [orderId, productId, quantity, total_amount]
    );
    // console.log("Order item created successfully");

    // Update stock
    // console.log("Updating stock...");
    await pool.query("UPDATE products SET stock = stock - $1 WHERE id = $2", [quantity, productId]);
    // console.log("Stock updated successfully");

    return NextResponse.json({ message: "Order placed successfully!" });
  } catch (error) {
    // console.error("=== ERROR DETAILS ===");
    // console.error("Error message:", error.message);
    // console.error("Error stack:", error.stack);
    // console.error("Full error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
