<script setup lang="ts">

</script>


<template>
    <section class="mainPage">
        <SidersBar/>
        <MainAreaChat/>
    </section>
</template>

<style lang="scss" scoped>
    .mainPage {
        width: 100vw;
        height: 100vh;
        background-color: &backgroundColor;
        display: grid;
        grid-template-columns: 1fr 4fr;
        
    }
</style>