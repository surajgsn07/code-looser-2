import React from 'react'
import { userData } from '../../../../recoil/states';
import { useRecoilState } from 'recoil';

export default function AboutMain() {
    const [user, setUserData] = useRecoilState(userData);
    return (
        <div className="bg-white shadow-xl dark:bg-stone-900 rounded-lg p-4 py-8 gap-4 mt-4 max-sm:justify-center  items-center ">
            <h2 className="text-xl mb-2 max-sm:text-lg font-semibold " >
                About </h2>

            {user?.bio ? <>
                <p className="text-thin text-sm">{user?.bio}
 
                </p>
                    {/* <span className="text-cyan-700 text-sm cursor-pointer hover:text-cyan-600">Read More</span> */}
            </> :
                <p className="text-thin text-sm text-center opacity-50">No About is found</p>
            }


        </div>

    )
}
