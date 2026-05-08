<script lang="ts" setup>
const groupsAll = ref([
    {
        src: "/img/test.png",
        name: "New",
        id: 11,
        user: 332,
        chat: {
            One: {
                New: {
                    type: "chat",
                    id: 1,
                    newMessage: true,
                },
                Bag: {
                    type: "chat",
                    id: 2,
                    newMessage: false,
                },
                BagTwo: {
                    type: "voice",
                    id: 2,
                    newMessage: false,
                },
            },
            Two: {
                New: {
                    type: "chat",
                    id: 1,
                    newMessage: true,
                },
                Bag: {
                    type: "chat",
                    id: 2,
                    newMessage: false,
                },
                BagTwo: {
                    type: "voice",
                    id: 2,
                    newMessage: false,
                },
            },
        },
    },
    {
        src: "/img/test.png",
        name: "New",
        id: 11,
        user: 456,
        chat: {
            One: {
                New: {
                    type: "chat",
                    id: 1,
                    newMessage: true,
                },
                Bag: {
                    type: "chat",
                    id: 2,
                    newMessage: false,
                },
                BagTwo: {
                    type: "voice",
                    id: 2,
                    newMessage: false,
                },
            },
            Two: {
                New: {
                    type: "chat",
                    id: 1,
                    newMessage: true,
                },
                Bag: {
                    type: "chat",
                    id: 2,
                    newMessage: false,
                },
                BagTwo: {
                    type: "voice",
                    id: 2,
                    newMessage: false,
                },
            },
        },
    },
    {
        src: "/img/test.png",
        name: "New",
        id: 11,
    },
    {
        src: "/img/test.png",
        name: "New",
        id: 11,
    },
    {
        src: "/img/test.png",
        name: "New",
        id: 11,
    },
]);

const activeGroup = ref();

function optionGroup() { }
</script>

