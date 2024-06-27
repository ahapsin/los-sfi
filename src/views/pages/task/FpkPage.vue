<template>
    <div class="pt-4">
        <n-space vertical>
            <!-- <pre>{{ dataTable }}</pre> -->
            <n-card :title="`Tabel ${$route.name}`">
                <template #header-extra>
                    <n-space>
                        <n-popover trigger="click" placement="bottom-end">
                            <template #trigger>
                                <n-button>
                                    <n-icon>
                                        <search-icon />
                                    </n-icon>
                                </n-button>
                            </template>
                            <n-input autofocus="true" clearable placeholder="cari disini.." />
                        </n-popover>
                        <n-button>
                            <template #icon>
                                <n-icon>
                                    <download-icon />
                                </n-icon>
                            </template>
                            download
                        </n-button>
                        <!-- <n-button type="primary" @click="handleAdd">
                            <template #icon>
                                <n-icon>
                                    <add-icon />
                                </n-icon>
                            </template>
                            tambah
                        </n-button> -->
                    </n-space>
                </template>
                <n-space vertical :size="12" class="pt-4">
                    <n-data-table size="small" :columns="columns" :data="dataTable" :pagination="pagination" />
                </n-space>
            </n-card>
        </n-space>
        <!-- <n-space>
            online at: {{ fingerprint }}
        </n-space> -->
    </div>
    <n-modal v-model:show="showModal">
        <n-card style="width: 600px" title="Modal" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <template #header-extra>
                Oops!
            </template>
            <n-flex>
                <table border="1" ref="pk" style="font-size: 10px; width: 600px;">
                    <tr>
                        <td align="center">
                            PERJANJIAN PEMBERIAN PINJAMAN
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            NO.PERJANJIAN : 11102240000208
                        </td>
                    </tr>
                    <tr>
                        <td heigth="20">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Yang bertanda tangan dibawah ini :
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                            <table>
                                <tr>
                                    <td rowspan="3" valign="top">I.</td>
                                    <td>Nama</td>
                                    <td>:</td>
                                    <td>HOSEA</td>
                                </tr>
                                <tr>

                                    <td>Jabatan</td>
                                    <td>:</td>
                                    <td>POS MANAGER</td>
                                </tr>
                                <tr>

                                    <td> Alamat Kantor</td>
                                    <td>:</td>
                                    <td>JL.BY PASS KANDANGHAUR DEPAN KANTOR PLN BLOK ANJUN DS.KARANGANYAR KEC.KANDANHAUR
                                        KAB.INDRAMAYU KARANGANYAR KANDANGHAUR INDRAMAYU
                                        Dalam hal ini bertindak untuk dan atas nama CABANG KANDANGHAUR
                                        selanjutnya disebut Pihak Pertama </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table>
                                <tr>
                                    <td rowspan="4" valign="top">II.</td>
                                    <td>Nama</td>
                                    <td>:</td>
                                    <td>TASMI</td>
                                </tr>
                                <tr>

                                    <td> No. KTP/SIM</td>
                                    <td>:</td>
                                    <td>321221480280004</td>
                                </tr>
                                <tr>

                                    <td> Alamat Kantor</td>
                                    <td>:</td>
                                    <td>BLOK CILET RT 003 RW 007
                                        Kel KARANGANYAR KEC. KANDANGHAUR KAB. INDRAMAYU JAWA BARAT</td>
                                </tr>
                                <tr>
                                    <td colspan="3"> Dalam hal ini bertindak untuk dirinya sendiri, selanjutnya disebut
                                        Pihak Kedua
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td> <br />
                            Dengan ini menerangkan bahwa para pihak sepakat menandatangani Perjanjian Pemberian
                            Pinjaman,
                            dengan
                            isi, syarat dan ketentuan sebagai berikut :
                        </td>
                    </tr>
                    <tr>
                        <td align="center"> <br /> Pasal 1</td>
                    </tr>
                    <tr>
                        <td> Pihak pertama memberikan pinjaman pada pihak kedua meliputi pokok hutang dan margin atas
                            pinjaman
                            menjadi sebesar Rp. 5.076.000 (LIMA JUTA TUJUH PULUH ENAM RIBU RUPIAH)</td>
                    </tr>
                    <tr>
                        <td align="center"> <br />Pasal 2</td>
                    </tr>
                    <tr>
                        <td> Pengembalian pinjaman tersebut akan dibayarkan untuk jangka 18 (DELAPAN BELAS) BULAN
                            lamanya,
                            dimulai tanggal 21/07/2024 berakhir pada tanggal 21/12/2025 dengan jumlah angsuran sebesar
                            Rp. 282.000 (DUA RATUS DELAPAN PULUH DUA RIBU RUPIAH) setiap bulannya.</td>
                    </tr>
                    <tr>
                        <td align="center"> <br /> Pasal 3</td>
                    </tr>
                    <tr>
                        <td> Guna menjamin pembayaran pinjaman tersebut diatas maka Pihak Kedua dengan ini menyerahkan
                            jaminan
                            barang miliknya sendiri berupa SEPEDA MOTOR, dengan dibuktikan diserahkannya
                            Bukti Kepemilikan dengan spesifikasi sebagai berikut</td>
                    </tr>
                    <tr>
                        <td> <br />
                            <table>
                                <tr>
                                    <td>BPKB No</td>
                                    <td>:</td>
                                    <td>J-05259893</td>
                                </tr>
                                <tr>
                                    <td>BPKB atas nama</td>
                                    <td>:</td>
                                    <td>ROKMAT BIN SUMA</td>
                                </tr>
                                <tr>
                                    <td>Merk/Type/tahun</td>
                                    <td>:</td>
                                    <td>HONDA/BEAT SPORTY CBS/2012</td>
                                </tr>
                                <tr>
                                    <td> Warna/No.Polisi</td>
                                    <td>:</td>
                                    <td>BIRU PUTIH/E4220TT</td>
                                </tr>
                                <tr>
                                    <td>No. Rangka/Mesin</td>
                                    <td>:</td>
                                    <td>MHIJFD219CK226444/JFD2E1229558</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                            Apabila pihak kedua tidak bisa memenuhi kewajiban pembayaran angsuran selama 3 bulan, maka
                            pihak
                            kedua
                            bersedia menyerahkan jaminan kendaraan sesuai dengan pasal 3 di atas kepada pihak pertama.
                            Jika Perjanjian Pemberi Pinjaman telah selesai, BPKB wajib diambil maksimum 90 hari kalender
                            terhitung
                            dari pelunasan angsuran dan denda terakhir. KSP Djaya tidak bertanggung jawab atas kerusakan
                            atau kegilangan BPKB.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                            Demikian Perjanjian Pemberian Pinjaman ini dibuat dan ditandatangani, tanpa adanya unsur
                            paksaan.<br />
                            INDRAMAYU, 21/06/2024
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                            <table width="100%">
                                <tr>
                                    <td>Pihak Pertama<br />CABANG KANDANGHAUR<br /><br /><br /><br /> ( KSP Djaya )
                                    </td>
                                    <td>Pihak Kedua<br /><br /><br /><br /><br /> ( TASMI )
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </n-flex>
            <template #footer>
                Footer
            </template>
        </n-card>
    </n-modal>
