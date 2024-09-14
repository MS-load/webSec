import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'ws_user',
  host: 'localhost',
  database: 'testdb',
  password: 'pass',
  port: 5432,
});

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
    );
    client.release();

    if (result.rows.length > 0) {
      return NextResponse.json('Login successful');
    } else {
      return NextResponse.json('Invalid credentials', { status: 401 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json('Server error', { status: 500 });
  }
}
