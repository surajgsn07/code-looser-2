import React from "react";

const TeamInviteCard = ({
  teamName,
  description,
  senderName,
  senderImage,
  teamSize,
  onAccept,
  onReject,
}) => {
  return (
    <div className="max-w-sm mx-auto min-w-[300px] mb-10 bg-white dark:bg-stone-900 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl border border-zinc-300 dark:border-zinc-800">
      {/* Card Header */}
      <div className="px-6 py-4 ">
        <h2 className="text-2xl font-bold text-white">{teamName}</h2>
        <p className="text-sm text-white opacity-90">Team Size: {teamSize} members</p>
      </div>

      {/* Card Body */}
      <div className="px-6 py-4">
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>

        {/* Sender's Picture and Name */}
        <div className=" flex flex-col gap-1.5 justify-between  items-center">
          <img
            src={senderImage}
            alt={senderName}
            className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
          />
          <div className="ml-3">
            <p className="text-gray-800 text-align-center dark:text-gray-100 font-medium">{senderName}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Invited you to join</p>
          </div>
        </div>
      </div>

      {/* Card Footer - Buttons */}
      <div className="flex justify-between px-4 py-4 bg-gray-50 dark:bg-stone-800 border-t border-zinc-300 dark:border-zinc-700">
        <button
          onClick={onReject}
          className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-800 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 flex items-center justify-center"
        >
          <span>Reject</span>
        </button>
        <button
          onClick={onAccept}
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-800 text-white rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-800 transition duration-200 flex items-center justify-center"
        >
          <span>Accept</span>
        </button>
      </div>
    </div>
  );
};

export default TeamInviteCard;