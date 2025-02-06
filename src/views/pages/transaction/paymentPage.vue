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
                            <add-icon />
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
                                <search-icon />
                            </n-icon>
                        </n-button>
                    </template>
                    <n-space vertical>
                        <n-input clearable placeholder="cari disini.." v-model:value="searchBox" />
                        <n-date-picker :default-value="[Date.now(), Date.now()]"
                            :update-value-on-close="updateValueOnClose" type="daterange"
                            @update:value="onConfirmDate" />
                    </n-space>
                </n-popover>
                <n-button type="success" secondary circle @click="downloadCsv">
                    <template #icon>
                        <n-icon>
                            <download-file />
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
                :loading="loadDataPayment" class="p-4" :pagination="{pageSize:10}"/>
        </div>
    </n-card>
    <n-modal class="w-fit" title="Upload Berkas Pencairan" v-model:show="showModal" :on-after-leave="onAfterLeave">
        <n-card title="Detail Pembayaran" :segmented="{
            content: true,
            footer: 'soft',
        }">
            <template #header-extra>
                <div class="flex gap-2">
                    <n-space>
                        <n-tag strong
                            :type="bodyModal.STATUS == 'PENDING' ? 'warning' : bodyModal.STATUS == 'PAID' ? 'success' : 'error'">
                            {{ bodyModal.STATUS }}
                        </n-tag>
                        <n-button circle secondary @click="showModal = false">X</n-button>
                    </n-space>
                </div>
            </template>
            <template #footer>
                <n-space>
                    <n-button type="warning" @click="printNota(bodyModal.no_transaksi)"
                        v-show="bodyModal.STATUS == 'PAID'" :disabled="bodyModal.print_ke > 1500">
                        <n-space>
                            <n-icon>
                                <print-icon />
                            </n-icon>
                            <p>Sisa Cetak {{ printCount - bodyModal.print_ke }}</p>
                        </n-space>
                    </n-button>

                    <n-button type="info" @click="uploadState = !uploadState" v-show="bodyModal.STATUS == 'PAID'"
                        v-if="!uploadState">
                        <n-space>
                            <n-icon>
                                <upload-icon />
                            </n-icon>
                            <p>Upload Nota</p>
                        </n-space>
                    </n-button>
                    <n-button v-if="bodyModal.STATUS != 'CANCEL'" type="error" @click="handleCancelPayment">
                        batalkan pembayaran
                    </n-button>
                    <n-button secondary type="info" @click="uploadState = !uploadState"
                        v-show="bodyModal.STATUS == 'PAID'" v-else>
                        <n-icon>
                            <file-icon />
                        </n-icon>
                        Tampilkan Nota
                    </n-button>
                </n-space>
            </template>
            <div ref="printReceiptRef" class="flex flex-col" :class="width > 850 ? 'p-4' : 'p-0'" v-if="!uploadState">
                <div class="p-2">
                    <div class="flex items-center gap-2 pb-2 justify-between border-b border-dashed border-black">
                        <div class="flex gap-2 items-center">
                            <img class="h-10 md:h-10" src="../../../assets/logo.png" alt="logo_company" />
                            <span class="text-xl font-bold">KSPDJAYA</span>
                        </div>
                        <div class="text-lg font-bold hidden md:flex">KWITANSI PEMBAYARAN</div>
                    </div>
                    <div class="flex justify-between border-b border-dashed border-black"
                        :class="width > 850 ? 'flex-row' : 'flex-col'">
                        <div class="flex flex-col py-4">
                            <small class="text-reg">No Transaksi : </small>
                            <n-text strong class="text-lg font-bold"> {{ bodyModal.no_transaksi }}</n-text>
                            <small class="text-reg">No Kontrak : </small>
                            <n-text strong class="text-lg font-bold"> {{ bodyModal.cust_code }}</n-text>
                        </div>
                        <div class="flex flex-col py-4">
                            <small class="text-reg">Terima dari (No Kontrak) : </small>
                            <n-text strong class="text-lg font-bold"> {{ bodyModal.nama }}</n-text>
                            <small class="text-lg">({{ bodyModal.no_fasilitas }})</small>
                        </div>
                    </div>
                    <!--          <table cellpadding="4" width="100%">-->
                    <!--            <tr>-->
                    <!--              <td><small>Tanggal & Waktu</small></td>-->
                    <!--              <td><small>Angsuran</small></td>-->
                    <!--              <td><small>Jumlah Uang</small></td>-->
                    <!--              <td><small>Kembalian</small></td>-->
                    <!--              <td><small>Metode Pembayaran</small></td>-->
                    <!--            </tr>-->
                    <!--            <tr>-->
                    <!--              <td><n-text strong class="text-lg"> {{ bodyModal.tgl_transaksi }}</n-text></td>-->
                    <!--              <td><n-text strong class="text-lg"> {{-->
                    <!--                  bodyModal.bayar_angsuran.toLocaleString('US') ? bodyModal.bayar_angsuran.toLocaleString('US') : 'n/a'-->
                    <!--                }}-->
                    <!--              </n-text></td>-->
                    <!--              <td><n-text strong class="text-lg"> {{ bodyModal.jumlah_uang.toLocaleString("US") }}</n-text></td>-->
                    <!--              <td><n-text strong class="text-lg"> {{ bodyModal.kembalian.toLocaleString("US") }}</n-text></td>-->
                    <!--              <td><n-text strong class="text-lg"> {{ bodyModal.payment_method }}</n-text></td>-->
                    <!--            </tr>-->
                    <!--            <tr><small>Angsuran</small></tr>-->
                    <!--          </table>-->
                    <div class="grid border-b border-dashed border-black pb-2"
                        :class="width > 850 ? 'grid-cols-5 gap-4' : 'grid-cols-1 '">
                        <div class="flex flex-col">
                            <small class="text-reg">Tanggal & Waktu</small>
                            <n-text strong class="text-md"> {{ bodyModal.tgl_transaksi }}</n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Angsuran</small>
                            <n-text strong class="text-md"> {{
                                bodyModal.bayar_angsuran.toLocaleString('US') ?
                                bodyModal.bayar_angsuran.toLocaleString('US') : 'n/a'
                                }}
                            </n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Pembulatan</small>
                            <n-text strong class="text-md"> {{ bodyModal.pembulatan }}</n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Jumlah Uang</small>
                            <n-text strong class="text-md"> {{ bodyModal.jumlah_uang.toLocaleString("US") }}</n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Kembalian</small>
                            <td><n-text strong class="text-md"> {{ bodyModal.kembalian.toLocaleString("US") }}</n-text>
                            </td>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Metode Pembayaran</small>
                            <n-text strong class="text-md"> {{ bodyModal.payment_method }}</n-text>
                        </div>
                    </div>
                </div>
                <div class="px-3">
                    <table width="100%" class="border border-black">
                        <tr>
                            <th class="border border-black">Ke</th>
                            <th class="border border-black">Angsuran</th>
                            <th class="border border-black">Denda</th>
                            <th class="border border-black">Jumlah</th>
                        </tr>
                        <tr v-for="angs in bodyModal.struktur" :key="angs.id">
                            <td class="border text-center border-black">{{ angs.angsuran_ke }}</td>
                            <td class="border pe-2 border-black">{{ parseInt(angs.bayar_angsuran).toLocaleString('US')
                                }}
                            </td>
                            <td class="border pe-2 border-black">{{ parseInt(angs.bayar_denda).toLocaleString('US') }}
                            </td>
                            <td align="right" class="border pe-2 border-black">
                                {{ parseInt(parseInt(angs.bayar_angsuran) +
                                parseInt(angs.bayar_denda)).toLocaleString(('US')) }}
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td colspan="3" align="right" class="pe-2">
                                <strong>{{ bodyModal.total_bayar.toLocaleString("US") }}</strong>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="flex flex-col border-b border-dashed border-black pb-4 ms-3">
                    <div class="flex gap-4">
                        <div class="border-b border-black pt-20 px-4">
                            <n-text strong class="text-md font-bold"> {{ bodyModal.created_by }}</n-text>
                        </div>
                        <div class="border-b border-black pt-20 px-4">
                            <n-text strong class="text-md font-bold"> {{ bodyModal.nama }}</n-text>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <file-upload title="Upload Nota" type="nota" :idapp="bodyModal.payment_id" endpoint="payment_attachment"
                    :def_value="bodyModal.attachment" />
            </div>
            <div v-show="bodyModal.payment_method == 'transfer'">
                <n-divider>bukti transfer</n-divider>
                <n-image :src="bodyModal.attachment" class="max-w-36" />
            </div>
        </n-card>
    </n-modal>
    <n-modal v-model:show="confCancelModal" preset="dialog" draggable title="Konfirmasi"
        positive-text="Ya, Ajukan Sekarang !" negative-text="hmm, nanti dulu deh" @positive-click="postCancelPayment">
        <div>Batalin sekarang, yakin?
        </div>
        <n-input type="textarea" placeholder="isi dulu alasannya disini" v-model:value="bodyCancel.descr" />
    </n-modal>
