<template>
    <n-card title="Pengajuan Kredit" closable @close="handleClose">
        <div class="p-2">
            <n-alert :show-icon="false" type="warning">
                Catatan KAPOS
                Catatan HO
            </n-alert>
        </div>
        <n-tabs type="line" animated>
            <n-tab-pane name="pelanggan" tab="Pelanggan">
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
                        <n-select filterable placeholder="Jenis Kelamin" :options="optJenisKelamin"
                            v-model:value="dataPelanggan.jenis_kelamin" />
                    </n-form-item>
                    <n-form-item label="Tempat Lahir" path="gol_darah" class="w-full">
                        <n-input placeholder="Tempat Lahir" v-model:value="dataPelanggan.tempat_lahir">
                        </n-input>
                    </n-form-item>
                    <n-form-item label="Tanggal lahir" path="tgl_lahir" class="w-full">
                        <n-space vertical>
                            <n-alert title="Informasi" type="warning" :bordered="bordered" v-if="notifUsia"> {{ noteUsia
                                }}</n-alert>
                            <n-date-picker placeholder="Tanggal Lahir" v-model:formatted-value="dataPelanggan.tgl_lahir"
                                value-format="yyyy-MM-dd" type="date" @update:value="handleTanggalLahir"
                                class="w-full" />
                        </n-space>
                    </n-form-item>
                    <!-- <n-form-item label="Golonga Darah" path="gol_darah" class="w-full">
                    <n-input placeholder="golongan darah" v-model:value="dataPelanggan.gol_darah">
                    </n-input>
                </n-form-item> -->
                    <n-form-item label="Status Kawin" path="jenis_kelamin" class="w-full">
                        <n-input-group>
                            <n-select filterable placeholder="Status Kawin" :options="optStatusKawin"
                                v-model:value="dataPelanggan.status_kawin" />
                            <!-- <n-date-picker placeholder="Tanggal Kawin"
                            v-model:formatted-value="dynamicForm.pelanggan.tgl_kawin" value-format="yyyy-MM-dd"
                            type="date" /> -->
                        </n-input-group>
                    </n-form-item>
                </div>


                <div class="flex w-full gap-2">
                    <n-form-item label="Identitas" path="plafond" class="w-full">
                        <n-select filterable placeholder="Jenis Identitas" :options="optJenisIdentitas"
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
                    <!-- <n-form-item label="Warganegara" path="warganegara" class="w-full">
                    <n-input placeholder="Warganegara" v-model:value="dataPelanggan.warganegara">
                    </n-input>
                </n-form-item> -->
                </div>
                <!-- <div class="flex gap-2"> -->
                <!-- <n-form-item label="Pekerjaan" path="nama" class="w-full">
                    <n-input placeholder="pekerjaan" v-model:value="dataPekerjaan.pekerjaan" />
                </n-form-item> -->
                <!-- <n-form-item label="Pekerjaan" path="pekerjaan" class="w-full">
                        <n-select filterable placeholder="pekerjaan" :options="optPekerjaan"
                            v-model:value="dataPekerjaan.pekerjaan" />
                    </n-form-item> -->
                <!-- <n-form-item label="Pekerjaan ID" path="nama" class="w-full">
                        <n-input placeholder="Pekerjaan Iadmin  D" v-model:value="dataPekerjaan.pekerjaan_id">
                        </n-input>
                    </n-form-item> -->
                <!-- </div> -->
                <div class="flex gap-4">
                    <n-form-item label="Usaha" path="usaha" class="w-full">
                        <n-input placeholder="usaha" v-model:value="dataPekerjaan.pekerjaan" />
                    </n-form-item>
                    <n-form-item label="Sektor" path="sektor" class="w-full">
                        <n-select filterable placeholder="pekerjaan" :options="optPekerjaan"
                            v-model:value="dataPekerjaan.pekerjaan_id" />
                    </n-form-item>
                </div>
                <!--<n-form-item label="Agama" path="agama">
                <n-select filterable placeholder="agama" :options="optAgama" v-model:value="dataPekerjaan.agama" />
            </n-form-item>-->
                <n-form-item label="Pendidikan" path="pendidikan">
                    <n-select filterable placeholder="pendidikan" :options="optPendidikan"
                        v-model:value="dataPekerjaan.pendidikan" />
                </n-form-item>
                <div class="flex gap-2">
                    <n-form-item label="Telepon Selullar 1" path="telepon" class="w-full">
                        <n-input placeholder="Telepon Sellular 1" v-model:value="dataPekerjaan.telepon_selular" />
                    </n-form-item>
                    <n-form-item label="Telepon Selullar 2" path="telepon_selullar" class="w-full">
                        <n-input placeholder="Telepon Sellular 2" v-model:value="dataPekerjaan.telepon_rumah">
                        </n-input>
                    </n-form-item>
                    <!-- <n-form-item label="Telepon" path="Kantor" class="w-full">
                    <n-input placeholder="Telepon Kantor" v-model:value="dataPekerjaan.telepon_kantor">
                    </n-input>
                </n-form-item> -->
                </div>
                <!-- <div class="flex gap-2">
                <n-form-item label="Ext 1" path="Ext" class="w-full">
                    <n-input placeholder="Ext 1" v-model:value="dataPekerjaan.Ext1" />
                </n-form-item>
                <n-form-item label="Ext 2" path="Ext" class="w-full">
                    <n-input placeholder="Ext 2" v-model:value="dataPekerjaan.Ext2">
                    </n-input>
                </n-form-item>
            </div> -->

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
                <div class="flex  items-center justify-between border-b pb-2 mb-2">
                    <strong class="text-base">Informasi Alamat Tagih</strong>
                </div>

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
                    Dokumen
                </n-divider>

                <n-space>
                    <n-image-group>
                        <n-space>
                            <n-card v-for="attachment in dataAttachment" :key="attachment" class="bg-pr-50 !border-0">
                                <n-image class="w-10 border-b border-2 rounded-md h-10" :src="attachment.PATH">
                                </n-image>
                                {{ attachment.TYPE.toUpperCase() }}
                            </n-card>
                        </n-space>
                    </n-image-group>

                </n-space>

            </n-tab-pane>
            <n-tab-pane name="order" tab="Order">

                <div class="flex gap-2">
                    <n-form-item label="Tanggal Order" path="order" class="w-full">
                        <n-date-picker placeholder="Tanggal order" v-model:formatted-value="dataOrder.order_tanggal"
                            value-format="yyyy-MM-dd" type="date" class="w-full" />
                    </n-form-item>
                    <!-- <n-form-item label="Status Order" path="status_order" class="w-full">
                    <n-select filterable placeholder="status order" :options="optStatusOrder"
                        v-model:value="dataOrder.order_status" />
                </n-form-item> -->
                    <!-- <n-form-item label="Tipe Order" path="order" class="w-full">
                    <n-select filterable placeholder="tipe" :options="optTipeOrder"
                        v-model:value="dataOrder.order_tipe" />
                </n-form-item> -->
                    <!-- <n-form-item label="Unit Bisnis" path="unit_bisnis" class="w-full">
                    <n-input placeholder="Unit bisnis" v-model:value="dataOrder.unit_bisnis" />
                </n-form-item> -->
                    <n-form-item label="Reff Pelanggan" path="reff_pelanggan" class="w-full">
                        <n-input placeholder="Reff Pelanggan" v-model:value="dataOrder.ref_pelanggan" />
                    </n-form-item>
                </div>
                <n-form-item label="Surveyor" path="surveyor">
                    <n-input placeholder="Surveyor" v-model:value="dataOrder.surveyor_name" disabled />
                </n-form-item>
                <n-form-item label="Catatan Survey" path="cat_survey">
                    <n-input type="textarea" autosize show-count placeholder="catatan surveyor"
                        v-model:value="dataOrder.catatan_survey" readonly />
                </n-form-item>
                <!-- <div class="flex gap-2">
                    <n-form-item label="Prog. Marketing" path="prog_marketing" class="w-full">
                        <n-input placeholder="Program Marketing" v-model:value="dataOrder.prog_marketing" />
                    </n-form-item>
                    <n-form-item label="Cara Bayar" path="cara_bayar" class="w-full">
                        <n-select filterable placeholder="Cara Bayar" :options="optCaraBayarPay"
                            v-model:value="dataOrder.cara_bayar" />
                    </n-form-item>
                </div> -->

                <div class="flex gap-2">
                    <!-- <n-form-item label="Kategori" path="kategori" class="w-full">
                        <n-select filterable placeholder="Kategori" :options="optKategori"
                            v-model:value="dataOrder.kategori" />
                    </n-form-item> -->
                    <n-form-item label="Nama Ibu Kandung" path="nama_ibu_kandung" class="w-full">
                        <n-input placeholder="Nama Ibu Kandung" v-model:value="dataOrder.nama_ibu" />
                    </n-form-item>
                    <n-form-item label="Lama Bekerja" path="lama_kerja" class="w-full">
                        <n-input-number :show-button="false" placeholder="lama bekerja"
                            v-model:value="dataOrder.lama_bekerja" class="w-full">
                            <template #suffix>
                                bulan
                            </template>
                        </n-input-number>
                    </n-form-item>
                    <n-form-item label="Tanggungan" path="tanggungan" class="w-full">
                        <n-input-number placeholder="Jumlah Tanggungan" v-model:value="dataOrder.tanggungan"
                            class="w-full" />
                    </n-form-item>
                </div>
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
                    <n-form-item label="Biaya" path="biaya" class="w-full">
                        <n-input-number :parse="parse" :format="format" v-model:value="dataOrder.biaya_bulanan"
                            :show-button="false" class="flex !w-full" placeholder="Pengeluaran" />
                    </n-form-item>
                </div>

                <n-divider title-placement="left">
                    NPWP
                </n-divider>
                <n-form-item label="No NPWP" path="no_npwp">
                    <n-input placeholder="No NPWP" v-model:value="dataOrder.no_npwp" />
                </n-form-item>
                <n-divider title-placement="left">
                    Barang Taksasi
                </n-divider>
                <div class="flex-col gap-2">
                    <!-- <n-form-item label="Kode Barang" path="kode_barang" class="w-full">
                        <n-input placeholder="Kode Barang" v-model:value="dataTaksasi.kode_barang" />
                    </n-form-item>
                    <n-form-item label="ID Tipe" path="id_tipe" class="w-full">
                        <n-input placeholder="ID Tipe" v-model:value="dataTaksasi.id_tipe" />
                    </n-form-item>
                    <n-form-item label="Tahun" path="tahun" class="w-full">
                        <n-input placeholder="Tahun" v-model:value="dataTaksasi.tahun" />
                    </n-form-item>
                    <n-form-item label="Harga Pasar" path="harga_pasar" class="w-full">
                        <n-input-number :parse="parse" :format="format" v-model:value="dataTaksasi.harga_pasar"
                            :show-button="false" class="flex !w-full" placeholder="harga pasar" />
                    </n-form-item> -->
                    <taksasi-select-state v-model:brand="dataTaksasi.merk" v-model:tipe="dataTaksasi.tipe"
                        v-model:tahun="dataTaksasi.tahun" v-model:pasar="dataTaksasi.nilai" />
                    <!-- <n-form-item label="Tipe Kendaraan" path="tipe_kendaraan">
                                        <n-select filterable placeholder="Tipe Kendaraan" :options="tipeKendaraan"
                                                v-model:value="jaminan.tipe" />
                                </n-form-item> -->
                    <n-space>
                        <n-form-item label="No Polisi" path="no_polisi">
                            <n-input placeholder="No Polisi" v-model:value="dataTaksasi.no_polisi" />
                        </n-form-item>
                        <!-- <n-form-item label="Tahun" path="tahun_kendaraan" :rule="rules.tahun_jaminan">
                                            <n-date-picker v-model:formatted-value="jaminan.tahun" value-format="yyyy"
                                                    type="year" placeholder="Tahun jaminan" clearable />
                                    </n-form-item> -->
                        <n-form-item label="Warna" path="warna">
                            <n-input placeholder="warna" v-model:value="dataTaksasi.warna" />
                        </n-form-item>
                        <n-form-item label="No BPKB" path="no_bpkb">
                            <n-input placeholder="No BPKB" v-model:value="dataTaksasi.no_bpkb" />
                        </n-form-item>
                        <n-form-item label="Atas Nama" path="atas_nama">
                            <n-input placeholder="Atas Nama" v-model:value="dataTaksasi.atas_nama" />
                        </n-form-item>
                        <!-- <n-form-item label="No Polisi" path="no_polisi">
                            <n-input placeholder="No Polisi" v-model:value="dataTaksasi.no_polisi" />
                        </n-form-item> -->
                        <n-form-item label="No Rangka" path="no_rangka">
                            <n-input placeholder="No Rangka" v-model:value="dataTaksasi.no_rangka" />
                        </n-form-item>
                        <n-form-item label="No Mesin" path="no_mesin">
                            <n-input placeholder="No Mesin" v-model:value="dataTaksasi.no_mesin" />
                        </n-form-item>
                    </n-space>
                    <!-- <n-form-item label="NO STNK" path="no_stnk">
                                        <n-input placeholder="No STNK" v-model:value="jaminan.no_stnk" />
                                </n-form-item> -->
                    <!-- <n-form-item label="Nilai Jaminan" path="nilai_jaminan">
                                        <n-input-number :parse="parse" :format="format" v-model:value="jaminan.nilai"
                                                placeholder="Nilai Jaminan" :show-button="false">
                                        </n-input-number>
                                </n-form-item> -->
                </div>

            </n-tab-pane>
            <n-tab-pane name="tambahan" tab="Tambahan">
                <!-- <n-form-item label="Nama BI" path="nama_bi">
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
            </n-form-item> -->
                <n-divider title-placement="left">
                    Penjamin
                </n-divider>
                <div class="flex gap-2">
                    <n-form-item label="Nama Penjamin" path="nama_kerabat" class=" w-full">
                        <n-input placeholder="Nama penjamin" v-model:value="dataPenjamin.nama" />
                    </n-form-item>
                    <n-form-item label="Tanggal Lahir" path="order" class="w-full">
                        <n-date-picker placeholder="Tanggal order" v-model:formatted-value="dataPenjamin.tgl_lahir"
                            value-format="yyyy-MM-dd" type="date" class="w-full" />
                    </n-form-item>
                    <n-form-item label="Hubungan Dengan konsumen" path="hub_konsumen" class=" w-full">
                        <n-select filterable :options="optHubCust" v-model:value="dataPenjamin.hub_cust" />
                    </n-form-item>
                </div>
                <!-- <n-form-item label="Alamat" path="alamat">
                <n-input-group>
                    <n-input placeholder="Alamat" v-model:value="dataPenjamin.alamat" />
                    <n-input placeholder="RT" v-model:value="dataPenjamin.rt" />
                    <n-input placeholder="RW" v-model:value="dataPenjamin.rw" />
                </n-input-group>
            </n-form-item>
            <select-state-region v-model:provinsi="dataPenjamin.provinsi" v-model:kota="dataPenjamin.kota"
                v-model:kecamatan="dataPenjamin.kecamatan" v-model:desa="dataPenjamin.kelurahan" />
            <n-form-item label="Kode Pos" path="kodepos">
                <n-input placeholder="Kode Pos" v-model:value="dataPenjamin.kode_pos" />
            </n-form-item> -->

                <n-form-item label="Telepon" path="telepon">
                    <n-input placeholder="Telepon Sellular 1" v-model:value="dataPenjamin.no_hp" />
                </n-form-item>
                <n-form-item label="Pekerjaan penjamin" path="nama" class="w-full">
                    <n-input placeholder="Pekerjaan Penjamin" v-model:value="dataPenjamin.pekerjaan">
                    </n-input>
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
                        <!-- <n-input placeholder="Telepon Rumah" v-model:value="dataKerabat.no_telp" /> -->
                        <n-input placeholder="Telepon Selular" v-model:value="dataKerabat.no_hp" />
                    </n-input-group>
                </n-form-item>
                <!-- <n-divider title-placement="left">
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
            </n-form-item> -->
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
            </n-tab-pane>
            <n-tab-pane name="ekstra" tab="Ekstra">

                <div class="w-full flex md:flex-row flex-col gap-4 ">
                    <div class="flex flex-col w-full">
                        <!-- {{ calcCredit }} -->
                        <n-form-item label="Pokok Pembayaran" path="Nama Bank" class="w-full">
                            <n-input-number v-model:value="calcCredit.pokok_pembayaran" :parse="parse"
                                :show-button="false" :format="format" disabled class="w-full">
                            </n-input-number>
                        </n-form-item>
                        <n-form-item label="Jenis Angsuran" path="jenis">
                            <n-select filterable placeholder="Jenis Angsuran" :options="jenisAngsuran"
                                v-model:value="calcCredit.jenis_angsuran" @update:value="handleTipe" />
                        </n-form-item>

                        <n-form-item label="Tenor / Angsuran" path="tenor">
                            <!-- <n-select filterable placeholder="Tenor Kredit" :options="tenorKredit"
                                                v-model:value="order.tenor" /> -->
                            <div class="flex flex-col md:flex-row" v-show="tipeAngsuran == 'bulanan'">
                                <n-radio-group v-model:value="calcCredit.tenor" name="radiogroup">
                                    <n-radio @change="handleChange" name="tenor" value="6">
                                        6 bulan<n-text code>
                                            {{ skemaAngsuran.length == null ?
                                                ` /
                                            ${skemaAngsuran.tenor_6.angsuran.toLocaleString('US')}`
                                                :
                                                ''
                                            }}
                                        </n-text>
                                    </n-radio>
                                    <n-divider vertical />
                                    <n-radio name="tenor" @change="handleChange" value="12">
                                        12 bulan<n-text code>
                                            {{ skemaAngsuran.length == null ?
                                                ` /
                                            ${skemaAngsuran.tenor_12.angsuran.toLocaleString('US')}`
                                                :
                                                ''
                                            }}
                                        </n-text>
                                    </n-radio>
                                    <n-divider vertical />
                                    <n-radio name="tenor" @change="handleChange" value="18">
                                        18 bulan<n-text code>
                                            {{ skemaAngsuran.length == null ?
                                                ` /
                                            ${skemaAngsuran.tenor_18.angsuran.toLocaleString('US')}`
                                                :
                                                ''
                                            }}
                                        </n-text>
                                    </n-radio>
                                    <n-divider vertical />
                                    <n-radio name="tenor" @change="handleChange" value="24">
                                        24 bulan<n-text code>
                                            {{ skemaAngsuran.length == null ?
                                                ` /
                                            ${skemaAngsuran.tenor_24.angsuran.toLocaleString('US')}`
                                                :
                                                ''
                                            }}
                                        </n-text>
                                    </n-radio>
                                </n-radio-group>
                            </div>
                            <div class="flex flex-col md:flex-row" v-show="tipeAngsuran == 'musiman'">
                                <n-radio-group v-model:value="calcCredit.tenor" name="radiogroup">
                                    <n-radio @change="handleChange" name="tenor" value="3">
                                        1x 3 bulan<n-text code>
                                            {{ skemaAngsuran.length == null ?
                                                ` /
                                            ${skemaAngsuran.tenor_6.angsuran.toLocaleString('US')}`
                                                :
                                                ''
                                            }}
                                        </n-text>
                                    </n-radio>
                                    <n-divider vertical />
                                    <n-radio name="tenor" @change="handleChange" value="6">
                                        1 x 6 bulan<n-text code>
                                            {{ skemaAngsuran.length == null ?
                                                ` /
                                            ${skemaAngsuran.tenor_12.angsuran.toLocaleString('US')}`
                                                :
                                                ''
                                            }}
                                        </n-text>
                                    </n-radio>
                                    <n-divider vertical />
                                    <n-radio name="tenor" @change="handleChange" value="12">
                                        2 x 12 bulan<n-text code>
                                            {{ skemaAngsuran.length == null ?
                                                ` /
                                            ${skemaAngsuran.tenor_18.angsuran.toLocaleString('US')}`
                                                :
                                                ''
                                            }}
                                        </n-text>
                                    </n-radio>
                                    <n-divider vertical />
                                    <n-radio name="tenor" @change="handleChange" value="18">
                                        3 x 18 bulan<n-text code>
                                            {{ skemaAngsuran.length == null ?
                                                ` /
                                            ${skemaAngsuran.tenor_24.angsuran.toLocaleString('US')}`
                                                :
                                                ''
                                            }}
                                        </n-text>
                                    </n-radio>
                                </n-radio-group>
                            </div>
                        </n-form-item>

                        <!-- <n-form-item label="Bunga / Margin Flat" path="Nama Bank" class="w-full">
                            <n-input v-model:value="calcCredit.nilai_yang_diterima" type="text" disabled>
                                <template #suffix>
                                    %
                                </template>
                            </n-input>
                        </n-form-item> -->
                    </div>
                    <div class="flex flex-col w-full">
                        <n-form-item label="Bunga / Margin Eff" path="Nama Bank" class="w-full">
                            <n-input v-model:value="calcCredit.eff_rate" type="text" disabled>
                                <template #suffix>
                                    %
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item label="Total Admin" path="Nama Bank" class="w-full">
                            <n-input-number v-model:value="calcCredit.total" type="text" class="w-full" disabled
                                :parse="parse" :format="format" :show-button="false">
                                <template #suffix>
                                    %
                                </template>
                            </n-input-number>
                        </n-form-item>
                        <!-- <n-form-item label="Bunga / Margin" path="Nama Bank" class="w-full">
                            <n-input v-model:value="calcCredit.bunga_margin" type="text" disabled>
                            </n-input>
                        </n-form-item>
                        <n-form-item label="Pokok + Margin" path="Nama Bank" class="w-full">
                            <n-input v-model:value="calcCredit.pokok_margin" type="text" disabled>
                            </n-input>
                        </n-form-item> -->
                        <n-form-item label="Nilai yang diterima" path="plafond">
                            <n-input-number :parse="parse" :format="format" :placeholder="calcCredit.plafond"
                                :show-button="false" class="flex !w-full" @update:value="handlePlafond"
                                :loading="loading" v-model:value="calcCredit.nilai_yang_diterima" />
                        </n-form-item>
                    </div>
                </div>

            </n-tab-pane>
            <template #suffix>
                <n-popconfirm :show-icon="false">
                    <template #activator>
                        <n-button :loading="loading" type="success">Konfirmasi</n-button>
                    </template>
                    <n-input type="textarea" placeholder="keterangan" v-model:value="keterangan"
                        class="!w-[300px]"></n-input>
                    <template #action>
                        <n-button type="primary" @click="handlePositiveClick">Setuju</n-button>
                        <n-button secondary type="warning" @click="handleNegativeClick">Tolak</n-button>
                        <n-button secondary type="error" @click="handleTrashClick"> <template #icon>
                                <n-icon><delete-icon /></n-icon>
                            </template></n-button>
                    </template>
                </n-popconfirm>
            </template>
        </n-tabs>
    </n-card>

