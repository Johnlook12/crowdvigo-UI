<template>
  <div class="p-6">
    <h1 class="text-3xl font-semibold mt-10 mb-6 text-center text-gray-800">Mis proyectos</h1>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th class="px-6 py-3">Imagen</th>
            <th class="px-6 py-3">Título</th>
            <th class="px-6 py-3">Meta</th>
            <th class="px-6 py-3">Fecha inicio</th>
            <th class="px-6 py-3">Fecha fin</th>
            <th class="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in userProjects" :key="index" class="border-t hover:bg-gray-50">
            <td class="px-6 py-4">
              <img
                v-if="imagesByProject[item.id ?? 0]"
                :src="imagesByProject[item.id ?? 0][0].url"
                alt="Project image"
                class="w-20 h-20 object-cover rounded"
              />
              <span v-else class="text-gray-400 italic">No image</span>
            </td>
            <td class="px-6 py-4 font-medium text-gray-900">{{ item.title }}</td>
            <td class="px-6 py-4 text-gray-700">{{ item.fundingGoal }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ item.startDate }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ item.endDate }}</td>
            <td class="px-6 py-4 text-center space-x-2">
              <router-link :to="`/private/details/${item.id}`">
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-200">Ver</button>
              </router-link>
              <button
                class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded transition duration-200"
                @click="openEditModal(item)"
              >Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-[rgb(0,0,0,0.1)] flex justify-center items-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Editar Proyecto</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 mb-1">Título</label>
            <input
              v-model="editableProject.title"
              type="text"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label for="description" class="text-lg font-semibold mb-3 block">Descripción</label>
            <quill-editor
              :options="editorOptions"
              v-model:value="editableProject.description"
              content-type="html"
            ></quill-editor>
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Meta (<code>Funding Goal</code>)</label>
            <input
              v-model.number="editableProject.fundingGoal"
              type="number"
              min="0"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition duration-200"
            @click="closeModal"
          >Cancelar</button>
          <button
            class="px-4 py-2 bg-[#001136ef] text-white rounded transition duration-200"
            @click="saveProject"
          >Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useAuthStore } from '../../store/AuthStore';
import { useProjectStore } from '../../store/ProjectStore';
import { quillEditor } from 'vue3-quill'
import type { Project } from '../ProjectCard/type';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const currentUser = authStore.currentUser;
const userId = currentUser?.id || 0;

const projectStore = useProjectStore();
const userProjects = ref<Project[]>([]);
const { imagesByProject } = storeToRefs(projectStore);

// Modal state
const isModalOpen = ref(false);
const editableProject = reactive<Project>({
  id: 0,
  title: '',
  description: '',
  fundingGoal: 0,
  userId: userId
});

const editorOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  }
};

onMounted(() => {
  loadMyProjects();
});

const loadMyProjects = async () => {
  userProjects.value = await projectStore.findByUserId(userId);
  await Promise.all(
    userProjects.value.map(p => projectStore.fetchProjectImages(p.id ?? 0))
  );
};

function openEditModal(project: Project) {
  Object.assign(editableProject, project, { userId: userId });
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

async function saveProject() {
  try {
    await projectStore.updateProject(editableProject);
    const idx = userProjects.value.findIndex(p => p.id === editableProject.id);
    if (idx !== -1) userProjects.value[idx] = { ...editableProject };
    closeModal();
  } catch (err) {
    console.error('Error al actualizar proyecto:', err);
  }
}
</script>

<style lang="scss" scoped></style>