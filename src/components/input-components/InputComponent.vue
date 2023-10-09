<script setup lang="ts">
    import { computed, ref, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { validateField } from '@/core/utilities/validation/validation-hendler';

    const props = defineProps({
        modelValue: {
            type: [String, Number, Boolean, Array],
            default: ''
        },
        inputName: {
            type: String,
            default: ''
        },
        inputType: {
            type: String,
            default: 'text'
        },
        validation: {
            type: Array,
            default: () => ([] as string[])
        },
        isFormSubmitted: {
            type: Boolean,
            default: false
        }
    });

    const { t } = useI18n();
    const emit = defineEmits(['update:modelValue', 'update:errors']);
    const activeErrors = ref<string[]>([]);

    watchEffect(() => {
        if (!props.isFormSubmitted) return;
        activeErrors.value = validateField(props.modelValue as string, props.validation as string[]);
        emit('update:errors', activeErrors.value);
    });

    const inputStyle = computed(() => {
        return activeErrors.value.length > 0
            ? 'block w-full rounded-md border-0 py-1.5 px-3 text-gray-dark shadow-sm ring-1 ring-inset ring-danger placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-danger-light sm:text-sm sm:leading-6'
            : 'block w-full rounded-md border-0 py-1.5 px-3 text-gray-dark shadow-sm ring-1 ring-inset ring-primary-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary-light sm:text-sm sm:leading-6';
    });

    const errorMessage = (inputName: string, activeErrors: string): string => {
        return `${t('errors.field')} ${t(`labels.${inputName}`).toLowerCase()} ${t(`errors.${activeErrors}`).toLowerCase()}`;
    };

    const updateValue = (event: Event): void => {
        const target = event.target as HTMLInputElement;
        emit('update:modelValue', target.value);
    };

    const getPlaceholderAttribute = (): { placeholder: string } => {
        const getTranslation = (type: string): string => t(`${type}.${props.inputName}`);
        const placeholder: string = getTranslation('placeholders');
        const label: string = getTranslation('labels');

        return { placeholder: placeholder !== `placeholders.${props.inputName}` ? placeholder : label };
    };
</script>

<template>
    <div>
        <label for="password" class="block text-sm font-medium text-color text-start mb-2">
            {{ t(`labels.${inputName}`) }} {{ validation.length > 0 ? '*' : '' }}
        </label>
        <input
            :id="inputName"
            :value="modelValue"
            :name="inputName"
            :type="inputType"
            :class="inputStyle"
            v-bind="getPlaceholderAttribute()"
            @input="updateValue"
        >
        <div v-show="activeErrors.length > 0" class="text-start text-xs text-danger ml-3 mt-1.5">
            {{ errorMessage(inputName, activeErrors[0]) }}
        </div>
    </div>
</template>
