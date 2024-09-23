<template>
  <n-p>
    You have selected {{ checkedRowKeys.length }} row{{
      checkedRowKeys.length < 2 ? '' : 's' }}. </n-p>

      <n-data-table :columns="columns" :data="data" :pagination="pagination" :row-key="rowKey"
        @update:checked-row-keys="handleCheck" />
</template>

<script>
import { defineComponent, ref } from "vue";


function createColumns() {
  return [
    {
      type: "selection",
      disabled(row) {
        return row.name === "Edward King 3";
      }
    },
    {
      title: "Name",
      key: "name"
    },
    {
      title: "Age",
      key: "age"
    },
    {
      title: "Address",
      key: "address"
    }
  ];
}

const data = Array.from({ length: 46 }).map((_, index) => ({
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
}));

export default defineComponent({
  setup() {
    const checkedRowKeysRef = ref([]);

    return {
      data,
      columns: createColumns(),
      checkedRowKeys: checkedRowKeysRef,
      pagination: {
        pageSize: 5
      },
      rowKey: (row) => row,
      handleCheck(rowKeys) {
        checkedRowKeysRef.value = rowKeys;
      }
    };
  }
});
</script>