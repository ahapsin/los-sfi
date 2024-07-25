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
                        <n-auto-complete v-model:value="valOptSearch" :options="listCustomer"
                            :on-select="handleInputSearch">
                            <template #default="{ handleInput, handleBlur, handleFocus, value: slotValue }">
                                <n-input clearable @clear="handleCloseNasabah" :value="slotValue" placeholder="Cari"
                                    @input="handleInput" @focus="handleFocus" @blur="handleBlur">
                                    <template #prefix>
                                        <n-icon :component="searchIcon" />
                                    </template>
                                </n-input>
                            </template>
                        </n-auto-complete>
                    </n-form-item-gi>
                </n-grid>
            </n-form-item>
            <n-space vertical>
                <n-form-item v-show="searchField">
                    <n-card title="Data Nasabah" closable class="bg-pr text-white" @close="handleCloseNasabah">
                        {{ valOptSearch }}
                    </n-card>
                </n-form-item>
                <n-form-item v-show="searchField">
                    <n-data-table v-model:checked-row-keys="checkedRowKeys" :columns="columns" :data="data"
                        :pagination="pagination" />
                </n-form-item>

                <n-card title="Pembayaran" v-show="searchField">
                    <template #header-extra>
                        <n-space>
                            <n-form-item path="nestedValue.path2" label="Jenis Pembayaran">
                                <n-select filterable :options="optTipePay" placeholder="Jenis Pembayaran"
                                    v-model:value="tipe_pay" />
                            </n-form-item>
                            <n-form-item path="nestedValue.path2" label="Jumlah Uang">
                                <n-input placeholder="Jumlah Pembayaran" loading size="large">
                                    <template #prefix>
                                        Rp.
                                    </template>
                                </n-input>
                            </n-form-item>
                        </n-space>
                    </template>
                    <template #action>
                        <n-space v-show="tipe_pay == 'transfer'">
                            <n-form-item path="nestedValue.path2" label="Bank">
                                <n-select filterable :options="optBank" placeholder="Bank Tujuan"
                                    v-model:value="bank" />
                            </n-form-item>
                            <n-form-item label="No Rekening">
                                <n-input />
                            </n-form-item>
                            <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :headers="{
                                'naive-info': 'hello!',
                            }" :data="{
                                'naive-data': 'cool! naive!',
                            }">
                                <n-button>Bukti Transfer</n-button>
                            </n-upload>
                        </n-space>
                        <n-space v-show="tipe_pay == 'cash'">
                            <n-form-item label="pembulatan">
                                <n-input size="large" />
                            </n-form-item>
                            <n-form-item label="total">
                                <n-input size="large" />
                            </n-form-item>
                            <n-form-item label="kembalian">
                                <n-input size="large" />
                            </n-form-item>
                        </n-space>
                        <n-button type="primary">
                            Proses
                        </n-button>
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
                            <!-- <n-space size="large" justify="space-between">
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
                            </n-space> -->
                        </n-list-item>
                        <n-list-item>
                            <template #prefix>
                                <n-checkbox>
                                </n-checkbox>
                            </template>
                            <!-- <n-space size="large" justify="space-between">
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
                            </n-space> -->
                        </n-list-item>
                    </n-list>
                </n-card>
            </n-space>
        </n-form>
    </n-card>
</template>

<script setup>
import { useApi } from "../../../helpers/axios";
import { useSearch } from "../../../helpers/searchObject";
import {
    SearchRound as searchIcon,
} from "@vicons/material";
const searchField = ref(false);
const valOptSearch = ref(null);
const handleInputSearch = () => {
    searchField.value = true;
    console.log('search');
}
const handleCloseNasabah = () => {
    searchField.value = false;
    valOptSearch.value = null;
    console.log('search');
}

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
import { computed, onMounted, ref } from "vue";
const data = Array.from({ length: 3 }).map((_, index) => ({
    name: `12312312${index}`,
    age: "konvensional",
    address: `1.000.000. ${index}`,
    key: index
}));
const tipe_pay = ref("Tunai");
const bank = ref(null);
const optTipePay = [
    {
        label: 'Tunai',
        value: 'cash',
    },
    {
        label: 'Transfer',
        value: 'transfer'
    },
];
const optBank = [
    {
        label: 'BCA',
        value: 'bca',
    },
    {
        label: 'Mandiri',
        value: 'mandiri'
    },
];
const checkedRowKeysRef = ref([4, 1]);
const dataCustomer = ref([]);
const columns = createColumns();

const getDataCustomer = async () => {
    let userToken = localStorage.getItem("token");
    const response = await useApi({
        method: 'GET',
        api: 'customer',
        token: userToken
    });
    if (!response.ok) {
        message.error("sesi berakhir");
        localStorage.removeItem("token");
        router.replace('/');
    } else {
        dataCustomer.value = response.data;
    }
}



const listCustomer = computed(() => {
    let dataList = useSearch(dataCustomer.value, valOptSearch.value);
    return dataList.map((suffix) => {
        return {
            label: suffix.CUST_CODE + "-" + suffix.NAME,
            value: suffix
        };
    })
});

onMounted(() => getDataCustomer());
</script>