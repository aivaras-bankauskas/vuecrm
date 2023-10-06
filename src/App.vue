<script setup lang="ts">
    import { defineAsyncComponent } from 'vue';

    const NavigationLayout = defineAsyncComponent(() => import('@/layout/NavigationLayout.vue'));
</script>

<template>
    <NavigationLayout />
    <main class="h-screen">
        <div class="grid grid-cols-12 h-full">
            <div class="hidden md:block md:col-span-3 xl:col-span-2 bg-background text-color p-2 pl-8">01</div>
            <div class="col-span-12 md:col-span-9 xl:col-span-10 m bg-body-bg text-white p-4 text-center ">02</div>
        </div>
    </main>
</template>
