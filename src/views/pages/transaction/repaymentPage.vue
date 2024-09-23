<template>
    <n-card>
        <template #header>Pelunasan Angsuran</template>
        <span class="hidden">{{ pelunasan }}</span>
        <!-- <n-collapse>
            <n-collapse-item title="struktur" name="1" class="display-none">
                <pre> {{ pelunasan }}</pre>
            </n-collapse-item>
            <n-collapse-item title="dataPage" name="2">
                <pre> {{ dataPelunasan }}</pre>
            </n-collapse-item>
        </n-collapse> -->

        <!-- <n-button @click="dialogProses = true">dasdasd</n-button> -->
        <template #header-extra>
            <n-space>
                <n-button v-show="!searchField" strong secondary type="warning" @click="handleBtnAngsuran">
                    <template #icon>
                        <n-icon>
                            <angsuran-icon />
                        </n-icon>
                    </template>
                    pindah ke penerimaan
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
                <n-input v-model:value="dynamicSearch.nama" type="text" placeholder="Nama" @blur="handleSearch"
                    clearable />
            </n-form-item>
            <n-form-item label="No Polisi" class="w-full">
                <n-input v-model:value="dynamicSearch.no_polisi" type="text" placeholder="No Polisi"
                    @blur="handleSearch" clearable />
            </n-form-item>
            <n-form-item label="No Kontrak" class="w-full">
                <n-input v-model:value="dynamicSearch.no_kontrak" type="text" placeholder="No Kontrak"
                    @blur="handleSearch" clearable />
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
                :pagination="pagination" :max-height="300" :on-update:checked-row-keys="handleFasilitas"
                :loading="loadSearch" class="pb-2" />
            <n-table size="small" v-show="displayDetail" class="mb-2">
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
                        <td>{{ pelunasan.DENDA.toLocaleString() }}</td>
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
            <!-- <n-data-table striped size="small" :row-key="(row) => row" :columns="columnStruktur" :data="dataPelunasan"
                :max-height="300" :checked-row-keys="checkedRowCredit" :loading="loadingAngsuran" v-show="dataPelunasan"
                :on-update:checked-row-keys="handleAngsuran" class="py-2" /> -->
            <div class="flex gap-2  bg-pr/10  rounded-xl items-center pt-4 px-4">
                <n-form-item path="nestedValue.path2" label="Jenis Pembayaran" class="w-full">
                    <n-select filterable :options="optTipePay" placeholder="Jenis Pembayaran"
                        v-model:value="pageData.payment_method" />
                </n-form-item>
                <n-form-item path="nestedValue.path2" label="Total Bayar" class="w-full">
                    <n-input-number placeholder="Jumlah Pembayaran" v-model:value="pelunasan.TOTAL_BAYAR"
                        :show-button="false" :parse="parse" :format="format" readonly class="w-full">
                    </n-input-number>
                </n-form-item>
                <n-form-item path="nestedValue.path2" label="Uang Pelanggan" class="w-full">
                    <n-input-number placeholder="Jumlah Pembayaran" v-model:value="pelunasan.UANG_PELANGGAN"
                        :show-button="false" :parse="parse" :format="format" clearable @blur="pushJumlahUang"
                        class="w-full">
                    </n-input-number>
                </n-form-item>
                <n-form-item label="Pembulatan" class="w-full">
                    <n-input-number :show-button="false" :parse="parse" :format="format"
                        v-model:value="pelunasan.PEMBULATAN" clearable class="w-full" />
                </n-form-item>
                <n-form-item label="Kembalian" class="w-full">
                    <n-input-number :show-button="false" :parse="parse" :format="format"
                        v-model:value="pelunasan.KEMBALIAN" readonly class="w-full" />
                </n-form-item>
                <n-form-item label="" class="w-full">
                    <n-button type="primary" @click="handleProses" :loading="loadProses" class="w-full"> Proses
                    </n-button>
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
                        <td> {{ paymentData.detail_pelanggan.cust_code }} - {{ paymentData.detail_pelanggan.nama }}
                        </td>
                    </tr>
                    <tr>
                        <td>Jumlah Uang </td>
                        <td>:</td>
                        <td> {{ paymentData.jml_pembayaran }} </td>
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
                            pembayaran.payment_value }}), </span></td>
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
</template>

