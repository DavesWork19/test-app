import { NextResponse, NextRequest } from 'next/server';
import connection from '../../../lib/db';

export async function PUT(req, res) {
  try {
    const {
      FirstName,
      MiddleName,
      LastName,
      DOB,
      Sex,
      MaritalStatus,
      Email,
      PhoneNumber,
      PhoneNumberType,
      MailingAddress,
      BillingAddress,
    } = await req.json();

    // UPDATE DATA

    const get_exp_query = `UPDATE People SET FirstName=${FirstName},MiddleName=${MiddleName},LastName=${LastName},DOB=${DOB},Sex=${Sex},MaritalStatus=${MaritalStatus},Email=${Email},PhoneNumber=${PhoneNumber},PhoneNumberType=${PhoneNumberType},MailingAddress=${MailingAddress},BillingAddress=${BillingAddress} WHERE UserID=${userID};`;

    const [results] = await connection.query(get_exp_query);

    return NextResponse.json(results);
  } catch (err) {
    const response = {
      error: err.message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
