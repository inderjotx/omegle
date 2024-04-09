"use client"

import { MutableRefObject, ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react'
import { socket } from '@/lib/socket'
import { PeerService } from '@/lib/SocketService'


// fucnation to call join , that will join use to the Room
const SocketContext = createContext<null | { roomId: string, makeCall: () => void, peerRef: MutableRefObject<PeerService | null> }>(null)


export function useSocket() {

    const data = useContext(SocketContext)

    if (!data) throw Error("Error in the useSocket hook")

    return data
}


export function SocketProvider({ children }: { children: ReactNode }) {

    const [roomId, setRoomId] = useState("")
    const peerRef = useRef<null | PeerService>(null)


    const makeCall = () => {
        console.log("Making call")
        socket.emit("join")
    }


    const join = async (data: { roomId: string, role: "caller" | "receiver" }) => {

        console.log("Joined the Room")
        console.log(data.roomId)
        console.log(data.role)


        setRoomId(data.roomId)

        if (data.role === "receiver" || !peerRef.current) return


        // make offer 

        console.log("Making offer")
        const offer = await peerRef.current.getOffer()


        console.log("Sending offer")
        socket.emit("offer", { roomId: data.roomId, sdp: offer })


    }


    const offer = async (data: { roomId: string, sdp: RTCSessionDescriptionInit }) => {


        console.log("Received Call ")
        console.log(data.roomId)
        console.log(data.sdp)

        if (!peerRef.current) return


        const answer = await peerRef.current.getAnswer(data.sdp)

        console.log("Created Answer")

        socket.emit("answer", { roomId: data.roomId, sdp: answer })

    }



    const answer = async (data: { roomId: string, sdp: RTCSessionDescriptionInit }) => {


        console.log("Received  Answer")
        console.log(data.roomId)
        console.log(data.sdp)

        if (!peerRef.current) return


        await peerRef.current?.setRemoteData(data.sdp)


    }


    const candidate = async (data: { roomId: string, candidate: RTCIceCandidate }) => {

        console.log("Received candidate")
        console.log(data.roomId)
        console.log(data.candidate)


        if (!peerRef.current) return


        peerRef.current.peer?.addIceCandidate(data.candidate)


    }


    useEffect(() => {

        // join , when you will join , you get roomId , depends on role if caller , trigger offer, if sender do nothing 
        socket.on("join", join)

        // offer, you will get offer, set remote descption  , and you have to send answer , trigger answer 
        socket.on("offer", offer)

        // answer , you will get answer, you have to set remote description , no trigger  
        socket.on("answer", answer)


        // you wil receive ice candidate of the remote  
        socket.on("candidate", candidate)


        peerRef.current?.peer?.addEventListener("negotiationneeded", async () => {
            console.log(roomId)
            console.log("In negociattion needed")
            await join({ roomId, role: "caller" })
        })


        peerRef.current?.peer?.addEventListener("icecandidate", async (e) => {

            console.log(roomId)

            if (e.candidate) {
                console.log("Sending My Ice candidates")
                socket.emit("candidate", { roomId, candidate: e.candidate })
            }

        })

        return () => {
            socket.off("join", join)
            socket.off("offer", offer)
            socket.off("answer", answer)



            peerRef.current?.peer?.removeEventListener("negotiationneeded", async () => {
                console.log(roomId)
                console.log("In negociattion needed")
                await join({ roomId, role: "caller" })
            })


            peerRef.current?.peer?.removeEventListener("icecandidate", async (e) => {

                console.log(roomId)

                if (e.candidate) {
                    console.log("Sending My Ice candidates")
                    socket.emit("candidate", { roomId, candidate: e.candidate })
                }

            })

        }

    }, [roomId])


    useEffect(() => {

        if (window) {
            peerRef.current = new PeerService()
        }

    }, [])

    return <SocketContext.Provider value={{ roomId, makeCall, peerRef }} >
        {children}
    </SocketContext.Provider>

}