</template>
<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { useApi } from "../../../helpers/axios";
import router from '../../../router';
import { useDialog, useMessage, NIcon, NTag, NButton } from "naive-ui";
import { jsPDF } from "jspdf";
import { useNetwork } from '@vueuse/core';
const { onlineAt } = useNetwork();
import { sha256, sha224 } from 'js-sha256';
import {
    AddCircleOutlineRound as AddIcon,
    SearchOutlined as SearchIcon,
    FileDownloadOutlined as DownloadIcon,

} from "@vicons/material"
import {
    EditOutlined as EditIcon,
    DeleteOutlined as DeleteIcon,
    MoreVertRound as MoreIcon,
    ListAltOutlined as DetailIcon
} from "@vicons/material";


const message = useMessage();
const dialog = useDialog();
const pk = ref(null);
const showModal = ref(false);
const dataTable = ref();
const loadingRef = reactive({
    type: "loading",
    messagePost: null,
});
const userToken = localStorage.getItem("token");

const columns = [
    {
        title: "Tanggal",
        key: "visit_date"
    },
    {
        title: "Order",
        key: "order_number"
    },
    {
        title: "Nama",
        key: "nama_debitur"
    },
    {
        title: "Plafond",
        key: "plafond",
        render(row) {
            return h('div', format(row.plafond));
        }
    },
    {
        title: "Status",
        key: "status",
        render(row) {
            return h(
                NTag,
                {
                    bordered: false,
                    type: statusTag(row.status),
                    size: "small",
                },
                { default: () => statusLabel(row.status) }
            );
        }
    },
    {
        key: "status",
        render(row) {
            let status = row.status.at(0);
            if (status === "6") {
                return h(
                    NButton,
                    {
                        size: "small",
                        onClick: (e) => {
                            handlePrePrint(row);
                            //showModal.value = true;
                            // handlePrint(row)
                        },
                    },
                    {
                        default: "CETAK FPK"
                    }
                );
            }
        }
    }, {
        title: "Action",
        align: "right",
        key: "more",
        render(row) {
            return h(
                NButton,
                {
                    type: typeAction(row.status),
                    size: "tiny",
                    onClick: (e) => {
                        handleAction(row.status, row)
                    },
                },
                {
                    default: () => actionLabel(row.status)
                }
            );
        }
    }
];

