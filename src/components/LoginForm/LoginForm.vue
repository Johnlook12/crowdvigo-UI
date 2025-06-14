<template>
    <div class="container mx-auto px-6 flex flex-col justify-center items-center">
        <h1 class="text-3xl font-semibold mb-6 text-center">{{ $t("login.title") }}</h1>
        <span>{{ error }}</span>
        <form @submit.prevent="handleLogin" class="px-80 mt-5">
            <div class="mb-6">
                <label for="username" class="block text-sm font-medium mb-1">{{ $t("login.username") }}</label>
                <input type="text" id="username" v-model="username" required
                    class="border border-gray-300 rounded-xl p-2 w-full" />
            </div>
            <div>
                <label for="password" class="block text-sm font-medium mb-1">{{ $t("login.password") }}</label>
                <input type="password" id="password" v-model="password" required
                    class="border border-gray-300 rounded-xl p-2 w-full" />
            </div>
            <div class="ml-1 py-8 flex flex-row justify-between items-center">
                <label class="inline-flex items-center">
                    <input type="checkbox" v-model="rememberMe" class="form-checkbox h-5 w-5 text-blue-600" />
                    <span class="ml-3 text-sm">{{ $t("login.rememberMe") }}</span>
                </label>
                <p class="text-sm">
                    <router-link to="/forgot-password" class="text-blue-500 hover:underline">{{
                        $t("login.forgotPassword")
                    }}</router-link>
                </p>
            </div>
            <div class="flex justify-center">
                <button type="submit" class="bg-[#3d5e73] text-white rounded-xl py-3 px-41">
                    {{ $t("login.loginButton") }}
                </button>
            </div>
        </form>
        <p class="mt-5 text-[#3d5e73] text-lg text-center">
            {{ $t("login.noAccount") }}
            <router-link to="/auth/register" class="text-blue-500 hover:underline">{{
                $t("login.register") }}
            </router-link>
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../store/AuthStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const { error } = storeToRefs(useAuthStore());

const username = ref<string>('');
const password = ref<string>('');
const rememberMe = ref<boolean>(false);

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
    const isAuthenticated = await authStore.authenticate(username.value, password.value);
    if (isAuthenticated) {
        router.push('/');
    } else {
        console.error('Login failed');
        alert('Login failed. Please check your credentials.');
    }
};

</script>

<style lang="scss" scoped></style>