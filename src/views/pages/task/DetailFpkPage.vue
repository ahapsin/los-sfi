<template>
  <n-card class="mt-2" title="Pengajuan Kredit" closable @close="handleClose">
    <template #header-extra>
      <black-list />
    </template>
    <div class="p-2 flex gap-2">
      <div
        class="border p-2 rounded-lg bg-green-50 border-green-200 w-full"
        v-show="approval.kapos"
      >
        <div class="flex gap-2">
          <n-icon size="20"><message-icon /></n-icon> <b>KAPOS</b>
        </div>
        {{ approval.kapos }}
      </div>
      <div
        class="border p-2 rounded-lg bg-green-50 border-green-200 w-full"
        v-show="approval.ho"
      >
        <div class="flex gap-2">
          <n-icon size="20"><message-icon /></n-icon> <b>HO</b>
        </div>
        {{ approval.ho }}
      </div>
    </div>
    <n-tabs type="line" animated>
      <n-tab-pane name="pelanggan" tab="Pelanggan">
        <div class="flex w-full gap-2">
          <n-form-item label="Nama" path="nama" class="w-full">
            <n-input placeholder="nama" v-model:value="dataPelanggan.nama" />
          </n-form-item>
          <n-form-item
            label="Nama Panggilan"
            path="nama_panggilan"
            class="w-full"
          >
            <n-input
              placeholder="nama panggilan"
              v-model:value="dataPelanggan.nama_panggilan"
            />
          </n-form-item>
        </div>
        <div class="flex w-full gap-2">
          <n-form-item
            label="Jenis kelamin"
            path="jenis_kelamin"
            class="w-full"
          >
            <n-select
              filterable
              placeholder="Jenis Kelamin"
              :options="optJenisKelamin"
              v-model:value="dataPelanggan.jenis_kelamin"
            />
          </n-form-item>
          <n-form-item label="Tempat Lahir" path="gol_darah" class="w-full">
            <n-input
              placeholder="Tempat Lahir"
              v-model:value="dataPelanggan.tempat_lahir"
            >
            </n-input>
          </n-form-item>
          <n-form-item label="Tanggal lahir" path="tgl_lahir" class="w-full">
            <div class="flex flex-col">
              <n-date-picker
                placeholder="Tanggal Lahir"
                v-model:formatted-value="dataPelanggan.tgl_lahir"
                value-format="yyyy-MM-dd"
                format="dd-MM-yyyy"
                type="date"
                @update:value="handleTanggalLahir"
                class="w-full"
              />
              <div
                class="absolute top-9 flex bg-yellow-50 gap-2 text-xs px-2"
                v-show="notifUsia"
              >
                <n-icon color="#FF9100"> <warning-icon /> </n-icon
                >{{ noteUsia }}
              </div>
            </div>
          </n-form-item>
          <n-form-item label="Status Kawin" path="jenis_kelamin" class="w-full">
            <n-input-group>
              <n-select
                filterable
                placeholder="Status Kawin"
                :options="optStatusKawin"
                v-model:value="dataPelanggan.status_kawin"
              />
            </n-input-group>
          </n-form-item>
        </div>
        <div class="flex w-full gap-2">
          <n-form-item label="Identitas" path="plafond" class="w-full">
            <n-select
              filterable
              placeholder="Jenis Identitas"
              :options="optJenisIdentitas"
              v-model:value="dataPelanggan.tipe_identitas"
            />
          </n-form-item>
          <n-form-item label="No Identitas" path="no_identitas" class="w-full">
            <n-input
              placeholder="No Identitas"
              v-model:value="dataPelanggan.no_identitas"
            >
            </n-input>
          </n-form-item>
        </div>
        <div class="flex w-full gap-2">
          <n-form-item label="No KK" path="no KK" class="w-full">
            <n-input
              placeholder="No Kartu Keluarga"
              v-model:value="dataPelanggan.no_kk"
            />
          </n-form-item>
        </div>
        <div class="flex gap-4">
          <n-form-item label="Pekerjaan" path="pekerjaan" class="w-full">
            <n-select
              filterable
              placeholder="pekerjaan"
              :options="optPekerjaan"
              v-model:value="dataPekerjaan.pekerjaan_id"
            />
          </n-form-item>
        </div>
        <n-form-item label="Pendidikan" path="pendidikan">
          <n-select
            filterable
            placeholder="pendidikan"
            :options="optPendidikan"
            v-model:value="dataPekerjaan.pendidikan"
          />
        </n-form-item>
        <div class="flex gap-2">
          <n-form-item label="Telepon Selullar 1" path="telepon" class="w-full">
            <n-input
              placeholder="Telepon Sellular 1"
              v-model:value="dataPekerjaan.telepon_selular"
            />
          </n-form-item>
          <n-form-item
            label="Telepon Selullar 2"
            path="telepon_selullar"
            class="w-full"
          >
            <n-input
              placeholder="Telepon Sellular 2"
              v-model:value="dataPekerjaan.telepon_rumah"
            >
            </n-input>
          </n-form-item>
        </div>
        <n-divider title-placement="left">
          Informasi Alamat Identitas
        </n-divider>
        <div class="flex gap-2">
          <n-form-item label="Alamat" class="w-full">
            <n-input
              placeholder="Alamat"
              v-model:value="alamatIdentitas.alamat"
            />
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
        <select-state-region
          v-model:provinsi="alamatIdentitas.provinsi"
          v-model:kota="alamatIdentitas.kota"
          v-model:kecamatan="alamatIdentitas.kecamatan"
          v-model:desa="alamatIdentitas.kelurahan"
        />
        <n-form-item label="Kode Pos" path="desa">
          <n-input
            placeholder="Kode Pos"
            v-model:value="alamatIdentitas.kode_pos"
          />
        </n-form-item>
        <div class="flex items-center justify-between border-b pb-2 mb-2">
          <strong class="text-base">Informasi Alamat Tagih</strong>
        </div>
        <div class="flex gap-2">
          <n-form-item label="Alamat" class="w-full">
            <n-input placeholder="Alamat" v-model:value="alamatTagih.alamat" />
          </n-form-item>
          <n-form-item label="RT">
            <n-input placeholder="RT" v-model:value="alamatTagih.rt"> </n-input>
          </n-form-item>
          <n-form-item label="RW">
            <n-input placeholder="RW" v-model:value="alamatTagih.rw"> </n-input>
          </n-form-item>
        </div>
        <select-state-region
          v-model:provinsi="alamatTagih.provinsi"
          v-model:kota="alamatTagih.kota"
          v-model:kecamatan="alamatTagih.kecamatan"
          v-model:desa="alamatTagih.kelurahan"
        />
        <n-form-item label="Kode Pos" path="desa">
          <n-input
            placeholder="Kode Pos"
            v-model:value="alamatTagih.kode_pos"
          />
        </n-form-item>
        <n-divider title-placement="left">
                  Dokumen Identitas
              </n-divider>
              <n-space>
                  <div v-for="attachment in dok_identitas" :key="attachment" class="bg-slate-50 !p-0">
                      <n-space>
                          <n-tooltip placement="top" trigger="hover">
                              <template #trigger>
                                  <n-image class="w-20 h-20 border-b border-2 rounded-md" :src="attachment.PATH">
                                  </n-image>
                              </template>
                              <span class="uppercase">{{ attachment.TYPE }}</span>
                          </n-tooltip>
                      </n-space>
                  </div>
              </n-space>
              <n-divider title-placement="left">
                  Dokumen Jaminan
              </n-divider>
              <n-space>
                  <div v-for="attachment in dok_jaminan" :key="attachment" class="bg-slate-50 !p-0">
                      <n-space>
                          <n-tooltip placement="top" trigger="hover">
                              <template #trigger>
                                  <n-image class="w-20 h-20 border-b border-2 rounded-md" :src="attachment.PATH">
                                  </n-image>
                              </template>
                              <span class="uppercase">{{ attachment.TYPE }}</span>
                          </n-tooltip>
                      </n-space>
                  </div>
              </n-space>
              <n-divider title-placement="left">
                  Dokumen Pendukung
              </n-divider>
              <n-space>
                  <div v-for="attachment in dok_pendukung" :key="attachment" class="bg-slate-50 !p-0">
                      <n-space>
                          <n-tooltip placement="top" trigger="hover">
                              <template #trigger>
                                  <n-image class="w-20 h-20 border-b border-2 rounded-md" :src="attachment.PATH">
                                  </n-image>
                              </template>
                              <span class="uppercase">{{ attachment.TYPE }}</span>
                          </n-tooltip>
                      </n-space>
                  </div>
              </n-space>
      </n-tab-pane>
      <n-tab-pane name="order" tab="Order">
        <div class="flex gap-2">
          <n-form-item label="Tanggal Order" path="order" class="w-full">
            <n-input
              placeholder="Tanggal order"
               v-model:value="dataOrder.order_tanggal"
      
              class="w-full"
            />
          </n-form-item>
          <n-form-item
            label="Reff Pelanggan"
            path="reff_pelanggan"
            class="w-full"
          >
            <n-input
              placeholder="Reff Pelanggan"
              v-model:value="dataOrder.ref_pelanggan"
            />
          </n-form-item>
        </div>
        <n-form-item label="Surveyor" path="surveyor">
          <n-input
            placeholder="Surveyor"
            v-model:value="dataOrder.surveyor_name"
            disabled
          />
        </n-form-item>
        <n-form-item label="Catatan Survey" path="cat_survey">
          <n-input
            type="textarea"
            autosize
            show-count
            placeholder="catatan surveyor"
            v-model:value="dataOrder.catatan_survey"
            readonly
          />
        </n-form-item>
        <div class="flex gap-2">
          <n-form-item
            label="Nama Ibu Kandung"
            path="nama_ibu_kandung"
            class="w-full"
          >
            <n-input
              placeholder="Nama Ibu Kandung"
              v-model:value="dataOrder.nama_ibu"
            />
          </n-form-item>
          <n-form-item label="Lama Bekerja" path="lama_kerja" class="w-full">
            <n-input-number
              :show-button="false"
              placeholder="lama bekerja"
              v-model:value="dataOrder.lama_bekerja"
              class="w-full"
            >
              <template #suffix> bulan </template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="Tanggungan" path="tanggungan" class="w-full">
            <n-input-number
              placeholder="Jumlah Tanggungan"
              v-model:value="dataOrder.tanggungan"
              class="w-full"
            />
          </n-form-item>
        </div>
        <div class="flex gap-2">
          <n-form-item
            label="Pendapatan Pelanggan"
            path="pendapatan_pribadi"
            class="w-full"
          >
            <n-input-number
              :parse="parse"
              :format="format"
              v-model:value="dataOrder.pendapatan_pribadi"
              :show-button="false"
              class="flex !w-full"
              placeholder="Pribadi"
            />
          </n-form-item>
          <n-form-item
            label="Pendapatan Pasangan"
            path="pendapatan_pasangan"
            class="w-full"
          >
            <n-input-number
              :parse="parse"
              :format="format"
              v-model:value="dataOrder.pendapatan_pasangan"
              :show-button="false"
              class="flex !w-full"
              placeholder="Pasangan"
            />
          </n-form-item>
          <n-form-item
            label="Pendapatan Lainnya"
            path="pendapatan_lainnya"
            class="w-full"
          >
            <n-input-number
              :parse="parse"
              :format="format"
              v-model:value="dataOrder.pendapatan_lainnya"
              :show-button="false"
              class="flex !w-full"
              placeholder="Lainnya"
            />
          </n-form-item>
          <n-form-item label="Biaya" path="biaya" class="w-full">
            <n-input-number
              :parse="parse"
              :format="format"
              v-model:value="dataOrder.biaya_bulanan"
              :show-button="false"
              class="flex !w-full"
              placeholder="Pengeluaran"
            />
          </n-form-item>
        </div>
        <n-divider title-placement="left"> NPWP </n-divider>
        <n-form-item label="No NPWP" path="no_npwp">
          <n-input placeholder="No NPWP" v-model:value="dataOrder.no_npwp" />
        </n-form-item>
        <n-divider title-placement="left"> Barang Taksasi </n-divider>
        <div class="flex-col gap-2">
          <taksasi-select-state
            v-model:brand="dataTaksasi.merk"
            v-model:tipe="dataTaksasi.tipe"
            v-model:tahun="dataTaksasi.tahun"
            v-model:pasar="dataTaksasi.nilai"
          />
          <n-space>
            <n-form-item label="No Polisi" path="no_polisi">
              <n-input
                placeholder="No Polisi"
                v-model:value="dataTaksasi.no_polisi"
              />
            </n-form-item>
            <n-form-item label="Warna" path="warna">
              <n-input placeholder="warna" v-model:value="dataTaksasi.warna" />
            </n-form-item>
            <n-form-item label="No BPKB" path="no_bpkb">
              <n-input
                placeholder="No BPKB"
                v-model:value="dataTaksasi.no_bpkb"
              />
            </n-form-item>
            <n-form-item label="Atas Nama" path="atas_nama">
              <n-input
                placeholder="Atas Nama"
                v-model:value="dataTaksasi.atas_nama"
              />
            </n-form-item>
            <n-form-item label="No Rangka" path="no_rangka">
              <n-input
                placeholder="No Rangka"
                v-model:value="dataTaksasi.no_rangka"
              />
            </n-form-item>
            <n-form-item label="No Mesin" path="no_mesin">
              <n-input
                placeholder="No Mesin"
                v-model:value="dataTaksasi.no_mesin"
              />
            </n-form-item>
          </n-space>
        </div>
      </n-tab-pane>
      <n-tab-pane name="tambahan" tab="Tambahan">
        <n-divider title-placement="left"> Pasangan </n-divider>
        <div class="flex gap-2">
          <n-form-item label="Nama Pasangan" path="nama_kerabat" class="w-full">
            <n-input
              placeholder="Nama Pasangan"
              v-model:value="dataPasangan.nama_pasangan"
            />
          </n-form-item>
          <n-form-item
            label="Tempat / Tanggal Lahir"
            path="order"
            class="w-full"
          >
            <n-input-group>
              <n-input
                placeholder="Tempat lahir"
                v-model:value="dataPasangan.tmptlahir_pasangan"
              />
              <n-date-picker
                placeholder="Tanggal lahir"
                v-model:formatted-value="dataPasangan.tgllahir_pasangan"
                value-format="yyyy-MM-dd"
                format="dd-MM-yyyy"
                type="date"
                class="w-full"
              />
            </n-input-group>
          </n-form-item>
          <n-form-item label="Pekerjaan" path="nama_kerabat" class="w-full">
            <n-input
              placeholder="pekerjaan"
              v-model:value="dataPasangan.pekerjaan_pasangan"
            />
          </n-form-item>
        </div>
        <n-form-item label="Alamat" path="nama_kerabat" class="w-full">
          <n-input
            type="textarea"
            :autosize="{
              minRows: 3,
            }"
            placeholder="Alamat"
            v-model:value="dataPasangan.alamat_pasangan"
          />
        </n-form-item>
        <n-divider title-placement="left"> Penjamin </n-divider>
        <div class="grid grid-cols-3 gap-2">
          <n-form-item label="No KTP" path="nama_kerabat" class="w-full">
            <n-input
              placeholder="KTP Penjamin"
              v-model:value="dataPenjamin.no_identitas"
              show-count
              :maxlength="16"
            />
          </n-form-item>
          <n-form-item label="Nama Penjamin" path="nama_kerabat" class="w-full">
            <n-input
              placeholder="Nama penjamin"
              v-model:value="dataPenjamin.nama"
            />
          </n-form-item>
          <n-form-item label="Tanggal Lahir" path="order" class="w-full">
            <n-date-picker
              placeholder="Tanggal Lahir"
              v-model:formatted-value="dataPenjamin.tgl_lahir"
              value-format="yyyy-MM-dd"
              format="dd-MM-yyyy"
              type="date"
              class="w-full"
            />
          </n-form-item>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <n-form-item
            label="Hubungan Dengan konsumen"
            path="hub_konsumen"
            class="w-full"
          >
            <n-select
              filterable
              :options="optHubCust"
              v-model:value="dataPenjamin.hub_cust"
            />
          </n-form-item>
          <n-form-item label="Telepon" path="telepon">
            <n-input
              placeholder="Telepon Sellular 1"
              v-model:value="dataPenjamin.no_hp"
              class="w-full"
            />
          </n-form-item>
          <n-form-item label="Pekerjaan penjamin" path="nama" class="w-full">
            <n-input
              placeholder="Pekerjaan Penjamin"
              v-model:value="dataPenjamin.pekerjaan"
            >
            </n-input>
          </n-form-item>
        </div>
        <n-form-item label="Alamat" path="nama_kerabat" class="w-full">
          <n-input
            :autosize="{
              minRows: 3,
            }"
            type="textarea"
            placeholder="Alamat"
            v-model:value="dataPenjamin.alamat"
          />
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
        <select-state-region
          v-model:provinsi="dataKerabat.provinsi"
          v-model:kota="dataKerabat.kota"
          v-model:kecamatan="dataKerabat.kecamatan"
          v-model:desa="dataKerabat.kelurahan"
        />
        <n-form-item label="Kode Pos" path="kodepos">
          <n-input
            placeholder="Kode Pos"
            v-model:value="dataKerabat.kode_pos"
          />
        </n-form-item>
        <n-form-item label="Telepon" path="telepon">
          <n-input-group>
            <n-input
              placeholder="Telepon Selular"
              v-model:value="dataKerabat.no_hp"
            />
          </n-input-group>
        </n-form-item>
        <n-divider title-placement="left"> Informasi Bank </n-divider>
        <n-dynamic-input
          v-model:value="formAssign.info_bank"
          :on-create="onCreate"
        >
          <template #create-button-default> Tambah Bank </template>
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
        <div class="w-full flex md:flex-row flex-col gap-4">
          <div class="flex flex-col w-full">
            <n-form-item
              label="Pokok Pembayaran"
              path="Nama Bank"
              class="w-full"
            >
              <n-input-number
                v-model:value="calcCredit.pokok_pembayaran"
                :parse="parse"
                :show-button="false"
                :format="format"
                disabled
                class="w-full"
              >
              </n-input-number>
            </n-form-item>
            <n-form-item label="Jenis Angsuran" path="jenis">
              <n-select
                filterable
                placeholder="Jenis Angsuran"
                :options="jenisAngsuran"
                v-model:value="calcCredit.jenis_angsuran"
                @update:value="handleTipe"
              />
            </n-form-item>
            <n-form-item label="Tenor / Angsuran" path="tenor">
              <div
                class="flex flex-col md:flex-row"
                v-show="tipeAngsuran == 'bulanan'"
              >
                <n-radio-group
                  v-model:value="calcCredit.tenor"
                  name="radiogroup"
                >
                  <n-radio @change="handleChange" name="tenor" value="6">
                    6 bulan<n-text code>
                      {{
                        skemaAngsuran.length == null
                          ? ` /
                      ${skemaAngsuran.tenor_6.angsuran.toLocaleString("US")}`
                          : ""
                      }}
                    </n-text>
                  </n-radio>
                  <n-divider vertical />
                  <n-radio name="tenor" @change="handleChange" value="12">
                    12 bulan<n-text code>
                      {{
                        skemaAngsuran.length == null
                          ? ` /
                      ${skemaAngsuran.tenor_12.angsuran.toLocaleString("US")}`
                          : ""
                      }}
                    </n-text>
                  </n-radio>
                  <n-divider vertical />
                  <n-radio name="tenor" @change="handleChange" value="18">
                    18 bulan<n-text code>
                      {{
                        skemaAngsuran.length == null
                          ? ` /
                      ${skemaAngsuran.tenor_18.angsuran.toLocaleString("US")}`
                          : ""
                      }}
                    </n-text>
                  </n-radio>
                  <n-divider vertical />
                  <n-radio name="tenor" @change="handleChange" value="24">
                    24 bulan<n-text code>
                      {{
                        skemaAngsuran.length == null
                          ? ` /
                      ${skemaAngsuran.tenor_24.angsuran.toLocaleString("US")}`
                          : ""
                      }}
                    </n-text>
                  </n-radio>
                </n-radio-group>
              </div>
              <div
                class="flex flex-col md:flex-row"
                v-show="tipeAngsuran == 'musiman'"
              >
                <n-radio-group
                  v-model:value="calcCredit.tenor"
                  name="radiogroup"
                >
                  <n-radio @change="handleChange" name="tenor" value="3">
                    1x 3 bulan<n-text code>
                      {{
                        skemaAngsuran.length == null
                          ? ` /
                      ${skemaAngsuran.tenor_6.angsuran.toLocaleString("US")}`
                          : ""
                      }}
                    </n-text>
                  </n-radio>
                  <n-divider vertical />
                  <n-radio name="tenor" @change="handleChange" value="6">
                    1 x 6 bulan<n-text code>
                      {{
                        skemaAngsuran.length == null
                          ? ` /
                      ${skemaAngsuran.tenor_12.angsuran.toLocaleString("US")}`
                          : ""
                      }}
                    </n-text>
                  </n-radio>
                  <n-divider vertical />
                  <n-radio name="tenor" @change="handleChange" value="12">
                    2 x 12 bulan<n-text code>
                      {{
                        skemaAngsuran.length == null
                          ? ` /
                      ${skemaAngsuran.tenor_18.angsuran.toLocaleString("US")}`
                          : ""
                      }}
                    </n-text>
                  </n-radio>
                  <n-divider vertical />
                  <n-radio name="tenor" @change="handleChange" value="18">
                    3 x 18 bulan<n-text code>
                      {{
                        skemaAngsuran.length == null
                          ? ` /
                      ${skemaAngsuran.tenor_24.angsuran.toLocaleString("US")}`
                          : ""
                      }}
                    </n-text>
                  </n-radio>
                </n-radio-group>
              </div>
            </n-form-item>
          </div>
          <div class="flex flex-col w-full">
            <n-form-item
              label="Bunga / Margin Eff"
              path="Nama Bank"
              class="w-full"
            >
              <n-input v-model:value="calcCredit.eff_rate" type="text" disabled>
                <template #suffix> % </template>
              </n-input>
            </n-form-item>
            <n-form-item label="Total Admin" path="Nama Bank" class="w-full">
              <n-input-number
                v-model:value="calcCredit.total"
                type="text"
                class="w-full"
                disabled
                :parse="parse"
                :format="format"
                :show-button="false"
              >
                <template #suffix> % </template>
              </n-input-number>
            </n-form-item>
            <n-form-item label="Nilai yang diterima" path="plafond">
              <n-input-number
                :parse="parse"
                :format="format"
                :placeholder="calcCredit.plafond"
                :show-button="false"
                class="flex !w-full"
                @update:value="handlePlafond"
                :loading="loading"
                v-model:value="calcCredit.nilai_yang_diterima"
              />
              <div
                class="absolute top-9 flex bg-yellow-50 gap-2 text-xs px-2"
                v-show="
                  dataTaksasi.nilai != '' &&
                  calcCredit.nilai_yang_diterima > dataTaksasi.nilai
                "
              >
                <n-icon color="#FF9100"> <warning-icon /> </n-icon>Plafon >
                Harga Pasar
              </div>
            </n-form-item>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script setup>
