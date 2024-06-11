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
                        <n-input placeholder="nama" v-model:value="dynamicForm.pelanggan.nama" />
                        <n-input placeholder="nama panggilan" v-model:value="dynamicForm.pelanggan.nama_panggilan" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="jenis kelamin" path="jenis_kelamin">
                    <n-input-group>
                        <n-select placeholder="Jenis Kelamin" :options="optJenisKelamin" />
                        <!-- <n-date-picker placeholder="Tanggal Lahir"
                            v-model:formatted-value="dynamicForm.pelanggan.tgl_lahir" value-format="yyyy-MM-dd"
                            type="date" /> -->
                        <n-input placeholder="golongan darah" v-model:value="dynamicForm.pelanggan.gol_darah" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Status Kawin" path="jenis_kelamin">
                    <n-input-group>
                        <n-select placeholder="Status Kawin" :options="optStatusKawin" />
                        <!-- <n-date-picker placeholder="Tanggal Kawin"
                            v-model:formatted-value="dynamicForm.pelanggan.tgl_kawin" value-format="yyyy-MM-dd"
                            type="date" /> -->
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Identitas" path="plafond">
                    <n-input-group>
                        <n-select placeholder="Jenis Identitas" :options="optJenisIdentitas" />
                        <n-input placeholder="No Identitas" v-model:value="dynamicForm.pelanggan.no_identitas" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="No KK" path="plafond">
                    <n-input-group>
                        <n-input placeholder="No Kartu Keluarga" v-model:value="dynamicForm.pelanggan.no_kk" />
                        <n-input placeholder="Warganegara" v-model:value="dynamicForm.pelanggan.warganegara" />
                    </n-input-group>
                </n-form-item>
                <n-divider title-placement="left">
                    Dokumen
                </n-divider>
                <n-space>
                    <n-image v-for="attachment in dynamicForm.attachment" :key="attachment"
                        class="w-24 border-b border-2 border-pr h-24" :src="attachment.PATH"></n-image>
                    <n-upload :data="{ 'type': 'ktp' }" list-type="image-card" :custom-request="handleImagePost">
                    </n-upload>
                </n-space>
                <n-divider title-placement="left">
                    Informasi Alamat Identitas
                </n-divider>
                <n-form-item label="Alamat" path="alamat">
                    <n-input-group>
                        <n-input placeholder="Alamat" v-model:value="dynamicForm.alamat_identitas.alamat" />
                        <n-input placeholder="RT" v-model:value="dynamicForm.alamat_identitas.rt">
                            <template #prefix>RT</template>
                        </n-input>
                        <n-input placeholder="RW" v-model:value="dynamicForm.alamat_identitas.rw">
                            <template #prefix>RW</template>
                        </n-input>
                    </n-input-group>
                </n-form-item>
                <select-state-region v-model:provinsi="dynamicForm.provinsi" v-model:kota="dynamicForm.kota"
                    v-model:kecamatan="dynamicForm.kecamatan" v-model:desa="dynamicForm.kelurahan" />
                <n-form-item label="Kode Pos" path="desa">
                    <n-input placeholder="Kode Pos" />
                </n-form-item>
                <n-divider title-placement="left">
                    Informasi Alamat Tagih
                </n-divider>

                <n-form-item label="Alamat">
                    <n-input-group>
                        <n-input placeholder="Alamat" v-model:value="dynamicForm.alamat_tagih.alamat" />
                        <n-input placeholder="RT" v-model:value="dynamicForm.alamat_tagih.rt">
                            <template #prefix>RT</template>
                        </n-input>
                        <n-input placeholder="RW" v-model:value="dynamicForm.alamat_tagih.rw">
                            <template #prefix>RW</template>
                        </n-input>
                    </n-input-group>
                </n-form-item>
                <select-state-region v-model:provinsi="dynamicForm.provinsi" v-model:kota="dynamicForm.kota"
                    v-model:kecamatan="dynamicForm.kecamatan" v-model:desa="dynamicForm.kelurahan" />
                <n-form-item label="Kode Pos" path="desa">
                    <n-input placeholder="Kode Pos" />
                </n-form-item>

                <n-divider title-placement="left">
                    Informasi Pekerjaan
                </n-divider>
                <n-form-item label="Pekerjaan" path="nama">
                    <n-input-group>
                        <n-input placeholder="pekerjaan" v-model:value="dynamicForm.pekerjaan.pekerjaan" />
                        <n-input placeholder="Pekerjaan ID" v-model:value="dynamicForm.pekerjaan.pekerjaan_id">
                            <template #prefix>Pekerjaan ID</template>
                        </n-input>
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Agama" path="agama">
                    <n-select placeholder="agama" :options="optAgama" />
                </n-form-item>
                <n-form-item label="Pendidikan" path="pendidikan">
                    <n-select placeholder="agama" :options="optPendidikan" />
                </n-form-item>
                <n-form-item label="Telepon" path="telepon">
                    <n-input-group>
                        <n-input placeholder="Telepon Rumah" v-model:value="dynamicForm.pekerjaan.telepon_rumah" />
                        <n-input placeholder="Telepon Selular" v-model:value="dynamicForm.pekerjaan.telepon_selular">
                            <template #prefix>Selular</template>
                        </n-input>
                        <n-input placeholder="Telepon Kantor" v-model:value="dynamicForm.pekerjaan.telepon_kantor">
                            <template #prefix>Kantor</template>
                        </n-input>
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Ekstra" path="ekstra">
                    <n-input-group>
                        <n-input placeholder="Ekstra 1" v-model:value="dynamicForm.pekerjaan.ekstra1" />
                        <n-input placeholder="Ekstra 2" v-model:value="dynamicForm.pekerjaan.ekstra2">
                            <template #prefix>Ekstra 2</template>
                        </n-input>
                    </n-input-group>
                </n-form-item>

            </n-card>
            <n-card v-if="current == 2" title="Informasi Order" :segmented="{
                content: true,
                footer: 'soft'
            }">
                <n-form-item label="Order" path="order">
                    <n-input-group>
                        <!-- <n-date-picker placeholder="Tanggal Lahir"
                            v-model:formatted-value="dynamicForm.pelanggan.tgl_lahir" value-format="yyyy-MM-dd"
                            type="date" /> -->
                        <n-select placeholder="status order" :options="optStatus" />
                        <n-select placeholder="tipe" :options="tipeKendaraan" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Pelanggan Group" path="pelanggan_group"
                    v-model:value="dynamicForm.order.pelanggan_group">
                    <n-input placeholder="Pelanggan Group" />
                </n-form-item>
                <n-form-item label="Unit Bisnis" path="unit_bisnis">
                    <n-input placeholder="Unit bisnis" v-model:value="dynamicForm.order.unit_bisnis" />
                </n-form-item>
                <n-form-item label="Reff Pelanggan" path="reff_pelanggan">
                    <n-input placeholder="Reff Pelanggan" v-model:value="dynamicForm.order.reff_pelanggan" />
                </n-form-item>
                <n-form-item label="Surveyor" path="surveyor">
                    <n-input placeholder="Surveyor" v-model:value="dynamicForm.order.surveyor" />
                </n-form-item>
                <n-form-item label="Catatan Survey" path="cat_survey">
                    <n-input type="textarea" show-count placeholder="catatan surveyor" maxlength="1000"
                        v-model:value="dynamicForm.order.catatan_survey" />
                </n-form-item>
                <n-form-item label="Platform" path="platform">
                    <n-input placeholder="Platform" v-model:value="dynamicForm.order.platform" />
                </n-form-item>
                <n-form-item label="Prog. Marketing" path="prog_marketing">
                    <n-input placeholder="Program Marketing" v-model:value="dynamicForm.order.prog_marketing" />
                </n-form-item>
                <n-form-item label="Cara Bayar" path="cara_bayar">
                    <n-input placeholder="Cara Bayar" v-model:value="dynamicForm.order.cara_bayar" />
                </n-form-item>
                <n-divider />
                <n-form-item label="Nama Ibu Kandung" path="nama_ibu_kandung">
                    <n-input placeholder="Nama" v-model:value="dynamicForm.order.nama_ibu_kandung" />
                </n-form-item>
                <n-form-item label="Kategori" path="agama">
                    <n-select placeholder="agama" :options="optAgama" />
                </n-form-item>
                <n-form-item label="pendidikan" path="pendidikan">
                    <n-select placeholder="agama" :options="optPendidikan" />
                </n-form-item>
                <n-form-item label="Lama Bekerja" path="lama_kerja">
                    <n-input placeholder="lama bekerja" v-model:value="dynamicForm.order.lama_bekerja" />
                </n-form-item>
                <n-form-item label="Tanggungan" path="tanggungan">
                    <n-input placeholder="Jumlah Tanggungan" v-model:value="dynamicForm.order.jml_tanggungan" />
                </n-form-item>
                <n-form-item label="Pendapatan" path="pendapatan">
                    <n-input-group>
                        <n-input-number :parse="parse" :format="format"
                            v-model:value="dynamicForm.order.pendapatan_pribadi" :show-button="false"
                            class="flex !w-full" placeholder="Pribadi" />
                        <n-input-number :parse="parse" :format="format"
                            v-model:value="dynamicForm.order.pendapatan_pasangan" :show-button="false"
                            class="flex !w-full" placeholder="Pasangan" />
                        <n-input-number :parse="parse" :format="format"
                            v-model:value="dynamicForm.order.pendapatan_lainnya" :show-button="false"
                            class="flex !w-full" placeholder="Lainnya" />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Biaya" path="biaya">
                    <n-input-number :parse="parse" :format="format" v-model:value="dynamicForm.order.pengeluaran"
                        :show-button="false" class="flex !w-full" placeholder="Pengeluaran" />
                </n-form-item>
                <n-divider title-placement="left">
                    NPWP
                </n-divider>
                <n-form-item label="No NPWP" path="no_npwp">
                    <n-input placeholder="No NPWP" v-model:value="dynamicForm.npwp.no" />
                </n-form-item>
                <n-divider title-placement="left">
                    Barang Taksasi
                </n-divider>
                <n-form-item label="Kode Barang" path="kode_barang">
                    <n-input placeholder="Kode Barang" v-model:value="dynamicForm.barang_taksasi.kode_barang" />
                </n-form-item>
                <n-form-item label="ID Tipe" path="id_tipe">
                    <n-input placeholder="ID Tipe" v-model:value="dynamicForm.barang_taksasi.id_tipe" />
                </n-form-item>
                <n-form-item label="Tahun" path="tahun">
                    <n-input placeholder="Tahun" v-model:value="dynamicForm.barang_taksasi.tahun" />
                </n-form-item>
                <n-form-item label="Harga Pasar" path="harga_pasar">
                    <n-input-number :parse="parse" :format="format"
                        v-model:value="dynamicForm.barang_taksasi.harga_pasar" :show-button="false" class="flex !w-full"
                        placeholder="harga pasar" />
                </n-form-item>
            </n-card>
            <n-card v-if="current == 3" title="Informasi Tambahan" :segmented="{
                content: true,
                footer: 'soft'
            }">
                <n-form-item label="Nama BI" path="nama_bi">
                    <n-input placeholder="Nama BI" v-model:value="dynamicForm.tambahan.nama_bi" />
                </n-form-item>
                <n-form-item label="Email" path="email">
                    <n-input placeholder="Email" v-model:value="dynamicForm.tambahan.email" />
                </n-form-item>
                <n-form-item label="Info Khusus" path="info_khusus">
                    <n-input placeholder="Info Khusus" v-model:value="dynamicForm.tambahan.info_khusus" />
                </n-form-item>
                <n-form-item label="Usaha Lain 1" path="usaha_lain1">
                    <n-input placeholder="Usaha Lain 1" v-model:value="dynamicForm.tambahan.usaha_lain1" />
                </n-form-item>
                <n-form-item label="Usaha Lain 2" path="usaha_lain2">
                    <n-input placeholder="Usaha Lain 2" v-model:value="dynamicForm.tambahan.usaha_lain2" />
                </n-form-item>
                <n-form-item label="Usaha Lain 3" path="usaha_lain3">
                    <n-input placeholder="Usaha Lain 3" v-model:value="dynamicForm.tambahan.usaha_lain3" />
                </n-form-item>
                <n-form-item label="Usaha Lain 4" path="usaha_lain1">
                    <n-input placeholder="Usaha Lain 4" v-model:value="dynamicForm.tambahan.usaha_lain4" />
                </n-form-item>
                <n-divider title-placement="left">
                    Kerabat dalam kondisi darurat
                </n-divider>
                <n-form-item label="Nama Kerabat" path="nama_kerabat">
                    <n-input placeholder="Nama Kerbat" v-model:value="dynamicForm.kerabat_darurat.nama" />
                </n-form-item>
                <n-form-item label="Alamat" path="alamat">
                    <n-input-group>
                        <n-input placeholder="Alamat" v-model:value="dynamicForm.kerabat_darurat.alamat" />
                        <n-input placeholder="RT" v-model:value="dynamicForm.kerabat_darurat.rt" />
                        <n-input placeholder="RW" v-model:value="dynamicForm.kerabat_darurat.rw" />
                    </n-input-group>
                </n-form-item>
                <select-state-region v-model:provinsi="dynamicForm.provinsi" v-model:kota="dynamicForm.kota"
                    v-model:kecamatan="dynamicForm.kecamatan" v-model:desa="dynamicForm.kelurahan" />
                <n-form-item label="Kode Pos" path="desa">
                    <n-input placeholder="Kode Pos" v-model:value="dynamicForm.kerabat_darurat.kode_pos" />
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
                <n-form-item label="Alamat">
                    <n-input-group>
                        <n-input placeholder="Alamat" v-model:value="dynamicForm.surat.alamat" />
                        <n-input placeholder="RT" v-model:value="dynamicForm.surat.rt" />
                        <n-input placeholder="RW" v-model:value="dynamicForm.surat.rw" />
                    </n-input-group>
                </n-form-item>
                <select-state-region v-model:provinsi="dynamicForm.provinsi" v-model:kota="dynamicForm.kota"
                    v-model:kecamatan="dynamicForm.kecamatan" v-model:desa="dynamicForm.kelurahan" />
                <n-form-item label="Kode Pos" path="desa">
                    <n-input placeholder="Kode Pos" v-model:value="dynamicForm.surat.kode_pos" />
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
                            <n-input-number style="margin-right: 12px; width: 160px" />
                            <n-input type="text" />
                        </div>
                    </template>
                </n-dynamic-input></n-card>
            <n-card v-if="current == 4" title="Data Ekstra" :segmented="{
                content: true,
                footer: 'soft'
            }">
                <n-form-item label="Tanggal survey" path="tgl_survey">
                    <n-input placeholder="tanggal survey" />
                </n-form-item>
                <n-form-item label="Pokok pembayaran" path="Pokok Pembayaran">
                    <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.pokok_pembayaran"
                        :show-button="false" class="flex !w-full" placeholder="pokok pembayaran" />
                </n-form-item>
                <n-form-item label="Tipe Angsuran" path="tipe_angsuran">
                    <n-input v-model:value="dynamicForm.ekstra.tipe_angsuran" placeholder="tipe angsuran" />
                </n-form-item>
                <n-form-item label="Cara Pembayaraan" path="cara_bayar">
                    <n-select v-model:value="dynamicForm.ekstra.cara_pembayaran" :options="tipeKendaraan" />
                </n-form-item>
                <n-form-item label="Periode" path="periode">
                    <n-input v-model:value="calcCredit.periode" placeholder="periode" />
                </n-form-item>
                <n-form-item label="Angsuran" path="angsuran">
                    <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.angsuran"
                        placeholder="angsuran" :show-button="false" class="flex !w-full" />
                </n-form-item>
                <n-form-item label="Total Admin" path="total_admin">
                    <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.total_admin"
                        placeholder="Total Admin" :show-button="false" class="flex !w-full" />
                </n-form-item>
                <n-form-item label="Cadangan" path="cadangan">
                    <n-input-number :parse="parse" :format="format" v-model:value="dynamicForm.ekstra.cadangan"
                        placeholder="Cadangan" :show-button="false" class="flex !w-full" />
                </n-form-item>
                <n-form-item label="Biaya Broker" path="biaya_broker">
                    <n-input-number :parse="parse" :format="format" v-model:value="dynamicForm.ekstra.cadangan"
                        placeholder="Cadangan" :show-button="false" class="flex !w-full" />
                </n-form-item>
                <n-form-item label="Provisi" path="provisi">
                    <n-input-number :parse="parse" :format="format" v-model:value="dynamicForm.ekstra.provisi"
                        placeholder="Provisi" :show-button="false" class="flex !w-full" />
                </n-form-item>
                <n-form-item label="Asuransi" path="asuransi">
                    <n-input-number :parse="parse" :format="format" v-model:value="dynamicForm.ekstra.asuransi"
                        placeholder="Asuransi" :show-button="false" class="flex !w-full" />
                </n-form-item>
                <n-form-item label="Biaya Transfer" path="biaya_transfer">
                    <n-input-number :parse="parse" :format="format" v-model:value="dynamicForm.ekstra.biaya_transfer"
                        placeholder="Biaya Transfer" :show-button="false" class="flex !w-full" />
                </n-form-item>
                <n-form-item label="Bunga / Margin Eff" path="bunga_margin_eff">
                    <n-input v-model:value="calcCredit.bunga_eff" placeholder="Bunga / Margin Eff" />
                </n-form-item>
                <n-form-item label="Bunga / Margin Flat" path="bunga_margin_flat">
                    <n-input v-model:value="calcCredit.bunga_eff_flat" placeholder="Bunga / Margin Flat" />
                </n-form-item>
                <n-divider />
                <n-form-item label="Bunga / Margin" path="bunga_margin">
                    <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.bunga_margin"
                        placeholder="Bunga / Margin" :show-button="false" class="flex !w-full" />
                </n-form-item>
                <n-form-item label="Pokok + Margin" path="pokok_margin">
                    <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.pokok_margin"
                        placeholder="Pokok + Margin" :show-button="false" class="flex !w-full" />
                </n-form-item>
                <n-form-item label="Angsuran Terkahir" path="angsuran_terakhir">
                    <n-input-number :parse="parse" :format="format" v-model:value="dynamicForm.ekstra.angsuran_terakhir"
                        placeholder="Angsuran Terakhir" :show-button="false" class="flex !w-full" />
                </n-form-item>
                <n-form-item label="Bunga / Margin Eff Actual" path="bunga_margin_eff_actual">
                    <n-input v-model:value="calcCredit.bunga_eff_actual" placeholder="Bunga / Margin Eff Actual" />
                </n-form-item>
                <n-form-item label="Bunga / Margin Eff Flat Actual" path="bunga_margin_eff_flat_actual">
                    <n-input v-model:value="calcCredit.bunga_margin_eff_flat" placeholder=" Bunga / Margin Eff Flat
                        Actual" />
                </n-form-item>
                <n-form-item label="Nett Admin" path="net_admin">
                    <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.net_admin"
                        placeholder="Net Admin" :show-button="false" class="flex !w-full" />
                </n-form-item>
                <n-form-item label="Nilai yang diterima" path="nilai_diterima">
                    <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.nilai_yang_diterima"
                        placeholder="Nilai yang diterima" size="large" :show-button="false" class="flex !w-full" />
                </n-form-item>

            </n-card>
        </n-form>

        <n-flex justify="between">
            <n-button @click="prev" type="secondary" v-if="current > 1">
                <template #icon>
                    <n-icon>
                        <arrow-back />
                    </n-icon>
                </template>
                kembali
            </n-button>
            <n-button @click="next" type="primary" v-if="current < 4">
                <template #icon>
                    <n-icon>
                        <arrow-forward />
                    </n-icon>
                </template>
                Selanjutnya
            </n-button>
            <n-button :loading="loading" icon-placement="left" type="info" @click="handleSave" v-else>
                simpan
            </n-button>
            <n-button :loading="lodingSend" @click="handleSend" type="primary" v-if="current == 4">
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
import { ref, reactive, computed } from "vue";
import { ArrowBackOutlined as ArrowBack, ArrowForwardOutlined as ArrowForward, SendRound as SendIcon, SaveAsOutlined as SaveIcon } from "@vicons/material";
import { useRoute } from "vue-router";
import { useMessage } from "naive-ui";
import { useApi } from "../../../helpers/axios";

