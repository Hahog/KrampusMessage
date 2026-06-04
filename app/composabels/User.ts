export class User {

    constructor() {

    }

    async getUserById(idUser: string) {
        /*
        const respons = await fetch(``, {
        })

        if(respons.ok) {
            return (await respons.json)
        }
        */
    }

    async getAllUser() {
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
}