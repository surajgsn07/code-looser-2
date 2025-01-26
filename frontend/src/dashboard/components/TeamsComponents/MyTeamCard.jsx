import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";  // Importing the trash icon from react-icons
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import UserInfoPanel from "./UserInfoPanel";

const TeamCard = ({ teamId,teamName, description, members, onDelete ,size , setTeams}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [activeTab, setActiveTab] = useState("details"); // State to control which tab is active
  const [formData, setformData] = useState({
    name: teamName,
    description: description,
    size: size,
  })
  const [loading, setLoading] = useState(false); 
  const [requests, setrequests] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  
  const fetchTeamRequests = async () => {
    try {
      const response = await axiosInstance.get(`/joinRequest/get/${teamId}`);
      if(response.data){
        console.log(response.data.requests);
        setrequests(response.data.requests)
      }
      return response.data.requests;
    } catch (error) {
      console.error("Error fetching team requests:", error);
    }
  };

  const renderMemberImages = () => {
    const displayedMembers = members.slice(0, 4); // Show only the first 4 members
    const remainingCount = members.length - 4;

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

  const handleModalOpen = () => {
    setIsModalOpen(true); // Open modal when card is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Switch between 'details' and 'requests' tabs
  };

  const updateTeam = async() => {

    setLoading(true); // Start loading
    try {
        const response = await axiosInstance.post(`/team/update/${teamId}`, formData);
        if (response.data) {
            toast.success("Team updated successfully");
            setTeams((prevTeams) => prevTeams.map((team) => team._id === teamId ? response.data.team : team));
            handleModalClose();
        }
    } catch (error) {
        toast.error("Failed to update team");
    }finally{
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamRequests();
  }, [])

  const acceptRequest = async (requestId) => {
    try {
        setLoading(true);
      const response = await axiosInstance.get(`/joinRequest/accept/${requestId}`);
      if (response.data) {
        setrequests(requests.filter((request) => request._id !== requestId));
        toast.success(response.data.message);
        fetchTeamRequests();
      }
    } catch (error) {
      console.log("error : ", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }finally{
        setLoading(false);
    }
  };
  

  return (
    <>
      {/* Team Card */}
      <div
        className="max-w-sm min-w-[300px] mb-10 bg-white dark:bg-stone-900 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl border border-zinc-300 dark:border-zinc-800 flex flex-col h-[280px]"
        onClick={handleModalOpen}
      >
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-lg max-w-lg w-full relative">
            {/* Modal Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute top-4 w-9 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              X
            </button>

            {/* Tabs */}
            <div className="flex border-b-2 mb-4">
              <button
                onClick={() => handleTabChange("details")}
                className={`px-4 py-2 font-medium ${activeTab === "details" ? "border-b-2 border-blue-500" : ""}`}
              >
                Team Details
              </button>
              <button
                onClick={() => handleTabChange("requests")}
                className={`px-4 py-2 font-medium ${activeTab === "requests" ? "border-b-2 border-blue-500" : ""}`}
              >
                Requests
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "details" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Edit Team Details</h3>
                <form onSubmit={(e) =>{ e.preventDefault()

                  updateTeam();
                }} >
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Team Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setformData({ ...formData, name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setformData({ ...formData, description: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    />
                  </div>

                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Size</label>
                    <input
                      type="Number"
                      value={formData.size}
                      onChange={(e) => setformData({ ...formData, size: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    />
                  </div>
                  <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-800 text-white py-2 px-4  w-full rounded-xl cursor-pointer" >{loading ? "Updating..." : "Update"} </button>
                </form>
              </div>
            )}

            {activeTab === "requests" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Team Requests</h3>
                {/* Display requests here */}
                <ul>
                    {requests.map((request) => (
                      <li key={request._id} className="mb-4 cursor-pointer" onClick={() => setSelectedUser(request.from)}>
                            <div className="flex justify-between" >
                            <div className="flex items-center">
                                <img src={request.from?.avatar} alt={request.name} className="w-10 h-10 rounded-full mr-4" />
                                <div>
                                    <p className="text-gray-800 dark:text-gray-100 font-medium">{request.from?.name}</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{request.from?.email}</p>
                                </div>
                            </div>
                            <div>
                                <button className="bg-gradient-to-r from-cyan-500 to-blue-800 text-white py-2 px-4 rounded-lg cursor-pointer" onClick={() => acceptRequest(request._id)} >{loading ? "Accepting..." : "Accept"}</button>
                            </div>
                            </div>
                        </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          {
            <UserInfoPanel user={selectedUser} onClose={() => setSelectedUser(null)} />
          }
        </div>
      )}
    </>
  );
};

export default TeamCard;
