import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST() {
  try {
    // Create cart table
    await query(`
      CREATE TABLE IF NOT EXISTS cart (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
          quantity INTEGER NOT NULL DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, product_id)
      )
    `);

    // Create orders table
    await query(`
      CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          total_amount DECIMAL(10,2) NOT NULL,
          status VARCHAR(20) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create order_items table
    await query(`
      CREATE TABLE IF NOT EXISTS order_items (
          id SERIAL PRIMARY KEY,
          order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
          product_id INTEGER NOT NULL REFERENCES products(id),
          quantity INTEGER NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes
    await query(`CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_cart_product_id ON cart(product_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id)`);

    return NextResponse.json({ message: "Tables created successfully" });
  } catch (error) {
    console.error("Failed to create tables:", error);
    return NextResponse.json({ error: "Failed to create tables" }, { status: 500 });
  }
}