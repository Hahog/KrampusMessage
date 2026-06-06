<script setup lang="ts">
import { Auth } from '~/composabels/Auth';
import type { AuthRespons } from '~~/types/api/respons';
import type { registerData } from '~~/types/forms';
import type { genericRef } from '~~/types/other';

const registerData: genericRef<registerData> = ref({
    username: '',
    lastname: '',
    firstname: '',
    password: '',
    email: '',
    two_fa_enabled: false
})

let errorData = ref('')
let responsData = ref('')
const router = useRouter()

const settingUser = useSettingUser()


async function register() {

    if (registerData.value?.email && registerData.value.firstname && registerData.value.lastname && registerData.value.password && registerData.value.username) {
        errorData.value = ''
        const auth = new Auth()

        const data = await auth.registerUser(registerData)

        if (!data.sucess) {
            if(typeof data.error == "object") {
                errorData.value = data.error.message ? data.error.message : ''
            } else {
                errorData.value = data.error ? data.error : ''
            }
        } else {
            responsData.value = "Вы успешно зарегистрировали аккаунт"
            setTimeout(() => {
                router.push({ path: "/auth" })
            }, 1000)
        }
    } else {
        errorData.value = settingUser.language == "Englend" ? 'Not all fields are filled in' : "Не все поля заполнены"
    }
}

</script>


<template>
    <section class="flex flex-col gap-5 w-full h-fit justify-center items-center min-h-screen">
        <form class="flex flex-col gap-10 mb-5 px-5 py-5 rounded-md justify-center items-center">
            <input
                class="border-1 text-white border-white bg-inherit hover:bg-white/10 px-10 py-3 text-[20px] placeholder:text-white/10"
                type="text" :placeholder="settingUser.language == 'Englend' ? 'Firstname' : 'Имя'" required
                v-model="registerData.firstname"></input>
            <input
                class="border-1 text-white border-white bg-inherit hover:bg-white/10 px-10 py-3 text-[20px] placeholder:text-white/10"
                type="text" :placeholder="settingUser.language == 'Englend' ? 'Lastname' : 'Фамилия'" required
                v-model="registerData.lastname"></input>
            <input
                class="border-1 text-white border-white bg-inherit hover:bg-white/10 px-10 py-3 text-[20px] placeholder:text-white/10"
                type="text" :placeholder="settingUser.language == 'Englend' ? 'Login' : 'Логин'" required
                v-model="registerData.username"></input>
            <input
                class="border-1 text-white border-white bg-inherit hover:bg-white/10 px-10 py-3 text-[20px] placeholder:text-white/10"
                type="email" :placeholder="settingUser.language == 'Englend' ? 'Email' : 'Почта'" required
                v-model="registerData.email"></input>
            <input
                class="border-1 text-white border-white bg-inherit hover:bg-white/10 px-10 py-3 text-[20px] placeholder:text-white/10"
                type="password" :placeholder="settingUser.language == 'Englend' ? 'Password' : 'Пароль'" required
                minlength="8" v-model="registerData.password"></input>
            <p class="text-[16px] font-bold text-red-500" v-if="errorData">{{ errorData }}</p>
            <p class="text-[16px] font-bold text-white bg-green-500" v-if="responsData">{{ responsData }}</p>
            <button class="border-1 text-white/50 hover:text-white px-5 py-2 text-[20px]  border-white w-1/2 "
                @click.prevent="register()">{{ settingUser.language == 'Englend' ? 'Register' :'Зарегистрироваться'}}</button>
        </form>
        <NuxtLink class="text-[20px] text-white/50 hover:text-white" to="auth">{{ settingUser.language == "Englend" ? 'Do you have an account ? Enter!' : 'Есть аккаунт ? Войдите!'}}</NuxtLink>
    </section>
</template>

<style scoped lang="scss"></style>