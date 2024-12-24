<template>
  <div>
      <n-space vertical :size="12" class="pt-4">
        <n-space>
          <n-input placeholder="cari"/>
          <n-button @click="downloadCsv">download</n-button>
        </n-space>
        <n-data-table :columns="columns" :data="props.data"/>
      </n-space>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: Array,
  data:Object
})
</script>
