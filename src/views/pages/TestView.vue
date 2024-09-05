<template>
  <n-popconfirm positive-text="ok" negative-text="batal" :show-icon="false">
    <template #trigger>
      <n-button text style="font-size: 24px"> <n-icon color="red">
          <BlackIcon />
        </n-icon></n-button>
    </template>
    <div>
      tambahakan ke daftar blacklist ?
      <n-input placeholder="keterangan" type="textarea" size="small" :size="{
        minRows: 1,
        maxRows: 1,
      }" />
    </div>
  </n-popconfirm>
</template>

<script>
import { defineComponent } from "vue";
import { BlockFilled as BlackIcon } from "@vicons/material";

export default defineComponent({
  components: {
    BlackIcon
  }
});
</script>