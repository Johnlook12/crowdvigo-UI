<template>
    <div class="w-80 pb-10 shadow-lg rounded-b-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <img class="w-auto rounded-t-2xl" src="/img/product.png" alt="">
        <div class="px-2">
            <span class="text-2xl block py-5">{{ props.project.title }}</span>
            <div class="flex flex-row justify-between">
                <div class="flex flex-col">
                    <span class="text-gray-400">{{ $t("projectCard.financedLabel", { percent: props.project.currentAmount / props.project.goal * 100 }) }}</span>
                    <span class="text-xl font-semibold text-[#001136]">{{ props.project.currentAmount }}€</span>
                </div>
                <div class="flex flex-col">
                    <p class="text-gray-400">{{ $t("projectCard.goalLabel") }}</p>
                    <span class="text-xl font-semibold text-[#001136]">{{ props.project.goal }}€</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Project{
    id: number;
    title: string;
    description: string;
    category: string;
    goal: number;
    currentAmount: number;
    startDate: string;
    endDate: string;
}

const props = defineProps<{
    project: Project;
}>();

</script>

<style lang="scss" scoped>

</style>