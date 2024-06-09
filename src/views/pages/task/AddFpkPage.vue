<template>
    <n-space vertical>
        <n-steps :current="current" :status="currentStatus">
            <n-step title="Pelanggan" />
            <n-step title="Order" />
            <n-step title="Tambahan" />
            <n-step title="Ekstra" />
        </n-steps>
    </n-space>
    <n-space vertical class="pt-4">
        <n-form ref="formRef" :model="model" :rules="rules" label-placement="top" require-mark-placement="right-hanging"
            :size="size" label-width="auto">
            <n-card v-if="current == 1" title="Informasi Pelanggan" :segmented="{
                content: true,
                footer: 'soft'
            }">
                <n-form-item label="Nama" path="nama">
                    <n-input-group>
                        <n-input placeholder="nama" />
                        <n-input placeholder="nama panggilan" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="jenis kelamin" path="jenis_kelamin">
                    <n-input-group>
                        <n-select placeholder="Jenis Kelamin" :options="kategoriKredit" />
                        <n-date-picker v-model:value="timestamp" type="date" placeholder="tanggal lahir" />
                        <n-select placeholder="golongan darah" :options="kategoriKredit" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Status Kawin" path="jenis_kelamin">
                    <n-input-group>
                        <n-select placeholder="Status Kawin" :options="kategoriKredit" />
                        <n-date-picker v-model:value="timestamp" type="date" placeholder="tanggal kawin" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Identitas" path="plafond">
                    <n-input-group>
                        <n-select placeholder="Jenis Identitas" :options="kategoriKredit" />
                        <n-input placeholder="No Identitas" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="No KK" path="plafond">
                    <n-input-group>
                        <n-input placeholder="No Kartu Keluarga" />
                        <n-input placeholder="Warganegara" />
                    </n-input-group>
                </n-form-item>
                <n-divider title-placement="left">
                    Informasi Alamat
                </n-divider>
                <n-form-item label="Alamat Identitas" path="alamat">
                    <n-space>
                        <n-input-group>
                            <n-input placeholder="Alamat" />
                            <n-input placeholder="RT" />
                            <n-input placeholder="RW" />
                        </n-input-group>
                        <n-input-group>
                            <n-input placeholder="Provinsi" />
                            <n-input placeholder="Kecamatan" />
                            <n-input placeholder="Kabupaten" />
                        </n-input-group>
                        <n-input-group>
                            <n-input placeholder="Desa" />
                            <n-input placeholder="Kode POS" />
                        </n-input-group>
                    </n-space>
                </n-form-item>
                <n-form-item label="Alamat Tagih" path="alamat_tagih">
                    <n-space>
                        <n-input-group>
                            <n-input placeholder="Alamat" />
                            <n-input placeholder="RT" />
                            <n-input placeholder="RW" />
                        </n-input-group>
                        <n-input-group>
                            <n-input placeholder="Provinsi" />
                            <n-input placeholder="Kecamatan" />
                            <n-input placeholder="Kabupaten" />
                        </n-input-group>
                        <n-input-group>
                            <n-input placeholder="Desa" />
                            <n-input placeholder="Kode POS" />
                        </n-input-group>
                    </n-space>
                </n-form-item>
                <n-divider title-placement="left">
                    Informasi Pekerjaan
                </n-divider>
                <n-form-item label="Pekerjaan" path="nama">
                    <n-input-group>
                        <n-input placeholder="pekerjaan" />
                        <n-input placeholder="Pekerjaan ID" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Agama" path="agama">
                    <n-select placeholder="agama" :options="tipeKendaraan" />
                </n-form-item>
                <n-form-item label="Pendidikan" path="pendidikan">
                    <n-select placeholder="agama" :options="tipeKendaraan" />
                </n-form-item>
                <n-form-item label="Telepon" path="telepon">
                    <n-input-group>
                        <n-input placeholder="Telepon Rumah" />
                        <n-input placeholder="Telepon Selular" />
                        <n-input placeholder="Telepon Kantor" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Ekstra" path="ekstra">
                    <n-input-group>
                        <n-input placeholder="Ekstra 1" />
                        <n-input placeholder="Ekstra 2" />
                    </n-input-group>
                </n-form-item>

            </n-card>
            <n-card v-if="current == 2" title="Informasi Order" :segmented="{
                content: true,
                footer: 'soft'
            }">
                <n-form-item label="Order" path="order">
                    <n-input-group>
                        <n-date-picker v-model:value="timestamp" type="year" clearable placeholder="Tanggal order" />
                        <n-select placeholder="status order" :options="tipeKendaraan" />
                        <n-select placeholder="tipe" :options="tipeKendaraan" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Pelanggan Group" path="pelanggan_group">
                    <n-input placeholder="Pelanggan Group" />
                </n-form-item>
                <n-form-item label="Unit Bisnis" path="unit_bisnis">
                    <n-input placeholder="Unit bisnis" />
                </n-form-item>
                <n-form-item label="Cust Service" path="cust_service">
                    <n-input placeholder="Cust. Service" />
                </n-form-item>
                <n-form-item label="Reff Pelanggan" path="reff_pelanggan">
                    <n-input placeholder="Reff Pelanggan" />
                </n-form-item>
                <n-form-item label="Surveyor" path="surveyor">
                    <n-input placeholder="Surveyor" />
                </n-form-item>
                <n-form-item label="Catatan Survey" path="cat_survey">
                    <n-input type="textarea" show-count placeholder="catatan surveyor" maxlength="1000" />
                </n-form-item>
                <n-form-item label="Platform" path="platform">
                    <n-input placeholder="Platform" />
                </n-form-item>
                <n-form-item label="Prog. Marketing" path="prog_marketing">
                    <n-input placeholder="Program Marketing" />
                </n-form-item>
                <n-form-item label="Cara Bayar" path="cara_bayar">
                    <n-input placeholder="Cara Bayar" />
                </n-form-item>
                <n-divider />
                <n-form-item label="Nama Ibu Kandung" path="nama_ibu_kandung">
                    <n-input placeholder="Nama" />
                </n-form-item>
                <n-form-item label="Kategori" path="agama">
                    <n-select placeholder="agama" :options="tipeKendaraan" />
                </n-form-item>
                <n-form-item label="pendidikan" path="agama">
                    <n-select placeholder="agama" :options="tipeKendaraan" />
                </n-form-item>
                <n-form-item label="Lama Bekerja" path="lama_kerja">
                    <n-input placeholder="lama bekerja" />
                </n-form-item>
                <n-form-item label="Tanggungan" path="tanggungan">
                    <n-input placeholder="Jumlah Tanggungan" />
                </n-form-item>
                <n-form-item label="Pendapatan" path="pendapatan">
                    <n-input-group>
                        <n-input placeholder="Pribadi" />
                        <n-input placeholder="Pasangan" />
                        <n-input placeholder="Lainnya" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Biaya" path="biaya">
                    <n-input placeholder="Pengeluaran" />
                </n-form-item>
                <n-divider title-placement="left">
                    NPWP
                </n-divider>
                <n-form-item label="No NPWP" path="no_npwp">
                    <n-input placeholder="No NPWP" />
                </n-form-item>
                <n-form-item label="Alamat NPWP" path="alamat">
                    <n-space>
                        <n-input-group>
                            <n-input placeholder="Alamat" />
                            <n-input placeholder="RT" />
                            <n-input placeholder="RW" />
                        </n-input-group>
                        <n-input-group>
                            <n-input placeholder="Provinsi" />
                            <n-input placeholder="Kecamatan" />
                            <n-input placeholder="Kabupaten" />
                        </n-input-group>
                        <n-input-group>
                            <n-input placeholder="Desa" />
                            <n-input placeholder="Kode POS" />
                        </n-input-group>
                    </n-space>
                </n-form-item>
                <n-divider title-placement="left">
                    Barang Taksasi
                </n-divider>
                <n-form-item label="Kode Barang" path="kode_barang">
                    <n-input placeholder="Kode Barang" />
                </n-form-item>
                <n-form-item label="ID Tipe" path="id_tipe">
                    <n-input placeholder="ID Tipe" />
                </n-form-item>
                <n-form-item label="Tahun" path="tahun">
                    <n-input placeholder="Tahun" />
                </n-form-item>
                <n-form-item label="Harga Pasar" path="harga_pasar">
                    <n-input placeholder="Harga Pasar" />
                </n-form-item>
            </n-card>
            <n-card v-if="current == 3" title="Informasi Tambahan" :segmented="{
                content: true,
                footer: 'soft'
            }">
                <n-form-item label="Nama BI" path="nama_bi">
                    <n-input placeholder="Nama BI" />
                </n-form-item>
                <n-form-item label="Email" path="email">
                    <n-input placeholder="Email" />
                </n-form-item>
                <n-form-item label="Info Khusus" path="info_khusus">
                    <n-input placeholder="Info Khusus" />
                </n-form-item>
                <n-form-item label="Usaha Lain 1" path="usaha_lain1">
                    <n-input placeholder="Usaha Lain 1" />
                </n-form-item>
                <n-form-item label="Usaha Lain 2" path="usaha_lain2">
                    <n-input placeholder="Usaha Lain 2" />
                </n-form-item>
                <n-form-item label="Usaha Lain 3" path="usaha_lain3">
                    <n-input placeholder="Usaha Lain 3" />
                </n-form-item>
                <n-form-item label="Usaha Lain 4" path="usaha_lain4">
                    <n-input placeholder="Usaha Lain 4" />
                </n-form-item>
                <n-divider title-placement="left">
                    Kerabat dalam kondisi darurat
                </n-divider>
                <n-form-item label="Nama Kerabat" path="nama_kerabat">
                    <n-input placeholder="Nama Kerbat" />
                </n-form-item>
                <n-form-item label="Alamat" path="alamat">
                    <n-space>
                        <n-input-group>
                            <n-input placeholder="Alamat" />
                            <n-input placeholder="RT" />
                            <n-input placeholder="RW" />
                        </n-input-group>
                        <n-input-group>
                            <n-input placeholder="Provinsi" />
                            <n-input placeholder="Kecamatan" />
                            <n-input placeholder="Kabupaten" />
                        </n-input-group>
                        <n-input-group>
                            <n-input placeholder="Desa" />
                            <n-input placeholder="Kode POS" />
                        </n-input-group>
                    </n-space>
                </n-form-item>
                <n-form-item label="Telepon" path="nama_kerabat">
                    <n-input-group>
                        <n-input placeholder="Telepon Rumah" />
                        <n-input placeholder="Telepon Selular" />
                    </n-input-group>
                </n-form-item>
                <n-divider title-placement="left">
                    Informasi Surat
                </n-divider>
                <n-form-item label="Alamat Surat" path="alamat">
                    <n-space>
                        <n-input-group>
                            <n-input placeholder="Alamat" />
                            <n-input placeholder="RT" />
                            <n-input placeholder="RW" />
                        </n-input-group>
                        <n-input-group>
                            <n-input placeholder="Provinsi" />
                            <n-input placeholder="Kecamatan" />
                            <n-input placeholder="Kabupaten" />
                        </n-input-group>
                        <n-input-group>
                            <n-input placeholder="Desa" />
                            <n-input placeholder="Kode POS" />
                        </n-input-group>
                    </n-space>
                </n-form-item>
                <n-divider title-placement="left">
                    Informasi Bank
                </n-divider>
                <n-dynamic-input v-model:value="customValue" :on-create="onCreate">
                    <template #create-button-default>
                        Tambah data bank
                    </template>
                    <template #default="{ value }">
                        <div style="display: flex; align-items: center; width: 100%">
                            <n-checkbox v-model:checked="value.isCheck" style="margin-right: 12px" />
                            <n-input-number v-model:value="value.num" style="margin-right: 12px; width: 160px" />
                            <n-input v-model:value="value.string" type="text" />
                        </div>
                    </template>
                </n-dynamic-input></n-card>
            <n-card v-if="current == 4" title="Data Ekstra" :segmented="{
                content: true,
                footer: 'soft'
            }">
                <n-form-item label="Tanggal survey" path="tgl_survey">
                    <n-input v-model:value="timestamp" placeholder="pokok pembayaran" />
                </n-form-item>
                <n-form-item label="Tipe Angsuran" path="tipe_angsuran">
                    <n-input v-model:value="timestamp" placeholder="pokok pembayaran" />
                </n-form-item>
                <n-form-item label="Cara Pembayaraan" path="cara_bayar">
                    <n-select placeholder="Cara Pembayaran" :options="tipeKendaraan" />
                </n-form-item>
                <n-form-item label="Periode" path="periode">
                    <n-select placeholder="periode" :options="tipeKendaraan" />
                </n-form-item>
                <n-form-item label="Angsuran" path="angsuran">
                    <n-input v-model:value="timestamp" placeholder="angsuran" />
                </n-form-item>
                <n-form-item label="Total Admin" path="total_admin">
                    <n-input v-model:value="timestamp" placeholder="Total Admin" />
                </n-form-item>
                <n-form-item label="Cadangan" path="cadangan">
                    <n-input v-model:value="timestamp" placeholder="Cadangan" />
                </n-form-item>
                <n-form-item label="Biaya Broker" path="biaya_broker">
                    <n-input v-model:value="timestamp" placeholder="Cadangan" />
                </n-form-item>
                <n-form-item label="Provisi" path="provisi">
                    <n-input v-model:value="timestamp" placeholder="Provisi" />
                </n-form-item>
                <n-form-item label="Asuransi" path="asuransi">
                    <n-input v-model:value="timestamp" placeholder="Asuransi" />
                </n-form-item>
                <n-form-item label="Biaya Transfer" path="biaya_transfer">
                    <n-input v-model:value="timestamp" placeholder="Biaya Transfer" />
                </n-form-item>
                <n-form-item label="Bunga / Margin Eff" path="bunga_margin_eff">
                    <n-input v-model:value="timestamp" placeholder="Bunga / Margin Eff" />
                </n-form-item>
                <n-form-item label="Bunga / Margin Flat" path="bunga_margin_flat">
                    <n-input v-model:value="timestamp" placeholder="Bunga / Margin Flat" />
                </n-form-item>
                <n-divider />
                <n-form-item label="Bunga / Margin" path="bunga_margin">
                    <n-input v-model:value="timestamp" placeholder="Bunga / Margin" />
                </n-form-item>
                <n-form-item label="Pokok + Margin" path="pokok_margin">
                    <n-input v-model:value="timestamp" placeholder="Pokok + Margin" />
                </n-form-item>
                <n-form-item label="Angsuran Terkahir" path="angsuran_terakhir">
                    <n-input v-model:value="timestamp" placeholder="Angsuran Terakhir" />
                </n-form-item>
                <n-form-item label="Bunga / Margin Eff Actual" path="bunga_margin_eff_actual">
                    <n-input v-model:value="timestamp" placeholder="Bunga / Margin Eff Actual" />
                </n-form-item>
                <n-form-item label="Bunga / Margin Eff Flat" path="bunga_margin_eff_flat">
                    <n-input v-model:value="timestamp" placeholder="Bunga / Margin Eff Flat" />
                </n-form-item>
                <n-form-item label="Provisi" path="provisi">
                    <n-input v-model:value="timestamp" placeholder="Provisi" />
                </n-form-item>
                <n-form-item label="Nett Admin" path="net_admin">
                    <n-input v-model:value="timestamp" placeholder="Net Admin" />
                </n-form-item>
                <n-form-item label="Nilai yang diterima" path="nilai_diterima">
                    <n-input v-model:value="timestamp" placeholder="Nilai yang diterima" size="large" />
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
            <n-button @click="next" type="primary" v-if="current != 4">
                <template #icon>
                    <n-icon>
                        <arrow-forward />
                    </n-icon>
                </template>
                Selanjutnya
            </n-button>
            <n-button @click="next" type="info" v-if="current == 4">
                <template #icon>
                    <n-icon>
                        <save-icon />
                    </n-icon>
                </template>
                Simpan
            </n-button>
            <n-button @click="next" type="primary" v-if="current == 4">
                <template #icon>
                    <n-icon>
                        <send-icon />
                    </n-icon>
                </template>
                Kirim
            </n-button>
        </n-flex>
    </n-space>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ArrowBackOutlined as ArrowBack, ArrowForwardOutlined as ArrowForward, SendRound as SendIcon, SaveAsOutlined as SaveIcon } from "@vicons/material";
