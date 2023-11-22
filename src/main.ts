import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/css/main.css';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import AuthService from '@/core/services/auth-service';
import { apiClient } from '@/core/services/api-service';

apiClient.interceptors.request.use(
    (config) => {
        const localData = localStorage.getItem('userToken');
        const tokenObject = localData ? JSON.parse(localData) : null;
        const token = tokenObject ? tokenObject.token : null;

        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            AuthService.signOut();
            router.push({ name: 'sign-in' });
        }
        return Promise.reject(error);
    }
);

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');
