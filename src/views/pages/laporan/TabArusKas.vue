<template>
  <div>
    <n-space vertical :size="12" class="pt-4">
      <n-space>
        <n-date-picker v-model:formatted-value="rangeDate" type="daterange" clearable format="yyyy-MM-dd"
                       start-placeholder="dari" end-placeholder="sampai"/>
        <n-select
            v-if="me.me.cabang_nama == 'Head Office'"
            :loading="loadingBranch"
            @click="getBranch"
            filterable
            placeholder="Pilih Cabang"
            label-field="nama"
            value-field="id"
            :default-value="defBranch"
            :options="dataBranch"
            v-model:value="selectBranch"
        />
        <n-button @click="handleSubmit" type="success">
          Cari
        </n-button>
        <n-button @click="downloadCsv" type="info">
          download
        </n-button>
        {{ cabang }}
      </n-space>
      <n-data-table
          v-if="props.data.length > 0"
          ref="tableRef"
          :get-csv-cell="getCsvCell"
          size="small"
          :columns="props.columns"
          :data="props.data"
          :loading="props.load"
          :pagination="paginationRef"
      />
    </n-space>
  </div>
</template>

<script setup>
import {ref, defineEmits, reactive} from "vue";
import {useApi} from "../../../helpers/axios.js";
import {useMessage} from "naive-ui";
import {useMeStore} from "../../../stores/me.js";

const rangeDate = ref();
const tableRef = ref();
const emit = defineEmits();
const message = useMessage();
const paginationRef = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 30, 50, 100],
  onChange: (page) => {
    paginationRef.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    paginationRef.pageSize = pageSize;
    paginationRef.page = 1;
  }
});

const handleSubmit = () => {
  let a = {
    dari: rangeDate.value ? rangeDate.value[0] : null,
    sampai: rangeDate.value ? rangeDate.value[1] : null,
    cabang_id: selectBranch.value ? selectBranch.value : null
  }
  emit("filterForm", a);
}

const dataBranch = ref([]);
const selectBranch = ref();
const defBranch = ref();
const userToken = localStorage.getItem("token");
const loadingBranch = ref(false);
const me = useMeStore();
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

const props = defineProps({
  data: Object,
  columns: Array,
  load: Boolean,
  pageSize: Number,
});

const today = new Date();

onMounted(() => {
  getBranch();
})

const year = today.getFullYear();
let month = today.getMonth() + 1; // Months are zero-indexed, so add 1
let day = today.getDate();


month = month < 10 ? '0' + month : month;
day = day < 10 ? '0' + day : day;


const formatDateRange = (e) => e.join('_');
const downloadCsv = () => tableRef.value?.downloadCsv({
  fileName: `lkbh_${formatDateRange(rangeDate.value)}`,
  keepOriginalData: true
});


</script>

<style lang="scss" scoped>

</style>