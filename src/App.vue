<script setup lang="ts">
    import { defineAsyncComponent } from 'vue';
    import { navigationItems } from '@/views/layout/navigation.json';

    const NavigationLayout = defineAsyncComponent(() => import('@/views/layout/NavigationLayout.vue'));
    const TwoColumnsLayout = defineAsyncComponent(() => import('@/views/layout/TwoColumnsLayout.vue'));
</script>

<template>
    <NavigationLayout :navigation-items="navigationItems" />
    <TwoColumnsLayout />
</template>
