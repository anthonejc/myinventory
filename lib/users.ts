import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}

// Get all users
export async function   getAllUsers() {
  const { rows } = await pool.query("SELECT id, name, email, role FROM users ORDER BY id ASC");
  return rows;
}

// Get single user
export async function getUserById(id: number) {
  const { rows } = await pool.query("SELECT id, name, email, role FROM users WHERE id = $1", [id]);
  return rows[0];
}

// Update user role
export async function updateUserRole(id: number, role: "ADMIN" | "USER") {
  const { rows } = await pool.query(
    "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role",
    [role, id]
  );
  return rows[0];
}

// Delete user
export async function deleteUser(id: number) {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return { message: "User deleted successfully" };
}
