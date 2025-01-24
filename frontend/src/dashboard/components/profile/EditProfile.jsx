import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { userData } from "../../../recoil/states";
import { useRecoilState } from "recoil";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa"; // Import the loading spinner icon


const EditProfile = () => {
 
    
  const [user, setUserData] = useRecoilState(userData);
  const [loading, setloading] = useState(false)

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    achievements: user.achievements,
    skills: user.skills.join(", "), // Assuming skills are stored as a comma-separated string
    address: `${user?.address?.city}, ${user?.address?.state}, ${user?.address?.country}`,
    links: user.links.map(link => ({ title: link.title, url: link.link })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async() => {
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
        if(response.data){
            setUserData(updatedUser);
            toast.success('Profile updated successfully');
        }
    } catch (error) {
        console.log(error);
        toast.error('Failed to update profile');
    }finally{
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

  return (
    <div className="p-4 sm:p-8 bg-white dark:bg-stone-900 shadow-lg rounded-xl mx-4 mt-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-gray-100 mb-4">Edit Profile</h1>

          <div className="space-y-4 sm:space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm sm:text-base text-gray-600 dark:text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm sm:text-base text-gray-600 dark:text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Bio Input */}
            <div>
              <label className="block text-sm sm:text-base text-gray-600 dark:text-gray-400">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Achievements Input */}
            <div>
              <label className="block text-sm sm:text-base text-gray-600 dark:text-gray-400">Achievements</label>
              <textarea
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Skills Input */}
            <div>
              <label className="block text-sm sm:text-base text-gray-600 dark:text-gray-400">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address Input */}
            <div>
              <label className="block text-sm sm:text-base text-gray-600 dark:text-gray-400">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address != "undefined, undefined, undefined" ? formData.address : ""}
                onChange={handleChange}
                placeholder="City, State, Country"
                className="mt-1 p-2 w-full rounded-md border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Links Section */}
            <div className="mt-4">
              <h2 className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Links</h2>
              {formData.links.map((link, index) => (
                <div key={index} className="mt-2 space-y-2">
                  <label className="block text-sm sm:text-base text-gray-600 dark:text-gray-400">Link Title</label>
                  <input
                    type="text"
                    name={`link-title-${index}`}
                    value={link.title}
                    onChange={(e) => {
                      const newLinks = [...formData.links];
                      newLinks[index].title = e.target.value;
                      setFormData({ ...formData, links: newLinks });
                    }}
                    className="mt-1 p-2 w-full rounded-md border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block text-sm sm:text-base text-gray-600 dark:text-gray-400">Link URL</label>
                  <input
                    type="text"
                    name={`link-url-${index}`}
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = [...formData.links];
                      newLinks[index].url = e.target.value;
                      setFormData({ ...formData, links: newLinks });
                    }}
                    className="mt-1 p-2 w-full rounded-md border-2 border-gray-300 dark:border-gray-800 dark:bg-stone-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => deleteLink(index)}
                    className="text-red-600 hover:text-red-800 text-sm mt-2"
                  >
                    Delete Link
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLink}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Add Link
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-md"
              >
                {loading ? <>Saving <FaSpinner/></> : "Save Changes"}
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
