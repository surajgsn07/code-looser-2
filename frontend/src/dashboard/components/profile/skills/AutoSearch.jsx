// import React from 'react'

// export default function AutoSearch() {
//   return (
//     <div>
//               {/* Search Skills */}
//               <div className="relative min-w-[250px]" ref={dropdownRef}>
//                     <div className="relative">
//                         <input
//                             type="text"
//                             placeholder="Add Skills"
//                             value={searchQuery}
//                             onChange={(e) => {
//                                 setSearchQuery(e.target.value);
//                                 setIsDropdownVisible(e.target.value !== ''); // Show dropdown if there's input
//                             }}
//                             onFocus={() => setIsDropdownVisible(searchQuery !== '')} // Show dropdown on focus
//                             className="w-full h-10 px-4 border border-stone-200 dark:border-stone-700 outline-none bg-transparent rounded-sm"
//                         />
//                         <FaSearchengin className="absolute right-4 top-1/2 transform -translate-y-1/2" />
//                     </div>

//                     {/* Skills Dropdown */}
//                     {isDropdownVisible && filteredSkills.length > 0 && (
//                         <div
//                             className="absolute top-10 left-0 w-full bg-white border border-stone-200 
//                             dark:bg-stone-900 dark:border-stone-600 rounded-sm shadow-lg z-10
//                             max-h-40 overflow-y-auto"
//                         >
//                             {filteredSkills.map((skill, index) => (
//                                 <div
//                                     key={index}
//                                     onClick={() => handleAddSkill(skill)}
//                                     className="px-4 py-2 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800"
//                                 >
//                                     {skill}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//     </div>
//   )
// }
