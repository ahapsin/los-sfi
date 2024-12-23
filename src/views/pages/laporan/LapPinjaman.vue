<template>
  <div>
    <n-space vertical>
      <n-card :title="`Laporan Keuangan`">
        <n-tabs type="card" animated @before-leave="handleBeforeLeave">
<!--          <n-tab-pane name="pinjaman" tab="PINJAMAN"> Informasi Pinjaman</n-tab-pane>-->
<!--          <n-tab-pane name="pembayaran" tab="PEMBAYARAN">-->
<!--            Informasi Pembayaran-->
<!--          </n-tab-pane>-->
<!--          <n-tab-pane name="jaminan" tab="JAMINAN"> Informasi Jaminan</n-tab-pane>-->
<!--          <n-tab-pane name="tunggakan" tab="TUNGGAKAN"> Informasi Tunggakan</n-tab-pane>-->
          {{handleRange}}
          <n-tab-pane name="arus kas" tab="ARUS KAS">
            <TabArusKas :data="dataArusKas" :columns="columns" :load="loadData" :page-size="10" :range="handleRange"/>
          </n-tab-pane>
        </n-tabs>
        <template #header-extra>
          <n-space class="!gap-1">
            <div class="me-1 flex gap-2">
              <n-date-picker
                  v-model:value="timestamp"
                  type="month"
                  :default-value="Date.now()"
                  format="y MMM"
                  month-format="MMM"
                  clearable
              />
              <n-popover trigger="click" placement="bottom-end">
                <template #trigger>
                  <n-button circle>
                    <n-icon>
                      <search-icon/>
                    </n-icon>
                  </n-button>
                </template>
                <n-input
                    autofocus="true"
                    clearable
                    placeholder="cari disini.."
                    v-model:value="searchBox"
                />
              </n-popover>
            </div>
            <div>
              <n-button circle type="success" secondary>
                <template #icon>
                  <n-icon>
                    <download-icon/>
                  </n-icon>
                </template>
              </n-button>
            </div>
            <div class="md:hidden">
              <n-button type="primary" @click="handleAdd">
                <template #icon>
                  <n-icon>
                    <add-icon/>
                  </n-icon>
                </template>
              </n-button>
            </div>
          </n-space>
        </template>
      </n-card>
    </n-space>
  </div>
</template>
<script setup>
import {ref, onMounted, h, computed} from "vue";
import {useApi} from "../../../helpers/axios";
import {useSearch} from "../../../helpers/searchObject";
import router from "../../../router";
import {
  useDialog,
  useMessage,
  NIcon,
  NButton,
} from "naive-ui";
import {
  AddCircleOutlineRound as AddIcon,
  SearchOutlined as SearchIcon,
  FileDownloadOutlined as DownloadIcon,
} from "@vicons/material";
import {
  DeleteOutlined as DeleteIcon,
  ListAltOutlined as DetailIcon,
} from "@vicons/material";
import TabArusKas from "./TabArusKas.vue";

const handleRange = ref();
const message = useMessage();
const dialog = useDialog();
const dataTable = ref([]);
const dataArusKas = ref([]);
const searchBox = ref();
const columns = [
  {
    title: "Tanggal",
    key: "ENTRY_DATE",
    sorter: "default",
  },
  {
    title: "Type",
    key: "TYPE",
    sorter: "default",
    defaultFilter: ['TES', 'TEST'],
    filterOptions: [
      {
        label: 'CASH-IN',
        value: 'CASH-IN'
      },
      {
        label: 'CASH-OUT',
        value: 'CASH-OUT'
      }
    ],
    filter(value, row) {
      return !!~row.TYPE.indexOf(value);
    }
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
      return h("div", row.ORIGINAL_AMOUNT.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
  },
];
const loadData = ref(false);

const handleBeforeLeave = async (t) => {
  switch (t) {
    case "arus kas":
      await getArusKas();
      return true;
    default:
      return true;
  }
}

const getArusKas = async () => {
  message.loading('memuat data arus kas');
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "POST",
    api: "arus_kas",
    data:{
      dari : "2024-12-16",
      sampai : "2024-12-16"
    },
    token: userToken,
  });
  if (!response.ok) {
    message.error('ERROR API');
  } else {
    loadData.value = false;
    dataArusKas.value = response.data;
  }
}
const handleConfirm = (row, index) => {
  dialog.warning({
    title: "Confirm",
    content: "Apakah anda yakin ingin menghapus data ?",
    positiveText: "Ya",
    negativeText: "Batal",
    onPositiveClick: async () => {
      let userToken = localStorage.getItem("token");
      const response = await useApi({
        method: "DELETE",
        api: `cabang/${row.id}`,
        token: userToken,
      });
      if (!response.ok) {
        message.error("api transaction error");
      } else {
        dataTable.value.splice(index, 1);
        message.success("Data berhasil dihapus");
      }
    },
    onNegativeClick: () => {
      message.error("Batal hapus data !");
    },
  });
};
const handleDetail = (evt) => {
  router.push(`/master/branch-action/${evt.id}/detail`);
};
const handleUpdate = (evt) => {
  router.push(`/master/branch-action/${evt.id}`);
};
const handleAdd = () => {
  router.push("/master/branch-action");
};
const getData = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "customer",
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.push("/");
  } else {
    dataTable.value = response.data;
  }
};
const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};
const options = [
  {
    label: "Hapus",
    key: "hapus",
    icon: renderIcon(DeleteIcon),
  },
  {
    label: "Detail",
    key: "detail",
    icon: renderIcon(DetailIcon),
  },
];
const pagination = {
  pageSize: 10,
};
onMounted(() => getArusKas());
const showData = computed(() => {
  return useSearch(dataTable.value, searchBox.value);
});
</script>