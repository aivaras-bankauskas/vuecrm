import AuthService from '@/core/services/auth-service';
import { NavigationGuardWithThis } from 'vue-router';

export const requireAuth: NavigationGuardWithThis<undefined> = (to, _from, next) => {
    if (to.meta.requiresAuth && !AuthService.isTokenSet()) {
        next({ name: 'sign-in' });
    } else {
        next();
    }
};
