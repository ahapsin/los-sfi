<template>
  <div>
    <n-space vertical>
      <n-card :title="`Laporan Keuangan`">
        <n-tabs type="card" animated @before-leave="handleBeforeLeave" @update:value="handleUpdateValue">
          <!--          <n-tab-pane name="pinjaman" tab="PINJAMAN"> Informasi Pinjaman</n-tab-pane>-->
          <!--          <n-tab-pane name="pembayaran" tab="PEMBAYARAN">-->
          <!--            Informasi Pembayaran-->
          <!--          </n-tab-pane>-->
          <!--          <n-tab-pane name="jaminan" tab="JAMINAN"> Informasi Jaminan</n-tab-pane>-->
          <!--          <n-tab-pane name="tunggakan" tab="TUNGGAKAN"> Informasi Tunggakan</n-tab-pane>-->

          <n-tab-pane name="inq_pinjaman" tab="INQUERY PINJAMAN">
           <TabInqPinjaman :columns="columnsPinjaman" :data="dataInqPinjaman"/>
          </n-tab-pane>
          <n-tab-pane name="arus_kas" tab="ARUS KAS">
            <TabArusKas :data="dataArusKas" :columns="columns" :load="loadData" :page-size="10"
                        @change-date-range="handleRange"/>
          </n-tab-pane>

        </n-tabs>

      </n-card>
    </n-space>
  </div>
</template>
<script setup>
import {ref, h, computed} from "vue";
import {useApi} from "../../../helpers/axios";
import {useSearch} from "../../../helpers/searchObject";
import router from "../../../router";
import {
  useDialog,
  useMessage,
  NIcon,
} from "naive-ui";
import {
  DeleteOutlined as DeleteIcon,
  ListAltOutlined as DetailIcon,
} from "@vicons/material";
import TabArusKas from "./TabArusKas.vue";
import TabInqPinjaman from "./TabInqPinjaman.vue";

const rangeDate = ref();
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
      return h("div", row.ORIGINAL_AMOUNT.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    }
  },
];
const columnsPinjaman = [
  {
    title: "Nomor Order",
    key: "ORDER_NUMBER",
    sorter: "default",
  }, {
    title: "Nama Debitur",
    key: "customer_name",
    sorter: "default",
  }, {
    title: "Nomor Polisi",
    key: "POLICE_NUMBER",
    sorter: "default",
  }, {
    title: "Tanggal Pencairan",
    key: "ENTRY_DATE",
    sorter: "default",
  },{
    title: "Cabang",
    key: "branch_name",
    sorter: "default",
  },
  {
    title: "Detail",
    key: "ENTRY_DATE",
    sorter: "default",
  },

];
const loadData = ref(false);
const handleRange = (value) => {
  rangeDate.value = value;
  getArusKas(value);
}

const handleBeforeLeave = async (t) => {
  switch (t) {
    case "arus_kas":
      await getArusKas();
      return true;
    case "inq_pinjaman":
      await getInqPinjaman();
      return true;
    default:
      return true;
  }
}

const handleUpdateValue = (value) => {

}

const getArusKas = async (e) => {
  message.loading('memuat data arus kas');
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "POST",
    api: "arus_kas",
    data: {
      dari: e ? e[0] : "",
      sampai: e ? e[1] : "",
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

const dataInqPinjaman = ref();
const getInqPinjaman = async (e) => {
  message.loading('memuat data arus kas');
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "creditReport",
    token: userToken,
  });
  if (!response.ok) {
    message.error('ERROR API');
  } else {
    loadData.value = false;
    dataInqPinjaman.value = response.data;
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

const showData = computed(() => {
  return useSearch(dataTable.value, searchBox.value);
});
</script>