import { NextResponse, NextRequest } from 'next/server';
import connection from '../../../../lib/db';

export async function PUT(req, res) {
  try {
    const {
      mailingstreetaddress,
      mailinghouse,
      mailingunitnumber,
      mailingcity,
      mailingstate,
      mailingzipcode,
    } = await req.json();

    const userID = req.url.split('/')[4];
    const get_exp_query = `UPDATE addresses SET streetaddress='${mailingstreetaddress}',house='${mailinghouse}',unitnumber='${mailingunitnumber}',city='${mailingcity}',state='${mailingstate}',zipcode='${mailingzipcode}' WHERE streetid=(SELECT mailingaddress FROM people WHERE personid=(SELECT personinfo FROM userinfo WHERE userid = ${userID}));`;
    const results = await connection.query(get_exp_query);

    return NextResponse.json(results);
  } catch (err) {
    const response = {
      error: err.message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
