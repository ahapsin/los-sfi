<template>
  <div id="drawer-target">
    <n-space vertical>
      <n-card
        :title="`Tabel ${$route.name}`"
        :segmented="{
          content: true,
          footer: 'soft',
        }"
      >
        <template #header-extra>
          <n-space>
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
            <n-button type="success" secondary circle @click="downloadCsv">
              <template #icon>
                <n-icon>
                  <download-file />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </template>
        <n-space vertical :size="12" class="pt-4">
          <n-data-table
            size="small"
            ref="tableRef"
            triped
            :scroll-x="1200"
            :columns="columns"
            :data="showData"
            :pagination="pagination"
            :loading="loadData"
          />
        </n-space>
      </n-card>
    </n-space>
  </div>
  <n-modal
    class="w-1/2"
    title="Upload Berkas Pencairan"
    v-model:show="showModal"
    :mask-closable="false"
  >
    <n-card :bordered="false" aria-modal="true">
      <n-grid :cols="2">
        <n-gi>
          <div class="flex">
            <label class="w-24">No Order</label
            ><span>
              <n-text strong> {{ selectedData.order_number }}</n-text></span
            >
          </div>
          <div class="flex">
            <label class="w-24">Nama </label
            ><span>
              <n-text strong> {{ selectedData.nama_debitur }}</n-text></span
            >
          </div>
          <div class="flex">
            <label class="w-24">Plafond</label
            ><span>
              <n-text strong>
                {{ selectedData.plafond.toLocaleString("US") }}</n-text
              ></span
            >
          </div>
        </n-gi>
        <n-gi>
          <div class="flex">
            <label class="w-24">Alamat</label
            ><span>
              <n-text strong> {{ selectedData.alamat }}</n-text></span
            >
          </div>
          <div class="flex">
            <label class="w-24">No Hp</label
            ><span>
              <n-text strong> {{ selectedData.hp }}</n-text></span
            >
          </div>
        </n-gi>
      </n-grid>
      <n-divider />
      <n-upload
        list-type="image"
        multiple
        :data="{ type: 'berkas pencairan' }"
        :custom-request="handleImagePost"
        :max="5"
      >
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
        <div
          v-for="attachment in selectedData.attachment"
          :key="attachment"
          class="bg-slate-50 !p-0"
        >
          <n-space>
            <n-tooltip placement="top" trigger="hover">
              <template #trigger>
                <n-image
                  class="w-20 h-20 border-b border-2 rounded-md"
                  :src="attachment.PATH"
                >
                </n-image>
              </template>
              <span class="uppercase">{{ attachment.TYPE }}</span>
            </n-tooltip>
          </n-space>
        </div>
      </n-space>
      <div class="pt-4 flex justify-end">
        <n-button @click="handleSelesai" secondary type="success" round
          >Selesai</n-button
        >
      </div>
    </n-card>
  </n-modal>
</template>
<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { useApi } from "../../../helpers/axios";
import { lyla } from "@lylajs/web";
import router from "../../../router";
import { useMessage, NIcon, NTag, NButton } from "naive-ui";
import { useNetwork } from "@vueuse/core";
const { onlineAt } = useNetwork();
import { useSearch } from "../../../helpers/searchObject";
import {
  SearchOutlined as SearchIcon,
  ImageFilled as UploadIcon,
  FileDownloadOutlined as DownloadFile,
  DriveFolderUploadRound as FileUpload,
} from "@vicons/material";
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
const userToken = localStorage.getItem("token");
const handleSelesai = () => {
  console.log("selesai");
  router.replace({
    name: "Pengajuan Kredit",
  });
  showModal.value = false;
};
const columns = [
  {
    title: "Tanggal",
    sorter: "default",
    key: "visit_date",
    width: 110,
    render(row) {
      return h("div", row.visit_date);
    },
  },
  {
    title: "Order",
    sorter: "default",
    key: "order_number",
    width: 180,
  },
  {
    title: "Nama",
    sorter: "default",
    key: "nama_debitur",
    width: 180,
  },
  {
    title: "Plafond",
    sorter: "default",
    width: 180,
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
          bordered: false,
          type: statusTag(row.status),
        },
        { default: () => statusLabel(row.status) }
      );
    },
  },
  {
    width: 150,
    key: "status",
    render(row) {
      let status = row.status.at(0);
      if (row.flag == 0) {
        var cetak = "CETAK";
        var type = "primary";
      } else {
        var cetak = "CETAK ULANG";
        var type = "warning";
      }
      if (status === "6") {
        return h(
          NButton,
          {
            secondary: true,
            type: type,
            round: true,
            onClick: () => {
              handlePrePrint(row);
            },
          },
          {
            default: `${cetak} PK`,
          }
        );
      }
    },
  },
  {
    key: "status",
    render(row) {
      if (row.flag != 0) {
        const iconUpload = h(NIcon, null, {
          default: () => h(UploadIcon),
        });
        let typeUpload;
        let classType;
        if (row.attachment.length <= 0) {
          classType = "animate-bounce";
          typeUpload = "error";
        } else {
          classType = "animate-none";
          typeUpload = "success";
        }
        return h(
          NButton,
          {
            class: classType,
            type: typeUpload,
            circle: true,
            secondary: true,
            onClick: () => {
              selectedData.value = row;
              showModal.value = true;
            },
          },
          {
            default: iconUpload,
          }
        );
      }
    },
  },
  {
    title: "Action",
    align: "right",
    key: "more",
    render(row) {
      return h(
        NButton,
        {
          secondary: true,
          round: true,
          type: typeAction(row.status),
          onClick: () => {
            handleAction(row.status, row);
          },
        },
        {
          default: () => actionLabel(row.status),
        }
      );
    },
  },
];
const statusTag = (e) => {
  let status = e.at(0);
  if (status === "1") {
    return "warning";
  } else if (status === "2") {
    return "info";
  }
  return "warning";
};
const statusLabel = (e) => {
  return e.substring(2);
};
const typeAction = (e) => {
  let status = e.at(0);
  if (status === "1") {
    return "warning";
  } else if (status === "2") {
    return "info";
  } else {
    return "success";
  }
  return "info";
};
const actionLabel = (e) => {
  let status = e.at(0);
  if (status === "1") {
    return "Buat PFK";
  } else if (status === "2") {
    return "Update PFK";
  }
  return "lihat FPK";
};
const format = (e) => {
  const toNum = parseInt(e);
  return toNum.toLocaleString("en-US");
};
const handleAction = (e, data) => {
  let status = e.at(0);
  const dynamicBody = {
    cr_prospect_id: data.id,
  };
  if (status === "1") {
    message.create("membuat FPK, silakan tunggu !", { type: loadingRef.type });
    useApi({
      method: "POST",
      data: dynamicBody,
      api: `cr_application_generate`,
      token: userToken,
    }).then((res) => {
      if (res.ok) {
        message.success("FPK berhsil dibuat");
        router.replace({
          name: "Form Pengajuan Kredit",
          params: { idapplication: data.id },
        });
      } else {
        message.error("FPK gagal dibuat!");
      }
    });
  } else if (status === "2") {
    router.replace({
      name: "Form Pengajuan Kredit",
      params: { idapplication: data.id },
    });
  } else {
    router.replace({
      name: "Detail Kredit",
      params: { idapplication: data.id, action: "view" },
    });
  }
};
const handlePrePrint = (row) => {
  router.replace({ name: "pre print pk", params: { idapplication: row.id } });
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
    router.replace("/");
  } else {
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
