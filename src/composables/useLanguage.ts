import { computed } from 'vue';
import { useI18n } from 'vue-i18n';



export function useLanguage() {
    const { locale } = useI18n({ useScope: 'global' });

    const languages = [
        { code: 'gal', name: 'GL', flag: 'es-ga' },
        { code: 'es', name: 'ES', flag: 'es' },
        { code: 'en', name: 'EN', flag: 'sh' }
    ];

    const currentLanguage = computed<string>({
        get: () => locale.value,
        set: (value: string) => {
            locale.value = value;
        }
    })

    return {
        languages,
        currentLanguage
    }
}