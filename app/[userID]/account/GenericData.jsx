'use client';

import { useState } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

export const GenericData = (props) => {
  const userID = props.userID;
  const [user, setUser] = useState({ ...props.data });
  const [showGenericData, setShowGenericData] = useState(false);

  const sexConversions = {
    0: 'Male',
    1: 'Female',
    2: 'Other',
  };
  const maritalStatusConversions = {
    0: 'Married',
    1: 'Single',
    2: 'Divorced',
    3: 'Widow',
  };
  const phoneTypeConversion = {
    0: 'Cell',
    1: 'Work',
    2: 'Home',
  };

  const handleShowGenericData = () => {
    if (showGenericData) {
      setShowGenericData(false);
    } else {
      setShowGenericData(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/api/${userID}/accountData/genericData`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  };

  return (
    <div className='ps-8'>
      <div className='relative flex flex-col rounded-xl bg-transparent px-8'>
        <form onSubmit={handleSubmit} className='mt-8 mb-2'>
          <h3
            className='block text-lg font-medium text-slate-500 font-light mb-6 border-b'
            onClick={handleShowGenericData}
          >
            {!showGenericData && (
              <div className='grid grid-cols-12'>
                <div className='text-end'>{'Profile'}</div>
                <div className='pt-1'>
                  <PlusIcon aria-hidden='true' className='size-5' />
                </div>
              </div>
            )}
            {showGenericData && (
              <div className='grid grid-cols-12'>
                <div className='text-end'>{'Profile'}</div>
                <div className='pt-1'>
                  <MinusIcon aria-hidden='true' className='size-5' />
                </div>
              </div>
            )}
          </h3>
          {showGenericData && (
            <div>
              <div className='grid grid-cols-3 gap-2'>
                <div>
                  <label>First Name</label>
                  <input
                    type='text'
                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                    placeholder='First Name'
                    name='firstName'
                    onChange={(e) =>
                      setUser({ ...user, firstname: e.target.value })
                    }
                    value={user.firstname}
                  />
                </div>
                <div>
                  <label>Middle Name</label>
                  <input
                    type='text'
                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                    placeholder='Middle Name'
                    name='middleName'
                    onChange={(e) =>
                      setUser({ ...user, middlename: e.target.value })
                    }
                    value={user.middlename}
                  />
                </div>
                <div>
                  <label>Last Name</label>
                  <input
                    type='text'
                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                    placeholder='Last Name'
                    name='lastName'
                    onChange={(e) =>
                      setUser({ ...user, lastname: e.target.value })
                    }
                    value={user.lastname}
                  />
                </div>
                <div>
                  <label>Date of Birth</label>
                  <input
                    type='date'
                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                    placeholder='Date of Birth'
                    name='dob'
                    onChange={(e) => setUser({ ...user, dob: e.target.value })}
                    value={user.dob}
                  />
                </div>
                <div>
                  <label>Sex</label>
                  <div className='relative'>
                    <select
                      className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'
                      onChange={(e) =>
                        setUser({
                          ...user,
                          sex: e.target.value,
                        })
                      }
                      defaultValue={sexConversions[user.sex]}
                    >
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                      <option value='Other'>Other</option>
                    </select>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.2'
                      stroke='currentColor'
                      className='h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <label>Marital Status</label>
                  <div className='relative'>
                    <select
                      className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'
                      onChange={(e) =>
                        setUser({
                          ...user,
                          maritalstatus: e.target.value,
                        })
                      }
                      defaultValue={
                        maritalStatusConversions[user.maritalstatus]
                      }
                    >
                      <option value='Married'>Married</option>
                      <option value='Single'>Single</option>
                      <option value='Divorced'>Divorced</option>
                      <option value='Widow'>Widow</option>
                    </select>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.2'
                      stroke='currentColor'
                      className='h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type='email'
                    className='disabled w-full text-white text-sm border border-slate-200 rounded-md px-3 py-2 bg-black'
                    placeholder='Email'
                    name='emailaddress'
                    disabled
                    value={user.emailaddress}
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type='tel'
                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                    placeholder='Phone Number'
                    name='phoneNumber'
                    onChange={(e) =>
                      setUser({ ...user, phonenumber: e.target.value })
                    }
                    value={user.phonenumber}
                  />
                </div>
                <div>
                  <label>Phone Type</label>
                  <div className='relative'>
                    <select
                      className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'
                      onChange={(e) =>
                        setUser({
                          ...user,
                          phonenumbertype: e.target.value,
                        })
                      }
                      defaultValue={phoneTypeConversion[user.phonenumbertype]}
                    >
                      <option value='Cell'>Cell</option>
                      <option value='Work'>Work</option>
                      <option value='Home'>Home</option>
                    </select>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.2'
                      stroke='currentColor'
                      className='h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <button
                className='mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                type='submit'
              >
                Save Profile Data
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
