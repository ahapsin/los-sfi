<template>
  <n-card content-style="padding: 0;" :segmented="{
        content: true,
        footer: 'soft',
    }">
    <template #header>Penerimaan Uang
      <!-- <n-icon v-if="width <=620">
  <phone-icon />
</n-icon>
<n-icon v-else>
  <desktop-icon />
</n-icon> -->
    </template>
    <template #header-extra>
      <n-space>
        <n-button round v-show="!searchField" strong secondary type="success" @click="handleAddPay">
          <template #icon>
            <n-icon>
              <add-icon/>
            </n-icon>
          </template>
          <span class="hidden md:flex">tambah</span>
        </n-button>
        <!-- <n-button
  round
  v-show="!searchField"
  strong
  secondary
  type="warning"
  @click="handlePayFull"
>
  <template #icon>
    <n-icon>
      <full-pay />
    </n-icon>
  </template>
  <span class="hidden md:flex">pindah ke pelunasan</span>
</n-button> -->
        <n-popover trigger="click" placement="bottom-end">
          <template #trigger>
            <n-button circle>
              <n-icon>
                <search-icon/>
              </n-icon>
            </n-button>
          </template>
          <n-space vertical>
            <n-input autofocus="true" clearable placeholder="cari disini.." v-model:value="searchBox"/>
            <n-date-picker :default-value="[Date.now(), Date.now()]"
                           :update-value-on-close="updateValueOnClose" type="daterange"
                           @update:value="onConfirmDate"/>
          </n-space>
        </n-popover>
        <n-button type="success" secondary circle @click="downloadCsv">
          <template #icon>
            <n-icon>
              <download-file/>
            </n-icon>
          </template>
        </n-button>
        <!-- <n-button type="error" secondary circle @click="handleBug">
  <template #icon>
    <n-icon>
      <bug-icon />
    </n-icon>
  </template>
</n-button>
<n-button v-show="!searchField" strong secondary circle @click="handleExpand">
  <template #icon>
    <n-icon>
      <full-icon />
    </n-icon>
  </template>
