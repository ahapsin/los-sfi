<template>
  <div class="flex w-full">
    <img :src="apphero" alt="logo_company" class="">
  </div>
</template>
<script setup>
const apphero = import.meta.env.VITE_APP_HERO;
</script>