<template>
    <n-card>
        <n-tabs class="card-tabs" default-value="jaminan" size="large" animated pane-wrapper-style="margin: 0 -4px"
            pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
            <n-tab-pane name="jaminan" tab="Jaminan">
                <n-data-table v-model:checked-row-keys="checkedRowKeys" :columns="columns" :data="data"
                    :pagination="pagination" />
            </n-tab-pane>
            <n-tab-pane name="transaksi" tab="Transaksi">

            </n-tab-pane>
        </n-tabs>
    </n-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { repeat } from "seemly";


const data = repeat(30000, void 0).map((_, index) => ({
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`,
  key: index
}));

export default defineComponent({
  setup() {
    const checkedRowKeysRef = ref([]);
    const columns = [
      {
        type: "selection",
        options: [
          "all",
          "none",
          {
            label: "Select first 2 rows",
            key: "f2",
            onSelect: (pageData) => {
              checkedRowKeysRef.value = pageData.map((row) => row.key).slice(0, 2);
            }
          }
        ],
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
    return {
      checkedRowKeys: checkedRowKeysRef,
      data,
      pagination: {
        pageSize: 6
      },
      columns
    };
  }
});
</script>