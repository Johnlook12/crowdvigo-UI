<template>
    <footer class="bg-[#ffffff] text-[#001136] py-10 mt-20">
        <div
            class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div class="text-center md:text-left">
                <h4 class="text-2xl font-semibold mb-2">{{ $t("footer.brand") }}</h4>
                <p class="text-sm w-80">
                    Conectamos proyectos innovadores con inversores comprometidos. Transparencia, seguridad y compromiso
                    en cada inversión.
                </p>
            </div>

            <div class="text-center">
                <h5 class="font-semibold text-lg mb-2">{{ $t("footer.usefulLinksTitle") }}</h5>
                <ul class="space-y-1">
                    <li><a href="#" class="hover:underline">{{ $t("footer.links.home") }}</a></li>
                    <li><a href="#" class="hover:underline">{{ $t("footer.links.projects") }}</a></li>
                    <li><a href="#" class="hover:underline">{{ $t("footer.links.tariffs") }}</a></li>
                    <li><a href="#" class="hover:underline">{{ $t("footer.links.contact") }}</a></li>
                </ul>
            </div>

            <div class="text-center md:text-right">
                <h5 class="font-semibold text-lg mb-2">{{ $t("footer.contactTitle") }}</h5>
                <p>{{ $t("footer.emailLabel") }}: {{ $t("footer.email") }}</p>
                <p>{{ $t("footer.phoneLabel") }}: {{ $t("footer.phone") }}</p>
                <div class="flex justify-center md:justify-end mt-4 space-x-4">
                    <img src="/icons/facebook.svg" class="w-6 h-6" alt="Facebook">
                    <img src="/icons/twitter.svg" class="w-6 h-6" alt="Twitter">
                    <img src="/icons/linkedin.svg" class="w-6 h-6" alt="LinkedIn">
                </div>
            </div>
        </div>
        <p class="text-center text-sm text-gray-400 mt-6">{{ $t("footer.copyright") }}</p>
    </footer>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
