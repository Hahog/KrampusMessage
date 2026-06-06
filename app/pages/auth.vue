<script setup lang="ts">
import { Auth } from '~/composabels/Auth';

const router = useRouter()
let emailUser = ref()
let passwordUser = ref()
let responsData = ref('')
const isThemeDefault = ref(true)
let errorData = ref('')
const settingUser = useSettingUser()

async function auth() {
    if (emailUser.value && passwordUser.value) {
        errorData.value = ''
        const auth = await new Auth()

        const data = await auth.startAuth({ email: emailUser.value, password: passwordUser.value })

        if(!data.sucess) {
            if(typeof data.error == "object") {
                errorData.value = data.error.message ? data.error.message : ''
            } else {
                errorData.value = data.error ? data.error : ''
            }
            
        } else {
            if(typeof data.data == "object") {
                responsData.value = "Успешно"
            } else {
                responsData.value = data.data ? data.data : ''
            }
        }

        await router.push({ path: "/main" })
    } else {
        errorData.value = "Не все поля заполнены!"
    }

}

function restructurTheme() {

    isThemeDefault.value = !isThemeDefault.value
}
</script>


<template>
    <section class="flex flex-col gap-5 w-full h-fit justify-center items-center min-h-screen">
        <form class="flex flex-col gap-10 mb-5 px-5 py-5 rounded-md justify-center items-center">
            <input
                class="border-1 text-white border-white bg-inherit hover:bg-white/10 px-10 py-3 text-[20px] placeholder:text-white/10"
                type="email" :placeholder="settingUser.language == 'Englend' ? 'Email' : 'Почта'" required
                v-model="emailUser"></input>
            <input
                class="border-1 text-white border-white bg-inherit hover:bg-white/10 px-10 py-3 text-[20px] placeholder:text-white/10"
                type="password" :placeholder="settingUser.language == 'Englend' ? 'Password' : 'Пароль'" required
                minlength="8" v-model="passwordUser"></input>
            <p class="text-[16px] text-red-500 font-bold" v-if="errorData"> {{ errorData }} </p>
            <p class="text-[20px] text-green-500 font-bold" v-if="responsData">{{ responsData }}</p>
            <button class="border-1 text-white/50 hover:text-white px-5 py-2 text-[20px]  border-white w-1/2 "
                @click.prevent="auth()">{{ settingUser.language == 'Englend' ? 'Enter' : 'Войти' }}</button>
        </form>
        <NuxtLink class="text-[20px] text-white/50 hover:text-white" to="register">{{ settingUser.language == 'Englend' ? 'No account? Create it!' : 'Нет аккаунта? Создайте!'}}</NuxtLink>
        <NuxtLink class="text-[20px] text-white/50 hover:text-white" to="recoveryPassword">{{ settingUser.language == 'Englend' ? 'I forgot my password!' : 'Забыл пароль!' }}</NuxtLink>

    </section>
</template>

<style scoped lang="scss"></style>