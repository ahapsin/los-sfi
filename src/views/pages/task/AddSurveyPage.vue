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
                                        <n-input placeholder="plafond" />
                                </n-form-item>
                                <n-form-item label="Tujuan Kredit" path="tujuan_kredit">
                                        <n-select placeholder="Tujuan Kredit" :options="tujuanKredit" />
                                </n-form-item>
                                <n-form-item label="Tenor Kredit" path="tenor">
                                        <n-select placeholder="Tenor Kredit" :options="tenorKredit" />
                                </n-form-item>
                                <n-form-item label="Kategori Kredit" path="tenor">
                                        <n-select placeholder="Kategori Kredit" :options="kategoriKredit" />
                                </n-form-item>
                        </n-card>
                        <n-card v-if="current == 2" title="Data Pelanggan" :segmented="{
                                content: true,
                                footer: 'soft'
                        }">
                                <n-form-item label="No KTP" path="no_ktp">
                                        <n-input placeholder="NO KTP" />
                                </n-form-item>
                                <n-form-item label="Nama" path="nama">
                                        <n-input placeholder="Nama" />
                                </n-form-item>
                                <n-form-item label="Tanggal lahir" path="tgl_lahir">
                                        <n-date-picker v-model:value="timestamp" type="date" />
                                </n-form-item>
                                <n-form-item label="Alamat" path="alamat">
                                        <n-input-group>
                                                <n-input placeholder="Alamat" />
                                                <n-input placeholder="RT" />
                                                <n-input placeholder="RW" />
                                        </n-input-group>
                                </n-form-item>
                                <n-form-item label="No Handphone" path="HP">
                                        <n-input placeholder="No Handphone" />
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
                                        <n-select placeholder="Tipe Kendaraan" :options="tipeKendaraan" />
                                </n-form-item>
                                <n-form-item label="Tahun" path="tahun_kendaraan">
                                        <n-date-picker v-model:value="timestamp" type="year" clearable />
                                </n-form-item>
                                <n-form-item label="Warna" path="warna">
                                        <n-input placeholder="warna" />
                                </n-form-item>
                                <n-form-item label="Atas Nama" path="atas_nama">
                                        <n-input placeholder="Atas Nama" />
                                </n-form-item>
                                <n-form-item label="Nilai Jaminan" path="nilai_jaminan">
                                        <n-input placeholder="Nilai Jaminan" />
                                </n-form-item>
                                <n-form-item label="NO Polisi" path="no_polisi">
                                        <n-input placeholder="No Polisi" />
                                </n-form-item>
                                <n-form-item label="NO Rangka" path="no_rangka">
                                        <n-input placeholder="No Rangka" />
                                </n-form-item>
                                <n-form-item label="NO Mesin" path="no_mesin">
                                        <n-input placeholder="No Mesin" />
                                </n-form-item>
                                <n-form-item label="NO STNK" path="no_stnk">
                                        <n-input placeholder="No STNK" />
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
                                        <n-date-picker v-model:value="timestamp" type="date" />
                                </n-form-item>

                                <n-form-item label="Lama Bekerja" path="lama_berkerja">
                                        <n-input placeholder="lama bekerja">
                                                <template #suffix>
                                                        bulan
                                                </template>
                                        </n-input>
                                </n-form-item>
                                <n-form-item label="Pendapatan Pelanggan" path="pendapatan_pelanggan">
                                        <n-input placeholder="pendapatan pelanggan">
                                                <template #suffix>
                                                        perbulan
                                                </template>
                                        </n-input>
                                </n-form-item>
                                <n-form-item label="Pendapatan Pasangan" path="pendapatan_pasangan">
                                        <n-input placeholder="pendaptan pasangan">
                                                <template #suffix>
                                                        perbulan
                                                </template>
                                        </n-input>
                                </n-form-item>
                                <n-form-item label="Pendapatan Lain-lain" path="pendapatan_lain">
                                        <n-input placeholder="pendapatan lain-lain">
                                                <template #suffix>
                                                        perbulan
                                                </template>
                                        </n-input>
                                </n-form-item>
                                <n-form-item label="Pengeluaran" path="pengeluaran">
                                        <n-input placeholder="pengeluaran">
                                                <template #suffix>
                                                        perbulan
                                                </template>
                                        </n-input>
                                </n-form-item>
                                <n-form-item label="Usaha" path="usaha">
                                        <n-input placeholder="usaha" />
                                </n-form-item>
                                <n-form-item label="Sektor" path="sektor">
                                        <n-input placeholder="sektor" />
                                </n-form-item>

                        </n-card>
                </n-form>

                <n-flex justify="between">
                        <n-button @click="prev" type="secondary">
                                <template #icon>
                                        <n-icon>
                                                <arrow-back />
                                        </n-icon>
                                </template>
                                kembali
                        </n-button>
                        <n-button @click="next" type="primary">
                                <template #icon>
                                        <n-icon>
                                                <arrow-forward />
                                        </n-icon>
                                </template>
                                Selanjutnya
                        </n-button>
                </n-flex>
        </n-space>
</template>

<script setup>
import { ref } from "vue";
import { ArrowBackOutlined as ArrowBack, ArrowForwardOutlined as ArrowForward } from "@vicons/material";
const current = ref(1);

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
const kategoriKredit = ["biaya kuliah", "investasi"].map(
        (v) => ({
                label: v,
                value: v
        }));
</script>