<script setup lang="ts">
const nameChat = ref()
</script>

<template>
    <section @click.stop="$emit('dropDialog')"
        class="w-screen h-screen top-0 flex-row left-0 bg-body-900/80 absolute z-3 flex justify-center items-center">
        <article @click.stop=""
            class="px-10 py-15 flex flex-col z-10 gap-20 bg-body-900 justify-start items-start rounded-xl border-3 border-white">
            <section class="text-center w-full">
                <h1 class="text-[35px] text-white font-bold">Создать чат</h1>
            </section>
            <form class="flex flex-col gap-15 justify-center items-center">
                <input v-model="nameChat"
                    class="border-1 text-white border-white bg-inherit hover:bg-white/10 px-10 py-3 text-[20px] placeholder:text-white/30"
                    placeholder="Name"></input>
                <section class="flex flex-col w-full justify-start items-center gap-5 text-start">
                    <p class="text-[25px] w-full text-start text-white font-bold">Тип чата:</p>
                    <article class="flex flex-row w-full justify-between items-center">
                        <label class="text-[20px] text-white flex flex-row items-center gap-5">
                            Текстовый
                            <input name="typeChat" type="radio" class="w-[15px] h-[15px]"></input>
                        </label>
                        <label class="text-[20px] text-white flex flex-row items-center gap-5">
                            Голосовой
                            <input name="typeChat" type="radio" class="w-[15px] h-[15px] bg-inherit"></input>
                        </label>
                    </article>
                </section>
                <button @click.stop="$emit('createChat', nameChat)"
                    class="border-1 text-white/50 hover:text-white px-5 py-2 text-[20px]  border-white w-1/2 ">Создать</button>
            </form>
        </article>
    </section>
</template>

<style lang="scss">
body {
    position: relative;
}
</style>