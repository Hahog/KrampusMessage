<script lang="ts" setup>



const groupsAll = ref([
    {
        src: "/img/test.png",
        name: "New",
        id: 11,
    },
    {
        src: "/img/test.png",
        name: "New",
        id: 11
    },
    {
        src: "/img/test.png",
        name: "New",
        id: 11
    },
    {
        src: "/img/test.png",
        name: "New",
        id: 11
    },
    {
        src: "/img/test.png",
        name: "New",
        id: 11
    }
])

function optionGroup() {

}

const isActiveGroup = ref(true)
</script>

<template>
    <article :class='{ "grid": isActiveGroup, "grid-cols-5": isActiveGroup, "h-full": true }'>
        <section
            :class='{ "flex": true, "justify-start": isActiveGroup, "items-center": isActiveGroup, "overflow-y-auto": true, "pt-10": true, "min-h-full": true, "flex-col": true, "border-r-3": isActiveGroup, "border-body-500": isActiveGroup, "gap-6": true, "pl-2": !isActiveGroup, "px-2": isActiveGroup, "w-full": !isActiveGroup, "scrollbar-hide":true, "scroll-smooth":true}'>
            <article
                :class='{ "flex": true, "hover:bg-white/10": !isActiveGroup, "flex-row": true, "justify-between": true, "jutify-center": true, "items-center": true, "w-full": !isActiveGroup }'
                v-for="el in groupsAll" :key="el.id" @click="">
                    <img :src="el.src" class="w-10 h-10">
                    <p :class='{ "text-[18px]": true, "text-white": true, "font-bold": true, "hidden": isActiveGroup }'>
                        {{ el.name }}</p>
            </article>
        </section>
        <section
            :class='{ "flex": isActiveGroup, "flex-col": isActiveGroup, "cols-start-2": isActiveGroup, "col-span-4": isActiveGroup, "gap-5": isActiveGroup, "hidden": !isActiveGroup, }'>
            <article class="flex flex-row justify-between px-4 py-2 border-b-4 border-body-500 ">
                <section class="flex flex-col gap-1 text-start">
                    <h2 class="text-[26px] text-white/80">NewTest</h2>
                    <p class="text-[16px] text-white">322 users</p>
                </section>
                <section class="flex flex-row gap-10 justify-center items-center">
                    <svg @click="optionGroup()" width="7" height="34" viewBox="0 0 7 34" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M0 3.33333C0 4.21739 0.35119 5.06523 0.976311 5.69036C1.60143 6.31548 2.44928 6.66667 3.33333 6.66667C4.21739 6.66667 5.06523 6.31548 5.69036 5.69036C6.31548 5.06523 6.66667 4.21739 6.66667 3.33333C6.66667 2.44928 6.31548 1.60143 5.69036 0.976311C5.06523 0.351189 4.21739 0 3.33333 0C2.44928 0 1.60143 0.351189 0.976311 0.976311C0.35119 1.60143 0 2.44928 0 3.33333ZM3.33333 20C2.44928 20 1.60143 19.6488 0.976311 19.0237C0.35119 18.3986 0 17.5507 0 16.6667C0 15.7826 0.35119 14.9348 0.976311 14.3096C1.60143 13.6845 2.44928 13.3333 3.33333 13.3333C4.21739 13.3333 5.06523 13.6845 5.69036 14.3096C6.31548 14.9348 6.66667 15.7826 6.66667 16.6667C6.66667 17.5507 6.31548 18.3986 5.69036 19.0237C5.06523 19.6488 4.21739 20 3.33333 20ZM3.33333 33.3333C2.44928 33.3333 1.60143 32.9821 0.976311 32.357C0.35119 31.7319 0 30.8841 0 30C0 29.1159 0.35119 28.2681 0.976311 27.643C1.60143 27.0179 2.44928 26.6667 3.33333 26.6667C4.21739 26.6667 5.06523 27.0179 5.69036 27.643C6.31548 28.2681 6.66667 29.1159 6.66667 30C6.66667 30.8841 6.31548 31.7319 5.69036 32.357C5.06523 32.9821 4.21739 33.3333 3.33333 33.3333Z"
                            fill="white" />
                    </svg>
                    <svg @click='$emit("exitGroup")' width="34" height="40" viewBox="0 0 34 40" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M33.1767 19.169L26.9494 12.942C26.4903 12.4828 25.7473 12.4822 25.2881 12.9383C24.8277 13.3947 24.8234 14.1394 25.2777 14.6017L29.4329 18.8281H12.7054C12.0555 18.8281 11.5283 19.3499 11.5283 20C11.5283 20.6501 12.0555 21.1719 12.7054 21.1719H29.5027L25.2844 25.3928C24.8252 25.8523 24.8252 26.5993 25.2844 27.0588C25.5143 27.2886 25.8159 27.4044 26.1169 27.4044C26.4179 27.4044 26.7195 27.2898 26.9494 27.0599L33.1767 20.8331C33.3973 20.6124 33.5212 20.3131 33.5212 20.001C33.5212 19.689 33.3974 19.3897 33.1767 19.169Z"
                            fill="white" />
                        <path
                            d="M24.0625 30.7638C23.4127 30.7638 22.8906 31.2907 22.8906 31.9408V37.6562H2.34375V2.34375H22.8906V8.06156C22.8906 8.71168 23.4127 9.23859 24.0625 9.23859C24.7123 9.23859 25.2344 8.71168 25.2344 8.06156V1.16852C25.2344 0.518359 24.6996 0 24.0498 0H1.17598C0.526172 0 0 0.518359 0 1.16852V38.8339C0 39.484 0.526172 40 1.17602 40H24.0499C24.6997 40 25.2344 39.484 25.2344 38.8339V31.9408C25.2344 31.2907 24.7123 30.7638 24.0625 30.7638Z"
                            fill="white" />
                    </svg>
                </section>
            </article>
            <article>
                <section v-for="el in el">
                    <article>
                        <p></p>
                        <img @click="" src="" alt="">
                    </article>
                    <article class="" @click="" v-for="el in el">
                        <img src="" alt="">
                        <p></p>
                        <div>1</div>
                    </article>
                </section>
            </article>
        </section>
    </article>
</template>

<style lang="scss" scoped></style>