import { ref, reactive, computed,onMounted } from "vue";
import {
  MessageOutlined as MessageIcon,
  WarningRound as WarningIcon,
} from "@vicons/material";
import { useRoute } from "vue-router";
import { useMessage } from "naive-ui";
import { useApi } from "../../../helpers/axios";
import router from "../../../router";
const message = useMessage();
const loading = ref(false);
const baseRoute = useRoute();
const tipeAngsuran = ref("bulanan");
const calcCredit = reactive({
  net_admin: computed(() => parseInt(calcCredit.total_admin)),
  bunga_eff_actual: computed(() => calcCredit.bunga_eff),
  bunga_margin: computed(() =>
    Math.ceil(
      parseInt(
        ((calcCredit.bunga_flat / 12) *
          parseInt(calcCredit.periode) *
          parseInt(calcCredit.pokok_pembayaran)) /
          100
      )
    )
  ),
  pokok_margin: computed(
    () =>
      parseInt(calcCredit.pokok_pembayaran) + parseInt(calcCredit.bunga_margin)
  ),
  pokok_pembayaran: computed(() =>
    sum(parseInt(calcCredit.nilai_yang_diterima), parseInt(calcCredit.total))
  ),
  bunga_flat: computed(
    () =>
      ((calcCredit.periode * (calcCredit.bunga_eff_actual / 100 / 12)) /
        (1 -
          (1 + calcCredit.bunga_eff_actual / 100 / 12) ** -calcCredit.periode) -
        1) *
      (12 / calcCredit.periode) *
      100
  ),
});
const dataPelanggan = ref({});
const alamatIdentitas = ref({});
const alamatTagih = ref({});
const dataPekerjaan = ref({});
const dataOrder = ref({});
const dataTaksasi = ref({});
const dataTambahan = ref({});
const dataKerabat = ref({});
const dataPenjamin = ref({});
const dataSurat = ref({});
const dataAttachment = ref({});
const dataBank = ref([]);
const onCreate = () => {
  return {
    kode_bank: null,
    nama_bank: null,
    no_rekening: null,
    atas_nama: null,
    status: null,
  };
};
const pageData = ref([]);
const suspense = ref(false);
const userToken = localStorage.getItem("token");
const dataPasangan = ref({
  nama_pasangan: null,
  tmptlahir_pasangan: null,
  pekerjaan_pasangan: null,
  tgllahir_pasangan: null,
  alamat_pasangan: null,
});
const skemaAngsuran = ref([]);
const tenor6 = ref([]);
const tenor12 = ref([]);
const tenor18 = ref([]);
const tenor24 = ref([]);
const handleTipe = (e) => {
  tipeAngsuran.value = e;
  calcCredit.jenis_angsuran = e;
  const body = {
    plafond: calcCredit.nilai_yang_diterima,
    jenis_angsuran: e,
  };
  refAdmin(body);
};
const optJenisKelamin = ["Laki-laki", "perempuan"].map((v) => ({
  label: v,
  value: v,
}));
const optPekerjaan = [
  "BURUH HARIAN LEPAS",
  "BURUH PABRIK",
  "GURU",
  "MENGURUS RUMAH TANGGA",
  "NELAYAN",
  "PEDAGANG",
  "PEDAGANG KELONTONG",
  "PEDAGANG MAKANAN",
  "PEGAWAI SWASTA",
  "PELAJAR",
  "PETANI / PEKEBUN",
  "PNS",
  "SOPIR",
  "WIRASWASTA",
].map((v) => ({
  label: v,
  value: v,
}));
const optJenisIdentitas = ["KTP", "SIM", "PASPOR"].map((v) => ({
  label: v,
  value: v,
}));
const jenisAngsuran = ["Bulanan", "Musiman"].map((v) => ({
  label: v,
  value: v.toLowerCase(),
}));
const optStatusKawin = ["Kawin", "Belum Kawin", "Janda", "Duda"].map((v) => ({
  label: v,
  value: v,
}));
const optPendidikan = [
  "SEKOLAH DASAR",
  "SEKOLAH MENENGAH PERTAMA",
  "SEKOLAH MENENGAH ATAS",
  "DIPLOMA 1",
  "DIPLOMA 2",
  "DIPLOMA 3",
  "SARJANA S1",
].map((v) => ({
  label: v,
  value: v,
}));
const optHubCust = ["PASANGAN", "SAUDARA", "ORANG TUA"].map((v) => ({
  label: v,
  value: v,
}));
const idApp = baseRoute.params.idapplication;
const approval = ref({});
const sum = (num1, num2) => {
  if (isNaN(num1) || isNaN(num2)) {
    return undefined;
  }
  return num1 + num2;
};
const dok_identitas = ref([]);
const dok_pendukung = ref([]);
const dok_jaminan = ref([]);
const response = () =>
  useApi({
    method: "get",
    api: `cr_application/${idApp}`,
    token: userToken,
  }).then((res) => {
    if (!res.ok) {
      message.error("halam tidak ditemukan !");
      suspense.value = true;
    } else {
      message.loading("memuat fpk");
      suspense.value = false;
      pageData.value = res.data.response;
      Object.assign(calcCredit, pageData.value.ekstra);
      Object.assign(dataPelanggan.value, pageData.value.pelanggan);
      Object.assign(dataPenjamin.value, pageData.value.penjamin);
      Object.assign(dataPasangan.value, pageData.value.pasangan);
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
      Object.assign(dok_identitas.value, pageData.value.dokumen_indentitas);
      Object.assign(dok_jaminan.value, pageData.value.dokumen_jaminan);
      Object.assign(dok_pendukung.value, pageData.value.dokumen_pendukung);
      Object.assign(approval.value, pageData.value.approval);
      let tgllahir = toRef(pageData.value.pelanggan);
      var myDate = tgllahir.value.tgl_lahir;
      myDate = myDate.split("-");
      var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
      handleTanggalLahir(newDate.getTime());
      handleEkstra();
    }
  });
