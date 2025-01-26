import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
 import { io } from 'socket.io-client';
import { userData } from '../recoil/states';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [currUser] = useRecoilState(userData);
    
    useEffect(() => {
        const newSocket = io('https://code-looser-2.onrender.com');
        // const newSocket = io('https://gappe.onrender.com');
        setSocket(newSocket);
        console.log(newSocket)
 
      if(!newSocket) return;
        if (currUser) {
            newSocket.emit('setup', currUser);
        }
        newSocket.on('connect', () => {
            // console.log('Socket connected:', newSocket.id);
        });

        return () => newSocket.disconnect();
    }, [currUser]);


    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>;

};
export const useSocket = () => useContext(SocketContext);