const statusTag = (e) => {
    let status = e.at(0);
    if (status === "1") {
        return "warning";
    } else if (status === "2") {
        return "info";
    }
    return "warning";

}
const statusLabel = (e) => {
    let status = e.at(0);
    // if (status === "1") {
    //     return "menunggu PFK";
    // } else if (status === "2") {
    //     return "pembuatan PFK";
    // }
    return e.substring(2);
}
const typeAction = (e) => {
    let status = e.at(0);
    if (status === "1") {
        return "warning";
    } else if (status === "2") {
        return "info";
    }
    return "info";
}
const actionLabel = (e) => {
    let status = e.at(0);
    if (status === "1") {
        return "Buat PFK";
    } else if (status === "2") {
        return "Update PFK";
    }
    return "lihat FPK";

}
const format = (e) => {
    const toNum = parseInt(e);
    return toNum.toLocaleString("en-US");
};
const handleSelect = (e) => console.log(e);
const handleAction = (e, data) => {
    let status = e.at(0);
    const dynamicBody = {
        cr_prospect_id: data.id
    }
    if (status === "1") {
        message.create('membuat FPK, silakan tunggu !', { type: loadingRef.type });
        useApi({
            method: 'POST',
            data: dynamicBody,
            api: `cr_application_generate`,
            token: userToken,
        }).then((res) => {
            if (res.ok) {
                message.success('FPK berhsil dibuat');
                router.replace({ name: 'Form Pengajuan Kredit', params: { idapplication: data.id } });
            } else {
                message.error('FPK gagal dibuat!')
            }
        });
    } else if (status === "2") {
        router.replace({ name: 'Form Pengajuan Kredit', params: { idapplication: data.id } });
    } else {
        router.replace({ name: 'Detail Pengajuan Kredit', params: { idapplication: data.id } });
    }
};
const handlePrint = (evt) => {
    generatePdf();
}

const handlePrePrint = (row) => {
    router.replace({ name: 'pre print pk', params: { idapplication: row.id } });
}

function generatePdf() {
    console.log('generate pdf');
    var doc = new jsPDF('p', 'pt', 'legal');
    const margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };

    doc.html(pk.value, {
        callback: function (doc) {
            doc.output('dataurlnewwindow');
            // doc.save();
        },
        x: 10,
        y: 10
    });

    // doc.save('test.pdf');
}
const handleAdd = () => {
    router.push('/task/new-survey');
}
const getData = async () => {

    const response = await useApi({
        method: 'GET',
        api: 'kunjungan_admin',
        token: userToken
    });
    if (!response.ok) {
        message.error("sesi berakhir");
        localStorage.removeItem("token");
        router.replace('/');
    } else {
        dataTable.value = response.data.response;
    }
}
const renderIcon = (icon) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon)
        });
    };
};
const options = [
    {
        label: "Edit",
        key: "edit",
        icon: renderIcon(EditIcon),
    },
    {
        label: "Hapus",
        key: "hapus",
        icon: renderIcon(DeleteIcon)
    },
    {
        label: "Detail",
        key: "detail",
        icon: renderIcon(DetailIcon)
    }
];
const pagination = {
    pageSize: 10
}
function generateBrowserFingerprint() {
    let fingerprint = [];

    // User agent string
    fingerprint.push(navigator.userAgent);

    // Language
    fingerprint.push(navigator.language || navigator.userLanguage);
    // Screen resolution
    fingerprint.push(screen.width + "x" + screen.height);
    // Timezone offset
    fingerprint.push(new Date().getTimezoneOffset());
    // Generate a hash of the fingerprint components
    let fingerprintString = fingerprint.join("###");
    let hash = sha256(fingerprintString); // You would need a SHA-256 function here
    return hash;
}
const fingerprint = generateBrowserFingerprint();
onMounted(() => getData());
</script>