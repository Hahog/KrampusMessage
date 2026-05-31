import type { answerMessage, checkUserActive, startStreamMessage, StatusMessage } from "../../types/signaling"

export class Signaling {
    #webSoket
    #user = useUserStore()
    #idRoom
    #callStore = callStore()
    #answerMessage: answerMessage = {
        type: "Answer",
        idUserAnswer: "",
        idUserTarget: "",
        action: null,
        stream_option: {},
        status: null
    }

    #statusMessage: StatusMessage = {
        type: "Status",
        name: "",
        idUserTarget: "",
        statusUser: null,
        audio: false,
        video: false,
        Priority: 0,
        viewingStream: {
            status: false,
            idStreamer: ""
        },
        system_option: {}
    }

    #startStreamMessage: startStreamMessage = {
        type: "StartStream",
        idRoom: "",
        maxUser: 0,
        system_option: {
            isAudio: true,
            isAudioRole: {},
            isVideo: true,
            isVideoRole: {},
            adminRoom: "",
            timeStartStream: ""
        }
    }

    #checkUserStatus: checkUserActive = {
        type: "checkUserActive",
        idUserTarget: "",
        idRoom: ""
    }

    constructor(webSoket: WebSocket, idUser: String, idRoom: String) {
        this.#webSoket = webSoket
        this.#idRoom = idRoom
    }

    #reStructurAnswer(idUserAnswer: String, idUserTarget: String, action: String, statusMessage = "Sent", answer: object | "" = "") {
        const newAnswer = JSON.parse(JSON.stringify(this.#answerMessage))
        newAnswer.idUserAnswer = idUserAnswer
        newAnswer.idUserTarget = idUserTarget
        if (statusMessage == "Sent" && answer) {
            newAnswer.answer = answer
        }
        newAnswer.action = action
        //newAnswer.stream_option = streamOption.system_option
        newAnswer.status = statusMessage
        console.log(newAnswer)
        return JSON.stringify(newAnswer)
    }

    #reStructurStatus(statusUser: String, offer: object | "" = "") {
        const newStatus = JSON.parse(JSON.stringify(this.#statusMessage))
        newStatus.statusUser = statusUser
        newStatus.name = this.#user.userData?.userName
        newStatus.idUserTarget = this.#user.userData?.id

        /*switch (Role) {
            case "Top":
                newStatus.Priority = 0.5
                break
        }*/

        newStatus.system_option = this.#callStore.settingCall

        if (statusUser == "Active" && offer) {
            newStatus.offer = offer
        }

        return JSON.stringify(newStatus)
    }

    #reStructureStartStream(): string {
        const newSignal = JSON.parse(JSON.stringify(this.#startStreamMessage))
        newSignal.idRoom = this.#idRoom
        newSignal.timeStartStream = (new Date()).getTime()

        return JSON.stringify(newSignal)
    }

    #reStructurCheckUser(preliminary: boolean) {
        const newStatus = JSON.parse(JSON.stringify(this.#checkUserStatus))
        newStatus.idUserTarget = this.#user.userData?.id
        newStatus.idRoom = this.#idRoom
        if(preliminary) {
            newStatus.preliminary = true
        } else {
            newStatus.preliminary = false
        }
        return JSON.stringify(newStatus)
    }

    sendSignalStartStream() {
        this.#webSoket.send(this.#reStructureStartStream())
    }

    sendSignalStatusUser(status: String, offer: object | "" = "") {
        if(offer != "") {
            this.#webSoket.send(this.#reStructurStatus(status, offer))
        } else {
            this.#webSoket.send(this.#reStructurStatus(status))
        }
    }

    sendSignalAnswer(idUserAnswer: string, idUserTraget: string, action: string, statusMessage?: string, answer?: object ) {
        this.#webSoket.send(this.#reStructurAnswer(idUserAnswer, idUserTraget, action, statusMessage, answer))
    }

    sendSignalCheckUser(preliminary: boolean) {
        this.#webSoket.send(this.#reStructurCheckUser(preliminary))
    }

    sendSignalICECandidate(ice: string) {
        this.#webSoket.send(ice)
    }

    getIdRoom(): String {
        return this.#idRoom
    }
}