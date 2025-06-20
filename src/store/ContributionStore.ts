import { defineStore } from "pinia";
import api from "../api/index";
import type { Contribution } from "./type";
import { ref } from "vue";

export const useContributionStore = defineStore("contribution", () => {
    const contributionsByProject = ref<Record<number, Contribution[]>>({});

    const fetchContributionsByProject = async (projectId: number) => {
        try {
            const response = await api.get<Contribution[]>(`/contribution/project/${projectId}`);
            contributionsByProject.value = {
                ...contributionsByProject.value,
                [projectId]: response.data
            }
        } catch (err: any) {
            console.error(`Error fetching contributions for project ${projectId}:`, err);
            throw err;
        }
    }

    return {
        contributionsByProject,
        fetchContributionsByProject
    };
});