</template>
<script setup>
import { useApi } from "../../../helpers/axios";
import { useSearch } from "../../../helpers/searchObject";
import router from "../../../router";
import {
    SearchRound as searchIcon,
    PlusFilled as addIcon,
    AttachFileFilled as fileIcon,
    CloudUploadOutlined as uploadIcon,
    LocalPrintshopOutlined as PrintIcon,
    FileDownloadOutlined as DownloadFile,
} from "@vicons/material";
import { useWindowSize } from "@vueuse/core";
import { useLoadingBar } from "naive-ui";

const loadingBar = useLoadingBar();
import { useMessage, NIcon, NTag, NButton, NInput } from "naive-ui";
import { computed, onMounted, reactive, ref, h } from "vue";
import { useVueToPrint } from "vue-to-print";
import { useMeStore } from "../../../stores/me.js";

const uploadState = ref(false);
const meData = useMeStore();
const searchField = ref(false);
const searchBox = ref();
const checkedRowCredit = ref([]);
const tableRef = ref();
const { width } = useWindowSize();
const printReceiptRef = ref();
const { handlePrint } = useVueToPrint({
    content: printReceiptRef,
    documentTitle: "Receipt",
});
const printNota = async (e) => {
    let userToken = localStorage.getItem("token");
    const bodyPostPrint = {
        id: e,
    }
    const response = await useApi({
        method: "POST",
        data: bodyPostPrint,
        api: "log_print",
        token: userToken,
    });
    if (!response.ok) {
        message.error("error api");
    } else {
        handlePrint();
        showModal.value = false;
        getDataPayment();
    }
}
const onAfterLeave = () => {
    getDataPayment();
}


const downloadCsv = () =>
    tableRef.value?.downloadCsv({ fileName: "export-penerimaan-uang" });
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
        showModal.value = true;
        message.error("error api");
        getDataPayment();
    } else {
        showModal.value = false;
        message.success("pengajuan batal berhasil");
        getDataPayment();
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
        message.error("ERROR API");
    } else {
        loadingBar.finish();
        loadDataPayment.value = false;
        dataPayment.value = response.data;
    }
};
const printCount = ref(2);
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
        message.error('ERROR API');
    } else {
        dataStrukturKredit.value = response.data;
        dataAngsuran.value = true;
        loadStructure.value = false;
    }
};
const updateValueOnClose = ref(true);
const handleAddPay = () => {
    router.push({ name: "tambah penerimaan" });
};
const showData = computed(() => {
    return useSearch(dataPayment.value, searchBox.value);
});
onMounted(() => getDataPayment());
</script>
