import { useState } from 'react'
import { FaBars } from 'react-icons/fa6'
import { useRecoilState } from 'recoil';
 
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import ProfileIcon from './components/profile/ProfileIcon';
 import { openSideBar } from '../recoil/states';
 import { useDarkMode } from '../contexts/DarkModeWrapper';
import Sidebar from './components/SideBar';

// Student Dashboard
export default function Dashboard() {
  const [open, setOpen] = useRecoilState(openSideBar);
  const [sideTab, setSideTab] = useState('Dashboard');
  const {mode, toggleMode} = useDarkMode();

  return (
    <div className='flex  w-full  min-h-screen max-h-screen '
      style={{ scrollbarWidth: "none" }}>
      <div
        className={`max-md:z-50 absolute min-h-full ${open ? "translate-x-0 flex-1 min-w-[270px] z-50" : "max-md:-translate-x-[130%] transition-all  w-[60px] "
          } bg-white md:sticky top-0 dark:bg-stone-900 border border-zinc-300 dark:border-zinc-800 border-opacity-30
           max-w-[300px] rounded-xl m-2 shadow-xl 
          py-4 px-2 transition-transform duration-300 ease-in-out`}
      >

        <Sidebar tab={sideTab} setTab={setSideTab} setOpen={setOpen} />
      </div>
      {/* Dashboard Content */}
      <div className='flex-1 my-2 relative mr-2 overflow-y-auto ' style={{ scrollbarWidth: "none" }}>

        {/* Topbar */}
        <div className='flex sticky top-0 z-30   h-14 items-center
        shadow-xl  bg-white
        rounded-md
        px-4
         dark:bg-stone-900 border border-zinc-300
          dark:border-zinc-800 border-opacity-30
         justify-between'>


          <div className='flex items-center gap-3'>
            <FaBars
              onClick={() => setOpen((prev) => !prev)}
              className='dark:text-gray-100 hover:text-slate-500 cursor-pointer' />
            <h1 className='text-xl dark:text-gray-100 font-bold'>{sideTab}</h1>
          </div>

          <div className='flex items-center gap-3 md:mr-5'>
            {!mode ? <MdDarkMode className="text-2xl text-stone-800  dark:text-gray-100 cursor-pointer " onClick={toggleMode} />
              : <MdLightMode className="text-2xl text-stone-800 dark:text-gray-100 cursor-pointer" onClick={toggleMode} />
            }
            {/* Profile */}
            <ProfileIcon />
          </div>
        </div>


        <div className='w-full dark:bg-stone-800 bg-slate-50 mt-6 px-4' >

          {/* Content */}

          {sideTab === 'Dashboard' && "Dashboard Content"}
         


        </div>

        <div>

        </div>

      </div>

    </div>
  )
}
