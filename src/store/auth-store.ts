import { defineStore } from 'pinia';
import AuthService from '@/core/services/auth-service';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isUserSignedIn: false,
    }),
    actions: {
        signIn() {
            this.isUserSignedIn = true;
        },
        signOut() {
            AuthService.signOut();
            this.isUserSignedIn = false;
        }
    }
});
