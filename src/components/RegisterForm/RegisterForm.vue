<template>
    <div class="container mx-auto px-6 flex flex-col justify-center items-center">
            <h1 class="text-3xl font-semibold mb-6 text-center">Crear cuenta nueva</h1>
            <span>{{ error }}</span>
            <form @submit.prevent="handleSingup" class="px-80 mt-5 space-y-6">
                <div class="flex flex-row justify-between items-center ">
                    <div class="">
                        <label for="name" class="block text-sm font-medium mb-1">Nombre</label>
                        <input type="text" id="name" v-model="name" required
                            class="border border-gray-300 rounded-xl p-2 w-full" />
                    </div>
                    <div>
                        <label for="lastName" class="block text-sm font-medium mb-1">Apellidos</label>
                        <input type="text" id="lastName" v-model="lastName" required
                            class="border border-gray-300 rounded-xl p-2 w-full" />
                    </div>
                </div>
                <div>
                    <label for="username" class="block text-sm font-medium mb-1">Username</label>
                    <input type="text" id="username" v-model="username" required
                        class="border border-gray-300 rounded-xl p-2 w-full" />
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium mb-1">Email</label>
                    <input type="text" id="email" v-model="email" required
                        class="border border-gray-300 rounded-xl p-2 w-full" />
                </div>
                <div>
                    <label for="phone" class="block text-sm font-medium mb-1">Teléfono móvil</label>
                    <input type="text" id="phone" v-model="phone" required
                        class="border border-gray-300 rounded-xl p-2 w-full" />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium mb-1">Contraseña</label>
                    <input type="password" id="password" v-model="password" required
                        class="border border-gray-300 rounded-xl p-2 w-full" />
                </div>
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium mb-1">Confirmar contraseña</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required
                        class="border border-gray-300 rounded-xl p-2 w-full" />
                </div>
                <div class="flex justify-center">
                    <button type="submit" class="bg-[#3d5e73] text-white rounded-xl py-3 px-41">
                        Crear cuenta
                    </button>
                </div>
            </form>
            <p class="mt-5 text-[#3d5e73] text-lg text-center">
                ¿Ya tienes una cuenta?
                <router-link to="/auth/login" class="text-blue-500 hover:underline">
                    Iniciar sesión
                </router-link>
            </p>
        </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../store/AuthStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();

const { error } = storeToRefs(authStore);

const name = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleSingup = async () => {
    if (password.value !== confirmPassword.value) {
        alert("Las contraseñas no coinciden");
        return;
    }

    await authStore.register({
        firstName: name.value,
        lastName: lastName.value,
        email: email.value,
        username: username.value.toLowerCase(),
        phone: phone.value,
        password: password.value,
    });
};

</script>

<style lang="scss" scoped></style>