<template>
  <div>
    <n-space vertical :size="12" class="pt-4">
      <n-space>
        <n-button @click="downloadCsv" type="success">download</n-button>
      </n-space>
      <n-data-table ref="tableRef" :max-height="300"
                    virtual-scroll
                    virtual-scroll-x
                    :scroll-x="5000"
                    :min-row-height="48"

                    virtual-scroll-header :columns="columns" :data="showData" :pagination="{ pageSize: 10 }"
                    :loading="loading" />
    </n-space>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useSearch } from "../../../helpers/searchObject.js";

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
const downloadCsv = () => tableRef.value?.downloadCsv({
  fileName: `listing beban`,
  keepOriginalData: true
});
</script>
