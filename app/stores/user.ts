
import type { genericRef, Setting, User } from "~~/types/other"

export const useUserStore = defineStore("User", () =>{
    let userData: genericRef<User> = ref()
    let settingUser: genericRef<Setting> = ref()
    let accessToken: genericRef<string> = ref('')
    let refreshToken: genericRef<string> = ref('')
    return {userData, settingUser, accessToken, refreshToken}
})