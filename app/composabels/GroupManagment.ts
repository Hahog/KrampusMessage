import type { User } from "~~/types/other"

export class GroupManagment {
    #activeGroup: number | null = null
    #group = [
        {
            id: 1,
            name: "new",
            users: 233,
            chat: {
                "One": [{
                    type: "voice",
                    name: "KAKAKA",
                    id: 123,
                    newMessage: true
                }]
            }
        },
        {
            id: 2,
            name: "Kak",
            users: 456,
            chat: {
                "chat": [{
                    type: "chat",
                    name: "HAHA",
                    id: 124,
                    newMessage: false
                },
                {
                    type: "chat",
                    name: "HOHO",
                    id: 125,
                    newMessage: false
                },
                ],
                "lll": [
                    {
                    type: "voice",
                    name: "HEHE",
                    id: 126,
                    newMessage: false
                },
                {
                    type: "chat",
                    name: "OHOH",
                    id: 127,
                    newMessage: false
                },
                ]
            }
        },
    ]
    constructor(idRoom: String) {

    }

    liveGroup(idUser: string, idRoom: string) {

    }

    #validationData(): boolean {

        return true
    }

    createGroup(nameGroup: String) {

    }

    createFolder(nameFolder: string, idRoom: string) {
        
    }
    createChat(nameChat: string, typeChat: string, idFolder: string, idRoom: string) {

    }

    createRole(nameRole: string, setting: object, idRoom: string) {

    }

    settingGroup() {

    }

    requreAllUser(): User[] {
        return [
            {
                bio: "",
                birthday: "132213213",
                country: "Russia",
                email: "111@vvv.com",
                id: "22",
                logo: "./img/test.png",
                name: "JOJO",
                password: "1234",
                phone: "333.05280193833164",
                secondName: "HAHAH",
                userName: "Jorg"
            },
            {
                bio: "",
                birthday: "132213213",
                country: "Russia",
                email: "111@ggg.com",
                id: "33",
                logo: "./img/test.png",
                name: "JOJO",
                password: "1234",
                phone: "333.05280193833164",
                secondName: "HAHAH",
                userName: "Sigma"
            },
            {
                bio: "",
                birthday: "132213213",
                country: "Russia",
                email: "111@ccc.com",
                id: "44",
                logo: "./img/test.png",
                name: "JOJO",
                password: "1234",
                phone: "333.05280193833164",
                secondName: "HAHAH",
                userName: "JOJO"
            },
            
        ]
    }

    openGroup(idGroup: Number) {
        /*
        const respons = fetch('', {
        
        })
        */
        let group = null
        this.#group.forEach((el) => {
            if (el.id == idGroup) {
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

    deleteUserInGroup(idGroup: string, idUser: string) {

    }

    requreAllRole(idGroup: string) {

    }

    deleteRoleInGroup(idGroup: string, idRole: string) {

    }

    addNewUser(idGroup: string, userEmail: string) {

    }

    requreAllMessageGroup(idGroup: string) {

    }
}

