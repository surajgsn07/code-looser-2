import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userData } from '../../../recoil/states';

export default function ProfileIcon() {
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [currentUserData, setUserData] = useRecoilState(userData);

  const toggleInfo = () => {
    setInfoVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Profile Icon */}
      <div
        className="w-10 h-10 rounded-full bg-stone-200  border overflow-hidden border-zinc-300 cursor-pointer"
        onClick={toggleInfo}
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={currentUserData?.avatar ||
            "https://static-00.iconduck.com/assets.00/avatar-default-icon-1975x2048-2mpk4u9k.png"}

          alt="Profile"
        />
      </div>

      {/* Info Section */}
      {isInfoVisible && (
        <div className="absolute top-12 right-0 w-64 p-4 bg-white dark:bg-stone-900 rounded-lg shadow-lg border border-gray-200
        dark:text-gray-100 text-stone-800 dark:border-stone-800 z-10">
          <div className="text-lg font-bold">{currentUserData?.name || '-login please'}</div>
          <div className="text-sm  text-emerald-800 dark:text-emerald-400">{currentUserData?.role}</div>
          {currentUserData?.role==="student" &&<div className="text-sm  mt-1">ID: {currentUserData?.rollNumber}</div>}
         { currentUserData?.role!=="student" && <div className="text-sm  mt-1">{currentUserData?.email}</div>}
          <div className="text-sm   mt-1">Block - {currentUserData?.block}</div>
        </div>
      )}
    </div>
  );
}
