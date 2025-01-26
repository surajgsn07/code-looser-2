import React, { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaGlobe, FaEdit, FaSearchengin } from "react-icons/fa";
import { userData } from "../../../recoil/states";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import Loader from "../../../components/Loaders/Loader";
import { FaLocationDot } from "react-icons/fa6";
import SkillsMain from "./skills/SkillsMain";
import AboutMain from "./about/AboutMain";
import LinksMain from "./links/LinksMain";
import AchievmentsMain from "./achievments/AchievmentsMain";
import ModalWrapper from "../../../common/ModalWrapper";
import EditProfile from "./EditProfile";

const Profile = ({ setSideTab }) => {


  const [user, setUserData] = useRecoilState(userData);
  const [isEditing, setIsEditing] = useState(false);

  // const[newUserData, setNewUserData] = useState(user || {})

  // useEffect(() => {
  //   if(!user) return
  //   setNewUserData(user)
  // }, [user])


  const ref = useRef(null);
  const [loading, setloading] = useState(false)

  const handleAvatarChange = async () => {
    const file = ref.current.files[0];
    if (!file) return;
    setloading(true)
    try {
      const response = await axiosInstance.post('/user/update-avatar', { avatar: file }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data) {
        toast.success('Profile picture updated successfully');
        setUserData(response.data.user);
      }
    } catch (error) {
      console.log("erro : ", error);
      toast.error('Failed to update profile picture');
    } finally {
      setloading(false)
    }
  };




  return (
    <div className="  dark:bg-stone-800 text-stone-800 dark:text-gray-100   ">

      {/* Basic Info */}
      <div className="flex bg-white flex-wrap shadow-xl dark:bg-stone-900 rounded-lg p-4 py-8 gap-4 mt-4 max-sm:justify-center  items-center ">
        {/* Avatar Section */}
        <div className="relative w-40 h-40  ">
          {loading ? (
            <div
              className=" w-full h-full flex item-center justify-center rounded-full  shadow-lg"><Loader /></div>
          ) : (<img
            src={user?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s"}
            alt="User Avatar"
            className="w-40 h-40 
                 rounded-full bg-cover bg-white ring-2 ring-cyan-800  shadow-lg"
          />)}

          <input type="file" ref={ref} onChange={handleAvatarChange} name="avatar" id="avatar" hidden />
          {/* Edit Icon */}
          <div className="absolute bottom-0 right-0 bg-white dark:bg-stone-800 p-2 rounded-full shadow-md cursor-pointer" onClick={() => ref.current.click()}  >
            <FaEdit className="text-cyan-800" size={20} />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1  max-sm:flex max-sm:flex-col items-center   md:text-left">
          <h1 className="text-3xl font-bold text-stone-900
           dark:text-gray-100">{user?.name}</h1>

          <div className="flex justify-between max-sm:justify-center flex-wrap">
            <div className="flex-1 min-w-fit max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
              <p className="flex items-center gap-2 mt-1 max-sm:justify-center text-center">
                <FaEnvelope className="text-cyan-800" /> {user?.email}
              </p>
              <div className="flex items-center gap-2 max-sm:justify-center text-center">
                <FaLocationDot className="text-cyan-800" />
                {user?.address?.city || <span className="opacity-50 text-sm">No City</span>},
                {user?.address?.state || <span className="opacity-50 text-sm">No State</span>},
                {user?.address?.country || <span className="opacity-50 text-sm">No Country</span>}
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 
             bg-gradient-to-r rounded-full justify-center flex items-center
              gap-2 px-4 from-cyan-500 to-blue-800 cursor-pointer
              hover:bg-gradient-to-r hover:from:cyan-800 hover:to-blue-700
             text-white  min-w-[250px] max-w-full py-2"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* About */}
      <AboutMain />

      {/* Skills */}
      <div className="bg-white shadow-xl dark:bg-stone-900 rounded-lg p-4 py-8 gap-4 mt-4 max-sm:justify-center  items-center ">
        <SkillsMain />
      </div>

      {/* Links */}
      <div className="bg-white shadow-xl dark:bg-stone-900 rounded-lg p-4 py-8 gap-4 mt-4 max-sm:justify-center  items-center ">
        <h2 className="text-xl mb-2 max-sm:text-lg font-semibold " >
          Social Links </h2>
        <LinksMain />

      </div>

      {/* Achievements */}
      <div className="bg-white shadow-xl dark:bg-stone-900 rounded-lg p-4 py-8 gap-4 mt-4 max-sm:justify-center  items-center ">
        <h2 className="text-xl mb-2 max-sm:text-lg font-semibold " >
          Achievements </h2>
        <AchievmentsMain />

      </div>


      {/* Edit Profile */}
      <ModalWrapper
        open={isEditing}
        setOpenModal={setIsEditing}
        outsideClickClose={false}
      >
        <EditProfile setIsEditing={setIsEditing} originalData={user} />
      </ModalWrapper>

    </div>
  );
};

export default Profile;
