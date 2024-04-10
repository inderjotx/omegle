"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const SocketService_1 = require("./Services/SocketService");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: CLIENT_URL
    }
});
httpServer.listen(PORT, () => {
    console.log(`Server listening on ${PORT} Port`);
});
const socketService = new SocketService_1.SocketService();
io.on("connection", (socket) => {
    socketService.initListners(socket);
});
