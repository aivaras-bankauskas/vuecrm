<script setup lang="ts">
    import { defineAsyncComponent, reactive } from 'vue';
    import CardForm from '@/components/card-components/CardForm.vue';
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
            />
        </template>
    </CardForm>
</template>
