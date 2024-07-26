<template>
        <div class="flex h-screen">
                <div class="sidebar w-1/5 ">
                        <div>
                                <LogoHeader />
                                <SideMenu />
                        </div>
                </div>
                <div class="w-full overflow-auto content bg-sc-50">
                        <n-page-header class="sticky top-0 z-50 bg-sc-50/80 backdrop-blur border-b p-2">
                                <template #title>
                                        <n-space align="center" class="md:!hidden">
                                                <n-button strong circle @click="activate('left')">
                                                        <template #icon>
                                                                <n-icon><menu-icon /></n-icon>
                                                        </template>
                                                </n-button>
                                                <img class="h-14 md:h-16 " src="../../assets/logo.png"
                                                        alt="logo_company">
                                                KSPDJAYA
                                        </n-space>
                                        <span class="hidden md:flex capitalize">{{ $route.name }}</span>
                                </template>
                                <template #extra>
                                        <account-avatar />
                                </template>
                        </n-page-header>
                        <div class="p-4">
                                <RouterView />
                        </div>
                </div>
        </div>
        <n-drawer v-model:show="active" placement="left">
                <n-drawer-content>
                        <logo-header />
                        <side-menu />
                </n-drawer-content>
        </n-drawer>
</template>
<script setup>
import { MenuFilled as MenuIcon } from "@vicons/material";
import router from '../../router';
const active = ref(false);
const activate = () => {
        active.value = true;
};
const handleBack = () => router.go(-1);
</script>
<style scoped>
.sidebar {
        @apply p-2 bg-white md:flex flex-col justify-between border-r hidden;
}
</style>