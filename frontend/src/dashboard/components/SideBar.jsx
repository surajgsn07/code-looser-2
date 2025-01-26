import React, { useState } from "react";
import { MdDashboard, MdPerson, MdSettings } from "react-icons/md";
import { MdSendTimeExtension } from "react-icons/md";
import { GrLogout, GrResources } from "react-icons/gr";
import { MdFeedback } from "react-icons/md";
import { FaBars, FaBarsProgress, FaSearchengin } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { openSideBar } from "./../../recoil/states";
import { MdTimer } from "react-icons/md";
import ModalWrapper from "./../../common/ModalWrapper";
import DeleteConfirmation from "./../../common/DeleteConfirmation";
import { logoutUser } from "./../../apis/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { RiTeamLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const listData = [
  {
    name: "Profile",
    icon: <MdPerson size={20} />,
  },
  {
    name: "Requests",
    icon: <GrResources size={20} />,
  },
  {
    name: "Teams",
    icon: <RiTeamLine size={20} />,
  },
  {
    name: "Search",
    icon: <FaSearchengin size={20} />,
  },
  {
    name:"Join a Team",
    icon: <FaUsers size={20} />,
  }
];
export default function Sidebar({ setTab, tab, setOpen }) {
  const [open] = useRecoilState(openSideBar);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const logoutHandler = () => {
    logoutUser().then((res) => {
      if (res) {
        setOpenModal(false);
        navigate("/login");
      }
    });
  };
  return (
    <div className="relative min-h-screen overflow-auto  text-stone-700 dark:text-gray-100">
      <ModalWrapper open={openModal} setOpen={setOpenModal}>
        <DeleteConfirmation
          handler={logoutHandler}
          setOpenModal={setOpenModal}
        />
      </ModalWrapper>

            <div className=' text-2xl font-bold border-b
             border-zinc-700 border-opacity-30 py-4 flex relative gap-4 items-center '>
                <FaBars
                    size={20}
                    onClick={() => setOpen((prev) => !prev)}
                    className='dark:text-gray-100 sticky md:hidden bottom-2 hover:text-slate-500 cursor-pointer' />
                <img src={logo}
                    alt="pcte" className='w-8 h-8 rounded- object-cover' />
                 {open && "HackMeets"}
 
            </div>

      <div className="flex flex-col mt-5 gap-2">
        {listData.map((item, index) => (
          <div
            key={index}
            onClick={() => setTab(item.name)}
            className={` 
                    ${
                      item.name === tab &&
                      "bg-gradient-to-r from-emerald-900 to-zinc-700 text-white"
                    }
                    
                    rounded-md
                       p-2 
                        transition-all
                     cursor-pointer
                     hover:bg-gradient-to-r hover:from-emerald-800 hover:to-zinc-700
                     hover:text-white
                     font-semibold flex items-center gap-3

                     ${!open ? "w-fit" : "w-full"}
                     `}
          >
            {item.icon}
            {open && item.name}
          </div>
        ))}
      </div>

      <div
        title="logout"
        onClick={() => setOpenModal(true)}
        className={`
            absolute bottom-14  ${!open ? "w-fit" : "w-[80%]"} 
            font-medium   flex items-center gap-4
            cursor-pointer
              py-3 px-2 rounded-md 
             hover:text-white
           
              hover:bg-gradient-to-r hover:from-stone-900 hover:to-zinc-700
            `}
      >
        <GrLogout size={20} className="text-red-700" />
        {open && "Log Out"}
      </div>
    </div>
  );
}
