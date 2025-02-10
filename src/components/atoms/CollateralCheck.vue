<template>
  <div
    class="flex border-orange-100 bg-red-50 p-4 text-red-500 justify-between w-full"
   v-if="getCheck.status">
    <div class="flex items-center gap-2">
      <n-icon size="30"><warning-icon /></n-icon>
      <div>
        Tidak dapat mencetak FPK, terdapat fasilitas Aktif,
        <b>No Kontrak {{ getCheck.data }}</b>
        {{ props.coll_data }}
      </div>
    </div>
    <n-button type="error"  @click="showModal = true">Periksa Fasilitas</n-button>
  </div>
  <n-modal v-model:show="showModal" preset="card" :mask-closable="false"
  class="w-2/3">
    <div><repay-page :embed="true" :atr="getCheck.data"/></div>
  </n-modal>
</template>
<script setup>
import {  onMounted, ref } from "vue";
import RepayPage from "../../views/pages/transaction/repayPage.vue";
import { TextBulletListSquareWarning20Regular as WarningIcon } from "@vicons/fluent";

const showModal=ref(false);
const props = defineProps({
  coll_data: Object,
});

const getCheck = ref([]);
const userToken = localStorage.getItem("token");
const emit = defineEmits();
const checkCollateral = () => {
//   useApi({
//     method: "POST",
//     data: payloadCheck,
//     api: `checkCollateral`,
//     token: userToken,
//   }).then((e) => {
//     getCheck.value = e.data;
//     emit('coll_val',e.data.status);
//   });
};

onMounted(() => checkCollateral());
</script>
