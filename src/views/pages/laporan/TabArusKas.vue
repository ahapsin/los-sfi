<template>
  <div>
    <n-space vertical :size="12" class="pt-4">
      <n-space>
        <n-date-picker v-model:formatted-value="rangeDate" type="daterange" clearable format="yyyy-MM-dd" :default-value="[Date.now(), Date.now()]"
                       :on-update:formatted-value="changeRange"/>
        <n-button @click="downloadCsv">

          download</n-button>
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
import {
  DownloadForOfflineFilled as DownloadIcon,
} from "@vicons/material";
import {ref, defineEmits} from "vue";
const rangeDate = ref();
const tableRef = ref();

const emit = defineEmits();

const changeRange = (e) => {
  rangeDate.value=e;
  emit("changeDateRange", e);
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
const downloadCsv = () => tableRef.value?.downloadCsv({fileName: `arus_kas_${formatDateRange(rangeDate.value)}`, keepOriginalData: true});


</script>

<style lang="scss" scoped>

</style>