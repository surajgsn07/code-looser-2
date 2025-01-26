import { useRecoilState } from "recoil";
import { accessedChat, allTeams } from "../../../recoil/states";

const ChatList = () => {
    const [teams, setTeams] = useRecoilState(allTeams);
    const [currSelectedChat, setCurrSelectedChat] = useRecoilState(accessedChat);
//     console.log(currSelectedChat)
// console.log(teams)
    return (
        <div className="w-full relative">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="text-xl font-semibold">My Teams Chats</h2>
 
            </div>

            {/* Groups */}
            <div
                className="flex overflow-y-scroll my-4 relative max-h-[calc(100vh-100px)] flex-col gap-2"
                style={{ scrollbarWidth: "none", scrollbarColor: "blue" }}
            >
                {teams?.map(
                    (item) =>
                        item.chat && ( // Ensure the chat field exists before rendering
                            <div 
                            onClick={()=>setCurrSelectedChat(item.chat)}
                                key={item.chat._id}
                                className="flex items-center px-3 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-xl gap-5 cursor-pointer py-2 bg-white dark:bg-stone-900 dark:text-white"
                            >
                                <img
                                    src={item.chat.groupAvatar || "https://cdn-icons-png.freepik.com/512/1057/1057089.png"} // Fallback if groupAvatar is not present
                                    alt={item.chat.chatName || "Chat Avatar"}
                                    className="w-12 h-12 bg-black rounded-full"
                                />
                                <div>
                                    <h3 className="text-md font-semibold">
                                        {item.chat.chatName || "Chat Name"}
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        {item.chat.latestMessage?.content || "No Message"}
                                    </p>
                                </div>
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default ChatList;
