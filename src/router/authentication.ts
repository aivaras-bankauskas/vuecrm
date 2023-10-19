import { Component } from 'vue';

const authentication = [
    {
        path: '/signup',
        name: 'signup',
        component: (): Promise<Component> => import('@/views/pages/authentication/sign-up/SignupPage.vue')
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: (): Promise<Component> => import('@/views/pages/authentication/sign-in/SignInPage.vue')
    }
];

export default authentication;
