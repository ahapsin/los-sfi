<template>
  <n-space>
    <n-button @click="handleStart"> start </n-button>
    <n-button :disabled="disabled" @click="handleFinish"> finish </n-button>
    <n-button @click="handleError"> error </n-button>
  </n-space>
</template>

<script setup>
import { ref } from "vue";
import { useLoadingBar } from "naive-ui";

const loadingBar = useLoadingBar();
const disabledRef = ref(true);

const handleStart = () => {
  loadingBar.start();
  disabledRef.value = false;
};
</script>