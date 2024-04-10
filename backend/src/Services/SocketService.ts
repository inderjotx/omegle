import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";


export class SocketService {

    private roomManager: RoomManager


    constructor() {
        this.roomManager = new RoomManager()
    }


    initListners(socket: Socket) {

        // button to start call
        socket.on("join", () => {
            console.log("Joined Room", socket.id)
            this.roomManager.addToRoom(socket)
        })


        socket.on("disconnect", () => {

            console.log("Removed Room", socket.id)
            this.roomManager.remoteFromRoom(socket)
        })


        socket.on("offer", (data: { roomId: string, sdp: any }) => {

            console.log("Making Room", socket.id)
            console.log(data.roomId)
            console.log(data.sdp)
            this.roomManager.sendOffer(data.roomId, data.sdp, socket)
            // make offer
        })


        socket.on("answer", (data: { roomId: string, sdp: any }) => {

            console.log("Sending Answer", socket.id)
            console.log(data.roomId)
            console.log(data.sdp)
            this.roomManager.sendAnswer(data.roomId, data.sdp, socket)
            // sending answer
        })

        socket.on("candidate", (data: { roomId: string, candidate: any }) => {

            console.log("Received RTC Candidate", socket.id)
            console.log(data.roomId)
            console.log(data.candidate)
            this.roomManager.addCandidate(data.roomId, data.candidate, socket)
            // sending answer
        })



        socket.on("message", (data: { roomId: string, message: string }) => {

            console.log('Receiving message')
            console.log(data.roomId)
            console.log(data.message)

            // message 
            this.roomManager.sendMessage(data.roomId, data.message, socket)

        })









    }

}
