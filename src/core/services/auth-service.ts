import APIService from '@/core/services/api-service';

export default class AuthService {
    static async signup(id: number): Promise<void> {
        const token = 'some-very-secret-token';
        AuthService.storeToken(id, token, '1h');
    }

    static async signIn(email: string, password: string): Promise<boolean> {
        const users = await APIService.getAll('/users');
        const user = users.data.find((user: Record<string, string>) => user.email === email && user.password === password);

        if (user) {
            const token = 'some-very-secret-token';
            AuthService.storeToken(user.id, token, '1h');
            return true;
        } else {
            return false;
        }
    }

    static signOut(): void {
        localStorage.removeItem('userToken');
    }

    static storeToken(id: number, token: string, expiresIn: string): void {
        let expires: number;

        switch (expiresIn) {
            case '10s':
                expires = new Date().getTime() + 10000;
                break;
            case '1m':
                expires = new Date().getTime() + 60000;
                break;
            case '10m':
                expires = new Date().getTime() + 600000;
                break;
            case '1h':
                expires = new Date().getTime() + 3600000;
                break;
            default:
                throw new Error('Invalid expiration time');
        }

        const user = { id, token, expires };
        localStorage.setItem('userToken', JSON.stringify(user));
    }

    static isTokenExpired(): boolean {
        const storedUser = localStorage.getItem('userToken');
        if (storedUser) {
            const { expires } = JSON.parse(storedUser);
            const currentTime = new Date().getTime();
            return currentTime > expires;
        }
        return true;
    }
}
