<template>
  <n-card :segmented="{
      content: true,
      footer: 'soft',
    }">
    <template #header>Tambah Penerimaan Uang</template>
    <template #header-extra>
      <n-space>
        <n-button
          round
          v-show="!searchField"
          strong
          secondary
          type="success"
          @click="handleBack"
        >
          <template #icon>
            <n-icon>
              <back-icon />
            </n-icon>
          </template>
          <p class="hidden md:flex">kembali</p>
        </n-button>
        <!-- <n-button
          round
          v-show="!searchField"
          strong
          secondary
          type="success"
          @click="handlePayFull"
        >
          <template #icon>
            <n-icon>
              <full-pay />
            </n-icon>
          </template>
          <p class="hidden">pindah ke pelunasan</p>
        </n-button> -->
        <n-button
          v-show="!searchField"
          strong
          secondary
          circle
          @click="handleExpand"
        >
          <template #icon>
            <n-icon>
              <full-icon />
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </template>
    <div class="flex flex-col md:flex-row gap-2">

      <n-form-item label="Nama Pelanggan" class="w-full">
        <n-input
          v-model:value="dynamicSearch.nama"
          type="text"
          placeholder="Nama"
          @input="handleSearch"
          clearable
        />
      </n-form-item>
      <n-form-item label="No Polisi" class="w-full">
        <n-input
          v-model:value="dynamicSearch.no_polisi"
          type="text"
          placeholder="No Polisi"
          @input="handleSearch"
          clearable
        />
      </n-form-item>
      <n-form-item label="No Kontrak" class="w-full">
        <n-input
          v-model:value="dynamicSearch.no_kontrak"
          type="text"
          placeholder="No Kontrak"
          @input="handleSearch"
          clearable
        />
      </n-form-item>
    </div>
    <div>
      <n-data-table
        :row-props="rowProps"
        striped
        :row-class-name="rowClassName"
        size="small"
        :scroll-x="800"
        :row-key="(row) => row.loan_number"
        :columns="columns"
        :data="dataSearch"
        :max-height="300"
        :on-update:checked-row-keys="handleFasilitas"
        :loading="loadSearch"
        class="pb-2"
        v-show="dataFasilitas"
      />
      <n-data-table
        striped
        size="small"
        :scroll-x="1200"
        :row-key="(row) => row"
        :columns="columnStruktur"
        :data="dataStrukturKredit"
        :max-height="300"
        :checked-row-keys="checkedRowCredit"
        :loading="loadStructure"
        v-show="dataAngsuran"
        :on-update:checked-row-keys="handleAngsuran"
        class="py-2"
      />
      <div
        class="md:flex gap-2 bg-pr/10 rounded-xl items-center pt-4 px-4"
        v-show="dataPayment"
      >
        <n-form-item
          path="nestedValue.path2"
          label="Jenis Pembayaran"
          class="w-full"
        >
          <div class="flex gap-2">
            <n-select
              filterable
              :options="optTipePay"
              placeholder="Jenis Pembayaran"
              v-model:value="pageData.payment_method"
            />
            <n-button
              v-show="pageData.payment_method == 'transfer'"
              type="warning"
              @click="buktiTransfer = true"
            >
              Bukti ({{ dataBuktiTransfer.length }})
            </n-button>
          </div>
        </n-form-item>
        <n-form-item
          path="nestedValue.path2"
          label="Total Bayar"
          class="w-full"
        >
          <n-input-number
            placeholder="Jumlah Pembayaran"
            v-model:value="totalPay"
            :show-button="false"
            :parse="parse"
            :format="format"
            clearable
            class="w-full"
            readonly
          >
          </n-input-number>
        </n-form-item>
        <n-form-item
          path="nestedValue.path2"
          label="Uang Pelanggan"
          class="w-full"
        >
          <n-input-number
            placeholder="Jumlah Pembayaran"
            v-model:value="pageData.jumlah_uang"
            :show-button="false"
            :parse="parse"
            :format="format"
            clearable
            class="w-full"
          >
          </n-input-number>
        </n-form-item>
        <n-form-item label="Pembulatan" class="w-full">
          <n-input-number
            :show-button="false"
            :parse="parse"
            :format="format"
            v-model:value="pageData.pembulatan"
            clearable
            class="w-full"
          />
        </n-form-item>
        <n-form-item label="Kembalian" class="w-full">
          <n-input-number
            :show-button="false"
            :parse="parse"
            :format="format"
            v-model:value="pageData.kembalian"
            readonly
            class="w-full"
          />
        </n-form-item>
        <n-form-item class="w-full">
          <n-button
            type="primary"
            @click="handleProses"
            :loading="loadProses"
            class="w-full"
            :disabled="
              totalPay === 0 ? true : pageData.kembalian >= 0 ? false : true
            "
          >
            Proses
          </n-button>
        </n-form-item>
      </div>
    </div>
  </n-card>
  <n-modal
    class="w-3/4"
    title="Upload Berkas Pencairan"
    v-model:show="dialogProses"
    :mask-closable="false"
  >
    <n-card title="Transaksi Berhasil">
      <div class="flex gap-8 font-mono">
        <table class="table-auto w-1/2">
          <tr>
            <td>No Transaksi</td>
            <td>:</td>
            <td>
              <b>{{ paymentData.no_transaksi }}</b>
            </td>
          </tr>
          <tr>
            <td width="120px">Tgl Transaksi</td>
            <td>:</td>
            <td>{{ paymentData.tgl_transaksi }}</td>
          </tr>
          <tr>
            <td>Terima Dari</td>
            <td>:</td>
            <td>
              {{ paymentData.detail_pelanggan.cust_code }} -
              {{ paymentData.detail_pelanggan.nama }}
            </td>
          </tr>
          <tr>
            <td>Jumlah Uang</td>
            <td>:</td>
            <td>{{ paymentData.jml_pembayaran.toLocaleString("US") }}</td>
          </tr>
          <tr>
            <td>Terbilang</td>
            <td>:</td>
            <td>{{ paymentData.terbilang }}</td>
          </tr>
          <tr>
            <td valign="top">Keterangan</td>
            <td valign="top">:</td>
            <td>
              <span
                v-for="pembayaran in paymentData.pembayaran"
                v-bind:key="pembayaran.id"
              >
                {{ pembayaran.title }} ({{
                  pembayaran.payment_value.toLocaleString("US")
                }}),
              </span>
            </td>
          </tr>
        </table>
        <table class="table-auto w-1/2" height="0">
          <tr>
            <td width="120px">Metode</td>
            <td>:</td>
            <td>{{ paymentData.payment_method }}</td>
          </tr>
          <tbody v-if="paymentData.payment_method == 'cash'">
            <tr>
              <td width="120px">Pembulatan</td>
              <td>:</td>
              <td>{{ paymentData.pembulatan }}</td>
            </tr>
            <tr>
              <td width="120px">Kembalian</td>
              <td>:</td>
              <td>{{ paymentData.kembalian }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td width="120px">Bank Tujuan</td>
              <td>:</td>
              <td>{{ paymentData.nama_bank.toUpperCase() }}</td>
            </tr>
            <tr>
              <td width="120px">No Rekening</td>
              <td>:</td>
              <td>{{ paymentData.no_rekening }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <template #action>
        <n-space>
          <n-button type="success">Cetak</n-button>
          <n-button @click="handleDone">Selesai</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
  <n-modal class="w-1/4" v-model:show="buktiTransfer">
    <n-card>
      <n-upload
        list-type="image"
        multiple
        :data="{ type: 'berkas pencairan' }"
        :custom-request="handleImagePost"
        :max="5"
      >
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <add-icon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            Klik atau seret file ke area ini untuk diunggah
          </n-text>
        </n-upload-dragger>
      </n-upload>
      <n-image
        v-for="imageBukti in dataBuktiTransfer"
        :src="imageBukti"
        v-bind:key="imageBukti"
      />
    </n-card>
  </n-modal>
</template>
<script setup>
import { v4 as uuidv4 } from "uuid";
import { lyla } from "@lylajs/web";
import { useApi } from "../../../helpers/axios";

import router from "../../../router";
import _ from "lodash";
import {
  PlusFilled as addIcon,
  ChevronLeftRound as backIcon,
  OpenInFullRound as fullIcon,
} from "@vicons/material";
import {
  useDialog,
  useMessage,
  NIcon,
  NTag,
  NButton,
  NInput,
  NInputNumber,
} from "naive-ui";
import { computed, reactive, ref, h } from "vue";
import { useWindowSize } from '@vueuse/core';
const searchField = ref(false);
const valOptSearch = ref(null);
const prosesButton = ref(true);
const checkedRowCredit = ref([]);
const dialogProses = ref(false);
const paymentData = ref([]);
const buktiTransfer = ref(false);
const dataBuktiTransfer = ref([]);
const totalPay = computed(() => {
  const totalInstallment = () =>
    checkedRowCredit.value.reduce(
      (total, installment) => total + installment.bayar_angsuran,
      0
    );
  const totalPenalty = () =>
    checkedRowCredit.value.reduce(
      (total, installment) => total + installment.bayar_denda,
      0
    );
  const combinedTotal = () => totalInstallment() + totalPenalty();
  return combinedTotal();
});
const uuid = uuidv4();
const pageData = reactive({
  uid: uuid,
  total_bayar: totalPay,
  jumlah_uang: 0,
  payment_method: "cash",
  pembayaran: "angsuran",
  pembulatan: 0,
  kembalian: computed(() =>
    pageData.jumlah_uang
      ? pageData.jumlah_uang - pageData.total_bayar - pageData.pembulatan
      : 0
  ),
  struktur: checkedRowCredit,
  bank_tujuan: null,
  no_rekening: null,
  bukti_transafer: null,
});
const rowProps = (row) => {
  return {
    style: "cursor: pointer;",
    onClick: () => {
     selectedFasilitas.value=row.loan_number;
     getSkalaCredit(row.loan_number);
    },
  };
};
const dynamicSearch = reactive({
  nama: "",
  no_polisi: "",
  no_kontrak: "",
});
const createColumns = () => {
  return [
    {
      title: "No Kontrak",
      key: "loan_number",
      sorter: "default",
    },
    {
      title: "Nama",
      key: "nama",
      sorter: "default",
      fixed: "left",
    },
    {
      title: "No Polisi",
      key: "no_polisi",
      sorter: "default",
    },
    {
      title: "Alamat",
      key: "alamat",
      sorter: "default",
    },
    {
      title: "Angsuran",
      key: "angsuran",
      render(row) {
        return h("div", row.angsuran.toLocaleString("US"));
      },
    },
  ];
};
const rowClassName = (row) => {
  if (row.loan_number == selectedFasilitas.value) {
    return "row-active";
  }
  return "";
};
const handleDone = () => {
  dialogProses.value = false;
  router.replace({ name: "pembayaran" });
  searchField.value = false;
  valOptSearch.value = null;
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




const createColStruktur = () => {
  return [
    {
      fixed: "left",
      type: "selection",
      disabled(row) {
        return (
          row.key > checkedRowCredit.value.length || row.flag === "PENDING"
        );
      },
    },
    {
      title: "ke",
      key: "angsuran_ke",
      width: 40,
      fixed: "left",
    },
    {
      title: "No Kontrak",
      key: "loan_number",
      width: 150,
    },
    {
      title: "Jatuh Tempo",
      key: "tgl_angsuran",
      width: 150,
    },
    {
      title: "Angsuran",
      key: "installment",
      width: 150,
      render(row) {
        return h("div", row.installment.toLocaleString("US"));
      },
    },
    {
      title: "Denda",
      width: 150,
      key: "denda",
      render(row) {
        return h("div", row.denda.toLocaleString("US"));
      },
    },
    {
      title: "Bayar Angsuran",
      width: 150,
      key: "installment",
      render(row, index) {
        if (row.flag == "PENDING") {
          return h(NTag, { type: "warning" }, { default: "dalam proses" });
        } else {
          return h(NInputNumber, {
            disabled: _.find(checkedRowCredit.value, ["key", row.key])
              ? false
              : true,
            format: format,
            parse: parse,
            max: row.bayar_angsuran,
            showButton: false,
            secondary: true,
            placeholder: "pembayaran",
            value: _.find(checkedRowCredit.value, ["key", row.key])
              ? row.bayar_angsuran
              : 0,
            onUpdateValue(v) {
              dataStrukturKredit.value[index].bayar_angsuran = v;
            },
          });
        }
      },
    },
    {
      title: "Bayar Denda",
      width: 150,
      key: "installment",
      render(row, index) {
        if (row.flag == "PENDING") {
          return h(NTag, { type: "warning" }, { default: "dalam proses" });
        } else {
          return h(NInputNumber, {
            disabled: _.find(checkedRowCredit.value, ["key", row.key])
              ? false
              : true,
            clearable: true,
            max: row.denda,
            format: format,
            parse: parse,
            showButton: false,
            secondary: true,
            placeholder: "pembayaran",
            value: _.find(checkedRowCredit.value, ["key", row.key])
              ? row.bayar_denda
              : 0,
            onUpdateValue(v) {
              dataStrukturKredit.value[index].bayar_denda = v;
            },
          });
        }
      },
    },
    {
      title: "Jumlah Bayar",
      width: 150,
      key: "payment",
      render(row, index) {
        if (row.flag == "PENDING") {
          return h(NTag, { type: "warning" }, { default: "dalam proses" });
        } else {
          return h(NInputNumber, {
            readonly: true,
            disabled: _.find(checkedRowCredit.value, ["key", row.key])
              ? false
              : true,
            format: format,
            parse: parse,
            showButton: false,
            secondary: true,
            placeholder: "pembayaran",
            value: _.find(checkedRowCredit.value, ["key", row.key])
              ? dataStrukturKredit.value[index].bayar_angsuran +
                dataStrukturKredit.value[index].bayar_denda
              : 0,
          });
        }
      },
    },
  ];
};
const optTipePay = [
  {
    label: "Tunai",
    value: "cash",
  },
  {
    label: "Transfer",
    value: "transfer",
  },
];
const columns = createColumns();
const columnStruktur = createColStruktur();
const dataAngsuran = ref(false);
const loadingAngsuran = ref(false);
const loadStructure = ref(false);
const selectedFasilitas = ref();
const handleFasilitas = (e) => {
  
  selectedFasilitas.value = e;
  prosesButton.value = true;
  getSkalaCredit(e);
};
const handleAngsuran = (e) => {
  checkedRowCredit.value = e;
};
const dialog = useDialog();
const loadProses = ref(false);
const handleProses = async () => {
  let userToken = localStorage.getItem("token");
  dialog.warning({
    title: "Konfirmasi",
    content: "apakah data yang anda masukan sudah benar ?",
    positiveText: "Ya",
    negativeText: "cek kembali",
    onPositiveClick: () => {
      postDynamic();
      router.replace({ name: "pembayaran" });
    },
  });
  const postDynamic = async () => {
    const response = await useApi({
      method: "POST",
      api: "payment",
      data: pageData,
      token: userToken,
    });
    if (!response.ok) {
      message.error("sesi berakhir");
      localStorage.removeItem("token");
      router.replace("/");
    } else {
      loadProses.value = false;
      paymentData.value = response.data;
      dialogProses.value = true;
      router.replace({ name: "pembayaran" });
    }
  };
};
const dataSearch = ref([]);
const loadSearch = ref(false);
const dataFasilitas = ref(false);
const handleSearch = async () => {
  dataAngsuran.value = false;
  let userToken = localStorage.getItem("token");
  loadSearch.value = true;
  const response = await useApi({
    method: "POST",
    api: "search_customer",
    data: dynamicSearch,
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.replace("/");
  } else {
    dataFasilitas.value = true;
    loadSearch.value = false;
    dataSearch.value = response.data;
  }
};
const dataStrukturKredit = ref([]);
const dataPayment = ref(false);
const getSkalaCredit = async (e) => {
  pageData.no_facility = e;
  loadStructure.value = true;
  const dynamicBody = {
    loan_number: pageData.no_facility,
    jumlah_uang: pageData.jumlah_uang,
  };
  loadingAngsuran.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "POST",
    api: "struktur_kredit",
    data: dynamicBody,
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.replace("/");
  } else {
    dataPayment.value = true;
    checkedRowCredit.value=[];
    dataStrukturKredit.value = response.data;
    dataAngsuran.value = true;
    loadStructure.value = false;
  }
};
const message = useMessage();
const handleImagePost = ({ file, onError, onFinish, onProgress }) => {
  let userToken = localStorage.getItem("token");
  const form = new FormData();
  form.append("uid", pageData.uid);
  form.append("image", file.file);
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  lyla
    .post("https://api.kspdjaya.id/payment_attachment", {
      headers,
      body: form,
      onUploadProgress: ({ percent }) => {
        onProgress({ percent: Math.ceil(percent) });
      },
    })
    .then(({ json }) => {
      dataBuktiTransfer.value.push(json);
      message.success("image berhasil di upload");
      onFinish();
    })
    .catch(() => {
      message.error("upload image gagal !");
      onError();
    });
};
const handleExpand = () => {
  const fullPage = router.resolve({ name: "expand transaction" });
  window.open(fullPage.href, "_blank");
};

const handleBack = () => {
  router.replace({ name: "pembayaran" });
};
</script>

<style scoped>
:deep(.row-active td) {
  background-color: rgba(24, 160, 88, 0.2) !important;
  color: rgba(24, 160, 88, 1) !important;
}
</style>