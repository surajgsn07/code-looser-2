import React from "react";

const UserInfoPanel = ({ user, onClose }) => {
  if (!user) return null;

  console.log({user})

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-end z-50">
      <div className="bg-gradient-to-br from-white to-stone-100 dark:from-stone-800 dark:to-stone-900 text-stone-900 dark:text-white w-96 h-full p-6 shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center border-b border-stone-200 dark:border-stone-700 pb-4">
          <h2 className="text-2xl font-bold">User Information</h2>
          <button
            className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors duration-200"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <div className="mt-6">
          <div className="flex items-center space-x-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-stone-700 shadow-lg"
            />
            <div>
              <h4 className="text-2xl font-semibold text-stone-900 dark:text-white">
                {user.name}
              </h4>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                {user.bio}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Details</h3>
            <div className="space-y-3">
              <p className="text-stone-600 dark:text-stone-300">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className="text-stone-600 dark:text-stone-300">
                <span className="font-medium">Location:</span> 

                {user.address?.city === "undefined" ? "" : user.address?.city}{' '}
                {user.address?.state === "undefined" ? "" : user.address?.state}{' '}
                {user.address?.country === "undefined" ? "" : user.address?.country}

                {user.address?.city === "undefined" && user.address?.state === "undefined" && user.address?.country === "undefined" ? "NA" : ""}

                {}


              </p>
              <p className="text-stone-600 dark:text-stone-300">
                <span className="font-medium">Skills:</span> {user.skills?.join(", ").trim() === "" ? "None" : user.skills?.join(", ").trim()} 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPanel;