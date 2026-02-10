// app/api/users/route.js
import pool from "@/lib/db";

// GET all users
export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT userID, userName, userAge, school, email, grade FROM users"
    );
    return Response.json({ success: true, data: rows, message: "Users fetched" });
  } catch (error) {
    console.error("Database GET error:", error);
    return Response.json({ success: false, message: "Failed to fetch users", error: error.message }, { status: 500 });
  }
}

// POST new user
export async function POST(request) {
  try {
    const { userName, userAge, userPassword, school, email, grade } = await request.json();

    if (!userName) {
      return Response.json({ success: false, message: "Name is required" }, { status: 400 });
    }

    const [result] = await pool.query(
      `INSERT INTO users (userName, userAge, userPassword, school, email, grade)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userName, userAge || null, userPassword || null, school || null, email || null, grade || null]
    );

    return Response.json({ success: true, id: result.insertId, message: "User added" });
  } catch (error) {
    console.error("Database POST error:", error);
    return Response.json({ success: false, message: "Failed to add user", error: error.message }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return Response.json({ success: false, message: "ID required" }, { status: 400 });

    await pool.query("DELETE FROM users WHERE userID = ?", [id]);

    return Response.json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error("Database DELETE error:", error);
    return Response.json({ success: false, message: "Failed to delete user", error: error.message }, { status: 500 });
  }
}
