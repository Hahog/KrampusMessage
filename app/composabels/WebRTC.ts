import type { answerMessage, checkUserActive, iceCandidate, startStreamMessage, StatusMessage } from "~~/types/signaling";
import { Signaling } from "./Signaling";
import { User } from "./User";

export class WebRTC extends Signaling {
    #User
    #callStore = callStore()
    #stream
    #idRoom
    #webSoket: WebSocket
    constructor(idRoom: string, typeWS: string) {
        let webSoket = new WebSocket(`ws://localhost:8080/ws/${idRoom}/${typeWS}`)
        webSoket.onerror = async () => {
            const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
            const items = [1, 2, 3, 4, 5]
            for (const el of items) {

                console.log("Попытка подключиться")
                webSoket = await new WebSocket(`ws://localhost:8080/${idRoom}/${typeWS}`)
                await delay(3000)
            }
            console.log("Не удалось подключиться")
            return false
        }
        const User = useUserStore()
        super(webSoket, String(User.userData != undefined ? User.userData.id : -1), idRoom)
        this.#User = User
        this.#webSoket = webSoket
        this.#idRoom = idRoom
    }

    #initializationWS() {
        this.#webSoket.onmessage = async (event) => {
            const data = JSON.parse(event.data)
            console.log(data)
            if (data.type == "StartSream") {
                (data as startStreamMessage)
                this.#callStore.settingCall = data.system_option
                this.sendSignalStatusUser("Expectation")
            } else if (data.type == "Status" && data.name !== this.#User.userData.userName) {
                (data as StatusMessage)
                if (data.statusUser == "Expectation") {
                    this.#reactionNewUser(data.idUserTarget)
                } else if (data.statusUser == "Active") {
                    this.#reactionActiveUser(data, data.idUserTarget, data.offer ? data.offer : "")
                } else if (data.statusUser == "Close") {
                    this.#closeCall(data)
                }
            } else if (data.type == "Answer" && data.idUserAnswer == this.#User.userData.id || data.idUserAnswer == -1) {
                (data as answerMessage)
                if (data.status === "Sent") {
                    if (data.action === "Active") {
                        this.#reactionAnswerActive(data)
                    } else if (data.action === "Expectation") {
                        // Пока пусто
                    } else if (data.action === "checkUserActive") {
                        
                        await this.#reactionAnswerCheckUser(data)
                    } else if (data.action === "Close") {
                        this.#reactionAnswerClose(data)
                    }
                }
            } else if (data.type == "iceCandidate") {
                (data as iceCandidate)
                this.#reactiionICECandidate(data)
            } else if (data.type == "checkUserActive") {
                (data as checkUserActive)
                console.log("Чек от пользователя: ")
                console.log(data)
                console.log(data.idRoom === this.#idRoom)
                console.log(this.#callStore.peerConnectionUsers.has(data.idUserTarget))
                if (!this.#callStore.peerConnectionUsers.has(data.idUserTarget) && data.idRoom === this.#idRoom) {
                    this.#reactionCheckUser(data)
                } else {
                    return 0
                }
            }
        }
    }

