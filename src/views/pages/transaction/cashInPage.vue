<template>
  <n-card>
    <template #header>Penerimaan Uang</template>
    <n-collapse class="fixed flex bottom-0 left-0 z-50 shadow-xl ">
      <n-collapse-item title="post payment" name="1"
        class="p-2 bg-black/10 border backdrop-blur-md rounded-t-xl overflow-auto max-h-[300px]">
        <pre> {{ pageData }}</pre>
      </n-collapse-item>
    </n-collapse>

    <!-- <n-button @click="dialogProses = true">dasdasd</n-button> -->
    <template #header-extra>
      <n-space>
        <n-button v-show="!searchField" strong secondary type="warning" @click="handleBack">
          <template #icon>
            <n-icon>
              <back-icon />
            </n-icon>
          </template>
          kembali
        </n-button>
        <n-button v-show="!searchField" strong secondary type="success" @click="handlePayFull">
          <template #icon>
            <n-icon>
              <full-pay />
            </n-icon>
          </template>
          pindah ke pelunasan
        </n-button>
        <n-button v-show="!searchField" strong secondary circle @click="handleExpand">
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
        <n-input v-model:value="dynamicSearch.nama" type="text" placeholder="Nama" @blur="handleSearch" clearable />
      </n-form-item>
      <n-form-item label="No Polisi" class="w-full">
        <n-input v-model:value="dynamicSearch.no_polisi" type="text" placeholder="No Polisi" @blur="handleSearch"
          clearable />
      </n-form-item>
      <n-form-item label="No Kontrak" class="w-full">
        <n-input v-model:value="dynamicSearch.no_kontrak" type="text" placeholder="No Kontrak" @blur="handleSearch"
          clearable />
      </n-form-item>
    </div>
    <!-- <n-form ref="formRef" :model="model" :rules="rules" label-placement="top" require-mark-placement="right-hanging"
      :size="size" label-width="auto"> -->
    <!-- <n-form-item :show-feedback="false" class="w-full"> -->
    <!-- <n-grid :cols="2"> -->
    <!-- <n-form-item-gi path="nestedValue.path1"> -->
    <!-- <n-radio-group v-model:value="size" name="left-size">
                            <n-radio-button value="small">
                                Angsuran
                            </n-radio-button>
                            <n-radio-button value="medium">
                                Pelunasan
                            </n-radio-button>
                        </n-radio-group> -->
    <!-- <n-switch size="large" :rail-style="railStyle" :disabled="searchField">
              <template #checked> Pelunasan </template>
              <template #unchecked> Pembayaran </template>
            </n-switch>
          </n-form-item-gi> -->
    <!-- <n-form-item-gi path="nestedValue.path2">
            <n-auto-complete v-model:value="valOptSearch" :options="listCustomer" :on-select="handleInputSearch">
              <template #default="{
                handleInput,
                handleBlur,
                handleFocus,
                value: slotValue,
              }">
                <n-input clearable @clear="handleCloseNasabah" :value="valOptSearch" placeholder="Pelanggan"
                  @input="handleInput" @focus="handleFocusField" @blur="handleBlur" :disabled="searchField"
                  :loading="loadCustomer">
                  <template #prefix>
                    <n-icon :component="searchIcon" />
                  </template>
                </n-input>
              </template>
            </n-auto-complete>
          
          </n-form-item-gi> -->
    <!-- </n-grid> -->
    <!-- </n-form-item> -->
    <!-- <n-form-item v-show="searchField"> -->
    <!-- {{ selectedCustomer }} -->
    <!-- <n-card title="Data Nasabah" :bordered="false" embedded size="small">
        <template #header-extra>
          <n-button type="error" @click="handleCloseNasabah" size="small">
            ganti
          </n-button>
        </template>
        <n-grid :cols="2">
          <n-gi>
            <div class="flex">
              <label class="w-24">No Pelanggan</label><span>
                <n-text strong>{{ selectedCustomer.CUST_CODE }}</n-text></span>
            </div>
            <div class="flex">
              <label class="w-24">Nama </label><span>
                <n-text strong>{{ selectedCustomer.NAME }}</n-text></span>
            </div>
            <div class="flex">
              <label class="w-24">Tanggal Lahir</label><span>
                <n-text strong>{{ selectedCustomer.BIRTHDATE }}</n-text></span>
            </div>
          </n-gi>
          <n-gi>
            <div class="flex">
              <label class="w-24">No KTP</label><span>
                <n-text strong>{{ selectedCustomer.ID_NUMBER }}</n-text></span>
            </div>
            <div class="flex">
              <label class="w-24">Alamat</label><span>
                <n-text strong>{{ selectedCustomer.ADDRESS }}, RT
                  {{ selectedCustomer.RT }} RW
                  {{ selectedCustomer.RW }}</n-text></span>
            </div>
            <div class="flex">
              <label class="w-24">Ibu Kandung</label><span>
                <n-text strong>{{
                  selectedCustomer.MOTHER_NAME
                }}</n-text></span>
            </div>
          </n-gi>
        </n-grid>
      </n-card>
    </n-form-item> -->
    <div>
      <!-- <pre>{{ creditCustomer }}</pre> -->
      <n-data-table striped size="small" :row-key="(row) => row.loan_number" :columns="columns" :data="dataSearch"
        :max-height="300" :on-update:checked-row-keys="handleFasilitas" :loading="loadSearch" class="pb-2" />
      <n-data-table striped size="small" :row-key="(row) => row" :columns="columnStruktur" :data="dataStrukturKredit"
        :max-height="300" :checked-row-keys="checkedRowCredit" :loading="loadStructure" v-show="dataAngsuran"
        :on-update:checked-row-keys="handleAngsuran" class="py-2" />
      <div class="flex gap-2  bg-pr/10  rounded-xl items-center pt-4 px-4">
        <n-form-item path="nestedValue.path2" label="Jenis Pembayaran" class="w-full">
          <div class="flex gap-2 ">
            <n-select filterable :options="optTipePay" placeholder="Jenis Pembayaran"
              v-model:value="pageData.payment_method" />
            <n-button v-show="pageData.payment_method == 'transfer'" type="warning" @click="buktiTransfer = true">
              Bukti ({{ dataBuktiTransfer.length }})
            </n-button>
          </div>
        </n-form-item>
        <n-form-item path="nestedValue.path2" label="Total Bayar" class="w-full">
          <n-input-number placeholder="Jumlah Pembayaran" v-model:value="totalPay" :show-button="false" :parse="parse"
            :format="format" clearable @blur="pushJumlahUang" class="w-full">
          </n-input-number>
        </n-form-item>
        <n-form-item path="nestedValue.path2" label="Uang Pelanggan" class="w-full">
          <n-input-number placeholder="Jumlah Pembayaran" v-model:value="pageData.jumlah_uang" :show-button="false"
            :parse="parse" :format="format" clearable @blur="pushJumlahUang" class="w-full">
          </n-input-number>
        </n-form-item>
        <n-form-item label="Pembulatan" class="w-full">
          <n-input-number :show-button="false" :parse="parse" :format="format" v-model:value="pageData.pembulatan"
            clearable class="w-full" />
        </n-form-item>
        <n-form-item label="Kembalian" class="w-full">
          <n-input-number :show-button="false" :parse="parse" :format="format" v-model:value="pageData.kembalian"
            readonly class="w-full" />
        </n-form-item>
        <n-form-item label="" class="w-full">
          <n-space>
            <n-button type="primary" @click="handleProses" :loading="loadProses"> Proses </n-button>
          </n-space>
        </n-form-item>
      </div>
    </div>

    <!-- <n-card title="Daftar Angsuran" size="small" v-show="dataAngsuran">
      <template #action>
        <n-space v-show="pageData.payment_method == 'transfer'">
          <n-form-item path="nestedValue.path2" label="Bank">
            <n-select filterable :options="optBank" placeholder="Bank Tujuan" v-model:value="dynamicForm.nama_bank" />
          </n-form-item>
          <n-form-item label="No Rekening">
            <n-input v-model:value="dynamicForm.no_rekening" />
          </n-form-item>
          <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :headers="{
            'naive-info': 'hello!',
          }" :data="{
            'naive-data': 'cool! naive!',
          }">
            <n-button>Bukti Transfer</n-button>
          </n-upload>
        </n-space> -->
    <!-- <n-space v-show="pageData.payment_method == 'cash'">
            <n-form-item label="pembulatan">
              <n-input size="large" />
            </n-form-item>
            <n-form-item label="total">
              <n-input size="large" />
            </n-form-item>
            <n-form-item label="kembalian">
              <n-input size="large" />
            </n-form-item>
          </n-space> -->
    <!-- <n-space> -->
    <!-- <n-upload
              action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              :headers="{
                'naive-info': 'hello!',
              }"
              :data="{
                'naive-data': 'cool! naive!',
              }"
            >
              <n-button>Attachment</n-button>
            </n-upload> -->
    <!-- <n-button type="primary" @click="handleProses" :loading="loadProses"> Proses </n-button>
        </n-space>
      </template> -->
    <!-- <n-list size="small" bordered>
          <n-list-item class="bg-slate-50">
            <template #prefix>
              <n-checkbox> </n-checkbox>
            </template>
            <n-space justify="space-between">
              <n-text>Jatuh Tempo</n-text>
              <n-text>Jumlah Tagihan</n-text>
              <n-text>Denda</n-text>
              <n-text>Biaya Tagih</n-text>
              <n-text>Status</n-text>
            </n-space>
          </n-list-item>
          <n-list-item v-for="i in 6">
            <template #prefix>
              <n-checkbox></n-checkbox>
            </template>
            <n-space justify="space-between" align="start">
              <n-text strong>10-08-2022</n-text>
              <n-text>1.000.000,00</n-text>
              <n-text>1.000,00</n-text>
              <n-text>5.000,00</n-text>
              <n-tag size="small" :bordered="false" type="success" v-if="i < 6">PAID</n-tag>
              <n-tag size="small" :bordered="false" type="error" v-else>UNPAID</n-tag>
            </n-space>
          </n-list-item> -->

    <!-- </n-list> -->
    <!-- </n-card> -->
    <!-- </n-form> -->
  </n-card>

  <n-modal class="w-3/4" title="Upload Berkas Pencairan" v-model:show="dialogProses" :mask-closable="false">
    <n-card title="Transaksi Berhasil">
      <div class=" flex gap-8 font-mono">
        <table class="table-auto w-1/2">
          <tr>
            <td>No Transaksi</td>
            <td>:</td>
            <td> <b>{{ paymentData.no_transaksi }}</b> </td>
          </tr>
          <tr>
            <td width="120px">Tgl Transaksi</td>
            <td>:</td>
            <td> {{ paymentData.tgl_transaksi }} </td>
          </tr>
          <tr>
            <td>Terima Dari</td>
            <td>:</td>
            <td> {{ paymentData.detail_pelanggan.cust_code }} - {{ paymentData.detail_pelanggan.nama }} </td>
          </tr>
          <tr>
            <td>Jumlah Uang </td>
            <td>:</td>
            <td> {{ paymentData.jml_pembayaran.toLocaleString('US') }} </td>
          </tr>
          <tr>
            <td>Terbilang</td>
            <td>:</td>
            <td>{{ paymentData.terbilang }} </td>
          </tr>
          <tr>
            <td valign="top">Keterangan</td>
            <td valign="top">:</td>
            <td><span v-for="pembayaran in paymentData.pembayaran">{{ pembayaran.title }} ({{
              pembayaran.payment_value.toLocaleString('US') }}), </span></td>
          </tr>
        </table>
        <table class="table-auto  w-1/2" height="0">
          <tr>
            <td width="120px">Metode</td>
            <td>:</td>
            <td>{{ paymentData.payment_method }} </td>
          </tr>
          <tbody v-if="paymentData.payment_method == 'cash'">
            <tr>
              <td width="120px">Pembulatan</td>
              <td>:</td>
              <td>{{ paymentData.pembulatan }} </td>
            </tr>
            <tr>
              <td width="120px">Kembalian</td>
              <td>:</td>
              <td>{{ paymentData.kembalian }} </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td width="120px">Bank Tujuan</td>
              <td>:</td>
              <td>{{ paymentData.nama_bank.toUpperCase() }} </td>
            </tr>
            <tr>
              <td width="120px">No Rekening</td>
              <td>:</td>
              <td>{{ paymentData.no_rekening }} </td>
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
      <n-upload list-type="image" multiple :data="{ type: 'berkas pencairan' }" :custom-request="handleImagePost"
        :max="5">
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
      <n-image v-for="imageBukti in dataBuktiTransfer " :src="imageBukti" />
    </n-card>
  </n-modal>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { lyla } from "@lylajs/web";
