<template>
    <div class="sticky top-0 z-50 bg-white py-5 flex flex-row border-b border-[#e5e5e5]">
        <div class="flex flex-row items-center justify-between w-full">
            <div class="ml-5 cursor-pointer">
                <router-link to="/">
                    <img class="w-50" src="/img/logo.svg" alt="crowdvigo logo">
                </router-link>
            </div>
            <div v-if="!auth.isAuthenticated" class="mr-5 space-x-8">
                <router-link to="/auth/login">
                    <button class="font-semibold cursor-pointer text-xl">{{ $t('login.title') }}</button>
                </router-link>
                <router-link to="/auth/register">
                    <button
                        class="p-3 pr-6 pl-6 bg-[#001136] text-[#ffffff] rounded-xl text-xl font-semibold cursor-pointer">{{
                            $t('login.register') }}
                    </button>
                </router-link>
            </div>
            <div v-else class="flex flex-row items-center mr-5">
                <Menu as="div" v-slot="{ open }" class="relative inline-block text-left mr-5">
                    <div>
                        <MenuButton class="inline-flex items-center text-xl">
                            <UserCircleIcon class="w-10 h-10 text-[#001136] mr-2" />
                            {{ auth.currentUser?.username }}
                            <ChevronDownIcon class="w-5 h-5 text-gray-400 ml-2" />
                        </MenuButton>
                    </div>
                    <TransitionRoot :show="open" as="template">
                        <TransitionChild enter="transition ease-out duration-100"
                            enter-from="transform opacity-0 scale-95" enter-to="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75" leave-from="transform opacity-100 scale-100"
                            leave-to="transform opacity-0 scale-95">
                            <MenuItems
                                class="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 shadow-lg rounded-md">
                                <div class="py-1">
                                    <MenuItem>
                                    <button class="w-full text-left px-4 py-2 hover:bg-gray-100">Mi perfil</button>
                                    </MenuItem>
                                    <MenuItem>
                                    <button class="w-full text-left px-4 py-2 hover:bg-gray-100" @click="auth.logout">Cerrar sesión</button>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </TransitionChild>
                    </TransitionRoot>
                </Menu>
            </div>
        </div>
        <LangComponent></LangComponent>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../store/AuthStore';
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { Menu, MenuButton, MenuItems, MenuItem, TransitionChild, TransitionRoot } from '@headlessui/vue'
import LangComponent from '../LangComponent/LangComponent.vue';

const auth = useAuthStore();



</script>

<style lang="scss" scoped></style>