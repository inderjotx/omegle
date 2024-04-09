'use client'

import { useSocket } from "@/components/Provider/SocketProvider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Home() {

  const { roomId, makeCall } = useSocket()
  const [localStream, setLocalStream] = useState<"" | MediaStream>("")
  const [remoteSteam, setRemoteStream] = useState<"" | MediaStream>("")



  useEffect(() => {

    if (!window) return

    async function init() {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      setLocalStream(media)
    }

    init()

  }, [])

  return (
    <div className="flex flex-col h-screen w-full" >

      <div className="mx-auto mt-6 ">
        <div> RoomId : {roomId} </div>
        <div>
          <Button onClick={makeCall} >Make Call</Button>
        </div>

      </div>

      <div className="flex w-full" >
        <div className="w-1/2" >
          <div>Your Stream</div>
          {
            localStream &&
            <ReactPlayer url={localStream} width={'300px'} height={'300px'} muted playing />
          }
        </div>


        <div className="w-1/2" >
          <div>Remote Stream</div>
          {
            remoteSteam &&
            <ReactPlayer url={remoteSteam} width={'300px'} height={'300px'} muted playing />
          }
        </div>

        B</div>

    </div>
  );
}
