<script setup lang="ts">
    defineProps({
        src: {
            type: String,
            default: ''
        }
    });
</script>

<template>
    <img :src="src" />
</template>