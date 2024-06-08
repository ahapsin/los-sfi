<template>
        <n-space vertical>
                <n-steps :current="current" :status="currentStatus">
                        <n-step title="Informasi Order" />
                        <n-step title="Data Pelanggan" />
                        <n-step title="Data Jaminan" />
                        <n-step title="Data Survey" />
                </n-steps>
        </n-space>
        <n-space vertical class="pt-4">
                <n-form ref="formRef" :model="model" :rules="rules" label-placement="left"
                        require-mark-placement="right-hanging" :size="size" label-width="auto">
                        <n-card v-if="current == 1" title="Informasi Kredit" :segmented="{
                                content: true,
                                footer: 'soft'
                        }">
                                <n-form-item label="plafond" path="plafond">
                                        <n-input placeholder="plafond" v-model:value="order.plafond" />
                                </n-form-item>
                                <n-form-item label="Tujuan Kredit" path="tujuan_kredit">
                                        <n-select placeholder="Tujuan Kredit" :options="tujuanKredit"
                                                v-model:value="order.tujuan_kredit" />
                                </n-form-item>
                                <n-form-item label="Tenor Kredit" path="tenor">
                                        <n-select placeholder="Tenor Kredit" :options="tenorKredit"
                                                v-model:value="order.tenor" />
                                </n-form-item>
                                <n-form-item label="Kategori Kredit" path="category">
                                        <n-select placeholder="Kategori Kredit" :options="kategoriKredit"
                                                v-model:value="order.category" />
                                </n-form-item>
                        </n-card>
                        <n-card v-if="current == 2" title="Data Pelanggan" :segmented="{
                                content: true,
                                footer: 'soft'
                        }">
                                <n-form-item label="No KTP" path="no_ktp">
                                        <n-input placeholder="NO KTP" v-model:value="pelanggan.no_ktp" />
                                </n-form-item>
                                <n-form-item label="Nama" path="nama">
                                        <n-input placeholder="Nama" v-model:value="pelanggan.nama" />
                                </n-form-item>
                                <n-form-item label="Tanggal lahir" path="tgl_lahir">
                                        <n-date-picker v-model:formatted-value="pelanggan.tgl_lahir"
                                                value-format="yyyy-MM-dd" type="date" />
                                </n-form-item>
                                <n-form-item label="Alamat" path="alamat">
                                        <n-input-group>
                                                <n-input placeholder="Alamat"
                                                        v-model:value="pelanggan.data_alamat.alamat" />
                                                <n-input placeholder="RT" v-model:value="pelanggan.data_alamat.rt" />
                                                <n-input placeholder="RW" v-model:value="pelanggan.data_alamat.rw" />
                                        </n-input-group>
                                </n-form-item>
                                <n-form-item label="No Handphone" path="HP">
                                        <n-input placeholder="No Handphone" v-model:value="pelanggan.no_hp" />
                                </n-form-item>
                                <n-divider title-placement="left">
                                        Dokumen Identitas
                                </n-divider>
                                <n-space>
                                        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                                                :default-file-list="fileList" list-type="image-card">
                                                Upload KTP
                                        </n-upload>
                                        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                                                :default-file-list="fileList" list-type="image-card">
                                                Upload KTP Pasangan
                                        </n-upload>
                                        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                                                :default-file-list="fileList" list-type="image-card">
                                                Upload Kartu keluarga
                                        </n-upload>
                                </n-space>
                        </n-card>
                        <n-card v-if="current == 3" title="Data Jaminan" :segmented="{
                                content: true,
                                footer: 'soft'
                        }">
                                <n-form-item label="Tipe Kendaraan" path="tipe_kendaraan">
                                        <n-select placeholder="Tipe Kendaraan" :options="tipeKendaraan"
                                                v-model:value="jaminan.tipe" />
                                </n-form-item>
                                <n-form-item label="Tahun" path="tahun_kendaraan">
                                        <n-date-picker v-model:formatted-value="jaminan.tahun" value-format="yyyy"
                                                type="year" clearable />
                                </n-form-item>
                                <n-form-item label="Warna" path="warna">
                                        <n-input placeholder="warna" v-model:value="jaminan.warna" />
                                </n-form-item>
                                <n-form-item label="Atas Nama" path="atas_nama">
                                        <n-input placeholder="Atas Nama" v-model:value="jaminan.atas_nama" />
                                </n-form-item>
                                <n-form-item label="Nilai Jaminan" path="nilai_jaminan">
                                        <n-input placeholder="Nilai Jaminan" v-model:value="jaminan.nilai" />
                                </n-form-item>
                                <n-form-item label="NO Polisi" path="no_polisi">
                                        <n-input placeholder="No Polisi" v-model:value="jaminan.no_polisi" />
                                </n-form-item>
                                <n-form-item label="NO Rangka" path="no_rangka">
                                        <n-input placeholder="No Rangka" v-model:value="jaminan.no_rangka" />
                                </n-form-item>
                                <n-form-item label="NO Mesin" path="no_mesin">
                                        <n-input placeholder="No Mesin" v-model:value="jaminan.no_mesin" />
                                </n-form-item>
                                <n-form-item label="NO STNK" path="no_stnk">
                                        <n-input placeholder="No STNK" v-model:value="jaminan.no_bpkb" />
                                </n-form-item>
                                <n-divider title-placement="left">
                                        Dokumen Jaminan
                                </n-divider>
                                <n-space>
                                        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                                                :default-file-list="fileList" list-type="image-card">
                                                NO Rangka
                                        </n-upload>
                                        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                                                :default-file-list="fileList" list-type="image-card">
                                                NO Mesin
                                        </n-upload>
                                        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                                                :default-file-list="fileList" list-type="image-card">
                                                STNK
                                        </n-upload>
                                </n-space>
                                <n-divider />
                                <n-space>
                                        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                                                :default-file-list="fileList" list-type="image-card">
                                                Tampak Depan
                                        </n-upload>
                                        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                                                :default-file-list="fileList" list-type="image-card">
                                                Tampak Belakang
                                        </n-upload>
                                        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                                                :default-file-list="fileList" list-type="image-card">
                                                Tampak Kanan
                                        </n-upload>
                                        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                                                :default-file-list="fileList" list-type="image-card">
                                                Tampak Kiri
                                        </n-upload>
                                </n-space>
                        </n-card>
                        <n-card v-if="current == 4" title="Data Survey" :segmented="{
                                content: true,
                                footer: 'soft'
                        }">
                                <n-form-item label="Tanggal survey" path="tgl_survey">
                                        <n-date-picker v-model:formatted-value="survey.tgl_survey"
                                                value-format="yyyy-MM-dd" type="date" clearable />
                                </n-form-item>

                                <n-form-item label="Lama Bekerja" path="lama_berkerja">
                                        <n-input placeholder="lama bekerja" v-model:value="survey.lama_bekerja">
                                                <template #suffix>
                                                        bulan
                                                </template>
                                        </n-input>
                                </n-form-item>
                                <n-form-item label="Pendapatan Pelanggan" path="pendapatan_pelanggan">
                                        <n-input placeholder="pendapatan pelanggan"
                                                v-model:value="survey.penghasilan.pribadi">
                                                <template #suffix>
                                                        perbulan
                                                </template>
                                        </n-input>
                                </n-form-item>
                                <n-form-item label="Pendapatan Pasangan" path="pendapatan_pasangan">
                                        <n-input placeholder="pendaptan pasangan"
                                                v-model:value="survey.penghasilan.pasangan">
                                                <template #suffix>
                                                        perbulan
                                                </template>
                                        </n-input>
                                </n-form-item>
                                <n-form-item label="Pendapatan Lain-lain" path="pendapatan_lain">
                                        <n-input placeholder="pendapatan lain-lain"
                                                v-model:value="survey.penghasilan.lainnya">
                                                <template #suffix>
                                                        perbulan
                                                </template>
                                        </n-input>
                                </n-form-item>
                                <n-form-item label="Pengeluaran" path="pengeluaran">
                                        <n-input placeholder="pengeluaran" v-model:value="survey.pengeluaran">
                                                <template #suffix>
                                                        perbulan
                                                </template>
                                        </n-input>
                                </n-form-item>
                                <n-form-item label="Usaha" path="usaha">
                                        <n-input placeholder="usaha" v-model:value="survey.usaha" />
                                </n-form-item>
                                <n-form-item label="Sektor" path="sektor">
                                        <n-input placeholder="sektor" v-model:value="survey.sektor" />
                                </n-form-item>
                                <n-form-item label="Catatan Survey" path="cat_survey">
                                        <n-input v-model:value="survey.catatan_survey" type="textarea"
                                                placeholder="Basic Textarea" />
                                </n-form-item>
                        </n-card>
                </n-form>
                <!-- <n-space>
                        <n-card>
                                <pre>
                        {{ dynamicForm }}
                </pre>
                        </n-card>
                </n-space> -->

                <n-flex justify="between">
                        <n-button @click="prev" type="secondary">
                                <template #icon>
                                        <n-icon>
                                                <arrow-back />
                                        </n-icon>
                                </template>
                                kembali
                        </n-button>
                        <n-button @click="next" type="primary" v-if="current < 3">
                                <template #icon>
                                        <n-icon>
                                                <arrow-forward />
                                        </n-icon>
                                </template>
                                Selanjutnya
                        </n-button>
                        <n-button :loading="loading" icon-placement="left" type="primary" @click="handleSave" v-else>
                                simpan
                        </n-button>
                </n-flex>
        </n-space>

