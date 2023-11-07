import { Component } from 'vue';

const customers = [
    {
        path: '/customers/create',
        name: 'customers-create',
        component: (): Promise<Component> => import('@/views/pages/customers/CustomersForm.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customers/:id/edit',
        name: 'customers-edit',
        component: (): Promise<Component> => import('@/views/pages/customers/CustomersForm.vue')
    }
];

export default customers;
