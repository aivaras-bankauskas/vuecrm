import { defineStore } from 'pinia';
import AuthService from '@/core/services/auth-service';
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
        async authenticatedUser() {
            const localData = localStorage.getItem('userToken');

            if (localData) {
                const response = await APIService.getAll('/auth-user');
                this.currentUser = response.data.data;
                this.isUserSignedIn = true;
            }
        },
        signOut() {
            AuthService.signOut();
            this.isUserSignedIn = false;
        }
    },
});
