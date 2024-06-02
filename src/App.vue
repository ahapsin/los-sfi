<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>
<script setup>
import { NConfigProvider } from 'naive-ui'
const themeOverrides = {
}
</script>