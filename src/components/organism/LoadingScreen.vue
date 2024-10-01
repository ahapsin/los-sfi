<template>
  <div :class="{ loader: true, fadeout: !isLoading }" class=" w-full h-full z-50">
    <div class="flex flex-col gap-4 items-center justify-center bg-white h-full">
      <img src="../../assets/logo.png" width="64px" height="64px" class="animate-pulse"/>
      <n-spin size="small" />
    </div>
  </div>
</template>
  <script>
export default {
  name: "LoadingScreen",
  props: ["isLoading"],
};
</script>
  <style scoped>
.fadeout {
  animation: fadeout 1s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
  