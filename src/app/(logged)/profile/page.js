'use client';
import React, { useState, useEffect } from 'react';
import Style from './profile.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Suspense } from 'react';
import Loader from '@/app/components/loader';
import { useSession, getSession } from 'next-auth/react';
import { BASE_URL } from '@/app/utils/constant';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const profileSchema = yup.object({
  name: yup.string().required('Name is required'),
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
  const { data: session } = useSession();
  const [error, setError] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [mail, setMail] = useState();
  const [editProfile, setEditProfile] = useState(false);

  // GET PROFILE
  async function getProfiles() {
    let profilesData = await fetch(`${BASE_URL}/api/profile`);
    profilesData = await profilesData.json();
    let [userProfile] = profilesData.data.filter((data) => data.email === mail);
    setProfiles(userProfile);
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    values: {
      email: mail,
      ...profiles,
    },
  });

  //1ST TIME ENTER PROFILE========================================
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
      const res = await fetch(`${BASE_URL}/api/profile`, {
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
      getProfiles();
      setEditProfile(false);
    } catch (error) {
      setError('Error, try again');
      console.log('error', error);
    }
    console.log('values', payload);
  };

  //EDIT PROFILE ===============================================
  const onEditProfileSubmit = async (values) => {
    console.log('form hook edit==', values);
    let payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      hobby: values.hobby,
    };
    try {
      const res = await fetch(`${BASE_URL}/api/profile/${values._id}`, {
        method: 'PUT',
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
      getProfiles();
      setEditProfile(false);
    } catch (error) {
      setError('Error, try again');
      console.log('error', error);
    }
    console.log('values', payload);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        const updatedSession = await getSession(); // You can use getSession here if needed
        console.log('Updated Session:', updatedSession);
        setMail(updatedSession?.user?.email);
      }
    };

    fetchData();
    getProfiles();
  }, [session]);

  return (
    <div className="profile-outer flex justify-start">
      <div className="profile-pic bg-white rounded-xl h-80 w-60">pic</div>
      <div
        className={`${Style.profile_description_outer} ${editProfile && Style.edit_profile} ml-20`}
      >
        <h2 className="mb-5 text-xl font-semibold">Update your profile </h2>
        <form
          onSubmit={handleSubmit(
            profiles && Object.keys(profiles).length > 0 > 0 ? onEditProfileSubmit : onSubmit
          )}
        >
          <Suspense fallback={<Loader />}>
            <div className="profile-description mb-40">
              <div className="flex mb-2 ">
                <div className="w-24 ">
                  <label>Name:</label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    {...register('name')}
                    disabled={!editProfile}
                  />
                  {errors?.name && (
                    <p className="text-xs  bottom-[-20px] right-0 bg-red-700 px-2 pb-1">
                      {errors.name?.message}
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
                    {...register('email')}
                    disabled={!editProfile}
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
                  <input
                    type="text"
                    placeholder="Enter your mobile no"
                    {...register('phone')}
                    disabled={!editProfile}
                  />
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
                  <input
                    type="text"
                    placeholder="Enter your address"
                    {...register('address')}
                    disabled={!editProfile}
                  />
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
                  <textarea
                    type="text"
                    placeholder="Hobby"
                    {...register('hobby')}
                    disabled={!editProfile}
                  />
                  {errors?.hobby && (
                    <p className="text-xs  bottom-[-20px] right-0 bg-red-700 px-2 pb-1">
                      {errors.hobby?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Suspense>

          {editProfile && (
            <>
              <button
                type="submit"
                className="rounded-md bg-white text-black p-2  mb-5 w-52 hover:bg-slate-200"
              >
                Submit
              </button>

              <button
                type="button"
                className="rounded-md bg-red-300 text-black p-2  mb-5 w-52 hover:bg-red-400 ml-5"
                onClick={() => setEditProfile(false)}
              >
                Cancel
              </button>
            </>
          )}
        </form>
        {!editProfile && (
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
            <span className="ml-2 mt-1 cursor-pointer" onClick={() => setEditProfile(true)}>
              Edit Profile
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
