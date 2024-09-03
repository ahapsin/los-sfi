<template>
  <n-popconfirm positive-text="ok" negative-text="batal" :show-icon="false" @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick">
    <template #trigger>
      <n-button secondary type="warning" strong circle>
        <template #icon>
          <BlackIcon />
        </template>
      </n-button>
    </template>
    <div>
      tambahakan ke daftar blacklist ?
      <n-input placeholder="keterangan" type="textarea" size="small" style="min-width: 50%" />
    </div>
  </n-popconfirm>
</template>

<script setup>
import { BlockFilled as BlackIcon } from "@vicons/material";
import { useMessage } from 'naive-ui';

const message = useMessage()
const handlePositiveClick = () => {
  message.success('daftar blacklist berhasil ditambahkan');
}
</script>