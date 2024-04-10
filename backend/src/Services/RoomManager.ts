
import { Socket } from "socket.io";
import { v4 as uuid } from 'uuid'

interface Room {
    first: Socket,
    second: Socket,
}


export class RoomManager {

    // queue 
    // array of socket with names 

    private queue: Socket[];
    private rooms: Map<string, Room>

    constructor() {
        this.queue = []
        this.rooms = new Map()
    }


    addToRoom(socketId: Socket) {

        console.log(socketId.id + "Addition from Room")
        if (this.queue.indexOf(socketId) != -1) {
            console.log("already in the queue")
            return
        }
        this.queue.push(socketId)
        console.log("Queue after addition", this.queue.length)
        this.joinRoom()
    }


    // this will keep on running and connecting people
    joinRoom() {

        if (this.queue.length < 2) return

        const first = this.queue.pop()
        const second = this.queue.pop()


        if (!first || !second) {
            console.log("Waiting for someone to join")
            return
        }

        const roomId = uuid()

        //@ts-ignore
        this.rooms.set(roomId, { first, second })


        first.emit("join", { roomId, role: "caller" })
        second.emit("join", { roomId, role: "receiver" })

        console.log("added the user to the room")

        this.joinRoom()
    }


    remoteFromRoom(socket: Socket) {

        console.log(socket + "Removed from Room")
        this.queue = this.queue.filter((e) => e !== socket)

        this.rooms.forEach((e, key) => {
            if (e.first === socket || e.second === socket) {
                this.rooms.delete(key)
            }
        })

        console.log("Queue after removal", this.queue.length)


    }



    sendOffer(roomId: string, sdp: any, socket: Socket) {

        // send offer to the receiver
        const room = this.rooms.get(roomId)
        if (!room) {
            console.log("Invalid Room ID")
            return
        }

        const receiver = (room.first == socket) ? room.second : room.first
        receiver.emit("offer", { sdp, roomId })
        console.log("Sent offer to ", receiver.id)

    }


    sendAnswer(roomId: string, sdp: any, socket: Socket) {

        // send anser to the sender
        const room = this.rooms.get(roomId)
        if (!room) {
            console.log("Invalid Room ID")
            return
        }

        const caller = (room.first == socket) ? room.second : room.first
        caller.emit("answer", { sdp, roomId })
        console.log("Answer sent to ", caller.id)
    }


    addCandidate(roomId: string, candidate: any, socket: Socket) {

        // send anser to the sender
        console.log('Sending candiadate information')
        const room = this.rooms.get(roomId)
        if (!room) {
            console.log("Invalid Room ID")
            return
        }

        const receiver = (room.first == socket) ? room.second : room.first
        receiver.emit("candidate", { candidate, roomId })
        console.log("Candiate sent to ", receiver.id)
    }



    // sendMessage(roomId: string, message: string, socket: Socket) {
    //     console.log(roomId)
    //     console.log(message)
    //     console.log(socket.id)

    //     const room = this.rooms.get(roomId)

    //     if (!room) {
    //         console.log('Invalid Room Id')
    //         return
    //     }

    //     const receiver = (room.first === socket) ? room.second : room.first

    //     receiver.emit("message-frontend", { message })
    //     console.log("Sending Message to ", receiver.id)

    // }


    // sendCode(roomId: string, code: string, socket: Socket) {
    //     console.log(roomId)
    //     console.log(code)
    //     console.log(socket.id)

    //     const room = this.rooms.get(roomId)

    //     if (!room) {
    //         console.log('Invalid Room Id')
    //         return
    //     }

    //     const receiver = (room.first === socket) ? room.second : room.first

    //     receiver.emit("code-frontend", { code })
    //     console.log("Sending code to ", receiver.id)

    // }
}