const refAdmin = async (body) => {
  skemaAngsuran.value = [];
  loading.value = true;
  const response = await useApi({
    method: "post",
    api: "fee_survey",
    data: body,
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.push("/");
  } else {
    loading.value = false;
    skemaAngsuran.value = response.data;
    tenor6.value = response.data.tenor_6;
    tenor12.value = response.data.tenor_12;
    tenor18.value = response.data.tenor_18;
    tenor24.value = response.data.tenor_24;
  }
};
const handlePlafond = (e) => {
  calcCredit.nilai_yang_diterima = e;
  const body = {
    plafond: e,
    jenis_angsuran: calcCredit.jenis_angsuran,
    tenor: calcCredit.tenor,
  };
  refAdmin(body);
};
const handleEkstra = () => {
  calcCredit.tenor = calcCredit.tenor.toString();
  const body = {
    plafond: calcCredit.nilai_yang_diterima,
    jenis_angsuran: calcCredit.jenis_angsuran,
    tenor: calcCredit.tenor,
  };
  refAdmin(body);
  handleChange();
};
const selectSkema = ref([]);
const handleChange = async () => {
  selectSkema.value = [];
  const body = {
    plafond: calcCredit.nilai_yang_diterima,
    jenis_angsuran: calcCredit.jenis_angsuran,
    tenor: calcCredit.tenor,
  };
  loading.value = true;
  const response = await useApi({
    method: "post",
    api: "fee",
    data: body,
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.push("/");
  } else {
    loading.value = false;
    Object.assign(calcCredit, response.data);
  }
};
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
});
const parse = (input) => {
  const nums = input.replace(/,/g, "").trim();
  if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums);
  return nums === "" ? null : Number.NaN;
};
const format = (value) => {
  if (value === null) return "";
  return value.toLocaleString("en-US");
};
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
};
const handleClose = () => {
  router.go(-1);
};
</script>
