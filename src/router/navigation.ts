import { RouteRecordRaw } from 'vue-router';
import NavigationInterface from '@/interfaces/NavigationInterface';
import navigationData from '@/views/layout/navigation.json';

export const generateNavigationRoutes = (): RouteRecordRaw[] =>
    navigationData.navigationItems.map((item: NavigationInterface): RouteRecordRaw => {
        const { name, vue, auth } = item.menuItem;
        return {
            name,
            path: `/${name}/:id?`,
            component: () => lazyLoadView(vue),
            meta: {
                requiresAuth: auth
            }
        };
    });

const lazyLoadView = (vue: string): Promise<typeof import('*.vue')> =>
    import(`@/views/pages/${vue}.vue`)
        .then((module) => module.default)
        .catch(() => import('@/views/pages/NotFound.vue'));
