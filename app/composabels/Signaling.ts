import type { answerMessage, checkUserActive, startStreamMessage, StatusMessage } from "../../types/signaling"

export class Signaling {
    #webSoket
    #idUser
    #idRoom
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
        idRoom: null
    }

    constructor(webSoket: WebSocket, idUser: String, idRoom: String) {
        this.#webSoket = webSoket
        this.#idUser = idUser
        this.#idRoom = idRoom
        this.#initialization()
    }

    #reStructurAnswer(idUserAnswer: String, idUserTarget: String, action: String, statusMessage = "Sent", answer = "") {
        const newAnswer = JSON.parse(JSON.stringify(this.#answerMessage))
        if (idUserAnswer) {
            newAnswer.idUserAnswer = idUserAnswer
        }

        newAnswer.idUserTarget = idUserTarget
        if (statusMessage == "Sent" && answer) {
            newAnswer.answer = answer
        }
        newAnswer.action = action
        //newAnswer.stream_option = streamOption.system_option
        newAnswer.status = statusMessage
        return newAnswer
    }

    #reStructurStatus(statusUser: String, offer = "") {
        const newStatus = JSON.parse(JSON.stringify(this.#statusMessage))
        newStatus.statusUser = statusUser


        /*switch (Role) {
            case "Top":
                newStatus.Priority = 0.5
                break
        }*/

        newStatus.system_option = JSON.parse(localStorage.settingStream)

        if (statusUser == "Active" && offer) {
            newStatus.offer = offer
        }

        return newStatus
    }

    #reStructurCheckUser() {
        const newStatus = JSON.parse(JSON.stringify(this.#checkUserStatus))
        newStatus.idUserTarget = this.#idUser
        newStatus.idRoom = this.#idRoom

        return JSON.stringify(newStatus)
    }

    #initialization() {
        this.#webSoket.onmessage = async (event) => {

        }

        this.#webSoket.close = async (event) => {

        }
    }

    sendSignalStartStream() {

    }

    sendSignalStatusUser() {

    }

    sendSignalAnswer() {

    }

    sendSignalCheckUser() {
        this.#webSoket.send(this.#reStructurCheckUser())
    }

    sendSignalICECandidate() {

    }
}