import React, { useState, useEffect, useRef } from 'react';
import { FaSearchengin } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { userData } from '../../../../recoil/states';
import { staticSkills } from '../../../../data/data';
import { IoMdClose } from "react-icons/io";

export default function SkillsMain() {
    const [currUser, setCurrUser] = useRecoilState(userData);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null); // Reference for detecting outside clicks

    // Filtered skills based on search query
    const filteredSkills = staticSkills.filter(
        (skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !currUser?.skills?.includes(skill)
    );

    const handleAddSkill = (skill) => {
        setCurrUser((prevUser) => ({
            ...prevUser,
            skills: [...prevUser.skills, skill],
        }));
        setSearchQuery('');
        setIsDropdownVisible(false); // Hide dropdown after selecting a skill
    };

    const handleRemoveSkill = (skill) => {
        setCurrUser((prevUser) => ({
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
        <>
            <div className="flex justify-between flex-wrap gap-2">
                <h2 className="text-xl max-sm:text-lg font-semibold">Skills</h2>

                {/* Search Skills */}
                <div className="relative min-w-[250px]" ref={dropdownRef}>
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
                                    onClick={() => handleAddSkill(skill)}
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
            <div className="flex flex-wrap gap-2 mt-4">
                {currUser?.skills.map((skill, index) => (
                    <div
                        key={index}
                        className="px-2 py-1 flex items-center gap-2 min-w-fit justify-between rounded-full bg-cyan-800 text-white text-sm"
                    >
                        <p className="min-w-fit">{skill}</p>
                        <IoMdClose onClick={() => handleRemoveSkill(skill)} className="cursor-pointer" />
                    </div>
                ))}
            </div>
        </>
    );
}
