<template>
  <div>
    <n-space vertical :size="12" class="pt-4">
      <n-space>
<n-form-item label="TANGGAL AKHIR">
        <n-date-picker v-model:formatted-value="rangeDate" :default-value="Date.now()" clearable format="yyyy-MM-dd"
                      />
</n-form-item>
        <n-form-item label="POS">
        <n-select
            :loading="loadingBranch"
            filterable
            placeholder="Pilih POS"
            label-field="nama"
            value-field="id"
            :default-value="defBranch"
            :options="dataBranch"
            v-model:value="selectBranch"
        />
        </n-form-item>
        <n-form-item>
        <n-button @click="handleSubmit" type="success">
          Cari
        </n-button>
        </n-form-item>
        <n-form-item>
        <json-excel v-if="dataListBan.length > 0" :data="dataListBan" :name="`Listing Beban_${selectBranch}_${rangeDate} `" :fields="json_fields" :stringifyLongNum="true">
          <n-button type="success" secondary>Download </n-button>
        </json-excel>
        </n-form-item>
      </n-space>
      <n-data-table ref="tableRef" :max-height="300"
                    virtual-scroll
                    size="small"
                    virtual-scroll-x
                    :scroll-x="10000"
                    :min-row-height="48"
                    virtual-scroll-header :columns="convertObjectToArray(dataListBan)" :data="dataListBan" :pagination="{ pageSize: 10 }"
                    :loading="loading"/>
    </n-space>
  </div>
</template>

<script setup>
import {computed, ref, onMounted} from "vue";
import {useSearch} from "../../../helpers/searchObject.js";
import JsonExcel from "vue-json-excel3";
import {useMessage} from "naive-ui";
import {useMeStore} from "../../../stores/me";
import {useApi} from "../../../helpers/axios.js";

const props = defineProps({
  loading: Boolean,
  columns: Array,
  data: Object
})
const tableRef = ref();
const searchBox = ref();
const showData = computed(() => {
  return useSearch(props.data ? props.data : [], searchBox.value);
});
const me = useMeStore();
const message = useMessage();
const dataBranch = ref([]);
const selectBranch = ref();
const defBranch = ref();
const userToken = localStorage.getItem("token");
const loadingBranch = ref(false);
const getBranch = async () => {
  loadingBranch.value = true;
  const response = await useApi({
    method: "GET",
    api: "cabang",
    token: userToken,
  });
  if (!response.ok) {
    message.error("ERROR API");
  } else {
    loadingBranch.value = false;

    if (me.me.cabang_nama != "Head Office") {
      defBranch.value = me.me.cabang_nama;
      selectBranch.value = me.me.cabang_id;
    } else {
      selectBranch.value = "SEMUA CABANG";
      dataBranch.value = response.data.response;
      dataBranch.value.unshift({
        id: "",
        nama: "SEMUA CABANG"
      });
    }
  }
}

const rangeDate = ref();
let messageReactive = null;
const handleSubmit = () => {
  const date = new Date(rangeDate.value ? rangeDate.value : Date.now());

  const formattedDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
  let a = {
    dari: formattedDate,
    cabang_id: selectBranch.value ? selectBranch.value : null
  }
  messageReactive = message.loading('memuat data listing beban', {duration: 0});
  grabListBan(a);
}
const dataListBan = ref([]);
const grabListBan = async (e) => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "POST",
    api: "listBan",
    data: e,
    token: userToken,
  });
  if (!response.ok) {
    message.error('ERROR API');
    messageReactive.destroy();
  } else {
    messageReactive.destroy();
    messageReactive = null;
    dataListBan.value = response.data;
  }

}
const convertObjectToArray = (obj) => {
  if (!Array.isArray(obj) || obj.length === 0) {
    return [];
  }
  const keys = Object.keys(obj[0]);
  return keys.map(key => ({title: key, key: key}));
}
onMounted(() => getBranch());
</script>
