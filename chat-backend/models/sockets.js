class Sockets {
    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on("connection", (socket) => {
            // TODO: Validate JWT
            // If token is not valid, disconnect
            //TODO: Know that users is active through the UID
            // TODO: issue which users are connected
            // TODO: Socket join, uid
            // TODO: Listen when the client sends a message
            //message-personal
            //TODO: Disconnect
            //mark in the database that the user was disconnected
            //TODO: Issue everyone of the connected users
        });
    }
}

module.exports = Sockets;
