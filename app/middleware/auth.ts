import { Auth } from "~/composabels/Auth"
import { useUserStore } from "#imports"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore()
    const user  = userStore.userData
    const auth = new Auth()
    console.log(111)
    if ((await auth.isAuthenticated(user)).sucess === false) {
        return navigateTo('/auth')
    }
})