<script setup lang="ts">
    let userMessage = defineProps(["messageData"])
    userMessage = userMessage.messageData
    
    const isActiveUser = ref(false)

    onMounted(() => {
        const userStore = useUserStore()

        isActiveUser.value = userMessage.name == userStore.userData.userName
    })
</script>

<template>
    <article :class='{"w-full  flex justify-end":isActiveUser, "w-full h-fit":!isActiveUser}'>
        <section :class='{"w-fit flex flex-row-reverse gap-5 box-border":isActiveUser, "w-fit flex flex-row gap-5  box-border ": !isActiveUser}'>
            <section class=" relative flex justify-center w-20 h-20">
                <img class="w-15 h-15 rounded-full " :src='userMessage.srcImg' alt="lgogUser"> 
                <p class="absolute py-0.5 px-3 rounded-full bottom-[0%] bg-body-100 text-[18px] text-white/50">{{ userMessage.time }}</p>
            </section>
            <section class="flex max-w-100 relative mt-10 items-center bg-body-900 box-border break-all h-fit p-3 rounded-xl">
                <p class="rounded-full absolute -top-5 left-0 py-0.5 px-3 bg-body-100 text-[18px] text-white">{{ userMessage.name }}:</p>
                <p class=" text-[20px] text-white break-all">{{ userMessage.data }}</p>
            </section>
        </section>
    </article>
</template>

<style scoped>

</style>