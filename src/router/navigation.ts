import { RouteRecordRaw } from 'vue-router';
import NavigationInterface from '@/interfaces/NavigationInterface';
import navigationData from '@/views/layout/navigation.json';

export const generateNavigationRoutes = (): RouteRecordRaw[] =>
    navigationData.navigationItems.map((item: NavigationInterface): RouteRecordRaw => {
        const { name, vue, auth } = item.menuItem;
        return {
            name,
            path: `/${name}`,
            component: () => lazyLoadView(name, vue),
            meta: {
                requiresAuth: auth
            }
        };
    });

const lazyLoadView = (name: string, vue: string): Promise<typeof import('*.vue')> =>
    import(`@/views/pages/${name}/${vue}.vue`)
        .then((module) => module.default)
        .catch(() => import('@/views/pages/NotFound.vue'));
