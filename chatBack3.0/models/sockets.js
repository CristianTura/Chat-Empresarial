const { comprobarJWT } = require("../helpers/jwt");
const {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje,
    getUsuarios,
} = require("../controllers/sockets");

class Sockets {
    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on("connection", async (socket) => {
            const [valido, uid] = comprobarJWT(
                socket.handshake.query["x-token"]
            );

            if (!valido) {
                console.log("socket no identificado");
                return socket.disconnect();
            }

            await usuarioConectado(uid);

            // Join user to socket.io room
            socket.join(uid);

            // Issue everyone connected user
            this.io.emit("lista-usuarios", await getUsuarios());

            // Listen when the customer sends a message
            socket.on("mensaje-personal", async (payload) => {
                const mensaje = await grabarMensaje(payload);
                this.io.to(payload.para).emit("mensaje-personal", mensaje);
                this.io.to(payload.de).emit("mensaje-personal", mensaje);
            });

            // Mark in the DB that the user disconnected
            // Issue everyone disconnected user
            socket.on("disconnect", async () => {
                await usuarioDesconectado(uid);
                this.io.emit("lista-usuarios", await getUsuarios());
            });
        });
    }
}

module.exports = Sockets;
