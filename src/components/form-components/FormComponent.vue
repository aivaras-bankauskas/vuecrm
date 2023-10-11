<script setup lang="ts">
    import { defineAsyncComponent, reactive, onMounted } from 'vue';
    import type { PropType } from 'vue';
    import { useRouter } from 'vue-router';
    import { getFormData, submitFormData } from '@/core/handlers/form-handler';
    import InputInterface from '@/core/interfaces/InputInterface';
    import ConfigInterface from '@/core/interfaces/ConfigInterface';

    const InputGroup = defineAsyncComponent(() => import('@/components/input-components/InputGroup.vue'));

    const props = defineProps({
        urlId: {
            type: Number as PropType<number | null>,
            default: null
        },
        config: {
            type: Object as PropType<ConfigInterface>,
            required: true
        },
        data: {
            type: Object as PropType<Record<string, unknown>>,
            required: true
        },
        inputs: {
            type: Array as PropType<InputInterface[]>,
            required: true
        }
    });

    const router = useRouter();
    const formData = reactive({ ...props.data });
    const validationErrors = reactive(Object.fromEntries(Object.keys(formData).map(key => [key, ''])));
    let initialFormData: Record<string, unknown> = {};

    onMounted(async() => {
        if (props.urlId) initialFormData = await getFormData(props.urlId, formData, props.config);
    });

    const submitForm = async (): Promise<void> => {
        await submitFormData(props.urlId, formData, initialFormData, validationErrors, props.config, props.data);
        if (props.config.redirect !== '') router.push(props.config.redirect);
    };
</script>

<template>
    <form @submit.prevent="submitForm">
        <InputGroup
            :form-data="formData"
            :inputs="inputs"
            :validation-errors="validationErrors"
        />
        <div class="pt-4">
            <button type="submit" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
        </div>
    </form>

</template>
@/core/handlers/form-handler