import type { User } from "~~/types/other"

export class GroupManagment {
    #activeGroup: number | null = null
    #group = [
        {
            id: 1,
            name: "new",
            users: 233,
            chat: {
                "One": {
                    type: "voice",
                    name: "KAKAKA",
                    id: 123,
                    newMessage: true
                }
            }
        },
        {
            id: 2,
            name: "Kak",
            users: 456,
            chat: {
                "chat": {
                    type: "chat",
                    name: "HAHA",
                    id: 124,
                    newMessage: false
                },
                "aaa": {
                    type: "chat",
                    name: "HAHA",
                    id: 125,
                    newMessage: false
                },
                "bbb": {
                    type: "chat",
                    name: "HAHA",
                    id: 126,
                    newMessage: false
                },
                "ccc": {
                    type: "chat",
                    name: "HAHA",
                    id: 127,
                    newMessage: false
                },
                "eee": {
                    type: "chat",
                    name: "HAHA",
                    id: 128,
                    newMessage: false
                },
                "ooo": {
                    type: "chat",
                    name: "HAHA",
                    id: 129,
                    newMessage: false
                },
                "hhh": {
                    type: "chat",
                    name: "HAHA",
                    id: 130,
                    newMessage: false
                },
                "xxx": {
                    type: "chat",
                    name: "HAHA",
                    id: 131,
                    newMessage: false
                },
                "jjj": {
                    type: "chat",
                    name: "HAHA",
                    id: 132,
                    newMessage: false
                },
                "iii": {
                    type: "chat",
                    name: "HAHA",
                    id: 133,
                    newMessage: false
                },
                "lll": {
                    type: "chat",
                    name: "HAHA",
                    id: 134,
                    newMessage: false
                },
            }
        },
    ]
    constructor(idRoom: String) {

    }

    liveGroup() {

    }

    #validationData(): boolean {

        return true
    }

    createGroup() {

    }

    createChat() {

    }
    
    createRole() {

    }

    settingGroup() {

    }

    requreAllUser(): [User] {
        return [{
            userName: "Jorg",
            name: "JOJO",
            secondName: "HAHAH",
            id: "22",
            password: "1234",
            email: "111@vvv.com",
            phone: "213213",
            bio: "",
            birthday: "321321",
            country: "gdfgfdg",
            logo: "/img/test.png"
        },]
    }

    openGroup(idGroup: Number) {
        /*
        const respons = fetch('', {
        
        })
        */
        let group = null
        this.#group.forEach((el) => {
            if(el.id == idGroup) {
                console.log(el)
                group = el
            }
        })
        return group

    }

    requestGroup() {
        /*
        const respons = refth('', {
        
        })
        */
        return [
            {
                src: "/img/test.png",
                name: "New",
                id: 1,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 2,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 3,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 4,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 5,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 6,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 7,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 8,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 9,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 10,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 11,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 12,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 13,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 14,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 15,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 16,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 17,
            },
            {
                src: "/img/test.png",
                name: "New",
                id: 18,
            },

        ]
    }
}

