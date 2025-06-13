<template>
    <div class="bg-[#f5f5f5] min-h-screen mt-1 relative flex flex-col justify-center">
        <div class="flex flex-row justify-center">
            <div class="pt-20 ml-10">
                <h2 class="font-semibold text-5xl">{{ $t("home.welcome.heading") }}</h2>
                <p class="w-140 mt-8">{{ $t("home.welcome.lead1") }}</p>
                <p class="w-140 mt-5">{{ $t("home.welcome.lead2") }}</p>
            </div>
            <div>
                <img src="/img/home-img.png" class="w-200">
            </div>
        </div>
        <div class="flex flex-row justify-center px-5">
            <img src="/img/home-img2.png" alt="">
            <div class="bg-white ml-20 w-225 h-80 p-4 rounded-xl mt-8">
                <h2 class="font-semibold text-4xl mt-8">{{ $t("home.about.heading") }}</h2>
                <p class="mt-5">{{ $t("home.about.body") }}</p>
                <button class=" p-3 pr-6 pl-6 bg-[#001136] text-[#ffffff] rounded-xl text-xl font-semibold cursor-pointer mt-5">{{ $t("home.callToAction.registerButton") }}</button>
            </div>
        </div>
        <div class="bg-[#e6e9ec] mt-15  h-60 flex items-center justify-center">
            <div class="flex flex-row space-x-25">
                <div class="flex flex-col items-center">
                    <img src="/icons/arrow-outcome.svg" class="w-15" alt="">
                    <span class="text-2xl font-semibold text-[#001136]">{{ $t("home.statistics.averageReturn.value") }}</span>
                    <p>{{ $t("home.statistics.averageReturn.label") }}</p>
                </div>
                <div class="flex flex-col items-center">
                    <img src="/icons/euro-circle.svg" class="w-15" alt="">
                    <span class="text-2xl font-semibold text-[#001136]">{{ $t("home.statistics.totalFunded.value") }}</span>
                    <p>{{ $t("home.statistics.totalFunded.label") }}</p>
                </div>
                <div class="flex flex-col items-center">
                    <img src="/icons/calendar.svg" class="w-15" alt="">
                    <span class="text-2xl font-semibold text-[#001136]">{{ $t("home.statistics.averageTerm.value") }}</span>
                    <p>{{ $t("home.statistics.averageTerm.label") }}</p>
                </div>
                <div class="flex flex-col items-center">
                    <img src="/icons/coin-bag.svg" class="w-15" alt="">
                    <span class="text-2xl font-semibold text-[#001136]">{{ $t("home.statistics.defaultRate.value") }}</span>
                    <p>{{ $t("home.statistics.defaultRate.label") }}</p>
                </div>
                <div class="flex flex-col items-center">
                    <img src="/icons/percentage.svg" class="w-15" alt="">
                    <span class="text-2xl font-semibold text-[#001136]">{{ $t("home.statistics.successRate.value") }}</span>
                    <p>{{ $t("home.statistics.successRate.label") }}</p>
                </div>
            </div>
        </div>
        <div class="bg-white pb-10">
            <h3 class="font-semibold text-4xl text-center mt-20 pb-20">{{ $t("home.opportunities.heading") }}</h3>
            <div class="flex flex-row justify-center space-x-20">
                <ProjectCard :project="project" />
                <ProjectCard :project="project" />
                <ProjectCard :project="project" />
            </div>
        </div>
        <div class="bg-[#a2d2cd] text-center flex flex-col">
            <h3 class="text-3xl font-semibold mt-10">{{ $t("home.tariffs.heading") }}</h3>
            <p class="text-xl mt-13">{{ $t("home.tariffs.lead1") }}</p>
            <p class="text-xl mt-13">{{ $t("home.tariffs.lead2") }}</p>
            <div class="flex flex-row justify-between w-120 mx-auto mt-20">
                <div class="flex flex-col">
                    <img src="/icons/0-percentage.svg" alt="">
                    <span class="text-2xl font-semibold">{{ $t("home.tariffs.investor") }}</span>
                </div>
                <div class="flex flex-col">
                    <img src="/icons/5-percentage.svg" alt="">
                    <span class="text-2xl font-semibold">{{ $t("home.tariffs.promoter") }}</span>
                </div>
            </div>
            <p class="text-xl mt-13 pb-20">{{ $t("home.tariffs.footnote") }}</p>
        </div>
        <div class="bg-[#f5f5f5] flex flex-row justify-center space-x-20">
            <div class="mt-20 w-180 p-4">
                <h3 class="text-3xl font-semibold">{{ $t("home.commitment.heading") }}</h3>
                <p class="text-2xl mt-20">{{ $t("home.commitment.body") }}</p>
            <button class="mt-10 p-3 pr-6 pl-6 bg-[#ffffff] text-[#001136] rounded-xl text-xl font-semibold cursor-pointer">{{ $t("home.commitment.button") }}</button>
            </div>
            <div class="w-90">
                <img src="/img/home-img3.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProjectCard from '../components/ProjectCard/ProjectCard.vue';
import Footer from '../components/Footer/Footer.vue';
import { ref } from 'vue';

const project = ref<Project>({
    id: 1,
    title: 'Proyecto de ejemplo',
    description: 'Descripción del proyecto de ejemplo',
    category: 'Tecnología',
    goal: 100000,
    currentAmount: 50000,
    startDate: '2023-01-01',
    endDate: '2023-12-31'
})
</script>

<style lang="scss" scoped>

</style>