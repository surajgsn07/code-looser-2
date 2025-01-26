import React from 'react'
import ChatList from './ChatList'
import ChatArea from './chatArea/ChatArea'
import { accessedChat } from '../../../recoil/states';
import { useRecoilState } from 'recoil';

export default function ChatMain() {
    const [currSelectedChat, setCurrSelectedChat] = useRecoilState(accessedChat);
    return (
        <div className='  min-h-screen'>
            {/* All Teams Chats */}
            {!currSelectedChat ? <ChatList />
                : <ChatArea />
            }

        </div>
    )
}
