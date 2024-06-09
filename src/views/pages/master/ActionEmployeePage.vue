<template>
    <n-card :segmented="{
        content: true,
        footer: 'soft'
    }" :title="`Form ${$route.name}`">
        <n-form ref="formRef" :model="model" :rules="rules" label-placement="left"
            require-mark-placement="right-hanging" :size="size" label-width="auto">
            <n-form-item label="No KTP" path="no_ktp">
                <n-input placeholder="No KTP" v-model:value="dynamicForm.no_ktp" />
            </n-form-item>
            <n-form-item label="Nama" path="nama">
                <n-input placeholder="nama" v-model:value="dynamicForm.nama" />
            </n-form-item>
            <n-form-item label="Tempat Tanggal lahir" path="ttl">
                <n-input-group>
                    <n-input placeholder="tempat lahir" v-model:value="dynamicForm.tempat_lahir" />
                    <n-input placeholder="tanggal lahir" type="date" v-model:value="dynamicForm.tgl_lahir" />
                </n-input-group>
            </n-form-item>
            <n-form-item label="Jenis Kelamin" path="jk">
                <n-select :options="optJenisKelamin" placeholder="Jenis Kelamin" v-model:value="dynamicForm.gender" />
            </n-form-item>
            <n-form-item label="Golongan Darah" path="blood">
                <n-input placeholder="Golongan Darah" v-model:value="dynamicForm.blood_type" />
            </n-form-item>
            <n-divider title-placement="left">
                Alamat KTP
            </n-divider>
            <n-form-item label="Alamat KTP" path="alamat">
                <n-input-group>
                    <n-input placeholder="alamat" v-model:value="dynamicForm.alamat_ktp" />
                    <n-input placeholder="rt" v-model:value="dynamicForm.rt_ktp">
                        <template #prefix>
                            <n-text depth="3">
                                RT
                            </n-text>
                        </template>
                    </n-input>
                    <n-input placeholder="rw" v-model:value="dynamicForm.rw_ktp">
                        <template #prefix>
                            <n-text depth="3">
                                RW
                            </n-text>
                        </template>
                    </n-input>
                </n-input-group>
            </n-form-item>
            <select-state-region v-model:provinsi="dynamicForm.provinsi_ktp" v-model:kota="dynamicForm.kota_ktp"
                v-model:kecamatan="dynamicForm.kecamatan_ktp" v-model:desa="dynamicForm.kelurahan_ktp" />
            <n-form-item label="Kode POS" path="kodepos">
                <n-input placeholder="kodepos" v-model:value="dynamicForm.kode_pos_ktp" />
            </n-form-item>
            <n-divider title-placement="left">
                Alamat Domisili
            </n-divider>
            <n-form-item label="Alamat Domisili" path="alamat">
                <n-input-group>
                    <n-input placeholder="alamat" v-model:value="dynamicForm.alamat_tinggal" />
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
            <select-state-region v-model:provinsi="dynamicForm.provinsi" v-model:kota="dynamicForm.kota"
                v-model:kecamatan="dynamicForm.kecamatan" v-model:desa="dynamicForm.kelurahan" />
            <n-form-item label="Kode POS" path="kodepos">
                <n-input placeholder="kodepos" v-model:value="dynamicForm.kode_pos" />
            </n-form-item>
            <n-form-item label="Agama" path="agama">
                <n-select :options="optAgama" placeholder="Agama" v-model:value="dynamicForm.agama" />
            </n-form-item>
            <n-form-item label="Nama Ibu Kandung" path="ibu_kandung">
                <n-input placeholder="Nama Ibu Kandung" v-model:value="dynamicForm.ibu_kandung" />
            </n-form-item>
            <n-form-item label="Nama Pasangan" path="pasangan">
                <n-input placeholder="Nama Pasangan" v-model:value="dynamicForm.nama_pasangan" />
            </n-form-item>
            <n-form-item label="Jumlah Tanggungan" path="tanggungan">
                <n-input placeholder="Jumlah Tanggungan" v-model:value="dynamicForm.tanggungan" />
            </n-form-item>
            <n-form-item label="No Handphone" path="handphone">
                <n-input placeholder="No Handphone" v-model:value="dynamicForm.telp" />
            </n-form-item>
            <n-form-item label="Email" path="email">
                <n-input placeholder="Email" v-model:value="dynamicForm.email" />
            </n-form-item>
            <n-form-item label="Rekening" path="rekening">
                <n-input placeholder="Rekening" v-model:value="dynamicForm.no_rek_tf" />
            </n-form-item>
            <n-form-item label="NPWP" path="npwp">
                <n-input placeholder="NPWP" v-model:value="dynamicForm.npwp" />
            </n-form-item>
            <n-form-item label="Pendidikan" path="pendidikan">
                <n-input placeholder="Pendidikan" v-model:value="dynamicForm.pendidikan" />
            </n-form-item>
            <n-form-item label="Jurusan" path="jurusan">
                <n-input placeholder="Jurusan" v-model:value="dynamicForm.jurusan" />
            </n-form-item>
            <n-form-item label="IPK" path="ipk">
                <n-input placeholder="IPK" v-model:value="dynamicForm.ipk" />
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
    nama: "Hayabusa",
    blood_type: "A",
    gender: "gk jelas",
    pendidikan: "militer",
    universitas: "itb",
    jurusan: "bandung",
    ipk: "4.5",
    ibu_kandung: "mama",
    status_karyawan: "selamanya",
    nama_pasangan: "asdsad",
    tanggungan: "banyak",
    no_ktp: "2155341245",
    nama_ktp: "siapa",
    alamat_ktp: "dmna aja",
    rt_ktp: "010",
    rw_ktp: "020",
    provinsi_ktp: "jawa barat",
    kota_ktp: "cirebon",
    kelurahan_ktp: "kecapi",
    kecamatan_ktp: "harjamukti",
    kode_pos_ktp: "25215",
    alamat_tinggal: "Jl.Iskandar Muda",
    rt: "001",
    rw: "002",
    provinsi: "Jakarta",
    kota: "Jakarta",
    kelurahan: "Dadap",
    kecamatan: "Kosambi",
    kode_pos: "255416",
    tgl_lahir: "1945-08-17",
    tempat_lahir: "Belanda",
    agama: "setan",
    telp: "124141",
    hp: "41542454",
    no_rek_cf: "2522525",
    no_rek_tf: "4521525",
    email: "ajkah@gmail.com",
    npwp: "12521545",
    sumber_loker: "IG",
    ket_loker: "Loker",
    interview: "asaas",
    tgl_keluar: "2024-02-02",
    alasan_keluar: "gaji tinggi",
    cuti: "50",
    photo_loc: "",
    spv_id: "",
    status_mst: "Active"
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
        api: 'karyawan',
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