import React from 'react';
import Image from 'next/image';
import { Suspense } from 'react';
import Loader from '@/app/components/loader';

async function getUsers() {
  //API DRVELOPED IN NEXTJS
  try {
    let res = await fetch('http://localhost:3000/api/register');
    res = await res.json();
    console.log('students=====', res);
    return res.data;
  } catch (error) {
    console.log('error1=====', error);
  }
}

export default async function Members() {
  const users = await getUsers();

  return (
    <div className="member-outer">
      <div class="grid grid-cols-3 text-center gap-8">
        <Suspense fallback={<Loader />}>
          {users.map((user) => (
            <>
              <div
                className="member-info text-center  bg-white text-black rounded-full w-60 h-60 mb-10"
                key={user.id}
              >
                <div className="rounded-full mt-10 mb-4">
                  <Image
                    src={`/images/${user.gender === 'male' ? 'man' : 'women'}.png`}
                    width={72}
                    height={72}
                    alt="Picture of the author"
                    className="rounded-full inline-block"
                  />
                </div>
                <ul className="list-image-none text-xs font-[#0D0D0D]">
                  <li>
                    <strong>Name:</strong> {user.firstName} {user.lastName}
                  </li>
                  <li>
                    <strong>Email:</strong> {user.email}
                  </li>
                  <li>
                    <strong>Phone:</strong>&nbsp;
                    {user.phone}
                  </li>
                </ul>
              </div>
            </>
          ))}
        </Suspense>

        {/* <div className="member-info text-center  bg-white text-black rounded-full w-60 h-60 mb-10">
          <div className="rounded-full mt-10 mb-4">
            <Image
              src="/images/man.png"
              width={72}
              height={72}
              alt="Picture of the author"
              className="rounded-full inline-block"
            />
          </div>
          <ul className="list-image-none text-xs font-[#0D0D0D]">
            <li>
              <strong>Name:</strong> David Doe
            </li>
            <li>
              <strong>Email:</strong> david_doe@mailinator.com
            </li>
            <li>
              <strong>Phone:</strong> 8923569856
            </li>
          </ul>
        </div>
        <div className="member-info text-center  bg-white text-black rounded-full w-60 h-60 mb-10">
          <div className="rounded-full mt-10 mb-4">
            <Image
              src="/images/women.png"
              width={72}
              height={72}
              alt="Picture of the author"
              className="rounded-full inline-block"
            />
          </div>
          <ul className="list-image-none text-xs font-[#0D0D0D]">
            <li>
              <strong>Name:</strong> David Doe
            </li>
            <li>
              <strong>Email:</strong> david_doe@mailinator.com
            </li>
            <li>
              <strong>Phone:</strong> 8923569856
            </li>
          </ul>
        </div>
        <div className="member-info text-center  bg-white text-black rounded-full w-60 h-60 mb-10">
          <div className="rounded-full mt-10 mb-4">
            <Image
              src="/images/man.png"
              width={72}
              height={72}
              alt="Picture of the author"
              className="rounded-full inline-block"
            />
          </div>
          <ul className="list-image-none text-xs font-[#0D0D0D]">
            <li>
              <strong>Name:</strong> David Doe
            </li>
            <li>
              <strong>Email:</strong> david_doe@mailinator.com
            </li>
            <li>
              <strong>Phone:</strong> 8923569856
            </li>
          </ul>
        </div>
        <div className="member-info text-center  bg-white text-black rounded-full w-60 h-60 mb-10">
          <div className="rounded-full mt-10 mb-4">
            <Image
              src="/images/women.png"
              width={72}
              height={72}
              alt="Picture of the author"
              className="rounded-full inline-block"
            />
          </div>
          <ul className="list-image-none text-xs font-[#0D0D0D]">
            <li>
              <strong>Name:</strong> David Doe
            </li>
            <li>
              <strong>Email:</strong> david_doe@mailinator.com
            </li>
            <li>
              <strong>Phone:</strong> 8923569856
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