const message = useMessage();
const loading = ref(false);
const baseRoute = useRoute();

const dynamicForm = reactive({
    flag_pengajuan: "no",
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
        kode_bank: "014",
        nama_bank: "BCA",
        no_rekening: "20156288",
        nama_di_rekening: "Ucok",
        status: "active"
    }],
    ekstra:
    {
        nilai_yang_diterima: '',
        periode: '',
        pokok_pembayaran: '',
        tipe_angsuran: '',
        cara_pembayaran: '',
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
    }
});
const calcCredit = reactive({
    plafond: 0,
    total_admin: 0,
    net_admin: computed(() => parseInt(calcCredit.total_admin)),
    tenor: 12,
    bunga_eff: 44.2310,
    bunga_eff_actual: computed(() => calcCredit.bunga_eff / 100),
    bunga_margin: computed(() => calcCredit.bunga_flat / 12 * parseInt(calcCredit.periode) * (parseInt(calcCredit.pokok_pembayaran)) / 100),
    pokok_margin: computed(() => parseInt(calcCredit.pokok_pembayaran) + parseInt(calcCredit.bunga_margin)),
    pokok_pembayaran: computed(() => sum(parseInt(calcCredit.nilai_yang_diterima), parseInt(calcCredit.total_admin))),
    angsuran: computed(() => ((calcCredit.pokok_pembayaran + calcCredit.bunga_margin) / calcCredit.tenor)),
    bunga_flat: computed(() => (((calcCredit.tenor * (calcCredit.bunga_eff_actual / 12)) / (1 - (1 + (calcCredit.bunga_eff_actual / 12)) ** (-calcCredit.tenor))) - 1) * (12 / calcCredit.tenor) * 100),
});
const pageData = ref();