    #closeCall(data: object) {
        this.#callStore.peerConnectionUsers.get(data.idUserTarget).PeerConectionICE.getSenders().forEach((rtc) => {
            rtc.track.stop()
        })

        this.#callStore.peerConnectionUsers.get(data.idUserTarget).PeerConectionICE.close()

        this.#callStore.peerConnectionUsers.delete(data.idUserTarget)

        this.sendSignalAnswer(data.idUserTarget, data.idUserAnswer, "Close", "Sent")
    }

    #reactionNewUser(id: string) {
        const user = (new User()).getUserById(id)

        this.#callStore.expectationUserCall.push(user)
    }
    async #reactionActiveUser(data: object, id: string, offer: object | "" = "") {
        this.#callStore.expectationUserCall.forEach((user, id) => {
            if (user.id == id) {
                this.#callStore.activeUserCall.push(user)
                this.#callStore.expectationUserCall.slice(id, 1)
            }
        })

        if (offer && data.offer.idUserAnswer == this.#User.userData.id && this.#callStore.newUserPC(data).PeerConectionICE.signalingState === "stable") {
            const pc = this.#callStore.newUserPC(data).PeerConectionICE
            await pc.setRemoteDescription(new RTCSessionDescription(data.offer.offer));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            this.sendSignalAnswer(data.idUserTarget, data.idUserAnswer, "Active", "Sent", answer)
        } else {
            this.sendSignalAnswer(data.idUserTarget, data.idUserAnswer, "Active", "Sent")
        }
    }


    #reactionAnswerActive(data: object) {
        if (data.answer) {
            this.#callStore.newUserPC(data).PeerConectionICE.setRemoteDescription(new RTCSessionDescription(data.answer))
        }
    }

    async #reactionAnswerCheckUser(data: object) {
        if (this.#callStore.newUserPC(data, this.#User.userData, this.#stream) === undefined) {
            console.log("Получен ответ на чек: ", data)
            const pc = this.#callStore.newUserPC(data).PeerConectionICE
            console.log("Объект пользователя, который ответил: ", pc)
            await this.#callStore.newUserPC(data).PeerConectionICE.setRemoteDescription(new RTCSessionDescription(data.answer))
            console.log(this.#callStore.newUserPC(data))
            const answer = await this.#callStore.newUserPC(data).PeerConectionICE.createAnswer()
            await this.#callStore.newUserPC(data).PeerConectionICE.setLocalDescription(answer)
            console.log("Отправили ответ: ", data.idUserTarget)
            setTimeout(async () => {
                console.log("ЖДЁМС")
                console.log(this.#callStore.newUserPC(data).ICEcandidate)
                const iceCandidate = await this.#callStore.newUserPC(data).ICEcandidate
                console.log(iceCandidate.length)
                iceCandidate.forEach((ice) => {
                    console.log("ОТправленный кандидат: ", ice)
                    setTimeout(() => {
                        this.sendSignalICECandidate(ice)
                    }, 80)
                })
            }, 500)
            this.sendSignalAnswer(data.idUserTarget, data.idUserAnswer, "checkUserActive", "Sent", answer)
        } else if (this.#callStore.newUserPC(data) !== undefined && this.#callStore.newUserPC(data).PeerConectionICE.signalingState === "have-local-offer") {
            console.log(data)
            const pc = this.#callStore.newUserPC(data)
            pc.PeerConectionICE.setRemoteDescription(new RTCSessionDescription(data.answer))
        }
    }

    #reactionAnswerClose(data: object) {
        this.#callStore.peerConnectionUsers.delete(data.idUserTarget)



        if (!this.#callStore.peerConnectionUsers.size) {
            this.#callStore.peerConnectionUsers = new Map()

            this.#stream.getTracks().forEach((track) => {
                track.stop()
            })

            this.#stream = null
        }
    }

    async #reactiionICECandidate(data: object) {
        if (this.#callStore.newUserPC(data).PeerConectionICE.iceConnectionState == "new" && !this.#callStore.newUserPC(data).isICE) {
            console.log(1111)
            this.#callStore.newUserPC(data).ICEcandidate.forEach(ice => {
                console.log("ОТправленный кандидат: ", ice)
                this.sendSignalICECandidate(ice)
            })

            this.#callStore.newUserPC(data).isICE = true
            console.log(this.#callStore.newUserPC(data).isICE)
        }
        if (data.iceCandidate) {
            try {
                console.log("Полученный кандидат: ", data)
                await this.#callStore.newUserPC(data).PeerConectionICE.addIceCandidate(new RTCIceCandidate(data.iceCandidate));
            } catch (e) {
                console.error('Error adding ICE candidate:', e);
            }
        }
    }

    async #reactionCheckUser(data: object) {
        this.#callStore.newUserPC(data, this.#User.userData, this.#stream)
        console.log("Чек от пользователя: ", data)
        console.log("Объект пользователя: ", this.#callStore.newUserPC(data))
        let offer = await this.#callStore.newUserPC(data).PeerConectionICE.createOffer()
        await this.#callStore.newUserPC(data).PeerConectionICE.setLocalDescription(offer)
        console.log("Отправили оффер: ", data.idUserTarget)
        /*if (this.#callStore.peerConnectionUsers.size >= 3) {
            this.#callStore.peerConnectionUsers.forEach((pc) => {
                this.#callStore.newUserPC(data).PeerConectionMCU = new RTCPeerConnection(this)
            })
        }*/
        this.sendSignalAnswer(data.idUserTarget, this.#User.userData?.id, "checkUserActive", "Sent", offer)
    }

    getWebSoketObject(): WebSocket {
        return this.#webSoket
    }

    async startCall() {
        this.#initializationWS()
        console.log("start")
        this.#stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        this.sendSignalStartStream()

    }

    async connectionCall() {
        this.#initializationWS()
        this.#stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        console.log("connect")
        this.sendSignalCheckUser(false)

        

        this.#callStore.peerConnectionUsers.forEach((el) => {
            console.log(el)
        })



        setTimeout(() => {
            /*if (6 > peerConnectionUsers.size >= 3) {
                peerConnectionUsers.forEach((pc) => {
                    pc.PeerConectionMCU = new RTCPeerConnection(configuration)
                })
            }*/
            this.sendSignalStatusUser("Active")
            //createListEvent(stream, peerConnectionUsers)
        }, 500)
    }

    stopTrack() {
        this.#callStore.peerConnectionUsers.clear()
        this.#stream.getTracks().forEach((el) => {
            el.stop()
        }) 
    }
}