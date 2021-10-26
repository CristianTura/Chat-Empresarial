// Server Model: Contains all configured server express + socket.io server configured
const Server = require("./models/server");

// Package to read and set environment variables
require("dotenv").config();

// Initialize the server instance
const server = new Server();

// Run the server
server.execute();
