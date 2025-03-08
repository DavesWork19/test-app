import { NextResponse, NextRequest } from 'next/server';
import connection from '../../../../lib/db';

export async function PUT(req, res) {
  try {
    const {
      firstname,
      lastname,
      middlename,
      dob,
      sex,
      maritalstatus,
      phonenumber,
      phonenumbertype,
    } = await req.json();

    const sexConversions = {
      Male: 0,
      Female: 1,
      Other: 2,
      0: 0,
      1: 1,
      2: 2,
    };
    const maritalStatusConversions = {
      Married: 0,
      Single: 1,
      Divorced: 2,
      Widow: 3,
      0: 0,
      1: 1,
      2: 2,
      3: 3,
    };
    const phoneTypeConversion = {
      Cell: 0,
      Work: 1,
      Home: 2,
      0: 0,
      1: 1,
      2: 2,
    };

    const userID = req.url.split('/')[4];
    const get_exp_query = `UPDATE people SET firstname='${firstname}',middlename='${middlename}',lastname='${lastname}',dob='${dob}',sex='${sexConversions[sex]}',maritalstatus='${maritalStatusConversions[maritalstatus]}',phonenumber='${phonenumber}',phonenumbertype='${phoneTypeConversion[phonenumbertype]}' WHERE personid=(SELECT personinfo FROM userinfo WHERE userid=${userID});`;
    const results = await connection.query(get_exp_query);

    return NextResponse.json(results);
  } catch (err) {
    console.log('ERROR: ', err.message);

    const response = {
      error: err.message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
