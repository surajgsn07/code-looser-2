import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { BiLoaderAlt } from "react-icons/bi"; // Import the loader icon

const TeamRequestModal = ({ selectedUser, open, onClose }) => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState([]);
  const [isFetchingTeams, setIsFetchingTeams] = useState(false); // Loader for fetching teams
  const [isSendingRequest, setIsSendingRequest] = useState(false); // Loader for sending request

  // Fetch teams when the modal is opened
  useEffect(() => {
    if (open) {
      const fetchTeams = async () => {
        setIsFetchingTeams(true);
        try {
          const response = await axiosInstance.get("/team/user");
          if (response.data?.teams) {
            setTeams(response.data.teams);
          }
        } catch (error) {
          console.error("Error fetching teams:", error);
          toast.error("Failed to fetch teams");
        } finally {
          setIsFetchingTeams(false);
        }
      };

      fetchTeams();
    }
  }, [open]);

  // Early return if the modal is closed
  if (!open) return null;

  const handleSendRequest = async () => {
    if (!selectedTeam) {
      toast.error("Please select a team");
      return;
    }

    setIsSendingRequest(true);
    try {
      const response = await axiosInstance.post(`/invite/create`, {
        to: selectedUser._id,
        team: selectedTeam,
      });

      if (response.data) {
        toast.success(response.data.message);
        setSelectedTeam("");
        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSendingRequest(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white to-stone-100 dark:from-stone-800 dark:to-stone-900 text-stone-900 dark:text-white w-96 p-6 shadow-2xl rounded-lg">
        <div className="flex justify-between items-center border-b border-stone-200 dark:border-stone-700 pb-4">
          <h2 className="text-2xl font-bold">Send Request</h2>
          <button
            className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors duration-200"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <div className="mt-6">
          <label className="block text-stone-600 dark:text-stone-300 mb-2 font-medium">
            Select a Team
          </label>
          {isFetchingTeams ? (
            <div className="flex justify-center items-center">
              <BiLoaderAlt className="text-3xl animate-spin text-blue-500" />
            </div>
          ) : (
            <select
              className="w-full px-4 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="">-- Select Team --</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mt-6">
          <button
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex justify-center items-center"
            onClick={handleSendRequest}
            disabled={isSendingRequest}
          >
            {isSendingRequest ? (
              <BiLoaderAlt className="text-2xl animate-spin mr-2" />
            ) : (
              "Send Request"
            )}
            {isSendingRequest && "Sending..."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamRequestModal;
