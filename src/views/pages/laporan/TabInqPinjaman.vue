<template>
  <div>
    <n-space vertical :size="12" class="pt-4">
      <n-space>
        <n-input placeholder="Nomor Order" v-model:value="searchBox" clearable/>
        <n-input placeholder="Nama Debitur" v-model:value="namaDebitur" clearable/>
        <n-button type="success" @click="handleCari">Cari</n-button>
      </n-space>
      <n-data-table ref="tableRef"
                    :header-height="48" :columns="columns" :data="showData"
                    :loading="loading" v-show="props.available" :pagination="{pageSize:10}"/>
    </n-space>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useSearch} from "../../../helpers/searchObject.js";

const props = defineProps({
  loading: Boolean,
  columns: Array,
  available: {
    type: Boolean,
    default: false,
  },
  data: Object
})
const tableRef = ref();
const searchBox = ref();
const namaDebitur = ref();
const emit = defineEmits('cari');
const handleCari = () => {
  emit('cari', {
    no_kontrak: searchBox.value,
    nama: namaDebitur.value,
  });
}
const showData = computed(() => {
  return useSearch(props.data ? props.data : [], searchBox.value);
});

</script>
