<template>
    <div class="mt-10 flex flex-col justify-center">
                <h2 class="text-3xl font-semibold">Oportunidades para invertir</h2>
                <div class="grid grid-cols-3 gap-1 justify-center mt-10 px-20 space-y-5">
                    <div v-for="item in projects" :key="item.id">
                        <ProjectCard :project="item"></ProjectCard>
                    </div>
                    <div v-if="loading" class="col-span-3 text-center">
                        <p>Loading...</p>
                    </div>
                    <div v-if="error" class="col-span-3 text-center">
                        <p>Error loading projects: {{ error.message }}</p>
                    </div>
                </div>
                <div class="flex flex-row justify-center py-5">
                    <button class="flex justify-center mr-5" @click="prevPage">
                        <ChevronLeftIcon class="h-10 w-10 text-gray-500" />
                    </button>
                    <div class="flex flex-col justify-center items-center align-middle">
                        <span class="text-center text-gray-500">
                            Página {{ page + 1 }} de {{ totalPages }}
                        </span>
                    </div>
                    <button class="flex justify-center" @click="nextPage">
                        <ChevronRightIcon class="h-10 w-10 text-gray-500 ml-5" />
                    </button>
                </div>
            </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ProjectCard from '../components/ProjectCard/ProjectCard.vue';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { useProjectStore } from '../store/ProjectStore';
import { storeToRefs } from 'pinia';

const projectStore = useProjectStore();

const { nextPage, prevPage } = projectStore;
const { projects, error, loading, page, totalPages } = storeToRefs(projectStore);

// const project = ref<Project>({
//     id: 1,
//     title: 'Proyecto de ejemplo',
//     description: 'Descripción del proyecto de ejemplo',
//     category: 'Tecnología',
//     goal: 100000,
//     currentAmount: 50000,
//     startDate: '2023-01-01',
//     endDate: '2023-12-31'
// })

onMounted(async () => {
    await projectStore.fetchProjects();
    console.log(projectStore.projects);
})
</script>

<style lang="scss" scoped></style>