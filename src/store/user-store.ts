import { defineStore } from 'pinia';
import { useAuthStore } from '@/store/auth-store';
import APIService from '@/core/services/api-service';
import UserInterface from '@/interfaces/UserInterface';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        isUserSignedIn: false,
        users: [] as UserInterface[],
        currentUser: {} as Partial<UserInterface>,
    }),
    actions: {
        async getAllUsers() {
            const response = await APIService.getAll('/users');
            this.users = response.data;
        },
        async getCurrentUser(id: number) {
            const user = await APIService.get('/users', id);
            this.currentUser = user.data || {};
        },
        async authenticatedUser() {
            const authStore = useAuthStore();
            const localData = localStorage.getItem('userToken');

            if (localData) {
                const { id } = JSON.parse(localData);
                await this.getCurrentUser(id);
                authStore.signIn();
            }
        }
    },
});
