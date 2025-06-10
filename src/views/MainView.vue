<template>
    <div class="bg-[#f5f5f5] min-h-screen mt-1 relative flex flex-col justify-center">
        <div class="flex flex-row justify-center">
            <div class="pt-20 ml-10">
                <h2 class="font-semibold text-5xl">Bienvenido a crowdvigo</h2>
                <p class="w-140 mt-8">Democratizar el acceso a oportunidades de inversión con alto potencial de rentabilidad, conectando proyectos innovadores con una comunidad de inversores comprometidos.</p>
                <p class="w-140 mt-5">Somos una plataforma tecnológica e innovadora donde emprendedores y financiadores convergen para presentar, apoyar y hacer crecer juntos sus proyectos. Aquí, cada idea encuentra su audiencia, y cada inversión impulsa el éxito compartido.</p>
            </div>
            <div>
                <img src="/img/home-img.png" class="w-200">
            </div>
        </div>
        <div class="flex flex-row justify-center px-5">
            <img src="/img/home-img2.png" alt="">
            <div class="bg-white ml-20 w-225 h-80 p-4 rounded-xl mt-8">
                <h2 class="font-semibold text-4xl mt-8">Somos crowfunding</h2>
                <p class="mt-5">Somos Proveedores de Servicios de Financiación Participativa autorizado por la Comisión Nacional del Mercado de Valores (CNMV), con propuesta favorable del Banco de España,  inscrito con número de registro 9. Somos transparentes y trabajamos con arreglo al mejor interés para nuestros clientes. Por favor, antes de invertir, infórmate de los riesgos y lee la Información Básica para el Cliente Inversor, así como el periodo de reflexión precontractual para inversores no experimentados. Consulta los informes financieros aquí.</p>
                <button class=" p-3 pr-6 pl-6 bg-[#001136] text-[#ffffff] rounded-xl text-xl font-semibold cursor-pointer mt-5">Regístrate</button>
            </div>
        </div>
        <div class="bg-[#e6e9ec] mt-15  h-60 flex items-center justify-center">
            <div class="flex flex-row space-x-25">
                <div class="flex flex-col items-center">
                    <img src="/icons/arrow-outcome.svg" class="w-15" alt="">
                    <span class="text-2xl font-semibold text-[#001136]">14,6%</span>
                    <p>Rentabilidad media</p>
                </div>
                <div class="flex flex-col items-center">
                    <img src="/icons/euro-circle.svg" class="w-15" alt="">
                    <span class="text-2xl font-semibold text-[#001136]">55M€</span>
                    <p>Financiado</p>
                </div>
                <div class="flex flex-col items-center">
                    <img src="/icons/calendar.svg" class="w-15" alt="">
                    <span class="text-2xl font-semibold text-[#001136]">3 meses</span>
                    <p>Plazo medio</p>
                </div>
                <div class="flex flex-col items-center">
                    <img src="/icons/coin-bag.svg" class="w-15" alt="">
                    <span class="text-2xl font-semibold text-[#001136]">0%</span>
                    <p>Tasa de impago</p>
                </div>
                <div class="flex flex-col items-center">
                    <img src="/icons/percentage.svg" class="w-15" alt="">
                    <span class="text-2xl font-semibold text-[#001136]">85%</span>
                    <p>Porcentaje de éxito</p>
                </div>
            </div>
        </div>
        <div class="bg-white pb-10">
            <h3 class="font-semibold text-4xl text-center mt-20 pb-20">Oportunidades para invertir</h3>
            <div class="flex flex-row justify-center space-x-20">
                <ProjectCard :project="project" />
                <ProjectCard :project="project" />
                <ProjectCard :project="project" />
            </div>
        </div>
        <div class="bg-[#a2d2cd] text-center flex flex-col">
            <h3 class="text-3xl font-semibold mt-10">Nuestras tarifas</h3>
            <p class="text-xl mt-13">Transparencia total: aquí encontrarás exactamente lo que pagarás… ¡y lo que no!</p>
            <p class="text-xl mt-13">Para ti, como inversor, es 100% GRATIS. No cobramos nada por apoyar los proyectos que te inspiran.</p>
            <div class="flex flex-row justify-between w-120 mx-auto mt-20">
                <div class="flex flex-col">
                    <img src="/icons/0-percentage.svg" alt="">
                    <span class="text-2xl font-semibold">A inversores</span>
                </div>
                <div class="flex flex-col">
                    <img src="/icons/5-percentage.svg" alt="">
                    <span class="text-2xl font-semibold">A promotores</span>
                </div>
            </div>
            <p class="text-xl mt-13 pb-20">Sin letra pequeña, sin sorpresas. Así es de sencillo: invierte a tu ritmo y deja que nosotros nos encarguemos del resto.</p>
        </div>
        <div class="bg-[#f5f5f5] flex flex-row justify-center space-x-20">
            <div class="mt-20 w-180 p-4">
                <h3 class="text-3xl font-semibold">Nuestro compromiso contigo</h3>
                <p class="text-2xl mt-20">En nuestra plataforma, nos comprometemos a ofrecerte la mejor experiencia de inversión posible. Trabajamos arduamente para garantizar la transparencia y la seguridad en todas las transacciones.</p>
            <button class="mt-10 p-3 pr-6 pl-6 bg-[#ffffff] text-[#001136] rounded-xl text-xl font-semibold cursor-pointer">Quiero saber más</button>
            </div>
            <div class="w-90">
                <img src="/img/home-img3.png" alt="">
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup lang="ts">
import ProjectCard from '../components/ProjectCard/ProjectCard.vue';
import Footer from '../components/Footer/Footer.vue';
import { ref } from 'vue';

const project = ref<Project>({
    id: 1,
    title: 'Proyecto de ejemplo',
    description: 'Descripción del proyecto de ejemplo',
    category: 'Tecnología',
    goal: 100000,
    currentAmount: 50000,
    startDate: '2023-01-01',
    endDate: '2023-12-31'
})
</script>

<style lang="scss" scoped>

</style>