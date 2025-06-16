import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../api/index";
import type { Project, ProjectImage } from "../components/ProjectCard/type";

export const useProjectStore = defineStore("project", () => {
    const projects = ref<Project[]>([]);
    const error = ref<Error | null>(null);
    const loading = ref<boolean>(false);

    const page = ref<number>(0);
    const size = ref<number>(6);
    const totalPages = ref<number>(0);
    const sort = ref<string>('id,asc');
    const totalElements = ref<number>(0);

    const imagesByProject = ref<Record<number, ProjectImage[]>>({});

    const fetchProjects = async (p: number = page.value, s: number = size.value, sortBy: string = sort.value) => {
        try {
            const response = await api.get('/project', {
                params: {
                    page: p,
                    size: s,
                    sort: sortBy
                }
            });
            const data = response.data;
            projects.value = data.content;
            page.value = data.page;
            size.value = data.size;
            totalPages.value = data.totalPages;
            totalElements.value = data.totalElements;
        } catch (err: any) {
            error.value = err;
            console.error('Error fetching projects:', err);
        } finally {
            loading.value = false;
        }

    };

    const findById = async (id: number) => {
        try {
            const response = await api.get<Project>(`/project/${id}`);
            return response.data;
        } catch (err: any) {
            error.value = err;
            console.error(`Error fetching project with id ${id}:`, err);
            throw err;
        }
    }

    async function fetchProjectImages(projectId: number) {
        try {
            const res = await api.get<ProjectImage[]>(`/projects/${projectId}/images`);
            imagesByProject.value[projectId] = res.data;
        } catch (err: any) {
            error.value = err;
            console.error(`Error fetching images for project ${projectId}:`, err);
        }
    }

    const findProjectUpdates = async (projectId: number) => {
        try {
            const res = await api.get(`/update/project/${projectId}`);
            return res.data;
        } catch (err: any) {
            error.value = err;
            console.error(`Error fetching updates for project ${projectId}:`, err);
            throw err;
        }
    }

    const findProjectRewards = async (projectId: number) => {
        try {
            const res = await api.get(`/reward/project/${projectId}`);
            return res.data;
        } catch (err: any) {
            error.value = err;
            console.error(`Error fetching rewards for project ${projectId}:`, err);
            throw err;
        }
    }


    function goToPage(p: number) {
        if (p >= 0 && p < totalPages.value) {
            return fetchProjects(p, size.value, sort.value);
        }
    }

    function nextPage() {
        return goToPage(page.value + 1)
    }

    function prevPage() {
        return goToPage(page.value - 1)
    }

    function setSort(newSort: string) {
        sort.value = newSort;
        return fetchProjects(page.value, size.value, newSort);
    }


    return {
        projects,
        error,
        loading,
        page,
        size,
        totalPages,
        totalElements,
        sort,
        imagesByProject,
        //actions
        fetchProjects,
        findById,
        fetchProjectImages,
        findProjectUpdates,
        findProjectRewards,
        goToPage,
        nextPage,
        prevPage,
        setSort
    };
});