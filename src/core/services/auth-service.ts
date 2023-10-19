// For TESTING purposes only. Needs to be replaced with BACKEND logic
export default class AuthService {
    static signup(id: number, expiration: string): void {
        const token = `some-very-secret-token-${id}`;

        let expires;
        switch (expiration) {
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

        const user = { token, expires };
        localStorage.setItem('userToken', JSON.stringify(user));
    }

    static isTokenExpired(): boolean {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { expires } = JSON.parse(storedUser);
            const currentTime = new Date().getTime();
            return currentTime > expires;
        }
        return true;
    }

    signIn(): void {
        if (AuthService.isTokenExpired()) {
            console.log('Token is expired, please sign in again.');
        } else {
            console.log('Token is valid, proceed with sign in.');
        }
    }
}
