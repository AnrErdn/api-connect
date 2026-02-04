import pool from '@/lib/db';

export async function GET(request) {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.query('SELECT * FROM user');
    
    connection.release();

    return Response.json({
      success: true,
      data: rows,
      message: 'Users fetched successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Database error:', error);
    return Response.json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    }, { status: 500 });
  }
}
