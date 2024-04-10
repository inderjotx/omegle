'use client'

import { useSocket } from "@/components/Provider/SocketProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function Home() {

  const { roomId, makeCall, peerRef, message, sendMessage } = useSocket()
  const [localStream, setLocalStream] = useState<"" | MediaStream>("")
  const [remoteSteam, setRemoteStream] = useState<"" | MediaStream>("")

  const inputRef = useRef<HTMLInputElement | null>(null)
  const msgContainerRef = useRef<HTMLDivElement | null>(null)




  useEffect(() => {
    if (!window) return

    async function init() {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      setLocalStream(media)

      media.getTracks().forEach((track) => {
        peerRef.current?.peer?.addTrack(track, media)
      })

      peerRef.current?.peer?.addEventListener("track", (e) => {
        console.log("Received Media stream from the remote")
        setRemoteStream(e.streams[0])

      })

    }

    init()

  }, [peerRef])


  useEffect(() => {

    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight
    }


  }, [message])




  return (
    <div className="flex flex-col py-4 gap-4 bg-gray-300 md:flex-row px-4 h-[100vh] w-full " >

      {/* videos */}
      <div>
        <Button onClick={makeCall} >Call</Button>
      </div>


      <div className="w-full h-96 justify-around gap-2 md:w-1/2 md:h-full flex flex-row md:flex-col" >
        <div className="text-center relative h-full w-1/2 md:h-1/2 md:w-full " >
          {
            localStream &&
            <ReactPlayer style={{ position: "absolute", inset: "0" }} url={localStream} width={'100%'} height={'100%'} muted playing />
          }
        </div>

        <div className="text-center  relative h-full w-1/2 md:h-1/2 md:w-full rounded-md " >
          {
            remoteSteam ?
              <ReactPlayer style={{ position: "absolute", inset: "0" }} url={remoteSteam} width={'100%'} height={'100%'} muted playing />
              :
              <div className="absolute   h-full bg-gray-400 " />
          }

        </div>

      </div>

      {/* chat */}
      <div ref={msgContainerRef} className="h-full  relative overflow-y-scroll w-full bg-gray-200 rounded-md" >
        {
          message.map((message, key) => (
            <div key={key} className={cn("w-full flex p-3", message.sender == "you" ? "justify-start" : "justify-end")}>
              <div className="relative text-sm bg-gray-300 px-4 rounded-xl py-2 " >
                {message.message}
              </div>
            </div>
          ))
        }

        <form action={(data: FormData) => {
          if (inputRef.current && inputRef.current.value.trim() !== "") {
            sendMessage(inputRef.current.value)
            inputRef.current.value = ""
          }
        }}
          className="sticky mt-2 flex gap-2 bottom-2 w-full mb-2  px-2 rounded-mdflex " >
          <Input type="text" ref={inputRef} name="message"></Input>
          <Button type="submit" >Send</Button>
        </form>

      </div>
    </div >
  );
}