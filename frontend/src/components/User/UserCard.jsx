import React from "react";
import { IoMdMail } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
export default function ProfileCard({ user, setselecteduser  , setIsmakingRequest }) {
  return (
    <div className="relative p-3 max-w-sm mx-auto bg-white dark:bg-stone-900 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-stone-700">
      {/* Availability Badge */}

      {/* Trophy Icon */}
      <div className="absolute top-4 right-4">
        <div className="bg-yellow-400 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 12v-1.38a4 4 0 1 0-8 0V12m8-5v1m0 0h2.2c1.42 0 2.8 1.02 2.8 2.4v1.2a3 3 0 0 1-2.8 3h-1.4a7.5 7.5 0 0 1-5 2m6.4-6H20M4 10h2m0 0v5.18A3 3 0 0 0 4 18.6V15.9c0-1.38 1.38-2.4 2.8-2.4H8v-1.5a7.5 7.5 0 0 1 5-2m-5 6.5V15M8 15h8"
            />
          </svg>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center mt-6">
        <div className="h-24 w-24 rounded-full overflow-hidden border-4 bg-gradient-to-r from-cyan-500 to-blue-800">
          <img
            src={user?.avatar || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mt-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {user?.name}
        </h2>

        <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 text-sm mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11a2 2 0 100-4 2 2 0 000 4z"
            />
          </svg>
          <span>
            Based in:{" "}
            {user?.address?.city === undefined
              ? "NA"
              : `${user?.address?.city},${user?.address?.state} , ${user?.address?.country}`}{" "}
            {}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          {user?.bio?.slice(0, 100)}
        </p>
      </div>

      {/* View Profile Buttons */}
      <div className="mt-6 gap-1.5 mb-4 flex justify-around">
        <button
          onClick={() => setselecteduser(user)}
          className="bg-gradient-to-r from-cyan-500 to-blue-800 text-white px-4 py-2 text-sm font-medium rounded-full hover:bg-gradient-to-r hover:from-cyan-800 hover:to-blue-800 cursor-pointer flex items-center justify-center gap-2"
        >
          <CgProfile />
          View Profile
        </button>
        <button
          onClick={() => {setselecteduser(user)  
            setIsmakingRequest(true);
          }} className="bg-gradient-to-r from-cyan-500 to-blue-800 text-white px-4 py-2 text-sm font-medium rounded-full hover:bg-gradient-to-r hover:from-cyan-800 hover:to-blue-800 cursor-pointer flex items-center justify-center gap-2">
          <IoMdMail />
          Request
        </button>
      </div>
    </div>
  );
}
