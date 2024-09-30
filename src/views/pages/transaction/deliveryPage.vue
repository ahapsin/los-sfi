<template>
  <div class="pt-4" id="drawer-target">
    <n-space vertical>
      <n-card :title="`Transaksi serah terima jaminan`">
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
              <n-input autofocus="true" clearable placeholder="cari disini.." v-model:value="searchBox" />
            </n-popover>
            <n-button secondary @click="handleAdd" type="success" v-show="dataMe.me.USERNAME == 'admin'">
              <template #icon>
                <n-icon>
                  <send-icon />
                </n-icon>
              </template>
              tambah pengiriman jaminan
            </n-button>
            <n-button secondary @click="handleUpdate" type="info" v-show="dataMe.me.USERNAME == 'admin'">
              <template #icon>
                <n-icon>
                  <change-icon />
                </n-icon>
              </template>
              Update Status jaminan
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
          <n-data-table size="small" triped :scroll-x="1000" :columns="columns" :data="showData"
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
import { ref, reactive, onMounted } from "vue";
import { useApi } from "../../../helpers/axios";
import router from "../../../router";
import {

  useMessage,
  NIcon,
  NTag,
  NButton,
} from "naive-ui";


import {

  RestartAltRound as ChangeIcon,
  SearchOutlined as SearchIcon,
  AttachEmailOutlined as SendIcon,

} from "@vicons/material";


import { useMeStore } from "../../../stores/me";

const message = useMessage();

const showModal = ref(false);
const dataTable = ref([]);
const searchBox = ref();
const selectedData = ref();
const loadData = ref(false);

const dataMe = useMeStore();
const userToken = localStorage.getItem("token");




const dynamicForm = reactive({
  id_surat: null,
  tujuan: null,
  bpkb: [],
  flag_approval: null,
  catatan: '',
});






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


onMounted(() => {
  getData();

});



</script>
