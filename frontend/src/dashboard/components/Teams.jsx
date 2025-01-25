import React, { useState } from "react";
import CreateTeam from "./TeamsComponents/CreateTeam";

const Teams = () => {
  const [activeTab, setActiveTab] = useState("My Teams");

  return (
    <div className="w-full bg-white text-stone-900 dark:bg-stone-900 dark:text-white rounded-lg shadow-lg">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-stone-100 dark:bg-stone-800">
        {/* My Teams Tab */}
        <button
          className={`flex-1 py-3 text-center text-lg font-medium ${
            activeTab === "My Teams"
              ? "border-b-4 border-stone-500 text-stone-900 dark:text-white"
              : "text-gray-500 hover:text-stone-900 dark:text-gray-400 dark:hover:text-white"
          }`}
          onClick={() => setActiveTab("My Teams")}
        >
          My Teams
        </button>

        {/* Create Team Tab */}
        <button
          className={`flex-1 py-3 text-center text-lg font-medium ${
            activeTab === "Create Team"
              ? "border-b-4 border-stone-500 text-stone-900 dark:text-white"
              : "text-gray-500 hover:text-stone-900 dark:text-gray-400 dark:hover:text-white"
          }`}
          onClick={() => setActiveTab("Create Team")}
        >
          Create Team
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === "My Teams" ? (
          <div>
            <h1 className="text-xl font-semibold mb-2">My Teams</h1>
            <p className="text-gray-700 dark:text-gray-300">
              Here is the list of all your teams.
            </p>
          </div>
        ) : (
          <div>
            <CreateTeam />
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
