<template>
  <div
    class="flex border-orange-100 bg-red-50 p-4 text-red-500 justify-between w-full"
    v-show="getCheck.status == 'A'"
  >
    <div class="flex items-center gap-2">
      <n-icon size="30"><warning-icon /></n-icon>
      <div>
        Tidak dapat mencetak FPK, terdapat fasilitas Aktif,
        <b>No Kontrak {{ getCheck.loan_number }}</b>
      </div>
    </div>
    <n-button type="error"  @click="showModal = true">Periksa Fasilitas</n-button>
  </div>
  <n-modal v-model:show="showModal" preset="card" :mask-closable="false"
  class="w-2/3">
    <div><repay-page :embed="true" :atr="getCheck.loan_number"/></div>
  </n-modal>
</template>
<script setup>
import { onMounted, ref } from "vue";
import RepayPage from "../../views/pages/transaction/repayPage.vue";
import { useApi } from "../../helpers/axios";
import router from "../../router";
import { TextBulletListSquareWarning20Regular as WarningIcon } from "@vicons/fluent";

const showModal=ref(false);
const props = defineProps({
  coll_no: String,
});
const getCheck = ref([]);
const userToken = localStorage.getItem("token");
const checkCollateral = () => {
  const bodySend = {
    no_bpkb: "U00085802",
  };
  // // console.log(bodySend);
  // e.preventDefault(evt);
  useApi({
    method: "POST",
    data: bodySend,
    api: `checkCollateral`,
    token: userToken,
  }).then((e) => {
    getCheck.value = e.data;
  });
};

onMounted(() => checkCollateral());
</script>