<template>
    <n-card title="Kalkulasi">
        <n-space vertical>
            <n-form-item path="range" label="Range Pinjaman">
                <n-slider v-model:value="rangeNum" range min="1" max="10" :marks="marks" step="mark" />
            </n-form-item>
            <n-space>
                <n-input v-model:value="rangeNum[0]" size="small">
                    <template #suffix>
                        Juta
                    </template>
                </n-input>
                <n-input v-model:value="rangeNum[1]" size="small">
                    <template #suffix>
                        Juta
                    </template>
                </n-input>
            </n-space>
            <n-data-table :columns="columns" :data="data" />
            <n-button type="primary">
                Simpan Skema
            </n-button>
        </n-space>
    </n-card>
</template>

<script setup>
import { readonly, ref } from "vue";
import { NInput } from "naive-ui";
const rangeNum = ref([1, 2]);
const marks = {
    1: '1 Juta',
    2: '2 Juta',
    4: '4 Juta',
    6: '6 Juta',
    10: '> 6 Juta',
};
const createData = () => [
    {
        key: 0,
        name: "Eff Rate",
        tenor6: "32",
        tenor12: "12",
        tenor18: "18",
        tenor24: "24"

    },
    {
        key: 1,
        name: "CADANGAN MACET",
        tenor6: "42",
        tenor12: "12",
        tenor18: "18",
        tenor24: "24"

    },
    {
        key: 2,
        name: "INCREASE UMR",
        tenor6: "32",
        tenor12: "12",
        tenor18: "18",
        tenor24: "24"

    },
    {
        key: 3,
        name: "ICT MCE",
        tenor6: "32",
        tenor12: "12",
        tenor18: "18",
        tenor24: "24"

    },
    {
        key: 4,
        name: "ICT KAPOS",
        tenor6: "32",
        tenor12: "12",
        tenor18: "18",
        tenor24: "24"

    },
    {
        key: 5,
        name: "MS 107",
        tenor6: "32",
        tenor12: "12",
        tenor18: "18",
        tenor24: "24"

    },
    {
        key: 5,
        name: "MS 108",
        tenor6: "32",
        tenor12: "12",
        tenor18: "18",
        tenor24: "24"

    },
    {
        key: 5,
        name: "Biaya Promosi",
        tenor6: "32",
        tenor12: "12",
        tenor18: "18",
        tenor24: "24"

    },
    {
        key: 6,
        name: "Admin Murni",
        tenor6: "32",
        tenor12: "12",
        tenor18: "18",
        tenor24: "24"

    },
    {
        key: 6,
        name: "Total Admin",
        tenor6: "32",
        tenor12: "12",
        tenor18: "18",
        tenor24: "24"

    },
];
const createColumns = () => [
    {
        title: "Name",
        key: "name",
        render(row, index) {
            return h(NInput, {
                readonly: true,
                value: row.name,
                onUpdateValue(v) {
                    data.value[index].name = v;
                }
            });
        }
    },
    {
        title: "6 bulan",
        key: "tenor",
        render(row, index) {
            return h(NInput, {
                value: row.tenor6,
                onUpdateValue(v) {
                    data.value[index].tenor6 = v;
                }
            });
        }
    },
    {
        title: "12 bulan",
        key: "tenor",
        render(row, index) {
            return h(NInput, {
                value: row.tenor12,
                onUpdateValue(v) {
                    data.value[index].tenor12 = v;
                }
            });
        }
    },
    {
        title: "18 bulan",
        key: "tenor",
        render(row, index) {
            return h(NInput, {
                value: row.tenor18,
                onUpdateValue(v) {
                    data.value[index].tenor12 = v;
                }
            });
        }
    },
    {
        title: "24 bulan",
        key: "tenor",
        render(row, index) {
            return h(NInput, {
                value: row.tenor24,
                onUpdateValue(v) {
                    data.value[index].tenor24 = v;
                }
            });
        }
    },

];
const data = ref(createData());
const columns = ref(createColumns());
</script>