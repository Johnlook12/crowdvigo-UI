<template>
    <div class="flex flex-row">
        <div class="w-70 mt-5">
            <div class="ml-5 cursor-pointer">
                <router-link to="/">
                    <img class="w-50" src="/img/logo.svg" alt="crowdvigo logo">
                </router-link>
            </div>
            <div class="mt-10 flex flex-col space-y-5 p-5">
                <router-link to="/private/opportunities">
                    <button class="py-3 text-lg font-semibold bg-[#f5f7f6] w-60 rounded-xl">Oportunidades</button>
                </router-link>
                <router-link to="/private/investments">
                    <button class="py-3 text-lg font-semibold bg-[#f5f7f6] w-60 rounded-xl">Mis inversiones</button>
                </router-link>
                <router-link to="/private/my-projects">
                    <button class="py-3 text-lg font-semibold bg-[#f5f7f6] w-60 rounded-xl">Mis proyectos</button>
                </router-link>
                <router-link to="/private/account">
                    <button class="py-3 text-lg font-semibold bg-[#f5f7f6] w-60 rounded-xl">Mi cuenta</button>
                </router-link>
            </div>
        </div>
        <div class="bg-[#fbfbfb] w-full min-h-screen px-10 flex flex-col">
            <div class="flex flex-row space-x-10 items-center justify-between border-b border-[#e5e5e5] pb-5 mt-5">
                <div class="flex flex-row space-x-10">
                    <button class="bg-[#e6e8ec] p-3 rounded-xl px-6 font-semibold" @click="showPayModal = true">Recargar
                        wallet</button>
                    <div>
                        <p class="">Disponible para invertir</p>
                        <span class="text-xl text-[#001136] font-bold">{{ wallet?.balance.toFixed(2) }} €</span>
                    </div>
                    <div class="border-l border-[#e5e5e5] pl-6">
                        <button class="py-3 text-lg font-semibold bg-[#001136] text-white w-60 rounded-xl cursor-pointer" @click="showNewProjectModal = true">Crear proyecto</button>
                    </div>
                </div>
                <div>
                    <UserMenu class="border py-1 px-3 text-center rounded-xl border-[#e5e5e5] bg-white"></UserMenu>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
    <PayModal v-if="wallet && showPayModal" :wallet="wallet" :user-id="currentUser?.id ?? 0" @close="showPayModal = false"></PayModal>
    <NewProjectModal v-if="showNewProjectModal" @close="showNewProjectModal = false"></NewProjectModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PayModal from '../components/PayModal/PayModal.vue';
import UserMenu from '../components/UserMenu/UserMenu.vue';
import { useAuthStore } from '../store/AuthStore';
import { useUserStore } from '../store/UserStore';
import { storeToRefs } from 'pinia';
import NewProjectModal from '../components/NewProjectModal/NewProjectModal.vue';

const authStore = useAuthStore();
const userStore = useUserStore();
const showPayModal = ref<boolean>(false);
const showNewProjectModal = ref<boolean>(false);
const { currentUser } = storeToRefs(authStore);
const {wallet} = storeToRefs(userStore);

onMounted(() => {
    if(currentUser.value?.id){
        userStore.loadWallet(currentUser.value.id);
    }
});


</script>

<style lang="scss" scoped></style>