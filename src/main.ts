import { createApp } from 'vue';
import './assets/css/main.css';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import axios from 'axios';
import AuthService from '@/core/services/auth-service';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
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

const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount('#app');
