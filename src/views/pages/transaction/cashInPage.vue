<template>
  <n-card>
    <!-- {{ checkedRowCredit }} | {{totalPay}} -->
    <!-- <pre>{{ dataStrukturKredit }}</pre> -->
    <!-- <pre>{{ selectedCustomer.CUST_CODE }}</pre>
    <pre>{{ checkedRowFasilitas }}</pre> -->
    <template #header>Penerimaan Uang</template>
    <!-- {{ pageData }} -->
    <template #header-extra>
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
    </template>
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="top"
      require-mark-placement="right-hanging"
      :size="size"
      label-width="auto"
    >
      <n-form-item label="Transaksi" :show-feedback="false" class="w-full">
        <n-grid :cols="2">
          <n-form-item-gi path="nestedValue.path1">
            <!-- <n-radio-group v-model:value="size" name="left-size">
                            <n-radio-button value="small">
                                Angsuran
                            </n-radio-button>
                            <n-radio-button value="medium">
                                Pelunasan
                            </n-radio-button>
                        </n-radio-group> -->
            <n-switch
              size="large"
              :rail-style="railStyle"
              :disabled="searchField"
            >
              <template #checked> Pelunasan </template>
              <template #unchecked> Pembayaran </template>
            </n-switch>
          </n-form-item-gi>
          <n-form-item-gi path="nestedValue.path2">
            <n-auto-complete
              v-model:value="valOptSearch"
              :options="listCustomer"
              :on-select="handleInputSearch"
            >
              <template
                #default="{
                  handleInput,
                  handleBlur,
                  handleFocus,
                  value: slotValue,
                }"
              >
                <n-input
                  clearable
                  @clear="handleCloseNasabah"
                  :value="valOptSearch"
                  placeholder="Pelanggan"
                  @input="handleInput"
                  @focus="handleFocusField"
                  @blur="handleBlur"
                  :disabled="searchField"
                  :loading="loadCustomer"
                >
                  <template #prefix>
                    <n-icon :component="searchIcon" />
                  </template>
                </n-input>
              </template>
            </n-auto-complete>
            <!-- {{ dataCustomer }} -->
          </n-form-item-gi>
        </n-grid>
      </n-form-item>
      <n-form-item v-show="searchField">
        <!-- {{ selectedCustomer }} -->
        <n-card title="Data Nasabah" :bordered="false" embedded size="small">
          <template #header-extra>
            <n-button type="error" @click="handleCloseNasabah" size="small">
              ganti
            </n-button>
          </template>
          <n-grid :cols="2">
            <n-gi>
              <div class="flex">
                <label class="w-24">No Pelanggan</label
                ><span>
                  <n-text strong>{{ selectedCustomer.CUST_CODE }}</n-text></span
                >
              </div>
              <div class="flex">
                <label class="w-24">Nama </label
                ><span>
                  <n-text strong>{{ selectedCustomer.NAME }}</n-text></span
                >
              </div>
              <div class="flex">
                <label class="w-24">Tanggal Lahir</label
                ><span>
                  <n-text strong>{{ selectedCustomer.BIRTHDATE }}</n-text></span
                >
              </div>
            </n-gi>
            <n-gi>
              <div class="flex">
                <label class="w-24">No KTP</label
                ><span>
                  <n-text strong>{{ selectedCustomer.ID_NUMBER }}</n-text></span
                >
              </div>
              <div class="flex">
                <label class="w-24">Alamat</label
                ><span>
                  <n-text strong
                    >{{ selectedCustomer.ADDRESS }}, RT
                    {{ selectedCustomer.RT }} RW
                    {{ selectedCustomer.RW }}</n-text
                  ></span
                >
              </div>
              <div class="flex">
                <label class="w-24">Ibu Kandung</label
                ><span>
                  <n-text strong>{{
                    selectedCustomer.MOTHER_NAME
                  }}</n-text></span
                >
              </div>
            </n-gi>
          </n-grid>
        </n-card>
      </n-form-item>
      <n-form-item v-show="searchField">
        <!-- <pre>{{ creditCustomer }}</pre> -->
        <n-data-table
          striped
          size="small"
          :row-key="(row) => row.loan_number"
          :columns="columns"
          :data="creditCustomer"
          :pagination="pagination"
          :on-update:checked-row-keys="handleFasilitas"
        />
      </n-form-item>

      <n-card title="Daftar Angsuran" size="small" v-show="searchField">
        <template #action>
          <n-space>
            <n-form-item path="nestedValue.path2" label="Jenis Pembayaran">
              <n-select
                filterable
                :options="optTipePay"
                placeholder="Jenis Pembayaran"
                v-model:value="pageData.payment_method"
              />
            </n-form-item>
            <n-form-item path="nestedValue.path2" label="Jumlah Uang">
              <n-input-number
                placeholder="Jumlah Pembayaran"
                v-model:value="pageData.jumlah_uang"
                :show-button="false"
                :parse="parse"
                :format="format"
                clearable
                @blur="pushJumlahUang"
              >
              </n-input-number>
              
            </n-form-item>
            <n-form-item label="pembulatan">
               <n-input-number   :show-button="false"
                :parse="parse"
                :format="format" v-model:value="pageData.pembulatan" />
            </n-form-item> 
               <n-form-item label="kembalian">
              <n-input-number   :show-button="false"
                :parse="parse"
                :format="format" v-model:value="pageData.kembalian" readonly/>
            </n-form-item>
          </n-space>

          <n-space v-show="pageData.payment_method == 'transfer'">
            <n-form-item path="nestedValue.path2" label="Bank">
              <n-select
                filterable
                :options="optBank"
                placeholder="Bank Tujuan"
                v-model:value="bank"
              />
            </n-form-item>
            <n-form-item label="No Rekening">
              <n-input />
            </n-form-item>
            <n-upload
              action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              :headers="{
                'naive-info': 'hello!',
              }"
              :data="{
                'naive-data': 'cool! naive!',
              }"
            >
              <n-button>Bukti Transfer</n-button>
            </n-upload>
          </n-space>
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
          <n-space>
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
            <n-button type="primary"> Proses </n-button>
          </n-space>
        </template>
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
        <n-data-table
          striped
          size="small"
          :row-key="(row) => row.id_structur"
          :columns="columnStruktur"
          :data="dataStrukturKredit"
          :max-height="300"
          :checked-row-keys="checkedRowCredit"
          :loading="loadingAngsuran"
          v-show="dataAngsuran"
          :on-update:checked-row-keys="handleAngsuran"
        />

        <!-- </n-list> -->
      </n-card>
    </n-form>
  </n-card>
