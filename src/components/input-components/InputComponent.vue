<script setup lang="ts">
    import { computed, ref } from 'vue';
    import IconComponent from '../icon-components/IconComponent.vue';

    const props = withDefaults(defineProps<{
        modelValue: string | number | boolean | unknown[];
        inputName: string;
        inputType: string;
        label: string;
        placeholder: string;
        required: boolean;
        errorMessage: string;
    }>(), {
        required: false,
    });

    const emit = defineEmits(['update:modelValue']);
    const inputType = ref(props.inputType);
    const isEyeOpen = ref(false);

    const inputStyle = computed(() => {
        const ringColor = props.errorMessage
            ? 'ring-danger focus:ring-danger-light'
            : 'ring-primary-light focus:ring-primary-light';
        return ringColor;
    });

    const updateValue = (event: Event): void => {
        const target = event.target as HTMLInputElement;
        emit('update:modelValue', target.value);
    };

    const toggleEye = (): void => {
        isEyeOpen.value = !isEyeOpen.value;
        if (props.inputName === 'password') {
            inputType.value = !isEyeOpen.value ? 'password' : 'text';
        }
    };
</script>

<template>
    <div>
        <label :for="inputName" class="block text-sm font-medium text-color text-start mb-2">
            {{ label }} {{ required ? '*' : '' }}
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
            <input
                :id="inputName"
                :value="modelValue"
                :name="inputName"
                :type="inputType"
                :class="inputStyle"
                class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-dark shadow-sm ring-1 ring-inset placeholder:text-gray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                :placeholder="placeholder"
                @input="updateValue"
            >
            <div class="absolute inset-y-0 right-1 flex items-center p-1" @click="toggleEye">
                <div v-if="inputName === 'password'">
                    <IconComponent v-if="!isEyeOpen" src="src/assets/icons/eye-close.svg" class="h-6 w-auto text-gray-light cursor-pointer" />
                    <IconComponent v-else src="src/assets/icons/eye-open.svg" class="h-6 w-auto text-gray-light cursor-pointer" />
                </div>
            </div>
        </div>
        <div class="h-2 text-start text-xs text-danger ml-3 mt-1.5">{{ errorMessage }}</div>
    </div>
</template>
