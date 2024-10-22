<template>
  <n-layout class="h-screen">
    <n-layout-header style="height: 64px" bordered>
      <n-page-header
        class="sticky bg-white border-b top-0 z-50 backdrop-blur p-4"
      >
        <template #title>
          <n-space align="center">
            <n-button
              circle
              quaternary
              @click="sideMenu.sideEffect = !sideMenu.sideEffect"
              color="#424242"
            >
              <template #icon>
                <n-icon v-if="sideMenu.sideEffect"><burger-icon /></n-icon>
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
            <!-- <n-badge :value="1" :max="15" :offset="offset">
              <n-button strong circle quaternary @click="collapse = !collapse">
                <template #icon>
                  <n-icon><alert-icon /></n-icon>
                </template>
              </n-button>
            </n-badge> -->
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
        :collapsed="sideMenu.sideEffect ? true : false"
        content-style="padding: 10px;"
        bordered
      >
        <SideMenu />
      </n-layout-sider>
      <n-layout class="p-2" :native-scrollbar="false">
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
  LayoutSidebarLeftCollapse as CloseIcon,
  LayoutSidebarRightCollapse as BurgerIcon,
} from "@vicons/tabler";
import { useSidebar } from "../../stores/sidebar";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const sideMenu = useSidebar();
const active = ref(false);

const collapse = ref(false);
const ukuran = ref(0);
const widthScreen = () => {
  ukuran.value = width.value;
  if (ukuran.value < 620) {
    sideMenu.sideEffect = true;
    collapse.value = true;
  } else {
    sideMenu.sideEffect = false;
    collapse.value = false;
  }
};
onMounted(() => widthScreen());
</script>

<style scoped>
.sidebar {
  @apply p-2 bg-white md:flex flex-col justify-between border-r hidden;
}
</style>