<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <RouterView />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<script setup>
import { NConfigProvider } from 'naive-ui'
const themeOverrides = {
}
</script>