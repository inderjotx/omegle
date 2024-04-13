'use client'

import { useSocket } from "@/components/Provider/SocketProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PhoneCall, PhoneOff } from "lucide-react";
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";





export default function Home() {

  const { roomId, makeCall, peerRef, cancelCall, status } = useSocket()
  const [localStream, setLocalStream] = useState<"" | MediaStream>("")
  const [remoteSteam, setRemoteStream] = useState<"" | MediaStream>("")


  useEffect(() => {

    peerRef.current?.peer?.addEventListener("track", (e) => {
      console.log("Received Media stream from the remote")
      setRemoteStream(e.streams[0])
    })

    console.log("listening for remote steam")

    return () => {
      peerRef.current?.peer?.removeEventListener("track", (e) => {
        console.log("Received Media stream from the remote")
        setRemoteStream(e.streams[0])
      })
    }

  }, [peerRef, status])


  useEffect(() => {
    if (!window) return

    async function init() {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      setLocalStream(media)


      peerRef.current?.peer?.addEventListener("track", (e) => {
        console.log("Received Media stream from the remote")
        setRemoteStream(e.streams[0])
      })


    }


    init()

    return () => {

      peerRef.current?.peer?.removeEventListener("track", (e) => {
        console.log("Received Media stream from the remote")
        setRemoteStream(e.streams[0])
      })
    }

  }, [peerRef])



  return (
    <div className="flex relative flex-col h-screen items-center py-8 px-8 ">
      <div>Status :  {status}</div>
      <div className="h-[200px] z-10 self-end translate-y-[50%] lg:-translate-x-[150%] rounded-md w-[200px] overflow-hidden" >
        {
          remoteSteam ?
            <ReactPlayer style={{ position: "absolute", inset: "0" }} url={remoteSteam} width={'100%'} height={'100%'} muted playing />
            :
            <div className="absolute inset-0  flex items-center justify-center  h-full bg-gray-100 " >
              <Image src={'/boy.png'} alt="boy-image-headshot" quality={100} height={50} width={50} />
            </div>
        }
      </div>
      <div className="h-full overflow-hidden  relative rounded-md w-2/3  " >
        {
          localStream &&
          <ReactPlayer style={{ position: "absolute", inset: "0" }} url={localStream} width={'100%'} height={'100%'} muted playing />
        }
      </div>
      <div className="h-1/6 rounded-md w-2/3 flex items-center justify-center" >
        {
          status === null ?
            <div className="bg-green-400 text-white p-2 rounded-full hover:bg-green-500  hover:cursor-pointer"
              onClick={makeCall}
            >
              <PhoneCall className="size-6" />
            </div>
            :
            <div className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600  hover:cursor-pointer"
              onClick={cancelCall}
            >
              <PhoneOff className="size-6" />
            </div>
        }
      </div>

      <div className="absolute top-1/2 bottom-0 right-20 -z-10 left-20 rounded-md bg-[#FEF4EB]" >
      </div>

    </div>
  );
}



{/* chat */ }
{/* <div ref={msgContainerRef} className="h-full  relative overflow-y-scroll w-full bg-gray-200 rounded-md" >
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

      </div> */}


