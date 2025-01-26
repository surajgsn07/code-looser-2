import React, { useEffect, useState } from "react";
import UserCard from "../../components/User/UserCard";
import ModalWrapper from "../../common/ModalWrapper";
import { TbFilterCheck } from "react-icons/tb";
import Navbar from "../../components/Home/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import UserInfoPanel from "./TeamsComponents/UserInfoPanel";
import SelectTeamModal from "./SearchComponents/SelectTeamModal"
const Search = () => {
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    profile: [],
  });

  // const [isModalOpen, setisModalOpen] = useState(fals)
  const [isMakingRequest, setisMakingRequest] = useState(false)

  const [userData, setUserData] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedUser, setselectedUser] = useState(null);

  const [filteredUsers, setFilteredUsers] = useState(userData);
  const [profileInput, setProfileInput] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance("/user/all");
      if (response.data) {
        setUserData(response.data);
        setFilteredUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle changes in filters
  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = userData;

    if (filters.name) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter((user) =>
        user.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.profile.length > 0) {
      filtered = filtered.filter((user) =>
        filters.profile.includes(user.profile)
      );
    }

    setFilteredUsers(filtered);
  };
  console.log("filteredUsers", filteredUsers);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className=" bg-gray-100 dark:bg-stone-800 dark:text-gray-200 min-h-screen">
      <div className="dark:bg-stone-900 mb-8">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters for larger screens*/}
        <div className="bg-white hidden lg:block dark:bg-stone-900 sticky p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-6">Search Filters</h2>

          {/* Name Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              placeholder="Enter name"
              value={filters.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />
          </div>

          {/* Location Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              placeholder="Enter location"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Profile</label>
            <div className="relative">
              {/* Input field for typing profile */}
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                placeholder="Search or add a profile"
                value={profileInput}
                onChange={(e) => setProfileInput(e.target.value)}
              />
            </div>

            {/* Selected profiles as chips */}
            <div className="flex flex-wrap gap-2 mt-2"></div>
          </div>

          {/* Apply Filters Button */}
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>

        {/* Filters for smaller screens */}
        <div className="lg:hidden">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            onClick={() => setisModalOpen(true)}
          >
            <TbFilterCheck className="inline-block mr-2" />
            Filter
          </button>
        </div>

        {
          <ModalWrapper open={isModalOpen} setOpenModal={setisModalOpen}>
            <div className="bg-white lg:hidden dark:bg-stone-900 sticky p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-6">Search Filters</h2>

              {/* Name Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Enter name"
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                />
              </div>

              {/* Location Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Profile
                </label>
                <div className="relative">
                  {/* Input field for typing profile */}
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                    placeholder="Search or add a profile"
                    value={profileInput}
                    onChange={(e) => setProfileInput(e.target.value)}
                  />
                </div>

                {/* Selected profiles as chips */}
                <div className="flex flex-wrap gap-2 mt-2"></div>
              </div>

              {/* Apply Filters Button */}
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </ModalWrapper>
        }

        {/* Filtered Results */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <UserCard
              setselecteduser={setselectedUser}
              key={index}
              user={user}
              setIsmakingRequest={setisMakingRequest}
            />
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center col-span-full">
              No users match your search criteria.
            </p>
          )}
        </div>
      </div>
      <div className="mt-12">
        <UserInfoPanel
          user={selectedUser}
          onClose={() => setselectedUser(null)}
        />
      </div>


      <SelectTeamModal selectedUser={selectedUser} open={isMakingRequest} onClose={() => {setisMakingRequest(false)
        setselectedUser(null)
      }} />
    </div>
  );
};

export default Search;
