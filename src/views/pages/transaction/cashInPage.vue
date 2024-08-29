<template>
  <n-card>
    <template #header>Penerimaan Uang</template>
    <template #header-extra>
      <n-button v-show="!searchField" strong secondary circle @click="handleExpand">
        <template #icon>
          <n-icon>
            <full-icon />
          </n-icon>
        </template>
      </n-button>
    </template>
    <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" require-mark-placement="right-hanging"
      :size="size" label-width="auto">
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
            <n-switch size="large" :rail-style="railStyle" :disabled="searchField">
              <template #checked> Pelunasan </template>
              <template #unchecked> Pembayaran </template>
            </n-switch>
          </n-form-item-gi>
          <n-form-item-gi path="nestedValue.path2">
            <n-auto-complete v-model:value="valOptSearch" :options="listCustomer" :on-select="handleInputSearch">
              <template #default="{
                handleInput,
                handleBlur,
                handleFocus,
                value: slotValue,
              }">
                <n-input clearable @clear="handleCloseNasabah" :value="valOptSearch" placeholder="Pelanggan"
                  @input="handleInput" @focus="handleFocus" @blur="handleBlur" :disabled="searchField">
                  <template #prefix>
                    <n-icon :component="searchIcon" />
                  </template>
                </n-input>
              </template>
            </n-auto-complete>
          </n-form-item-gi>
        </n-grid>
      </n-form-item>
      <n-form-item v-show="searchField">
        <n-card title="Data Nasabah" :bordered="false" embedded size="small">

          <template #header-extra>
            <n-button type="error" quaternary @click="handleCloseNasabah" size="small">
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
                  <n-text strong>{{ selectedCustomer.ADDRESS }}, RT {{ selectedCustomer.RT }} RW {{ selectedCustomer.RW
                    }}</n-text></span>
              </div>
              <div class="flex">
                <label class="w-24">Ibu Kandung</label><span>
                  <n-text strong>{{ selectedCustomer.MOTHER_NAME }}</n-text></span>
              </div>
            </n-gi>
          </n-grid>
        </n-card>
      </n-form-item>
      <n-form-item v-show="searchField">

        <n-data-table size="small" v-model:checked-row-keys="checkedRowFasilitas" :row-key="(row) => row.loan_number"
          :columns="columns" :data="creditCustomer" :pagination="pagination" />
      </n-form-item>

      <n-card title="Daftar Angsuran" size="small" v-show="searchField">
        <template #action>
          <n-space>
            <n-form-item path="nestedValue.path2" label="Jenis Pembayaran">
              <n-select filterable :options="optTipePay" placeholder="Jenis Pembayaran" v-model:value="tipe_pay" />
            </n-form-item>
            <n-form-item path="nestedValue.path2" label="Jumlah Uang">
              <n-input placeholder="Jumlah Pembayaran" loading size="large">
                <template #prefix> Rp. </template>
              </n-input>
            </n-form-item>
          </n-space>

          <n-space v-show="tipe_pay == 'transfer'">
            <n-form-item path="nestedValue.path2" label="Bank">
              <n-select filterable :options="optBank" placeholder="Bank Tujuan" v-model:value="bank" />
            </n-form-item>
            <n-form-item label="No Rekening">
              <n-input />
            </n-form-item>
            <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :headers="{
              'naive-info': 'hello!',
            }" :data="{
              'naive-data': 'cool! naive!',
            }">
              <n-button>Bukti Transfer</n-button>
            </n-upload>
          </n-space>
          <n-space v-show="tipe_pay == 'cash'">
            <n-form-item label="pembulatan">
              <n-input size="large" />
            </n-form-item>
            <n-form-item label="total">
              <n-input size="large" />
            </n-form-item>
            <n-form-item label="kembalian">
              <n-input size="large" />
            </n-form-item>
          </n-space>
          <n-space>
            <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :headers="{
              'naive-info': 'hello!',
            }" :data="{
              'naive-data': 'cool! naive!',
            }">
              <n-button>Attachment</n-button>
            </n-upload>
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
        <n-data-table size="small" :row-key="(row) => row.ID" :columns="columnStruktur" :data="dataStrukturKredit"
          :pagination="pagination" />

        <!-- </n-list> -->
      </n-card>
    </n-form>
  </n-card>
</template>

<script setup>
import { useApi } from "../../../helpers/axios";
import { useSearch } from "../../../helpers/searchObject";
import router from '../../../router';
import { SearchRound as searchIcon, OpenInFullRound as fullIcon } from "@vicons/material";
import { useDialog, useMessage, NIcon, NTag, NButton, NBadge, NAvatar } from "naive-ui";
import { computed, onMounted, ref } from "vue";

const searchField = ref(false);
const valOptSearch = ref(null);

const checkedRowFasilitas = ref([]);
const checkedRowCredit = ref([]);

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
      title: "NO PK",
      key: "order_number",
    },
    {
      title: "Sisa Angsuran",
      key: "sisa_angsuran",
    },
    {
      title: "Total Bayar",
      key: "total_bayar",
    },
  ];
};
const createColStruktur = () => {
  return [
    // {
    //   type: "selection",
    // },
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
      title: "Angsuran",
      key: "installment",
    },
    {
      title: "Dibayar",
      key: "installment",
    },
    {
      title: "Status",
      key: "status",
      render(row) {
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

const getDataCustomer = async () => {
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
    dataCustomer.value = response.data;
  }
};

const handleInputSearch = (e) => {
  selectedCustomer.value = e;
  searchField.value = true;
  getCreditCustomer();
};
const handleCloseNasabah = () => {
  searchField.value = false;
  valOptSearch.value = null;
  console.log("search");
};

const creditCustomer = ref([]);

const getCreditCustomer = async () => {
  const dynamicBody = {
    cust_code: "001240800001",
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
    getSkalaCredit();
  }
};


const dataStrukturKredit = ref([]);
const getSkalaCredit = async () => {
  const dynamicBody = {
    loan_number: "001240800001"
  }
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
  }
};

const dataKontrak = Array.from({ length: 5 }).map((_, index) => ({
  id: `01905df3-${index}`,
  loan_number: `0052406${index}`,
  cust_code: "005240600001",
  no_pk: `FPK/20240621/ ${index}`,
  sisa_angsuran: `7.050.000`,
  key: 1
}));


const handleCheckFasilitas = () => {
  console.log('list')
}


const listCustomer = computed(() => {
  let dataList = useSearch(dataCustomer.value, valOptSearch.value);
  return dataList.map((suffix) => {
    return {
      label: suffix.CUST_CODE + "-" + suffix.NAME,
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
  console.log('asdasdas');
  const fullPage = router.resolve({ name: 'expand transaction' });
  window.open(fullPage.href, '_blank');
}

onMounted(() => getDataCustomer());
</script>
