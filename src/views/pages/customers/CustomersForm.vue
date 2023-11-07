<script setup lang="ts">
    import { defineAsyncComponent, ref, reactive, computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';
    import CardForm from '@/components/card-components/CardForm.vue';
    import ButtonComponent from '@/components/button-components/ButtonComponent.vue';
    import CustomersInterface from '@/interfaces/CustomersInterface';
    import data from './customers.json';

    const FormComponent = defineAsyncComponent(() => import('@/components/form-components/FormComponent.vue'));

    const { t } = useI18n({});
    const route = useRoute();
    const id = ref<number>(parseInt(route.params.id as string));
    const formData = reactive<CustomersInterface>(data.formData);
    const formTitle = computed<string>(() => (id.value ? t('labels.editCustomer') : t('labels.addCustomer')));

</script>

<template>
    <CardForm :title="formTitle">
        <template #card-form-body>
            <FormComponent
                class="space-y-4 mt-10"
                :url-id="id"
                :config="data.config"
                :data="formData"
                :inputs="data.inputs"
            >
                <template #buttons>
                    <div class="pt-4">
                        <ButtonComponent
                            :text="t(`buttons.submit`)"
                            type="submit"
                            class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
                    </div>
                </template>
            </FormComponent>
        </template>
    </CardForm>
</template>
