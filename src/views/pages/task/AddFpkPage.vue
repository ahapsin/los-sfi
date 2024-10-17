<template>
  <blacklist-alert :pesan="bl_pesan" />
  <!-- <n-collapse>
    <n-collapse-item title="identitas" name="1">
      <div>
        <pre>{{ dok_identitas }}</pre>
      </div>
    </n-collapse-item>
    <n-collapse-item title="jaminan" name="2">
      <div>
        <pre>{{ dok_jaminan }}</pre>
      </div>
    </n-collapse-item>
    <n-collapse-item title="order" name="3">
      <div>
        <pre>{{ dataOrder }}</pre>
      </div>
    </n-collapse-item>
    <n-collapse-item title="taksasi" name="4">
      <div>
        <pre>{{ dataTaksasi }}</pre>
      </div>
    </n-collapse-item>
  </n-collapse> -->
  <n-spin :show="suspense">
    <n-form
      ref="formRef"
      :model="dataPelanggan"
      :rules="rules"
      :label-placement="width <= 920 ? 'top' : 'top'"
      require-mark-placement="right-hanging"
      label-width="auto"
    >
      <n-space vertical class="bg-white border rounded-2xl p-4">
        <n-steps
          :current="current"
          :status="currentStatus"
          v-model:current="current"
        >
          <n-step title="Pelanggan" />
          <n-step title="Order" />
          <n-step title="Tambahan" />
          <n-step title="Ekstra" />
        </n-steps>
      </n-space>
      <n-flex class="pt-2">
        <n-card
          v-show="current == 1"
          title="Informasi pelanggan"
          :segmented="{
            footer: 'soft',
          }"
        >
          <template #header-extra>
            <black-list
              :no_ktp="dataPelanggan.no_identitas"
              :no_kk="dataPelanggan.no_kk"
            />
          </template>
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
                v-show="noteUsia"
              >
                <n-icon color="#FF9100"> <warning-icon /> </n-icon
                >{{ noteUsia }}
              </div>
            </n-form-item>
            <n-form-item
              label="Status Kawin"
              path="jenis_kelamin"
              class="w-full"
            >
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
            <n-form-item
              label="No Identitas"
              path="no_identitas"
              class="w-full"
            >
              <n-input
                :show-button="false"
                class="w-full"
                placeholder="No Identitas"
                show-count
                :maxlength="16"
                v-model:value="dataPelanggan.no_identitas"
              >
              </n-input>
            </n-form-item>
            <n-form-item label="No KK" path="no KK" class="w-full">
              <n-input
                placeholder="No Kartu Keluarga"
                v-model:value="dataPelanggan.no_kk"
                show-count
                :maxlength="16"
              />
            </n-form-item>
          </div>
          <div class="flex gap-4">
            <n-form-item label="Sektor" path="sektor" class="w-full">
              <n-select
                filterable
                placeholder="pekerjaan"
                :options="optPekerjaan"
                v-model:value="dataPekerjaan.pekerjaan_id"
              />
            </n-form-item>
            <n-form-item label="Pendidikan" path="pendidikan" class="w-full">
              <n-select
                filterable
                placeholder="pendidikan"
                :options="optPendidikan"
                v-model:value="dataPekerjaan.pendidikan"
              />
            </n-form-item>
          </div>
          <div class="flex gap-2">
            <n-form-item
              label="Telepon Selullar 1"
              path="telepon"
              class="w-full"
            >
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
            <n-button
              secondary
              type="primary"
              @click="copyAddress"
              v-show="actionPage != 'view'"
            >
              salin alamat identitas</n-button
            >
          </div>
          <div class="flex gap-2">
            <n-form-item label="Alamat" class="w-full">
              <n-input
                placeholder="Alamat"
                v-model:value="alamatTagih.alamat"
              />
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
          <n-divider title-placement="left"> Dokumen Identitas </n-divider>
          <n-space v-show="actionPage != 'view'" justify="space-between">
            <n-space>
              <file-upload
                title="KTP"
                :def_value="findDocByType(dok_identitas, 'ktp')"
                endpoint="image_upload_prospect"
                type="ktp"
                :idapp="pageData.survey_id"
              />
              <file-upload
                title="KK"
                :def_value="findDocByType(dok_identitas, 'kk')"
                endpoint="image_upload_prospect"
                type="kk"
                :idapp="pageData.survey_id"
              />
              <file-upload
                title="KTP Pasangan"
                :def_value="findDocByType(dok_identitas, 'ktp_pasangan')"
                endpoint="image_upload_prospect"
                type="ktp_pasangan"
                :idapp="pageData.survey_id"
              />
            </n-space>
          </n-space>
          <n-divider v-show="actionPage != 'view'" title-placement="left"
            >Dokumen Jaminan</n-divider
          >
          <n-space v-show="actionPage != 'view'">
            <file-upload
              title="No Rangka"
              :def_value="findDocByType(dok_jaminan, 'no_rangka')"
              endpoint="image_upload_prospect"
              type="no_rangka"
              :idapp="pageData.survey_id"
            />
            <file-upload
              title="No Mesin"
              :def_value="findDocByType(dok_jaminan, 'no_mesin')"
              endpoint="image_upload_prospect"
              type="no_mesin"
              :idapp="pageData.survey_id"
            />
            <file-upload
              title="STNK"
              :def_value="findDocByType(dok_jaminan, 'stnk')"
              endpoint="image_upload_prospect"
              type="stnk"
              :idapp="pageData.survey_id"
            />
            <file-upload
              title="Depan"
              :def_value="findDocByType(dok_jaminan, 'depan')"
              endpoint="image_upload_prospect"
              type="depan"
              :idapp="pageData.survey_id"
            />
            <file-upload
              title="Belakang"
              :def_value="findDocByType(dok_jaminan, 'belakang')"
              endpoint="image_upload_prospect"
              type="belakang"
              :idapp="pageData.survey_id"
            />
            <file-upload
              title="Kanan"
              :def_value="findDocByType(dok_jaminan, 'kanan')"
              endpoint="image_upload_prospect"
              type="kanan"
              :idapp="pageData.survey_id"
            />
            <file-upload
              title="Kiri"
              :def_value="findDocByType(dok_jaminan, 'kiri')"
              endpoint="image_upload_prospect"
              type="kiri"
              :idapp="pageData.survey_id"
            />
          </n-space>
          <n-divider v-show="actionPage != 'view'" title-placement="left"
            >Dokumen Pendukung</n-divider
          >
          <div>
            <file-upload
              :def_preview="true"
              title="pendukung"
              :def_value="findDocByType(dok_pendukung, 'other')"
              endpoint="image_upload_prospect"
              type="other"
              :idapp="pageData.survey_id"
            />
            <div class="grid grid-cols-10 grid-flow-row gap-2 pt-2" v-if="dok_pendukung.length > 0">
              <n-image
                v-for="dok in dok_pendukung"
                :key="dok.id"
                :src="dok.PATH"
                class="min-w-20 rounded-xl hover:shadow-md hover:border-2"
              />
            </div>
          </div>
          <n-divider v-show="actionPage != 'view'" />
        </n-card>
        <n-card
          v-if="current == 2"
          title="Informasi Order"
          :segmented="{
            content: true,
            footer: 'soft',
          }"
        >
          <div class="flex gap-2">
            <n-form-item label="Tanggal Order" path="order" class="w-full">
              <n-date-picker
                placeholder="Tanggal order"
                :default-value="Date.now()"
                v-model:value-formatted="dataOrder.order_tanggal"
                value-format="yyyy-MM-dd"
                type="date"
                format="dd-MM-yyyy"
                class="w-full"
                disabled
              />
            </n-form-item>
            <n-form-item
              label="Reff Pelanggan"
              path="reff_pelanggan"
              class="w-full"
            >
              <div class="flex gap-2">
                <n-select
                  filterable
                  placeholder="reff pelanggan"
                  :options="optReff"
                  v-model:value="dataOrder.ref_pelanggan"
                  class="w-full"
                />
                <n-input
                  placeholder="Reff Pelanggan"
                  v-show="
                    dataOrder.ref_pelanggan == 'Lainnya' ||
                    dataOrder.ref_pelanggan == 'Mediator'
                  "
                  v-model:value="dataOrder.ref_pelanggan_oth"
                />
              </div>
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
            <div class="flex gap-2">
              <n-form-item label="No Polisi" path="no_polisi" class="w-full">
                <n-input
                  placeholder="No Polisi"
                  v-model:value="dataTaksasi.no_polisi"
                />
              </n-form-item>
              <n-form-item label="Warna" path="warna" class="w-full">
                <n-input
                  placeholder="warna"
                  v-model:value="dataTaksasi.warna"
                />
              </n-form-item>
              <n-form-item label="No BPKB" path="no_bpkb" class="w-full">
                <n-input
                  placeholder="No BPKB"
                  v-model:value="dataTaksasi.no_bpkb"
                />
              </n-form-item>
              <n-form-item label="Atas Nama" path="atas_nama" class="w-full">
                <n-input
                  placeholder="Atas Nama"
                  v-model:value="dataTaksasi.atas_nama"
                />
              </n-form-item>
            </div>
            <div class="flex gap-2">
              <n-form-item label="No Rangka" path="no_rangka" class="w-full">
                <n-input
                  placeholder="No Rangka"
                  v-model:value="dataTaksasi.no_rangka"
                />
              </n-form-item>
              <n-form-item label="No Mesin" path="no_mesin" class="w-full">
                <n-input
                  placeholder="No Mesin"
                  v-model:value="dataTaksasi.no_mesin"
                />
              </n-form-item>
              <n-form-item
                label="Tanggal Berlaku STNK"
                path="order"
                class="w-full"
              >
                <n-date-picker
                  placeholder="Tanggal Berlaku STNK"
                  v-model:formatted-value="dataTaksasi.tgl_stnk"
                  value-format="yyyy-MM-dd"
                  format="dd-MM-yyyy"
                  type="date"
                  class="w-full"
                />
              </n-form-item>
            </div>
          </div>
        </n-card>
        <n-card
          v-if="current == 3"
          title="Informasi Tambahan"
          :segmented="{
            content: true,
            footer: 'soft',
          }"
        >
          <n-divider title-placement="left"> Pasangan </n-divider>
          <div class="flex gap-2">
            <n-form-item
              label="Nama Pasangan"
              path="nama_kerabat"
              class="w-full"
            >
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
          <div class="flex gap-2">
            <n-form-item label="No KTP" path="nama_kerabat" class="w-full">
              <n-input
                placeholder="KTP Penjamin"
                v-model:value="dataPenjamin.no_identitas"
                show-count
                :maxlength="16"
              />
            </n-form-item>
            <n-form-item
              label="Nama Penjamin"
              path="nama_kerabat"
              class="w-full"
            >
              <n-input
                placeholder="Nama penjamin"
                v-model:value="dataPenjamin.nama"
              />
            </n-form-item>
            <n-form-item label="Tanggal Lahir" path="order" class="w-full">
              <n-date-picker
                placeholder="Tanggal lahir"
                v-model:formatted-value="dataPenjamin.tgl_lahir"
                value-format="yyyy-MM-dd"
                format="dd-MM-yyyy"
                type="date"
                class="w-full"
              />
            </n-form-item>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <n-form-item label="Hubungan Dengan konsumen" path="hub_konsumen">
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
              />
            </n-form-item>
            <n-form-item label="Pekerjaan" path="nama">
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
            <n-input
              placeholder="Nama Kerabat"
              v-model:value="dataKerabat.nama"
            />
          </n-form-item>
          <n-form-item label="Alamat" path="alamat">
            <n-input-group>
              <n-input
                placeholder="Alamat"
                v-model:value="dataKerabat.alamat"
              />
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
                <n-form-item
                  label="No Rekening"
                  path="norkening"
                  class="w-full"
                >
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
        <n-card
          v-if="current == 4"
          title="Data Ekstra"
          :segmented="{
            content: true,
            footer: 'soft',
          }"
          :loading="true"
        >
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
                  v-show="calcCredit.jenis_angsuran == 'bulanan'"
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
                  v-show="calcCredit.jenis_angsuran == 'musiman'"
                >
                  <n-radio-group
                    v-model:value="calcCredit.tenor"
                    name="radiogroup"
                  >
                    <n-radio @change="handleChange" name="tenor" value="3">
                      1 x 3 bulan<n-text code>
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
                <n-input
                  v-model:value="calcCredit.eff_rate"
                  type="text"
                  disabled
                >
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
        <n-button
          :loading="loading"
          v-show="actionPage != 'view'"
          icon-placement="left"
          type="info"
          @click="handleSave"
        >
          simpan
        </n-button>
        <n-button
          :loading="lodingSend"
          v-show="actionPage != 'view'"
          @click="handleSend"
          type="primary"
          v-if="current == 4"
        >
          <template #icon>
            <n-icon>
              <send-icon />
            </n-icon>
          </template>
          Kirim
        </n-button>
      </n-space>
    </n-form>
  </n-spin>