import { useApi } from "../../../helpers/axios";
import { useSearch } from "../../../helpers/searchObject";
import router from "../../../router";
import {
  SearchRound as searchIcon,
  PlusFilled as addIcon,
  ChevronLeftRound as backIcon,
  OpenInFullRound as fullIcon,
  PriceCheckFilled as fullPay,
} from "@vicons/material";
import {
  useDialog,
  useMessage,
  NIcon,
  NTag,
  NButton,
  NBadge,
  NAvatar,
  NInput,
  NInputNumber,
} from "naive-ui";
import { computed, onMounted, reactive, readonly, ref } from "vue";
import { constant } from "lodash";

const searchField = ref(false);
const valOptSearch = ref(null);

const checkedRowFasilitas = ref([]);
const checkedRowCredit = ref([]);

const dialogTransfer = ref(false);
const dialogProses = ref(false);
const paymentData = ref([]);

const buktiTransfer = ref(false);
const dataBuktiTransfer = ref([]);

const totalPay = computed(() => {
  const totalInstallment = () => checkedRowCredit.value.reduce((total, installment) => total + installment.bayar_angsuran, 0);

  const totalPenalty = () => checkedRowCredit.value.reduce((total, installment) => total + installment.bayar_denda, 0);

  const combinedTotal = () => totalInstallment() + totalPenalty();

  return combinedTotal();
});
const uuid = uuidv4();
const pageData = reactive({
  uid: uuid,
  total_bayar: totalPay,
  jumlah_uang: 0,
  payment_method: 'cash',
  pembulatan: 0,
  kembalian: computed(() => pageData.jumlah_uang ? pageData.jumlah_uang - pageData.total_bayar - pageData.pembulatan : 0),
  struktur: checkedRowCredit,
  bank_tujuan: null,
  no_rekening: null,
  bukti_transafer: null,
});

