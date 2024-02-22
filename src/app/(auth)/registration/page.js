import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Registration() {
  return (
    <div>
      <form>
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

          <div className="flex justify-between mb-6 items-center">
            <div className="flex justify-between  items-center">
              <label className="w-[170px] block text-white text-md text-right">First Name:</label>
              <input
                type="text"
                className="py-2 px-4 rounded-md text-sm text-black ml-2"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex justify-between  items-center">
              <label className="w-[170px] block text-white text-md text-right">Last Name:</label>
              <input
                type="text"
                className="py-2 px-4 rounded-md text-sm text-black ml-2"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="flex justify-between mb-6 items-center">
            <div className="flex justify-between items-center">
              <label className="w-[170px] block text-white text-md text-right">Email Id:</label>
              <input
                type="text"
                className="py-2 px-4 rounded-md text-sm text-black ml-2"
                placeholder="Enter your email id"
              />
            </div>

            <div className="flex justify-between  items-center">
              <label className="w-[170px] block text-white text-md text-right">Phone No:</label>
              <input
                type="number"
                className="py-2 px-4 rounded-md text-sm text-black ml-2"
                placeholder="Enter your phone no"
              />
            </div>
          </div>

          <div className="flex justify-between mb-6 items-center">
            <div className="flex justify-between  items-center">
              <label className="w-[170px] block text-white text-md text-right">Password:</label>
              <input
                type="password"
                className="py-2 px-4 rounded-md text-sm text-black ml-2"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="w-[170px] block text-white text-md text-right">
                Confirm Password:
              </label>
              <input
                type="password"
                className="py-2 px-4 rounded-md text-sm text-black ml-2"
                placeholder="Retype your password"
              />
            </div>
          </div>
          <div className="flex  mb-6 items-center">
            <label className="w-[170px] block text-white text-md text-right">Gender:</label>
            <div class="flex items-center me-4">
              <input
                id="male"
                type="radio"
                value=""
                name="gender"
                class="w-4 h-4 ml-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="male" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Male
              </label>
            </div>
            <div class="flex items-center me-4">
              <input
                id="female"
                type="radio"
                value=""
                name="gender"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="female" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Female
              </label>
            </div>
          </div>
          <div className="text-center">
            <p className="mb-4 text-sm text-right italic">
              All the fields are required(<span className="text-xs align-top">*</span>).
            </p>
            <button type="submit" className="rounded-md bg-white text-black p-2  mb-5 w-52">
              Sign in
            </button>
            <p className=" text-sm">
              Already have an account?{' '}
              <Link href="/">
                <strong className="underline">Login</strong>
              </Link>{' '}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
