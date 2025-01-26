import React from 'react'
import { userData } from '../../../../recoil/states';
import { useRecoilState } from 'recoil';

export default function LinksMain() {
    const [user, setUserData] = useRecoilState(userData);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>

            {
                user?.links.length > 0 ?
                    user?.links.map(link =>
                        <div key={link._id} className='flex flex-col gap-2'>
                            {/* title */}
                            <a className='text-md hover:text-blue-700 font-semibold'>{link?.title}</a>

                            {/* link */}
                            <input disabled type="text" name="" id=""
                                value={link?.link} />
                        </div>)

                    :
                    <p className="text-thin col-span-1 md:col-span-2 text-sm text-center opacity-50">No Links found</p>
            }
        </div>
    )
}
