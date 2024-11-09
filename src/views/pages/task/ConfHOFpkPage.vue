<template>
  <fpk-form :view-mode="true">
    <template #addition>
      <n-alert class="mb-2" :show-icon="false">
        <div class="flex items-center">
          <n-text class="text-lg w-full">Konfirmasi</n-text>
          <div class="flex w-full gap-2">
            <n-input type="textarea" autosize placeholder="catatan" v-model:value="keterangan" />
            <n-button type="primary" secondary @click="handleClick('yes')">Setuju</n-button>
            <n-button secondary type="warning" @click="handleClick('revisi')">
              Revisi
            </n-button>
            <n-button secondary type="error" @click="handleClick('no')">Tolak</n-button>
          </div>
        </div>
      </n-alert>
      <!-- <div class="flex gap-2 mb-2">
        <n-alert type="warning" title="kapos" class="w-full">salah no ktp</n-alert>
        <n-alert type="warning" title="ho" class="w-full">
          hello
          <div class="bg-white p-2">asdasd</div>
        </n-alert>
      </div> -->
    </template>
  </fpk-form>
</template>

<script setup>
import { ref } from "vue";
import FpkForm from "./AddFpkPage.vue";
import { useApi } from "../../../helpers/axios";
import { useMessage } from "naive-ui";
import router from "../../../router";
import { useRoute } from "vue-router";

const keterangan = ref();
const loading = ref();
const message = useMessage();
const baseRoute = useRoute();
const idApp = baseRoute.params.idapplication;
let userToken = localStorage.getItem("token");
const handleClick = async (e) => {
  const bodyPost = {
    cr_application_id: idApp,
    flag: e,
    keterangan: keterangan.value,
  };
  console.log(bodyPost);
  loading.value = true;
  const response = await useApi({
    method: "POST",
    api: `application_approval_ho`,
    data: bodyPost,
    token: userToken,
  });
  if (!response.ok) {
    message.error("konfirmasi gagal");
    loading.value = false;
  } else {
    message.success("konfirmasi berhasil");
    loading.value = false;
    router.push({ name: 'approval' });
  }
};
</script>
