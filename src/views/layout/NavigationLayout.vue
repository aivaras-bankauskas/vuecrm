<script setup lang="ts">
    import { ref } from 'vue';
    import type { PropType } from 'vue';
    import { useI18n } from 'vue-i18n';
    import  NavigationInterface from '@/interfaces/navigation-interface';

    defineProps({
        navigationItems: {
            type: Array as PropType<NavigationInterface[]>,
            default: () => []
        },
    });

    const { t, locale } = useI18n({});
    const isMenuOpen = ref(false);
    const isUserMenuOpen = ref(false);

    const toggleMenu = (): void => {
        isMenuOpen.value = !isMenuOpen.value;
    };

    const toggleUserMenu = (): void => {
        isUserMenuOpen.value = !isUserMenuOpen.value;
    };

    const switchLanguage = (language: string): void => {
        locale.value = language;
    };
</script>

<template>
    <div class="min-h-full">
        <nav class="bg-background">
            <div class="mx-auto max-w-12xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="text-color text-2xl mb-1">
                            <RouterLink to="/">Company</RouterLink>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <RouterLink
                                    v-for="(navigationItem, index) in navigationItems"
                                    :key="index"
                                    :to="`/${navigationItem.menuItem.name}`"
                                    class="px-3 py-2 text-lg text-color hover:text-hover border-b  border-background hover:border-b hover:border-hover"
                                    active-class="text-hover border-b border-hover"
                                >
                                    {{ t(`navigation.${navigationItem.menuItem.name}`) }}
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <div id="user-desktop-name" class="text-sm cursor-pointer" role="menuitem" @click="toggleUserMenu">Tom Johanson</div>
                            <div class="relative ml-3">
                                <div class="flex items-center">
                                    <button id="user-menu-button" type="button" class="relative flex max-w-xs items-center rounded-full bg-background text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-expanded="false" aria-haspopup="true" @click="toggleUserMenu">
                                        <span class="absolute -inset-1.5"></span>
                                        <span class="sr-only">Open user menu</span>
                                        <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="avatar">
                                    </button>
                                    <button v-if="locale === 'en'" class="w-4 text-center text-sm mx-4 cursor-pointer" @click="switchLanguage('lt')">LT</button>
                                    <button v-else class="w-4 text-center text-sm mx-4 cursor-pointer" @click="switchLanguage('en')">EN</button>
                                </div>
                                <div v-if="isUserMenuOpen" class="absolute right-11 z-10 mt-2 w-64 origin-top-right rounded-md bg-background py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                    <svg class="h-5 w-5 hover:border border-body-bg rounded-full absolute top-2 right-4  cursor-pointer" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" @click="toggleUserMenu">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <div class="flex items-center ml-4 mt-2">
                                        <img class="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="avatar">
                                        <div class="flex flex-col">
                                            <div id="user-menu-name" class="block px-4 text-sm w-40 truncate" role="menuitem">Tom Johanson</div>
                                            <a id="user-menu-email" href="#" class="block px-4 text-xs hover:text-hover w-48 truncate" role="menuitem" @click="toggleUserMenu">tomjohanson@example.com</a>
                                        </div>
                                    </div>
                                    <div class="flex justify-between px-4 py-2">
                                        <a id="user-menu-settings" href="#" class="text-sm" role="menuitem" tabindex="-1" @click="toggleUserMenu">{{ t('navigation.settings') }}</a>
                                        <a id="user-menu-logout" href="#" class="text-sm" role="menuitem" tabindex="-1" @click="toggleUserMenu">{{ t('navigation.signOut') }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <button type="button" class="relative inline-flex items-center justify-center p-2 text-color focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-background" aria-controls="mobile-menu" aria-expanded="false" @click="toggleMenu">
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Open main menu</span>
                            <svg v-if="!isMenuOpen" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="isMenuOpen" id="mobile-menu" class="md:hidden">
                <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    <RouterLink
                        v-for="(navigationItem, index) in navigationItems"
                        :key="index"
                        :to="`/${navigationItem.menuItem.name}`"
                        class="text-color hover:text-hover block px-3 py-2 text-base font-medium"
                        active-class="text-hover"
                        @click="toggleMenu"
                    >
                        {{ t(`navigation.${navigationItem.menuItem.name}`) }}
                    </RouterLink>
                </div>
                <div class="border-t border-color pb-3 pt-4">
                    <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                            <img class="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </div>
                        <div class="ml-3">
                            <div id="user-menu-name" class="text-lg" role="menuitem">Tom Johanson</div>
                            <a id="user-menu-email" href="#" class="text-sm hover:text-hover">tomjohanson@example.com</a>
                        </div>
                    </div>
                    <div class="mt-3 space-y-1 px-2">
                        <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-color hover:text-hover">{{ t('navigation.settings') }}</a>
                        <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-color hover:text-hover">{{ t('navigation.signOut') }}</a>
                    </div>
                    <div class="ml-3 mt-3">
                        <button :class="{ 'text-hover': locale === 'lt' }" class="w-2 text-center text-sm mx-3 cursor-pointer" @click="switchLanguage('lt')">LT</button>
                        <button :class="{ 'text-hover': locale === 'en' }" class="w-2 text-center text-sm mx-3 cursor-pointer" @click="switchLanguage('en')">EN</button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
