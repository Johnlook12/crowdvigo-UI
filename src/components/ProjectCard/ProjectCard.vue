<template>
    <router-link :to="{ name: 'project-details', params: { id: props.project.id } }">
        <div class="w-80 pb-10 rounded-b-2xl transition-all duration-300 cursor-auto"
            :class="{ 
                'hover:shadow-2xl hover:scale-105 cursor-pointer!': !props.disableHover, 
                'shadow-lg': props.border}">
            <img v-if="showImage" class="w-auto rounded-t-2xl" :src="mainImage" alt="">
            <div class="px-2">
                <span class="text-2xl block py-5">{{ props.project.title }}</span>
                <div class="flex flex-row justify-between">
                    <div class="flex flex-col">
                        <span class="text-gray-400">{{ $t("projectCard.financedLabel", { percent: formattedPercent })
                            }}</span>
                        <span class="text-xl font-semibold text-[#001136]">{{ props.project.currentAmount }}€</span>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-gray-400">{{ $t("projectCard.goalLabel") }}</p>
                        <span class="text-xl font-semibold text-[#001136]">{{ props.project.fundingGoal }}€</span>
                    </div>
                </div>
                <div class="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                    <div class="h-2.5 rounded-full transition-all duration-500 ease-out" :class="progressBarColor"
                        :style="{ width: progressPercentage + '%' }"></div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useProjectStore } from '../../store/ProjectStore';
import type { Project } from './type';
import { storeToRefs } from 'pinia';

const projectStore = useProjectStore();

const { imagesByProject } = storeToRefs(projectStore);

const mainImage = computed(() => {
    const imgs = imagesByProject.value[props.project.id] || [];
    return imgs.length
        ? imgs[0].url
        : '/img/default-project-image.png';
});

const props = withDefaults(defineProps<{
    project: Project;
    showImage?: boolean;
    disableHover?: boolean;
    border?: boolean;
}>(), {
    showImage: true,
    disableHover: false,
    border: true
});

const formattedPercent = computed(() => {
    const current = Number(props.project.currentAmount) || 0;
    const goal = Number(props.project.fundingGoal) || 1;
    return ((current / goal) * 100).toFixed(2);
})

const loadImages = async () => {
    await projectStore.fetchProjectImages(props.project.id);
}

onMounted(() => {
    loadImages();
});

const progressPercentage = computed(() => {
    const current = Number(props.project.currentAmount) || 0;
    const goal = Number(props.project.fundingGoal) || 1;
    return Math.min((current / goal) * 100, 100);
});

const progressBarColor = computed(() => {
    const percentage = progressPercentage.value;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-indigo-500';
    return 'bg-purple-500';
});

</script>

<style lang="scss" scoped></style>