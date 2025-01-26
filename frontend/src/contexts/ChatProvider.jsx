import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllChats, fetchAllChatsMessages, fetchAllUsers } from "../apis/apiCalls";
 import { useRecoilState } from "recoil";
 // import { fetchAllNotifications } from "../constants/chatNotificationsApis";
import { getCookie } from "../utils/cookiesApis";
import { accessedChat, userData } from "../recoil/states";
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [allChats, setAllChats] = useState([]);
    const [notifications, setNotifications] = useState([]);
    // const [allNotifications, setAllNotifications] = useState([]);
    const [latestMessage, setLatestMessage] = useState({});
    const [messages, setMessages] = useState([]);
    const [allChatsMessages, setAllChatsMessages] = useState([]);
    const token = getCookie('authToken');
    const [currUser] = useRecoilState(userData);
    const [currSelectedChat] = useRecoilState(accessedChat);
    const [chatsloading, setchatLoading] = useState(false);
    const [messagesloading, setchatmessagesLoading] = useState(false);
    const [usersChatLoading, setUsersChatsLoading] = useState(false);


 
    useEffect(() => {

       

    }, [currUser, token]);


// console.log(messages)
    return (
        <ChatContext.Provider value={{
            allUsers, allChats,
            latestMessage, setLatestMessage, messages, setMessages,
            notifications, setNotifications, setAllUsers, setAllChats,
            allChatsMessages, setAllChatsMessages,
            chatsloading, setchatLoading,
            usersChatLoading, setUsersChatsLoading
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChatContext = () => useContext(ChatContext);
