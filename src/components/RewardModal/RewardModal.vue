<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-[rgba(0,0,0,0.1)]" @click="emit('close')"></div>
        <!-- Modal box -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 max-w-lg z-60 p-4 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-end cursor-pointer" @click="emit('close')">
                <XMarkIcon class="w-8"></XMarkIcon>
            </div>
            <h2 class="text-3xl font-semibold text-center p-4">
                Invierte en este proyecto
            </h2>
            <div class="mt-10 border bg-[white] p-6 rounded-xl border-[#e5e5e5]">
                <h3 class="text-2xl font-semibold">Realiza una contribución</h3>
                <div class="flex flex-row items-center">
                    <input type="number" class="w-full p-4 mt-4 border bg-[rgba(0,0,0,0.1)] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <button class="ml-4 bg-[#001136] h-15! mt-3 px-3 text-white rounded">Continuar</button>
                </div>
            </div>
            <section class="p-4">
                <div>
                    <h4 class="text-xl font-semibold">Recompensas disponibles</h4>
                    <ul class="mt-2">
                        <li v-for="reward in rewards" :key="reward.id" class="border-b border-gray-200 py-2">
                            <h5 class="font-semibold">{{ reward.title }}</h5>
                            <p class="text-gray-600">{{ reward.description }}</p>
                            <p class="text-gray-500">Mínimo: {{ reward.minimumAmount }} - Entrega estimada: {{ reward.estimatedDeliveryDate }}</p>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid';
import type { Reward } from './type';
import { useProjectStore } from '../../store/ProjectStore';
import { onMounted, ref } from 'vue';

const props = withDefaults(defineProps<{
    projectId: number;
}>(), {
    projectId: 0
});

onMounted(() => {
    loadRewards();
});

const emit = defineEmits(['close']);
const projectStore = useProjectStore();

const rewards = ref<Reward[]>([]);

const loadRewards = async () => {
    rewards.value = await projectStore.findProjectRewards(props.projectId);
}

</script>

<style scoped lang="scss"></style>
