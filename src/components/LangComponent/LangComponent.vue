<template>
    <div class="items-center flex relative mr-5">
            <Listbox as="div" name="language" id="language" v-model="currentLanguage" class="text-xl font-semibold">
                <ListboxButton class="flex items-center space-x-2 cursor-pointer hover:text-[#15a3b1]">
                    <span>{{ currentLanguage.toUpperCase() }}</span>
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400 ml-2" aria-hidden="true" />
                </ListboxButton>
                <div>
                    <transition leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
                        leave-to-class="opacity-0" enter-active-class="transition duration-200 ease-in"
                        enter-from-class="opacity-0">
                        <ListboxOptions
                            class="absolute mt-1 max-h-60 text-center w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            <ListboxOption class="cursor-pointer hover:text-[#15a3b1] my-2" v-for="lang in languages" :key="lang.code" :value="lang.code">
                                <span :class="`fi fi-${lang.flag} rounded-full transform-[scale(1.2)]`"></span>
                                <span class="text-lg mt-2 ml-2">{{ lang.name }}</span>
                            </ListboxOption>
                        </ListboxOptions>
                    </transition>
                </div>
            </Listbox>
        </div>
</template>

<script setup>
import { useLanguage } from '../../composables/useLanguage';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const { languages, currentLanguage } = useLanguage();

</script>

<style lang="scss" scoped>

</style>