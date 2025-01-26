import React from 'react'
import { userData } from '../../../../recoil/states';
import { useRecoilState } from 'recoil';

export default function AchievmentsMain() {
    const [user, setUserData] = useRecoilState(userData);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>

            {
                user?.achievements.length > 0 ?
                    user?.achievements.map((item , index)=>
                        <div key={index} className='flex flex-col gap-2'>
                            {/* valeue */}
                            <p className='text-md hover:text-blue-700 font-semibold'>{item}</p>
 
                        </div>)

                    :
                    <p className="text-thin col-span-1 md:col-span-2 text-sm text-center opacity-50">No achievements found</p>
            }
        </div>
    )
}
