
<template>
  <n-card
    :segmented="{
      content: true,
      footer: 'soft',
    }"
  >

    <template #header>Pelunasan Angsuran</template>
    <!-- <pre>{{ pelunasan }}</pre> -->
    <span class="hidden">{{ pelunasan }}</span>
    <template #header-extra>
      <n-space v-if="!props.embed">
        <n-button
          round
          v-show="!searchField"
          strong
          secondary
          type="warning"
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
            v-show="!searchField"
            strong
            secondary
            type="warning"
            round
            @click="handleBtnAngsuran"
          >
            <template #icon>
              <n-icon>
                <angsuran-icon />
              </n-icon>
            </template>
            <span class="hidden md:flex">pindah ke penerimaan</span>
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
      <!-- <n-space v-show="props.embed ? true : displayFasilitas">
        <n-tag type="warning"
          >No Kontrak <b>{{ props.atr }}</b></n-tag
        >
      </n-space> -->
    </template>
    <div class="flex flex-col md:flex-row gap-2" v-show="!props.embed">
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
        striped
        :scroll-x="1200"
        size="small"
        :row-key="(row) => row.loan_number"
        :columns="props.embed ? columnsEmbed : columns"
        :data="dataSearch"
        :max-height="300"
        :on-update:checked-row-keys="handleFasilitas"
        :loading="loadSearch"
        class="pb-2"
        v-show="props.embed ? true : displayFasilitas"
      />
      <n-table
        size="small"
        v-show="props.embed ? true : displayFasilitas"
        class="mb-2"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Tagihan</th>
            <th>Bayar</th>
            <th>Diskon</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>pokok</td>
            <td>{{ pelunasan.SISA_POKOK.toLocaleString() }}</td>
            <td>{{ pelunasan.BAYAR_POKOK.toLocaleString() }}</td>
            <td>{{ pelunasan.DISKON_POKOK.toLocaleString() }}</td>
          </tr>
          <tr>
            <td>Bunga</td>
            <td>{{ pelunasan.BUNGA_BERJALAN.toLocaleString() }}</td>
            <td>{{ pelunasan.BAYAR_BUNGA.toLocaleString() }}</td>
            <td>{{ pelunasan.DISKON_BUNGA.toLocaleString() }}</td>
          </tr>
          <tr>
            <td>Pinalti</td>
            <td>{{ pelunasan.PINALTI.toLocaleString() }}</td>
            <td>{{ pelunasan.BAYAR_PINALTI.toLocaleString() }}</td>
            <td>{{ pelunasan.DISKON_PINALTI.toLocaleString() }}</td>
          </tr>
          <tr>
            <td>Denda</td>
            <td>{{ pelunasan.DENDA.toLocaleString() }}</td>
            <td>{{ pelunasan.BAYAR_DENDA.toLocaleString() }}</td>
            <td>{{ pelunasan.DISKON_DENDA.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>Jumlah</th>
            <th>{{ pelunasan.JUMLAH_TAGIHAN.toLocaleString() }}</th>
            <th>{{ pelunasan.JUMLAH_BAYAR.toLocaleString() }}</th>
            <th>{{ pelunasan.JUMLAH_DISKON.toLocaleString() }}</th>
          </tr>
        </tbody>
      </n-table>
      <div
        class="md:flex gap-2 bg-pr/10 rounded-xl items-center pt-4 px-4"
        v-show="props.embed ? true : displayFasilitas"
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
              v-model:value="pelunasan.METODE_PEMBAYARAN"
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
            v-model:value="pelunasan.JUMLAH_TAGIHAN"
            :show-button="false"
            :parse="parse"
            :format="format"
            readonly
            class="w-full"
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
            v-model:value="pelunasan.UANG_PELANGGAN"
            :show-button="false"
            :parse="parse"
            :format="format"
            clearable
            @blur="pushJumlahUang"
            class="w-full"
          >
          </n-input-number>
        </n-form-item>
        <n-form-item
          path="nestedValue.path2"
          label="Jumlah Diskon"
          class="w-full"
        >
          <n-input-number
            placeholder="Jumlah Pembayaran"
            v-model:value="pelunasan.JUMLAH_DISKON"
            :show-button="false"
            :parse="parse"
            :format="format"
            clearable
            @blur="pushJumlahUang"
            class="w-full"
            readonly
          >
          </n-input-number>
        </n-form-item>
        <n-form-item label="Pembulatan" class="w-full">
          <n-input-number
            :show-button="false"
            :parse="parse"
            :format="format"
            v-model:value="pelunasan.PEMBULATAN"
            clearable
            class="w-full"
            :disabled="
              pelunasan.UANG_PELANGGAN < pelunasan.JUMLAH_TAGIHAN ? true : false
            "
          />
        </n-form-item>
        <n-form-item label="Kembalian" class="w-full">
          <n-input-number
            :show-button="false"
            :parse="parse"
            :format="format"
            v-model:value="pelunasan.KEMBALIAN"
            readonly
            class="w-full"
            :disabled="
              pelunasan.UANG_PELANGGAN < pelunasan.JUMLAH_TAGIHAN ? true : false
            "
          />
        </n-form-item>
        <n-form-item class="w-full">
          <n-button
            type="primary"
            @click="handleProses"
            :loading="loadProses"
            class="w-full"
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
            <td>{{ paymentData.jml_pembayaran }}</td>
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
                >{{ pembayaran.title }} ({{ pembayaran.payment_value }}),
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
</template>
  <script setup>
import { useApi } from "../../../helpers/axios";
import router from "../../../router";
import {
  ChevronLeftRound as backIcon,
  OpenInFullRound as fullIcon,
} from "@vicons/material";
import {
  NIcon,
  NButton,
  NInput,
  NInputNumber,
  useMessage,
  useDialog,
} from "naive-ui";
import { computed, reactive, ref, h, onMounted } from "vue";
const searchField = ref(false);
const valOptSearch = ref(null);
const checkedRowCredit = ref([]);
const dialogProses = ref(false);
const dataBuktiTransfer = ref([]);
const paymentData = ref([]);
const pageData = reactive({
  no_facility: null,
  total_bayar: 0,
  jumlah_uang: 0,
  payment_method: "cash",
  pembulatan: 0,
  diskon: 0,
  kembalian: computed(() =>
    pageData.jumlah_uang
      ? pelunasan.jumlah_uang - pageData.total_bayar - pageData.pembulatan
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
const createColumns = () => {
  return [
    {
      type: "selection",
      multiple: false,
      fixed: "left",
    },
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
const createColumnsEmbed = () => {
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
const handleDone = () => {
  dialogProses.value = false;
  router.push({ name: "pembayaran" });
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
const columns = createColumns();
const columnsEmbed = createColumnsEmbed();
const loadingAngsuran = ref(false);
const displayDetail = ref(false);
const displayPayment = ref(false);
const handleFasilitas = (e) => {
  pelunasan.LOAN_NUMBER = e[0];
  pelunasan.UANG_PELANGGAN = 0;
  pelunasan.BAYAR_POKOK = 0;
  pelunasan.BAYAR_BUNGA = 0;
  pelunasan.BAYAR_DENDA = 0;
  pelunasan.BAYAR_PINALTI = 0;
  pelunasan.SISA_POKOK = 0;
  pelunasan.BUNGA_BERJALAN = 0;
  pelunasan.TUNGGAKAN_BUNGA = 0;
  pelunasan.DENDA = 0;
  pelunasan.PINALTI = 0;

  displayDetail.value = true;
  getDataPelunasan(e);
};
const message = useMessage();
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
      router.push({ name: "pembayaran" });
    },
  });
  const postDynamic = async () => {
    const response = await useApi({
      method: "POST",
      api: "payment_pelunasan",
      data: pelunasan,
      token: userToken,
    });
    if (!response.ok) {
      message.error("sesi berakhir");
      localStorage.removeItem("token");
      router.push("/");
    } else {
      loadProses.value = false;
      paymentData.value = response.data;
      dialogProses.value = true;
      router.push({ name: "pelunasan" });
    }
  };
};

const dataSearch = ref([]);
const loadSearch = ref(false);
const displayFasilitas = ref(false);
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
    router.push("/");
  } else {
    displayFasilitas.value = true;
    loadSearch.value = false;
    dataSearch.value = response.data;
  }
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
const dataPelunasan = ref([]);
const pelunasan = reactive({
  METODE_PEMBAYARAN: "cash",
  SISA_POKOK: 0,
  BUNGA_BERJALAN: 0,
  TUNGGAKAN_BUNGA: 0,
  DENDA: 0,
  PINALTI: 0,
  // TOTAL_BAYAR: computed(
  //   () =>
  //     pelunasan.SISA_POKOK +
  //     pelunasan.BUNGA_BERJALAN +
  //     pelunasan.TUNGGAKAN_BUNGA +
  //     pelunasan.DENDA +
  //     pelunasan.PINALTI
  // ),
  UANG_PELANGGAN: 0,
  DISKON: computed(() => {
    let bayarPokok = pelunasan.UANG_PELANGGAN - pelunasan.SISA_POKOK;
    if (bayarPokok >= 0) {
      pelunasan.BAYAR_POKOK = pelunasan.SISA_POKOK;
      pelunasan.DISKON_POKOK = 0;
      let bayarBunga = bayarPokok - pelunasan.BUNGA_BERJALAN;
      if (bayarBunga > 0) {
        pelunasan.BAYAR_BUNGA = pelunasan.BUNGA_BERJALAN;
        pelunasan.DISKON_BUNGA = 0;
        let bayarPinalti = bayarBunga - pelunasan.PINALTI;
        if (bayarPinalti > 0) {
          pelunasan.BAYAR_PINALTI = pelunasan.PINALTI;
          pelunasan.DISKON_PINALTI = 0;
          let bayarDenda = bayarPinalti - pelunasan.DENDA;
          if (bayarDenda > 0) {
            pelunasan.BAYAR_DENDA = pelunasan.DENDA;
            pelunasan.DISKON_DENDA = 0;
          } else {
            pelunasan.BAYAR_DENDA = bayarDenda + pelunasan.DENDA;
            pelunasan.DISKON_DENDA = pelunasan.DENDA - pelunasan.BAYAR_DENDA;
          }
        } else {
          pelunasan.BAYAR_PINALTI = bayarPinalti + pelunasan.PINALTI;
          pelunasan.DISKON_PINALTI =
            pelunasan.PINALTI - pelunasan.BAYAR_PINALTI;
        }
      } else {
        pelunasan.BAYAR_BUNGA = pelunasan.BUNGA_BERJALAN + bayarBunga;
        pelunasan.DISKON_POKOK = 0;
        pelunasan.DISKON_BUNGA = Math.abs(bayarBunga);
      }
    } else {
      pelunasan.BAYAR_POKOK = bayarPokok + pelunasan.SISA_POKOK;
      pelunasan.DISKON_POKOK = pelunasan.SISA_POKOK - pelunasan.UANG_PELANGGAN;
      pelunasan.DISKON_BUNGA = pelunasan.BUNGA_BERJALAN;
      pelunasan.DISKON_DENDA = pelunasan.DENDA;
      pelunasan.DISKON_PINALTI = pelunasan.PINALTI;
    }
  }),
  BAYAR_POKOK: 0,
  BAYAR_BUNGA: 0,
  BAYAR_PINALTI: 0,
  BAYAR_DENDA: 0,
  DISKON_POKOK: 0,
  DISKON_PINALTI: 0,
  DISKON_BUNGA: 0,
  DISKON_DENDA: 0,
  JUMLAH_TAGIHAN: computed(
    () =>
      pelunasan.SISA_POKOK +
      pelunasan.BUNGA_BERJALAN +
      pelunasan.PINALTI +
      pelunasan.DENDA
  ),
  TOTAL_BAYAR: computed(
    () =>
      pelunasan.SISA_POKOK +
      pelunasan.BUNGA_BERJALAN +
      pelunasan.PINALTI +
      pelunasan.DENDA
  ),
  JUMLAH_BAYAR: computed(
    () =>
      pelunasan.BAYAR_POKOK +
      pelunasan.BAYAR_BUNGA +
      pelunasan.BAYAR_PINALTI +
      pelunasan.BAYAR_DENDA
  ),
  JUMLAH_DISKON: computed(
    () =>
      pelunasan.DISKON_POKOK +
      pelunasan.DISKON_BUNGA +
      pelunasan.DISKON_PINALTI +
      pelunasan.DISKON_DENDA
  ),
  PEMBULATAN: 0,
  KEMBALIAN: computed(() =>
    pelunasan.UANG_PELANGGAN - pelunasan.JUMLAH_TAGIHAN - pelunasan.PEMBULATAN <
    0
      ? 0
      : pelunasan.UANG_PELANGGAN -
        pelunasan.JUMLAH_TAGIHAN -
        pelunasan.PEMBULATAN
  ),
});
const getDataPelunasan = async (e) => {
  const dynamicBody = {
    loan_number: e[0],
  };
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "POST",
    api: "pelunasan",
    data: dynamicBody,
    token: userToken,
  });
  if (!response.ok) {
    localStorage.removeItem("token");
    router.push("/");
  } else {
    dataPelunasan.value = response.data;
    Object.assign(pelunasan, response.data[0]);
    displayPayment.value = true;
    loadingAngsuran.value = false;
  }
};
const pushJumlahUang = async () => {
  pelunasan.PEMBULATAN = 0;
};
const handleExpand = () => {
  const fullPage = router.resolve({ name: "expand transaction" });
  window.open(fullPage.href, "_blank");
};
const props = defineProps({
  embed: Boolean,
  atr: String,
});
onMounted(() => {
  if (props.embed) {
    dynamicSearch.no_kontrak = props.atr;
    handleSearch();
    getDataPelunasan([props.atr]);
  }
});
const handleBack = () => {
  router.push({ name: "pelunasan" });
};
</script>
  