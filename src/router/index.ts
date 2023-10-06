import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Component } from 'vue';
import { navigationItems } from '@/views/layout/navigation.json';
import  NavigationInterface from '@/interfaces/navigation-interface';

const routes: RouteRecordRaw[] = [];

routes.push({
    path: '/',
    redirect: '/production'
});

navigationItems.forEach((item: NavigationInterface): void => {
    const { name, path, vue } = item.menuItem;
    routes.push({
        path,
        name,
        component: (): Promise<Component> =>
            import(`@/views/pages/${vue}.vue`).catch(() => {
                return import('@/views/pages/NotFound.vue');
            })
    });
});

routes.push(
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: (): Promise<Component> => import('@/views/pages/NotFound.vue')
    }
);

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
