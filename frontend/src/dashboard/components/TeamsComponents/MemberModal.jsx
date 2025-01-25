import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import axiosInstance from "../../../utils/axiosInstance";
import UserInfoPanel from "./UserInfoPanel"; // Import the new component
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa"; // Import the loading spinner icon

const MemberModal = ({ isOpen, onClose, team }) => {
  const [activeTab, setActiveTab] = useState("pastMembers");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pastMembers, setPastMembers] = useState([]);
  const [newMembers, setNewMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user

  // Loading states
  const [isFetchingPastMembers, setIsFetchingPastMembers] = useState(false);
  const [isSearchingNewMembers, setIsSearchingNewMembers] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);

  const skills = ["JavaScript", "React", "Node.js", "Python", "Design"];
  const locations = ["New York", "San Francisco", "London", "Berlin", "Remote"];

  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const handleSkillChange = (event, { newValue }) => {
    if (newValue !== undefined) setSelectedSkill(newValue);
  };

  const handleLocationChange = (event, { newValue }) => {
    if (newValue !== undefined) setSelectedLocation(newValue);
  };

  const getSkillSuggestions = (value) => {
    const inputValue = value?.trim()?.toLowerCase();
    const inputLength = inputValue?.length;

    return inputLength === 0
      ? []
      : skills.filter((skill) => skill?.toLowerCase().indexOf(inputValue) !== -1);
  };

  const getLocationSuggestions = (value) => {
    const inputValue = value?.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : locations.filter((location) => location.toLowerCase().indexOf(inputValue) !== -1);
  };

  const handleSearch = async () => {
    setIsSearchingNewMembers(true); // Start loading
    try {
      await fetchNewMembers();
    } catch (error) {
      console.log("error : ", error);
    } finally {
      setIsSearchingNewMembers(false); // Stop loading
    }
  };

  const handleAddMember = async (e, id) => {
    e.stopPropagation();
    setIsAddingMember(true); // Start loading
    try {
      const response = await axiosInstance.post(`/invite/create`, {
        to: id,
        team: team._id,
      });

      if (response.data) {
        toast.success(response.data.message);
        setNewMembers(newMembers.filter((member) => member._id !== id));
      }
    } catch (error) {
      console.log("error : ", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsAddingMember(false); // Stop loading
    }
  };

  const fetchPastMembers = async () => {
    setIsFetchingPastMembers(true); // Start loading
    try {
      const response = await axiosInstance("/user/past-members");
      if (response.data) {
        setPastMembers(response.data);
      }
    } catch (error) {
      console.log("error : ", error);
    } finally {
      setIsFetchingPastMembers(false); // Stop loading
    }
  };

  const fetchNewMembers = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("name", searchQuery);
      if (selectedSkill) params.append("skill", selectedSkill);
      if (selectedLocation) params.append("location", selectedLocation);
      const response = await axiosInstance.get(`/user/search?${params.toString()}`);
      if (response.data) {
        setNewMembers(response.data.users);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    fetchPastMembers();
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-stone-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-stone-800 text-stone-900 dark:text-white w-full max-w-3xl rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center border-b border-stone-300 dark:border-stone-700 pb-3">
            <h2 className="text-xl font-semibold">Manage Members</h2>
            <button
              className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              onClick={onClose}
            >
              ✖
            </button>
          </div>

          <div className="flex border-b border-stone-300 dark:border-stone-700 mt-4">
            <button
              onClick={() => setActiveTab("pastMembers")}
              className={`px-4 py-2 ${
                activeTab === "pastMembers"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Past Members
            </button>
            <button
              onClick={() => setActiveTab("newMembers")}
              className={`px-4 py-2 ${
                activeTab === "newMembers"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              New Members
            </button>
          </div>

          <div className="mt-4">
            {activeTab === "pastMembers" && (
              <div>
                <h3 className="text-lg font-medium mb-3">Past Members</h3>
                <div className="space-y-4 max-h-[300px] overflow-y-scroll">
                  {isFetchingPastMembers ? (
                    <div className="flex justify-center items-center py-4">
                      <FaSpinner className="animate-spin text-blue-500 text-2xl" />
                    </div>
                  ) : pastMembers.length > 0 ? (
                    pastMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between bg-stone-100 dark:bg-stone-700 px-4 py-3 rounded-lg shadow-md"
                        onClick={() => setSelectedUser(member)} // Set the selected user
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src="/placeholder.jpg"
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover border border-stone-300 dark:border-stone-600"
                          />
                          <div>
                            <h4 className="text-lg font-medium text-stone-900 dark:text-white">
                              {member.name}
                            </h4>
                          </div>
                        </div>
                        <button
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-800  text-white rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-800 transition disabled:opacity-50"
                          onClick={(e) => handleAddMember(e, member._id)}
                          disabled={isAddingMember} // Disable button while adding
                        >
                          {isAddingMember ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            "Add"
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-stone-500 dark:text-stone-400 text-center">
                      No past members found.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "newMembers" && (
              <div>
                <h3 className="text-lg font-medium mb-3">Search New Members</h3>
                <div className="space-y-3 mb-5">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="">
                      <Autosuggest
                        suggestions={skillSuggestions}
                        onSuggestionsFetchRequested={({ value }) =>
                          setSkillSuggestions(getSkillSuggestions(value))
                        }
                        onSuggestionsClearRequested={() => setSkillSuggestions([])}
                        onSuggestionSelected={handleSkillChange}
                        getSuggestionValue={(suggestion) => suggestion}
                        renderSuggestion={(suggestion) => (
                          <div className="text-stone-900 dark:text-white">{suggestion}</div>
                        )}
                        inputProps={{
                          placeholder: "Filter by Skill",
                          value: selectedSkill || "",
                          onChange: handleSkillChange,
                          className:
                            "w-full px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-white border border-stone-300 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        }}
                      />
                    </div>

                    <div className="">
                      <Autosuggest
                        suggestions={locationSuggestions}
                        onSuggestionsFetchRequested={({ value }) =>
                          setLocationSuggestions(getLocationSuggestions(value))
                        }
                        onSuggestionsClearRequested={() => setLocationSuggestions([])}
                        onSuggestionSelected={handleLocationChange}
                        getSuggestionValue={(suggestion) => suggestion}
                        renderSuggestion={(suggestion) => (
                          <div className="text-stone-900 dark:text-white">{suggestion}</div>
                        )}
                        inputProps={{
                          placeholder: "Filter by Location",
                          value: selectedLocation || "",
                          onChange: handleLocationChange,
                          className:
                            "w-full px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-white border border-stone-300 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        }}
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Enter member name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-white border border-stone-300 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSearch}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-800 text-white rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-800 transition disabled:opacity-50"
                      disabled={isSearchingNewMembers} // Disable button while searching
                    >
                      {isSearchingNewMembers ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Search"
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-scroll">
                  {newMembers.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center justify-between bg-stone-100 dark:bg-stone-700 px-4 py-3 rounded-lg shadow-md"
                      onClick={() => setSelectedUser(member)} // Set the selected user
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={member?.avatar}
                          alt={member?.name}
                          className="w-12 h-12 rounded-full object-cover border border-stone-300 dark:border-stone-600"
                        />
                        <div>
                          <h4 className="text-lg font-medium text-stone-900 dark:text-white">
                            {member?.name}
                          </h4>
                          <p className="text-sm text-stone-500 dark:text-stone-400">
                            {member?.bio}
                          </p>
                        </div>
                      </div>
                      <button
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-800 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                        onClick={(e) => handleAddMember(e, member._id)}
                        disabled={isAddingMember} // Disable button while adding
                      >
                        {isAddingMember ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          "Add"
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render the UserInfoPanel if a user is selected */}
      {selectedUser && (
        <UserInfoPanel
          user={selectedUser}
          onClose={() => setSelectedUser(null)} // Close the panel
        />
      )}
    </>
  );
};

export default MemberModal;