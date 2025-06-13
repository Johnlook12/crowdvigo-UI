<template>
    <div class="flex flex-row">
        <div class="bg-[#a2d2cdd0] w-350 min-h-screen relative">
            <div class="bg-[url('/img/login-ilustration.jpg')] bg-cover blur-[2px] absolute inset-0 z-0">

            </div>
            <div class="z-50 relative flex flex-col h-full ">
                <div class="cursor-pointer flex justify-center pt-10">
                    <router-link to="/">
                        <img class="w-75" src="/img/logo-white.svg" alt="crowdvigo logo">
                    </router-link>
                </div>
                <div
                    class="text-[#ffffff] font-semibold text-xl items-center flex flex-col justify-end flex-grow pb-30">
                    <router-link to="/" class="flex flex-row items-center ml-15">
                        <ChevronLeftIcon class="h-8 w-8 text-[#ffffff] ml-2" />
                        <p>back</p>
                    </router-link>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';
import LoginForm from '../components/LoginForm/LoginForm.vue';
</script>

<style lang="scss" scoped></style>