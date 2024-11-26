<template>
    <n-card>
        <n-tabs @update:value="handleUpdateValue" class="card-tabs" default-value="jaminan" size="medium" animated
            pane-wrapper-style="margin: 0 -4px" type="card"
            pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
            <template #prefix>
                Approval
            </template>
            <n-tab-pane name="Transfer" tab="Transfer">
                <PendingTransferPage />
            </n-tab-pane>
            <n-tab-pane name="Diskon" tab="Diskon">
                <n-data-table :columns="columns" :data="dataTable" />
            </n-tab-pane>
            <template #suffix>
                <n-dropdown trigger="hover" :options="options" @select="handleSelect" v-if="addButtonDisplay">
                    <n-button type="success">Tambah Transaksi</n-button>
                </n-dropdown>
            </template>
        </n-tabs>
    </n-card>
</template>
<script setup>
import PendingTransferPage from './PendingTransferPage.vue';
</script>