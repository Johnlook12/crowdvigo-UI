<template>
  <div class="flex flex-row">
    <!-- Sidebar omitted: assume imported as component if needed -->
    <div class="bg-[#fbfbfb] w-full min-h-screen px-10 flex flex-col">
      <h2 class="text-2xl font-semibold mt-5 mb-4">Panel de Administración</h2>
      <div class="overflow-x-auto bg-white rounded-xl shadow p-5">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-[#f5f7f6]">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objetivo (€)</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recaudado (€)</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha inicio</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha fin</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="project in pendingProjects" :key="project.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ project.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ project.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ project.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ project.fundingGoal.toFixed(2) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ project.currentAmount?.toFixed(2) ?? '0.00' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ formatDate(project.startDate) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ formatDate(project.endDate) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ project.userId }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                <button class="py-2 px-4 mr-2 font-semibold bg-[#001136] text-white rounded-xl">Aprobar</button>
                <button class="py-2 px-4 font-semibold bg-[#e6e8ec] rounded-xl">Denegar</button>
              </td>
            </tr>
            <tr v-if="!pendingProjects.length">
              <td colspan="9" class="px-6 py-4 text-center text-sm text-gray-500">No hay proyectos pendientes.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useProjectStore } from '../../store/ProjectStore';

const projectStore = useProjectStore();

onMounted(async () => {
  await projectStore.fetchProjects(0, 100, 'id');
  console.log('Proyectos recibidos en el store:', projectStore.projects);
});

const pendingProjects = computed(() => projectStore.projects.filter(p => (p as any).status.toLowerCase() === 'pending'));

function formatDate(dateStr?: string) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}
</script>

<style scoped lang="scss">
</style>
