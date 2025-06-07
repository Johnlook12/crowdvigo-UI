<template>
    <div class="py-5 flex flex-row border-b border-[#e5e5e5]">
        <div class="flex flex-row items-center justify-between w-full">
            <div class="ml-5 ">
                <img class="w-50" src="/img/logo.svg" alt="crowdvigo logo">
            </div>
            <div class="mr-5 space-x-8">
                <button class="font-semibold cursor-pointer text-xl">{{ $t('login.title') }}</button>
                <button class="p-3 pr-6 pl-6 bg-[#001136] text-[#ffffff] rounded-xl text-xl font-semibold cursor-pointer">{{
                    $t('login.register') }}
                </button>
            </div>
        </div>
        <LangComponent></LangComponent>
    </div>
</template>

<script setup lang="ts">
import LangComponent  from '../LangComponent/LangComponent.vue';

</script>

<style lang="scss" scoped></style>