const dynamicSearch = reactive({
  nama: '',
  no_polisi: '',
  no_kontrak: ''
});

const dynamicForm = reactive({
  loan_number: computed(() => pageData.no_facility),
  payment_method: computed(() => pageData.payment_method),
  nilai_pembayaran: computed(() => pageData.jumlah_uang - pageData.kembalian - pageData.pembulatan),
  pembulatan: computed(() => pageData.pembulatan),
  kembalian: computed(() => pageData.kembalian),
  nama_bank: null,
  no_rekening: null
});

const createColumns = () => {
  return [
    {
      type: "selection",
      multiple: false,
    },
    {
      title: "No Kontrak",
      key: "loan_number",
    },
    {
      title: "Nama",
      key: "nama",
    },
    {
      title: "No Polisi",
      key: "no_polisi",
    },
    {
      title: "Alamat",
      key: "alamat",
    },
    {
      title: "Angsuran",
      key: "angsuran",
      render(row) {
        return h("div", row.angsuran.toLocaleString('US'));
      },
    },
  ];
};

const handleDone = () => {
  dialogProses.value = false;
  router.replace({ name: "pembayaran" });
  searchField.value = false;
  valOptSearch.value = null;
}
const parse = (input) => {
  const nums = input.replace(/,/g, "").trim();
  if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums);
  return nums === "" ? null : Number.NaN;
};
const format = (value) => {
  if (value === null) return "";
  return value.toLocaleString("en-US");
};

