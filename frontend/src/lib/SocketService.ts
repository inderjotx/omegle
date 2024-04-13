'use client'


export class PeerService {

    // static peer: (null | );
    peer: (undefined | RTCPeerConnection)

    constructor() {

        if (!this.peer) {
            this.peer = new RTCPeerConnection(
                {
                    iceServers: [
                        {
                            urls: [
                                "stun:stun.l.google.com:19302",
                                "stun:global.stun.twilio.com:3478",
                            ],
                        },
                    ],
                }
            )

            this.addSteamData()
        }
    }


    async addSteamData() {

        if (!this.peer) return

        const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

        media.getTracks().forEach((track) => {
            // @ts-ignore
            this.peer.addTrack(track, media)
        })

    }




    async getOffer() {

        if (!this.peer) throw new Error("No Peer Connection Set Up")


        // first add steam the create offer other wise that will never call for ice server  


        const offer = await this.peer.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true })
        await this.peer.setLocalDescription(new RTCSessionDescription(offer))
        return offer

    }


    async setRemoteData(offer: RTCSessionDescriptionInit) {

        if (!this.peer) throw new Error("No Peer Connection Set Up")
        if (!offer) throw new Error("No Offer sent")


        await this.peer.setRemoteDescription(new RTCSessionDescription(offer))

    }


    async getAnswer(offer: RTCSessionDescriptionInit) {


        if (!this.peer) throw new Error("No Peer Connection Set Up")
        if (!offer) throw new Error("No Offer sent")


        // 
        // this.addSteamData()


        // setting remote description
        await this.peer.setRemoteDescription(new RTCSessionDescription(offer))



        const answer = await this.peer.createAnswer()

        // setting local description
        await this.peer.setLocalDescription(new RTCSessionDescription(answer))

        return answer

    }




}

