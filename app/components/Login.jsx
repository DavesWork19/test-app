'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const router = useRouter();

  const randomNums = () => {
    //Generate fake numbers to mask user ID
    return Math.floor(Math.random() * (10 + 1));
  };

  const handleEmail = (value) => {
    setUser({
      ...user,
      email: value,
    });
  };
  const handlePassword = (value) => {
    setUser({
      ...user,
      password: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/loginForm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    const userID = result.userid;

    if (userID) {
      router.push(`/${userID}/home`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex flex-col bg-white shadow-sm border border-slate-200 w-96 rounded-lg my-6'
    >
      <div className='relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800'>
        <h3 className='text-2xl'>Sign In</h3>
      </div>
      <div className='flex flex-col gap-4 p-6'>
        <div className='w-full max-w-sm min-w-[200px]'>
          <label className='block mb-2 text-sm text-slate-600'>Email</label>
          <input
            type='email'
            className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
            placeholder='Your Email'
            name='email'
            onChange={(e) => handleEmail(e.target.value)}
            value={user.email}
            required
          />
        </div>

        <div className='w-full max-w-sm min-w-[200px]'>
          <label className='block mb-2 text-sm text-slate-600'>Password</label>
          <input
            type='password'
            className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
            placeholder='Your Password'
            name='password'
            onChange={(e) => handlePassword(e.target.value)}
            value={user.password}
            required
          />
        </div>
      </div>
      <div className='p-6 pt-0'>
        <button
          className='w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          type='submit'
        >
          Sign In
        </button>
        <p className='flex justify-center mt-6 text-sm text-slate-600'>
          Don&apos;t have an account?
          <a
            href='#signup'
            className='ml-1 text-sm font-semibold text-slate-700 underline'
          >
            Sign up
          </a>
        </p>
      </div>
    </form>
  );
};
