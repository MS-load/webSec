import { NextRequest, NextResponse } from "next/server";
import pool from "../../lib/db";
import * as bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const client = await pool.connect();
    // const query = `INSERT INTO users (username, password) VALUES ('${username}','${password}')`;
    const query = `INSERT INTO users (username, password) VALUES ('${username}','${hashedPassword}')`;

    console.log("Executing query:", query);
    const result = await client.query(query);

    client.release();
    if (result.rowCount ?? 0 > 0) {
      return NextResponse.json({
        message: "successful",
        user: result.rows[0].username,
      });
    } else {
      console.log(result);
      return NextResponse.json("failed", { status: 401 });
    }
  } catch (err: unknown) {
    console.error(err, "Error registering in");
    if (err instanceof Error) {
      return NextResponse.json(err.message, { status: 500 });
    }
    return NextResponse.json("Server error", { status: 500 });
  }
}
