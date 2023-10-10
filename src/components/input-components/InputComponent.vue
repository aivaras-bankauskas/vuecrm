<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { useI18n } from 'vue-i18n';

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
        rules: {
            type: String,
            default: ''
        },
        error: {
            type: String,
            default: ''
        }
    });

    const { t } = useI18n();
    const emit = defineEmits(['update:modelValue']);
    const displayedError = ref('');

    const inputStyle = computed(() => {
        return displayedError.value
            ? 'block w-full rounded-md border-0 py-1.5 px-3 text-gray-dark shadow-sm ring-1 ring-inset ring-danger placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-danger-light sm:text-sm sm:leading-6'
            : 'block w-full rounded-md border-0 py-1.5 px-3 text-gray-dark shadow-sm ring-1 ring-inset ring-primary-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary-light sm:text-sm sm:leading-6';
    });

    const updateValue = (event: Event): void => {
        const target = event.target as HTMLInputElement;
        emit('update:modelValue', target.value);
        displayedError.value = '';
    };

    const getErrorMessage = (): void => {
        if (props.error) {
            displayedError.value = errorMessage(props.inputName, props.error);
        }
    };

    const errorMessage = (inputName: string, error: string): string => {
        if (error) {
            const errorTemplate = t(`errors.${error}`);
            const formattedErrorMessage = errorTemplate.replace('{{inputName}}', t(`labels.${inputName}`));

            return formattedErrorMessage;
        }
        return '';
    };

    const getPlaceholderAttribute = (): { placeholder: string } => {
        const getTranslation = (type: string): string => t(`${type}.${props.inputName}`);
        const placeholder: string = getTranslation('placeholders');
        const label: string = getTranslation('labels');

        return { placeholder: placeholder !== `placeholders.${props.inputName}` ? placeholder : label };
    };

    watch(() => props.error, getErrorMessage);
</script>

<template>
    <div>
        <label :for="inputName" class="block text-sm font-medium text-color text-start mb-2">
            {{ t(`labels.${inputName}`) }}
        </label>
        <input
            :id="inputName"
            :value="modelValue"
            :name="inputName"
            :type="inputType"
            :class="inputStyle"
            v-bind="getPlaceholderAttribute()"
            :data-rules="rules"
            @input="updateValue"
        >
        <div class="h-2 text-start text-xs text-danger ml-3 mt-1.5">{{ displayedError }}</div>
    </div>
</template>