</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { ArrowBackOutlined as ArrowBack, ArrowForwardOutlined as ArrowForward, SendRound as SendIcon, SaveAsOutlined as SaveIcon, DeleteOutlineRound as DeleteIcon } from "@vicons/material";
import { useRoute } from "vue-router";
import { useMessage } from "naive-ui";
import { useApi } from "../../../helpers/axios";
import router from '../../../router';
const message = useMessage();
const loading = ref(false);
const loadingSend = ref(false);
const baseRoute = useRoute();

const tipeAngsuran = ref('bulanan');
const calcCredit = reactive({
    net_admin: computed(() => parseInt(calcCredit.total_admin)),
    bunga_eff_actual: computed(() => calcCredit.bunga_eff),
    bunga_margin: computed(() => Math.ceil(parseInt(calcCredit.bunga_flat / 12 * parseInt(calcCredit.periode) * (parseInt(calcCredit.pokok_pembayaran)) / 100))),
    pokok_margin: computed(() => parseInt(calcCredit.pokok_pembayaran) + parseInt(calcCredit.bunga_margin)),
    pokok_pembayaran: computed(() => sum(parseInt(calcCredit.nilai_yang_diterima), parseInt(calcCredit.total))),
    // angsuran: computed(() => ((calcCredit.pokok_pembayaran + calcCredit.bunga_margin) / calcCredit.periode)),
    // angsuran: computed(() => (Math.ceil((calcCredit.pokok_pembayaran + calcCredit.bunga_margin) / calcCredit.periode / 1000) * 1000)),
    // provisi: computed(() => (Math.ceil((calcCredit.pokok_pembayaran + calcCredit.bunga_margin) / calcCredit.periode / 1000) * 1000)),
    bunga_flat: computed(() => (((calcCredit.periode * ((calcCredit.bunga_eff_actual / 100) / 12)) / (1 - (1 + ((calcCredit.bunga_eff_actual / 100) / 12)) ** (-calcCredit.periode))) - 1) * (12 / calcCredit.periode) * 100),
});

