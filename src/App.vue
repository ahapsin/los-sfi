<template>
 <div id="app">
    <LoadingScreen class="absolute" :isLoading="isLoading" />
    <main v-if="!isLoading">
      <n-config-provider :theme-overrides="themeOverrides">
        <n-message-provider>
          <n-dialog-provider>
            <n-loading-bar-provider>
              <RouterView />
            </n-loading-bar-provider>
          </n-dialog-provider>
        </n-message-provider>
      </n-config-provider>
    </main>
  </div>
</template>
<script setup>
import { ref,onMounted } from "vue";
import LoadingScreen from "../src/components/organism/LoadingScreen.vue";

const themeOverrides = {
  common: {
    // primaryColor: '#213B94',
    // primaryColorHover: "#213B94",
    borderRadius: "20px"
  },
}
const isLoading = ref(true);
onMounted(() => {
  setTimeout(()=>isLoading.value = false,1000);
});
</script>
