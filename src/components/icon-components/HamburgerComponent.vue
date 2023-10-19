<script setup lang="ts">
    import Hamburger from '@/assets/icons/hamburger.svg';
    import Close from '@/assets/icons/close.svg';

    withDefaults(defineProps<{
        isMenuOpen: boolean;
    }>(), {
        isMenuOpen: false
    });
</script>

<template>
    <img :src="isMenuOpen? Hamburger : Close" />
</template>
