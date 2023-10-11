<script setup lang="ts">
    import { defineAsyncComponent, reactive } from 'vue';
    import UserInterface from '@/interfaces/UserInterface';

    const FormComponent = defineAsyncComponent(() => import('@/components/form-components/FormComponent.vue'));

    const data = {
        config: {
            URL: '/users',
            API: '/users'
        },
        formData: {
            'firstName': '',
            'lastName': '',
            'email': '',
        },
        inputs: [
            {
                inputName: 'firstName',
                rules: ['required', 'alpha']
            },
            {
                inputName: 'lastName',
                rules: ['required', 'alpha']
            },
            {
                inputName: 'email',
                rules: ['required', 'email']
            }
        ]
    };

    const formData = reactive<UserInterface>(data.formData);

</script>

<template>
    <div class="flex min-h-full flex-col py-10 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
                <FormComponent
                    class="space-y-4 mt-10"
                    :url-id="null"
                    :config="data.config"
                    :data="formData"
                    :inputs="data.inputs"
                />
            </div>
        </div>
    </div>
</template>