const dataPelanggan = ref({});
const alamatIdentitas = ref({});
const alamatTagih = ref({});
const dataPekerjaan = ref({});
const dataOrder = ref({});
const dataTaksasi = ref({});
const dataJaminan = reactive({});
const dataTambahan = ref({});
const dataKerabat = ref({});
const dataPenjamin = ref({});
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

const skemaAngsuran = ref([]);
const nilaiAngsuran = reactive({
    tenor6: null,
    tenor12: null,
    tenor18: null,
    tenor24: null
});
const tenor6 = ref([]);
const tenor12 = ref([]);
const tenor18 = ref([]);
const tenor24 = ref([]);
const next = () => current.value += 1;
const prev = () => current.value -= 1;


const handleTipe = (e) => {
    tipeAngsuran.value = e;
    calcCredit.jenis_angsuran = e;
    const body = {
        plafond: calcCredit.nilai_yang_diterima,
        jenis_angsuran: e,
    }
    refAdmin(body);
}
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
const optPekerjaan = ["Pedagang", "Petani", "peternak", "Nelayan"].map(
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
const jenisAngsuran = ["Bulanan", "Musiman"].map(
    (v) => ({
        label: v,
        value: v.toLowerCase(),
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
const optKategori = ["BUKAN KARYAWAN", "KARYAWAN", "KARYAWAN PERUSAHAAN AFILIASI"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optStatusKawin = ["Kawin", "Belum Kawin", "Janda", "Duda"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optAgama = ["ISLAM", "PROTESTAN", "KATHOLIK", "HINDU", "BUDHA", "KONG HU CU", "OTHERS"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optPendidikan = ["SEKOLAH DASAR", "SEKOLAH MENENGAH PERTAMA", "SEKOLAH MENENGAH ATAS", "DIPLOMA 1", "DIPLOMA 2", "DIPLOMA 3", "SARJANA S1"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optPeriode = ["Bulanan", "Musiman"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optCaraBayarPay = ["KE KASIR", "DITAGIH KOLEKTOR", "ATM", "TRANSFER BANK", "PDC"].map(
    (v) => ({
        label: v,
        value: v
    }));
const optHubCust = ["PASANGAN", "SAUDARA", "ORANG TUA"].map(
    (v) => ({
        label: v,
        value: v
    }));

const idApp = baseRoute.params.idapplication;
const actionPage = baseRoute.params.action;

const copyAddress = () => Object.assign(alamatTagih.value, alamatIdentitas.value);
const sum = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) {
        return undefined;
    }
    return num1 + num2;
};

const response = () => useApi({
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
        Object.assign(dataPenjamin.value, pageData.value.penjamin);
        Object.assign(alamatIdentitas.value, pageData.value.alamat_identitas);
        Object.assign(alamatTagih.value, pageData.value.alamat_tagih);
        Object.assign(dataPekerjaan.value, pageData.value.pekerjaan);
        Object.assign(dataOrder.value, pageData.value.order);
        Object.assign(dataTaksasi.value, pageData.value.jaminan_kendaraan);
        Object.assign(dataTambahan.value, pageData.value.tambahan);
        Object.assign(dataKerabat.value, pageData.value.kerabat_darurat);
        Object.assign(dataSurat.value, pageData.value.surat);
        Object.assign(dataBank.value, pageData.value.info_bank);
        Object.assign(dataAttachment.value, pageData.value.attachment);
        handleEkstra();
    }
});

const refAdmin = async (body) => {
    skemaAngsuran.value = [];
    // const bodyPost = {
    //         "plafond": 1500000,
    //         "jenis_angsuran": "bulanan"
    // };
    loading.value = true;
    const response = await useApi({
        method: 'post',
        api: 'fee_survey',
        data: body,
        token: userToken
    });
    if (!response.ok) {
        message.error("sesi berakhir");
        localStorage.removeItem("token");
        router.replace('/');
    } else {
        loading.value = false;
        skemaAngsuran.value = response.data;
        tenor6.value = response.data.tenor_6;
        tenor12.value = response.data.tenor_12;
        tenor18.value = response.data.tenor_18;
        tenor24.value = response.data.tenor_24;
    }
}
const handlePlafond = (e) => {
    calcCredit.nilai_yang_diterima = e;
    const body = {
        plafond: e,
        jenis_angsuran: calcCredit.jenis_angsuran,
        tenor: calcCredit.tenor,
    }
    refAdmin(body);
}
const handleEkstra = () => {
    calcCredit.tenor = calcCredit.tenor.toString();
    const body = {
        plafond: calcCredit.nilai_yang_diterima,
        jenis_angsuran: calcCredit.jenis_angsuran,
        tenor: calcCredit.tenor,
    }
    refAdmin(body);
    handleChange();
}
const selectSkema = ref([]);
const handleChange = async (e) => {
    selectSkema.value = [];
    const body = {
        plafond: calcCredit.nilai_yang_diterima,
        jenis_angsuran: calcCredit.jenis_angsuran,
        tenor: calcCredit.tenor,
    }
    loading.value = true;
    const response = await useApi({
        method: 'post',
        api: 'fee',
        data: body,
        token: userToken
    });
    if (!response.ok) {
        message.error("sesi berakhir");
        localStorage.removeItem("token");
        router.replace('/');
    } else {
        loading.value = false;
        Object.assign(calcCredit, response.data);
    }
}
onMounted(() => {
    response();
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
    penjamin: dataPenjamin.value,
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
const notifUsia = ref(false);
const noteUsia = ref(false);
const handleTanggalLahir = (e) => {
    var month_diff = Date.now() - e;
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    if (age > 19 && age < 60) {
        notifUsia.value = false;
    } else {
        if (age < 19) {
            notifUsia.value = true;
            noteUsia.value = `usia ${age} tahun, usia < dari 19 Tahun`;
        } else if (age > 60) {
            notifUsia.value = true;
            noteUsia.value = `usia ${age} tahun, usia > dari 60 Tahun`;
        }
    }
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


const handleImagePost = ({ file, data, onError, onFinish, onProgress }) => {
    let idApp = pageData.value.order.cr_prospect_id;
    const form = new FormData();
    form.append('image', file.file);
    form.append('type', 'KK');
    form.append('cr_prospect_id', idApp);
    const headers = {
        Authorization: `Bearer ${userToken}`,
    }

    lyla.post('https://api.kspdjaya.id/image_upload_prospect', {
        headers,
        body: form,
        onUploadProgress: ({ percent }) => {
            onProgress({ percent: Math.ceil(percent) });
        }
    }).then(({ json }) => {
        message.success("upload image berhasil");
        onFinish();
    }).catch((error) => {
        message.success("upload image gagal !");
        onError();
    });
};
const handlePositiveClick = async (e) => {
    e.preventDefault(e);
    const bodyPost = {
        cr_application_id: pageData.value.id_application,
        flag: "yes",
        keterangan: keterangan.value
    }
    loading.value = true;
    const response = await useApi({
        method: 'POST',
        api: `application_approval_ho`,
        data: bodyPost,
        token: userToken
    });
    if (!response.ok) {
        message.error("konfirmasi gagal");
        loading.value = false;
    } else {
        message.success("konfirmasi berhasil");
        loading.value = false;
        router.replace('/task/approval_ho');
    }
}
const handleNegativeClick = async (e) => {
    e.preventDefault(e);
    const bodyPost = {
        cr_application_id: pageData.value.id_application,
        flag: "no",
        keterangan: keterangan.value
    }
    loading.value = true;
    const response = await useApi({
        method: 'POST',
        api: `application_approval_ho`,
        data: bodyPost,
        token: userToken
    });
    if (!response.ok) {
        message.error("konfirmasi gagal");
        loading.value = false;
    } else {
        message.success("konfirmasi berhasil");
        loading.value = false;
        router.replace('/task/approval_ho');
    }
}
const handleTrashClick = async (e) => {
    e.preventDefault(e);
    const bodyPost = {
        cr_application_id: pageData.value.id_application,
        flag: "delete",
        keterangan: keterangan.value
    }
    loading.value = true;
    const response = await useApi({
        method: 'POST',
        api: `application_approval_ho`,
        data: bodyPost,
        token: userToken
    });
    if (!response.ok) {
        message.error("konfirmasi gagal");
        loading.value = false;
    } else {
        message.success("konfirmasi berhasil");
        loading.value = false;
        router.replace('/task/approval_ho');
    }
}
const handleClose = () => {
    router.replace({ name: 'Approval HO' });
}
</script>