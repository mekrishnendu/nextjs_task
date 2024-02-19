import React from 'react';
import './profile.module.scss';

export default function Profile() {
  return (
    <div className="profile-outer flex justify-start">
      <div className="profile-pic bg-white rounded-xl h-80 w-60">pic</div>
      <div className="profile-description-outer ml-20">
        <div className="profile-description mb-40">
          <div className="flex mb-2">
            <div className="w-24">
              <strong>Name:</strong>
            </div>
            <div>David Doe</div>
          </div>

          <div className="flex mb-2">
            <div className="w-24">
              <strong>Email:</strong>
            </div>
            <div>david_doe@mailinator.com</div>
          </div>

          <div className="flex mb-2">
            <div className="w-24">
              <strong>Phone No:</strong>
            </div>
            <div>8923569856</div>
          </div>

          <div className="flex mb-2">
            <div className="w-24">
              <strong>Hobby:</strong>
            </div>
            <div>Hobby: Movie, Playing games, Music</div>
          </div>

          <div className="flex mb-2">
            <div className="w-24">
              <strong>Address:</strong>
            </div>
            <div>4 Lindsay Street, Kolkata, West Bengal</div>
          </div>
        </div>
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
