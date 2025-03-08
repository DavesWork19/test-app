import { NextResponse, NextRequest } from 'next/server';
import connection from '../../../../lib/db';

export async function GET(req, res) {
  try {
    const userID = req.url.split('/')[req.url.split('/').length - 3];

    const get_exp_query = `SELECT appointmentid, datetime, description, status, title, vetname FROM appointments WHERE appointmentconnection = (SELECT appointmentinfo FROM people WHERE personid = (SELECT personinfo FROM userinfo WHERE userid=${userID})) ORDER BY datetime DESC;`;
    const results = await connection.query(get_exp_query);

    return NextResponse.json(results?.rows);
  } catch (err) {
    console.log('ERROR: ', err.message);

    const response = {
      error: err.message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
