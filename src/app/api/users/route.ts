// import pool from "../../lib/db";
import { Pool } from "pg";
import { NextResponse } from "next/server";

export async function GET() {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432,
  });

  const client = await pool.connect();
  try {
    const sql = `SELECT * FROM users;
    `;

    const users = await client.query(sql);
    return NextResponse.json(users.rows);
  } finally {
    client.release();
  }
}
