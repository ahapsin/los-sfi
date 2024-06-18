<template>
  <n-config-provider :theme="kspTheme" :theme-overrides="themeOverrides">

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
// import { darkTheme } from 'naive-ui'
const themeOverrides = {
  common: {
    // primaryColor: '#FF0000',
    // primaryColorHover: "#4deee4",
    borderRadius: "10px"
  },
}
</script>