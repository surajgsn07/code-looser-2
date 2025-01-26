import React from 'react';

const TeamModal = ({ team, closeModal, handleJoinTeam }) => {
    
  return (
    <div className="fixed backdrop-blur-sm inset-0 flex bg-opacity-50 justify-center items-center z-50  bg-opacity-50 ">
      <div className="bg-white dark:bg-stone-900 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">{team.name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{team.description}</p>
        
        <h3 className="text-lg font-medium mb-2">Team Members</h3>
        <div className="flex flex-wrap space-x-2 mb-6">
          {team.members.map((member, index) => (
            <img
              key={index}
              src={member.avatar}
              alt={member.name}
              className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700"
            />
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={()=>handleJoinTeam(team._id)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Join Team
          </button>
          <button
            onClick={closeModal}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
