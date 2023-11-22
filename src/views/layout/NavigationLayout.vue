<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import type { PropType } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useUserStore } from '@/store/user-store';
    import  NavigationInterface from '@/interfaces/NavigationInterface';
    import HamburgerComponent from '@/components/icon-components/HamburgerComponent.vue';
    import IconComponent from '@/components/icon-components/IconComponent.vue';
    import router from '@/router';

    defineProps({
        navigationItems: {
            type: Array as PropType<NavigationInterface[]>,
            default: () => []
        },
    });

    const { t, locale } = useI18n({});
    const userStore = useUserStore();
    const isMenuOpen = ref(false);
    const isUserMenuOpen = ref(false);

    const currentUser = computed(() => userStore.currentUser);
    const isUserSignedIn = computed(() => userStore.isUserSignedIn);
    const fullName = computed(() => `${currentUser.value.firstName} ${currentUser.value.lastName}`);

    onMounted(async () => {
        await userStore.authenticatedUser();
    });

    const handleSignOut = (): void => {
        userStore.signOut();
        isUserMenuOpen.value = false;
        router.push('/sign-in');
    };

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
                            <div v-if="isUserSignedIn" id="user-desktop-name" class="text-sm cursor-pointer" role="menuitem" @click="toggleUserMenu">{{ fullName }}</div>
                            <RouterLink v-else id="user-desktop-name" to="/sign-in" class="text-sm cursor-pointer">{{ t('buttons.signIn') }}</RouterLink>
                            <div class="relative ml-3">
                                <div class="flex items-center">
                                    <button id="user-menu-button" type="button" class="relative flex max-w-xs items-center rounded-full bg-background text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-expanded="false" aria-haspopup="true" @click="toggleUserMenu">
                                        <span class="absolute -inset-1.5"></span>
                                        <span class="sr-only">Open user menu</span>
                                        <img v-if="isUserSignedIn" class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="avatar">
                                        <IconComponent v-else src="src/assets/icons/login.svg" class="h-5 w-5" />
                                    </button>
                                    <button v-if="locale === 'en'" class="w-4 text-center text-sm mx-4 cursor-pointer" @click="switchLanguage('lt')">LT</button>
                                    <button v-else class="w-4 text-center text-sm mx-4 cursor-pointer" @click="switchLanguage('en')">EN</button>
                                </div>
                                <div v-if="isUserSignedIn && isUserMenuOpen" class="absolute right-11 z-10 mt-2 w-64 origin-top-right rounded-md bg-background py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                    <IconComponent src="src/assets/icons/close.svg" class="h-5 w-5 hover:border border-body-bg rounded-full absolute top-2 right-4  cursor-pointer" @click="toggleUserMenu" />
                                    <div class="flex items-center ml-4 mt-2">
                                        <img class="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="avatar">
                                        <div class="flex flex-col">
                                            <div id="user-menu-name" class="block px-4 text-sm w-40 truncate" role="menuitem">{{ fullName }}</div>
                                            <a id="user-menu-email" href="#" class="block px-4 text-xs hover:text-hover w-48 truncate" role="menuitem" @click="toggleUserMenu">{{ currentUser.email }}</a>
                                        </div>
                                    </div>
                                    <div class="flex justify-between px-4 py-2">
                                        <a id="user-menu-profile" href="#" class="text-sm" role="menuitem" tabindex="-1" @click="toggleUserMenu">{{ t('navigation.profile') }}</a>
                                        <a id="user-menu-logout" href="#" class="text-sm" role="menuitem" tabindex="-1" @click="handleSignOut">{{ t('buttons.signOut') }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <button type="button" class="relative inline-flex items-center justify-center p-2 text-color focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-background" aria-controls="mobile-menu" aria-expanded="false" @click="toggleMenu">
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Open main menu</span>
                            <HamburgerComponent :is-menu-open="!isMenuOpen" class="block h-6 w-6" />
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
                    <div v-if="isUserSignedIn" class="flex items-center px-5">
                        <div class="flex-shrink-0">
                            <img class="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </div>
                        <div class="ml-3">
                            <div id="user-menu-name" class="text-lg" role="menuitem">{{ fullName }}</div>
                            <a id="user-menu-email" href="#" class="text-sm hover:text-hover">{{ currentUser.email }}</a>
                        </div>
                    </div>
                    <div v-if="isUserSignedIn" class="px-2 pb-3 pt-2 sm:px-3">
                        <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-color hover:text-hover cursor-pointer">{{ t('navigation.profile') }}</a>
                        <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-color hover:text-hover cursor-pointer" @click="handleSignOut">{{ t('buttons.signOut') }}</a>
                    </div>
                    <div v-else class="px-2 pb-3 pt-2 sm:px-3">
                        <RouterLink id="user-desktop-name" to="/sign-in" class="block rounded-md px-3 py-2 text-base font-medium text-color hover:text-hover cursor-pointer">{{ t('buttons.signIn') }}</RouterLink>
                    </div>
                    <div class="px-2 pb-3 pt-2 sm:px-3">
                        <button :class="{ 'text-hover': locale === 'lt' }" class="w-2 text-center text-sm px-3 cursor-pointer" @click="switchLanguage('lt')">LT</button>
                        <button :class="{ 'text-hover': locale === 'en' }" class="w-2 text-center text-sm px-3 cursor-pointer" @click="switchLanguage('en')">EN</button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
