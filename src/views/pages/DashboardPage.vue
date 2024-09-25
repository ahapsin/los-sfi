<template>
  <SingleSideBar />
</template>
<script setup>
import { onMounted } from "vue";
import router from "../../router";
import { useMessage } from "naive-ui";
import SingleSideBar from "../../components/layout/SingleSideBar.vue";
const message = useMessage();
onMounted(() => {
  if (!localStorage.getItem("token")) {
    router.replace("/");
    message.warning("sesi anda berakhir");
  }
});
</script>
