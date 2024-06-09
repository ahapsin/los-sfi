<template>
    <n-card :segmented="{
        content: true,
        footer: 'soft'
    }" :title="`Form ${$route.name}`">
        <n-form ref="formRef" :model="model" :rules="rules" label-placement="left"
            require-mark-placement="right-hanging" :size="size" label-width="auto">
            <n-form-item label="Kode" path="kode">
                <n-input placeholder="kode" v-model:value="dynamicForm.code" />
            </n-form-item>
            <n-form-item label="Nama" path="nama">
                <n-input placeholder="nama" v-model:value="dynamicForm.name" />
            </n-form-item>
            <n-form-item label="Lokasi" path="lokasi">
                <n-input placeholder="lokasi" v-model:value="dynamicForm.location" />
            </n-form-item>
            <n-form-item label="Alamat" path="alamat">
                <n-input-group>
                    <n-input placeholder="alamat" v-model:value="dynamicForm.address" />
                    <n-input placeholder="rt" v-model:value="dynamicForm.rt">
                        <template #prefix>
                            <n-text depth="3">
                                RT
                            </n-text>
                        </template>
                    </n-input>
                    <n-input placeholder="rw" v-model:value="dynamicForm.rw">
                        <template #prefix>
                            <n-text depth="3">
                                RW
                            </n-text>
                        </template>
                    </n-input>
                </n-input-group>
            </n-form-item>
            <select-state-region v-model:provinsi="dynamicForm.province" v-model:kota="dynamicForm.city"
                v-model:kecamatan="dynamicForm.kecamatan" v-model:desa="dynamicForm.kelurahan"
                :provinsi="nasabah.provinsi" />
            <n-form-item label="Kode POS" path="kodepos">
                <n-input placeholder="kodepos" v-model:value="dynamicForm.zip_code" />
            </n-form-item>
            <n-form-item label="Telepon" path="telepon">
                <n-input-group>
                    <n-input placeholder="Telepon" v-model:value="dynamicForm.phone_1" />
                    <n-input placeholder="Telepon 2" v-model:value="dynamicForm.phone_2" />
                    <n-input placeholder="Telepon 3" v-model:value="dynamicForm.phone_3" />
                </n-input-group>
            </n-form-item>
            <n-form-item label="Deskripsi">
                <n-input type="textarea" v-model:value="dynamicForm.descr" placeholder="Deskripsi" />
            </n-form-item>
            <n-form-item label="Status">
                <n-select :options="status" v-model:value="dynamicForm.status" />
            </n-form-item>

        </n-form>
        <template #action>
            <n-space>
                <n-button :loading="loading" type="success" @click="handleSave">
                    <span v-if="!param">Simpan</span>
                    <span v-else>Ubah</span>
                </n-button>
                <n-button type="warning" secondary @click="handleCancel">
                    Batal
                </n-button>
            </n-space>
        </template>
    </n-card>
</template>
<script setup>
import { useMessage } from 'naive-ui';
import { ref, reactive } from 'vue';
import { useApi } from '../../../helpers/axios';
import router from '../../../router';
import { useRoute } from 'vue-router';

const dynamicForm = reactive({
    code: "kary",
    name: "Cirebon",
    address: "Jl.Jatibarang",
    rt: "001",
    rw: "010",
    province: "Jawa Selatan",
    city: "Laut Selatan",
    kelurahan: "Nyi Roro Kidul",
    kecamatan: "Laut Selatan",
    zip_code: "12345",
    location: "jupiter",
    phone_1: "2124545",
    phone_2: "4534545",
    phone_3: "124585",
    descr: "isi aja dulu",
    status: "Active"
});
const loading = ref(false);
const message = useMessage();
const baseRoute = useRoute();
const param = baseRoute.params.idemployee;
const userToken = localStorage.getItem("token");
const status = [{
    label: 'Aktif',
    value: 'Aktif'
}, {
    label: 'Tidak Aktif',
    value: 'Tidak Aktif'
}];
const handleCancel = () => router.replace('/master/employees');
const handleSave = async (e) => {
    e.preventDefault(e);
    loading.value = true;
    const response = await useApi({
        method: 'POST',
        api: 'cabang',
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
</script>