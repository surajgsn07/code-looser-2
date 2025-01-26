import React, { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaGlobe, FaSearchengin } from "react-icons/fa";
import { userData } from "../../../recoil/states";
import { useRecoilState } from "recoil";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import Loader from "../../../components/Loaders/Loader";
import { IoMdClose } from "react-icons/io";
import { staticSkills } from "../../../data/data";


const EditProfile = ({ setIsEditing }) => {


  const [user, setUserData] = useRecoilState(userData);
  const [loading, setloading] = useState(false)

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user?.bio || "",
    achievements: [...user.achievements],
    skills: [...user.skills],
    address: {
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
    },
    links: [...user.links],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      achievements: formData.achievements,
      skills: formData.skills.split(",").map(skill => skill.trim()),
      address: {
        city: formData.address?.split(",")[0] || "",
        state: formData.address?.split(",")[1] || "",
        country: formData.address?.split(",")[2] || "",
      },
      links: formData.links.map(link => ({ title: link.title, link: link.url })),
    };
    setloading(true)
    try {
      const response = await axiosInstance.post('/user/update', updatedUser);
      if (response.data) {
        setUserData(updatedUser);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update profile');
    } finally {
      setloading(false)
    }
  };

  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { title: "", url: "" }],
    });
  };

  const deleteLink = (index) => {
    const updatedLinks = formData.links.filter((_, idx) => idx !== index);
    setFormData({
      ...formData,
      links: updatedLinks,
    });
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Reference for detecting outside clicks

  // Filtered skills based on search query
  const filteredSkills = staticSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user?.skills?.includes(skill)
  );

  const handleAddSkill = (skill) => {
    setFormData((prevUser) => ({
      ...prevUser,
      skills: [...prevUser.skills, skill],
    }));
    setSearchQuery('');
    setIsDropdownVisible(false); // Hide dropdown after selecting a skill
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prevUser) => ({
      ...prevUser,
      skills: prevUser.skills.filter((s) => s !== skill),
    }));
  };

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="p-4 md:p-6 w-full h-full overflow-y-auto bg-white dark:bg-stone-900 shadow-lg rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4">
        <div className="flex w-full md:col-span-2 justify-between items-center gap-2 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-gray-100 mb-4">Edit Profile</h1>

          <div className="flex gap-2 items-center">
            <button
              className="bg-cyan-700 hover:bg-cyan-600 text-white px-5 py-1.5 text-sm rounded"
              onClick={handleSave}
            >
              {loading ? <Loader /> : "Save"}
            </button>

            <button
              className="bg-red-600 hover:bg-red-500 text-white px-5 py-1.5 text-sm rounded"
              onClick={() => {
                setFormData({
                  name: user.name,
                  email: user.email,
                  bio: user?.bio || "",
                  achievements: [...user.achievements],
                  skills: [...user.skills],
                  address: {
                    city: user?.address?.city || "",
                    state: user?.address?.state || "",
                    country: user?.address?.country || "",
                  },
                  links: [...user.links],
                });
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400">Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 px-3 py-1.5 w-full rounded-md text-sm border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-cyan-600"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400">Email</label>
          <input
            disabled
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 px-3 py-1.5 w-full rounded-md text-sm border-2 bg-slate-100 opacity-60 cursor-not-allowed border-gray-300 dark:border-gray-800 dark:bg-stone-700 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-cyan-600"
          />
        </div>

        {/* Bio Input */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600 dark:text-gray-400">About</label>
          <textarea
            name="bio"
            placeholder="Write About you..."
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            className="mt-1 px-3 py-1.5 w-full rounded-md text-sm border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-cyan-600"
          />
        </div>

        {/* Address Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:col-span-2">
          {/* City Input */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400">City</label>
            <input
              type="text"
              name="city"
              required

              placeholder="Enter City"

              value={formData.address.city}
              onChange={handleChange}
              className="mt-1 px-3 py-1.5 w-full rounded-md text-sm border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-cyan-600"
            />
          </div>

          {/* State Input */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400">State</label>
            <input
              type="text"
              name="state"
              required

              placeholder="Enter State"
              value={formData.address.state}
              onChange={handleChange}
              className="mt-1 px-3 py-1.5 w-full rounded-md text-sm border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-cyan-600"
            />
          </div>

          {/* Country Input */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400">Country</label>
            <input
              type="text"
              required

              placeholder="Enter Country"
              name="country"
              value={formData.address.country}
              onChange={handleChange}
              className="mt-1 px-3 py-1.5 w-full rounded-md text-sm border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-cyan-600"
            />
          </div>
        </div>


        {/* Skills */}

        <div className="md:col-span-2 ">
          <div className="flex justify-between flex-wrap gap-2">
            <p className="block text-sm text-gray-600 dark:text-gray-400">Skills</p>

            {/* Search Skills */}
            <div className="relative min-w-[250px] " ref={dropdownRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Add Skills"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsDropdownVisible(e.target.value !== ''); // Show dropdown if there's input
                  }}
                  onFocus={() => setIsDropdownVisible(searchQuery !== '')} // Show dropdown on focus
                  className="w-full h-10 px-4 border border-stone-200 dark:border-stone-700 outline-none bg-transparent rounded-sm"
                />
                <FaSearchengin className="absolute right-4 top-1/2 transform -translate-y-1/2" />
              </div>

              {/* Skills Dropdown */}
              {isDropdownVisible && filteredSkills.length > 0 && (
                <div
                  className="absolute top-10 left-0 w-full bg-white border border-stone-200 
                                    dark:bg-stone-900 dark:border-stone-600 rounded-sm shadow-lg z-10
                                    max-h-40 overflow-y-auto"
                >
                  {filteredSkills.map((skill, index) => (
                    <div
                      key={index}
                      // onClick={() => {handleAddSkill(skill)}}
                      className="px-4 py-2 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Render Added Skills */}
          <div className="flex flex-wrap gap-2 min-h-20 mt-1 border border-stone-200 dark:border-stone-700 py-2">
            {formData?.skills.map((skill, index) => (
              <div
                key={index}
                className="px-2 py-1 flex items-center gap-2 min-w-fit justify-between rounded-full bg-cyan-800 text-white text-sm"
              >
                <p className="min-w-fit">{skill}</p>
                <IoMdClose onClick={() => handleRemoveSkill(skill)} className="cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

            {/* Links */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Links</label>
              <div className="flex flex-wrap gap-2 min-h-20 mt-1 border border-stone-200 dark:border-stone-700 py-2">
                {formData?.links.map((link, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 flex items-center gap-2 min-w-fit justify-between rounded-full bg-cyan-800 text-white text-sm"
                  >
                    <p className="min-w-fit">{link?.title}</p>
                    {/* <IoMdClose onClick={() => handleRemoveLink(link)} */}
                     {/* className="cursor-pointer" />  */}

                  </div>
                ))}
              </div>
            </div>
          
            {/* Achievments */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Links</label>
              <div className="flex flex-wrap gap-2 min-h-20 mt-1 border border-stone-200 dark:border-stone-700 py-2">
                {formData?.links.map((link, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 flex items-center gap-2 min-w-fit justify-between rounded-full bg-cyan-800 text-white text-sm"
                  >
                    <p className="min-w-fit">{link?.title}</p>
                    {/* <IoMdClose onClick={() => handleRemoveLink(link)} */}
                     {/* className="cursor-pointer" />  */}

                  </div>
                ))}
              </div>
            </div>
          



      </div>
    </div>


  );
};

export default EditProfile;