const jml_uang = ref(0);

const createColStruktur = () => {
  return [
    {
      type: "selection",
    },
    {
      title: "ke",
      key: "angsuran_ke",
    },
    {
      title: "No Kontrak",
      key: "loan_number",
    },
    {
      title: "Jatuh Tempo",
      key: "tgl_angsuran",
    },
    {
      title: "Angsuran",
      key: "installment",
      render(row) {
        return h("div", row.installment.toLocaleString('US'));
      },
    },
    {
      title: "Denda",
      key: "denda",
      render(row) {
        return h("div", row.denda.toLocaleString('US'));
      },
    },
    // {
    //   title: "Jumlah Uang",
    //   key: "jumlah_uang",
    //   render(row, index) {
    //     return h(NInputNumber, {
    //       readonly: false,
    //       format: format,
    //       parse: parse,
    //       showButton: false,
    //       secondary: true,
    //       placeholder: "pembayaran",
    //       value: jml_uang.value,
    //       onUpdateValue(v) {
    //         dataStrukturKredit.value[index].bayar_angsuran = v;
    //       },
    //     });
    //   },
    // },
    {
      title: "Bayar Angsuran",
      key: "installment",
      render(row, index) {
        return h(NInputNumber, {
          readonly: false,
          format: format,
          parse: parse,
          max: row.bayar_angsuran,
          showButton: false,
          secondary: true,
          placeholder: "pembayaran",
          value: row.bayar_angsuran,
          onUpdateValue(v) {
            dataStrukturKredit.value[index].bayar_angsuran = v;
          },
        });
      },
    },
    {
      title: "Bayar Denda",
      key: "installment",
      render(row, index) {
        return h(NInputNumber, {
          readonly: false,
          clearable: true,
          min: 0,
          max: row.bayar_denda,
          format: format,
          parse: parse,
          showButton: false,
          secondary: true,
          placeholder: "pembayaran",
          value: row.bayar_denda,
          onUpdateValue(v) {
            dataStrukturKredit.value[index].bayar_denda = v;
          },
        });
      },
    },
    {
      title: "Jumlah Bayar",
      key: "payment",
      render(row, index) {
        return h(NInputNumber, {
          readonly: true,
          format: format,
          parse: parse,
          showButton: false,
          secondary: true,
          placeholder: "pembayaran",
          value: dataStrukturKredit.value[index].bayar_angsuran + dataStrukturKredit.value[index].bayar_denda,
        });
      },
    },
    // {
    //   title: "Status",
    //   key: "status",
    //   render(row) {
    //     if (row.flag == 0) {
    //       return h(
    //         NTag,
    //         {
    //           bordered: false,
    //           type: "warning",
    //         },
    //         { default: () => "unpaid" }
    //       );
    //     } else {
    //       return h(
    //         NTag,
    //         {
    //           bordered: false,
    //           type: "success",
    //         },
    //         { default: () => "paid" }
    //       );
    //     }
    //   },
    // },
  ];
};

