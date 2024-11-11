<template>
    <div class="pt-4">
        <n-space vertical>
            <n-card :title="`Tabel ${$route.name}`" class="bg-white" :segmented="true">
                <template #header-extra>
                    <n-space class="!gap-1">
                        <div class="me-1">
                            <n-popover trigger="click" placement="bottom-end">
                                <template #trigger>
                                    <n-button>
                                        <n-icon>
                                            <search-icon />
                                        </n-icon>
                                        <span v-if="width >= 520">Cari</span>
                                    </n-button>
                                </template>
                                <n-input :autofocus="true" clearable placeholder="cari disini.."
                                    v-model:value="searchBox" />
                            </n-popover>
                        </div>
                        <div class="flex gap-2" v-if="unReadBadge() > 0">
                            <n-badge :value="unReadBadge()" :max="15">
                                <n-button @click="handleUnRead">
                                    Belum diperiksa
                                </n-button>
                            </n-badge>
                            <n-button @click="handleAll" v-if="cekUnread">
                                Semua
                            </n-button>
                        </div>
                    </n-space>
                </template>
                <n-space vertical :size="12" class="pt-4">
                    <n-data-table size="small" :loading="loadData" :columns="columns" :data="showData"
                        :pagination="pagination" ellipsis />
                </n-space>
            </n-card>
        </n-space>
    </div>
</template>
<script setup>
import { ref, onMounted, h, computed } from "vue";
import { useApi } from "../../../helpers/axios";
import { useSearch } from "../../../helpers/searchObject";
import router from "../../../router";
import {
  useDialog,
  useMessage,
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
  MoreVertRound as MoreIcon,
  ListAltOutlined as DetailIcon,
} from "@vicons/material";
import { useLoadingBar } from "naive-ui";
import { useWindowSize } from "@vueuse/core";
import _ from "lodash";
const loadingBar = useLoadingBar();

const message = useMessage();
const dataTable = ref([]);
const searchBox = ref();
const { width } = useWindowSize();
const columns = [
  {
    title: "Cabang",
    key: "cabang",
    sorter: "default",
  },
  {
    title: "AO",
    key: "nama_ao",
    sorter: "default",
  },
  {
    title: "Nama Debitur",
    key: "nama_debitur",
    sorter: "default",
  },
  {
    title: "Plafond",
    key: "plafond",
    sorter: "default",
    render(row) {
      return h("div", format(row.plafond));
    },
  },
  {
    title: "Tenor",
    key: "tenor",
    sorter: "default",
  },
  {
    title: "Status",
    key: "status",
    sorter: "default",
    render(row) {
      return h(
        NTag,
        {
          bordered: false,
          type: statusTag(row.status_code),
          size: "small",
        },
        { default: () => row.status.toUpperCase() }
      );
    },
  },
  {
    title: "",
    align: "right",
    key: "more",
    render(row) {
      return h(
        NButton,
        {
          size: "small",
            type: statusTag(row.status_code),
          onClick: () => {
            handelAction(row);
          },
        },
        { default: ()=>statusHandle(row) }
      );
    },
  },
];

const format = (e) => {
  const toNum = parseInt(e);
  return toNum.toLocaleString("en-US");
};
const statusTag = (e) => {
    if (e === "WAHO") {
        return "warning";
    }
    if (e === "APHO") {
        return "success";
    }
};
const statusHandle = (e) => {
  if (e.status_code === "WAHO") {
    return "Periksa Order";
  }  else {
    return "Lihat Order";
  }
};

const loadData = ref(false);
const getData = async () => {
  loadData.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "fpk_ho",
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.push("/");
  } else {
    loadingBar.finish();
    loadData.value = false;
    dataTable.value = response.data.response;
  }
};

const handelAction = (e) => {
  if (e.status_code == "WAHO") {
    router.push({
      name: "Konfirmasi HO Pengajuan Kredit",
      params: { idapplication: e.id },
    });
  } else {
    router.push({
      name: "Detail Pengajuan Kredit",
      params: { idapplication: e.id },
    });
  }
  // let status = e.at(0);
  // const dynamicBody = {
  //     cr_prospect_id: data.id
  // }
  // if (status === "1") {
  //     message.create('membuat FPK, silakan tunggu !', { type: loadingRef.type });
  //     useApi({
  //         method: 'POST',
  //         data: dynamicBody,
  //         api: `cr_application_generate`,
  //         token: userToken,
  //     }).then((res) => {
  //         if (res.ok) {
  //             message.success('FPK berhsil dibuat');
  //             router.push({ name: 'Form Pengajuan Kredit', params: { idapplication: data.id } });
  //         } else {
  //             message.error('FPK gagal dibuat!')
  //         }
  //     });
  // } else {
  // router.push({ name: 'Form Pengajuan Kredit', params: { idapplication: data.id } });
  // }
};
const pagination = {
  pageSize: 10,
};

onMounted(() => getData());
const cekUnread = ref(false);
const handleUnRead = () => {
    cekUnread.value = true;
    searchBox.value = "menunggu";
}
const handleAll = () => {
    cekUnread.value = false;
    searchBox.value = "";
}
const unReadBadge = () => {
    let count = _.filter(dataTable.value, { 'status_code': 'APKPS' });
    return count.length;
}
const showData = computed(() => {
  return useSearch(dataTable.value, searchBox.value);
  // return filterIt(dataTable.value, searchBox.value);
});
</script>
