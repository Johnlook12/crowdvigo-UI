<template>
    <div class="mx-auto">
        <div class="flex flex-row items-center justify-center">
            <div>
                <h1 class="text-3xl font-semibold py-4 mt-8 block">
                    {{ project?.title }}
                </h1>
                <div>
                    <img :src="imgs[0]?.url" class="custom-image" alt="Project Image" />
                </div>
            </div>
            <div v-if="project"
                class="flex flex-col items-center justify-center ml-8 bg-[white] shadow-lg rounded-2xl mt-24">
                <ProjectCard :project="project" :show-image="false" :disable-hover="true" :border="false" />
                <div class="flex flex-col items-start w-full pl-4 mb-3">
                    <span class="text-2xl font-semibold text-[#001136]">
                        {{ contributionsQuantity }}
                    </span>
                    <p class="text-xl text-gray-400">Contribuciones</p>
                </div>
                <div class="flex flex-col items-start w-full pl-4">
                    <span class="text-2xl text-[#001136] font-semibold">12</span>
                    <p class="text-xl text-gray-400">Días más</p>
                </div>
                <button class="py-3 px-30 bg-[#001136] my-5 text-white rounded-lg cursor-pointer" @click="showRewardModal = true">Invertir</button>
            </div>
        </div>
        <div>
            <ul class="flex flex-row space-x-10 py-2 ml-2">
                <li class="cursor-pointer" :class="{ 'li-selected': selectedDescrtiption }" @click="toggleSelection">
                    Description</li>
                <li class="cursor-pointer" :class="{ 'li-selected': selectedUpdates }" @click="toggleSelection">
                    Updates</li>
            </ul>
        </div>
        <div v-if="selectedDescrtiption" class="mt-10 w-200 ql-editor">
            <h2 class="text-3xl font-semibold">Descripción</h2>
            <div class="text-lg text-gray-600 mt-4" v-html="htmlDescription">
            </div>
        </div>
        <div v-if="selectedUpdates" class="space-y-10 mt-10">
            <div v-for="(item, index) in updates" :key="index" class="border p-5 border-[#e5e5e5] rounded-lg">
                <div class="mb-3 border-b border-[#e5e5e5] pb-3 ">
                    <h2 class="text-2xl">{{ creator?.companyName }}</h2>
                    <p class="text-lg text-gray-400 ml-1">{{ item.date }}</p>
                </div>
                <h3 class="text-3xl font-semibold mb-5">{{ item.title }}</h3>
                <p class="text-gray-600">{{ item.description }}</p>
            </div>
        </div>
    </div>
    <RewardModal v-if="showRewardModal"  @close="closeRewardModal" :project-id="Number(projectId)"/>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '../../store/ProjectStore';
import { useContributionStore } from '../../store/ContributionStore';
import { useUserStore } from '../../store/UserStore';
import ProjectCard from '../ProjectCard/ProjectCard.vue';
import RewardModal from '../RewardModal/RewardModal.vue';

import type { Project } from '../ProjectCard/type';
import type { User } from '../../store/type';
import type { ProjectUpdate } from './type';

const projectStore = useProjectStore();
const contributionStore = useContributionStore();
const userStore = useUserStore();

const route = useRoute();
const projectId = route.params.id;
const project = ref<Project | null>(null);
const updates = ref<ProjectUpdate[]>([]);
const htmlDescription = computed(() => (project.value?.description || ''));

const selectedDescrtiption = ref<boolean>(true);
const selectedUpdates = ref<boolean>(false);
const showRewardModal = ref<boolean>(false);

const imgs = computed(() => {
    return projectStore.imagesByProject[Number(projectId)] || [];
});

const creator = ref<User | null>(null);

const contributionsQuantity = computed(() => {
    const contributions = contributionStore.contributionsByProject[Number(projectId)] || [];
    return contributions.length;
});

onMounted(async () => {
    project.value = await projectStore.findById(Number(projectId));
    loadCreator();
    loadImages();
    loadContributions();
    loadUpdates();
});

const loadImages = async () => {
    await projectStore.fetchProjectImages(Number(projectId));
}

const loadContributions = async () => {
    await contributionStore.fetchContributionsByProject(Number(projectId));
}

const loadCreator = async () => {
    if (project.value) {
        creator.value = await userStore.findById(project.value.userId);
    }
}

const loadUpdates = async () => {
    updates.value = await projectStore.findProjectUpdates(Number(projectId));
}

const toggleSelection = () => {
    selectedDescrtiption.value === true
        ? (selectedDescrtiption.value = false, selectedUpdates.value = true)
        : (selectedDescrtiption.value = true, selectedUpdates.value = false);
}

const closeRewardModal = () => {
    showRewardModal.value = false;
}

</script>

<style lang="scss" scoped>
.custom-image {
    display: block;
    width: 800px;
    height: 400px;
    border-radius: 8px;
    object-fit: cover;
}

.li-selected {
    color: #001136;
    font-weight: bold;
    border-bottom: 2px solid #001136;;
}

ul li {
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.3s ease, border-bottom-color 0.3s ease;
}
</style>