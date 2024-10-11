<template>
    <n-card :segmented="{
        content: true,
        footer: 'soft'
    }" :title="`Form ${$route.name}`">
        <n-form ref="formRef" :model="dynamicForm" :rules="rules" :label-placement="width <= 920 ? 'top' : 'left'"
            require-mark-placement="right-hanging" :size="size" label-width="auto">
            <n-alert v-show="errorAPI" title="Peringatan" type="warning" closable class="my-4">
                {{ errorAPI }}
            </n-alert>
            <n-form-item label="Brand">
                <n-input placeholder="kode" v-model:value="dynamicForm.brand" />
            </n-form-item>
            <n-form-item label="Kode">
                <n-input placeholder="kode" v-model:value="dynamicForm.code" />
            </n-form-item>
            <n-form-item label="model">
                <n-input placeholder="kode" v-model:value="dynamicForm.model" />
            </n-form-item>
            <n-form-item label="Deskripsi">
                <n-input type="textarea" v-model:value="dynamicForm.descr" placeholder="Deskripsi" />
            </n-form-item>
            <div class="flex gap-2">
                <n-form-item label="Minimal" path="tahun_kendaraan" :rule="rules.tahun_jaminan">
                    <n-date-picker value-format="yyyy" v-model:formatted-value="dynamicForm.min_year" type="year"
                        placeholder="Tahun jaminan" clearable />
                </n-form-item>
                <n-form-item label="Maksimal" path="tahun_kendaraan" :rule="rules.tahun_jaminan">
                    <n-date-picker value-format="yyyy" v-model:formatted-value="dynamicForm.max_year" type="year"
                        placeholder="Tahun jaminan" clearable :on-blur="maxYear" />
                </n-form-item>
            </div>
            <n-data-table :columns="columns" :data="data" :pagination="pagination" />
        </n-form>
        <template #action>
            <n-space>
                <n-button :loading="loading" type="success" @click="handleSave">
                    <span v-if="!param">Simpan</span>
                    <span v-else>Ubah</span>
                </n-button>
                <n-button type="error" @click="handleCancel">
                    Batal
                </n-button>
            </n-space>
        </template>
    </n-card>
</template>
<script setup>
import { useMessage, NInput } from 'naive-ui';
import { ref, reactive, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
const { width, height } = useWindowSize();
import { useApi } from '../../../helpers/axios';
import router from '../../../router';
import { useRoute } from 'vue-router';
const loading = ref(false);
const action = ref("POST");
const url = ref();
const formRef = ref(null);
const errorAPI = ref(null);
const message = useMessage();
const PageData = ref();
const baseRoute = useRoute();
const param = baseRoute.params.idbranch;
const userToken = localStorage.getItem("token");

const rules = {
    CODE: {
        required: true,
        trigger: ["blur", "input"],
        message: "nama wajib diisi"
    },
    NAME: {
        required: true,
        trigger: ["blur"],
        message: "nama wajib diisi"
    }
}
const handleCancel = () => router.push('/master/taksasi');

const response = () => useApi({
    method: 'get',
    api: `cabang/${param}`,
    token: userToken
}).then(res => {
    if (res.ok) {
        message.loading("memuat cabang");
        PageData.value = res.data.response;
        Object.assign(dynamicForm, res.data.response);
    }
});

const handleSave = async (e) => {
    e.preventDefault(e);
    formRef.value?.validate((errors) => {
        return null;
    });
    loading.value = true;
    if (param) {
        action.value = "PUT";
        url.value = `taksasi/${param}`;
    } else {
        url.value = `taksasi`;
        action.value = "POST";
    }
    const response = await useApi({
        method: action.value,
        api: url.value,
        data: dynamicForm,
        token: userToken
    });

    if (!response.ok) {
        message.error("data gagal disimpan");
        loading.value = false;
        errorAPI.value = response.error.data.message;
    } else {
        message.success("data berhasil disimpan");
        loading.value = false;
        router.push({ name: 'taksasi' });
    }
}
onMounted(() => {
    if (param) { response() }
});
const createColumns = () => [
    {
        title: "TAHUN",
        key: "year",
        render(row, index) {
            return h(NInput, {
                value: row.name,
                disabled: true,
                onUpdateValue(v) {
                    data.value[index].name = v;
                }
            });
        }
    },
    {
        title: "HARGA",
        key: "value",
        render(row, index) {
            return h(NInput, {
                value: row.age,
                parse: parse,
                format: format,
                onUpdateValue(v) {
                    data.value[index].harga = v;
                }
            });
        }
    }
];


const longYear = ref([]);
const maxYear = () => {
    longYear.value = [];
    let min_year = dynamicForm.min_year;
    for (let i = 0; i <= dynamicForm.diff_year; i++) {
        longYear.value.push({
            name: min_year++,
            harga: 0,
        });
    }
}
const columns = ref(createColumns());
const data = ref(longYear);
const dynamicForm = reactive({
    brand: null,
    code: null,
    model: null,
    descr: null,
    min_year: null,
    max_year: null,
    diff_year: computed(() => dynamicForm.max_year - dynamicForm.min_year),
    price: data,
});

const parse = (input) => {
    const nums = input.replace(/,/g, "").trim();
    if (/^\d+(\.(\d+)?)?$/.test(nums))
        return Number(nums);
    return nums === "" ? null : Number.NaN;
}
const format = (value) => {
    if (value === null)
        return "";
    return value.toLocaleString("en-US");
}
</script>