</n-button> -->
      </n-space>
    </template>
    <div>
      <n-space class="flex py-2"></n-space>
      <n-data-table ref="tableRef" striped size="small" :row-key="(row) => row.loan_number" :columns="columns"
                    :scroll-x="870" :data="showData" :max-height="500" :on-update:checked-row-keys="handleFasilitas"
                    :loading="loadDataPayment" class="p-4" :pagination="pagination"/>
    </div>
  </n-card>
  <n-modal class="w-fit" title="Upload Berkas Pencairan" v-model:show="showModal">
    <n-card :bordered="false" aria-modal="true" title=" ">
      <template #header-extra>
        <div class="flex gap-2">
          <n-space>
            <n-tag strong
                   :type="bodyModal.STATUS == 'PENDING' ? 'warning' : bodyModal.STATUS == 'PAID' ? 'success' : 'error'">
              {{ bodyModal.STATUS }}
            </n-tag>

            <n-button v-if="bodyModal.STATUS != 'CANCEL'" secondary type="error"
                      @click="handleCancelPayment">
              batalkan
            </n-button>
            <n-button secondary @click="handlePrint"
                      v-show="bodyModal.STATUS == 'PAID' && width < 650">
              <n-icon>
                <print-icon/>
              </n-icon>
              Cetak
            </n-button>
            <n-button secondary type="warning" @click="handlePrint"
                      v-show="bodyModal.STATUS == 'PAID' && width > 650">
              <n-icon>
                <print-icon/>
              </n-icon>
              Cetak
            </n-button>
          </n-space>
        </div>
      </template>
      <div ref="printReceiptRef" class="flex flex-col max-h-[500px] overflow-y-auto">
        <div class="p-2">
          <div class="flex items-center gap-2 pb-2 justify-between border-b border-dashed">
            <div class="flex gap-2">
              <img
                class="h-10 md:h-10"
                src="../../../assets/logo.png"
                alt="logo_company"
            />
            <span class="text-2xl font-bold">KSPDJAYA</span>
            </div>
            <div class="flex flex-col items-end">
              <small class="text-reg">No Transaksi </small>
              <n-text strong class="text-lg"> {{ bodyModal.no_transaksi }}</n-text>
            </div>
          </div>
          <div class="flex justify-between border-b border-dashed" :class="width > 540 ? 'flex-row':'flex-col'">
            <div class="flex flex-col py-4">
              <small class="text-reg">Terima dari : </small>
              <n-text strong class="text-lg font-bold"> {{ bodyModal.nama }}</n-text>
              <small class="text-lg">{{ bodyModal.no_fasilitas }}</small>
            </div>
            <div class="flex flex-col py-4 items-end ">
              <n-text strong class="text-2xl">
                Rp.{{ bodyModal.total_bayar.toLocaleString("US") }}
              </n-text>
              <n-text small italic>
                {{findStringInParentheses(bodyModal.terbilang)}}
              </n-text>
            </div>
          </div>

          <div :class="width > 540 ? 'min-w-[300px] pt-2 grid grid-cols-5 gap-4':'min-w-[300px] grid grid-cols-1 gap-4' ">
            <div class="flex flex-col">
              <small class="text-reg">Tanggal & Waktu</small>
              <n-text strong class="text-lg"> {{ bodyModal.tgl_transaksi }}</n-text>
            </div>
            <div class="flex flex-col">
              <small class="text-reg">Angsuran</small>
              <n-text strong class="text-lg"> {{
                  bodyModal.bayar_angsuran.toLocaleString('US') ? bodyModal.bayar_angsuran.toLocaleString('US') : 'n/a'
                }}
              </n-text>
            </div>
            <div class="flex flex-col">
              <small class="text-reg">Jumlah Uang</small>
              <n-text strong class="text-lg"> {{ bodyModal.jumlah_uang.toLocaleString("US") }}</n-text>
            </div>
            <div class="flex flex-col">
              <small class="text-reg">Kembalian</small>
              <n-text strong class="text-lg"> {{ bodyModal.kembalian.toLocaleString("US") }}</n-text>
            </div>
            <div class="flex flex-col">
              <small class="text-reg">Metode Pembayaran</small>
              <n-text strong class="text-lg"> {{ bodyModal.payment_method }}</n-text>
            </div>
          </div>
        </div>
        <div class="px-3">
          <table width="100%" border="1">
            <tr>
              <th class="border w-10">ke</th>
              <th class="border">Angsuran</th>
              <th class="border">Denda</th>
              <th class="border">Jumlah</th>
            </tr>
            <tr v-for="angs in bodyModal.struktur" :key="angs.id">
              <td align="right" class="border pe-2">{{angs.angsuran_ke}}</td>
              <td align="right" class="border pe-2">{{parseInt(angs.bayar_angsuran).toLocaleString('US')}}</td>
              <td align="right" class="border pe-2">{{parseInt(angs.bayar_denda).toLocaleString('US')}}</td>
              <td align="right" class="border pe-2">{{parseInt(parseInt(angs.bayar_angsuran)+parseInt(angs.bayar_denda)).toLocaleString(('US'))}}</td>
            </tr>
            <tr>
              <td><strong>Total</strong></td>
              <td colspan="3" align="right" class="pe-2"><strong>{{bodyModal.total_bayar.toLocaleString("US")}}</strong></td>
            </tr>
          </table>
        </div>
        <div class="flex flex-col border-b border-dashed pb-4 ms-3">
          <div class="flex gap-4">
            <div class="border-b pt-20 px-4">
              <n-text strong class="text-md font-bold"> {{ meData.me.nama }}</n-text>
            </div>
            <div class="border-b pt-20 px-4">
              <n-text strong class="text-md font-bold"> {{ bodyModal.nama }}</n-text>
            </div>
          </div>
        </div>
      </div>
      <div v-show="bodyModal.payment_method == 'transfer'">
        <n-divider>bukti transfer</n-divider>
        <n-image :src="bodyModal.attachment" class="max-w-36"/>
      </div>
    </n-card>
  </n-modal>
  <n-modal v-model:show="confCancelModal" preset="dialog" draggable title="Konfirmasi"
           positive-text="Ya, Ajukan Sekarang !" negative-text="hmm, nanti dulu deh" @positive-click="postCancelPayment"
           @negative-click="cancelCallback">
    <div>Batalin sekarang, yakin?
    </div>
    <n-input type="textarea" placeholder="isi dulu alasannya disini" v-model:value="bodyCancel.descr"/>
  </n-modal>
</template>
<script setup>
import {useApi} from "../../../helpers/axios";
import {useSearch} from "../../../helpers/searchObject";
import router from "../../../router";
import {
  SearchRound as searchIcon,
  PlusFilled as addIcon,
  LocalPrintshopOutlined as PrintIcon,
  FileDownloadOutlined as DownloadFile,
} from "@vicons/material";
import {useWindowSize} from "@vueuse/core";
import {useLoadingBar} from "naive-ui";

