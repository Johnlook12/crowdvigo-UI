import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
import { createPinia } from 'pinia';

import { createI18n } from 'vue-i18n';
import es from './locales/es.json';
import gal from './locales/gal.json';
import en from './locales/en.json';

const messages = {
    es,
    en,
    gal
}

export const i18n = createI18n({
    locale: 'gal',
    fallbackLocale: 'es',
    messages
});

const pinia = createPinia();

createApp(App).use(i18n).use(router).use(pinia).mount('#app')