const tipe_pay = ref("Tunai");
const bank = ref(null);
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
const optBank = [
  {
    label: "BCA",
    value: "bca",
  },
  {
    label: "Mandiri",
    value: "mandiri",
  },
];

const dataCustomer = ref([]);
const jaminanCustomer = ref([]);
const selectedCustomer = ref([]);
const columns = createColumns();
const columnStruktur = createColStruktur();
const dataAngsuran = ref(false);
const loadingAngsuran = ref(false);

const loadStructure = ref(false);
const handleFasilitas = (e) => {
  pageData.struktur = [];
  getSkalaCredit(e);
};

const handleAngsuran = (e) => {
  // console.log(e);
  checkedRowCredit.value = e;
};



const loadCustomer = ref(false);

const dialog = useDialog();
const loadProses = ref(false);
const handleProses = async () => {
  let userToken = localStorage.getItem("token");
  // loadProses.value = true;
  dialog.warning({
    title: "Konfirmasi",
    content: "apakah data yang anda masukan sudah benar ?",
    positiveText: "Ya",
    negativeText: "cek kembali",
    onPositiveClick: () => {
      postDynamic();
      router.replace({ name: 'pembayaran' });
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
    }
  }
}

const getDataCustomer = async () => {
  loadCustomer.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "customer",
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.replace("/");
  } else {
    loadCustomer.value = false;
    dataCustomer.value = response.data;
    let customer = dataCustomer.value;
    // console.log(customer);
  }
};

