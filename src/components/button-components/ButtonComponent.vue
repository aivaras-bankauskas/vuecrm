<script setup lang="ts">
    defineProps({
        text: {
            type: String,
            default: ''
        },
        type: {
            type: String as () => 'button' | 'submit' | 'reset',
            default: 'button'
        },
    });
</script>

<template>
    <button :type="type">{{ text }}</button>
</template>
