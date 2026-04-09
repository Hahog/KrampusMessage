import { useUserStore } from '@/stores/user'
import type { AuthRespons } from "../../types/api/respons"
import type { UserData } from "../../types/forms"


class Auth {

    #user: unknown
    #noValidateData: UserData = {email: "", password: ""}
    #userStore

    constructor() {
        this.#userStore = useUserStore()
    }

    public async startAuth(user: UserData) {
        this.#noValidateData = user
        if(this.validationData()) {
            this.returnStatus(await this.authUser())
        } else {
            this.returnStatus({sucess: false, error: "Использованы запрещённые или не верные символы"})
        }
    }

    private validationData(): boolean {
        let error = 0
        const regSql = /\sOR\s\d=\d;\s\-\-/

        if(Object.keys(this.#noValidateData).indexOf("email") != -1) {
            const regEx = /^([a-zA-Z0-9\.\_\%\+\-\=\#]+)@([a-zA-Z]+)\.([a-zA-z]+)$/

            if(!regEx.test(this.#noValidateData.email) && regSql.test(this.#noValidateData.email)) {
                error ++;
            }
        }
        if(Object.keys(this.#noValidateData).indexOf("password")) {
            const regExp = /^([\w\.\_\%\+\-\#]{12,})$/

            if(!regExp.test(this.#noValidateData.password) && regSql.test(this.#noValidateData.password)) {
                error ++;
            }
        }

        if(error != 0) {
            return false
        } else {
            return true
        }
    }

    private async authUser(): Promise<AuthRespons> {
        try{
             const promis = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.#user)
            })

            if(promis.ok) {
                const user = await promis.json()
                this.#userStore.userData = user
                return {sucess: true, data: "Вы успешно вошли"}
            } else {

                return {sucess: false, error: await promis.json()}
                
            }
        } catch {
            return {sucess: false, error: "Возникла непредвиденная ошибка"}
        }
    }

    public async isAuthenticated(user: Ref): Promise<AuthRespons> {
        if (!user.value) {
            return {sucess: false}
        }
        const promis = await fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: user.value.email, password: user.value.password})
        })

        if(promis.ok) {
            return {sucess: true}
        } else {
            return {sucess: false}
        }
    }

    private returnStatus(value: AuthRespons ): object {
        return value
    }   
}

export {Auth}