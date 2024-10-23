<template>
  <blacklist-alert :pesan="bl_pesan" />
  <n-scrollbar x-scrollable v-if="width > 502">
    <n-space class="bg-white border rounded-xl p-4 mb-2">
      <n-steps :current="current">
        <n-step v-for="step in steps" :key="step" :title="step" />
      </n-steps>
    </n-space>
  </n-scrollbar>
  <n-card :title="`${current}. ${steps[current - 1]}`" :segmented="{
    content: true,
    footer: 'soft',
  }">
    <template #action>
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
        <n-button :loading="loading" icon-placement="left" type="primary" @click="handleValid" v-else>
          simpan
        </n-button>
      </n-flex>
    </template>
    <!-- container 1 -->
    <div v-show="current == 1">
      <n-form ref="formOrder" :model="order" :rules="rulesOrder" require-mark-placement="right-hanging">
        <div class="md:flex gap-2">
          <n-form-item label="Plafond" path="plafond" class="w-full">
            <n-input-number :parse="parse" :format="format" :min="1000000" v-model:value="order.plafond"
              placeholder="plafond" :loading="loading" :show-button="false" class="flex !w-full" clearable
              :on-update:value="handlePlafond" />
          </n-form-item>
          <n-form-item label="Jenis Angsuran" path="jenis_angsuran" class="w-full">
            <n-select filterable placeholder="Jenis Angsuran" :options="jenisAngsuran"
              v-model:value="order.jenis_angsuran" :on-update:value="handleTipe"
              :disabled="order.plafond != 0 ? false : true" />
          </n-form-item>
        </div>
        <div class="md:flex gap-2">
          <n-form-item label="Tenor / Angsuran" path="tenor" class="w-full">
            <div class="flex flex-col md:flex-row" v-show="tipeAngsuran == 'bulanan'">
              <n-radio-group v-model:value="order.tenor" name="radiogroup">
                <n-radio name="tenor" value="6">
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
                <n-radio name="tenor" value="12">
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
                <n-radio name="tenor" value="18">
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
                <n-radio name="tenor" value="24">
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
            <div class="flex flex-col md:flex-row" v-show="tipeAngsuran == 'musiman'">
              <n-radio-group v-model:value="order.tenor" name="radiogroup">
                <n-radio name="tenor" value="3">
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
                <n-radio name="tenor" value="6">
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
                <n-radio name="tenor" value="12">
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
                <n-radio name="tenor" value="18">
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
          <n-form-item label="Tujuan Kredit" path="tujuan_kredit" class="w-full">
            <n-select filterable placeholder="Tujuan Kredit" :options="tujuanKredit"
              v-model:value="order.tujuan_kredit" />
          </n-form-item>
        </div>
      </n-form>
    </div>
    <div v-show="current === 2">
      <n-form ref="formPelanggan" :model="pelanggan" :rules="rulesPelanggan" require-mark-placement="right-hanging">
        <div class="md:flex gap-2">
          <n-form-item label="No KTP" path="no_ktp" class="w-full">
            <n-input :show-button="false" :allow-input="onlyAllowNumber" placeholder="NO KTP"
              v-model:value="pelanggan.no_ktp" :loading="loadingKTP" @change="handleKtp" class="w-full" maxlength="16"
              clearable />
          </n-form-item>
          <n-form-item label="Kategori Kredit" path="kategori_kredit" class="w-full">
            <n-select filterable placeholder="Kategori Kredit" :options="optKategori" default-value="Baru"
              v-model:value="order.category" disabled />
          </n-form-item>
          <n-form-item label="No KK" path="no_kk" class="w-full">
            <n-input :allow-input="onlyAllowNumber" placeholder="No Kartu Keluarga" v-model:value="pelanggan.no_kk"
              maxlength="16" />
          </n-form-item>
        </div>
        <div class="md:flex gap-2">
          <n-form-item label="Nama" path="nama" class="w-full">
            <n-input placeholder="Nama" v-model:value="pelanggan.nama" @input="upCase" />
          </n-form-item>
          <n-form-item label="Tanggal lahir" path="tgl_lahir" class="w-full">
            <div class="w-full">
              <n-alert title="Informasi" type="warning" closable  v-if="notifUsia">
                {{ noteUsia }}</n-alert>
              <n-date-picker placeholder="Tanggal Lahir" class="w-full" v-model:formatted-value="pelanggan.tgl_lahir"
                value-format="yyyy-MM-dd" format="dd-MM-yyyy" type="date" @update:value="handleTanggalLahir" />
            </div>
          </n-form-item>
          <n-form-item label="No Handphone" path="no_hp" class="w-full">
            <n-input placeholder="No Handphone" v-model:value="pelanggan.no_hp" />
          </n-form-item>
        </div>
        <div class="flex flex-col md:flex-row gap-2 gap-x-2">
          <n-form-item label="Alamat" path="alamat" class="w-full" @input="upCase">
            <n-input placeholder="Alamat" v-model:value="pelanggan.alamat" class="w-full" />
          </n-form-item>
          <n-form-item path="rt" class="w-full">
            <n-input-group>
              <n-input placeholder="RT" v-model:value="pelanggan.rt" />
              <n-input placeholder="RW" v-model:value="pelanggan.rw" />
            </n-input-group>
          </n-form-item>
        </div>
        <n-divider title-placement="left"> Upload Dokumen Identitas </n-divider>

        <div class="flex flex-col md:flex-row gap-2">
          <file-upload title="KTP" endpoint="image_upload_prospect" type="ktp"
            :def_value="findDocByType(dok_identitas, 'ktp')" :idapp="pageData.id" />
          <file-upload title="KK" endpoint="image_upload_prospect" type="kk"
            :def_value="findDocByType(dok_identitas, 'kk')" :idapp="pageData.id" />
          <file-upload title="KTP Pasangan" endpoint="image_upload_prospect" type="ktp_pasangan"
            :def_value="findDocByType(dok_identitas, 'ktp_pasangan')" :idapp="pageData.id" />
        </div>
      </n-form>
    </div>
    <div v-show="current === 3" v-for="jaminan in jaminan" :key="jaminan">
      <div v-show="jaminan.nilai != '' && order.plafond > jaminan.nilai * 0.5" class="pb-4">
        <n-alert title="Info" type="info">
          Plafon > Harga Taksasi
          <b>{{ (jaminan.nilai * 0.5).toLocaleString("US") }}</b></n-alert>
      </div>
      <div>
        <taksasi-select-state v-model:brand="jaminan.merk" v-model:tipe="jaminan.tipe" v-model:tahun="jaminan.tahun"
          v-model:pasar="jaminan.nilai" />
      </div>
      <n-form ref="formJaminan" :model="jaminan" :rules="rulesJaminan" require-mark-placement="right-hanging">
        <div class="md:flex gap-2">
          <n-form-item label="No Polisi" path="no_polisi" class="w-full">
            <n-input placeholder="No Polisi" @input="upCase" v-model:value="jaminan.no_polisi" />
          </n-form-item>
          <n-form-item label="Warna" path="warna" class="w-full">
            <n-input placeholder="warna" v-model:value="jaminan.warna" />
          </n-form-item>
          <n-form-item label="Tanggal Berlaku STNK" path="tgl_stnk" class="w-full">
            <n-date-picker placeholder="Tanggal Berlaku STNK" v-model:formatted-value="jaminan.tgl_stnk"
              value-format="yyyy-MM-dd" format="dd-MM-yyyy" type="date" class="w-full" />
          </n-form-item>
        </div>
        <n-divider title-placement="left"> Upload Dokumen Jaminan </n-divider>

        <div class="flex flex-col md:flex-row gap-2">
          <file-upload title="No Rangka" :def_value="findDocByType(dok_jaminan, 'no_rangka')"
            endpoint="image_upload_prospect" type="no_rangka" :idapp="pageData.id" />
          <file-upload title="No Mesin" endpoint="image_upload_prospect" type="no_mesin"
            :def_value="findDocByType(dok_jaminan, 'no_mesin')" :idapp="pageData.id" />
          <file-upload title="STNK" endpoint="image_upload_prospect" :def_value="findDocByType(dok_jaminan, 'stnk')"
            type="stnk" :idapp="pageData.id" />
        </div>
        <n-divider title-placement="left"> Upload Jaminan </n-divider>
        <n-space>
          <file-upload title="Depan" endpoint="image_upload_prospect" type="depan"
            :def_value="findDocByType(dok_jaminan, 'depan')" :idapp="pageData.id" />
          <file-upload title="Belakang" endpoint="image_upload_prospect" type="belakang"
            :def_value="findDocByType(dok_jaminan, 'belakang')" :idapp="pageData.id" />
          <file-upload title="Kanan" endpoint="image_upload_prospect" :def_value="findDocByType(dok_jaminan, 'kanan')"
            type="kanan" :idapp="pageData.id" />
          <file-upload title="Kiri" :def_value="findDocByType(dok_jaminan, 'kiri')" endpoint="image_upload_prospect"
            type="kiri" :idapp="pageData.id" />
        </n-space>
      </n-form>
    </div>
    <div v-show="current === 4">
      <n-form ref="formSurvey" :model="survey" :rules="rulesSurvey" require-mark-placement="right-hanging">
        <div class="flex gap-4">
          <n-form-item label="Tanggal survey" path="tgl_survey" class="w-full">
            <n-date-picker placeholder="Tanggal Survey" class="w-full" v-model:formatted-value="survey.tgl_survey"
              disabled value-format="yyyy-MM-dd" format="dd-MM-yyyy" type="date" />
          </n-form-item>
          <n-form-item label="Lama Bekerja" path="lama_berkerja" class="w-full">
            <n-input :allow-input="onlyAllowNumber" placeholder="lama bekerja" v-model:value="survey.lama_bekerja"
              class="w-full">
              <template #suffix> bulan </template>
            </n-input>
          </n-form-item>
        </div>
        <div class="md:flex gap-4">
          <n-form-item label="Pendapatan pelanggan " path="pribadi" class="w-full">
            <n-input-number class="flex w-full" :parse="parse" :format="format"
              v-model:value="survey.penghasilan_pribadi" placeholder="pendapatan pelanggan" :show-button="false">
              <template #suffix> perbulan </template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="Pendapatan Pasangan" path="pendapatan" class="w-full">
            <n-input-number class="flex w-full" :parse="parse" :format="format"
              v-model:value="survey.penghasilan_pasangan" placeholder="pendapatan pasangan" :show-button="false">
              <template #suffix> perbulan </template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="Pendapatan Lainnya" path="pendapatan" class="w-full">
            <n-input-number class="flex w-full" :parse="parse" :format="format"
              v-model:value="survey.penghasilan_lainnya" placeholder="pendapatan lain-lain" :show-button="false">
              <template #suffix> perbulan </template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="Pengeluaran" path="pengeluaran" class="w-full">
            <n-input-number :parse="parse" :format="format" class="w-full" v-model:value="survey.pengeluaran"
              placeholder="pengeluaran" :show-button="false">
              <template #suffix> perbulan </template>
            </n-input-number>
          </n-form-item>
        </div>
        <div class="flex gap-4">
          <n-form-item label="Pekerjaan" path="pekerjaan" class="w-full">
            <n-select filterable placeholder="pekerjaan" counter :options="optSektor" v-model:value="survey.sektor" />
          </n-form-item>
        </div>
        <n-form-item label="Catatan Survey" path="catatan_survey">
          <n-input v-model:value="survey.catatan_survey" @input="upCase" :autosize="{
            minRows: 3,
            maxRows: 5,
          }" type="textarea" placeholder="catatan survey" />
        </n-form-item>
        <n-divider title-placement="left"> Dokumen Pendukung </n-divider>
        <file-upload :def_preview="true" title="dokumen pendukung" endpoint="image_upload_prospect" type="other"
          :idapp="dynamicForm.id" />
        <n-space>
          <div v-for="file_id in dok_pendukung" class="flex items-center gap-2" :key="file_id">
            <n-image :src="file_id.PATH" class="!w-10 border !h-10 rounded-md" />
            <span class="uppercase text-pr">{{ file_id.TYPE }}</span>
          </div>
        </n-space>
      </n-form>
    </div>
  </n-card>
