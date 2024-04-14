'use client'

import { useSocket } from "@/components/Provider/SocketProvider";
import { PhoneCall, PhoneOff } from "lucide-react";
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";





export default function Home() {

  const { makeCall, cancelCall, status, remoteStream } = useSocket()
  const [localStream, setLocalStream] = useState<"" | MediaStream>("")


  useEffect(() => {

    if (status === null) return

    if (status === "connecting" || status === "connected") {
      toast.success(status)
    }

    else if (status === "new") {
      toast.info("Waiting For the User Other Connect ....")
    }


    else {
      toast.error(status)
    }


  }, [status])



  useEffect(() => {
    if (!window) return

    async function init() {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      setLocalStream(media)

    }

    init()

  }, [])



  return (
    <div className="flex relative flex-col h-screen w-full items-center py-8 px-8 ">
      <div>Status :  {status}</div>

      <div className="h-full w-full flex flex-col md:flex-row  gap-4 " >

        <div className="h-1/2 relative  w-full md:w-1/2 md:h-full" >
          {
            localStream ?
              <ReactPlayer style={{ position: "absolute", inset: 0 }} url={localStream} width={'100%'} height={'100%'} muted playing />
              :
              <div className="absolute inset-0   flex items-center justify-center  h-full bg-gray-100 " >
                <Image src={'/boy.png'} alt="boy-image-headshot" quality={100} height={50} width={50} />
              </div>
          }
        </div>

        <div className="h-1/2 relative w-full  md:w-1/2 md:h-full" >{
          remoteStream ?
            <ReactPlayer style={{ position: "absolute", inset: 0 }} url={remoteStream} width={'100%'} height={'100%'} muted playing />
            :
            <div className="absolute mx-auto inset-0 aspect-square md:aspect-auto  flex items-center justify-center  h-full bg-gray-100 " >
              <Image src={'/boy.png'} alt="boy-image-headshot" quality={100} height={60} width={60} />
            </div>

        }</div>

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


    </div>
  );
}




