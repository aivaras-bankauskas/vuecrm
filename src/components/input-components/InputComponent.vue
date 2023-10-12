<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import IconComponent from '../icon-components/IconComponent.vue';

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

    const { t, te, locale } = useI18n();
    const emit = defineEmits(['update:modelValue']);
    const displayedError = ref('');
    const inputType = ref(props.inputType);
    const isEyeOpen = ref(false);

    const inputStyle = computed(() => {
        return displayedError.value
            ? 'block w-full rounded-md border-0 py-1.5 px-3 text-gray-dark shadow-sm ring-1 ring-inset ring-danger placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-danger-light sm:text-sm sm:leading-6'
            : 'block w-full rounded-md border-0 py-1.5 px-3 text-gray-dark shadow-sm ring-1 ring-inset ring-primary-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary-light sm:text-sm sm:leading-6';
    });

    console.log(props.rules);


    const updateValue = (event: Event): void => {
        const target = event.target as HTMLInputElement;
        emit('update:modelValue', target.value);
        if (props.rules.split('|').includes('required') && target.value === '') {
            displayedError.value = errorMessage(props.inputName, 'required');
        } else {
            displayedError.value = '';
        }
    };

    const getErrorMessage = (): void => {
        if (props.error) {
            displayedError.value = errorMessage(props.inputName, props.error);
        }
    };

    const errorMessage = (inputName: string, error: string): string => {
        if (error) {
            if (!error.includes(':')) {
                const errorTemplate = t(`errors.${error}`);
                const formattedErrorMessage = errorTemplate.replace('{{inputName}}', t(`labels.${inputName}`));
                return formattedErrorMessage;
            } else {
                const [errorType, errorValue] = error.split(':');
                const errorTemplate = t(`errors.${errorType}`);
                const formattedErrorMessage = errorTemplate.replace('{{inputName}}', t(`labels.${inputName}`));
                return formattedErrorMessage.replace('{{count}}', errorValue);
            }
        }
        return '';
    };

    const getPlaceholderAttribute = (): { placeholder: string } => {
        const getTranslation = (type: string): string => {
            const key = `${type}.${props.inputName}`;
            return te(key) ? t(key) : '';
        };

        const placeholder: string = getTranslation('placeholders');
        const label: string = getTranslation('labels');

        return { placeholder: placeholder !== '' ? placeholder : label };
    };

    const toggleEye = (): void => {
        isEyeOpen.value = !isEyeOpen.value;
        if (props.inputName === 'password') {
            inputType.value = !isEyeOpen.value ? 'password' : 'text';
        }
    };

    watch([(): string => props.error, (): string => locale.value], getErrorMessage);
</script>

<template>
    <div>
        <label :for="inputName" class="block text-sm font-medium text-color text-start mb-2">
            {{ t(`labels.${inputName}`) }}
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
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
            <div class="absolute inset-y-0 right-1 flex items-center p-1" @click="toggleEye">
                <div v-if="inputName === 'password'">
                    <IconComponent v-if="!isEyeOpen" src="src/assets/icons/eye-close.svg" class="h-5 w-auto cursor-pointer" />
                    <IconComponent v-else src="src/assets/icons/eye-open.svg" class="h-6 w-auto cursor-pointer" />
                </div>
            </div>
        </div>
        <div class="h-2 text-start text-xs text-danger ml-3 mt-1.5">{{ displayedError }}</div>
    </div>
</template>
