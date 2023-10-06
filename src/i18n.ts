import { createI18n } from 'vue-i18n';
import lt from '@/locales/lt.json';
import en from '@/locales/en.json';
const i18n = createI18n({
    legacy: false,
    locale: 'lt',
    fallbackLocale: 'en',
    messages: { lt, en },
});
export default i18n;
export const i18nGlobal = i18n.global;