import { defineStore } from "pinia";
import api from "../api";

export const useUserStore = defineStore("user", () => {

    const findById = async (id: number) => {
        try{
            const user = await api.get(`/user/${id}`);
            return user.data;
        } catch (err: any) {
            console.error(`Error fetching user with id ${id}:`, err);
            throw err;
        }
    }

    return {
        findById
    }
});