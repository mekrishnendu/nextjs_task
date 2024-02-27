'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function Navigation() {
  const pathName = usePathname();
  const { data: session } = useSession();

  console.log('session##', session);

  return (
    <header>
      <div className="flex justify-between items-center px-5 py-2">
        <div className="flex w-100 items-center">
          <Link href="#">
            <Image src="../images/logo.svg" alt="logo" width={50} height={50} className="mr-50" />
          </Link>
          <span className="ml-24">
            {session && <h4>Welcome {session.user?.name || session.user?.email} </h4>}
          </span>
        </div>
        <nav className="text-right">
          <ul className="text-gray-700 flex">
            <li>
              <a
                href="/dashboard"
                className={`flex justify-end mr-4 border-b-2 ${
                  pathName === '/dashboard' ? 'border-[#050DC9] text-[#050DC9]' : ' border-white'
                }`}
              >
                <span>Dashboard</span>
                <svg
                  class="w-5 ml-1"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="/about"
                className={`flex justify-end mr-4 border-b-2 ${
                  pathName === '/about' ? 'border-[#050DC9] text-[#050DC9]' : ' border-white'
                }`}
              >
                <span>About</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 ml-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className={`flex justify-end mr-4 border-b-2 ${
                  pathName === '/profile' ? 'border-[#050DC9] text-[#050DC9]' : ' border-white'
                }`}
              >
                <span>Profile</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 ml-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="/members"
                className={`flex justify-end mr-4 border-b-2 ${
                  pathName === '/members' ? 'border-[#050DC9] text-[#050DC9]' : ' border-white'
                }`}
              >
                <span>Members</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="/tasks"
                className={`flex justify-end mr-4 border-b-2 ${
                  pathName === '/tasks' ? 'border-[#050DC9] text-[#050DC9]' : ' border-white'
                }`}
              >
                <span>Task</span>
                <svg
                  class="w-5 ml-1"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </a>
            </li>
            {session ? (
              <li>
                <a
                  href="#"
                  className="flex justify-end mr-4 text-red-600 hover:text-red-800  border-b-2 border-white"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <span>Logout</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 ml-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                    />
                  </svg>
                </a>
              </li>
            ) : (
              <li>
                <a
                  href="#"
                  className="flex justify-end mr-4 text-red-600 hover:text-red-800  border-b-2 border-white"
                >
                  <span>Login</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 ml-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                    />
                  </svg>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
      {/*Header end*/}
    </header>
  );
}
