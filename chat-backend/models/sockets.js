const {
    userConnected,
    userDisconnect,
    getUsers,
    recordMessage,
} = require("../controllers/sockets");
const { checkJWT } = require("../helpers/jwt");

class Sockets {
    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on("connection", async (socket) => {
            const [valido, uid] = checkJWT(socket.handshake.query["x-token"]);

            if (!valido) {
                console.log("socket no identificado");
                return socket.disconnect();
            }

            await userConnected(uid);

            // Join the user to a socket.io room
            socket.join(uid); // uid es la sala en donde se une el usuario para enviar un mensaje, en este se crea con el uid de mongo

            // TODO: Validate JWT
            // If token is not valid, disconnect
            //TODO: Know that users is active through the UID
            // issue which users are connected
            this.io.emit("lista-usuarios", await getUsers());

            // TODO: Socket join, uid
            // TODO: Listen when the client sends a message
            socket.emit("mensaje-personal", async (payload) => {
                const message = await recordMessage(payload);
                console.log(message);
            });

            //TODO: Disconnect
            //mark in the database that the user was disconnected
            //TODO: Issue everyone of the connected users

            socket.on("disconnect", async () => {
                await userDisconnect(uid);
                this.io.emit("lista-usuarios", await getUsers());
            });
        });
    }
}

module.exports = Sockets;