import { useRoute } from "vue-router";
import { useMessage } from "naive-ui";
import { useApi } from "../../../helpers/axios";

const message = useMessage();
const baseRoute = useRoute();
const dynamicForm = reactive({
    pelanggan: {
        nama: '',
        nama_panggilan: '',
        jenis_kelamin: '',
        tgl_lahir: '',
        gol_darah: '',
        status_kawin: '',
        tgl_kawin: '',
        tipe_identitas: '',
        no_identitas: '',
        no_kk: '',
        warganegara: '',
    },
    alamat_identitas: {
        alamat: '',
        rt: '',
        rw: '',
        provinsi: '',
        kecamatan: '',
        kabupaten: '',
        desa: '',
        kode_pos: ''
    },
    alamat_tagih: {
        alamat: '',
        rt: '',
        rw: '',
        provinsi: '',
        kecamatan: '',
        kabupaten: '',
        desa: '',
        kode_pos: ''
    },
    pekerjaan: {
        pekerjaan: '',
        pekerjaan_id: '',
        agama: '',
        pendidikan: '',
        telepon_rumah: '',
        telepon_selular: '',
        telepon_kantor: '',
        ekstra1: '',
        ekstra2: ''
    },
    order: {
        tgl_order: '',
        status_order: '',
        tipe_order: '',
        pelanggan_group: '',
        unit_bisnis: '',
        cust_service: '',
        reff_pelanggan: '',
        surveyor: '',
        catatan_survey: '',
        platform: '',
        prog_marketing: '',
        cara_bayar: '',
        nama_ibu_kandung: '',
        kategori: '',
        pendidikan: '',
        lama_bekerja: '',
        jml_tanggungan: '',
        pendapatan_pribadi: '',
        pendapatan_pasangan: '',
        pendapatan_lainnya: '',
        pengeluaran: '',
    },
    npwp: {
        no: '',
        alamat: '',
        rt: '',
        rw: '',
        provinsi: '',
        kecamatan: '',
        kabupaten: '',
        desa: '',
        kode_pos: ''
    },
    barang_taksasi: {
        kode_barang: '',
        id_tipe: '',
        tahun: '',
        harga_pasar: '',
    },
    tambahan: {
        nama_bi: '',
        email: '',
        info_khusus: '',
        usaha_lain1: '',
        usaha_lain2: '',
        usaha_lain3: '',
        usaha_lain4: '',
    },
    kerabat_darurat: {
        nama: '',
        alamat: '',
        rt: '',
        rw: '',
        provinsi: '',
        kecamatan: '',
        kabupaten: '',
        desa: '',
        kode_pos: ''
    },
    info_bank: [{

    }],
    ekstra: {
        pokok_pembayaran: '',
        tipe_angsuran: '',
        cara_pembayaran: '',
        periode: '',
        angsuran: '',
        provisi: '',
        asuransi: '',
        biaya_transfer: '',
        bunga_margin_eff: '',
        bunga_margin_flat: '',
        bunga_margin: '',
        pokok_margin: '',
        angsuran_terakhir: '',
        bunga_margin_eff_actual: '',
        bunga_margin_eff_flat: '',
        nett_admin: '',
        nilai_yang_diterima: ''
    }
});
const pageData = ref();
const suspense = ref(false);
const current = ref(1);
const idApplication = baseRoute.params.idapplication;
const userToken = localStorage.getItem("token");

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


const dynamicBody = {
    cr_prospect_id: idApplication,
}
const response = useApi({
    method: 'POST',
    api: 'cr_application',
    data: dynamicBody,
    token: userToken
}).then(res => {
    console.log(dynamicBody);
    // pageData.value = [res.data.response];
    if (!res.ok) {
        message.error("halaman tidak ditemukan");
        suspense.value = true;
    } else {
        message.success("halaman ditemukan");
        suspense.value = false;
        pageData.value = [res.data.response];
    }
});
</script>