const handleInputSearch = (e) => {
  selectedCustomer.value = e;
  pageData.no_cust = e.CUST_CODE;
  searchField.value = true;
  getCreditCustomer();
};
const handleCloseNasabah = () => {
  searchField.value = false;
  valOptSearch.value = null;
};

const creditCustomer = ref([]);

const getCreditCustomer = async () => {
  const dynamicBody = {
    cust_code: selectedCustomer.value.CUST_CODE,
  };
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "POST",
    api: "kontrak_fasilitas",
    data: dynamicBody,
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.replace("/");
  } else {
    creditCustomer.value = response.data;
    // getSkalaCredit();
  }
};
const dataSearch = ref([]);

const loadSearch = ref(false);
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
    loadSearch.value = false;
    dataSearch.value = response.data;
  }
}
const dataStrukturKredit = ref([]);

const getSkalaCredit = async (e) => {
  pageData.no_facility = e[0];
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
    dataStrukturKredit.value = response.data;
    dataAngsuran.value = true;
    loadStructure.value = false;
  }
};
const message = useMessage();
const handleImagePost = ({
  idApp,
  file,
  data,
  onError,
  onFinish,
  onProgress,
}) => {
  let userToken = localStorage.getItem("token");
  // let idApp = pageData.value.order.cr_prospect_id;
  const form = new FormData();
  form.append("uid", pageData.uid);
  form.append("image", file.file);
  // form.append("type", data.type);
  //   console.log(pageData.value);

  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  //   console.log(form);
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
      message.success('image berhasil di upload');
      onFinish();
    })
    .catch((error) => {
      message.error("upload image gagal !");
      onError();
    });
};

const totalPayment = computed(() => {
  // return checkedRowCredit.value;
  return dataStrukturKredit.value;
});



const pushJumlahUang = async () => {
  // jml_uang.value = pageData.jumlah_uang;
  // const dynamicBody = {
  //   loan_number: pageData.no_facility,
  //   jumlah_uang: pageData.jumlah_uang,
  // };
  // loadingAngsuran.value = true;
  // let userToken = localStorage.getItem("token");
  // const response = await useApi({
  //   method: "POST",
  //   api: "struktur_kredit",
  //   data: dynamicBody,
  //   token: userToken,
  // });
  // if (!response.ok) {
  //   message.error("sesi berakhir");
  //   localStorage.removeItem("token");
  //   router.replace("/");
  // } else {
  //   checkedRowCredit.value = [];
  //   dataStrukturKredit.value = response.data;
  //   dataStrukturKredit.value.map((v, index) => {
  //     if (v.after_payment != 0) {
  //       checkedRowCredit.value.push(v.id_structur);
  //     }

  //   });
  //   dataAngsuran.value = true;
  //   loadingAngsuran.value = false;
  // }
};

const dataKontrak = Array.from({ length: 5 }).map((_, index) => ({
  id: `01905df3-${index}`,
  loan_number: `0052406${index}`,
  cust_code: "005240600001",
  no_pk: `FPK/20240621/ ${index}`,
  sisa_angsuran: `7.050.000`,
  key: 1,
}));

const handleCheckFasilitas = () => {
  console.log("list");
};

const listCustomer = computed(() => {
  let dataList = useSearch(dataCustomer.value, valOptSearch.value);
  return dataList.map((suffix) => {
    return {
      label: suffix.CUST_CODE + " " + suffix.NAME,
      value: suffix,
    };
  });
});

const railStyle = ({ focused, checked }) => {
  const style = {};
  if (checked) {
    style.background = "#d03050";
    if (focused) {
      style.boxShadow = "0 0 0 2px #d0305040";
    }
  } else {
    style.background = "#008000";
    if (focused) {
      style.boxShadow = "0 0 0 2px #2080f040";
    }
  }
  return style;
};

const handleExpand = () => {
  const fullPage = router.resolve({ name: "expand transaction" });
  window.open(fullPage.href, "_blank");
};
const handlePayFull = () => {
  router.replace({ name: "pelunasan" });
};
const handleBack = () => {
  router.replace({ name: "pembayaran" });
};

const handleFocusField = () => {
  getDataCustomer();
};
// onMounted(() => getDataCustomer());
</script>