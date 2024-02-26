'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required('Please enter password'),
});

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [sessionStatus, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    console.log('form hook', values);
    let payload = {
      email: values.email,
      password: values.password,
      redirect: false,
    };

    try {
      const res = await signIn('credentials', payload);
      console.log('login', res);
      if (res?.error) {
        setError('Invalid email or password');
      } else if (res?.status === 200) {
        if (res?.status) router.replace('/dashboard');
      } else {
        setError('');
      }
    } catch (error) {
      setError('Error, try again');
      console.log('error', error);
    }
    console.log('values', payload);
  };
  if (sessionStatus === 'loading') {
    return <h1>Loading...</h1>;
  }
  return (
    <main>
      <div className="login-page-outer bg-gray-800 h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
        <div className="rounded-lg bg-slate-500 p-8 w-[450] text-left bg-gradient-to-r from-cyan-500 to-blue-500">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-white">
              <h1 className="text-center text-3xl mb-2">Welcome</h1>
              <p className="text-center mb-4 text-sm">Sign in to continue the application.</p>
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-full w-[100px] h-[100px] text-center">
                  <Image
                    src="/images/person.png"
                    width={72}
                    height={72}
                    alt="Picture of the author"
                    className="self-auto inline-block mt-2"
                  />
                </div>
              </div>
              <div className="flex justify-between mb-6 items-center relative">
                <label className="w-[100px] block text-white text-md">Email Id:</label>
                <input
                  type="text"
                  className="py-2 px-4 rounded-md text-sm text-black"
                  placeholder="Enter your email id"
                  {...register('email')}
                />
                <p className="text-xs absolute bottom-[-20px] right-0 bg-red-700 px-2">
                  {errors.email?.message}
                </p>
              </div>

              <div className="flex justify-between mb-6 items-center relative">
                <label className="w-[100px] block text-white text-md">Password:</label>
                <input
                  type="password"
                  className="py-2 px-4 rounded-md text-sm text-black"
                  placeholder="Enter your password"
                  {...register('password')}
                />
                <p className="text-xs absolute bottom-[-20px] right-0 bg-red-700 px-2">
                  {errors.password?.message}
                </p>
              </div>

              <button
                type="submit"
                className="rounded-md bg-white text-black p-2 px-10 ml-[100px] mb-10"
              >
                Login
              </button>
              <p className="text-center text-sm  bg-red-700">{error && error}</p>
              <p className="text-center text-xs mb-2">
                Forget password?{' '}
                <Link href="/registration">
                  <strong className="underline">Click here</strong>
                </Link>{' '}
              </p>
              <p className="text-center text-sm">
                Dont have an account?{' '}
                <Link href="/registration">
                  <strong className="underline">Sign Up</strong>
                </Link>{' '}
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