</template>
<script setup>
import { ref, reactive, onMounted, toRef } from "vue";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import {
  ArrowBackOutlined as ArrowBack,
  ArrowForwardOutlined as ArrowForward,
} from "@vicons/material";
import { useMessage } from "naive-ui";
import router from "../../../router";
import { useRoute } from "vue-router";
import { useWindowSize } from "@vueuse/core";
import { useApi } from "../../../helpers/axios";
import { lyla } from "@lylajs/web";
const { width } = useWindowSize();
const message = useMessage();
const pageData = ref({});
const suspense = ref({});
const baseRoute = useRoute();
const paramPage = baseRoute.params.idsurvey;
// const actionPage = baseRoute.params.action;
const current = ref(1);
const loading = ref(false);
const userToken = localStorage.getItem("token");
const skemaAngsuran = ref([]);
const tipeAngsuran = ref();
const loadingKTP = ref(false);
const bl_pesan = ref();
const handleKtp = async (e) => {
  loadingKTP.value = true;
  const bodyForm = {
    no_ktp: e,
  };
  bl_pesan.value = await useBlacklist(e);
  const response = await useApi({
    method: "POST",
    api: "check_ro",
    data: bodyForm,
    token: userToken,
  });
  if (!response.ok) {
    loadingKTP.value = false;
  } else {
    let data = response.data;
    if (data.length > 0) {
      order.value.category = "RO";
      Object.assign(pelanggan, data[0]);
    } else {
      order.value.category = "Baru";
      loadingKTP.value = false;
      // Object.assign(pelanggan, initPelanggan);
    }
    loadingKTP.value = false;
  }
};
const handleTipe = (e) => {
  tipeAngsuran.value = e;
  order.jenis_angsuran = e;
  const body = {
    plafond: order.plafond,
    jenis_angsuran: e,
  };
  refAdmin(body);
};
const tenor6 = ref([]);
const tenor12 = ref([]);
const tenor18 = ref([]);
const tenor24 = ref([]);
const handlePlafond = (e) => {
  order.plafond = e;
  const body = {
    plafond: e,
    jenis_angsuran: order.jenis_angsuran,
  };
  refAdmin(body);
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
const formOrder = ref(null);
const formPelanggan = ref(null);
const formJaminan = ref(null);
const next = () => {
  if (current.value === 1) {
    formOrder.value?.validate((errors) => {
      if (errors) {
        message.error("periksa kembali isian anda");
      } else {
        current.value += 1;
      }
    });
  } else if (current.value === 2) {
    formPelanggan.value?.validate((errors) => {
      if (errors) {
        message.error("periksa kembali isian anda");
      } else {
        current.value += 1;
      }
    });
  } else if (current.value === 3) {
    formJaminan.value?.validate((errors) => {
      if (errors) {
        message.error("periksa kembali isian anda");
      } else {
        current.value += 1;
      }
    });
  }
};
const prev = () => (current.value -= 1);
const tujuanKredit = ["konsumsi", "investasi"].map((v) => ({
  label: v,
  value: v,
}));
const jenisAngsuran = ["Bulanan", "Musiman"].map((v) => ({
  label: v,
  value: v.toLowerCase(),
}));
const optKategori = [
  "BUKAN KARYAWAN",
  "KARYAWAN",
  "KARYAWAN PERUSAHAAN AFILIASI",
].map((v) => ({
  label: v,
  value: v,
}));
const optSektor = [
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
const order = reactive({});
const pelanggan = reactive({});
const jaminan = ref([]);
const dok_jaminan = ref({});
const dok_identitas = ref({});
const dok_pendukung = ref({});
const survey = reactive({});
const dynamicForm = reactive({
  order: order,
  data_nasabah: pelanggan,
  data_survey: survey,
  jaminan_kendaraan: jaminan.value,
});
const idApp = baseRoute.params.idsurvey;
const getData = () =>
  useApi({
    method: "get",
    api: `kunjungan/${idApp}`,
    token: userToken,
  }).then((res) => {
    if (!res.ok) {
      message.error("halam tidak ditemukan !");
      suspense.value = true;
    } else {
      message.loading("memuat data kunjungan");
      suspense.value = false;
      pageData.value = res.data.response;
      Object.assign(survey, res.data.response.data_survey);
      Object.assign(dok_jaminan.value, res.data.response.dokumen_jaminan);
      Object.assign(pelanggan, res.data.response.data_nasabah);
      Object.assign(order, res.data.response.data_order);
      Object.assign(jaminan.value, res.data.response.jaminan_kendaraan);
      Object.assign(dok_identitas.value, res.data.response.dokumen_indentitas);
      Object.assign(dok_pendukung.value, res.data.response.dokumen_pendukung);
      let tgllahir = toRef(pelanggan.tgl_lahir);
      var myDate = tgllahir.value;
      myDate = myDate.split("-");
      var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
      // console.log(newDate.getTime());
      handleTanggalLahir(newDate.getTime());
      getPlafond();
    }
  });
const getPlafond = async () => {
  tipeAngsuran.value = order.jenis_angsuran;
  const body = {
    plafond: order.plafond,
    jenis_angsuran: order.jenis_angsuran,
  };
  refAdmin(body);
};
const formSurvey = ref(null);
const handleValid = () => {
  formSurvey.value?.validate((errors) => {
    if (errors) {
      message.error("periksa kembali isian anda");
    } else {
      handleSave();
    }
  });
}
const handleSave = async () => {
  loading.value = true;
  const response = await useApi({
    method: "PUT",
    api: `kunjungan/${idApp}`,
    data: dynamicForm,
    token: userToken,
  });
  if (!response.ok) {
    message.error("data gagal diubah");
    loading.value = false;
  } else {
    message.success("data berhasil diubah");
    loading.value = false;
    router.push({ name: 'survey' });
  }
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
const handleImagePost = ({ file, data, onError, onFinish, onProgress }) => {
  const form = new FormData();
  form.append("image", file.file);
  form.append("type", data.type);
  form.append("cr_prospect_id", paramPage);
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  lyla
    .post("https://api.kspdjaya.id/image_upload_prospect", {
      headers,
      body: form,
      onUploadProgress: ({ percent }) => {
        onProgress({ percent: Math.ceil(percent) });
      },
    })
    .then(() => {
      message.success("upload gambar berhasil");
      onFinish();
    })
    .catch(() => {
      message.success("upload gambar gagal");
      onError();
    });
};
const parse = (input) => {
  const nums = input.replace(/,/g, "").trim();
  if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums);
  return nums === "" ? null : Number.NaN;
};
const format = (value) => {
  if (value === null) return "";
  return value.toLocaleString("en-US");
};

const findDocByType = (c, e) => {
  const docPath = ref(_.find(c, { TYPE: e }));
  if (docPath.value) return docPath.value.PATH;
};
const steps = [
  "Informasi Order",
  "Data Pelanggan",
  "Data Jaminan",
  "Data Survey",
];
const plafondValidator = (rule, value) => {
  return value > 1000000;
};
const rulesOrder = {
  plafond: {
    trigger: "blur",
    validator: plafondValidator,
    message: "plafond minimal lebih dari 1.000.000",
  },
  jenis_angsuran: {
    trigger: "blur",
    required: true,
    message: "jenis angsuran harus dipilih",
  },
  tenor: {
    trigger: "blur",
    required: true,
    message: "tenor / angsuran harus dipilih",
  },
  tujuan_kredit: {
    trigger: "blur",
    required: true,
    message: "tujuan kredit harus dipilih",
  },
};
const rulesPelanggan = {
  no_ktp: {
    trigger: "blur",
    required: true,
    min: 16,
    message: "No identitas minimal 16 karakter",
  },
  no_kk: {
    trigger: "blur",
    required: true,
    min: 16,
    message: "No Kartu Keluarga minimal 16 karakter",
  },
  nama: {
    trigger: "blur",
    required: true,
    message: "Nama harus diisi",
  },
  tgl_lahir: {
    trigger: "blur",
    required: true,
    message: "Tanggal lahir harus diisi",
  },
  no_hp: {
    trigger: "blur",
    required: true,
    message: "No HP harus diisi",
  },
  alamat: {
    trigger: "blur",
    required: true,
    message: "Alamat harus diisi",
  },
};

const rulesJaminan = {
  no_polisi: {
    trigger: "blur",
    required: true,
    message: "No Polisi harus disii",
  },
  tgl_stnk: {
    trigger: "blur",
    required: true,
    message: "Tanggal STNK harus disii",
  },
};
const rulesSurvey = {
  catatan_survey: {
    trigger: "blur",
    required: true,
    message: "Catatan survey harus diisi",
  },
};
const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);
const upCase = () => {
  pelanggan.nama = pelanggan.nama.toUpperCase();
  pelanggan.alamat = pelanggan.alamat.toUpperCase();
  survey.catatan_survey = survey.catatan_survey.toUpperCase();
  jaminan.value.no_polisi = jaminan.value.no_polisi.toUpperCase();
};
onMounted(() => {
  getData();
});
</script>