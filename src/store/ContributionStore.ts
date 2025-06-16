import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../api/index";
import type { Contribution } from "./type";

export const useContributionStore = defineStore("contribution", () => {
    const contributionsByProject = ref<Record<number, Contribution[]>>({});

    const fetchContributionsByProject = async (projectId: number) => {
        try {
            const response = await api.get<Contribution[]>(`/contribution/project/${projectId}`);
            contributionsByProject.value[projectId] = response.data;
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