<template>
    <div class="flex flex-row items-center mr-5">
        <Menu as="div" v-slot="{ open }" class="relative inline-block text-left mr-5">
            <div>
                <MenuButton class="inline-flex items-center text-xl">
                    <UserCircleIcon class="w-10 h-10 text-[#001136] mr-2" />
                    {{ auth.currentUser?.username }}
                    <ChevronDownIcon class="w-5 h-5 text-gray-400 ml-2" />
                </MenuButton>
            </div>
            <TransitionRoot :show="open" as="template">
                <TransitionChild enter="transition ease-out duration-100" enter-from="transform opacity-0 scale-95"
                    enter-to="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                    leave-from="transform opacity-100 scale-100" leave-to="transform opacity-0 scale-95">
                    <MenuItems
                        class="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 shadow-lg rounded-md">
                        <div class="py-1">
                            <MenuItem>
                            <router-link to="/private/opportunities">
                                <button class="w-full text-left px-4 py-2 hover:bg-gray-100">Área privada</button>
                            </router-link>
                            </MenuItem>
                            <MenuItem>
                            <router-link to="/administration">
                                <button class="w-full text-left px-4 py-2 hover:bg-gray-100">Administración</button>
                            </router-link>
                            </MenuItem>
                            <MenuItem>
                            <button class="w-full text-left px-4 py-2 hover:bg-gray-100" @click="auth.logout">Cerrar
                                sesión</button>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </TransitionChild>
            </TransitionRoot>
        </Menu>
    </div>
</template>

<script setup lang="ts">
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { Menu, MenuButton, MenuItems, MenuItem, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { useAuthStore } from '../../store/AuthStore';

const auth = useAuthStore();

</script>

<style lang="scss" scoped></style>