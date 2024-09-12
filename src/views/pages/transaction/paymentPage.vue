<template>
  <n-card>
    <template #header>Penerimaan Uang</template>
    <n-collapse class="fixed flex bottom-0 left-0 z-50 shadow-xl">
      <n-collapse-item
        title="post payment"
        name="1"
        class="p-2 bg-black/10 border backdrop-blur-md rounded-t-xl overflow-auto max-h-[300px]"
      >
        <pre> {{ dataPayment }}</pre>
      </n-collapse-item>
    </n-collapse>

    <!-- <n-button @click="dialogProses = true">dasdasd</n-button> -->
    <template #header-extra>
      <n-space>
        <n-button
          v-show="!searchField"
          strong
          secondary
          type="success"
          @click="handleAddPay"
        >
          <template #icon>
            <n-icon>
              <add-icon />
            </n-icon>
          </template>
          tambah penerimaan
        </n-button>
        <n-badge :value="789" :max="99" type="warning">
          <n-button
            v-show="!searchField"
            strong
            secondary
            type="success"
            @click="handleAddPay"
          >
            <template #icon>
              <n-icon>
                <add-icon />
              </n-icon>
            </template>
            acc HO
          </n-button>
        </n-badge>
        <n-button
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
          pindah ke pelunasan
        </n-button>
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

    <div>
      <!-- <pre>{{ creditCustomer }}</pre> -->
      <n-data-table
        striped
        size="small"
        :row-key="(row) => row.loan_number"
        :columns="columns"
        :data="dataPayment"
        :max-height="300"
        :on-update:checked-row-keys="handleFasilitas"
        :loading="loadSearch"
        class="pb-2"
      />
    </div>
  </n-card>
  <n-modal
    class="w-1/2"
    title="Upload Berkas Pencairan"
    v-model:show="showModal"
  >
    <n-card :bordered="false" aria-modal="true">
      <!-- {{ bodyModal }} -->
      <div class="flex justify-between">
        <div>
          <div class="flex">
            <label class="w-36">Tanggal</label
            ><span>
              <n-text strong> {{ bodyModal.tgl_transaksi }}</n-text></span
            >
          </div>
          <div class="flex">
            <label class="w-36">No Transaksi</label
            ><span>
              <n-text strong> {{ bodyModal.no_transaksi }}</n-text></span
            >
          </div>
          <div class="flex">
            <label class="w-36">Atas Nama </label
            ><span>
              <n-text strong> {{ bodyModal.nama }}</n-text></span
            >
          </div>
          <div class="flex">
            <label class="w-36">Alamat</label
            ><span>
              <n-text strong> {{ bodyModal.alamat }}</n-text></span
            >
          </div>
          <div class="flex">
            <label class="w-36">Total Bayar</label
            ><span>
              <n-text strong>
                {{ bodyModal.total_bayar.toLocaleString("US") }}</n-text
              ></span
            >
          </div>
          <div class="flex">
            <label class="w-36">Jumlah Uang</label
            ><span>
              <n-text strong>
                {{ bodyModal.jumlah_uang.toLocaleString("US") }}</n-text
              ></span
            >
          </div>
          <div class="flex">
            <label class="w-36">Pembulatan</label
            ><span>
              <n-text strong>
                {{ bodyModal.pembulatan.toLocaleString("US") }}</n-text
              ></span
            >
          </div>
          <div class="flex">
            <label class="w-36">Metode Pembayaran</label
            ><span>
              <n-text strong> {{ bodyModal.payment_method }}</n-text></span
            >
          </div>
          <div class="flex">
            <label class="w-36">kembalian</label
            ><span>
              <n-text strong>
                {{ bodyModal.kembalian.toLocaleString("US") }}</n-text
              ></span
            >
          </div>
          <div class="flex">
            <label class="w-36">Untuk Pembayaran</label>

            <n-space>
              <n-tag
                size="small"
                v-for="pembayaran in bodyModal.pembayaran"
                :bordered="false"
                >{{ pembayaran.title }}
                {{ parseInt(pembayaran.bayar_angsuran).toLocaleString("US") }}
                ,denda {{ pembayaran.bayar_denda }}
              </n-tag>
            </n-space>
          </div>
        </div>
        <div class="flex gap-2">
          <label>Status</label
          ><span>
            <n-tag
              strong
              :type="bodyModal.STATUS == 'PENDING' ? 'warning' : 'success'"
            >
              {{ bodyModal.STATUS }}</n-tag
            ></span
          >
        </div>
        <!-- <n-button>Approval</n-button> -->
      </div>
      <div v-show="bodyModal.payment_method == 'transfer'">
        <n-divider>bukti transfer</n-divider>
        <n-image :src="bodyModal.attachment" class="max-w-36" />
      </div>
    </n-card>
  </n-modal>
