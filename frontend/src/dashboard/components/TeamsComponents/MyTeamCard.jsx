import React from "react";
import { FaTrashAlt } from "react-icons/fa";  // Importing the trash icon from react-icons

const TeamCard = ({ teamName, description, members, onDelete }) => {
  const renderMemberImages = () => {
    const displayedMembers = members.slice(0, 4); // Show only the first 4 members
    const remainingCount = members.length - 4;
    console.log({members})

    return (
      <div className="flex items-center space-x-2">
        {displayedMembers.map((member, index) => (
          <img
            key={index}
            src={member.avatar}
            alt={member.name}
            className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
          />
        ))}
        {remainingCount > 0 && (
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-sm font-medium border-2 border-white dark:border-gray-700">
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-sm min-w-[300px] mb-10 bg-white dark:bg-stone-900 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl border border-zinc-300 dark:border-zinc-800 flex flex-col h-[280px]">
      {/* Card Header */}
      <div className="px-6 py-4 flex-shrink-0">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-white">{teamName}</h2>
      </div>

      {/* Card Body */}
      <div className="px-6 py-4 flex-grow">
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>

        {/* Members */}
        <div>
          <p className="text-gray-800 dark:text-gray-100 font-medium mb-2">Members:</p>
          <div className="flex items-center space-x-2">{renderMemberImages()}</div>
        </div>
      </div>

      {/* Card Footer - Delete Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={onDelete}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 flex items-center justify-center"
        >
          <FaTrashAlt size={18} />
        </button>
      </div>
    </div>
  );
};

export default TeamCard;
