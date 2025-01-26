
export const chatSockets = (io) => {

    const onlineUsers = new Map();  
    const activeCalls = new Map(); 

    io.on("connection", (socket) => {
        console.log('A user connected');

        // USER ONLINE
        socket.on('setup', (data) => {
            socket.join(data?._id);
            console.log(data)
            onlineUsers.set(data._id, socket.id);
            io.emit('user online', Array.from(onlineUsers.keys()));
            socket.emit('connected');
            console.log(onlineUsers)

        });

        socket.on('join chat', (room) => {
            console.log(room,22)
            socket.join(room);
            console.log(`User joined room: ${room}`);

        });

        // NEW MESSAGE
        socket.on('new message', (newMessageReceived) => {
            const chat = newMessageReceived.chat;
            chat.users.forEach((user) => {
                if (user._id !== newMessageReceived.sender._id) {
                    socket.to(user._id).emit('messageReceived', {newMessageReceived,chat});
                }
            });
        });


        // LEAVE CHAT
        socket.on('leave chat', (room) => {
            socket.leave(room);
            console.log(`User left room: ${room}`);
        })

        // TYPING
        socket.on('typing', (data) => {
            const { roomId, user } = data
            if (socket.rooms.has(roomId)) {
                console.log(roomId,'is TYPING')
                socket.to(roomId).emit('typing', user);
            }

        });

        socket.on('stop typing', (roomId) => {
            if (socket.rooms.has(roomId)) {
                socket.to(roomId).emit('stop typing');
            }
        });


        // OFFLINE
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    io.emit('user offline', Array.from(onlineUsers.keys()));
                    break;
                }
            }
        });

    });
}


 