<script setup>
import { data } from "autoprefixer";
import { useApi } from "../../../helpers/axios";
import { useSearch } from "../../../helpers/searchObject";
import router from "../../../router";
import {
    FactCheckOutlined as angsuranIcon,
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

const checkedRowFasilitas = ref([]);
const checkedRowCredit = ref([]);

const dialogProses = ref(false);
const paymentData = ref([]);



const pageData = reactive({
    no_facility: null,
    total_bayar: 0,
    jumlah_uang: 0,
    payment_method: 'cash',
    pembulatan: 0,
    diskon: 0,
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
            sorter: 'default',
        },
        {
            title: "Nama",
            key: "nama",
            sorter: 'default',
        },
        {
            title: "No Polisi",
            key: "no_polisi",
            sorter: 'default',
        },
        {
            title: "Alamat",
            key: "alamat",
            sorter: 'default',
        },
        {
            title: "Angsuran",
            sorter: 'default',
            key: "angsuran",
            render(row) {
                return h("div", row.angsuran);
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
            title: "Sisa Pokok",
            key: "SISA_POKOK",
            render(row) {
                return h("div", row.SISA_POKOK);
            },
        },
        {
            title: "Bunga Berjalan",
            key: "BUNGA_BERJALAN",
            render(row) {
                return h("div", row.BUNGA_BERJALAN);
            },
        },
        {
            title: "Tunggakan Bunga",
            key: "TUNGGAKAN_BUNGA",
            render(row) {
                return h("div", row.TUNGGAKAN_BUNGA);
            },
        },
        {
            title: "Denda",
            key: "DENDA",
            render(row) {
                return h("div", row.DENDA);
            },
        },
        {
            title: "Pinalti",
            key: "denda",
            render(row) {
                return h("div", row.PINALTI);
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
const jaminanCustomer = ref([]);
const selectedCustomer = ref([]);
const columns = createColumns();
const columnStruktur = createColStruktur();
const dataAngsuran = ref(false);
const loadingAngsuran = ref(false);

const displayDetail = ref(false);
const handleFasilitas = (e) => {
    displayDetail.value = true;
    getDataPelunasan(e);
};

const handleAngsuran = (e) => {
    // console.log(e);
    checkedRowCredit.value = e;
};



const loadCustomer = ref(false);

const loadProses = ref(false);
const handleProses = async () => {
    let userToken = localStorage.getItem("token");
    loadProses.value = true;
    const response = await useApi({
        method: "POST",
        api: "payment",
        data: dynamicForm,
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
    let userToken = localStorage.getItem("token"); a
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
}
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
        localStorage.removeItem("token");
        router.replace("/");
    } else {
        dataStrukturKredit.value = response.data;
        dataAngsuran.value = true;
        loadingAngsuran.value = false;
    }
};
const totalBayar = ref();
const dataPelunasan = ref([]);
const pelunasan = reactive({
    SISA_POKOK: 0,
    BUNGA_BERJALAN: 0,
    TUNGGAKAN_BUNGA: 0,
    DENDA: 0,
    PINALTI: 0,
    TOTAL_BAYAR: computed(() => pelunasan.SISA_POKOK + pelunasan.BUNGA_BERJALAN + pelunasan.TUNGGAKAN_BUNGA + pelunasan.DENDA + pelunasan.PINALTI),
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
                    let bayarDenda = bayarPinalti - pelunasan.PINALTI;
                    if (bayarDenda > 0) {
                        pelunasan.KEMBALIAN = bayarDenda;
                        pelunasan.BAYAR_DENDA = bayarDenda;
                    } else {
                        pelunasan.KEMBALIAN = bayarDenda;
                        pelunasan.BAYAR_DENDA = bayarDenda;
                    }
                } else {
                    pelunasan.BAYAR_PINALTI = bayarPinalti + pelunasan.PINALTI;
                    pelunasan.DISKON_PINALTI = pelunasan.PINALTI - pelunasan.BAYAR_PINALTI;
                }

            } else {
                pelunasan.BAYAR_BUNGA = pelunasan.BUNGA_BERJALAN + bayarBunga;
                pelunasan.DISKON_POKOK = 0;
                pelunasan.KEMBALIAN = 0;
                pelunasan.DISKON_BUNGA = Math.abs(bayarBunga);
            }
        } else {
            pelunasan.BAYAR_POKOK = bayarPokok + pelunasan.SISA_POKOK;
            pelunasan.DISKON_POKOK = pelunasan.SISA_POKOK - pelunasan.UANG_PELANGGAN;
            pelunasan.DISKON_BUNGA = pelunasan.BUNGA_BERJALAN;
            pelunasan.DISKON_DENDA = pelunasan.DENDA;
            pelunasan.DISKON_PINALTI = pelunasan.PINALTI;
            pelunasan.KEMBALIAN = 0;
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
    JUMLAH_TAGIHAN: computed(() => pelunasan.SISA_POKOK + pelunasan.BUNGA_BERJALAN + pelunasan.PINALTI + pelunasan.DENDA),
    JUMLAH_BAYAR: computed(() => pelunasan.BAYAR_POKOK + pelunasan.BAYAR_BUNGA + pelunasan.BAYAR_PINALTI),
    JUMLAH_DISKON: computed(() => pelunasan.DISKON_POKOK + pelunasan.DISKON_BUNGA + pelunasan.DISKON_PINALTI + pelunasan.DISKON_DENDA),
    PEMBULATAN: 0,
    KEMBALIAN: 0,
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
        router.replace("/");
    } else {
        dataPelunasan.value = response.data;
        Object.assign(pelunasan, response.data[0]);
        loadingAngsuran.value = false;
        // totalBayar.value = dataPelunasan.value[0].SISA_POKOK + dataPelunasan.value[0].BUNGA_BERJALAN + dataPelunasan.value[0].TUNGAKAN_BUNGA + dataPelunasan.value[0].DENDA + dataPelunasan.value[0].PINALTI;
    }
}
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
const totalPay = computed(() => {
    const combinedTotal = () => dataPelunasan.value.SISA_POKOK;

    return combinedTotal();
});
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
const handleBtnAngsuran = () => {
    router.replace({ name: "pembayaran" });
};

const handleFocusField = () => {
    getDataCustomer();
};
// onMounted(() => getDataCustomer());
</script>