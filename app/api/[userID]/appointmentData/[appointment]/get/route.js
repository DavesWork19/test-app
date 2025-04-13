import { NextResponse, NextRequest } from 'next/server';
import connection from '../../../../../lib/db';

export async function GET(req, res) {
  try {
    const urlData = req.url.split('/');
    const userID = urlData[urlData.length - 4];
    const appointmentID = urlData[urlData.length - 2];

    const get_exp_query = `SELECT datetime, description, status, title, vetname, vetphone, vetemail, vetlocation, price, hours, related, nextsteps FROM appointments WHERE appointmentconnection = (SELECT appointmentinfo FROM people WHERE personid = (SELECT personinfo FROM userinfo WHERE userid=${userID})) and appointmentid=${appointmentID};`;
    const results = await connection.query(get_exp_query);

    return NextResponse.json(results?.rows);
  } catch (err) {
    const response = {
      error: err.message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
