"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
const uuid_1 = require("uuid");
class RoomManager {
    constructor() {
        this.queue = [];
        this.rooms = new Map();
    }
    addToRoom(socketId) {
        console.log(socketId.id + "Addition from Room");
        if (this.queue.indexOf(socketId) != -1) {
            console.log("already in the queue");
            return;
        }
        this.queue.push(socketId);
        console.log("Queue after addition", this.queue.length);
        this.joinRoom();
    }
    // this will keep on running and connecting people
    joinRoom() {
        if (this.queue.length < 2)
            return;
        const first = this.queue.pop();
        const second = this.queue.pop();
        if (!first || !second) {
            console.log("Waiting for someone to join");
            return;
        }
        const roomId = (0, uuid_1.v4)();
        //@ts-ignore
        this.rooms.set(roomId, { first, second });
        first.emit("join", { roomId, role: "caller" });
        second.emit("join", { roomId, role: "receiver" });
        console.log("added the user to the room");
        this.joinRoom();
    }
    remoteFromRoom(socket) {
        console.log(socket + "Removed from Room");
        this.queue = this.queue.filter((e) => e !== socket);
        this.rooms.forEach((e, key) => {
            if (e.first === socket || e.second === socket) {
                this.rooms.delete(key);
            }
        });
        console.log("Queue after removal", this.queue.length);
    }
    sendOffer(roomId, sdp, socket) {
        // send offer to the receiver
        const room = this.rooms.get(roomId);
        if (!room) {
            console.log("Invalid Room ID");
            return;
        }
        const receiver = (room.first == socket) ? room.second : room.first;
        receiver.emit("offer", { sdp, roomId });
        console.log("Sent offer to ", receiver.id);
    }
    sendAnswer(roomId, sdp, socket) {
        // send anser to the sender
        const room = this.rooms.get(roomId);
        if (!room) {
            console.log("Invalid Room ID");
            return;
        }
        const caller = (room.first == socket) ? room.second : room.first;
        caller.emit("answer", { sdp, roomId });
        console.log("Answer sent to ", caller.id);
    }
    addCandidate(roomId, candidate, socket) {
        // send anser to the sender
        console.log('Sending candiadate information');
        const room = this.rooms.get(roomId);
        if (!room) {
            console.log("Invalid Room ID");
            return;
        }
        const receiver = (room.first == socket) ? room.second : room.first;
        receiver.emit("candidate", { candidate, roomId });
        console.log("Candiate sent to ", receiver.id);
    }
}
exports.RoomManager = RoomManager;