</template>

<script setup>
import { ref, reactive } from "vue";
import { v4 as uuidv4 } from 'uuid';
import { ArrowBackOutlined as ArrowBack, ArrowForwardOutlined as ArrowForward } from "@vicons/material";
import { useMessage } from "naive-ui";
import router from '../../../router';
import { useApi } from "../../../helpers/axios";
import { useAPIPost } from "../../../helpers/axios";

const message = useMessage();
const current = ref(1);
const loading = ref(false);

const currentStatus = ref("process");

const next = () => current.value += 1;
const prev = () => current.value -= 1;

const tujuanKredit = ["konsumsi", "investasi"].map(
        (v) => ({
                label: v,
                value: v
        }));
const tenorKredit = ["12", "24", "36"].map(
        (v) => ({
                label: v,
                value: v
        }));
const kategoriKredit = ["kategori 1", "kategori 2"].map(
        (v) => ({
                label: v,
                value: v
        }));
const tipeKendaraan = ["motor", "mobil"].map(
        (v) => ({
                label: v,
                value: v
        }));
const order = ref({
        tujuan_kredit: "fsdf",
        plafond: "2452",
        tenor: "255",
        category: "jasfjajj"
});
const pelanggan = reactive({
        nama: "asdasd",
        no_ktp: "545287215",
        no_hp: "",
        tgl_lahir: "2024-06-06",
        data_alamat: {
                alamat: "a",
                rt: "rt",
                rw: "rw",
                provinsi: "",
                kota: "",
                kecamatan: "",
                kelurahan: ""
        }
});
const jaminan = ref({
        tipe: "t",
        tahun: "2024",
        merk: "m",
        warna: "w",
        atas_nama: "a",
        no_polisi: "np",
        no_rangka: "nr",
        no_mesin: "nm",
        no_bpkb: "nb",
        nilai: "n"
});
const survey = reactive({
        lama_bekerja: "1",
        penghasilan: {
                pribadi: "1",
                pasangan: "1",
                lainnya: "1"
        },
        pengeluaran: "1",
        usaha: "apa",
        sektor: "s",
        catatan_survey: "c",
        tgl_survey: null,
});
const dynamicForm = reactive({
        id: uuidv4(),
        order: order.value,
        data_nasabah: pelanggan,
        data_survey: survey,
        jaminan_kendaraan: jaminan.value
});

const handleSave = async (e) => {
        e.preventDefault(e);
        // formRef.value?.validate((errors) => {
        //         if (errors) {
        //                 loading.value = false
        //         }
        // });
        loading.value = true;
        let userToken = localStorage.getItem("token");
        const response = await useApi({
                method: 'POST',
                api: 'kunjungan',
                data: dynamicForm,
                token: userToken
        });
        if (!response.ok) {
                message.error("data gagal disimpan");
                loading.value = false;
        } else {
                message.success("data berhasil disimpan");
                loading.value = false;
                router.push('dashboard');
        }
        // let post = useAPIPost('kunjungan', dynamicForm, userToken).then(([res]) => {
        //         loading.value = false;
        //         router.push('dashboard');
        // });

}
</script>