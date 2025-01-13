<template>
  <div>
    <n-space vertical :size="12" class="pt-4">
      <n-space>
        <n-date-picker v-model:formatted-value="rangeDate" type="daterange" clearable format="yyyy-MM-dd"
                       :default-value="[Date.now(), Date.now()]"/>
        <n-select
            :loading="loadingBranch"
            @click="getBranch"
            filterable
            placeholder="Pilih Cabang"
            label-field="nama"
            value-field="id"
            default-value="SEMUA CABANG"
            :options="dataBranch"
            v-model:value="selectBranch"
        />
        <n-button @click="handleSubmit" type="success">
          Cari
        </n-button>
        <n-button @click="downloadCsv" type="info">
          download
        </n-button>

      </n-space>
      <n-data-table
          ref="tableRef"
          :get-csv-cell="getCsvCell"
          size="small"
          :columns="props.columns"
          :data="props.data"
          :loading="props.load"
          :pagination="{pageSize: props.pageSize}"
      />
    </n-space>
  </div>
</template>

<script setup>
import {ref, defineEmits} from "vue";
import {useApi} from "../../../helpers/axios.js";

const rangeDate = ref();
const tableRef = ref();
const emit = defineEmits();

const handleSubmit = () => {
  let a = {
    dari: rangeDate.value ? rangeDate.value[0] : null,
    sampai: rangeDate.value ? rangeDate.value[1] : null,
    cabang_id: selectBranch.value ? selectBranch.value:null
  }
  emit("filterForm", a);
}

const dataBranch = ref([]);
const selectBranch = ref();
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
    dataBranch.value=response.data.response;
    dataBranch.value.unshift({
      id:"",
      nama:"SEMUA CABANG"
    })
  }
}

const props = defineProps({
  data: Object,
  columns: Array,
  load: Boolean,
  pageSize: Number,
});


const today = new Date();


const year = today.getFullYear();
let month = today.getMonth() + 1; // Months are zero-indexed, so add 1
let day = today.getDate();


month = month < 10 ? '0' + month : month;
day = day < 10 ? '0' + day : day;


const formattedDate = `${year}-${month}-${day}`;

const formatDateRange = (e) => e.join('_');
const downloadCsv = () => tableRef.value?.downloadCsv({
  fileName: `arus_kas_${formatDateRange(rangeDate.value)}`,
  keepOriginalData: true
});


</script>

<style lang="scss" scoped>

</style>
