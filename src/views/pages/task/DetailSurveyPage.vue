<template>
    <n-result v-show="suspense" status="404" title="404 Not Found" description="halaman yang anda minta tidak ada !">
        <template #footer>
            <n-button @click="router.replace('/dashboard')">Kembali ke Awal</n-button>
        </template>
    </n-result>
    <n-tabs v-show="!suspense" default-value="order" v-for="data in pageData" type="line" animated>
        <n-tab-pane name="order" tab="Order">
            <n-card>
                <n-descriptions title="Data Order & Pelanggan" column="2" label-class="bg-sfd/60">
                    <n-descriptions-item label="Tujuan Kredit">
                        {{ cekField(data.data_order.tujuan_kredit) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Plafond">
                        {{ cekField(data.data_order.plafond) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Tenor">
                        {{ cekField(data.data_order.tenor) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Kategori">
                        {{ cekField(data.data_order.kategory) }}
                    </n-descriptions-item>
                </n-descriptions>
                <n-divider title-placement="left">
                    Pelanggan
                </n-divider>
                <n-descriptions label-class="bg-sfd/60">
                    <n-descriptions-item label="Nama">
                        {{ cekField(data.data_nasabah.nama) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Tanggal Lahir">
                        {{ cekField(data.data_nasabah.tgl_lahir) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="No Handphone">
                        {{ cekField(data.data_nasabah.no_hp) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="No KTP">
                        {{ cekField(data.data_nasabah.no_ktp) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Alamat">
                        {{ cekField(data.data_nasabah.alamat) }}
                        RT. {{ cekField(data.data_nasabah.rt) }}/ RW. {{ cekField(data.data_nasabah.rw) }}
                    </n-descriptions-item>
                </n-descriptions>
            </n-card>
        </n-tab-pane>
        <n-tab-pane name="survey" tab="Survey & Jaminan">
            <n-card>
                <n-descriptions title="Data Survey & Jaminan" label-class="bg-sfd/60">
                    <n-descriptions-item label="Tanggal Survey">
                        {{ cekField(data.data_survey.tgl_survey) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Usaha">
                        {{ cekField(data.data_survey.usaha) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Sektor">
                        {{ cekField(data.data_survey.sektor) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Lama Bekerja">
                        {{ cekField(data.data_survey.lama_bekerja) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Jumlah Tanggungan">
                        {{ cekField(data.data_survey.tanggungan) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Penghasilan Pribadi">
                        {{ cekField(data.data_survey.penghasilan_pribadi) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Penghasilan Pasangan">
                        {{ cekField(data.data_survey.penghasilan_pasangan) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Penghasilan Lainnya">
                        {{ cekField(data.data_survey.penghasilan_lainnya) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Catatan Survey">
                        {{ cekField(data.data_survey.catatan_survey) }}
                    </n-descriptions-item>
                </n-descriptions>
                <n-divider title-placement="left">
                    Jaminan
                </n-divider>
                <n-space vertical v-for="jaminan, i in data.jaminan_kendaraan">
                    <n-h6 class="underline">Jaminan #{{ i + 1 }}</n-h6>
                    <n-descriptions label-class="bg-sfd/60">
                        <n-descriptions-item label="Tipe">
                            {{ cekField(jaminan.tipe) }}
                        </n-descriptions-item>
                        <n-descriptions-item label="Merk">
                            {{ cekField(jaminan.merk) }}
                        </n-descriptions-item>
                        <n-descriptions-item label="Tahun">
                            {{ cekField(jaminan.tahun) }}
                        </n-descriptions-item>
                        <n-descriptions-item label="Warna">
                            {{ cekField(jaminan.warna) }}
                        </n-descriptions-item>
                        <n-descriptions-item label="Atas Nama">
                            {{ cekField(jaminan.atas_nama) }}
                        </n-descriptions-item>
                        <n-descriptions-item label="No Polisi">
                            {{ cekField(jaminan.no_polisi) }}
                        </n-descriptions-item>
                        <n-descriptions-item label="No Rangka">
                            {{ cekField(jaminan.no_rangka) }}
                        </n-descriptions-item>
                        <n-descriptions-item label="No Mesin">
                            {{ cekField(jaminan.no_mesin) }}
                        </n-descriptions-item>
                        <n-descriptions-item label="No STNK">
                            {{ cekField(jaminan.no_stnk) }}
                        </n-descriptions-item>
                        <n-descriptions-item label="Nilai Jaminan">
                            {{ cekField(jaminan.nilai) }}
                        </n-descriptions-item>
                    </n-descriptions>
                </n-space>
            </n-card>
        </n-tab-pane>
        <n-tab-pane name="dokumen" tab="Dokumen">
            <n-card>
                <n-divider title-placement="left">
                    Dokumen identitas
                </n-divider>
                <n-card>
                    <n-flex justify="start" v-if="data.dokumen_indentitas.length > 0">
                        <n-flex vertical v-for="dok_identitas in data.dokumen_indentitas">
                            <n-image lazy width="100" :src="dok_identitas.PATH" />
                            <n-tag type="success" size="small" :bordered="false">
                                <template #icon>
                                    <n-icon :component="FileIcon" />
                                </template>
                                {{ dok_identitas.TYPE }} </n-tag>
                        </n-flex>
                    </n-flex>
                    <n-empty description="Tidak ada dokumen identitas" v-else />
                </n-card>
                <n-divider title-placement="left">
                    Dokumen Jaminan
                </n-divider>
                <n-card>
                    <n-flex justify="start" v-if="data.dokumen_jaminan.length > 0">
                        <n-flex vertical v-for="dok_identitas in data.dokumen_indentitas">
                            <n-image lazy width="100" :src="dok_identitas.PATH" />
                            <n-tag type="success" size="small" :bordered="false">
                                <template #icon>
                                    <n-icon :component="FileIcon" />
                                </template>
                                {{ dok_identitas.TYPE }} </n-tag>
                        </n-flex>
                    </n-flex>
                    <n-empty description="Tidak ada dokumen jaminan" v-else />
                </n-card>
                <n-divider title-placement="left">
                    Dokumen Pendukung
                </n-divider>
                <n-card>
                    <n-flex justify="start" v-if="data.dokumen_jaminan.length > 0">
                        <n-flex vertical v-for="dok_identitas in data.dokumen_indentitas">
                            <n-image lazy :src="dok_identitas.PATH" class="w-24 border-b border-2 border-pr h-24" />

                            <n-tag type="success" size="small" :bordered="false">
                                <template #icon>
                                    <n-icon :component="FileIcon" />
                                </template>
                                {{ dok_identitas.TYPE }} </n-tag>
                        </n-flex>
                    </n-flex>
                    <n-empty description="Tidak ada dokumen pendukung" v-else />
                </n-card>
            </n-card>
        </n-tab-pane>
        <template #prefix>
            <n-button tertiary type="success" @click="router.replace('/task/survey')">
                <template #icon>
                    <n-icon><back-icon /></n-icon>
                </template>
            </n-button>
        </template>
        <template #suffix>
            <n-popconfirm :show-icon="false" @positive-click="handlePositiveClick"
                @negative-click="handleNegativeClick">
                <template #activator>
                    <n-button type="success">Konfirmasi</n-button>
                </template>
                <n-input type="textarea" placeholder="keterangan"></n-input>
            </n-popconfirm>
        </template>
    </n-tabs>
</template>
<script setup>
import { ImageRound as FileIcon, ArrowBackOutlined as BackIcon } from "@vicons/material";
import { useRoute } from "vue-router";
import { useMessage } from "naive-ui";

import { useApi } from "../../../helpers/axios";
import { ref } from "vue";
import router from "../../../router";

const message = useMessage();
const suspense = ref(false);
const pageData = ref();
const baseRoute = useRoute();
const idSurvey = baseRoute.params.idsurvey;
const userToken = localStorage.getItem("token");


const response = useApi({
    method: 'GET',
    api: `kunjungan/${idSurvey}`,
    token: userToken
}).then(res => {
    // pageData.value = [res.data.response];
    if (!res.ok) {
        message.error("halaman tidak ditemukan");
        suspense.value = true;
    } else {
        suspense.value = false;
        pageData.value = [res.data.response];
    }
});


const handlePositiveClick = () => {
    message.info('Yes')
}
const handleNegativeClick = () => {
    message.info('No')
}
const cekField = (v) => { return v ? v : 'N/A' }
</script>