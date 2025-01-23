<template>
  <n-card title="Laporan Keuangan Berbasis Harian (LKBH)" :segmented="{
    content: true,
    footer: 'soft',
  }">
    <TabArusKas :data="dataArusKas" :columns="columns" :load="loadData"
                @filter-form="handleRange"/>
  </n-card>
</template>

<script setup>
import TabArusKas from "./TabArusKas.vue";
import {h, ref} from "vue";
import {useApi} from "../../../helpers/axios.js";
import {
  useMessage,
} from "naive-ui";



const dataArusKas = ref([]);

const filterJenis = ref([
  {
    label: 'PENCAIRAN',
    value: 'PENCAIRAN'
  },
  {
    label: 'TUNGGAKAN_POKOK',
    value: 'TUNGGAKAN_POKOK'
  },
  {
    label: 'TUNGGAKAN_BUNGA',
    value: 'TUNGGAKAN_BUNGA'
  },
  {
    label: 'BAYAR_POKOK',
    value: 'BAYAR_POKOK'
  },
  {
    label: 'BAYAR_BUNGA',
    value: 'BAYAR_BUNGA'
  },
  {
    label: 'BAYAR_LAINNYA',
    value: 'BAYAR_LAINNYA'
  },
]);
const columns = [
  {
    title: "Tanggal",
    key: "ENTRY_DATE",
    sorter: "default",
  },
  {
    title: "Metode Bayar",
    key: "PAYMENT_METHOD",
    sorter: "default",
    filterOptions: [
      {
        label: 'CASH',
        value: 'cash'
      },
      {
        label: 'TRANSFER',
        value: 'transfer'
      }
    ],
    filter(value, row) {
      return !!~row.PAYMENT_METHOD.indexOf(value);
    }
  },
  {
    title: "Pelanggan (Alias)",
    key: "PELANGGAN",
    sorter: "default",
  },
  {
    title: "Jenis",
    key: "JENIS",
    sorter: "default",
    filterOptions: filterJenis.value,
    filter(value, row) {
      return !!~row.JENIS.indexOf(value);
    }
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

</script>