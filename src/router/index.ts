import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { requireAuth } from './route-guards';
import authentication from './authentication';
import { generateNavigationRoutes } from './navigation';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/company'
    },
    ...authentication,
    ...generateNavigationRoutes(),
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
