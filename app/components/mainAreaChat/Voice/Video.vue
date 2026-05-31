<script setup lang="ts">
import { callStore } from '#imports';
const videoRef = useTemplateRef('videoRef')
const userId = defineProps(['userId'])
const call = callStore()
//const videoRef = ref<HTMLVideoElement | null>(null)
let currentStream: MediaStream | null = null

watch(
    () => call.peerConnectionUsers.get(userId.userId).stream,
    (newStream) => {
        console.log(newStream)
        console.log(videoRef.value)
        if (videoRef.value) {
            console.log(11)

            if (currentStream) {

                videoRef.value.srcObject = null;
            }
            videoRef.value.srcObject = newStream ?? null;
            currentStream = newStream ?? null;

        }
    },
    { deep: false }
);

onMounted(() => {
    if (videoRef.value && call.peerConnectionUsers.get(userId.userId)?.stream) {
        videoRef.value.srcObject = call.peerConnectionUsers.get(userId.userId)!.stream
    }
})

onUnmounted(() => {
    if (videoRef.value) {

        videoRef.value.srcObject = null;
    }
});
</script>

<template>
    <video class="bg-inherit w-80 h-50" ref="videoRef"  autoplay poster="/img/posterVideo.png" playsinline :id="`User${userId.userId}`" />
</template>

<style scoped></style>