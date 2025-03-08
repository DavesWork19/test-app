import { GenericData } from './GenericData';
import { AddressData } from './AddressData';

export default async function Account({ params }) {
  const { userID } = await params;
  const response = await fetch(
    `http://localhost:3000/api/${userID}/accountData`
  );
  const data = await response.json();
  const updatedDOB = data.dob.split('T')[0];

  console.log('t', data);

  return (
    <main>
      <div className='ps-8'>
        <div className='relative flex flex-col rounded-xl bg-transparent px-8'>
          <h4 className='block text-xl font-medium text-slate-800'>
            Update Data
          </h4>
          <p className='text-slate-500 font-light'>
            Update any data that is no longer accurate.
          </p>

          <GenericData
            userID={userID}
            data={{
              firstname: data.firstname,
              lastname: data.lastname,
              middlename: data.middlename,
              dob: updatedDOB,
              sex: data.sex,
              maritalstatus: data.maritalstatus,
              emailaddress: data.emailaddress,
              phonenumber: data.phonenumber,
              phonenumbertype: data.phonenumbertype,
            }}
          />
          <AddressData
            userID={userID}
            mailingData={{
              mailingstreetaddress: data.mailingstreetaddress,
              mailinghouse: data.mailinghouse,
              mailingunitnumber: data.mailingunitnumber,
              mailingcity: data.mailingcity,
              mailingstate: data.mailingstate,
              mailingzipcode: data.mailingzipcode,
            }}
            billingData={{
              billingstreetaddress: data.billingstreetaddress,
              billinghouse: data.billinghouse,
              billingunitnumber: data.billingunitnumber,
              billingcity: data.billingcity,
              billingstate: data.billingstate,
              billingzipcode: data.billingzipcode,
            }}
          />
        </div>
      </div>
    </main>
  );
}
