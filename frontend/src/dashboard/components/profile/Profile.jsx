import React, { useRef, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaGlobe, FaEdit } from "react-icons/fa";
import { userData } from "../../../recoil/states";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import Loader from "../../../components/Loaders/Loader";
import { FaLocationDot } from "react-icons/fa6";

const Profile = ({ setSideTab }) => {
  // Dummy user data
  //   const user = {
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     skills: ["React", "Node.js", "MongoDB", "UI/UX Design"],
  //     experience: "Senior Software Engineer at XYZ Corp.",
  //     bio: "Passionate software developer with a focus on full-stack development.",
  //     achievements: "Developed a high-scale app used by 1M+ users.",
  //     links: [
  //       { title: "Portfolio", link: "https://johndoe.com", icon: <FaGlobe /> },
  //       { title: "GitHub", link: "https://github.com/johndoe", icon: <FaGithub /> },
  //       { title: "LinkedIn", link: "https://linkedin.com/in/johndoe", icon: <FaLinkedin /> },
  //     ],
  //     address: {
  //       state: "California",
  //       city: "San Francisco",
  //       country: "USA",
  //     },
  //     avatar:
  //       "https://imgs.search.brave.com/sE8MdXvDoqofUi5xFiPekWzRwNvt10-6tUkLkDA7KWA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzE3LzEyLzIz/LzM2MF9GXzkxNzEy/MjM2N19rU3BkcFJK/NUhjbW4wczRXTWRK/YlNacGw3TlJ6d3Vw/VS5qcGc",
  //   };


  const [user, setUserData] = useRecoilState(userData);
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
    <div className=" bg-white dark:bg-stone-800 text-stone-800 dark:text-gray-100 shadow rounded-xl ">
      <div className="flex flex-wrap dark:bg-stone-900 rounded-lg p-4 py-8 gap-4 mt-4 max-sm:justify-center  items-center ">
        {/* Avatar Section */}
        <div className="relative w-40 h-40  ">
          {loading ? (
            <div
              className=" w-full h-full flex item-center justify-center rounded-full  shadow-lg"><Loader /></div>
          ) : (<img
            src={user?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s"}
            alt="User Avatar"
            className="w-40  
                 rounded-full bg-cover bg-white ring-2 ring-cyan-800  shadow-lg"
          />)}

          <input type="file" ref={ref} onChange={handleAvatarChange} name="avatar" id="avatar" hidden />
          {/* Edit Icon */}
          <div className="absolute bottom-0 right-0 bg-white dark:bg-stone-800 p-2 rounded-full shadow-md cursor-pointer" onClick={() => ref.current.click()}  >
            <FaEdit className="text-cyan-800" size={20} />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 max-sm:flex max-sm:flex-col items-center   md:text-left">
          <h1 className="text-3xl font-bold text-stone-900
           dark:text-gray-100">{user?.name}</h1>

          <div className="flex justify-between max-sm:justify-center flex-wrap">
            <div className="flex-1 min-w-fit max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
              <p className="flex items-center gap-2 mt-1 max-sm:justify-center text-center">
                <FaEnvelope className="text-cyan-800" /> {user?.email}
              </p>
              <p className="flex items-center gap-2 max-sm:justify-center text-center">
                <FaLocationDot className="text-cyan-800" />
                Ludhiana, Punjab, India
              </p>
            </div>

            <button
              onClick={() => setSideTab('Settings')}
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
      <div className=" dark:bg-stone-900 rounded-lg p-4 py-8 gap-4 mt-4 max-sm:justify-center  items-center ">
        <h2 className="text-xl mb-2 max-sm:text-lg font-semibold " >
          About </h2>

          <p className="text-thin text-sm">{user?.bio}
            dankdlnakdnkalndlkandklnlknapin;kd
            dadad
          </p>
          <span className="text-cyan-700 text-sm cursor-pointer hover:text-cyan-600">Read More</span>
      </div>















      {/* Additional Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">{user.bio}</p>
        {/* Achievements */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Achievements</h2>
          <p className="text-gray-700 dark:text-gray-300">{user?.achievements}</p>
        </div>

        {/* Skills */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm shadow hover:bg-blue-600"
              >
                {skill}
              </span>
            ))}
            {user?.skills && user?.skills.length === 0 && <p>No skills available.</p>}
          </div>
        </div>

        {/* Address */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Address</h2>
          <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            {user.address?.city}, {user.address?.state}, {user.address?.country}
          </p>
        </div>

        {/* Links */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Links</h2>
          <ul>
            {user.links.map((link, index) => (
              <li key={index} className="mt-2">
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {link.icon} {link.title}
                </a>
              </li>
            ))}
            {user.links.length === 0 && <p>No links available.</p>}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Profile;
