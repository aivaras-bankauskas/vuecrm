import APIService from '@/core/services/api-service';

export default class AuthService {
    static async signup(id: number): Promise<void> {
        const token = 'some-very-secret-token';
        localStorage.setItem('userToken', JSON.stringify({ id, token }));
    }

    static async signIn(email: string, password: string): Promise<boolean> {
        const users = await APIService.getAll('/users');
        const user = users.data.find((user: Record<string, string>) => user.email === email && user.password === password);

        if (user) {
            const token = 'some-very-secret-token';
            localStorage.setItem('userToken', JSON.stringify({ id: user.id, token }));
            return true;
        } else {
            return false;
        }
    }

    static signOut(): void {
        localStorage.removeItem('userToken');
    }

    static isTokenSet(): boolean {
        return !!localStorage.getItem('userToken');
    }
}
