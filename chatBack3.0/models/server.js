// Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");
const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Connect to DB
        dbConnection();

        // Http server
        this.server = http.createServer(this.app);

        // Setting of sockets
        this.io = socketio(this.server, {
            /* setting */
        });
    }

    middlewares() {
        // Deploy the public directory
        this.app.use(express.static(path.resolve(__dirname, "../public")));

        // CORS
        this.app.use(cors());

        // Parseo of body
        this.app.use(express.json());

        // API End Points
        this.app.use("/api/login", require("../router/auth"));
        this.app.use("/api/mensajes", require("../router/mensajes"));
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {
        // Start Middlewares
        this.middlewares();

        // Start sockets
        this.configurarSockets();

        // Start Server
        this.server.listen(this.port, () => {
            console.log("Server corriendo en puerto:", this.port);
        });
    }
}

module.exports = Server;