const loadingBar = useLoadingBar();
import {useMessage, NIcon, NTag, NButton, NInput} from "naive-ui";
import {computed, onMounted, reactive, ref, h} from "vue";
import {useVueToPrint} from "vue-to-print";
import {useMeStore} from "../../../stores/me.js";


const meData = useMeStore();
const searchField = ref(false);
const searchBox = ref();
const checkedRowCredit = ref([]);
const tableRef = ref();
const {width} = useWindowSize();
const printReceiptRef = ref();
const {handlePrint} = useVueToPrint({
  content: printReceiptRef,
  documentTitle: "Receipt",
});
function findStringInParentheses(input) {
  // Use a regular expression to match content within parentheses
  const matches = input.match(/\(([^)]+)\)/);
  // Return the first matched group or null if no match
  return matches ? matches[1] : null;
}
const downloadCsv = () =>
    tableRef.value?.downloadCsv({fileName: "export-penerimaan-uang"});
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
const pagination = ref({pageSize: 10});
const onConfirmDate = () => {
  getDataPayment();
};


const confCancelModal = ref(false);
const bodyCancel = reactive({
  no_invoice: null,
  descr: null,
});

const handleCancelPayment = () => {
  confCancelModal.value = true;
  bodyCancel.no_invoice = bodyModal.value.no_transaksi;
}

const createColumns = () => {
  return [
    {
      title: "no transaksi",
      width: 150,
      key: "no_transaksi",
      sorter: "default",
    },
    {
      title: "tanggal",
      width: 120,
      key: "tgl_transaksi",
      sorter: "default",
    },
    {
      title: "atas nama",
      key: "nama",
      fixed: "left",
      width: 200,
    },
    {
      title: "metode",
      width: 100,
      key: "payment_method",
      sorter: "default",
    },
    {
      title: "nominal",
      width: 100,
      align: 'right',
      key: "total_bayar",
      render(row) {
        return h("div", row.total_bayar.toLocaleString("US"));
      },
      sorter: "default",
    },
    {
      title: "status",
      width: 100,
      key: "STATUS",
      defaultFilterOptionValues: ["PAID", "UNPAID"],
      render(row) {
        return h(
            NTag,
            {
              type: row.STATUS == "PENDING" ? "warning" : row.STATUS == "PAID" ? "success" : "error",
              onClick: () => {
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
      width: 100,
      align: "right",
      key: "action",
      render(row) {
        return h(
            NButton,
            {
              secondary: true,
              round: true,
              size: "small",
              onClick: () => {
                handleAction(row);
              },
            },
            {
              default: () => "detail",
            }
        );
      },
    },
  ];
};
const showModal = ref(false);
const bodyModal = ref([]);
const descPay = ref([]);
const handleAction = (e) => {
  descPay.value = [];
  showModal.value = true;
  bodyModal.value = e;
  e.pembayaran.forEach((v) => {
    descPay.value.push([
      v.title,
      parseInt(v.bayar_angsuran).toLocaleString("US"),
      "denda " + parseInt(v.bayar_denda).toLocaleString("US"),
    ]);
  });
};
const columns = createColumns();
const dataAngsuran = ref(false);
const loadingAngsuran = ref(false);
const loadStructure = ref(false);
const handleFasilitas = (e) => {
  pageData.struktur = [];
  getSkalaCredit(e);
};
const dataPayment = ref([]);
const loadDataPayment = ref(false);
const message = useMessage();

const postCancelPayment = async () => {
  loadDataPayment.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "POST",
    data: bodyCancel,
    api: "payment_cancel",
    token: userToken,
  });
  if (!response.ok) {
    message.error("error api");
  } else {
    message.success("pengajuan batal berhasil");
  }
};
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
    router.push("/");
  } else {
    loadingBar.finish();
    loadDataPayment.value = false;
    dataPayment.value = response.data;
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
    router.push("/");
  } else {
    dataStrukturKredit.value = response.data;
    dataAngsuran.value = true;
    loadStructure.value = false;
  }
};
const updateValueOnClose = ref(true);
const handleAddPay = () => {
  router.push({name: "tambah penerimaan"});
};
const showData = computed(() => {
  return useSearch(dataPayment.value, searchBox.value);
});
onMounted(() => getDataPayment());
</script>
