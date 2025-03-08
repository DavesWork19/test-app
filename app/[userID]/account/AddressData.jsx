'use client';

import { useState } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

export const AddressData = (props) => {
  const userID = props.userID;

  const [mailingAddress, setMailingAddress] = useState({
    ...props.mailingData,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...props.billingData,
  });

  const [showAddressData, setShowAddressData] = useState(false);
  const [diffAddy, setDiffAddy] = useState(false);

  const houseConversion = {
    0: 'No',
    1: 'Yes',
    false: 'No',
    true: 'Yes',
  };

  const handleDiffAddy = () => {
    if (diffAddy) {
      setDiffAddy(false);
    } else {
      setDiffAddy(true);
    }
  };

  const handleShowAddress = () => {
    if (showAddressData) {
      setShowAddressData(false);
      setDiffAddy(false);
    } else {
      setShowAddressData(true);
    }
  };

  const handleMailingSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/api/${userID}/accountData/mailingAddressData`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mailingAddress),
    });
  };

  const handleBillingSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/api/${userID}/accountData/billingAddressData`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(billingAddress),
    });
  };

  return (
    <div className='ps-8'>
      <div className='relative flex flex-col rounded-xl bg-transparent px-8'>
        <form onSubmit={handleMailingSubmit} className='mt-8 mb-2'>
          <h3
            className='block text-lg font-medium text-slate-500 font-light mb-6 border-b'
            onClick={handleShowAddress}
          >
            {!showAddressData && (
              <div className='grid grid-cols-12'>
                <div className='text-end'>{'Location'}</div>
                <div className='pt-1'>
                  <PlusIcon aria-hidden='true' className='size-5' />
                </div>
              </div>
            )}
            {showAddressData && (
              <div className='grid grid-cols-12'>
                <div className='text-end'>{'Location'}</div>
                <div className='pt-1'>
                  <MinusIcon aria-hidden='true' className='size-5' />
                </div>
              </div>
            )}
          </h3>
          {showAddressData && (
            <div>
              <div className='grid grid-cols-3 gap-2'>
                <div>
                  <label>Street</label>
                  <input
                    type='text'
                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                    placeholder='Street'
                    name='street'
                    onChange={(e) =>
                      setMailingAddress({
                        ...mailingAddress,
                        mailingstreetaddress: e.target.value,
                      })
                    }
                    value={mailingAddress.mailingstreetaddress}
                  />
                </div>
                <div>
                  <label>House?</label>
                  <select
                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'
                    onChange={(e) =>
                      setMailingAddress({
                        ...mailingAddress,
                        mailinghouse: e.target.value,
                      })
                    }
                    defaultValue={houseConversion[mailingAddress.mailinghouse]}
                  >
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </select>
                </div>
                <div>
                  <label>Unit Number</label>
                  <input
                    type='number'
                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                    placeholder='Unit'
                    name='unitNumber'
                    onChange={(e) =>
                      setMailingAddress({
                        ...mailingAddress,
                        mailingunitnumber: e.target.value,
                      })
                    }
                    value={mailingAddress.mailingunitnumber}
                  />
                </div>
                <div>
                  <label>City</label>
                  <input
                    type='text'
                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                    placeholder='city'
                    name='city'
                    onChange={(e) =>
                      setMailingAddress({
                        ...mailingAddress,
                        mailingcity: e.target.value,
                      })
                    }
                    value={mailingAddress.mailingcity}
                  />
                </div>
                <div>
                  <label>State</label>
                  <input
                    type='text'
                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                    placeholder='state'
                    name='state'
                    onChange={(e) =>
                      setMailingAddress({
                        ...mailingAddress,
                        mailingstate: e.target.value,
                      })
                    }
                    value={mailingAddress.mailingstate}
                  />
                </div>
                <div>
                  <label>Zip Code</label>
                  <input
                    type='number'
                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                    placeholder='Zip Code'
                    name='zipCode'
                    onChange={(e) =>
                      setMailingAddress({
                        ...mailingAddress,
                        mailingzipcode: e.target.value,
                      })
                    }
                    value={mailingAddress.mailingzipcode}
                  />
                </div>
              </div>
              <button
                className='mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                type='submit'
              >
                Save Mailing Address
              </button>
              <div className='block text-sm text-slate-500 font-light mt-8 mb-4 border-b'>
                <span>Billing Address Different Than Mailing Address?</span>
                <span className='ps-5'>
                  <input
                    type='checkbox'
                    name='diffAddy'
                    onClick={handleDiffAddy}
                  />
                </span>
              </div>
            </div>
          )}
        </form>
        {showAddressData && diffAddy && (
          <form onSubmit={handleBillingSubmit} className='mt-8 mb-2'>
            {diffAddy && (
              <div>
                <div className='grid grid-cols-3 gap-2'>
                  <div>
                    <label>Street</label>
                    <input
                      type='text'
                      className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                      placeholder='Street'
                      name='street'
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          billingstreetaddress: e.target.value,
                        })
                      }
                      value={billingAddress.billingstreetaddress}
                    />
                  </div>
                  <div>
                    <label>House?</label>
                    <select
                      className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          billinghouse: e.target.value,
                        })
                      }
                      defaultValue={
                        houseConversion[billingAddress.billinghouse]
                      }
                    >
                      <option value='Yes'>Yes</option>
                      <option value='No'>No</option>
                    </select>
                  </div>
                  <div>
                    <label>Unit Number</label>
                    <input
                      type='number'
                      className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                      placeholder='Unit'
                      name='unitNumber'
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          billingunitnumber: e.target.value,
                        })
                      }
                      value={billingAddress.billingunitnumber}
                    />
                  </div>
                  <div>
                    <label>City</label>
                    <input
                      type='text'
                      className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                      placeholder='city'
                      name='city'
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          billingcity: e.target.value,
                        })
                      }
                      value={billingAddress.billingcity}
                    />
                  </div>
                  <div>
                    <label>State</label>
                    <input
                      type='text'
                      className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                      placeholder='state'
                      name='state'
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          billingstate: e.target.value,
                        })
                      }
                      value={billingAddress.billingstate}
                    />
                  </div>
                  <div>
                    <label>Zip Code</label>
                    <input
                      type='number'
                      className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                      placeholder='Zip Code'
                      name='zipCode'
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          billingzipcode: e.target.value,
                        })
                      }
                      value={billingAddress.billingzipcode}
                    />
                  </div>
                </div>
                <button
                  className='mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  type='submit'
                >
                  Save Billing Address
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
