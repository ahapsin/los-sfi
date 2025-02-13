<template>
    <div class="flex">
        <img :src="apphero" alt="logo_company" class="w-full h-full">
    </div>
</template>
<script setup>
const apphero = import.meta.env.VITE_APP_HERO;
</script>