<script setup lang="ts">
    import Hamburger from '@/assets/icons/hamburger.svg';
    import Close from '@/assets/icons/close.svg';

    defineProps({
        isMenuOpen: {
            type: Boolean,
            default: false
        }
    });
</script>

<template>
    <img :src="isMenuOpen? Hamburger : Close" />
</template>