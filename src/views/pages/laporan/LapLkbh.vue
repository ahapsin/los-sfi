<template>
  <n-card title="Laporan Keuangan Berbasis Harian">
    <TabArusKas :data="dataArusKas" :columns="columns" :load="loadData" :page-size="10"
                @filter-form="handleRange"/>
  </n-card>
</template>

<script setup>
import TabArusKas from "./TabArusKas.vue";
import {h, ref, onMounted} from "vue";
import {useApi} from "../../../helpers/axios.js";
import {
  useMessage,
} from "naive-ui";

const dataArusKas = ref([]);
const columns = [
  {
    title: "Tanggal",
    key: "ENTRY_DATE",
    sorter: "default",
  },
  {
    title: "Metode Bayar",
    key: "metode",
    sorter: "default",
    filterOptions: [
      {
        label: 'CASH',
        value: 'CASH-IN'
      },
      {
        label: 'TRANSFER',
        value: 'CASH-OUT'
      }
    ],
    filter(value, row) {
      return !!~row.TYPE.indexOf(value);
    }
  },
  {
    title: "Pelanggan",
    key: "ENTRY_DATE",
    sorter: "default",
  },
  {
    title: "Jenis",
    key: "JENIS",
    sorter: "default",
  },
  {
    title: "Keterangan",
    key: "JENIS",
    sorter: "default",
  },
  {
    title: "Cabang",
    key: "BRANCH",
    sorter: "default",
  },
  {
    title: "Jumlah",
    align: "right",
    key: "ORIGINAL_AMOUNT",
    sorter: "default",
    render(row) {
      return h("div", row.ORIGINAL_AMOUNT.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    }
  },
];
const message = useMessage();
const loadData = ref(false);
const getArusKas = async (e) => {
  message.loading('memuat data LKBH');
  loadData.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "POST",
    api: "arus_kas",
    data: e,
    token: userToken,
  });
  if (!response.ok) {
    message.error('ERROR API');
  } else {
    loadData.value = false;
    dataArusKas.value = response.data;
  }
}

const handleRange = (value) => {
  getArusKas(value);
}

onMounted(() => {
  getArusKas();
})
</script>