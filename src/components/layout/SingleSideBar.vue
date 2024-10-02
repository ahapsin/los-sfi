<template>
  <n-layout class="h-screen">
    <n-layout-header style="height: 64px" bordered>
      <n-page-header
        class="sticky bg-white border-b top-0 z-50 backdrop-blur p-2"
      >
        <template #title>
          <n-space align="center">
            <n-button strong secondary circle @click="collapse = !collapse">
              <template #icon>
                <n-icon v-if="collapse <= 620"><burger-icon /></n-icon>
                <n-icon v-else><close-icon /></n-icon>
              </template>
            </n-button>
            <img
              class="h-10 md:h-10"
              src="../../assets/logo.png"
              alt="logo_company"
            />
            KSPDJAYA
          </n-space>
          <span class="hidden md:flex capitalize"></span>
        </template>
        <template #extra>
          <div class="flex items-center">
            <n-badge :value="1" :max="15" :offset="offset">
              <n-button strong circle quaternary @click="collapse = !collapse">
                <template #icon>
                  <n-icon><alert-icon /></n-icon>
                </template>
              </n-button>
            </n-badge>
            <account-avatar />
          </div>
        </template>
      </n-page-header>
    </n-layout-header>
    <n-layout position="absolute" style="top: 70px" has-sider>
      <n-layout-sider
        :width="180"
        :collapsed-width="0"
        :show-collapsed-content="false"
        :collapsed="collapse "
        content-style="padding: 10px;"
        bordered
      >
        <SideMenu />
      </n-layout-sider>
      <n-layout class="p-2 bg-sc-50" :native-scrollbar="false">
        <RouterView />
      </n-layout>
    </n-layout>
  </n-layout>
  <n-drawer v-model:show="active" placement="left">
    <n-drawer-content>
      <logo-header />
      <side-menu />
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
  NotificationsOutline as AlertIcon,
  Close as CloseIcon,
  ReorderTwo as BurgerIcon,
} from "@vicons/ionicons5";
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();
const active = ref(false);
const collapse = ref(false);
const activate = () => {
  active.value = true;
};
</script>
<style scoped>
.sidebar {
  @apply p-2 bg-white md:flex flex-col justify-between border-r hidden;
}
</style>