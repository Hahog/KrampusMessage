import { defineStore } from 'pinia'

export const useUserStore = defineStore("User", () =>{
    let userData: Ref = ref({})

    return {userData}
})