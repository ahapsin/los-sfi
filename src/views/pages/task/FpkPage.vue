<template>
  <div class="pt-4" id="drawer-target">
    <n-space vertical>
      <n-card :title="`Tabel ${$route.name}`">
        <template #header-extra>
          <n-space>
            <n-popover trigger="click" placement="bottom-end">
              <template #trigger>
                <n-button>
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
            <!-- <n-button>
                            <template #icon>
                                <n-icon>
                                    <download-icon />
                                </n-icon>
                            </template>
                            download
                        </n-button> -->
            <n-button @click="handleNavCalc">
              <template #icon>
                <n-icon>
                  <calc-icon />
                </n-icon>
              </template>
            </n-button>
            <n-button @click="handleNavFile">
              <template #icon>
                <n-icon>
                  <file-icon />
                </n-icon>
              </template>
            </n-button>
            <!-- <n-button type="primary" @click="handleAdd">
                            <template #icon>
                                <n-icon>
                                    <add-icon />
                                </n-icon>
                            </template>
                            tambah
                        </n-button> -->
          </n-space>
        </template>
        <n-space vertical :size="12" class="pt-4">
          <n-data-table
            size="small"
            triped
            :scroll-x="1000"
            :columns="columns"
            :data="showData"
            :pagination="pagination"
            :loading="loadData"
          />
        </n-space>
      </n-card>
    </n-space>
    <!-- <n-space>
            online at: {{ fingerprint }}
        </n-space> -->
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
        <n-button @click="handleSelesai" secondary type="success">Selesai</n-button>
      </div>
    </n-card>
  </n-modal>
</template>
<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { useApi } from "../../../helpers/axios";
import { lyla } from "@lylajs/web";
import router from "../../../router";
import {
  useDialog,
  useMessage,
  NIcon,
  NTag,
  NButton,
  NBadge,
  NAvatar,
} from "naive-ui";
import { jsPDF } from "jspdf";
import { useNetwork } from "@vueuse/core";
const { onlineAt } = useNetwork();
import { sha256, sha224 } from "js-sha256";
import { useSearch } from "../../../helpers/searchObject";
import {
  AddCircleOutlineRound as AddIcon,
  SearchOutlined as SearchIcon,
  FileDownloadOutlined as DownloadIcon,
  CalculateOutlined as CalcIcon,
  FilePresentOutlined as FileIcon,
  ImageFilled as UploadIcon,
  DriveFolderUploadRound as FileUpload,
} from "@vicons/material";
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  MoreVertRound as MoreIcon,
  ListAltOutlined as DetailIcon,
} from "@vicons/material";

const iconfile = defineComponent(() => FileIcon);
const message = useMessage();
const dialog = useDialog();
const pk = ref(null);
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
  console.log('selesai');
  router.replace({
    name: "Pengajuan Kredit",
  });
   showModal.value = false;
};

const columns = [
  {
    title: "Tanggal",
    key: "visit_date",
    width: 110,
    render(row) {
      return h("div", row.visit_date);
    },
  },
  {
    title: "Order",
    key: "order_number",
    width: 180,
  },
  {
    title: "Nama",
    key: "nama_debitur",
    width: 180,
  },
  {
    title: "Plafond",
    width: 180,
    key: "plafond",
    render(row) {
      return h("div", format(row.plafond));
    },
  },
  {
    title: "Status",
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
            onClick: (e) => {
              handlePrePrint(row);

              //showModal.value = true;
              // handlePrint(row)
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
            secondary: true,
            onClick: (e) => {
              selectedData.value = row;
              showModal.value = true;
              // console.log(row);
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
          type: typeAction(row.status),
          onClick: (e) => {
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

const activeRef = ref(false);
const placementRef = ref("right");
const activate = (place) => {
  activeRef.value = true;
  placementRef.value = place;
};

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
  let status = e.at(0);
  // if (status === "1") {
  //     return "menunggu PFK";
  // } else if (status === "2") {
  //     return "pembuatan PFK";
  // }
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
const handleSelect = (e) => console.log(e);
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
const handlePrint = (evt) => {
  generatePdf();
};

const handlePrePrint = (row) => {
  router.replace({ name: "pre print pk", params: { idapplication: row.id } });
};

function generatePdf() {
  console.log("generate pdf");
  var doc = new jsPDF("p", "pt", "legal");
  const margins = {
    top: 80,
    bottom: 60,
    left: 40,
    width: 522,
  };

  doc.html(pk.value, {
    callback: function (doc) {
      doc.output("dataurlnewwindow");
      // doc.save();
    },
    x: 10,
    y: 10,
  });

  // doc.save('test.pdf');
}
const handleAdd = () => {
  router.push("/task/new-survey");
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

const refAdmin = async () => {
  const response = await useApi({
    method: "post",
    api: "kunjungan_admin",
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.replace("/");
  } else {
    dataTable.value = response.data.response;
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
    label: "Edit",
    key: "edit",
    icon: renderIcon(EditIcon),
  },
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
function generateBrowserFingerprint() {
  let fingerprint = [];

  // User agent string
  fingerprint.push(navigator.userAgent);

  // Language
  fingerprint.push(navigator.language || navigator.userLanguage);
  // Screen resolution
  fingerprint.push(screen.width + "x" + screen.height);
  // Timezone offset
  fingerprint.push(new Date().getTimezoneOffset());
  // Generate a hash of the fingerprint components
  let fingerprintString = fingerprint.join("###");
  let hash = sha256(fingerprintString); // You would need a SHA-256 function here
  return hash;
}
const fingerprint = generateBrowserFingerprint();
onMounted(() => getData());
const showData = computed(() => {
  return useSearch(dataTable.value, searchBox.value);
  // return filterIt(dataTable.value, searchBox.value);
});

const handleNavCalc = () => {
  router.replace({ name: "penerimaan uang" });
};
const handleNavFile = () => {
  router.replace({ name: "serah jaminan" });
};

const handleImagePost = ({
  idApp,
  file,
  data,
  onError,
  onFinish,
  onProgress,
}) => {
  // let idApp = pageData.value.order.cr_prospect_id;
  const idSurvey = selectedData.value.id;
  const form = new FormData();
  form.append("image", file.file);
  form.append("type", data.type);
  //   console.log(pageData.value);
  form.append("cr_prospect_id", idSurvey);
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  //   console.log(form);
  lyla
    .post("https://api.kspdjaya.id/image_upload_prospect", {
      headers,
      body: form,
      onUploadProgress: ({ percent }) => {
        onProgress({ percent: Math.ceil(percent) });
      },
    })
    .then(({ json }) => {
      message.success("upload image berhasil");
      onFinish();
    })
    .catch((error) => {
      message.error("upload image gagal !");
      onError();
    });
};
</script>
