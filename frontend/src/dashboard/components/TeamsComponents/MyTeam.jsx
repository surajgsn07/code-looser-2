import React, { useEffect, useState } from 'react'
import TeamCard from './MyTeamCard';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';


const MyTeam = () => {

    
  const [teams, setteams] = useState([])
  const [isLoading, setisLoading] = useState(false)

  const fetchTeams = async () => {
    try {
        setisLoading(true)
      const response = await axiosInstance.get("/team/user");
      if(response.data){
        setteams(response.data.teams)
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }finally{
        setisLoading(false)
    }
  };
  


  

  const handleDelete = async(teamId) => {
    setisLoading(true)
    try {
        const response = await axiosInstance.get(`/team/delete/${teamId}`);
        if(response.data){
            setteams(teams.filter((team) => team._id !== teamId))
            toast.success(response.data.message)
        }
    } catch (error) {
        console.error("Error deleting team:", error);
    }finally{
        setisLoading(false)
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [])
  

  return (
    <div className='flex flex-wrap justify-center gap-6 px-4'>
        {
            isLoading && (
                <div className="flex justify-center items-center w-full h-[300px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            )
        }
      {teams.map((team) => (
        <TeamCard
          key={team._id}
          teamName={team.name}
          description={team.description}
          members={team.members}
          onDelete={() => handleDelete(team._id)}
        />
      ))}
    </div>
  );
}

export default MyTeam;
