import { Auth } from "~/composabels/Auth"
import { useUserStore } from "#imports"
import {isUser} from "../../types/predicate"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore()
    const user  = userStore.userData
    const auth = new Auth()
    console.log(111)
    
    if (user != undefined && (await auth.isAuthenticated(user)).sucess === false ) {
        return navigateTo('/auth')
    } else if (user == undefined) {
        return navigateTo('/auth')
    }
})