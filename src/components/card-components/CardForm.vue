<script setup lang="ts">
    import { useI18n } from 'vue-i18n';

    defineProps({
        title: {
            type: String,
            default: ''
        },
    });

    const { t } = useI18n({});
</script>

<template>
    <div class="flex min-h-full flex-col py-10 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ t(`navigation.${title}`) }}</h2>
                <slot name="card-form-body" />
            </div>
        </div>
    </div>
</template>
