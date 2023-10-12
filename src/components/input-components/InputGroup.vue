<script setup lang="ts">
    import { defineAsyncComponent, ref } from 'vue';
    import type { PropType } from 'vue';
    import InputInterface from '@/core/interfaces/InputInterface';

    const InputComponent = defineAsyncComponent(() => import('@/components/input-components/InputComponent.vue'));

    const props = defineProps({
        formData: {
            type: Object,
            required: true
        },
        inputs: {
            type: Array as PropType<InputInterface[]>,
            required: true
        },
        validationErrors: {
            type: Object,
            required: true
        }
    });

    const localFormData = ref(props.formData);
</script>

<template>
    <div v-for="(input, index) in inputs" :key="index">
        <InputComponent
            v-model="localFormData[input.inputName]"
            :input-name="input.inputName"
            :rules="input.rules.join('|')"
            :error="validationErrors[input.inputName]"
        />
    </div>
</template>
