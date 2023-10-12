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
    <button
        type="submit"
    >
        {{ t(`navigation.${title}`) }}
    </button>
</template>
