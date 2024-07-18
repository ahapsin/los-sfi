<template>
    <n-card>
        <n-form ref="formRef" :model="model" :rules="rules" label-placement="left"
            require-mark-placement="right-hanging" :size="size" label-width="auto">
            <n-form-item label="Jenis Transaksi" :show-feedback="false" class="w-full">
                <n-grid :cols="2">
                    <n-form-item-gi path="nestedValue.path1">
                        <n-radio-group v-model:value="size" name="left-size">
                            <n-radio-button value="small">
                                Angsuran
                            </n-radio-button>
                            <n-radio-button value="medium">
                                Pelunasan
                            </n-radio-button>
                        </n-radio-group>
                    </n-form-item-gi>
                    <n-form-item-gi path="nestedValue.path2">
                        <n-input placeholder="cari" loading>
                            <template #prefix>
                                <n-icon :component="searchIcon" />
                            </template>
                        </n-input>
                    </n-form-item-gi>
                </n-grid>
            </n-form-item>

            <n-space vertical>

                <n-form-item>
                    <n-card title="data nasabah" closable class="shadow-md">asdsad</n-card>
                </n-form-item>
                <n-form-item>
                    <n-data-table v-model:checked-row-keys="checkedRowKeys" :columns="columns" :data="data"
                        :pagination="pagination" />
                </n-form-item>

                <n-card title="Pembayaran">
                    <template #header-extra>
                        <n-form-item path="nestedValue.path2" label="Jumlah Uang">
                            <n-input placeholder="Jumlah Pembayaran" loading size="large">
                                <template #prefix>
                                    Rp.
                                </template>
                            </n-input>
                        </n-form-item>
                    </template>
                    <template #action>
                        <n-space>
                            <n-form-item label="pembulatan">
                                <n-input size="large" />
                            </n-form-item>
                            <n-form-item label="total">
                                <n-input size="large" />
                            </n-form-item>
                            <n-form-item label="kembalian">
                                <n-input size="large" />
                            </n-form-item>
                            <n-button type="primary" size="large">
                                Proses
                            </n-button>
                        </n-space>
                    </template>
                    <n-list bordered hoverable>
                        <n-list-item>
                            <template #prefix>
                                <n-checkbox>
                                </n-checkbox>
                            </template>
                            <n-space size="large" justify="space-between">
                                <n-thing title="Angsuran" description="ke 1">
                                </n-thing>
                                <n-thing title="Jatuh Tempo" description="1 Januari 2025">
                                </n-thing>
                                <n-thing title="Nominal" description="RP. 1.000.000">
                                </n-thing>
                                <n-thing title="Denda" description="0">
                                </n-thing>
                                <n-thing title="Biaya Tagih" description="0">
                                </n-thing>
                            </n-space>
                        </n-list-item>
                        <n-list-item>
                            <template #prefix>
                                <n-checkbox>
                                </n-checkbox>
                            </template>
                            <n-space size="large" justify="space-between">
                                <n-thing title="Angsuran" description="ke 2">
                                </n-thing>
                                <n-thing title="Jatuh Tempo" description="1 februri 2025">
                                </n-thing>
                                <n-thing title="Nominal" description="RP. 1.000.000">
                                </n-thing>
                                <n-thing title="Denda" description="0">
                                </n-thing>
                                <n-thing title="Biaya Tagih" description="0">
                                </n-thing>
                            </n-space>
                        </n-list-item>
                        <n-list-item>
                            <template #prefix>
                                <n-checkbox>
                                </n-checkbox>
                            </template>
                            <n-space size="large" justify="space-between">
                                <n-thing title="Angsuran" description="ke 3">
                                </n-thing>
                                <n-thing title="Jatuh Tempo" description="1 maret 2025">
                                </n-thing>
                                <n-thing title="Nominal" description="RP. 1.000.000">
                                </n-thing>
                                <n-thing title="Denda" description="0">
                                </n-thing>
                                <n-thing title="Biaya Tagih" description="0">
                                </n-thing>
                            </n-space>
                        </n-list-item>
                    </n-list>
                </n-card>
            </n-space>
        </n-form>
    </n-card>
</template>

<script setup>
import {
    SearchRound as searchIcon,
} from "@vicons/material";

const createColumns = () => {
    return [
        {
            type: "selection",
            multiple: false,
            disabled(row) {
                return row.name === "Edward King 3";
            }
        },
        {
            title: "No Kontrak",
            key: "name"
        },
        {
            title: "Syariah Flag",
            key: "age"
        },
        {
            title: "Sisa Angsuran",
            key: "address"
        },
        {
            title: "Total Bayar",
            key: "address"
        }
    ];
}
import { defineComponent, ref } from "vue";
const data = Array.from({ length: 3 }).map((_, index) => ({
    name: `12312312${index}`,
    age: "konvensional",
    address: `1.000.000. ${index}`,
    key: index
}));

const checkedRowKeysRef = ref([4, 1]);
const columns = createColumns(); 
</script>