<template>
    <n-space vertical class="p-2">
        <n-steps :current="current" :status="currentStatus">
            <n-step title="Pelanggan" />
            <n-step title="Order" />
            <n-step title="Tambahan" />
            <n-step title="Ekstra" />
        </n-steps>
    </n-space>
    <n-flex class="pt-4">
        <!-- <n-collapse>
            <n-collapse-item title="get" name="1">
                <pre>{{ pageData }}</pre>
            </n-collapse-item>
            <n-collapse-item title="post" name="2">
                <pre>{{ formAssign }}</pre>
            </n-collapse-item>
        </n-collapse> -->
        <!-- info pelanggan -->
        <n-card v-show="current == 1" title="Informasi pelanggan" :segmented="{
            content: true,
            footer: 'soft'
        }">

            <div class="flex w-full gap-2">
                <n-form-item label="Nama" path="nama" class="w-full">
                    <n-input placeholder="nama" v-model:value="dataPelanggan.nama" />
                </n-form-item>
                <n-form-item label="Nama Panggilan" path="nama_panggilan" class="w-full">
                    <n-input placeholder="nama panggilan" v-model:value="dataPelanggan.nama_panggilan" />
                </n-form-item>
            </div>

            <div class="flex w-full gap-2">
                <n-form-item label="Jenis kelamin" path="jenis_kelamin" class="w-full">
                    <n-select placeholder="Jenis Kelamin" :options="optJenisKelamin"
                        v-model:value="dataPelanggan.jenis_kelamin" />
                </n-form-item>
                <n-form-item label="Tanggal Lahir" path="tgl_lahir" class="w-full">
                    <n-date-picker placeholder="Tanggal Lahir" v-model:formatted-value="dataPelanggan.tgl_lahir"
                        value-format="yyyy-MM-dd" type="date" class="w-full" />
                </n-form-item>
                <n-form-item label="Golonga Darah" path="gol_darah" class="w-full">
                    <n-input placeholder="golongan darah" v-model:value="dataPelanggan.gol_darah">
                    </n-input>
                </n-form-item>
            </div>

            <n-form-item label="Status Kawin" path="jenis_kelamin">
                <n-input-group>
                    <n-select placeholder="Status Kawin" :options="optStatusKawin"
                        v-model:value="dataPelanggan.status_kawin" />
                    <!-- <n-date-picker placeholder="Tanggal Kawin"
                            v-model:formatted-value="dynamicForm.pelanggan.tgl_kawin" value-format="yyyy-MM-dd"
                            type="date" /> -->
                </n-input-group>
            </n-form-item>
            <div class="flex w-full gap-2">
                <n-form-item label="Identitas" path="plafond" class="w-full">
                    <n-select placeholder="Jenis Identitas" :options="optJenisIdentitas"
                        v-model:value="dataPelanggan.tipe_identitas" />
                </n-form-item>
                <n-form-item label="No Identitas" path="no_identitas" class="w-full">
                    <n-input placeholder="No Identitas" v-model:value="dataPelanggan.no_identitas">
                    </n-input>
                </n-form-item>
            </div>
            <div class="flex w-full gap-2">
                <n-form-item label="No KK" path="no KK" class="w-full">
                    <n-input placeholder="No Kartu Keluarga" v-model:value="dataPelanggan.no_kk" />
                </n-form-item>
                <n-form-item label="Warganegara" path="warganegara" class="w-full">
                    <n-input placeholder="Warganegara" v-model:value="dataPelanggan.warganegara">
                    </n-input>
                </n-form-item>
            </div>
            <n-divider title-placement="left">
                Dokumen
            </n-divider>
            <n-space>
                <n-image v-for="attachment in dataAttachment" :key="attachment"
                    class="w-24 border-b border-2 border-pr h-24" :src="attachment.PATH"></n-image>
                <n-upload :data="{ 'type': 'ktp' }" list-type="image-card" :custom-request="handleImagePost">
                </n-upload>
            </n-space>
            <n-divider title-placement="left">
                Informasi Alamat Identitas
            </n-divider>
            <div class="flex gap-2">
                <n-form-item label="Alamat" class="w-full">
                    <n-input placeholder="Alamat" v-model:value="alamatIdentitas.alamat" />
                </n-form-item>
                <n-form-item label="RT">
                    <n-input placeholder="RT" v-model:value="alamatIdentitas.rt">
                    </n-input>
                </n-form-item>
                <n-form-item label="RW">
                    <n-input placeholder="RW" v-model:value="alamatIdentitas.rw">
                    </n-input>
                </n-form-item>
            </div>
            <select-state-region v-model:provinsi="alamatIdentitas.provinsi" v-model:kota="alamatIdentitas.kota"
                v-model:kecamatan="alamatIdentitas.kecamatan" v-model:desa="alamatIdentitas.kelurahan" />
            <n-form-item label="Kode Pos" path="desa">
                <n-input placeholder="Kode Pos" v-model:value="alamatIdentitas.kode_pos" />
            </n-form-item>
            <n-divider title-placement="left">
                Informasi Alamat Tagih
            </n-divider>

            <div class="flex gap-2">
                <n-form-item label="Alamat" class="w-full">
                    <n-input placeholder="Alamat" v-model:value="alamatTagih.alamat" />
                </n-form-item>
                <n-form-item label="RT">
                    <n-input placeholder="RT" v-model:value="alamatTagih.rt">
                    </n-input>
                </n-form-item>
                <n-form-item label="RW">
                    <n-input placeholder="RW" v-model:value="alamatTagih.rw">
                    </n-input>
                </n-form-item>
            </div>

            <select-state-region v-model:provinsi="alamatTagih.provinsi" v-model:kota="alamatTagih.kota"
                v-model:kecamatan="alamatTagih.kecamatan" v-model:desa="alamatTagih.kelurahan" />
            <n-form-item label="Kode Pos" path="desa">
                <n-input placeholder="Kode Pos" v-model:value="alamatTagih.kode_pos" />
            </n-form-item>

            <n-divider title-placement="left">
                Informasi Pekerjaan
            </n-divider>
            <div class="flex gap-2">
                <n-form-item label="Pekerjaan" path="nama" class="w-full">
                    <n-input placeholder="pekerjaan" v-model:value="dataPekerjaan.pekerjaan" />
                </n-form-item>
                <n-form-item label="Pekerjaan ID" path="nama" class="w-full">
                    <n-input placeholder="Pekerjaan ID" v-model:value="dataPekerjaan.pekerjaan_id">
                    </n-input>
                </n-form-item>
            </div>
            <n-form-item label="Agama" path="agama">
                <n-select placeholder="agama" :options="optAgama" v-model:value="dataPekerjaan.agama" />
            </n-form-item>
            <n-form-item label="Pendidikan" path="pendidikan">
                <n-select placeholder="pendidikan" :options="optPendidikan" v-model:value="dataPekerjaan.pendidikan" />
            </n-form-item>
            <div class="flex gap-2">
                <n-form-item label="Telepon" path="telepon" class="w-full">
                    <n-input placeholder="Telepon Rumah" v-model:value="dataPekerjaan.telepon_rumah" />
                </n-form-item>
                <n-form-item label="Telepon Selullar" path="telepon_selullar" class="w-full">
                    <n-input placeholder="Telepon Selular" v-model:value="dataPekerjaan.telepon_selular">

                    </n-input>
                </n-form-item>
                <n-form-item label="Telepon" path="Kantor" class="w-full">
                    <n-input placeholder="Telepon Kantor" v-model:value="dataPekerjaan.telepon_kantor">

                    </n-input>
                </n-form-item>
            </div>
            <div class="flex gap-2">
                <n-form-item label="Ekstra" path="ekstra" class="w-full">
                    <n-input placeholder="Ekstra 1" v-model:value="dataPekerjaan.ekstra1" />
                </n-form-item>
                <n-form-item label="Ekstra 2" path="ekstra" class="w-full">
                    <n-input placeholder="Ekstra 2" v-model:value="dataPekerjaan.ekstra2">
                    </n-input>
                </n-form-item>
            </div>
        </n-card>
        <!-- info order -->
        <n-card v-if="current == 2" title="Informasi Order" :segmented="{
            content: true,
            footer: 'soft'
        }">

            <div class="flex gap-2">
                <n-form-item label="Tanggal Order" path="order" class="w-full">
                    <n-date-picker placeholder="Tanggal order" v-model:formatted-value="dataOrder.order_tanggal"
                        value-format="yyyy-MM-dd" type="date" class="w-full" />
                </n-form-item>
                <n-form-item label="Status Order" path="status_order" class="w-full">
                    <n-select placeholder="status order" :options="optStatusOrder"
                        v-model:value="dataOrder.order_status" />
                </n-form-item>
                <n-form-item label="Tipe Order" path="order" class="w-full">
                    <n-select placeholder="tipe" :options="optTipeOrder" v-model:value="dataOrder.order_tipe" />
                </n-form-item>
            </div>
            <n-form-item label="Unit Bisnis" path="unit_bisnis">
                <n-input placeholder="Unit bisnis" v-model:value="dataOrder.unit_bisnis" />
            </n-form-item>
            <n-form-item label="Reff Pelanggan" path="reff_pelanggan">
                <n-input placeholder="Reff Pelanggan" v-model:value="dataOrder.ref_pelanggan" />
            </n-form-item>
            <n-form-item label="Surveyor" path="surveyor">
                <n-input placeholder="Surveyor" v-model:value="dataOrder.surveyor_id" disabled />
            </n-form-item>
            <n-form-item label="Catatan Survey" path="cat_survey">
                <n-input type="textarea" show-count placeholder="catatan surveyor" maxlength="1000"
                    v-model:value="dataOrder.catatan_survey" disabled />
            </n-form-item>
            <n-form-item label="Prog. Marketing" path="prog_marketing">
                <n-input placeholder="Program Marketing" v-model:value="dataOrder.prog_marketing" />
            </n-form-item>
            <n-form-item label="Cara Bayar" path="cara_bayar">
                <n-input placeholder="Cara Bayar" v-model:value="dataOrder.cara_bayar" />
            </n-form-item>
            <n-divider />
            <n-form-item label="Nama Ibu Kandung" path="nama_ibu_kandung">
                <n-input placeholder="Nama Ibu Kandung" v-model:value="dataOrder.nama_ibu" />
            </n-form-item>
            <n-form-item label="Kategori" path="kategori">
                <n-select placeholder="agama" :options="optKategori" v-model:value="dataOrder.kategori" />
            </n-form-item>
            <n-form-item label="Lama Bekerja" path="lama_kerja">
                <n-input placeholder="lama bekerja" v-model:value="dataOrder.lama_bekerja" />
            </n-form-item>
            <n-form-item label="Tanggungan" path="tanggungan">
                <n-input placeholder="Jumlah Tanggungan" v-model:value="dataOrder.tanggungan" />
            </n-form-item>
            <div class="flex gap-2">
                <n-form-item label="Pendapatan Pelanggan" path="pendapatan_pribadi" class="w-full">
                    <n-input-number :parse="parse" :format="format" v-model:value="dataOrder.pendapatan_pribadi"
                        :show-button="false" class="flex !w-full" placeholder="Pribadi" />
                </n-form-item>
                <n-form-item label="Pendapatan Pasangan" path="pendapatan_pasangan" class="w-full">
                    <n-input-number :parse="parse" :format="format" v-model:value="dataOrder.pendapatan_pasangan"
                        :show-button="false" class="flex !w-full" placeholder="Pasangan" />
                </n-form-item>
                <n-form-item label="Pendapatan Lainnya" path="pendapatan_lainnya" class="w-full">
                    <n-input-number :parse="parse" :format="format" v-model:value="dataOrder.pendapatan_lainnya"
                        :show-button="false" class="flex !w-full" placeholder="Lainnya" />
                </n-form-item>
            </div>
            <n-form-item label="Biaya" path="biaya">
                <n-input-number :parse="parse" :format="format" v-model:value="dataOrder.biaya_bulanan"
                    :show-button="false" class="flex !w-full" placeholder="Pengeluaran" />
            </n-form-item>
            <n-divider title-placement="left">
                NPWP
            </n-divider>
            <n-form-item label="No NPWP" path="no_npwp">
                <n-input placeholder="No NPWP" v-model:value="dataOrder.no_npwp" />
            </n-form-item>
            <n-divider title-placement="left">
                Barang Taksasi
            </n-divider>
            <n-form-item label="Kode Barang" path="kode_barang">
                <n-input placeholder="Kode Barang" v-model:value="dataTaksasi.kode_barang" />
            </n-form-item>
            <n-form-item label="ID Tipe" path="id_tipe">
                <n-input placeholder="ID Tipe" v-model:value="dataTaksasi.id_tipe" />
            </n-form-item>
            <n-form-item label="Tahun" path="tahun">
                <n-input placeholder="Tahun" v-model:value="dataTaksasi.tahun" />
            </n-form-item>
            <n-form-item label="Harga Pasar" path="harga_pasar">
                <n-input-number :parse="parse" :format="format" v-model:value="dataTaksasi.harga_pasar"
                    :show-button="false" class="flex !w-full" placeholder="harga pasar" />
            </n-form-item>
        </n-card>

        <n-card v-if="current == 3" title="Informasi Tambahan" :segmented="{
            content: true,
            footer: 'soft'
        }">
            <n-form-item label="Nama BI" path="nama_bi">
                <n-input placeholder="Nama BI" v-model:value="dataTambahan.nama_bi" />
            </n-form-item>
            <n-form-item label="Email" path="email">
                <n-input placeholder="Email" v-model:value="dataTambahan.email" />
            </n-form-item>
            <n-form-item label="Info Khusus" path="info_khusus">
                <n-input placeholder="Info Khusus" v-model:value="dataTambahan.info_khusus" />
            </n-form-item>
            <n-form-item label="Usaha Lain 1" path="usaha_lain1">
                <n-input placeholder="Usaha Lain 1" v-model:value="dataTambahan.usaha_lain1" />
            </n-form-item>
            <n-form-item label="Usaha Lain 2" path="usaha_lain2">
                <n-input placeholder="Usaha Lain 2" v-model:value="dataTambahan.usaha_lain2" />
            </n-form-item>
            <n-form-item label="Usaha Lain 3" path="usaha_lain3">
                <n-input placeholder="Usaha Lain 3" v-model:value="dataTambahan.usaha_lain3" />
            </n-form-item>
            <n-form-item label="Usaha Lain 4" path="usaha_lain1">
                <n-input placeholder="Usaha Lain 4" v-model:value="dataTambahan.usaha_lain4" />
            </n-form-item>
            <n-divider title-placement="left">
                Kerabat dalam kondisi darurat
            </n-divider>
            <n-form-item label="Nama Kerabat" path="nama_kerabat">
                <n-input placeholder="Nama Kerbat" v-model:value="dataKerabat.nama" />
            </n-form-item>
            <n-form-item label="Alamat" path="alamat">
                <n-input-group>
                    <n-input placeholder="Alamat" v-model:value="dataKerabat.alamat" />
                    <n-input placeholder="RT" v-model:value="dataKerabat.rt" />
                    <n-input placeholder="RW" v-model:value="dataKerabat.rw" />
                </n-input-group>
            </n-form-item>
            <select-state-region v-model:provinsi="dataKerabat.provinsi" v-model:kota="dataKerabat.kota"
                v-model:kecamatan="dataKerabat.kecamatan" v-model:desa="dataKerabat.kelurahan" />
            <n-form-item label="Kode Pos" path="kodepos">
                <n-input placeholder="Kode Pos" v-model:value="dataKerabat.kode_pos" />
            </n-form-item>

            <n-form-item label="Telepon" path="telepon">
                <n-input-group>
                    <n-input placeholder="Telepon Rumah" v-model:value="dataKerabat.no_telp" />
                    <n-input placeholder="Telepon Selular" v-model:value="dataKerabat.no_hp" />
                </n-input-group>
            </n-form-item>
            <n-divider title-placement="left">
                Informasi Surat
            </n-divider>
            <n-form-item label="Alamat">
                <n-input-group>
                    <n-input placeholder="Alamat" v-model:value="dataSurat.alamat" />
                    <n-input placeholder="RT" v-model:value="dataSurat.rt" />
                    <n-input placeholder="RW" v-model:value="dataSurat.rw" />
                </n-input-group>
            </n-form-item>
            <select-state-region v-model:provinsi="dataSurat.provinsi" v-model:kota="dataSurat.kota"
                v-model:kecamatan="dataSurat.kecamatan" v-model:desa="dataSurat.kelurahan" />
            <n-form-item label="Kode Pos" path="desa">
                <n-input placeholder="Kode Pos" v-model:value="dataSurat.kode_pos" />
            </n-form-item>
            <n-divider title-placement="left">
                Informasi Bank
            </n-divider>
            <n-dynamic-input v-model:value="formAssign.info_bank" :on-create="onCreate">
                <template #create-button-default>
                    Tambah Bank
                </template>
                <template #default="{ value }">
                    <div class="flex w-full gap-2 bg-pr-50 p-2 pb-0 rounded-md">
                        <n-form-item label="Kode Bank" path="kode Bank" class="w-full">
                            <n-input v-model:value="value.kode_bank" type="text" />
                        </n-form-item>
                        <n-form-item label="Nama Bank" path="Nama Bank" class="w-full">
                            <n-input v-model:value="value.nama_bank" type="text" />
                        </n-form-item>
                        <n-form-item label="No Rekening" path="norkening" class="w-full">
                            <n-input v-model:value="value.no_rekening" type="text" />
                        </n-form-item>
                        <n-form-item label="Atas Nama" path="atasnama" class="w-full">
                            <n-input v-model:value="value.atas_nama" type="text" />
                        </n-form-item>
                        <n-form-item label="Status" path="Nama Bank" class="w-full">
                            <n-input v-model:value="value.status" type="text" />
                        </n-form-item>
                    </div>
                </template>
            </n-dynamic-input>
        </n-card>

        <n-card v-if="current == 4" title="Data Ekstra" :segmented="{
            content: true,
            footer: 'soft'
        }">
            <div class="w-full flex md:flex-row flex-col gap-4 ">
                <div class="flex flex-col w-full">
                    <n-form-item label="Pokok pembayaran" path="Pokok Pembayaran">
                        <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.pokok_pembayaran"
                            :show-button="false" class="flex !w-full" placeholder="pokok pembayaran" />
                    </n-form-item>
                    <n-form-item label="Tipe Angsuran" path="tipe_angsuran">
                        <n-select v-model:value="calcCredit.tipe_angsuran" :options="optTipeAngsuran" />
                    </n-form-item>
                    <n-form-item label="Cara Pembayaraan" path="cara_bayar">
                        <n-select placeholder="Cara Pembayaran" :options="optCaraBayar"
                            v-model:value="calcCredit.cara_pembayaran" />
                    </n-form-item>
                    <n-form-item label="Jumlah Angsuran" path="jml_angsuran">
                        <n-input v-model:value="calcCredit.periode" placeholder="periode" />
                    </n-form-item>
                    <n-form-item label="Periode" path="periode">
                        <n-input v-model:value="calcCredit.periode" placeholder="periode" />
                        <n-select placeholder="Pilih Periode" :options="optPeriode"
                            v-model:value="calcCredit.opt_periode" />
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
                        <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.cadangan"
                            placeholder="Cadangan" :show-button="false" class="flex !w-full" />
                    </n-form-item>
                    <n-form-item label="Provisi" path="provisi">
                        <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.provisi"
                            placeholder="Provisi" :show-button="false" class="flex !w-full" />
                    </n-form-item>
                    <n-form-item label="Asuransi" path="asuransi">
                        <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.asuransi"
                            placeholder="Asuransi" :show-button="false" class="flex !w-full" />
                    </n-form-item>
                    <n-form-item label="Biaya Transfer" path="biaya_transfer">
                        <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.biaya_transfer"
                            placeholder="Biaya Transfer" :show-button="false" class="flex !w-full" />
                    </n-form-item>
                    <n-form-item label="Bunga / Margin Eff" path="bunga_margin_eff">
                        <n-input v-model:value="calcCredit.bunga_eff" placeholder="Bunga / Margin Eff" />
                    </n-form-item>
                    <n-form-item label="Bunga / Margin Flat" path="bunga_margin_flat">
                        <n-input v-model:value="calcCredit.bunga_flat" placeholder="Bunga / Margin Flat" />
                    </n-form-item>
                </div>
                <div class="flex flex-col w-full">
                    <n-form-item label="Bunga / Margin" path="bunga_margin">
                        <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.bunga_margin"
                            placeholder="Bunga / Margin" :show-button="false" class="flex !w-full" />
                    </n-form-item>
                    <n-form-item label="Pokok + Margin" path="pokok_margin">
                        <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.pokok_margin"
                            placeholder="Pokok + Margin" :show-button="false" class="flex !w-full" />
                    </n-form-item>
                    <!-- <n-form-item label="Angsuran Terkahir" path="angsuran_terakhir">
                            <n-input-number :parse="parse" :format="format" v-model:value="calcCredit.angsuran_terakhir"
                                placeholder="Angsuran Terakhir" :show-button="false" class="flex !w-full" />
                        </n-form-item> -->
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
                </div>
            </div>
            <!-- <n-form-item label="Tanggal survey" path="tgl_survey">
                    <n-date-picker placeholder="Tanggal Survey" v-model:formatted-value="calcCredit.tgl_survey"
                        value-format="yyyy-MM-dd" type="date" />
                </n-form-item> -->
        </n-card>
    </n-flex>

    <n-space class="pt-4" justify="between">
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
        <n-button :loading="loading" icon-placement="left" type="info" @click="handleSave">
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
    </n-space>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { ArrowBackOutlined as ArrowBack, ArrowForwardOutlined as ArrowForward, SendRound as SendIcon, SaveAsOutlined as SaveIcon } from "@vicons/material";
