// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  console.log('🚀 API Route Hit: /api/auth/signup');
  
  try {
    // console.log('📥 Parsing request body...');
    const body = await req.json();
    // console.log('✅ Raw body:', body);
    
    const { name, email, password, role } = body ?? {};
    // console.log('📋 Extracted:', { name, email, password, role: role ?? "USER" });

    if (!name || !email || !password) {
      // console.log('❌ Validation failed - missing fields');
      return NextResponse.json({ error: "name, email and password are required" }, { status: 400 });
    }
    // console.log('✅ Validation passed');

    // check existing
    // console.log('🔍 Checking if email exists...');
    const existing = await query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rowCount && existing.rowCount > 0) {
      // console.log('❌ Email already exists');
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }
    // console.log('✅ Email is available');

    // console.log('🔒 Hashing password...');
    const hashed = await bcrypt.hash(password, 10);

    // console.log('💾 Inserting user into database...');
    const inserted = await query(
      `INSERT INTO users (name, email, password, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email, role, created_at`,
      [name, email, hashed, role ?? "USER"]
    );

    // console.log('✅ User created successfully:', inserted.rows[0]);
    return NextResponse.json(inserted.rows[0], { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
