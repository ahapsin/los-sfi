<template>
  <n-card title="form isian analisa">
    <template #header-extra>
      <n-tag>Modal Kerja</n-tag>
      <n-tag>Investasi</n-tag>
      <n-tag>Konsumsi</n-tag>
    </template>
    <div class="p-2 group border flex justify-between  items-center rounded-lg">
      <div class="flex gap-2">
        <n-avatar>P</n-avatar>
        <div class="flex flex-col">
          <small>NO DEBITUR</small>
          <strong>NAMA DEBITUR</strong>
        </div>
      </div>

      <div class="flex gap-2">
        <n-button type="primary" secondary @click="modalSt = true">Preview Form</n-button>
        <n-button type="info" @click="modalSt = true">Detail</n-button>
      </div>

    </div>
    <div>
      {{ useAnalisaModalKerja }}
    </div>
    <div>
      <n-select :options="optModalKerja.analisa_kuantitatif"/>
    </div>
  </n-card>

</template>
<script setup>
import _ from "lodash";

const apptitle = import.meta.env.VITE_APP_TITLE;
const applogo = import.meta.env.VITE_APP_LOGO;
import {useAnalisaModalKerja} from "../../../../models/analisa_modal_kerja.js";
import {useOptAnalisaModalKerja} from "../../../../models/opt_analisa_modal_kerja.js";


const optModalKerja = reactive(useAnalisaModalKerja);
const marks = {
  0: '0',
  50: '50',
  100: '100'
}
const keuangan = reactive([{
  title: "Omzet",
  value: null,
  suff: "/bulan"
},
  {
    title: "Margin Keuntungan",
    value: null,
    suff: "%"
  }, {
    title: "Pendapatan lain-lain",
    value: null,
    suff: "/bulan"
  }, {
    title: "Biaya Hidup, pendidikan dll",
    value: null,
    suff: "/bulan"
  }, {
    title: "Biaya Operasional usaha",
    value: null,
    suff: "/bulan"
  },])
const schemaScoring = reactive(useAnalisaModalKerja);
const currentRef = ref(1);
const modalSt = ref(false);
const stStep1 = () => {
  modalSt.value = true;
}

const findMatchParameter = (col, val) => {
  let a = _.findIndex(col, function (o) {
    return o.range_min <= val && o.range_max >= val;
  });
  return a > 0 ? col[a] : col[0];
}
const currentStatus = ref("process");
</script>