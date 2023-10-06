<script setup lang="ts">
    import { defineAsyncComponent } from 'vue';
    import { navigationItems } from '@/layout/navigation.json';

    const NavigationLayout = defineAsyncComponent(() => import('@/layout/NavigationLayout.vue'));
    const TwoColumnsLayout = defineAsyncComponent(() => import('@/layout/TwoColumnsLayout.vue'));
</script>

<template>
    <NavigationLayout :navigation-items="navigationItems" />
    <TwoColumnsLayout />
</template>
