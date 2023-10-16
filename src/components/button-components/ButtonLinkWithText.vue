<script setup lang="ts">
    defineProps({
        text: {
            type: String,
            default: ''
        },
        linkText: {
            type: String,
            default: ''
        },
        to: {
            type: String,
            default: ''
        }
    });
</script>
<template>
    <div>
        <span class="text-sm text-color">{{ text }}</span>
        <RouterLink :to="to" class="ml-2 text-sm text-primary hover:text-gray">{{ linkText }}</RouterLink>
    </div>
</template>