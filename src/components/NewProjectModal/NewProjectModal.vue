<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-[rgba(0,0,0,0.1)]" @click="emit('close')"></div>
        <!-- Modal box -->
        <div
            class="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 max-w-lg z-60 p-6 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-end cursor-pointer" @click="emit('close')">
                <XMarkIcon class="w-8"></XMarkIcon>
            </div>
            <h2 class="text-3xl font-semibold text-center p-4">
                Nuevo proyecto
            </h2>
            <span class="text-red-500 text-semibold!">{{ error }}</span>
            <div class="space-y-6 mt-5">
                <div>
                    <label for="title" class="text-lg font-semibold">Título</label>
                    <input type="text" id="title"
                        class="p-2 border border-gray-300 rounded-lg w-full mt-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Título del proyecto" v-model="title">
                </div>
                <div class="flex flex-col border border-gray-300 rounded-lg p-4">
                    <label class="text-lg font-semibold">Fotos</label>
                    <input ref="fileInput" type="file" id="files" class="mt-2 hidden" multiple accept="image/*"
                        @change="onFilesSelected" />
                    <label for="files"
                        class="mt-2 inline-block cursor-pointer bg-[#001136] text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200">
                        Seleccionar fotos
                    </label>
                    <div v-if="previews.length" class="grid grid-cols-3 gap-2 mt-4">
                        <img v-for="(src, i) in previews" :key="i" :src="src"
                            class="object-cover h-24 w-full rounded" />
                    </div>
                </div>
                <div>
                    <label for="description" class="text-lg font-semibold mb-3 block">Descripción</label>
                    <quill-editor :options="editorOptions" v-model:value="description" content-type="html"></quill-editor>
                </div>
                <div class="flex flex-col">
                    <label for="time" class="text-lg font-semibold mb-3 block">Duración</label>
                    <select name="time" id="time" class="p-2 border rounded-lg" v-model="duration">
                        <option value="3">3 meses</option>
                        <option value="6">6 meses</option>
                        <option value="9">9 meses</option>
                    </select>
                </div>
                <div>
                    <label for="goal" class="text-lg font-semibold mb-3 block w-10">Meta</label>
                    <input type="number" id="goal"
                        class="p-2 border border-gray-300 rounded-lg w-full mt-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Meta del proyecto" v-model="goal">
                </div>
            </div>
            <button class="py-4 px-30 bg-[#001136ef] my-5 text-white rounded-lg cursor-pointer w-full"
                @click="submit">Enviar solicitud</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { useProjectStore } from '../../store/ProjectStore';
import { useAuthStore } from '../../store/AuthStore';
import { quillEditor } from 'vue3-quill'
import type { Project } from '../ProjectCard/type';


const emit = defineEmits(['close']);
const projectStore = useProjectStore();
const duration = ref<number>(3);
const files = ref<File[]>([])
const previews = ref<string[]>([])
const error = ref<string>('')
const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);
const userId = computed(() => currentUser.value?.id ?? null);

const title = ref<string>('')
const description = ref<string>('')
const goal = ref<number>(0)

const calculateEndDate = (months: number): string => {
    const now = new Date()
    now.setMonth(now.getMonth() + months)
    return now.toISOString().split('T')[0]
}

const editorOptions = {
    placeholder: 'Escribe aquí la descripción del proyecto...',
    modules: {
        toolbar: [
            ['bold', 'italic'],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ list: 'bullet' }]
        ]
    },
    formats: [
        'bold',
        'italic',
        'size',
        'list',
        'bullet'
    ]
}

const onFilesSelected = (e: Event) => {
    const input = e.target as HTMLInputElement
    if (!input.files) return
    files.value = Array.from(input.files)
    // generar previsualizaciones
    previews.value = []
    files.value.forEach(file => {
        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                previews.value.push(reader.result)
            }
        }
        reader.readAsDataURL(file)
    })
}


const submit = async () => {
    try {
        if (!title.value || !description.value || !goal.value) {
            error.value = 'Por favor, completa todos los campos.'
            return
        }
        const payload = ref<Project>({
            title: title.value,
            description: description.value,
            fundingGoal: goal.value,
            endDate: calculateEndDate(duration.value),
            startDate: new Date().toISOString().split('T')[0],
            userId: userId.value || 0,
            currentAmount: 0,
        })

        const createdProject = await projectStore.createProject(payload.value)
        const projectId = createdProject.id

        const formData = new FormData()
        files.value.forEach(f => formData.append('files', f))

        await projectStore.createProjectImages(projectId, files.value)
        emit('close')
    } catch (error) {
        console.error('Error al crear proyecto o subir imágenes', error)
        alert('Ha ocurrido un error. Comprueba la consola.')
    }
}

</script>

<style scoped lang="scss"></style>
