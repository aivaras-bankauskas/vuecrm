<script setup lang="ts">
    import { computed } from 'vue';

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
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String,
            default: ''
        }
    });

    const emit = defineEmits(['update:modelValue']);

    const inputStyle = computed(() => {
        return props.errorMessage !== ''
            ? 'block w-full rounded-md border-0 py-1.5 px-3 text-gray-dark shadow-sm ring-1 ring-inset ring-danger placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-danger-light sm:text-sm sm:leading-6'
            : 'block w-full rounded-md border-0 py-1.5 px-3 text-gray-dark shadow-sm ring-1 ring-inset ring-primary-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary-light sm:text-sm sm:leading-6';
    });

    const updateValue = (event: Event): void => {
        const target = event.target as HTMLInputElement;
        emit('update:modelValue', target.value);
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
                :placeholder="placeholder"
                @input="updateValue"
            >
        </div>
        <div class="h-2 text-start text-xs text-danger ml-3 mt-1.5">{{ errorMessage }}</div>
    </div>
</template>