<template>
    <article :class="{ grid: activeGroup, 'grid-cols-5': activeGroup, 'h-full': true }">
        <section :class="{
            flex: true,
            'justify-start': activeGroup,
            'items-center': activeGroup,
            'overflow-y-auto': true,
            'pt-10': true,
            'min-h-full': true,
            'flex-col': true,
            'border-r-3': activeGroup,
            'border-body-100': activeGroup,
            'gap-6': true,
            'pl-2': !activeGroup,
            'px-2': activeGroup,
            'w-full': !activeGroup,
            'scrollbar-hide': true,
            'scroll-smooth': true,
        }">
            <article :class="{
                flex: true,
                'hover:bg-white/10': !activeGroup,
                'flex-row': true,
                'gap-10': true,
                'jutify-center': true,
                'items-center': true,
                'w-full': !activeGroup,
            }" v-for="el in groupsAll" :key="el.id" @click="
                () => {
                    activeGroup = el;
                }
            ">
                <img :src="el.src" class="w-10 h-10" />
                <p :class="{
                    'text-[18px]': true,
                    'text-white': true,
                    'font-bold': true,
                    hidden: activeGroup,
                }">
                    {{ el.name }}
                </p>
            </article>
        </section>
        <section v-if="activeGroup" :class="{
            'flex': activeGroup,
            'flex-col': activeGroup,
            'cols-start-2': activeGroup,
            'col-span-4': activeGroup,
            'gap-5': activeGroup,
            'hidden': !activeGroup,
            'animate-group': activeGroup,
        }">
            <article class="flex flex-row justify-between px-4 py-2 border-b-4 border-body-100">
                <section class="flex flex-col gap-1 text-start">
                    <h2 class="text-[26px] text-white/80">{{ activeGroup.name }}</h2>
                    <p class="text-[16px] text-white">{{ activeGroup.user }} members</p>
                </section>
                <section class="flex flex-row gap-10 justify-center items-center">
                    <svg @click="optionGroup()" width="7" height="34" viewBox="0 0 7 34" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M0 3.33333C0 4.21739 0.35119 5.06523 0.976311 5.69036C1.60143 6.31548 2.44928 6.66667 3.33333 6.66667C4.21739 6.66667 5.06523 6.31548 5.69036 5.69036C6.31548 5.06523 6.66667 4.21739 6.66667 3.33333C6.66667 2.44928 6.31548 1.60143 5.69036 0.976311C5.06523 0.351189 4.21739 0 3.33333 0C2.44928 0 1.60143 0.351189 0.976311 0.976311C0.35119 1.60143 0 2.44928 0 3.33333ZM3.33333 20C2.44928 20 1.60143 19.6488 0.976311 19.0237C0.35119 18.3986 0 17.5507 0 16.6667C0 15.7826 0.35119 14.9348 0.976311 14.3096C1.60143 13.6845 2.44928 13.3333 3.33333 13.3333C4.21739 13.3333 5.06523 13.6845 5.69036 14.3096C6.31548 14.9348 6.66667 15.7826 6.66667 16.6667C6.66667 17.5507 6.31548 18.3986 5.69036 19.0237C5.06523 19.6488 4.21739 20 3.33333 20ZM3.33333 33.3333C2.44928 33.3333 1.60143 32.9821 0.976311 32.357C0.35119 31.7319 0 30.8841 0 30C0 29.1159 0.35119 28.2681 0.976311 27.643C1.60143 27.0179 2.44928 26.6667 3.33333 26.6667C4.21739 26.6667 5.06523 27.0179 5.69036 27.643C6.31548 28.2681 6.66667 29.1159 6.66667 30C6.66667 30.8841 6.31548 31.7319 5.69036 32.357C5.06523 32.9821 4.21739 33.3333 3.33333 33.3333Z"
                            fill="white" />
                    </svg>
                    <svg @click="$emit('exitGroup')" width="34" height="40" viewBox="0 0 34 40" fill="none"
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
            <article class="flex flex-col gap-2">
                <section class="flex flex-col gap-2 px-5 text-[22px] text-white"
                    v-for="el in Object.keys(activeGroup.chat)" :key="activeGroup.id">
                    <article @click="($event) => {
                        const el = ($event.currentTarget as HTMLElement)
                        if (el?.children[0]?.classList.contains('rotate-90')) {
                            el?.parentElement?.children[1]?.classList.remove('hidden');
                            el?.children[0]?.classList.remove('rotate-90');
                        } else {
                            el?.parentElement?.children[1]?.classList.add('hidden');
                            el?.children[0]?.classList.add('rotate-90');
                        }

                    }" class="flex flex-row justify-start gap-5 mb-2 items-center hover:bg-white/10 p-2">
                        <svg class="fill-white/100 rotate-90" width="25" height="15" viewBox="0 0 25 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.526313 0.659511C0.858915 0.318085 1.30608 0.126843 1.77182 0.126843C2.23756 0.126843 2.68473 0.318085 3.01733 0.659511L12.4476 10.5169L21.8779 0.640876C22.0387 0.447095 22.2361 0.29022 22.4576 0.180093C22.679 0.0699668 22.9199 0.00896447 23.1649 0.00091577C23.41 -0.00713293 23.654 0.037945 23.8816 0.133321C24.1093 0.228696 24.3156 0.372312 24.4877 0.555157C24.6599 0.738001 24.7941 0.956128 24.8819 1.19585C24.9697 1.43558 25.0093 1.69173 24.9982 1.94823C24.987 2.20473 24.9253 2.45604 24.817 2.68641C24.7088 2.91678 24.5562 3.12122 24.3689 3.28691L13.6931 14.4673C13.3605 14.8088 12.9133 15 12.4476 15C11.9819 15 11.5347 14.8088 11.2021 14.4673L0.526313 3.28691C0.359542 3.11368 0.227172 2.90759 0.13684 2.68052C0.0465073 2.45344 0 2.20988 0 1.96389C0 1.7179 0.0465073 1.47434 0.13684 1.24727C0.227172 1.0202 0.359542 0.814104 0.526313 0.640876V0.659511Z" />
                        </svg>

                        <p class="font-bold">{{ el }}</p>
                    </article>
                    <article class="flex flex-col gap-2 hidden">
                        <article class="flex flex-row hover:bg-white/10 p-2 justify-between pl-5  items-center"
                            @click='$emit("openChat", chat)' v-for="chat in Object.keys(activeGroup.chat[el])"
                            :key="activeGroup.chat[el].id">
                            <section class="flex flex-row gap-5 justify-start items-center">
                                <svg v-if="activeGroup.chat[el][chat].type == 'chat'" width="30" height="26"
                                    viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.51444 2.13923C5.24165 3.56915 3.52251 5.66358 2.61795 8.10463C1.71338 10.5457 1.67276 13.2001 2.50226 15.6651C2.73218 16.385 2.70919 17.1485 2.27234 17.7594L0.364038 20.6391C0.141344 20.9684 0.0161075 21.3485 0.00145149 21.7396C-0.0132045 22.1307 0.0832618 22.5183 0.280739 22.8618C0.478216 23.2053 0.769432 23.4921 1.12388 23.6922C1.47832 23.8922 1.88294 23.9981 2.29534 23.9987H14.9407C18.3478 24.0454 21.6353 22.8088 24.0832 20.5597C26.531 18.3106 27.9395 15.2326 28 12C27.9395 8.7674 26.531 5.68935 24.0832 3.4403C21.6353 1.19124 18.3478 -0.0454209 14.9407 0.00127599C12.1817 0.00127599 9.60668 0.786646 7.51444 2.13923Z"
                                        fill="white" />
                                </svg>
                                <svg v-else width="30" height="26" viewBox="0 0 30 26" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 3.25035C15 2.96303 14.8683 2.68748 14.6339 2.48432C14.3995 2.28115 14.0815 2.16702 13.75 2.16702H13.675C13.5015 2.166 13.3297 2.1963 13.1704 2.25598C13.0112 2.31566 12.868 2.40343 12.75 2.51368L7.4 7.58368H3.75C3.41848 7.58368 3.10054 7.69782 2.86612 7.90098C2.6317 8.10415 2.5 8.3797 2.5 8.66702V17.3337C2.5 17.621 2.6317 17.8966 2.86612 18.0997C3.10054 18.3029 3.41848 18.417 3.75 18.417H7.4L12.75 23.487C12.868 23.5973 13.0112 23.685 13.1704 23.7447C13.3297 23.8044 13.5015 23.8347 13.675 23.8337H13.75C14.0815 23.8337 14.3995 23.7195 14.6339 23.5164C14.8683 23.3132 15 23.0377 15 22.7503V3.25035ZM18.875 22.4795C18.15 22.6312 17.5 22.122 17.5 21.4828V21.4503C17.5 20.9087 17.9625 20.4537 18.5625 20.3128C20.4108 19.8729 22.0413 18.919 23.2034 17.5979C24.3655 16.2768 24.9949 14.6616 24.9949 13.0003C24.9949 11.3391 24.3655 9.72387 23.2034 8.40277C22.0413 7.08168 20.4108 6.12785 18.5625 5.68785C18.2657 5.62597 18.0007 5.48096 17.8086 5.27531C17.6165 5.06966 17.508 4.81485 17.5 4.55035V4.51785C17.5 3.86785 18.15 3.36952 18.875 3.52118C21.3306 4.03354 23.5158 5.24713 25.0788 6.9666C26.6419 8.68607 27.4918 10.8114 27.4918 13.0003C27.4918 15.1893 26.6419 17.3146 25.0788 19.0341C23.5158 20.7536 21.3306 21.9672 18.875 22.4795Z"
                                        fill="white" />
                                    <path
                                        d="M18.95 17.8862C18.2375 18.1895 17.5 17.6695 17.5 16.987V16.8353C17.5 16.3695 17.85 15.9687 18.2875 15.7303C18.8138 15.4357 19.2465 15.0315 19.5462 14.5546C19.8458 14.0777 20.0028 13.5433 20.0028 13.0003C20.0028 12.4573 19.8458 11.923 19.5462 11.4461C19.2465 10.9692 18.8138 10.565 18.2875 10.2703C17.85 10.0212 17.5 9.62032 17.5 9.16532V9.01365C17.5 8.33115 18.2375 7.82199 18.95 8.11449C20.0135 8.55564 20.9113 9.24848 21.5397 10.113C22.1682 10.9776 22.5016 11.9785 22.5016 13.0003C22.5016 14.0221 22.1682 15.0231 21.5397 15.8876C20.9113 16.7522 20.0135 17.445 18.95 17.8862Z"
                                        fill="white" />
                                </svg>
                                <p>{{ chat }}</p>
                            </section>
                            <div class="p-2 bg-white rounded-full" v-if="activeGroup.chat[el][chat].newMessage"></div>
                        </article>
                    </article>
                </section>
            </article>
        </section>
    </article>
</template>

<style lang="scss" scoped></style>
