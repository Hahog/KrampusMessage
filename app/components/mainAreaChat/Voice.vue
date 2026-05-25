<script lang="ts" setup>
import { WebRTC } from '~/composabels/WebRTC';
let room = defineProps(["Room"])
room = room.Room
console.log(room[0])
onBeforeMount(() => {
    console.log(room)
    const classWebRTC = new WebRTC(room[1].id)
})

</script>

<template>

</template>

<style></style>