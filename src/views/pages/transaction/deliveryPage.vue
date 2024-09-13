<template>
  <div class="pt-4" id="drawer-target">
    <n-space vertical>
      <n-card :title="`Transaksi serah terima jaminan`">
        <template #header-extra>
          <n-space>
            <!-- <n-popover trigger="click" placement="bottom-end">
              <template #trigger>
                <n-button circle>
                  <n-icon>
                    <search-icon />
                  </n-icon>
                </n-button>
              </template>
<n-input autofocus="true" clearable placeholder="cari disini.." v-model:value="searchBox" />
</n-popover> -->
            <n-button secondary @click="handleAdd" type="success" v-show="dataMe.me.USERNAME == 'admin'">
              <template #icon>
                <n-icon>
                  <send-icon />
                </n-icon>
              </template>
              tambah pengiriman jaminan
            </n-button>
            <!-- <n-button @click="handleNavCalc">
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
            </n-button> -->
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
          <n-data-table size="small" triped :scroll-x="1000" :columns="columns" :data="dataTable"
            :pagination="pagination" :loading="loadData" />
        </n-space>
      </n-card>
    </n-space>
    <!-- <n-space>
            online at: {{ fingerprint }}
        </n-space> -->
  </div>

  <n-modal class="w-1/2" title="Upload Berkas Pencairan" v-model:show="showModal">
    <n-card :bordered="false" aria-modal="true">
      <div class="flex justify-between">
        <div>
          <div class="flex">
            <label class="w-24">id</label>
            <n-ellipsis style="max-width: 240px">
              {{ selectedData.id }}</n-ellipsis>
          </div>
          <div class="flex">
            <label class="w-24">dari</label><span>
              <n-text strong> {{ selectedData.dari_cabang }}</n-text></span>
          </div>
          <div class="flex">
            <label class="w-24">tujuan</label><span>
              <n-text strong> {{ selectedData.ke_cabang }}</n-text></span>
          </div>
          <div class="flex">
            <label class="w-24">kurir</label><span>
              <n-text strong> {{ selectedData.kurir }}</n-text></span>
          </div>
          <div class="flex">
            <label class="w-24">Keterangan</label><span>
              <n-text strong> {{ selectedData.keterangan }}</n-text></span>
          </div>
          <div class="flex">
            <label class="w-24">STATUS</label>
            <n-tag type="info">{{ selectedData.status }}</n-tag>
          </div>
        </div>
        <div class="flex gap-2 items-top">

          <n-popconfirm :show-icon="false" @positive-click="handlePositiveClick()" positive-text="konfirmasi"
            ponegative-text="reject" @negative-click="handleNegativeClick">
            <template #activator>
              <n-button secondary type="success"
                v-show="dataMe.me.USERNAME == 'ho' && selectedData.status == 'SENDING'">Konfirmasi
              </n-button>
            </template>
            <n-input type="textarea" placeholder="keterangan" v-model:value="dynamicForm.catatan"></n-input>
          </n-popconfirm>
        </div>
      </div>
      <n-divider />
      <n-space vertical :size="12" class="mb-4">
        <n-data-table striped size="small" :row-key="(row) => row" :columns="columnsBpkb" :data="selectedData.bpkb"
          :max-height="300" :on-update:checked-row-keys="handleChecked" />
      </n-space>
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
  AttachEmailOutlined as SendIcon,
  FilePresentOutlined as FileIcon,
  ImageFilled as UploadIcon,
  DriveFolderUploadRound as FileUpload,
} from "@vicons/material";
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  MoreVertRound as MoreIcon,
  ListAltOutlined as DetailIcon,
  LocalPrintshopOutlined as PrintIcon,
} from "@vicons/material";
import { round } from "lodash";
import { useMeStore } from "../../../stores/me";

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

const dataMe = useMeStore();
const userToken = localStorage.getItem("token");

const columnsBpkb = [
  {
    type: "selection",
  },
  {
    title: "No BPKB",
    key: "BPKB_NUMBER",

  },
  {
    title: "Atas Nama",
    key: "ON_BEHALF",
    // render(row) {
    //     return h("div", row.no_polisi);
    // }
  },
  {
    title: "No Polisi",
    key: "POLICE_NUMBER",
    // render(row) {
    //     return h("div", row.no_polisi);
    // }
  },
  {
    title: "No Rangka",
    key: "CHASIS_NUMBER",
  },
  {
    title: "status",
    key: "status",
    render(row) {
      return h(NTag, {
        type: row.STATUS == 'yes' ? 'success' : 'warning',
        secondary: true,
        onClick: () => handleDetail(row),
      }, {
        default: () =>
          row.STATUS ? row.STATUS : '-'
        ,
      });
    },

  },
]
const handleSelesai = () => {
  console.log('selesai');
  router.replace({
    name: "Pengajuan Kredit",
  });
  showModal.value = false;
};

const columns = [
  {
    title: "id",
    key: "tgl",
    render(row) {
      return h("div", row.id);
    },
  },
  {
    title: "Tanggal",
    key: "tgl",
    render(row) {
      return h("div", row.tgl);
    },
  },
  {
    title: "dari",
    key: "dari_cabang",
  },
  {
    title: "kurir",
    key: "kurir",

  },
  {
    title: "tujuan",
    key: "ke_cabang",

  },
  {
    title: "jumlah",
    key: "jml_bpkb",

  },
  {
    title: "status",
    key: "status",
    render(row) {
      return h(NTag, {
        type: row.status == 'SENDING' ? 'info' : 'success',
        secondary: true,
        onClick: () => handleDetail(row),
      }, {
        default: () =>
          row.status
        ,
      });
    },

  },
  {
    key: "nama_debitur",
    width: 180,
    render(row) {
      return h(
        NButton,
        {
          circle: true,
          secondary: true,
        },
        {
          default: h(NIcon, null, {
            default: () => h(PrintIcon),
          })
        }
      );
    },
  },
  {
    key: "nama_debitur",
    align: 'right',
    width: 180,
    render(row) {
      return h(NButton, {
        secondary: true,
        onClick: () => handleDetail(row),
      }, {
        default: () => 'detail',
      });
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
const dynamicForm = reactive({
  id_surat: null,
  tujuan: null,
  bpkb: [],
  flag_approval: null,
  catatan: '',
});
const handleChecked = (e) => {
  dynamicForm.bpkb = e;
}
const selectedMail = ref([]);
const handleDetail = (e) => {
  // if (dataMe.me.USERNAME == 'ho') {
  //   columnsBpkb.unshift({
  //     type: "selection",
  //   },);
  // }
  showModal.value = true;
  dynamicForm.id_surat = e.id;
  dynamicForm.tujuan = e.ke_cabang;
  dynamicForm.flag_approval = 'yes';
  selectedData.value = e;
}

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
  router.replace({ name: 'bpkb action' });
};

const getData = async () => {
  loadData.value = true;
  const response = await useApi({
    method: "GET",
    api: "bpkb_transaction",
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.replace("/");
  } else {
    loadData.value = false;
    dataTable.value = response.data;
  }
};

const handlePositiveClick = async () => {
  const response = await useApi({
    method: "post",
    api: "bpkb_transaction",
    data: dynamicForm,
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.replace("/");
  } else {
    message.success("berhasil update");
    gertData();
    showModal.value = false;

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
onMounted(() => {
  getData();

});
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
