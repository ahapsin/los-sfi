<template>
  <div>
    <json-excel :data="dataForExcel" name="list ban" :fields="json_fields">
      dsadasdasd

    </json-excel>
  </div>
</template>
<script setup>
import JsonExcel from "vue-json-excel3";

const json_fields = {
  City: "colA",
}
const dataForExcel = [
  {NAMA_REPORT: "NAMA REPORT", colB: "World"},
  {NAMA_REPORT: "NAMA REPORT", colB: "World"},
  {
    colA: "Multi-line",
    /* Multi-line value: */
    colB:
        "This is a long paragraph\nwith multiple lines\nthat should show in a single cell.",
  },
  {colA: "Another", colB: "Regular cell"},
];
</script>