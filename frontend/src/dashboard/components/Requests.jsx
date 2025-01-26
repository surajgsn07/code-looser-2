import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import TeamInviteCard from "./RequestsComponent/RequestCard"; // Import the TeamInviteCard component
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon

const Requests = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  const acceptRequest = async (requestId) => {
    try {
      const response = await axiosInstance.post("/invite/accept", { requestId });
      if (response.data) {
        toast.success(response.data.message);
        fetchRequests();
      }
    } catch (error) {
      console.log("error : ", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      const response = await axiosInstance(`/invite/reject/${requestId}`);
      if (response.data) {
        toast.success(response.data.message);
        fetchRequests();
      }
    } catch (error) {
      console.log("error : ", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const fetchRequests = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axiosInstance("/invite/user");
      if (response.data) {
        setInvites(response.data.requests);
      }
    } catch (error) {
      console.log("error : ", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };


  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen  bg-gray-100 dark:bg-stone-900 p-6">
      <h1 className="text-2xl  font-bold text-stone-800 dark:text-white mb-6">Team Invitations</h1>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      )}

      {/* Invites List */}
      {!loading && (
        <div className="space-y-4 flex flex-wrap">
          {invites.map((invite) => (
            <TeamInviteCard
              key={invite._id}
              teamName={invite.team?.name}
              description={invite.team?.description}
              senderName={invite.from?.name}
              senderImage={invite.from?.avatar}
              onAccept={() => acceptRequest(invite._id)}
              onReject={() => rejectRequest(invite._id)}
              teamSize={invite.team?.size}
            />
          ))}
          {invites.length === 0 && <p className="text-gray-600 dark:text-gray-400">No invites found.</p>}
        </div>
      )}
    </div>
  );
};

export default Requests;