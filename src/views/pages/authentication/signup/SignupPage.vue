<script setup lang="ts">
    import { defineAsyncComponent, reactive } from 'vue';
    import { useI18n } from 'vue-i18n';
    import CardForm from '@/components/card-components/CardForm.vue';
    import ButtonComponent from '@/components/button-components/ButtonComponent.vue';
    import ButtonLinkWithText from '@/components/button-components/ButtonLinkWithText.vue';
    import SignUpInterface from '@/interfaces/SignUpInterface';
    import data from './signup.json';

    const FormComponent = defineAsyncComponent(() => import('@/components/form-components/FormComponent.vue'));

    const { t } = useI18n({});
    const formData = reactive<SignUpInterface>(data.formData);

</script>

<template>
    <CardForm :title="t(`buttons.${data.config.name}`)">
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
                            :text="t(`buttons.${data.config.name}`)"
                            type="submit"
                            class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
                    </div>
                    <div class="pt-5">
                        <ButtonLinkWithText
                            :text="t('buttons.haveAccount')"
                            :link-text="t('buttons.signIn')"
                            to="/sign-in"
                        />
                    </div>
                </template>
            </FormComponent>
        </template>
    </CardForm>
</template>
