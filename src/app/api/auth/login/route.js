import pool from "@/lib/db";

export async function POST(req) {
  const { identifier, password } = await req.json();

  const [rows] = await pool.query(
    `SELECT userID, userName FROM users
     WHERE (userName = ? OR email = ?) AND userPassword = ?`,
    [identifier, identifier, password]
  );

  if (!rows.length)
    return Response.json({ success: false, message: "Invalid credentials" });

  return Response.json({ success: true, user: rows[0] });
}