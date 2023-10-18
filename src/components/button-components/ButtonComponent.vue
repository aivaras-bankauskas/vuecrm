<script setup lang="ts">
    withDefaults(defineProps<{
        text: string;
        type: 'button' | 'submit' | 'reset';
    }>(), {
        type: 'button'
    });
</script>

<template>
    <button :type="type">{{ text }}</button>
</template>