</template>

<script setup>
import { useApi } from "../../../helpers/axios";
import { useSearch } from "../../../helpers/searchObject";
import router from "../../../router";
import {
  SearchRound as searchIcon,
  OpenInFullRound as fullIcon,
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

const searchField = ref(false);
const valOptSearch = ref(null);

const checkedRowFasilitas = ref([]);
const checkedRowCredit = ref([]);

const pageData = reactive({
  no_cust: null,
  no_facility: null,
  jumlah_uang: null,
  payment_method: null,
  pembulatan:0,
  kembalian:computed(()=>pageData.jumlah_uang - totalPay.value-pageData.pembulatan),
  bank_tujuan: null,
  no_rekening: null,
  bukti_transafer: null,
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
      title: "No Polisi",
      key: "jaminan.POLICE_NUMBER",
    },
    {
      title: "NO PK",
      key: "order_number",
    },
    {
      title: "Sisa Angsuran",
      key: "sisa_angsuran",
      render(row) {
        return h("div", row.sisa_angsuran.toLocaleString("US"));
      },
    },
    {
      title: "Total Bayar",
      key: "total_bayar",
    },
  ];
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
      type: "selection",
    },
    {
      title: "Angsuran ke",
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
      title: "Tagihan",
      key: "installment",
    },
    {
      title: "After",
      key: "after_payment",
    },
    {
      title: "Denda",
    },
    {
      title: "Dibayar",
      key: "installment",
      render(row, index) {
        return h(NInputNumber, {
          readonly: true,
          format: format,
          parse: parse,
          showButton: false,
          secondary: true,
          placeholder: "pembayaran",
          value: row.payment,
          onUpdateValue(v) {
            dataStrukturKredit.value[index].flag = v;
          },
        });
      },
    },
    {
      title: "Status",
      key: "status",
      render(row) {
        if (row.flag == 0) {
          return h(
            NTag,
            {
              bordered: false,
              type: "warning",
            },
            { default: () => "unpaid" }
          );
        } else {
          return h(
            NTag,
            {
              bordered: false,
              type: "success",
            },
            { default: () => "paid" }
          );
        }
      },
    },
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
const selectedCustomer = ref([]);
const columns = createColumns();
const columnStruktur = createColStruktur();
const dataAngsuran = ref(false);
const loadingAngsuran = ref(false);

const handleFasilitas = (e) => {
  getSkalaCredit(e);
};

const handleAngsuran = (e) => {
  console.log(e);
  checkedRowCredit.value = e;
};

const totalPay=computed(()=>{
  return  checkedRowCredit.value.reduce((sum, str) => {
        // Split the string by '-' and take the second part (the number)
        let value = parseInt(str.split('-')[1], 10);
        return sum + value;
    }, 0);
});

const loadCustomer = ref(false);
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

const dataStrukturKredit = ref([]);

const getSkalaCredit = async (e) => {
  pageData.no_facility = e[0];
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
    loadingAngsuran.value = false;
  }
};
const totalPayment=computed(()=>{
  // return checkedRowCredit.value;
  return dataStrukturKredit.value;
});
const pushJumlahUang = async () => {
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
     checkedRowCredit.value=[];
    dataStrukturKredit.value = response.data;
    dataStrukturKredit.value.map((v, index) => {
      if (v.after_payment != 0) {
        checkedRowCredit.value.push(v.id_structur);
      }

    });
    dataAngsuran.value = true;
    loadingAngsuran.value = false;
  }
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
  console.log("asdasdas");
  const fullPage = router.resolve({ name: "expand transaction" });
  window.open(fullPage.href, "_blank");
};

const handleFocusField = () => {
  getDataCustomer();
};
// onMounted(() => getDataCustomer());
</script>
