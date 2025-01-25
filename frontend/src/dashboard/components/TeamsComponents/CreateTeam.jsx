import React, { useState } from "react";
import MemberModal from "./MemberModal";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon

const CreateTeam = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [team, setteam] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const createTeam = async () => {
    if (!name || !description || !size) {
      toast.error("Please fill all the fields");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const response = await axiosInstance.post("/team/create", {
        name,
        description,
        size,
      });
      if (response.data) {
        toast.success("Team created successfully");
        setteam(response.data.team);
        setisModalOpen(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-lg bg-white text-stone-900 dark:bg-stone-900 dark:text-white">
      <h1 className="text-2xl font-semibold mb-4">Create a Team</h1>

      {/* Team Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Team Name</label>
        <input
          type="text"
          placeholder="Enter team name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-100 text-stone-900 border-gray-300 border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter team description"
          className="w-full px-4 py-2 rounded-lg bg-gray-100 text-stone-900 border-gray-300 border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
      </div>

      {/* Size */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Team Size</label>
        <input
          type="number"
          value={size}
          min={1}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Enter team size"
          className="w-full px-4 py-2 rounded-lg bg-gray-100 text-stone-900 border-gray-300 border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={createTeam}
        disabled={isLoading} // Disable button while loading
        className={`w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-800 rounded-lg text-white hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-900 transition flex items-center justify-center ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <FaSpinner className="animate-spin mr-2" /> // Spinner icon
        ) : null}
        {isLoading ? "Creating Team..." : "Create Team and Add Members"}
      </button>

      <MemberModal
        team={team}
        isOpen={isModalOpen}
        onClose={() => setisModalOpen(false)}
      />
    </div>
  );
};

export default CreateTeam;
