<script setup lang="ts">
import { useVueToPrint } from "vue-to-print";
import { ref } from "vue";

const componentRef = ref();
const { handlePrint } = useVueToPrint({
  content: componentRef,
  documentTitle: "AwesomeFileName",
});
</script>

<template>
  <button @click="handlePrint">Print</button>
  <div ref="componentRef">
    <h1>COBA CETAK COBA CETAK</h1>
  </div>
</template>