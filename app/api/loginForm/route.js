import { NextResponse, NextRequest } from 'next/server';
import connection from '../../lib/db';

export async function POST(req, res) {
  try {
    const { email, password } = await req.json();

    const get_exp_query = `SELECT userID FROM userInfo WHERE emailAddress='${email}' and password='${password}'`;
    const results = await connection.query(get_exp_query);
    const userID = results?.rows[0];

    return NextResponse.json(userID);
  } catch (err) {
    const response = {
      error: err.message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