import { useRoute } from "vue-router";
import { useMessage } from "naive-ui";
import { useApi } from "../../../helpers/axios";
import router from '../../../router';
const message = useMessage();
const loading = ref(false);
const loadingSend = ref(false);
const baseRoute = useRoute();


const calcCredit = reactive({
    net_admin: computed(() => parseInt(calcCredit.total_admin)),
    bunga_eff_actual: computed(() => calcCredit.bunga_eff),
    bunga_margin: computed(() => calcCredit.bunga_flat / 12 * parseInt(calcCredit.periode) * (parseInt(calcCredit.pokok_pembayaran)) / 100),
    pokok_margin: computed(() => parseInt(calcCredit.pokok_pembayaran) + parseInt(calcCredit.bunga_margin)),
    pokok_pembayaran: computed(() => sum(parseInt(calcCredit.nilai_yang_diterima), parseInt(calcCredit.total_admin))),
    angsuran: computed(() => ((calcCredit.pokok_pembayaran + calcCredit.bunga_margin) / calcCredit.periode)),
    bunga_flat: computed(() => (((calcCredit.periode * ((calcCredit.bunga_eff_actual / 100) / 12)) / (1 - (1 + ((calcCredit.bunga_eff_actual / 100) / 12)) ** (-calcCredit.periode))) - 1) * (12 / calcCredit.periode) * 100),
});
const dataPelanggan = ref({});
const alamatIdentitas = ref({});
const alamatTagih = ref({});
const dataPekerjaan = ref({});
const dataOrder = ref({});
const dataTaksasi = ref({});
const dataTambahan = ref({});
const dataKerabat = ref({});
const dataSurat = ref({});
const dataAttachment = ref({});
const dataEkstra = ref({});

