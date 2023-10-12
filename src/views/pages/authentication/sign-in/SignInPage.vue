<script setup lang="ts">
    import { defineAsyncComponent, reactive } from 'vue';
    import CardForm from '@/components/card-components/CardForm.vue';
    import ButtonComponent from '@/components/button-components/ButtonComponent.vue';
    import UserInterface from '@/interfaces/UserInterface';
    import data from './sign-in.json';

    const FormComponent = defineAsyncComponent(() => import('@/components/form-components/FormComponent.vue'));

    const formData = reactive<UserInterface>(data.formData);

</script>

<template>
    <CardForm :title="data.config.name">
        <template #card-form-body>
            <FormComponent
                class="space-y-4 mt-10"
                :url-id="null"
                :config="data.config"
                :data="formData"
                :inputs="data.inputs"
            >
                <template #buttons>
                    <div class="pt-4">
                        <ButtonComponent
                            :title="data.config.name"
                            type="submit"
                            class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
                    </div>
                </template>
            </FormComponent>
        </template>
    </CardForm>
</template>
