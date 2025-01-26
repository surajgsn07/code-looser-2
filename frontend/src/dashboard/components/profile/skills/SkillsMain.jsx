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

          
            </div>

            {/* Render Added Skills */}
            <div className="flex flex-wrap gap-2 mt-4">
                {currUser?.skills.map((skill, index) => (
                    <div
                        key={index}
                        className="px-2 py-1 flex items-center gap-2 min-w-fit justify-between rounded-full bg-cyan-800 text-white text-sm"
                    >
                        <p className="min-w-fit">{skill}</p>
                        {/* <IoMdClose onClick={() => handleRemoveSkill(skill)} className="cursor-pointer" /> */}
                    </div>
                ))}
            </div>
        </>
    );
}
