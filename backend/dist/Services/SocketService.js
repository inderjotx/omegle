"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const RoomManager_1 = require("./RoomManager");
class SocketService {
    constructor() {
        this.roomManager = new RoomManager_1.RoomManager();
    }
    initListners(socket) {
        // button to start call
        socket.on("join", () => {
            console.log("Joined Room", socket.id);
            this.roomManager.addToRoom(socket);
        });
        socket.on("disconnect", () => {
            console.log("Removed Room", socket.id);
            this.roomManager.remoteFromRoom(socket);
        });
        socket.on("offer", (data) => {
            console.log("Making Room", socket.id);
            console.log(data.roomId);
            console.log(data.sdp);
            this.roomManager.sendOffer(data.roomId, data.sdp, socket);
            // make offer
        });
        socket.on("answer", (data) => {
            console.log("Sending Answer", socket.id);
            console.log(data.roomId);
            console.log(data.sdp);
            this.roomManager.sendAnswer(data.roomId, data.sdp, socket);
            // sending answer
        });
        socket.on("candidate", (data) => {
            console.log("Received RTC Candidate", socket.id);
            console.log(data.roomId);
            console.log(data.candidate);
            this.roomManager.addCandidate(data.roomId, data.candidate, socket);
            // sending answer
        });
        // socket.on("message", (data: { roomId: string, message: string }) => {
        //     console.log('Receiving message')
        //     console.log(data.roomId)
        //     console.log(data.message)
        //     // message 
        //     this.roomManager.sendMessage(data.roomId, data.message, socket)
        // })
        // socket.on("code", (data: { roomId: string, code: string }) => {
        //     console.log('Receiving code ')
        //     console.log(data.roomId)
        //     console.log(data.code)
        //     // handle code send
        //     this.roomManager.sendCode(data.roomId, data.code, socket)
        // })
    }
}
exports.SocketService = SocketService;
