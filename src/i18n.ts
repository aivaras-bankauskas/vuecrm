import { createI18n } from 'vue-i18n';
import lt from '@/core/locales/lt.json';
import en from '@/core/locales/en.json';
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { lt, en },
});
export default i18n;
export const i18nGlobal = i18n.global;
