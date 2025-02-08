<template>
  <div>
    <n-space vertical>
      <n-card :title="`Laporan data Jaminan`">

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
                      <search-icon />
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
              <n-button type="success" secondary>
                <template #icon>
                  <n-icon>
                    <download-icon />
                  </n-icon>
                </template>
                Download
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
            size="small"
            :columns="columns"
            :data="showData"
            :pagination="pagination"
          />
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>
  <script setup>
import { ref, onMounted, h,computed} from "vue";
import { useApi } from "../../../helpers/axios";
import { useSearch } from "../../../helpers/searchObject";
import router from "../../../router";
import {
  useDialog,
  useMessage,
  NDropdown,
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
const message = useMessage();
const dialog = useDialog();
const dataTable = ref([]);
const searchBox = ref();
const columns = [
  {
    title: "No Pelanggan",
    key: "CUST_CODE",
    sorter: "default",
  },
  {
    title: "Nama",
    key: "NAME",
    sorter: "default",
  },
  {
    title: "Tanggal Lahir",
    key: "BIRTHDATE",
    sorter: "default",
  },
  {
    title: "Nama Ibu Kandung",
    sorter: "default",
    key: "MOTHER_NAME",
  },
  {
    title: "",
    align: "right",
    key: "more",
    render(row, index) {
      return h(
        NDropdown,
        {
          options: options,
          size: "small",
          onSelect: (e) => {
            if (e === "hapus") {
              handleConfirm(row, index);
            }
            if (e === "detail") {
              handleDetail(row);
            }
            if (e === "edit") {
              handleUpdate(row);
            }
          },
        },
        {
          default: h(
            NButton,
            {
              size: "small",
            },
            { default: () => "Action" }
          ),
        }
      );
    },
  },
];

const getData = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "collateral",
    token: userToken,
  });
  if (!response.ok) {
    message.error('ERROR API');
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
onMounted(() => getData());
const showData = computed(() => {
  return useSearch(dataTable.value, searchBox.value);
});
</script>
