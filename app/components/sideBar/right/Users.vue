<script setup lang="ts">
import { GroupManagment } from '~/composabels/groupManagment'

let roomData = defineProps(["RoomData"])
roomData = roomData.RoomData
console.log(roomData)
const settingUser = useSettingUser()

let allUsersGroup = ref()

onMounted(() => {
    const classGroup = new GroupManagment(roomData.id)
    console.log(roomData.RoomData)
    //allUsersGroup.value = classGroup.requreAllUser()
})

function openDropUser(el: HTMLElement) {
    if (el.parentElement?.parentElement?.children[1]?.classList.contains("hidden")) {
        el.parentElement?.parentElement?.children[1]?.classList.remove("hidden")
        el.classList.add("rotate-90")
    } else {
        el.parentElement?.parentElement?.children[1]?.classList.add("hidden")
        el.classList.remove("rotate-90")
    }
}
</script>

<template>
    <section class="h-full w-full flex flex-col gap-4">
        <article class="flex flex-col gap-4 px-2 py-6">
            <section class="flex flex-row justify-start items-center gap-3">
                <svg width="30" height="26" viewBox="0 0 28 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.51444 2.13923C5.24165 3.56915 3.52251 5.66358 2.61795 8.10463C1.71338 10.5457 1.67276 13.2001 2.50226 15.6651C2.73218 16.385 2.70919 17.1485 2.27234 17.7594L0.364038 20.6391C0.141344 20.9684 0.0161075 21.3485 0.00145149 21.7396C-0.0132045 22.1307 0.0832618 22.5183 0.280739 22.8618C0.478216 23.2053 0.769432 23.4921 1.12388 23.6922C1.47832 23.8922 1.88294 23.9981 2.29534 23.9987H14.9407C18.3478 24.0454 21.6353 22.8088 24.0832 20.5597C26.531 18.3106 27.9395 15.2326 28 12C27.9395 8.7674 26.531 5.68935 24.0832 3.4403C21.6353 1.19124 18.3478 -0.0454209 14.9407 0.00127599C12.1817 0.00127599 9.60668 0.786646 7.51444 2.13923Z"
                        fill="white" />
                </svg>
                <p class="text-[20px] font-bold text-white">{{ roomData.name }}</p>
            </section>
            <p class="text-[18px] text-white/50">{{ roomData.description }}</p>
            <section class="flex flex-col gap-2 p-2 justiyf-start items-start">
                <p class="text-[15px] text-white/50 p-2">{{settingUser.language == 'Englend' ? 'Members' : 'Пользователи'}}</p>
                <hr class="w-full h-[5px] bg-white rounded-full">
            </section>
        </article>
        <article class="flex flex-col gap-7 px-5 py-2 items-start justify-start">
            <section class="flex flex-col gap-4 py-2 px-2" v-for="el in groupUser" :key="el.id">
                <article class="flex flex-row justify-start items-center gap-4" @click.stop='
                    openDropUser($event.currentTarget as HTMLElement)
                    '>
                    <svg class="fill-white/100 rotate-90" width="25" height="15" viewBox="0 0 25 15" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.526313 0.659511C0.858915 0.318085 1.30608 0.126843 1.77182 0.126843C2.23756 0.126843 2.68473 0.318085 3.01733 0.659511L12.4476 10.5169L21.8779 0.640876C22.0387 0.447095 22.2361 0.29022 22.4576 0.180093C22.679 0.0699668 22.9199 0.00896447 23.1649 0.00091577C23.41 -0.00713293 23.654 0.037945 23.8816 0.133321C24.1093 0.228696 24.3156 0.372312 24.4877 0.555157C24.6599 0.738001 24.7941 0.956128 24.8819 1.19585C24.9697 1.43558 25.0093 1.69173 24.9982 1.94823C24.987 2.20473 24.9253 2.45604 24.817 2.68641C24.7088 2.91678 24.5562 3.12122 24.3689 3.28691L13.6931 14.4673C13.3605 14.8088 12.9133 15 12.4476 15C11.9819 15 11.5347 14.8088 11.2021 14.4673L0.526313 3.28691C0.359542 3.11368 0.227172 2.90759 0.13684 2.68052C0.0465073 2.45344 0 2.20988 0 1.96389C0 1.7179 0.0465073 1.47434 0.13684 1.24727C0.227172 1.0202 0.359542 0.814104 0.526313 0.640876V0.659511Z" />
                    </svg>
                    <p class="text-[20px] font-bold text-white/50">{{ el.name }} - {{ }}</p>
                </article>
                <article class="hidden flex flex-col gap-5 pl-5 items-start justify-start">
                    <section class="flex flex-row justify-start gap-4 items-center p-2" v-for="user in add" :key="el.id">
                        <img class="w-15 h-15" :src="fsf" alt="logoUser">
                        <p class="text-[18px]" :style="{color: '#fffff'}"></p>
                    </section>
                </article>
            </section>
        </article>
    </section>
</template>

<style scoped></style>