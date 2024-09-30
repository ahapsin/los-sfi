<template>
  {{ data }}
  <n-data-table :columns="columns" :data="data" :row-props="rowProps" :row-class-name="rowClassName"/>
</template>

<script>
import { defineComponent,reactive } from "vue";
import { useMessage } from "naive-ui";
export default defineComponent({
  setup() {
    const message = useMessage();
    return {
      rowProps: (row) => {
        return {
          style: "cursor: pointer;",
          onClick: () => {
            row.active=!row.active;
            message.info(row);
          }
        };
      },
      columns: [
      {
      key: 'name',
      title() {
      }
    },
        {
          type:"selection",
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
      ],
      data: reactive([
        {
          key: 0,
          name: "07akioni",
          age: "18",
          active:false,
          address: "Yiheyuan Road"
        },
        {
          key: 1,
          name: "08akioni",
          age: "14",
          active:false,
          address: "Pingshan Road"
        },
        {
          key: 2,
          name: "09akioni",
          age: "22",
          active:false,
          address: "Haidian Bridge"
        }
      ]),
      rowClassName(row) {
        if (row.active) {
          return "too-old";
        }
        return "";
      }
    };
    
  }
});
</script>

<style scoped>
:deep(.too-old td) {
  background-color:  rgba(0, 128, 0, 0.1) !important;
  color: rgba(0, 128, 0, 0.75) !important;
}
:deep(.age) {
  color: rgba(0, 128, 0, 0.75) !important;
}
:deep(.too-old .age) {
  color: rgba(0, 0, 128, 0.75) !important;
}
</style>