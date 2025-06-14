import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "./type";
import router from "../router/index";
import api from "../api/index";

export const useAuthStore = defineStore("auth", () => {
    const error = ref<Error | null>(null);
    const currentUser = ref<User | null>(null);
    const isAuthenticated = ref<boolean>(false);
    const token = ref<string | null>(localStorage.getItem('token') || null);

    if(token.value) {
        currentUser.value = JSON.parse(localStorage.getItem('user') || 'null');
        isAuthenticated.value = true;
    }


    const register = async (userData: User) => {
        try {
            await api.post('/user/signup', userData);
            return true;
        } catch (err: any) {
            error.value = err.message;
            console.error('Error during registration:', err);
            return false;
        }
    }

    const authenticate = async (username: string, password: string) => {
        try {
            const { data } = await api.post('/user/signin', { username, password });

            if (data.token) token.value = data.token;

            console.log('Authentication successful:', data);

            currentUser.value = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                email: data.email,
                phone: data.phone,
            }
            isAuthenticated.value = true;
            if (token.value !== null) {
                localStorage.setItem('token', token.value);
            }
            localStorage.setItem('user', JSON.stringify(currentUser.value));
            return currentUser.value;
        } catch (error) {
            console.error('Error during authentication:', error);
            isAuthenticated.value = false;
            currentUser.value = null;
            token.value = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return false;
        }
    }

    const logout = () => {
        token.value = null;
        currentUser.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push({ name: 'login' });
    };

    return { register, authenticate, error, token, logout, isAuthenticated, currentUser };
});