const suspense = ref(false);
const current = ref(1);
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

const idApp = baseRoute.params.idapplication;
const sum = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) {
        return undefined;
    }
    return num1 + num2;
};
const response = useApi({
    method: 'get',
    api: `cr_application/${idApp}`,
    token: userToken
}).then(res => {

    if (!res.ok) {
        message.error("halam tidak ditemukan !");
        suspense.value = true;
    } else {
        message.loading("memuat fpk");
        suspense.value = false;
        pageData.value = res.data.response;
        dynamicForm.pelanggan = pageData.value.pelanggan;
        dynamicForm.alamat_identitas = pageData.value.alamat_identitas;
        dynamicForm.alamat_tagih = pageData.value.alamat_tagih;
        dynamicForm.pekerjaan = pageData.value.pekerjaan;
        dynamicForm.order = pageData.value.order;
        dynamicForm.tambahan = pageData.value.tambahan;
        dynamicForm.kerabat_darurat = pageData.value.kerabat_darurat;
        dynamicForm.surat = pageData.value.surat;
        Object.assign(calcCredit, pageData.value.ekstra);
    }
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

const handleSave = async (e) => {
    e.preventDefault(e);
    let idApp = pageData.value.id_application;
    loading.value = true;
    const response = await useApi({
        method: 'PUT',
        api: `cr_application/${idApp}`,
        data: dynamicForm,
        token: userToken
    });
    if (!response.ok) {
        message.error("data gagal disimpan");
        loading.value = false;
    } else {
        message.success("data berhasil disimpan");
        loading.value = false;
        router.push('apply-credit');
    }
}
const handleSend = () => {

}
</script>