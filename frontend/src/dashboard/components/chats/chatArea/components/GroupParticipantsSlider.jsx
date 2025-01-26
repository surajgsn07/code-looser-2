import { useRecoilState } from "recoil";
import { accessedChat, userData } from "../../../../../recoil/states";
 
const GroupParticipantsSlider = () => {
    const [currSelectedChat] = useRecoilState(accessedChat);
    const [currUser] = useRecoilState(userData);
    console.log(currSelectedChat)

    return (
        <div className="flex items-center gap-1 max-w-[70%] overflow-clip">
            {
                [...currSelectedChat?.users || []]
                .sort((i)=>i._id===currSelectedChat?.groupAdmin._id?-1:1)
                ?.map((user, index) => (
                    <p key={user._id} className="text-xs min-w-fit dark:text-gray-300 text-stone-500 ">
                        {
                          currUser._id===user._id? 'You' :  user.name?.slice(0, 12) + ".."
                        }
                    </p>
                ))
            }
        </div>
    );
}

export default GroupParticipantsSlider;