const dataBank = ref([]);
const onCreate = () => {
    return {
        kode_bank: null,
        nama_bank: null,
        no_rekening: null,
        atas_nama: null,
        status: null
    }
}

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
const optJenisKelamin = ["Laki-laki", "perempuan"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optJenisIdentitas = ["KTP", "SIM", 'PASPOR'].map(
    (v) => ({
        label: v,
        value: v
    }));

const optTipeAngsuran = ["Tetap"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optCaraBayar = ["Advance", "Arrear"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optStatusOrder = ["Approve"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optTipeOrder = ["RETAIL"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optKategori = ["Karyawan", "Bukan Karyawan"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optStatusKawin = ["Kawin", "Belum Kawin", "Janda", "Duda"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optAgama = ["ISLAM", "KRISTEN"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optPendidikan = ["SMA", "SD"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optPeriode = ["Bulan", "tahun"].map(
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
        // dynamicForm.pelanggan = pageData.value.pelanggan;
        // alamatIdentitas = pageData.value.alamat_identitas;
        // dynamicForm.alamat_tagih = pageData.value.alamat_tagih;
        // dynamicForm.pekerjaan = pageData.value.pekerjaan;
        // dynamicForm.order = pageData.value.order;
        // dynamicForm.tambahan = pageData.value.tambahan;
        // dynamicForm.kerabat_darurat = pageData.value.kerabat_darurat;
        // dynamicForm.surat = pageData.value.surat;
        Object.assign(calcCredit, pageData.value.ekstra);
        Object.assign(dataPelanggan.value, pageData.value.pelanggan);
        Object.assign(alamatIdentitas.value, pageData.value.alamat_identitas);
        Object.assign(alamatTagih.value, pageData.value.alamat_tagih);
        Object.assign(dataPekerjaan.value, pageData.value.pekerjaan);
        Object.assign(dataOrder.value, pageData.value.order);
        Object.assign(dataTaksasi.value, pageData.value.barang_taksasi);
        Object.assign(dataTambahan.value, pageData.value.tambahan);
        Object.assign(dataKerabat.value, pageData.value.kerabat_darurat);
        Object.assign(dataSurat.value, pageData.value.surat);
        Object.assign(dataBank.value, pageData.value.info_bank);
    }
});

const formAssign = reactive({
    flag_pengajuan: null,
    pelanggan: dataPelanggan.value,
    alamat_identitas: alamatIdentitas.value,
    alamat_tagih: alamatTagih.value,
    pekerjaan: dataPekerjaan.value,
    order: dataOrder.value,
    barang_taksasi: dataTaksasi.value,
    tambahan: dataTambahan.value,
    kerabat_darurat: dataKerabat.value,
    info_bank: dataBank.value,
    ekstra: calcCredit,
    surat: dataSurat.value,
})
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
    formAssign.flag_pengajuan = "no";
    let idApp = pageData.value.id_application;
    loading.value = true;
    const response = await useApi({
        method: 'PUT',
        api: `cr_application/${idApp}`,
        data: formAssign,
        token: userToken
    });
    if (!response.ok) {
        message.error("data gagal disimpan");
        loading.value = false;
    } else {
        message.success("data berhasil disimpan");
        loading.value = false;
        router.replace('/task/apply-credit');
    }
}
const handleSend = async (e) => {
    e.preventDefault(e);
    formAssign.flag_pengajuan = "yes";
    let idApp = pageData.value.id_application;
    loadingSend.value = true;
    const response = await useApi({
        method: 'PUT',
        api: `cr_application/${idApp}`,
        data: formAssign,
        token: userToken
    });
    if (!response.ok) {
        message.error("data gagal dikirm");
        loadingSend.value = false;
    } else {
        message.success("data berhasil dikirim");
        loadingSend.value = false;
        router.replace('/task/apply-credit');
    }
}

</script>