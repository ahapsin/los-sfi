<template>
  <div id="drawer-target">
    <n-space vertical>
      <n-card :title="`Tabel ${$route.name}`" :segmented="{
        content: true,
        footer: 'soft',
      }">
        <!-- {{ showData }} -->
        <template #header-extra>
          <n-space>
            <n-popover trigger="click" placement="bottom-end">
              <template #trigger>
                <n-button :circle="width <= 520 ? true : false">
                  <n-icon>
                    <search-icon />
                  </n-icon>
                  <span v-if="width >= 520">Cari</span>
                </n-button>
              </template>
              <n-space vertical>
                <n-input autofocus="true" clearable placeholder="cari disini.." v-model:value="searchBox" />
                <n-date-picker :default-value="[Date.now(), Date.now()]" :update-value-on-close="updateValueOnClose"
                  type="daterange" @update:value="onConfirmDate" />
              </n-space>
            </n-popover>

            <n-button type="success" secondary @click="downloadCsv" :circle="width <= 520 ? true : false">
              <template #icon>
                <n-icon>
                  <download-file />
                </n-icon>
              </template>
              <span v-if="width >= 520">Download</span>
            </n-button>
            <n-dropdown trigger="click" :options="optFilter" @select="handleSelect">
              <n-button>
                <template #icon>
                  <n-icon>
                    <filter-icon />
                  </n-icon>
                </template>
                <div class="flex items-center gap-2">
                  <span>Filter Status</span>
                  <n-tag size="small" type="info" v-if="filterData" @close="handleClose" closable :bordered="false">{{
                    filterData
                  }}</n-tag>
                </div>
              </n-button>
            </n-dropdown>
          </n-space>
        </template>
        <n-space vertical :size="12" class="pt-4">
          <!-- <pre>{{ showData }}</pre> -->
          <n-data-table size="small" ref="tableRef" triped :scroll-x="1000" :columns="columns" :data="showData"
            :pagination="pagination" :loading="loadData" />
        </n-space>
      </n-card>
    </n-space>
  </div>
  <n-modal class="w-1/2" title="Upload Berkas Pencairan" v-model:show="showModal" :mask-closable="false">
    <n-card :bordered="false" aria-modal="true">
      <n-grid :cols="2">
        <n-gi>
          <div class="flex">
            <label class="w-24">No Order</label><span>
              <n-text strong> {{ selectedData.order_number }}</n-text></span>
          </div>
          <div class="flex">
            <label class="w-24">Nama </label><span>
              <n-text strong> {{ selectedData.nama_debitur }}</n-text></span>
          </div>
          <div class="flex">
            <label class="w-24">Plafond</label><span>
              <n-text strong>
                {{ selectedData.plafond.toLocaleString("US") }}</n-text></span>
          </div>
        </n-gi>
        <n-gi>
          <div class="flex">
            <label class="w-24">Alamat</label><span>
              <n-text strong> {{ selectedData.alamat }}</n-text></span>
          </div>
          <div class="flex">
            <label class="w-24">No Hp</label><span>
              <n-text strong> {{ selectedData.hp }}</n-text></span>
          </div>
        </n-gi>
      </n-grid>
      <n-divider />
      <n-upload list-type="image" multiple :data="{ type: 'berkas pencairan' }" :custom-request="handleImagePost"
        :max="5">
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <file-upload />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            Klik atau seret file ke area ini untuk diunggah
          </n-text>
        </n-upload-dragger>
      </n-upload>
      <n-space>
        <div v-for="attachment in selectedData.attachment" :key="attachment" class="bg-slate-50 !p-0">
          <n-space>
            <n-tooltip placement="top" trigger="hover">
              <template #trigger>
                <n-image class="w-20 h-20 border-b border-2 rounded-md" :src="attachment.PATH">
                </n-image>
              </template>
              <span class="uppercase">{{ attachment.TYPE }}</span>
            </n-tooltip>
          </n-space>
        </div>
      </n-space>
      <div class="pt-4 flex justify-end">
        <n-button @click="handleSelesai" secondary type="success" round>Selesai</n-button>
      </div>
    </n-card>
  </n-modal>
