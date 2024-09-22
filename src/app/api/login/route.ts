import { NextRequest, NextResponse } from 'next/server';
import pool from "../../lib/db";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {

    const client = await pool.connect();
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log('Executing query:', query);
    const result = await client.query(query);

    client.release();
    console.log(result);
    if (result?.rows?.length > 0) {
      return NextResponse.json({ message: 'Login successful', user: result.rows[0].username });
    } else {
      console.log(result);
      return NextResponse.json('Invalid credentials', { status: 401 });
    }
  } catch (err: unknown) {
    console.error(err, 'Error logging in');
    if (err instanceof Error) {
      return NextResponse.json(err.message, { status: 500 });
    }
    return NextResponse.json('Server error', { status: 500 });
  }
}
