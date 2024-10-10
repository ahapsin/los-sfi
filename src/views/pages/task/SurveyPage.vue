<template>
  <div class="pt-4">
    <n-space vertical>
      <n-card
  
        title="Data Pelanggan"
        :segmented="{
          content: true,
          footer: 'soft',
        }"
      >
        <template #header-extra>
          <n-space class="!gap-1">
            <div class="me-1">
              <n-popover trigger="click" placement="bottom-end">
                <template #trigger>
                  <n-button circle>
                    <n-icon>
                      <search-icon />
                    </n-icon>
                  </n-button>
                </template>
                <n-space vertical>
                  <n-input
                    autofocus="true"
                    clearable
                    placeholder="cari disini.."
                    v-model:value="searchBox"
                  />
                  <n-date-picker
                    :default-value="[Date.now(), Date.now()]"
                    :update-value-on-close="updateValueOnClose"
                    type="daterange"
                    @update:value="onConfirmDate"
                  />
                </n-space>
              </n-popover>
            </div>
            <div>
              <n-button type="success" secondary circle @click="downloadCsv">
                <template #icon>
                  <n-icon>
                    <download-icon />
                  </n-icon>
                </template>
              </n-button>
            </div>
            <div class="hidden md:flex">
              <n-button type="primary" strong @click="handleAdd">
                <template #icon>
                  <n-icon>
                    <add-icon />
                  </n-icon>
                </template>
                tambah
              </n-button>
            </div>
            <div class="md:hidden">
              <n-button type="primary" @click="handleAdd">
                <template #icon>
                  <n-icon>
                    <add-icon />
                  </n-icon>
                </template>
              </n-button>
            </div>
          </n-space>
        </template>
        <n-space vertical :size="12" class="pt-4">
          <n-data-table
            striped
            ref="tableRef"
            :scroll-x="500"
            size="small"
            :columns="columns"
            :data="showData"
            :pagination="pagination"
            :loading="loadData"
          />
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>
<script setup>
import { ref, onMounted, h,computed } from "vue";
import { useApi } from "../../../helpers/axios";
import { useSearch } from "../../../helpers/searchObject";
import router from "../../../router";
import {
  useDialog,
  useMessage,
  NDropdown,
  NIcon,
  NTag,
  NButton,
} from "naive-ui";
import {
  AddCircleOutlineRound as AddIcon,
  SearchOutlined as SearchIcon,
  FileDownloadOutlined as DownloadIcon,
} from "@vicons/material";
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  ListAltOutlined as DetailIcon,
} from "@vicons/material";
const message = useMessage();
const dialog = useDialog();
const loadData = ref(false);
const dataTable = ref([]);
const tableRef = ref();
const downloadCsv = () =>
  tableRef.value?.downloadCsv({ fileName: "export-data-survey" });
const columns = [
  {
    title: "Tanggal",
    sorter: "default",
    key: "visit_date",
  },
  {
    title: "Nama",
    sorter: "default",
    key: "nama_debitur",
    fixed: "left",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "Plafond",
    sorter: "default",
    key: "plafond",
    render(row) {
      return h("div", format(row.plafond));
    },
  },
  {
    title: "Status",
    sorter: "default",
    key: "status",
    render(row) {
      return h(
        NTag,
        {
          type: statusTag(row.status),
          size: "small",
        },
        { default: () => statusLabel(row.status) }
      );
    },
  },
  {
    title: "",
    align: "right",
    key: "more",
    fixed: "left",
    render(row, index) {
      return h(
        NDropdown,
        {
          options: options(row),
          size: "small",
          onSelect: (e) => {
            if (e === "hapus") {
              handleConfirm(row, index);
            }
            if (e === "detail") {
              handleDetail(row);
            }
            if (e === "edit") {
              handleEdit(row);
            }
          },
        },
        {
          default: h(
            NButton,
            {
              round: true,
              size: "small",
            },
            { default: () => "Action" }
          ),
        }
      );
    },
  },
];
const searchBox = ref();
const statusTag = (e) => {
  let status = e.at(0);
  if (status === "1") {
    return "warning";
  } else if (status === "2") {
    return "info";
  }
  return "info";
};
const statusLabel = (e) => {
  let status = e.at(0);
  if (status === "1") {
    return "menunggu PFK";
  } else if (status === "2") {
    return "pembuatan PFK";
  } else {
    return e.substring(2);
  }
};
const format = (e) => {
  const toNum = parseInt(e);
  return toNum.toLocaleString("en-US");
};
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
        api: `kunjungan/${row.id}`,
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
  router.replace({ name: "Detail Kredit", params: { idapplication: evt.id } });
};
const handleEdit = (evt) => {
  router.replace({ name: "edit survey", params: { idsurvey: evt.id } });
};
const handleAdd = () => {
  router.push("/task/new-survey");
};
const getData = async () => {
  loadData.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "kunjungan",
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.replace("/");
  } else {
    loadData.value = false;
    dataTable.value = response.data.response;
  }
};
onMounted(() => getData());
const showData = computed(() => {
  return useSearch(dataTable.value, searchBox.value);
});
const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};
const options = (e) => {
  let status = e.status.at(0);
  if (status === "1") {
    return [
      {
        label: "Edit",
        key: "edit",
        icon: renderIcon(EditIcon),
      },
      {
        label: "Hapus",
        key: "hapus",
        icon: renderIcon(DeleteIcon),
      },
    ];
  } else {
    return [
      {
        label: "Detail",
        key: "detail",
        icon: renderIcon(DetailIcon),
      },
    ];
  }
};
const pagination = {
  pageSize: 10,
};
</script>
