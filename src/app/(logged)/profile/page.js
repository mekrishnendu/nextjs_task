'use client';
import React, { useState, useEffect } from 'react';
import Style from './profile.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Suspense } from 'react';
import Loader from '@/app/components/loader';
import { useSession } from 'next-auth/react';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const profileSchema = yup.object({
  name: yup.string().required('First name is required'),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'Please enter 10 digits')
    .max(10, 'Please enter 10 digits'),
  address: yup.string(),
  hobby: yup.string(),
});

export default function Profile() {
  const { data: session, status: sessionStatus } = useSession();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const onSubmit = async (values) => {
    console.log('form hook', values);
    let payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      hobby: values.hobby,
    };

    try {
      const res = await fetch('http://localhost:3000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (res.status === 400) {
        setError('Some thing went wrong');
      }
      if (res.status === 200) {
        setError('');
      }
    } catch (error) {
      setError('Error, try again');
      console.log('error', error);
    }
    console.log('values', payload);
  };

  return (
    <div className="profile-outer flex justify-start">
      <div className="profile-pic bg-white rounded-xl h-80 w-60">pic</div>
      <div className={`${Style.profile_description_outer} ml-20`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="profile-description mb-40">
            <div className="flex mb-2 ">
              <div className="w-24 ">
                <label>Name:</label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={session?.user?.name || ''}
                  {...register('name')}
                />
                {errors?.firstName && (
                  <p className="text-xs  bottom-[-20px] right-0 bg-red-700 px-2 pb-1">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex mb-2">
              <div className="w-24">
                <label>Email:</label>
              </div>
              <div>
                {' '}
                <input
                  type="text"
                  placeholder="Enter your email id"
                  // value={session?.user.email || ''}
                  // disabled
                  {...register('email')}
                />
                {errors?.email && (
                  <p className="text-xs  bottom-[-20px] right-0 bg-red-700 px-2 pb-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex mb-2">
              <div className="w-24">
                <label>Phone No:</label>
              </div>
              <div>
                <input type="text" placeholder="Enter your mobile no" {...register('phone')} />
                {errors?.phone && (
                  <p className="text-xs  bottom-[-20px] right-0 bg-red-700 px-2 pb-1">
                    {errors.phone?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex mb-2">
              <div className="w-24">
                <lable>Address:</lable>
              </div>
              <div>
                <input type="text" placeholder="Enter your address" {...register('address')} />
                {errors?.address && (
                  <p className="text-xs  bottom-[-20px] right-0 bg-red-700 px-2 pb-1">
                    {errors.address?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex mb-2">
              <div className="w-24">
                <lable>Hobby:</lable>
              </div>
              <div>
                <textarea type="text" placeholder="Hobby" {...register('hobby')} />
                {errors?.hobby && (
                  <p className="text-xs  bottom-[-20px] right-0 bg-red-700 px-2 pb-1">
                    {errors.hobby?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="rounded-md bg-white text-black p-2  mb-5 w-52 hover:bg-slate-200"
          >
            Submit
          </button>
        </form>
        <div className="flex text-sm text-cyan-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <span className="ml-2 mt-1">Edit Profile</span>
        </div>
      </div>
    </div>
  );
}
