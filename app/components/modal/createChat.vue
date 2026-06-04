<script setup lang="ts">
import type { genericRef } from '~~/types/other';

const dataChat: genericRef<{name: string, setting: {type: string}}> = ref({name: "", setting: {type: ""}})
const nameFolder = ref()
const typeCreate = ref("chat")
</script>

<template>
    <section @click.stop="$emit('dropDialog')"
        class="w-screen h-screen top-0 flex-row left-0 bg-body-900/80 absolute z-3 flex justify-center items-center">
        <article @click.stop=""
            class="px-10 py-15 flex flex-col z-10 gap-20 bg-body-900 justify-start items-start rounded-xl border-3 border-white">
            <section class="flex flex-row gap-10 w-full justify-center items-center">
                <p @click.stop="typeCreate = 'chat'" :class="{'text-[20px] font-bold': true, 'text-white': typeCreate == 'chat' ? true : false, 'text-white/50 hover:text-white': typeCreate != 'chat' ? true : false}">Chat</p>
                <p @click.stop="typeCreate = 'folder'" :class="{'text-[20px] font-bold': true, 'text-white': typeCreate == 'folder' ? true : false, 'text-white/50 hover:text-white': typeCreate != 'folder' ? true : false}">Folder</p>
            </section>
            <section v-if="typeCreate == 'chat'" class="flex flex-col gap-10">
                <section class="text-center w-full">
                    <h1 class="text-[35px] text-white font-bold">Create chat</h1>
                </section>
                <form class="flex flex-col gap-15 justify-center items-center">
                    <input v-model="dataChat.name"
                        class="border-1 text-white border-white bg-inherit hover:bg-white/10 px-10 py-3 text-[20px] placeholder:text-white/30"
                        placeholder="Name"></input>
                    <section class="flex flex-col w-full justify-start items-center gap-5 text-start">
                        <p class="text-[25px] w-full text-start text-white font-bold">Type chat:</p>
                        <article class="flex flex-row w-full justify-between items-center">
                            <label class="text-[25px] text-white flex flex-row items-center gap-5">
                                Text
                                <input @click.stop="dataChat.setting.type = 'text'" name="typeChat" type="radio" class="w-[20px] h-[20px]"></input>
                            </label>
                            <label class="text-[25px] text-white flex flex-row items-center gap-5">
                                Voice
                                <input @click.stop="dataChat.setting.type = 'voice'" name="typeChat" type="radio" class="w-[20px] h-[20px] bg-inherit"></input>
                            </label>
                        </article>
                    </section>
                    <button @click.stop="$emit('createChat', nameChat)"
                        class="border-1 text-white/50 hover:text-white px-5 py-2 text-[20px]  border-white w-1/2 ">Create</button>
                </form>
            </section>
            <section class="flex flex-col gap-10" v-if="typeCreate == 'folder'">
                <section class="text-center w-full">
                    <h1 class="text-[35px] text-white font-bold">Create folder</h1>
                </section>
                <form class="flex flex-col gap-15 justify-center items-center">
                    <input v-model="nameFolder"
                        class="border-1 text-white border-white bg-inherit hover:bg-white/10 px-10 py-3 text-[20px] placeholder:text-white/30"
                        placeholder="Name"></input>
                    <button @click.stop="$emit('createFolder', nameFolder)"
                        class="border-1 text-white/50 hover:text-white px-5 py-2 text-[20px]  border-white w-1/2 ">Create</button>
                </form>
            </section>
        </article>
    </section>
</template>

<style lang="scss">
body {
    position: relative;
}
</style>