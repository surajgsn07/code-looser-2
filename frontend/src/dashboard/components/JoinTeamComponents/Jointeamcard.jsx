import React, { useState } from 'react';


const TeamCard = ({ team, setSelectedTeam , joinTeamFunction }) => {
  // Dummy member data with avatar images
  const membersWithAvatars = team.members;
    
  
  const handleJoinTeam = (e) => {
    e.stopPropagation();
    console.log("first")
    joinTeamFunction(team._id)
  }

  const renderMemberImages = () => {
    const displayedMembers = membersWithAvatars.slice(0, 4); // Show only the first 4 members
    const remainingCount = membersWithAvatars.length - 4;

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
    <div
    
      className="bg-white p-6 dark:bg-stone-900  rounded-lg shadow-md hover:shadow-lg cursor-pointer"
      onClick={() =>{ setSelectedTeam(team) 
        }}
    >
      <h3 className="text-lg font-semibold">{team.name}</h3>
      <p className="text-sm text-gray-600">{team.description}</p>
      <div className="mt-4">{renderMemberImages()}</div>
      <div className="mt-4">
        <button
          onClick={(e)=>handleJoinTeam(e)}
          className="bg-gradient-to-r from-cyan-500 to-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Join Team
        </button>
      </div>
      
    </div>
  );
};

export default TeamCard;