</template>
<script setup>
import { ref, reactive, computed, onMounted, toRef } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "../../../helpers/axios";
import { useBlacklist } from "../../../helpers/blacklist";
import router from "../../../router";
import { useMessage } from "naive-ui";
import { useWindowSize } from "@vueuse/core";
import _ from "lodash";
import {
  Warning as WarningIcon,
  ChevronBack as ArrowBack,
  ChevronForward as ArrowForward,
  Send as SendIcon,
} from "@vicons/ionicons5";

const message = useMessage();
const loading = ref(false);
const loadingSend = ref(false);
const baseRoute = useRoute();
const tipeAngsuran = ref({});
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
const dataPelanggan = ref({
  tipe_identitas: "KTP",
});

const { width } = useWindowSize();
const alamatIdentitas = ref({});
const alamatTagih = ref({});
const dataPekerjaan = ref({});
// var dt = new Date();
const dataOrder = ref({});
const dataTaksasi = ref({});
const dataTambahan = ref({});
const dataKerabat = ref({});
const dataPenjamin = ref({});
const dataSurat = ref({});
const dataAttachment = ref({});
const dataPasangan = ref({
  nama_pasangan: null,
  tmptlahir_pasangan: null,
  pekerjaan_pasangan: null,
  tgllahir_pasangan: null,
  alamat_pasangan: null,
});
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
const current = ref(1);
const userToken = localStorage.getItem("token");
const currentStatus = ref("process");
const skemaAngsuran = ref([]);
const tenor6 = ref([]);
const tenor12 = ref([]);
const tenor18 = ref([]);
const tenor24 = ref([]);
const next = () => (current.value += 1);
const prev = () => (current.value -= 1);
const handleTipe = (e) => {
  tipeAngsuran.value = e;
  calcCredit.jenis_angsuran = e;
  calcCredit.tenor = "0";
};
const optJenisKelamin = ["Laki-laki", "perempuan"].map((v) => ({
  label: v,
  value: v,
}));

