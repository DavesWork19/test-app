import { NextResponse, NextRequest } from 'next/server';
import connection from '../../../lib/db';

export async function GET(req, res) {
  try {
    const userID = req.url.split('/')[req.url.split('/').length - 2];
    const get_exp_query = `SELECT FirstName,MiddleName,LastName,DOB,Sex,MaritalStatus,PhoneNumber,PhoneNumberType,MailingAddress,BillingAddress,emailaddress FROM People INNER JOIN UserInfo ON People.PersonID = UserInfo.PersonInfo WHERE UserID=${userID};`;
    const results = await connection.query(get_exp_query);

    const mailingAddress = results?.rows[0].mailingaddress;
    const mailingAddressQuery = `SELECT StreetAddress AS mailingStreetAddress,House AS mailingHouse,UnitNumber AS mailingUnitNumber,City AS mailingCity,State AS mailingState,ZipCode AS mailingZipCode FROM Addresses WHERE StreetID=${mailingAddress}`;
    const mailingAddressResults = await connection.query(mailingAddressQuery);

    const billingAddress = results?.rows[0].billingaddress;
    const billingAddressQuery = `SELECT StreetAddress AS billingStreetAddress,House AS billingHouse,UnitNumber AS billingUnitNumber,City AS billingCity,State AS billingState,ZipCode AS billingZipCode FROM Addresses WHERE StreetID=${billingAddress}`;
    const billingAddressResults = await connection.query(billingAddressQuery);

    return NextResponse.json({
      ...results?.rows[0],
      ...mailingAddressResults?.rows[0],
      ...billingAddressResults?.rows[0],
    });
  } catch (err) {
    const response = {
      error: err.message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
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
