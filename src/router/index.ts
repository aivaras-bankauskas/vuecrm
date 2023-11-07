import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { requireAuth } from './route-guards';
import { generateNavigationRoutes } from './navigation';
import authentication from './authentication';
import customers from './customers';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/company'
    },
    ...generateNavigationRoutes(),
    ...authentication,
    ...customers,
    {
        name: 'not-found',
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/pages/NotFound.vue')
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

router.beforeEach(requireAuth);

export default router;