const findDocByType = (c, e) => {
  const docPath = ref(_.find(c, { TYPE: e }));
  if (docPath.value) return docPath.value.PATH;
};
const optReff = [
  "Temen / Saudara",
  "Mediator",
  "Sales KSP Djaya",
  "Pelang atau Spanduk",
  "Brosur",
  "Wa Status",
  "Dealer Tridjaya",
  "Lainnya",
].map((v) => ({
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
const optJenisIdentitas = ["KTP"].map((v) => ({
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
const optHubCust = ["SAUDARA", "ORANG TUA", "TEMAN", "LAINNYA"].map((v) => ({
  label: v,
  value: v,
}));
const idApp = baseRoute.params.idapplication;
const actionPage = baseRoute.params.action;
const copyAddress = () =>
  Object.assign(alamatTagih.value, alamatIdentitas.value);
const sum = (num1, num2) => {
  if (isNaN(num1) || isNaN(num2)) {
    return undefined;
  }
  return num1 + num2;
};
const rules = {
  no_identitas: {
    trigger: "blur",
    required: true,
    min: 16,
    message: "No identitas minimal 16 karakter",
  },
};
const bl_pesan = ref();
const dok_identitas = ref([]);
const dok_pendukung = ref([]);
const dok_jaminan = ref([]);
const getData = async () => {
  const response = await useApi({
    method: "get",
    api: `cr_application/${idApp}`,
    token: userToken,
  });
  if (!response.ok) {
    message.error("halam tidak ditemukan !");
    suspense.value = true;
  } else {
    message.loading("memuat fpk");
    suspense.value = false;
    pageData.value = response.data.response;
    Object.assign(calcCredit, pageData.value.ekstra);
    Object.assign(calcCredit, pageData.value.pelanggan);
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
    Object.assign(dok_identitas.value, pageData.value.dokumen_indentitas);
    Object.assign(dok_jaminan.value, pageData.value.dokumen_jaminan);
    Object.assign(dok_pendukung.value, pageData.value.dokumen_pendukung);
    Object.assign(dataAttachment.value, pageData.value.attachment);
    let tgllahir = toRef(pageData.value.pelanggan);
    var myDate = tgllahir.value.tgl_lahir;
    myDate = myDate.split("-");
    var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
    handleTanggalLahir(newDate.getTime());
    handleEkstra();
  }
  bl_pesan.value = await useBlacklist(calcCredit.no_identitas);
};
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
  handleChange();
};
const handleEkstra = () => {
  calcCredit.tenor = calcCredit.tenor ? calcCredit.tenor.toString() : null;
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
  pasangan: dataPasangan.value,
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
const notifUsia = ref();
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
const handleSave = async (e) => {
  e.preventDefault(e);
  formAssign.flag_pengajuan = "no";
  let idApp = pageData.value.id_application;
  loading.value = true;
  const response = await useApi({
    method: "PUT",
    api: `cr_application/${idApp}`,
    data: formAssign,
    token: userToken,
  });
  if (!response.ok) {
    message.error("data gagal disimpan");
    loading.value = false;
  } else {
    message.success("data berhasil disimpan");
    loading.value = false;
    router.push("/task/apply-credit");
  }
};
const handleSend = async (e) => {
  e.preventDefault(e);
  formAssign.flag_pengajuan = "yes";
  let idApp = pageData.value.id_application;
  loadingSend.value = true;
  const response = await useApi({
    method: "PUT",
    api: `cr_application/${idApp}`,
    data: formAssign,
    token: userToken,
  });
  if (!response.ok) {
    message.error("data gagal dikirm");
    loadingSend.value = false;
  } else {
    message.success("data berhasil dikirim");
    loadingSend.value = false;
    router.push("/task/apply-credit");
  }
};

onMounted(getData);
</script>
