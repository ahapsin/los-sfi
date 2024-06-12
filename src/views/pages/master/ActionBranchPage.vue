<template>
    <n-card :segmented="{
        content: true,
        footer: 'soft'
    }" :title="`Form ${$route.name}`">
        <n-form ref="formRef" :model="model" :rules="rules" label-placement="left"
            require-mark-placement="right-hanging" :size="size" label-width="auto">
            <n-form-item label="Kode" path="kode">
                <n-input placeholder="kode" v-model:value="dynamicForm.CODE" />
            </n-form-item>
            <n-form-item label="Nama" path="nama">
                <n-input placeholder="nama" v-model:value="dynamicForm.NAME" />
            </n-form-item>
            <n-form-item label="Lokasi" path="lokasi">
                <n-input placeholder="lokasi" v-model:value="dynamicForm.LOCATION" />
            </n-form-item>
            <n-form-item label="Alamat" path="alamat">
                <n-input-group>
                    <n-input placeholder="alamat" v-model:value="dynamicForm.ADDRESS" />
                    <n-input placeholder="rt" v-model:value="dynamicForm.RT">
                        <template #prefix>
                            <n-text depth="3">
                                RT
                            </n-text>
                        </template>
                    </n-input>
                    <n-input placeholder="rw" v-model:value="dynamicForm.RW">
                        <template #prefix>
                            <n-text>
                                RW
                            </n-text>
                        </template>
                    </n-input>
                </n-input-group>
            </n-form-item>
            <select-state-region v-model:provinsi="dynamicForm.PROVINCE" v-model:kota="dynamicForm.CITY"
                v-model:kecamatan="dynamicForm.KECAMATAN" v-model:desa="dynamicForm.KELURAHAN" />
            <n-form-item label="Kode POS" path="kodepos">
                <n-input placeholder="kodepos" v-model:value="dynamicForm.ZIP_CODE" />
            </n-form-item>
            <n-form-item label="Telepon" path="telepon">
                <n-input-group>
                    <n-input placeholder="Telepon" v-model:value="dynamicForm.PHONE_1" />
                    <n-input placeholder="Telepon 2" v-model:value="dynamicForm.PHONE_2">
                        <template #prefix>
                            <n-text depth="3">
                                Telepon2
                            </n-text>
                        </template>
                    </n-input>
                    <n-input placeholder="Telepon 3" v-model:value="dynamicForm.PHONE_3">
                        <template #prefix>
                            <n-text depth="3">
                                Telepon3
                            </n-text>
                        </template>
                    </n-input>
                </n-input-group>
            </n-form-item>
            <n-form-item label="Deskripsi">
                <n-input type="textarea" v-model:value="dynamicForm.DESCR" placeholder="Deskripsi" />
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
            </n-space>
        </template>
    </n-card>
</template>
<script setup>
import { useMessage } from 'naive-ui';
import { ref, reactive, onMounted } from 'vue';
import { useApi } from '../../../helpers/axios';
import router from '../../../router';
import { useRoute } from 'vue-router';

const dynamicForm = reactive({
    ID: "",
    CODE: "",
    NAME: "",
    ADDRESS: "",
    RT: "",
    RW: "",
    PROVINCE: "",
    CITY: "",
    KELURAHAN: "",
    KECAMATAN: "",
    ZIP_CODE: "",
    LOCATION: "",
    PHONE_1: "",
    PHONE_2: "",
    PHONE_3: "",
    DESCR: "",
});
const loading = ref(false);
const action = ref("POST");
const url = ref();
const message = useMessage();
const PageData = ref();
const baseRoute = useRoute();
const param = baseRoute.params.idbranch;
const userToken = localStorage.getItem("token");
const handleCancel = () => router.replace('/master/branch');

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
    loading.value = true;
    if (param) {
        action.value = "PUT";
        url.value = `cabang/${param}`;
    } else {
        url.value = `cabang`;
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
        router.replace({ name: 'cabang' });
    }
}
onMounted(() => {
    if (param) { response() }
});
</script>