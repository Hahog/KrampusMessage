<script setup lang="ts">
import LeftSidersBar from '~/components/leftSidersBar.vue';
import type { genericRef } from '~~/types/other';

definePageMeta({
    middleware: 'auth',
})

const idOpenChat: genericRef<Number> = ref(-1)

console.log(idOpenChat.value)

provide("idChatOpen", idOpenChat)
</script>


<template>
    <section class="grid grid-cols-4 h-screen box-border">
        <LeftSidersBar @exitGroup="" @openChat="(id: Number) => {idOpenChat = id}" class="col-span-1 h-screen box-border" />
        <MainAreaChat class="col-span-3 col-start-2" />
    </section>
</template>

<style lang="scss" scoped></style>