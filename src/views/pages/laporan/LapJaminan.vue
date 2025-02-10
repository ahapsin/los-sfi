<template>
  <div>
    <n-space vertical>
      <n-card :title="`Laporan data Jaminan`" :segmented="true" size="small">
        <!--        <template #header-extra>-->
        <!--          <n-space class="!gap-1">-->
        <!--            <div class="me-1 flex gap-2">-->
        <!--              <n-date-picker-->
        <!--                v-model:value="timestamp"-->
        <!--                type="month"-->
        <!--                 :default-value="Date.now()"-->
        <!--                format="y MMM"-->
        <!--                month-format="MMM"-->
        <!--                clearable-->
        <!--              />-->
        <!--              <n-popover trigger="click" placement="bottom-end">-->
        <!--                <template #trigger>-->
        <!--                  <n-button circle>-->
        <!--                    <n-icon>-->
        <!--                      <search-icon />-->
        <!--                    </n-icon>-->
        <!--                  </n-button>-->
        <!--                </template>-->
        <!--                <n-input-->
        <!--                  autofocus="true"-->
        <!--                  clearable-->
        <!--                  placeholder="cari disini.."-->
        <!--                  v-model:value="searchBox"-->
        <!--                />-->
        <!--              </n-popover>-->
        <!--            </div>-->
        <!--            <div>-->
        <!--              <n-button type="success" secondary>-->
        <!--                <template #icon>-->
        <!--                  <n-icon>-->
        <!--                    <download-icon />-->
        <!--                  </n-icon>-->
        <!--                </template>-->
        <!--                Download-->
        <!--              </n-button>-->
        <!--            </div>-->
        <!--            <div class="md:hidden">-->
        <!--              <n-button type="primary" @click="handleAdd">-->
        <!--                <template #icon>-->
        <!--                  <n-icon>-->
        <!--                    <add-icon />-->
        <!--                  </n-icon>-->
        <!--                </template>-->
        <!--              </n-button>-->
        <!--            </div>-->
        <!--          </n-space>-->
        <!--        </template>-->
        <n-space vertical :size="12" class="pt-4">
          <div class="flex flex-col md:flex-row gap-2 pt-4 pr-4 ps-4">
            <n-form-item label="POS" class="w-full">
              <n-input v-model:value="dynamicSearch.pos" type="text" placeholder="POS"
                       clearable/>
            </n-form-item>
            <n-form-item label="NO KONTRAK" class="w-full">
              <n-input v-model:value="dynamicSearch.loan_number" type="text" placeholder="NO KONTRAK" clearable/>
            </n-form-item>
            <n-form-item label="NAMA DEBITUR" class="w-full">
              <n-input v-model:value="dynamicSearch.nama" type="text" placeholder="NAMA DEBITUR" clearable/>
            </n-form-item>
            <n-form-item label="NO POL" class="w-full">
              <n-input v-model:value="dynamicSearch.nopol" type="text" placeholder="NO POLISI" clearable/>
            </n-form-item>
            <n-form-item label="STATUS JAMINAN" class="w-full">
              <n-select
                  filterable
                  placeholder="Status Jaminan"
                  counter
                  :options="optStatusJaminan"
                  v-model:value="dynamicSearch.status"
              />
            </n-form-item>

            <n-form-item class="w-full">
              <n-button type="success" @click="handleSearch" class="px-4"> Cari</n-button>
            </n-form-item>
          </div>
          <n-data-table
              size="small"
              :columns="convertObjectToArray(showData)"
              :data="showData"
              :pagination="pagination"
          />
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>
<script setup>
import {ref, onMounted, h, computed,reactive} from "vue";
import {useApi} from "../../../helpers/axios";
import {useSearch} from "../../../helpers/searchObject";
import router from "../../../router";
import {
  useDialog,
  useMessage,
  NDropdown,
  NIcon,
  NButton, NInput,
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
const dynamicSearch = reactive({
  pos:'',
  loan_number:'',
  nama:'',
  nopol:'',
  status:'',
});

const optStatusJaminan = ["NORMAL","TITIP","SITA","JUAL","RILIS"].map((v) => ({
  label: v,
  value: v,
}));
const getData = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: `collateral_report?pos=${dynamicSearch.pos}&loan_number=${dynamicSearch.loan_number}&nama=${dynamicSearch.nama}&nopol=${dynamicSearch.nopol}&status=${dynamicSearch.nopol}`,
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
const convertObjectToArray = (obj) => {
  if (!Array.isArray(obj) || obj.length === 0) {
    return [];
  }
  const keys = Object.keys(obj[0]);
  return keys.map(key => ({title: key, key: key}));
}
const pagination = {
  pageSize: 10,
};
onMounted(() => getData());
const showData = computed(() => {
  return useSearch(dataTable.value, searchBox.value);
});
</script>
