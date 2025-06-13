<template>
    <div class="sticky top-0 z-50 bg-white py-5 flex flex-row border-b border-[#e5e5e5]">
        <div class="flex flex-row items-center justify-between w-full">
            <div class="ml-5 cursor-pointer">
                <router-link to="/">
                    <img class="w-50" src="/img/logo.svg" alt="crowdvigo logo">
                </router-link>
            </div>
            <div class="mr-5 space-x-8">
                <router-link to="/auth/login">
                    <button class="font-semibold cursor-pointer text-xl">{{ $t('login.title') }}</button>
                </router-link>
                <router-link to="/auth/register">
                    <button class="p-3 pr-6 pl-6 bg-[#001136] text-[#ffffff] rounded-xl text-xl font-semibold cursor-pointer">{{
                        $t('login.register') }}
                    </button>
                </router-link>
            </div>
        </div>
        <LangComponent></LangComponent>
    </div>
</template>

<script setup lang="ts">
import LangComponent  from '../LangComponent/LangComponent.vue';

</script>

<style lang="scss" scoped></style>