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
        <section :class='{"w-fit flex p-4 rounded-xl bg-body-900 flex-row-reverse gap-5 relative box-border":isActiveUser, "w-fit p-4 rounded-xl relative  bg-body-900 flex flex-row gap-5  box-border ": !isActiveUser}'>
            <p class=" text-[20px] max-w-100 text-white break-all">{{ userMessage.data }}</p>
            <article class="absolute w-full top-0 right-0 h-full">
                <p :class=" {'text-[16px] text-white/60 bg-body-100 py-0.5 px-5 rounded-full absolute bottom-[-20px]': true, 'left-0': !isActiveUser, 'right-0': isActiveUser}">{{ userMessage.time }}</p>
            </article>
        </section>
    </article>
</template>

<style scoped>

</style>