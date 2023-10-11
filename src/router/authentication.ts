import { Component } from 'vue';

const authentication = [
    {
        path: '/sign-up',
        name: 'sign-up',
        component: (): Promise<Component> => import('@/views/pages/authentication/sign-up/SignUpPage.vue')
    }
];

export default authentication;
