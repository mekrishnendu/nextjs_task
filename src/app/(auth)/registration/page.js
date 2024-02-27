'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const registrationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'Please enter 10 digits')
    .max(10, 'Please enter 10 digits'),
  password: yup.string().required('Please enter password'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  gender: yup.string().required('Confirm your password'),
});

export default function Registration() {
  const [error, setError] = useState('');

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (values) => {
    console.log('form hook', values);
    let payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      gender: values.gender,
      password: values.password,
    };

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (res.status === 400) {
        setError('This email is already registered');
      }
      if (res.status === 200) {
        setError('');
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Error, try again');
      console.log('error', error);
    }
    console.log('values', payload);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-white">
          <h1 className="text-center text-3xl mb-2">Join us</h1>
          <p className="text-center mb-4 text-sm">Please fillup the fields</p>
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

          <div className="flex justify-between mb-6">
            <div className="flex justify-between  items-center relative">
              <label className=" block w-[80px] text-white text-sm text-right">First Name:</label>
              <input
                type="text"
                className="py-2 px-4 rounded-md text-sm text-black ml-2"
                placeholder="Enter your name"
                {...register('firstName')}
              />
              <p className="text-xs absolute bottom-[-20px] right-0 bg-red-700 px-2">
                {errors.firstName?.message}
              </p>
            </div>
            <div className="flex justify-between  items-center relative ml-5">
              <label className=" block text-white text-sm text-right">Last Name:</label>
              <input
                type="text"
                className="py-2 px-4 rounded-md text-sm text-black ml-2"
                placeholder="Enter your last name"
                {...register('lastName')}
              />
              <p className="text-xs absolute bottom-[-20px] right-0 bg-red-700 px-2">
                {errors.lastName?.message}
              </p>
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <div className="flex justify-between items-center relative">
              <label className="block w-[80px] text-white text-sm text-right">Email Id:</label>
              <input
                type="text"
                className="py-2 px-4 rounded-md text-sm text-black ml-2"
                placeholder="Enter your email id"
                {...register('email')}
              />
              <p className="text-xs absolute bottom-[-20px] right-0 bg-red-700 px-2">
                {errors.email?.message}
              </p>
            </div>

            <div className="flex justify-between  items-center ml-5 relative">
              <label className="block text-white text-sm text-right">Phone No:</label>
              <input
                type="text"
                className="py-2 px-4 rounded-md text-sm text-black ml-2"
                placeholder="Enter your phone no"
                {...register('phone')}
              />
              <p className="text-xs absolute bottom-[-20px] right-0 bg-red-700 px-2">
                {errors.phone?.message}
              </p>
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <div className="flex justify-between  items-center relative">
              <label className="block  w-[80px] text-white text-sm text-right">Password:</label>
              <input
                type="password"
                className="py-2 px-4 rounded-md text-sm text-black ml-2"
                placeholder="Enter your password"
                {...register('password')}
              />
              <p className="text-xs absolute bottom-[-20px] right-0 bg-red-700 px-2">
                {errors.password?.message}
              </p>
            </div>

            <div className="flex justify-between  items-center ml-5 relative">
              <label className="block text-white text-sm text-right">Confirm Password:</label>
              <input
                type="confirmPassword"
                className="py-2 px-4 rounded-md text-sm text-black ml-2"
                placeholder="Retype your password"
                {...register('confirmPassword')}
              />
              <p className="text-xs absolute bottom-[-20px] right-0 bg-red-700 px-2">
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>
          <div className="flex mb-6 relative">
            <label className="block  w-[80px] text-white text-sm text-right">Gender:</label>
            <div class="flex items-center me-4">
              <input
                id="male"
                type="radio"
                value="male"
                name="gender"
                class="w-4 h-4 ml-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                {...register('gender')}
              />
              <label for="male" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Male
              </label>
            </div>
            <div class="flex items-center me-4">
              <input
                id="female"
                type="radio"
                value="female"
                name="gender"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                {...register('gender')}
              />
              <label for="female" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Female
              </label>
            </div>
            <p className="text-xs absolute bottom-[-20px] left-[100px] bg-red-700 px-2">
              {errors.gender?.message}
            </p>
          </div>
          <div className="text-center">
            <p className="mb-4 text-sm text-right italic">
              All the fields are required(<span className="text-xs align-top">*</span>).
            </p>
            <button
              type="submit"
              className="rounded-md bg-white text-black p-2  mb-5 w-52 hover:bg-slate-200"
            >
              Sign in
            </button>
            <p className=" text-sm">
              Already have an account?{' '}
              <Link href="/">
                <strong className="underline">Login</strong>
              </Link>{' '}
            </p>
            <p className="mt-10 rounded-md bg-red-700">{error && error}</p>
          </div>
        </div>
      </form>
    </div>
  );
}
