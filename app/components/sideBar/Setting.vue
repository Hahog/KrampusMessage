<script lang="ts" setup>
import type { genericRef, Setting, User } from "../../../types/other"
const userStor: genericRef<User> = ref()
const settingStore: genericRef<Setting> = ref()
const newDataUser: genericRef<User> = ref({
    name: "",
    secondName: "",
    userName: "",
    phone: "",
    birthday: "",
    country: "",
    bio: "",
    logo: ""
})

function openDropOption(el: HTMLElement) {
    if (el.parentElement?.parentElement?.children[1]?.classList.contains("hidden")) {
        el.parentElement?.parentElement?.children[1]?.classList.remove("hidden")
        el.classList.add("rotate-90")
    } else {
        el.parentElement?.parentElement?.children[1]?.classList.add("hidden")
        el.classList.remove("rotate-90")
    }
}

onUpdated(() => {
    userStor.value = useUserStore().userData
    settingStore.value = useUserStore().settingUser

    console.log(userStor.value?.name)
})


</script>

<template>
    <article class="flex flex-col gap-10 px-5 py-5 scrollbar-hide scroll-smooth overflow-y-auto">
        <section class="w-full text-center">
            <h1 class="text-[22px] text-white font-bold">Setting</h1>
        </section>
        <section class="flex flex-col py-4 gap-5 px-7 bg-body-500 rounded-md">
            <article class="flex flex-row justify-start items-center gap-5">
                <section class="w-10 h-fit">
                    <img class="w-10 h-fit" :src="userStor?.logo ? userStor?.logo : ''" alt="logoUser">
                </section>
                <section class="flex flex-col gap-3">
                    <h2 class=" text-white text-[20px]">{{ userStor?.name }}</h2>
                    <p class="text-white text-[16px] text-white/50">{{ userStor?.bio }}</p>
                </section>
            </article>
            <article class="flex flex-col gap-5">
                <section class="flex flex-row justify-between items-center">
                    <article class="flex flex-row gap-10 items-center">
                        <section class="flex flex-row items-center gap-5">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.28223 3.60742C9.67236 1.77036 11.9366 0.783493 14.2461 1.04004L14.3164 1.04785C14.9689 1.12038 15.6075 1.28924 16.2109 1.54785L17.0811 1.9209C18.3871 2.48079 19.5113 3.39446 20.3262 4.55859C21.9223 6.83917 22.0007 9.85332 20.5254 12.2139L20.4941 12.2627C20.6903 12.3928 20.8202 12.6153 20.8203 12.8682V13.8115C20.8202 15.155 20.0078 16.3436 18.7988 16.8516C18.5548 20.0141 15.9176 22.5418 12.6855 22.542H11.5547C8.32254 22.5419 5.68444 20.0142 5.44043 16.8516C4.23191 16.3434 3.42003 15.1547 3.41992 13.8115V12.8662C3.41992 12.8286 3.42514 12.7919 3.43066 12.7559C3.3066 12.5847 3.20364 12.4038 3.12012 12.2275C2.87091 11.7014 2.71679 11.085 2.61816 10.5264C2.51838 9.96092 2.46976 9.41675 2.44531 9.01758C2.43304 8.81715 2.42597 8.65044 2.42285 8.5332C2.4213 8.47469 2.4213 8.42798 2.4209 8.39551C2.4207 8.37941 2.41999 8.36644 2.41992 8.35742V8.3418C2.41992 5.51368 4.84854 3.29571 7.66504 3.55176L8.28223 3.60742ZM9.79102 7.92188C8.2741 7.37027 6.63768 8.418 6.52441 10.002L6.42383 11.4199C6.35506 12.3809 5.69776 13.1667 4.82031 13.4385V13.8115C4.82043 14.6834 5.41387 15.4438 6.25977 15.6553C6.59282 15.7388 6.82023 16.0378 6.82031 16.373C6.82043 18.9935 8.94556 21.1415 11.5547 21.1416H12.6855C15.2946 21.1414 17.4198 18.9934 17.4199 16.373C17.42 16.0377 17.6473 15.7387 17.9805 15.6553L18.1357 15.6094C18.8981 15.3485 19.4198 14.6291 19.4199 13.8115V13.4453C18.5355 13.1912 17.8454 12.45 17.6875 11.5039L17.5469 10.6621C17.4894 10.3177 17.345 9.9934 17.127 9.7207L16.0615 8.38965L16.0586 8.39355C15.3692 9.08293 14.5468 9.62518 13.6416 9.9873L12.4414 10.4668C12.0151 10.6373 11.5363 10.3926 11.4248 9.94727L11.3477 9.6377C11.1509 8.85076 10.5606 8.2019 9.79102 7.92188ZM9.9668 11.6895C10.6379 11.5098 11.3146 11.9057 11.5215 12.6777C11.7626 13.5781 11.2034 14.5038 10.2305 15.5762C10.1781 15.6331 10.1104 15.6943 10.0557 15.709C10.0031 15.723 9.91256 15.7046 9.83887 15.6816C8.45981 15.2394 7.51281 14.7169 7.27148 13.8164C7.06458 13.0442 7.4548 12.3625 8.12598 12.1826C8.54239 12.0712 8.92058 12.2199 9.2002 12.5146C9.29657 12.1169 9.54818 11.8016 9.9668 11.6895ZM12.5684 12.6777C12.7753 11.9056 13.4548 11.5106 14.126 11.6904C14.5421 11.8022 14.7948 12.1198 14.8896 12.5146C15.172 12.2183 15.5481 12.0714 15.9668 12.1836C16.6377 12.3636 17.0252 13.0444 16.8184 13.8164C16.5771 14.7169 15.6301 15.2393 14.251 15.6816C14.1773 15.7046 14.0888 15.7236 14.0342 15.709C13.9816 15.6949 13.9128 15.633 13.8604 15.5762C12.8872 14.5036 12.3271 13.5782 12.5684 12.6777ZM14.0918 2.43164C12.1727 2.2184 10.2906 3.09732 9.21875 4.70508C9.06662 4.93315 8.80168 5.06088 8.52734 5.03613L7.53809 4.94629C5.54152 4.76489 3.82031 6.33698 3.82031 8.3418V8.37793C3.82064 8.40428 3.82187 8.44456 3.82324 8.49609C3.82599 8.5995 3.83066 8.74964 3.8418 8.93164C3.86423 9.29792 3.90946 9.78563 3.99707 10.2822C4.08595 10.7858 4.21321 11.2637 4.38574 11.6279C4.46586 11.797 4.54499 11.9164 4.61621 12.001C4.84567 11.8553 5.00652 11.6098 5.02734 11.3203L5.12793 9.90234C5.3092 7.36512 7.90347 5.74508 10.2695 6.60547C11.3392 6.99455 12.1894 7.84051 12.582 8.90234L13.1211 8.6875C13.8503 8.39579 14.513 7.95868 15.0684 7.40332L15.625 6.84668C15.7658 6.70589 15.9604 6.63157 16.1592 6.64258C16.3578 6.65373 16.5427 6.74896 16.667 6.9043L18.2197 8.8457C18.5873 9.30522 18.831 9.85219 18.9277 10.4326L19.0684 11.2734C19.0921 11.4157 19.1448 11.5468 19.2188 11.6621L19.3389 11.4717C20.5164 9.58746 20.4528 7.18165 19.1787 5.36133C18.5133 4.41071 17.5958 3.66418 16.5293 3.20703L15.6592 2.83398C15.1824 2.62966 14.6777 2.4968 14.1621 2.43945L14.0918 2.43164Z"
                                    fill="white" />
                            </svg>
                            <p class="text-white text-[20px]">info</p>
                        </section>
                        <svg @click.stop='' width="22" height="24" viewBox="0 0 22 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.90332 12.7578C10.6597 12.8346 11.25 13.4733 11.25 14.25V18.25L11.2422 18.4033C11.1705 19.1093 10.6093 19.6705 9.90332 19.7422L9.75 19.75H5.75C4.97334 19.75 4.33461 19.1597 4.25781 18.4033L4.25 18.25V14.25C4.25 13.4216 4.92157 12.75 5.75 12.75H9.75L9.90332 12.7578ZM13.75 17.75C14.3023 17.75 14.75 18.1977 14.75 18.75C14.75 19.3023 14.3023 19.75 13.75 19.75C13.1977 19.75 12.75 19.3023 12.75 18.75C12.75 18.1977 13.1977 17.75 13.75 17.75ZM18.75 17.75C19.3023 17.75 19.75 18.1977 19.75 18.75C19.75 19.3023 19.3023 19.75 18.75 19.75C18.1977 19.75 17.75 19.3023 17.75 18.75C17.75 18.1977 18.1977 17.75 18.75 17.75ZM5.90039 18.0996H9.59961V14.4004H5.90039V18.0996ZM7.75 15.25C8.30228 15.25 8.75 15.6977 8.75 16.25C8.75 16.8023 8.30228 17.25 7.75 17.25C7.19772 17.25 6.75 16.8023 6.75 16.25C6.75 15.6977 7.19772 15.25 7.75 15.25ZM16.25 15.25C16.8023 15.25 17.25 15.6977 17.25 16.25C17.25 16.8023 16.8023 17.25 16.25 17.25C15.6977 17.25 15.25 16.8023 15.25 16.25C15.25 15.6977 15.6977 15.25 16.25 15.25ZM18.9248 12.75C19.3804 12.75 19.75 13.1196 19.75 13.5752C19.7499 14.0307 19.3804 14.4004 18.9248 14.4004H13.5752C13.1196 14.4004 12.7501 14.0307 12.75 13.5752C12.75 13.1196 13.1196 12.75 13.5752 12.75H18.9248ZM9.90332 4.25781C10.6597 4.33461 11.25 4.97334 11.25 5.75V9.75L11.2422 9.90332C11.1705 10.6093 10.6093 11.1705 9.90332 11.2422L9.75 11.25H5.75C4.97334 11.25 4.33461 10.6597 4.25781 9.90332L4.25 9.75V5.75C4.25 4.92157 4.92157 4.25 5.75 4.25H9.75L9.90332 4.25781ZM18.4033 4.25781C19.1597 4.33461 19.75 4.97334 19.75 5.75V9.75L19.7422 9.90332C19.6705 10.6093 19.1093 11.1705 18.4033 11.2422L18.25 11.25H14.25C13.4733 11.25 12.8346 10.6597 12.7578 9.90332L12.75 9.75V5.75C12.75 4.92157 13.4216 4.25 14.25 4.25H18.25L18.4033 4.25781ZM14.4004 9.59961H18.0996V5.90039H14.4004V9.59961ZM5.91016 9.58984H9.58984V5.91016H5.91016V9.58984ZM7.75 6.75C8.30228 6.75 8.75 7.19772 8.75 7.75C8.75 8.30228 8.30228 8.75 7.75 8.75C7.19772 8.75 6.75 8.30228 6.75 7.75C6.75 7.19772 7.19772 6.75 7.75 6.75ZM16.25 6.75C16.8023 6.75 17.25 7.19772 17.25 7.75C17.25 8.30228 16.8023 8.75 16.25 8.75C15.6977 8.75 15.25 8.30228 15.25 7.75C15.25 7.19772 15.6977 6.75 16.25 6.75Z"
                                fill="white" />
                        </svg>
                    </article>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        @click.stop='
                            openDropOption(($event.currentTarget as HTMLElement))
                            '>
                        <path d="M10.5 7.5L15 12L10.5 16.5" stroke="white" stroke-width="1.8" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </section>
                <section class="flex flex-col gap-5 hidden">
                    <input placeholder="New Name" type="text" v-model="newDataUser.name"
                        class="w-full px-5 py-2 text-white text-[18px] bg-body-900 rounded-full placeholder:text-white" />
                    <input placeholder="New Secondname" type="text" v-model="newDataUser.secondName"
                        class="w-full px-5 py-2 text-white text-[18px] bg-body-900 rounded-full placeholder:text-white" />
                    <input placeholder="New Username" type="text" v-model="newDataUser.userName"
                        class="w-full px-5 py-2 text-white text-[18px] bg-body-900 rounded-full placeholder:text-white" />
                    <input placeholder="New Phone" type="text" v-model="newDataUser.phone"
                        class="w-full px-5 py-2 text-white text-[18px] bg-body-900 rounded-full placeholder:text-white" />
                    <input placeholder="New Birthday" type="text" v-model="newDataUser.birthday"
                        class="w-full px-5 py-2 text-white text-[18px] bg-body-900 rounded-full placeholder:text-white" />
                    <input placeholder="New Country" type="text" v-model="newDataUser.country"
                        class="w-full px-5 py-2 text-white text-[18px] bg-body-900 rounded-full placeholder:text-white" />
                    <textarea placeholder="New Bio" v-model="newDataUser.bio"
                        class="scrollbar-hide scroll-smooth w-full h-15 px-5 py-2 text-white text-[18px] bg-body-900 rounded-full placeholder:text-white"></textarea>
                    <article class="flex flex-col gap-5">
                        <section class="flex flex-row justify-between w-full items-center">
                            <p class="text-[18px] text-white">Chat Backup</p>
                            <article class="flex flex-row gap-5 items-center">
                                <p class="text-[18px] text-white">{{ settingStore?.chatBackup }}</p>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" @click.stop='
                                        ($event) => {
                                            const el = ($event.currentTarget as HTMLElement)

                                            if (el?.parentElement?.parentElement?.parentElement?.children[1]?.classList.contains("hidden")) {
                                                el?.parentElement?.parentElement?.parentElement?.children[1]?.classList.remove("hidden")
                                                el.classList.add("rotate-90")
                                            } else {
                                                el?.parentElement?.parentElement?.parentElement?.children[1]?.classList.add("hidden")
                                                el.classList.remove("rotate-90")
                                            }
                                        }
                                    '>
                                    <path d="M10.5 7.5L15 12L10.5 16.5" stroke="white" stroke-width="1.8"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </article>
                        </section>
                        <form class="flex flex-col gap-5 pl-5 hidden">
                            <section name="chatBackup" class="flex flex-row gap-5 items-center">
                                <input name="ChatBackup" type="radio" class="w-4 h-4 bg-inherit border-1 border-white"
                                    @click="" value="on">
                                <label class="text-[18px] text-white font-bold">On</label>
                            </section>
                            <section class="flex flex-row gap-5 items-center">
                                <input name="ChatBackup" type="radio" class="w-4 h-4 bg-inherit border-1 border-white"
                                    @click="" value="off">
                                <label class="text-[18px] text-white font-bold">Off</label>
                            </section>
                        </form>
                    </article>
                </section>

            </article>
        </section>
        <section class="flex flex-col gap-5 bg-body-500 px-7 py-4 rounded-md">
            <article class="flex flex-col gap-5">
                <section class="flex flex-row items-center justify-between">
                    <article class="flex flex-row gap-5 items-center">
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 7.30029C19.9388 7.3004 20.7002 8.06167 20.7002 9.00049V19.0005C20.7001 19.9392 19.9387 20.7006 19 20.7007H5C4.06118 20.7007 3.29991 19.9393 3.2998 19.0005V9.00049C3.2998 8.0616 4.06112 7.30029 5 7.30029H19ZM5 8.70068C4.83431 8.70068 4.7002 8.8348 4.7002 9.00049V19.0005C4.7003 19.1661 4.83438 19.3003 5 19.3003H6.12207C6.19848 19.0821 6.30925 18.8674 6.45605 18.6606C6.75752 18.2361 7.19989 17.8508 7.75684 17.5259C8.31399 17.2009 8.97615 16.943 9.7041 16.7671C10.432 16.5912 11.2122 16.5005 12 16.5005C12.7879 16.5005 13.568 16.5912 14.2959 16.7671C15.0238 16.943 15.6851 17.2009 16.2422 17.5259C16.7992 17.8508 17.2414 18.2361 17.543 18.6606C17.6898 18.8674 17.8015 19.0821 17.8779 19.3003H19C19.1655 19.3002 19.2997 19.166 19.2998 19.0005V9.00049C19.2998 8.83487 19.1656 8.70079 19 8.70068H5ZM12 9.25049C13.5187 9.2506 14.75 10.5937 14.75 12.2505C14.75 13.9073 13.5187 15.2504 12 15.2505C10.4812 15.2505 9.25 13.9073 9.25 12.2505C9.25 10.5936 10.4812 9.25049 12 9.25049ZM17.8799 4.50049C18.4984 4.50052 19 5.00207 19 5.62061C18.9999 5.77519 18.8743 5.90088 18.7197 5.90088H5.28027C5.12567 5.90088 5.00006 5.77519 5 5.62061C5 5.00205 5.50156 4.50049 6.12012 4.50049H17.8799ZM16.3799 2.00049C16.9984 2.00052 17.5 2.50207 17.5 3.12061C17.4999 3.27519 17.3743 3.40088 17.2197 3.40088H6.78027C6.62567 3.40088 6.50006 3.27519 6.5 3.12061C6.5 2.50205 7.00156 2.00049 7.62012 2.00049H16.3799Z"
                                fill="white" />
                        </svg>
                        <p class="text-[20px] text-white">List</p>
                    </article>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        @click.stop='
                            openDropOption(($event.currentTarget as HTMLElement))
                            '>
                        <path d="M10.5 7.5L15 12L10.5 16.5" stroke="white" stroke-width="1.8" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </section>
                <section class="flex flex-col gap-4 pl-5 hidden">
                    <p class="text-[20px] text-white" @click.stop="">Archived Chats</p>
                    <p class="text-[20px] text-white" @click.stop="">Chat Sorting</p>
                    <p class="text-[20px] text-white" @click.stop="">Unread Messages</p>
                </section>
            </article>
            <article class="flex flex-col gap-5">
                <section class="flex flex-row items-center justify-between">
                    <article class="flex flex-row gap-5 items-center">
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_120_5799)">
                                <path
                                    d="M19 2.7998C20.2149 2.79991 21.2002 3.78504 21.2002 5V17.5C21.2001 18.7149 20.2149 19.7001 19 19.7002C17.9632 19.7002 17.096 18.982 16.8633 18.0166C15.2283 16.9107 13.0966 16.321 11.29 16.0156C10.9853 15.9641 10.6916 15.9218 10.4141 15.8857L10.9746 18.4111C11.1666 19.2754 10.7459 20.1597 9.9541 20.5557C8.97594 21.0446 7.78753 20.6234 7.33496 19.6279L5.53418 15.6689C3.71067 15.4398 2.29987 13.8856 2.2998 12V10.5C2.2998 8.45655 3.95655 6.7998 6 6.7998H8.05762C8.09833 6.79922 8.16008 6.79832 8.24023 6.7959C8.40132 6.79104 8.6379 6.78045 8.93359 6.76074C9.52638 6.72122 10.3547 6.64245 11.29 6.48438C13.0968 6.17897 15.2283 5.58848 16.8633 4.48242C17.0962 3.51729 17.9634 2.79982 19 2.7998ZM7.08789 15.7002L8.60938 19.0488C8.73363 19.3218 9.05976 19.4377 9.32812 19.3037C9.54532 19.195 9.66098 18.952 9.6084 18.7148L8.94727 15.7402C8.94269 15.7399 8.93814 15.7396 8.93359 15.7393C8.63792 15.7196 8.40132 15.7099 8.24023 15.7051C8.16008 15.7027 8.09833 15.7008 8.05762 15.7002H7.08789ZM19 4.2002C18.5582 4.20021 18.2002 4.55818 18.2002 5V17.5C18.2003 17.9417 18.5582 18.2998 19 18.2998C19.4417 18.2997 19.7997 17.9417 19.7998 17.5V5C19.7998 4.55823 19.4417 4.2003 19 4.2002ZM16.7998 6.15918C15.0877 7.0934 13.1265 7.59328 11.5234 7.86426C10.6199 8.01697 9.81206 8.09917 9.2002 8.14453V14.3555C9.81207 14.4007 10.6199 14.483 11.5234 14.6357C13.1263 14.9067 15.0878 15.4056 16.7998 16.3398V6.15918ZM6 8.2002C4.72975 8.2002 3.7002 9.22975 3.7002 10.5V12C3.70027 13.2702 4.72979 14.2998 6 14.2998H7.2998V8.2002H6Z"
                                    fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_120_5799">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <p class="text-[20px] text-white">Broadcast messages</p>
                    </article>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        @click.stop='
                            openDropOption(($event.currentTarget as HTMLElement))
                            '>
                        <path d="M10.5 7.5L15 12L10.5 16.5" stroke="white" stroke-width="1.8" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </section>
                <section class="flex flex-col gap-4 pl-5 hidden">
                    <p class="text-[20px] text-white" @click.stop="">My Broadcasts</p>
                    <p class="text-[20px] text-white" @click.stop="">Privacy Settings</p>
                    <p class="text-[20px] text-white" @click.stop="">Statistics</p>
                </section>
            </article>
            <article class="flex flex-col gap-5">
                <section class="flex flex-row items-center justify-between">
                    <article class="flex flex-row gap-5 items-center">
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.1914 2.86719C11.5025 2.18983 12.4974 2.18985 12.8086 2.86719L12.8643 3.02344L14.4785 9.08008H21.125C21.984 9.08033 22.3483 10.1739 21.6611 10.6895L16.6807 14.4248L18.3564 20.707C18.5748 21.527 17.635 22.1614 16.9561 21.6523L12 17.9355L7.04395 21.6523C6.36501 22.1613 5.42525 21.5269 5.64355 20.707L7.31836 14.4238L2.33887 10.6895C1.6518 10.1739 2.01608 9.08041 2.875 9.08008H9.52148L11.1357 3.02344L11.1914 2.86719ZM10.7734 9.81641C10.6691 10.2078 10.3143 10.4805 9.90918 10.4805H4.39355L8.43262 13.5098C8.72426 13.7286 8.85351 14.1028 8.75977 14.4551L7.37305 19.6553L11.4639 16.5879L11.5879 16.5098C11.8888 16.3534 12.258 16.3795 12.5361 16.5879L16.627 19.6553L15.2402 14.4551C15.1465 14.1028 15.2758 13.7286 15.5674 13.5098L19.6064 10.4805H14.0908C13.6857 10.4805 13.3309 10.2078 13.2266 9.81641L12 5.21582L10.7734 9.81641Z"
                                fill="white" />
                        </svg>
                        <p class="text-[20px] text-white">Starred messages</p>
                    </article>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        @click.stop='
                            openDropOption(($event.currentTarget as HTMLElement))
                            '>
                        <path d="M10.5 7.5L15 12L10.5 16.5" stroke="white" stroke-width="1.8" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </section>
                <section class="flex flex-col gap-4 pl-5 hidden">
                    <p class="text-[20px] text-white" @click.stop="">Starred Search</p>
                    <p class="text-[20px] text-white" @click.stop="">Export Starred</p>
                    <article class="flex flex-row justify-between items-center" @click.stop="">
                        <p class="text-[20px] text-white">Auto-Cleanup</p>
                        <p class="text-[16px] text-white/50 ">1 month</p>
                    </article>
                </section>
            </article>
            <article class="flex flex-col gap-5">
                <section class="flex flex-row items-center justify-between">
                    <article class="flex flex-row gap-5 items-center">
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.9004 5.79944C19.1687 5.79944 19.4125 5.79956 19.6143 5.81604C19.824 5.83321 20.0497 5.87206 20.2715 5.98499C20.5913 6.14792 20.8517 6.40842 21.0146 6.72815C21.1276 6.94985 21.1664 7.17565 21.1836 7.38538C21.2001 7.58705 21.2002 7.83108 21.2002 8.09924V17.5006H23C23.5523 17.5006 24 17.9483 24 18.5006C23.9999 19.0528 23.5522 19.5006 23 19.5006H1C0.447779 19.5006 0.000104097 19.0528 0 18.5006C0 17.9483 0.447715 17.5006 1 17.5006H2.7998V8.09924C2.7998 7.83108 2.79993 7.58705 2.81641 7.38538C2.8336 7.17565 2.87244 6.94985 2.98535 6.72815C3.14835 6.40842 3.40874 6.14792 3.72852 5.98499C3.95031 5.87206 4.17596 5.83321 4.38574 5.81604C4.58751 5.79956 4.8313 5.79944 5.09961 5.79944H18.9004ZM5.09961 7.19983C4.80829 7.19983 4.63157 7.19982 4.5 7.21057C4.40797 7.2181 4.37274 7.22893 4.36426 7.23206C4.30791 7.26076 4.2612 7.30758 4.23242 7.36389C4.22936 7.37214 4.2185 7.40743 4.21094 7.49963C4.20019 7.63115 4.2002 7.80813 4.2002 8.09924V17.5006H19.7998V8.09924C19.7998 7.80813 19.7998 7.63115 19.7891 7.49963C19.7815 7.40743 19.7706 7.37214 19.7676 7.36389C19.7388 7.30758 19.6921 7.26076 19.6357 7.23206C19.6273 7.22893 19.592 7.2181 19.5 7.21057C19.3684 7.19982 19.1917 7.19983 18.9004 7.19983H5.09961Z"
                                fill="white" />
                        </svg>
                        <p class="text-[20px] text-white">Linked devices</p>
                    </article>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        @click.stop='
                            openDropOption(($event.currentTarget as HTMLElement))
                            '>
                        <path d="M10.5 7.5L15 12L10.5 16.5" stroke="white" stroke-width="1.8" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </section>
                <section class="flex flex-col gap-4 pl-5 hidden">
                    <p class="text-[20px] text-white" @click.stop="">Add Device</p>
                    <p class="text-[20px] text-white" @click.stop="">Active Sessions</p>
                    <label @click.stop=""
                        class="flex flex-row justify-between w-full items-center text-[20px] text-white">
                        Login Alerts
                        <input class="bg-inherit w-4 h-4 border-1 border-white" type="radio">
                    </label>
                    <p class="text-[20px] text-red-500">Terminate All</p>
                </section>
            </article>
        </section>

    </article>
</template>

<style lang="scss" scoped></style>