</template>
<script setup>
import { ref, reactive, onMounted, h, computed } from "vue";
import { useApi } from "../../../helpers/axios";
import { lyla } from "@lylajs/web";
import router from "../../../router";
import { useMessage, NIcon, NTag, NButton } from "naive-ui";
import { useSearch } from "../../../helpers/searchObject";
import { useLoadingBar } from "naive-ui";
const loadingBar = useLoadingBar();
import {
  SearchOutlined as SearchIcon,
  ImageFilled as UploadIcon,
  FileDownloadOutlined as DownloadFile,
  DriveFolderUploadRound as FileUpload,
  FilterAltOutlined as FilterIcon,
} from "@vicons/material";
import { useWindowSize } from "@vueuse/core";
const message = useMessage();
const tableRef = ref();
const downloadCsv = () =>
  tableRef.value?.downloadCsv({ fileName: "export-data-fpk" });
const showModal = ref(false);
const dataTable = ref([]);
const searchBox = ref();
const selectedData = ref();
const loadData = ref(false);
const loadingRef = reactive({
  type: "loading",
  messagePost: null,
});
const { width } = useWindowSize();
const userToken = localStorage.getItem("token");
const handleSelesai = () => {
  getData();
  showModal.value = false;
};
const columns = [
  {
    title: "Tanggal",
        width: 100,
    sorter: "default",
    key: "visit_date",
    render(row) {
      return h("div", row.visit_date);
    },
  },
  {
    title: "Order",
      width: 100,
    ellipsis: {
      tooltip: true,
    },
    sorter: "default",
    key: "order_number",
  },
  {
    title: "Nama",
      width: 100,
    sorter: "default",
    key: "nama_debitur",
  },
  {
    title: "Plafond",
    align: 'right',
    width:100,
    sorter: "default",
    key: "plafond",
    render(row) {
      return h("div", format(row.plafond));
    },
  },
  {
    title: "Tipe",
    align: 'right',
    width:100,
    sorter: "default",
    key: "jenis_angsuran",
    render(row) {
      return h("div", row.jenis_angsuran);
    },
  },
  {
    title: "Status",
    sorter: "default",
      width: 100,
    key: "status",
    render(row) {
      return h(
        NTag,
        {
          round: true,
          size: "small",
          type: statusTag(row.status_code),
        },
        { default: () => statusLabel(row.status) }
      );
    },
  },
  {
    key: "status",
      width: 100,
    render(row) {
      let status = row.status_code;
      if (status == 'APHO') {
        var cetak = "CETAK";
        var type = "primary";
      } else {
        cetak = "CETAK ULANG";
        type = "warning";
      }
      if (status === "APHO") {
        return h(
          NButton,
          {
            type: type,
            size: "small",
            secondary: true,
            onClick: () => {
              handlePrePrint(row);
            },
          },
          {
            default: () => `${cetak} PK`,
          }
        );
      }
    },
  },
  {
    key: "status",
      width: 100,
    render(row) {
      if (row.flag != 0) {
        const iconUpload = h(NIcon, null, {
          default: () => h(UploadIcon),
        });
        let typeUpload;
        let classType;
        if (row.attachment.length <= 0) {
          classType = "animate-pulse";
          typeUpload = "error";
        } else {
          classType = "animate";
          typeUpload = "success";
        }
        return h(
          NButton,
          {
            class: classType,
            type: typeUpload,
            secondary: true,
            onClick: () => {
              selectedData.value = row;
              showModal.value = true;
            },
          },
          {
            default: () => iconUpload,
          }
        );
      }
    },
  },
  {
    title: "Action",
    align: "right",
      width: 100,
    key: "more",
    render(row) {
      return h(
        NButton,
        {
          secondary: false,

          size: "small",
          type: statusTag(row.status_code),
          onClick: () => {
            handleAction(row.status_code, row);
          },
        },
        {
          default: () => actionLabel(row.status_code),
        }
      );
    },
  },
];
const statusTag = (e) => {

  if (e === "REORKPS") {
    return "error";
  }
  if (e === "CROR") {
    return "warning";
  }
  if (e === "WAKPS") {
    return "info";
  }
  if (e === "APKPS") {
    return "success";
  }
  if (e === "APHO") {
    return "success";
  }
  if (e === "REORHO") {
    return "error";
  }

};
const statusLabel = (e) => {
  return e.toUpperCase();
};
const typeAction = (e) => {
  if (e === "REORKPS") {
    return "error";
  }
  if (e === "CROR") {
    return "warning";
  }
  if (e === "WAKPS") {
    return "info";
  }
};
const actionLabel = (e) => {
  let status = e;
  if (status === "WADM") {
    return "Buat Order";
  }
  if (status === "CROR") {
    return "Update Order";
  }
  if (status === "REORKPS") {
    return "Revisi Order";
  }
  if (status === "REORHO") {
    return "Revisi Order";
  }
  return "lihat Order";
};
const format = (e) => {
  const toNum = parseInt(e);
  return toNum.toLocaleString("en-US");
};
const handleAction = (e, data) => {
  let status = e;
  const userToken = localStorage.getItem("token");
  const dynamicBody = {
    cr_prospect_id: data.id,
  };
  if (status === "WADM") {
    message.create("membuat FPK, silakan tunggu !", { type: loadingRef.type });
    useApi({
      method: "POST",
      data: dynamicBody,
      api: `cr_application_generate`,
      token: userToken,
    }).then((res) => {
      if (res.ok) {
        message.success("FPK berhsil dibuat");
        router.push({
          name: "Form Pengajuan Kredit",
          params: { idapplication: data.id },
        });
      } else {
        message.error("FPK gagal dibuat!");
      }
    });
  } else if (status === "CROR") {
    router.push({
      name: "Form Pengajuan Kredit",
      params: { idapplication: data.id },
    });
  } else if (status === "REORKPS") {
    router.push({
      name: "Form Pengajuan Kredit",
      params: { idapplication: data.id },
    });
  } else if (status === "REORHO") {
    router.push({
      name: "Form Pengajuan Kredit",
      params: { idapplication: data.id },
    });
  }
  else {
    router.push({
      name: "Detail Kredit",
      params: { idapplication: data.id, action: "view" },
    });
  }
};
const handlePrePrint = (row) => {
  router.push({ name: "pre print pk", params: { idapplication: row.order_number } });
};
const getData = async () => {
  loadData.value = true;
  const response = await useApi({
    method: "GET",
    api: "kunjungan_admin",
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
const pagination = {
  pageSize: 10,
};
onMounted(() => getData());


const showData = computed(() => {
  return useSearch(dataTable.value, searchBox.value);
});

const optFilter = [
  {
    label: 'REVISI',
    key: 'revisi'
  },
  {
    label: 'DISETUJUI',
    key: 'disetujui'
  },
  {
    label: 'MENUNGGU',
    key: 'menunggu'
  },
  {
    label: 'DIPROSES',
    key: 'diproses'
  },
]
const filterData = ref();

const handleSelect = (key, opt) => {
  filterData.value = opt.label;
  searchBox.value = key;
}
const handleClose = () => {
  filterData.value = "";
  searchBox.value = "";
}


const handleImagePost = ({ file, data, onError, onFinish, onProgress }) => {
  const idSurvey = selectedData.value.id;
  const form = new FormData();
  form.append("image", file.file);
  form.append("type", data.type);
  form.append("cr_prospect_id", idSurvey);
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  lyla
    .post("https://api.kspdjaya.id/image_upload_prospect", {
      headers,
      body: form,
      onUploadProgress: ({ percent }) => {
        onProgress({ percent: Math.ceil(percent) });
      },
    })
    .then(() => {
      message.success("upload image berhasil");
      onFinish();
    })
    .catch(() => {
      message.error("upload image gagal !");
      onError();
    });
};
</script>
