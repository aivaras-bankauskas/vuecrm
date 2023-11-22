import { useUserStore } from '@/store/user-store';

export default class AuthService {
    static async signIn(token: string): Promise<void> {
        const authStore = useUserStore();
        localStorage.setItem('userToken', JSON.stringify({ token }));
        authStore.authenticatedUser();
    }

    static signOut(): void {
        localStorage.removeItem('userToken');
    }

    static isTokenSet(): boolean {
        return !!localStorage.getItem('userToken');
    }
}
