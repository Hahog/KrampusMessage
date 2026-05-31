<script lang="ts" setup>
import { WebRTC } from '~/composabels/WebRTC';
let room = defineProps(["Room"])
const user = useUserStore()
const peerConectionUser = callStore()
let userArray = computed(() => {
    return Array.from(peerConectionUser.peerConnectionUsers.entries())
})


let countVideoInPage = computed(() => {
    return 6
})

const curentPage = ref(1)

let allPage = computed(() => {
    return Math.ceil(userArray.value.length / countVideoInPage.value)
})

const sliceUserArray = computed(() => {
    let start = (curentPage.value - 1) * countVideoInPage.value
    let end = start + countVideoInPage.value

    return userArray.value.slice(start, end)
})




room = room.Room
let userCount: Number = -1
console.log(room[0])
console.log(111)

const classWebRTC = new WebRTC(room[1].id, "call")
onBeforeMount(async () => {
    console.log(room)
    const webSoket = classWebRTC.getWebSoketObject()
    webSoket.onopen = () => {
        webSoket.send(JSON.stringify({ type: "checkCountUserCall", id: user.userData ? user.userData.id : "id" }))
    }
    webSoket.onmessage = async (event) => {
        console.log(JSON.parse(event.data))
        userCount = await (JSON.parse(event.data)).count
        if (userCount) {
            classWebRTC.connectionCall()
        } else {
            classWebRTC.startCall()
        }
    }
})

onMounted(() => {
    console.log(userCount)

})

onUnmounted(() => {
    const webSoket = classWebRTC.getWebSoketObject()
    classWebRTC.stopTrack()
    webSoket.close()
})

watch(() => peerConectionUser.peerConnectionUsers, (peerUser) => {
    console.log(peerUser)
}, {deep: true}) 

function leftPagination() {

}

function rightPagination() {

}

</script>

<template>
    <section class="w-full min-h-screen">
        <article class=" w-full h-screen flex relative flex-col justify-center items-center gap-5">
            <section v-if="allPage != 1" class="absolute flex z-10 flex-row items-center w-full h-full top-0 left-0">
                <div @click.stop="curentPage === 1 ? curentPage = allPage : curentPage -= 1" class="w-20 h-20 bg-white absolute left-10 "></div>
                <div @click.stop="curentPage === allPage ? 1 : curentPage += 1" class="w-20 h-20 bg-white absolute right-10"></div>
            </section>
            <section class="w-full h-full flex flex-row gap-5 justify-center content-center items-center flex-wrap">
                <MainAreaChatVoiceVideo v-for="[userId, data] in sliceUserArray" :key="userId" :userId="userId"/>
                <!---<video class="bg-blue-500 w-80 h-50 border-2 border-green-500"></video>
                <video class="bg-blue-500 w-80 h-50 border-2 border-green-500"></video>
                <video class="bg-blue-500 w-80 h-50 border-2 border-green-500"></video>
                <video class="bg-blue-500 w-80 h-50 border-2 border-green-500"></video>
                <video class="bg-blue-500 w-80 h-50 border-2 border-green-500"></video>--->
            </section>
        </article>
        <article class="" v-if="peerConectionUser.peerConnectionUsers.size">
            
        </article>
    </section>
</template>

<style></style>