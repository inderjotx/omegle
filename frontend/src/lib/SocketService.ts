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
                    ]
                }
            )
        }
    }



    async getOffer() {

        if (!this.peer) throw new Error("No Peer Connection Set Up")

        const offer = await this.peer.createOffer()
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


        // setting remote description
        await this.peer.setRemoteDescription(new RTCSessionDescription(offer))

        const answer = await this.peer.createAnswer()

        // setting local description
        await this.peer.setLocalDescription(new RTCSessionDescription(answer))

        return answer

    }




}

