import { Signaling } from "./Signaling";

export class WebRTC extends Signaling {
    #User
    #webSoket: WebSocket
    constructor(idRoom: String) {
        let webSoket = new WebSocket(`ws://localhost:8080/ws/${idRoom}`)
        webSoket.onerror = async() => {
            const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
            const items = [1,2,3,4,5]
            for (const el of items) {
                
                console.log("Попытка подключиться")
                webSoket = await new WebSocket(`ws://localhost:8080/${idRoom}`)
                await delay(3000)
            }
            console.log("Не удалось подключиться")
            return false
        }
        const User = useUserStore() 
        super(webSoket, String(User.userData != undefined ? User.userData.id : -1), idRoom)
        this.#User = User
        this.#webSoket = webSoket
    }

    
}