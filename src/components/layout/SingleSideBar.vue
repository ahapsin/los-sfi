<template>
        <div class="flex h-screen">
                <div class="sidebar w-1/5 ">
                        <div>
                                <LogoHeader />
                                <SideMenu />
                        </div>
                        <AccountButton />
                </div>
                <div class="w-full overflow-auto content bg-sc-50">
                        <n-page-header @back="handleBack" :subtitle="`halaman ${$route.name}`"
                                class="sticky top-0 z-50 bg-sc-50/80 backdrop-blur border-b p-2">
                                <template #title>
                                        {{ $route.name }}
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
</template>
<script setup>
import router from '../../router';
const handleBack = () => router.go(-1);
</script>
<style scoped>
.sidebar {
        @apply p-2 bg-white md:flex flex-col justify-between border-r hidden;
}
</style>