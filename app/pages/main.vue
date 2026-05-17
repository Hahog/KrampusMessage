<script setup lang="ts">
/*definePageMeta({
    middleware: 'auth',
})*/
</script>


<template>
    <section class="grid grid-cols-4 h-screen box-border">
        <SidersBar @exitGroup="" class="col-span-1 h-screen box-border" />
        <MainAreaChat class="col-span-3 col-start-2" />
    </section>
</template>

<style lang="scss" scoped></style>