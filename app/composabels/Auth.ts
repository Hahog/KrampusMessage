import { useUserStore } from '@/stores/user'
import type { AuthRespons } from "../../types/api/respons"
import type { UserData } from "../../types/forms"
import type { User } from '~~/types/other'


class Auth {
    #dataUser = [
        {
            unserName: "Jorg",
            name: "JOJO",
            secondName: "HAHAH",
            id: "22",
            password: "1234",
            email: "111@vvv.com"
        },
        {
            unserName: "Sigma",
            name: "Jorg",
            secondName: "Bitch",
            id: "33",
            password: "1234",
            email: "111@ggg.com"
        }
    ]
    #user: unknown
    #noValidateData: UserData = { email: "", password: "" }
    #userStore

    constructor() {
        this.#userStore = useUserStore()
    }

    async startAuth(user: UserData) {

        this.#dataUser.forEach((el) => {
            if (el.email == user.email && el.password == user.password) {
                const NewUser = {
                    id: el.id,
                    email: el.email,
                    name: el.name,
                    userName: el.unserName,
                    secondName: el.secondName,
                    phone: String(Math.random() * 1000,),
                    birthday: "132213213",
                    country: "Russia",
                    bio: "",
                    logo: "./img/test.png",
                    password: el.password
                }
                this.#userStore.userData = NewUser
            }
        })

        /*this.#noValidateData = user
        if(this.#validationData()) {
            this.returnStatus(await this.authUser())
        } else {
            this.returnStatus({sucess: false, error: "Использованы запрещённые или не верные символы"})
        }*/
    }

    #validationData(): boolean {
        let error = 0
        const regSql = /\sOR\s\d=\d;\s\-\-/

        if (Object.keys(this.#noValidateData).indexOf("email") != -1) {
            const regEx = /^([a-zA-Z0-9\.\_\%\+\-\=\#]+)@([a-zA-Z]+)\.([a-zA-z]+)$/

            if (!regEx.test(this.#noValidateData.email) && regSql.test(this.#noValidateData.email)) {
                error++;
            }
        }
        if (Object.keys(this.#noValidateData).indexOf("password")) {
            const regExp = /^([\w\.\_\%\+\-\#]{12,})$/

            if (!regExp.test(this.#noValidateData.password) && regSql.test(this.#noValidateData.password)) {
                error++;
            }
        }

        if (error != 0) {
            return false
        } else {
            return true
        }
    }

    async #authUser(): Promise<AuthRespons> {
        try {
            const promis = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.#user)
            })

            if (promis.ok) {
                const user = await promis.json()
                this.#userStore.userData = user
                return { sucess: true, data: "Вы успешно вошли" }
            } else {

                return { sucess: false, error: await promis.json() }

            }
        } catch {
            return { sucess: false, error: "Возникла непредвиденная ошибка" }
        }
    }
    async isAuthenticated(user: User): Promise<AuthRespons> {
        if (!user.id) {
            return { sucess: false }
        }
        const promis = await fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, password: user.password })
        })

        if (promis.ok) {
            return { sucess: true }
        } else {
            return { sucess: false }
        }
    }

    #returnStatus(value: AuthRespons): object {
        return value
    }
}

export { Auth }