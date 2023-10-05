<script setup lang="ts">
    import { defineAsyncComponent } from 'vue';

    const NavigationLayout = defineAsyncComponent(() => import('@/layout/NavigationLayout.vue'));
</script>

<template>
    <NavigationLayout />
</template>
