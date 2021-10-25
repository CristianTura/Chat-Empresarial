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

            this.io.emit("lista-usuarios", await getUsers());

            socket.emit("mensaje-personal", async (payload) => {
                const message = await recordMessage(payload);
                this.io.to(payload.to).emit("mensaje-personal", mensaje);
                this.io.to(payload.from).emit("mensaje-personal", mensaje);
            });

            socket.on("disconnect", async () => {
                await userDisconnect(uid);
                this.io.emit("lista-usuarios", await getUsers());
            });
        });
    }
}

module.exports = Sockets;
