// import pool from "../../lib/db";
import { Pool } from "pg";
import { NextResponse } from "next/server";

export async function GET() {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});


  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);

    if (!res.rows[0].exists) {
      const sql = `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    ); 
    
    INSERT INTO users (username, password) VALUES
      ('user1', 'password1'),
      ('user2', 'password2'),
      ('user3', 'password3'),
      ('user4', 'password4'),
      ('user5', 'password5');
    `;

      await client.query(sql);
      return NextResponse.json("Table created successfully");
    } else {
      return NextResponse.json("Table already exists");
    }
  } finally {
    client.release();
  }
}
