import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Component } from 'vue';
import authentication from './authentication';
import { navigationItems } from '@/views/layout/navigation.json';
import  NavigationInterface from '@/interfaces/NavigationInterface';

const routes: RouteRecordRaw[] = [];

// Redirect to production page
routes.push({
    path: '/',
    redirect: '/production'
});

// Add routes from authentication
routes.push(...authentication);

// Add routes from navigation
navigationItems.forEach((item: NavigationInterface): void => {
    const { name, vue } = item.menuItem;
    routes.push({
        name,
        path: `/${name}/:id?`,
        component: (): Promise<Component> =>
            import(`@/views/pages/${vue}.vue`).catch(() => {
                return import('@/views/pages/NotFound.vue');
            })
    });
});

// Add not found page
routes.push(
    {
        name: 'not-found',
        path: '/:pathMatch(.*)*',
        component: (): Promise<Component> => import('@/views/pages/NotFound.vue')
    }
);

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;
