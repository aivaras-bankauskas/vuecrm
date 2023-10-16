import { Component } from 'vue';

const authentication = [
    {
        path: '/sign-up',
        name: 'sign-up',
        component: (): Promise<Component> => import('@/views/pages/authentication/sign-up/SignUpPage.vue')
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: (): Promise<Component> => import('@/views/pages/authentication/sign-in/SignInPage.vue')
    }
];

export default authentication;
