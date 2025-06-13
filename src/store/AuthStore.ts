import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "./type";

export const useAuthStore = defineStore("auth", () => {
    const urlApi = 'http://localhost:9000/user';
    const error = ref<Error | null>(null);


    const register = async (userData: User) => {
        try {
            const response = await fetch(`${urlApi}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                error.value = new Error('Registration failed');
                throw new Error(await response.text());
            }
        } catch (err: any) {
            error.value = err.message;
            console.error('Error during registration:', err);
        }
    }

    const authenticate = async (username: string, password: string) => {
        try {
            const response = await fetch(`${urlApi}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    }

    return { register, authenticate, error };
});