</template>

<script setup>
import { useApi } from "../../../helpers/axios";
import { useSearch } from "../../../helpers/searchObject";
import router from "../../../router";
import {
  SearchRound as searchIcon,
  PlusFilled as addIcon,
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

const searchField = ref(false);
const valOptSearch = ref(null);

const checkedRowCredit = ref([]);

const dialogProses = ref(false);
const paymentData = ref([]);

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
const pageData = reactive({
  no_facility: null,
  total_bayar: totalPay,
  jumlah_uang: 0,
  payment_method: "cash",
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

const dynamicSearch = reactive({
  nama: "",
  no_polisi: "",
  no_kontrak: "",
});

const dynamicForm = reactive({
  loan_number: computed(() => pageData.no_facility),
  payment_method: computed(() => pageData.payment_method),
  nilai_pembayaran: computed(
    () => pageData.jumlah_uang - pageData.kembalian - pageData.pembulatan
  ),
  pembulatan: computed(() => pageData.pembulatan),
  kembalian: computed(() => pageData.kembalian),
  nama_bank: null,
  no_rekening: null,
});

const createColumns = () => {
  return [
    {
      title: "no transaksi",
      key: "no_transaksi",
    },
    {
      title: "tanggal",
      key: "tgl_transaksi",
    },
    {
      title: "metode",
      key: "payment_method",
    },
    {
      title: "atas nama",
      key: "nama",
    },
    {
      title: "nominal",
      key: "total_bayar",
      render(row) {
        return h("div", row.total_bayar.toLocaleString("US"));
      },
    },
    {
      title: "status",
      key: "STATUS",
      render(row) {
        return h(
          NTag,
          {
            type: row.STATUS == "PENDING" ? "warning" : "success",
            onClick: (e) => {
              handleAction(row);
            },
          },
          {
            default: () => row.STATUS,
          }
        );
      },
    },
    {
       align: "right",
      key: "action",
      render(row) {
        return h(
          NBadge,
          {
            dot:true,
          },
          {
            default: () => {
              return h(NButton,
                {
                  secondary: true,
                  round: true,
                  onClick: () => {
                    handleAction(row);
                  },
                },
                {
                  default: () => "detail",
                });
            },
          }
        );
      },
    },
  ];
};

const showModal = ref(false);
const bodyModal = ref();
const handleAction = (e) => {
  showModal.value = true;
  bodyModal.value = e;
  console.log(e);
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
const dataAngsuran = ref(false);
const loadingAngsuran = ref(false);

const loadStructure = ref(false);
const handleFasilitas = (e) => {
  pageData.struktur = [];
  getSkalaCredit(e);
};

const loadCustomer = ref(false);

const loadProses = ref(false);
const handleProses = async () => {
  let userToken = localStorage.getItem("token");
  loadProses.value = true;
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
};

const dataPayment = ref([]);
const loadDataPayment = ref(false);
const message = useMessage();
const getDataPayment = async () => {
  loadDataPayment.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "payment",
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.replace("/");
  } else {
    loadDataPayment.value = false;
    dataPayment.value = response.data;
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
};
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
const handleAddPay = () => {
  router.replace({ name: "tambah penerimaan" });
};
const handlePayFull = () => {
  router.replace({ name: "pelunasan" });
};

const handleFocusField = () => {
  getDataCustomer();
};
onMounted(() => getDataPayment());
</script>
