import React from 'react';
import Image from 'next/image';

export default function Members() {
  return (
    <div className="member-outer">
      <div class="grid grid-cols-3 text-center gap-8">
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
        </div>
      </div>
    </div>
  );
}
