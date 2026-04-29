<script setup lang="ts">
    import { Auth } from '~/composabels/Auth';

    let emailUser = ref()
    let passwordUser = ref()
    const isThemeDefault = ref(true)

    function auth() {
        const auth = new Auth()

        auth.startAuth({email: emailUser.value, password: passwordUser.value})
    }

    function restructurTheme() {
        console.log(111)
        isThemeDefault.value = !isThemeDefault.value
    }
</script>


<template>
    <section :class='{"authPage-default":isThemeDefault,"authPage-light":!isThemeDefault, "flex-column":true, "flex-center-center": true}'>
        <form :class='{"formStyle-default":isThemeDefault, "formStyle-light":!isThemeDefault, "flex-column":true, "flex-center-center": true}'>
            <input type="email" placeholder="Email" required v-model="emailUser"></input>
            <button @click.prevent="auth()">Войти</button>
        </form>
        <p @click="restructurTheme()" class="restructurTheam">Сменить тему</p>
    </section>
</template>

<style scoped lang="scss">
   
    
</style>