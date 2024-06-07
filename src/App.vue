<template>
  <n-config-provider :theme-overrides="themeOverrides">

    <n-message-provider>
      <n-dialog-provider>
        <n-loading-bar-provider>
          <RouterView />
        </n-loading-bar-provider>
      </n-dialog-provider>
    </n-message-provider>

  </n-config-provider>
</template>
<script setup>
import { NConfigProvider } from 'naive-ui'
const themeOverrides = {
}
</script>