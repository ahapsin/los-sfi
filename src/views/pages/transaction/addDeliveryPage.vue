<template>
    <n-card :segmented="{
        content: true,
        footer: 'soft'
    }" :title="`Form`">
        {{ checkedRow }}
        <n-form ref="formRef" :model="dynamicForm" :rules="rules" :label-placement="width <= 920 ? 'top' : 'left'"
            require-mark-placement="right-hanging" :size="size" label-width="auto">
            <n-space vertical :size="12" class="mb-4">
                <n-data-table striped size="small" :row-key="(row) => row" :columns="columns" :data="dataBpkb"
                    :max-height="300"  :loading="loadingAngsuran"
                    :on-update:checked-row-keys="handleChecked" />
            </n-space>
            <n-form-item label="Tujuan" path="cabang">
                <n-select filterable placeholder="Pilih Cabang" label-field="nama" value-field="id"
                    :options="dataBranch" v-model:value="dynamicForm.cabang_id" />
            </n-form-item>
            <n-form-item label="Catatan" path="cabang">
                <n-input type="textarea" />
            </n-form-item>
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
                <n-button type="info" @click="handleCancel">
                    Cetak
                </n-button>
            </n-space>
        </template>
    </n-card>
</template>
<script setup>
import { useMessage } from 'naive-ui';
import { ref, reactive, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
const { width, height } = useWindowSize();
import { useApi } from '../../../helpers/axios';
import router from '../../../router';
import { useRoute } from 'vue-router';
const dataBranch = ref();

const dynamicForm = reactive({
    photo_personal: '',
    username: '',
    password: '',
    name: '',
    no_ktp: null,
    cabang_id: null,
    cabang_nama: null,
    jabatan: '',
    gender: '',
    status: '',
});
const loading = ref(false);
const action = ref("POST");
const url = ref();
const message = useMessage();
const PageData = ref();
const baseRoute = useRoute();
const checkedRow = ref();
const param = baseRoute.params.iduser;
const userToken = localStorage.getItem("token");
const handleCancel = () => router.replace('/master/users');

const rules = {
    no_ktp: {
        trigger: "blur",
        min: 16,
        message: 'No identitas minimal 16 karakter'
    }
}

const columns = [
    {
        type: "selection",
    },
    {
        title: "No BPKB",
        key: "no_bpkb",

    },
    {
        title: "No Polisi",
        key: "no_polisi",
        // render(row) {
        //     return h("div", row.no_polisi);
        // }
    },
    {
        title: "No Rangka",
        key: "no_rangka",

    },
]
const response = () => useApi({
    method: 'get',
    api: `bpkb`,
    token: userToken
}).then(res => {
    if (res.ok) {
        message.loading("memuat data BPKB");
    } else {
        message.error("error");
    }
});

const handleSave = async (e) => {
    e.preventDefault(e);
    loading.value = true;
    if (param) {
        action.value = "PUT";
        url.value = `users/${param}`;
    } else {
        url.value = `users`;
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
    } else {
        message.success("data berhasil disimpan");
        loading.value = false;
        router.replace({ name: 'pengguna' });
    }
}
const getBranch = useApi({
    method: 'GET',
    api: `cabang`,
    token: userToken
}).then(res => {
    if (!res.ok) {
        console.log(res);
        message.error("error koneksi api");
    } else {
        dataBranch.value = res.data.response;
    }
});
const handleChecked = (e) =>{
    checkedRow.value=e;
}
const dataBpkb = ref([]);
const getBpkb = useApi({
    method: 'GET',
    api: `bpkb`,
    token: userToken
}).then(res => {
    if (!res.ok) {
        console.log(res);
        message.error("error koneksi api");
    } else {
        dataBpkb.value = res.data;
    }
});

const optJabatan = ["MCF", "ADMIN", "KAPOS", "HO", "SUPERADMIN"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optJenisKelamin = ["Laki-laki", "Perempuan"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optStatus = ["Active", "InActive"].map(
    (v) => ({
        label: v,
        value: v
    }));
onMounted(() => {
    if (param) { response() };

});
</script>