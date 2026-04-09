<script setup lang="ts">
    import { Auth } from '~/composabels/Auth';

    let emailUser = ref(),
        passwordUser = ref(),
        loginUser = ref()
    const isThemeDefault = ref(true)

    function register() {
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
            <input type="text" placeholder="Login" required v-model="loginUser"></input>
            <input type="email" placeholder="Email" required v-model="emailUser"></input>
            <input type="password" placeholder="Password" required minlength="8" v-model="passwordUser"></input>
            <button @click.prevent="register()">Войти</button>
        </form>
        <NuxtLink to="auth" class="link">Есть аккаунт? Войдите!</NuxtLink>
        <p @click="restructurTheme()" class="restructurTheam">Сменить тему</p>
    </section>
</template>

<style scoped lang="scss">
    @import "../assets/style/scss/_variables.scss";
    @import "../assets/style/scss/_flexStyle.scss";

    .authPage-default {
        width: 100vw;
        height: 100vh;
        background-color: $backgroundColor;
        gap: 10px;

        .link {
            color:white;
            text-decoration: none;
            cursor: pointer;

            &:hover {
                color:#5865F2;
                transition: 0.2s;
            }
        }

        .restructurTheam {
            color:rgba(88, 101, 242, 0.6);
            cursor: pointer;

            &:hover {
                color:#5865F2;
            }
        }
    }

    .authPage-light {
        width: 100vw;
        height: 100vh;
        background-color: white;
        gap: 10px;

        .link {
            color: $backgroundColor;
            text-decoration: none;
            cursor: pointer;

            &:hover {
                color:#5865F2;
                transition: 0.2s;
            }
        }

        .restructurTheam {
            color:rgba(88, 101, 242, 0.6);
            cursor: pointer;

            &:hover {
                color:#5865F2;
            }
        }
    }

    .formStyle-default {
        gap: 15px;

        input {
            width: 300px;
            height: 35px;
            border: 1px solid $textColor;
            background-color: inherit;
            padding: 5px 15px;
            color:#FFFFFF;
            font-size: 18px;

            &::placeholder {
                color: rgba(#FFFFFF, 0.5);
                font-size: 18px;
            }

            &:hover {
                background-color: rgba( #FFFFFF, 0.1);
                transition: 0.2s;
            }

            &:focus {
                background-color: rgba( #FFFFFF, 0.1);
                border-radius: none;
            }
        }

        button {
            width: 150px;
            height: 45px;
            font-size: 20px;
            color:#FFFFFF;
            background-color: inherit;
            border: 1px solid #FFFFFF;
            cursor: pointer;

            &:hover {
                background: linear-gradient(135deg,#5865F2 -50%, #3BA55C);
                transition: 0.2s;
            }
        }


    }

    .formStyle-light {
        gap: 15px;

        input {
            width: 300px;
            height: 35px;
            border: 1px solid black;
            background-color: inherit;
            padding: 5px 15px;
            color:#000000;
            font-size: 18px;

            &::placeholder {
                color: rgba(#000000, 0.5);
                font-size: 18px;
            }

            &:hover {
                background-color: rgba( #000000, 0.1);
                transition: 0.2s;
            }

            &:focus {
                background-color: rgba( #000000, 0.1);
                border-radius: none;
            }
        }

        button {
            width: 150px;
            height: 45px;
            font-size: 20px;
            color:#000000;
            background-color: inherit;
            border: 1px solid #000000;
            cursor: pointer;

            &:hover {
                background: linear-gradient(135deg,#5865F2 -50%, #3BA55C);
                transition: 0.2s;
            }
        }
    }
    
</style>