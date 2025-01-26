import React, { useEffect, useState } from "react";
import Navbar from "../../components/Home/Navbar";
import TeamCard from "./JoinTeamComponents/Jointeamcard";
import { TbFilterCheck } from "react-icons/tb";
import ModalWrapper from "../../common/ModalWrapper";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import TeamModal from "./JoinTeamComponents/TeamModal";

const JoinTeam = () => {
  const [filters, setFilters] = useState({
    name: "",
    members: "",
    description:""
  });
  const [selectedTeam, setselectedTeam] = useState(null)
  const [loading, setloading] = useState(false);

  const joinTeamFunction = async(teamId) => {
    try {
        setloading(true);
        const response =await axiosInstance.get(`/joinRequest/create/${teamId}`);
        if(response.data){
            setFilteredTeams(filteredTeams.filter((team) => team._id !== teamId))
            toast.success(response.data.message)
            setselectedTeam(null)
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
    }finally{
        setloading(false)
    }
  }

  const [teams, setteams] = useState([])

  const [filteredTeams, setFilteredTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const applyFilters = () => {
    const filtered = teams.filter((team) => {
      return (
        team.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.members === "" || team.members.some((member) =>
          member.name.toLowerCase().includes(filters.members.toLowerCase())
        )) &&
        team.description.toLowerCase().includes(filters.description.toLowerCase())
      );
    });
    setFilteredTeams(filtered);
    setIsModalOpen(false);
  };


  const fetchTeams = async () => {
    try {
      const response = await axiosInstance.get("/team/all");
      if (response.data) {
        setteams(response.data.teams);
        setFilteredTeams(response.data.teams);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [])

  if(loading){
    return(
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }
  

  return (
    <div className="bg-gray-100 dark:bg-stone-800 dark:text-gray-200 min-h-screen">
      <div className="dark:bg-stone-900 mb-8">
        <Navbar />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white hidden lg:block dark:bg-stone-900 sticky p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-6">Search Filters</h2>

          {/* Name Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              placeholder="Enter team name"
              value={filters.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />
          </div>
          
          <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Enter Interest</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                placeholder="Enter interest"
                value={filters.description}
                onChange={(e) => handleFilterChange("description", e.target.value)}
              />
            </div>

          {/* Members Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Members</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              placeholder="Enter member name"
              value={filters.members}
              onChange={(e) => handleFilterChange("members", e.target.value)}
            />
          </div>

          {/* Apply Filters Button */}
          <button
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>

        <div className="lg:hidden">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            onClick={() => setIsModalOpen(true)}
          >
            <TbFilterCheck className="inline-block mr-2" />
            Filter
          </button>
        </div>

        <ModalWrapper open={isModalOpen} setOpenModal={setIsModalOpen}>
          <div className="bg-white lg:hidden dark:bg-stone-900 sticky p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-6">Search Filters</h2>

            {/* Name Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                placeholder="Enter team name"
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Enter Interest</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                placeholder="Enter interest"
                value={filters.description}
                onChange={(e) => handleFilterChange("description", e.target.value)}
              />
            </div>

            {/* Members Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Members</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                placeholder="Enter member name"
                value={filters.members}
                onChange={(e) => handleFilterChange("members", e.target.value)}
              />
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

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team, index) => (
            <TeamCard joinTeamFunction={joinTeamFunction} key={index} team={team} setSelectedTeam={setselectedTeam}/>
          ))}

          {filteredTeams.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center col-span-full">
              No teams match your search criteria.
            </p>
          )}
        </div>
      </div>

      {selectedTeam && <TeamModal isOpen={isModalOpen} team={selectedTeam} closeModal={()=>{setselectedTeam(null)}} handleJoinTeam={joinTeamFunction}  />}
      
    </div>
  );
};

export default JoinTeam;
