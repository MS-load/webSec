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
    const sql = `
    DROP TABLE IF EXISTS users CASCADE;
    
    CREATE TABLE users (
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
  } finally {
    client.release();
  }
}
