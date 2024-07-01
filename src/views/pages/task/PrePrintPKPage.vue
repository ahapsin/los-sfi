<template>
    <n-card>
        <div class="flex flex-col md:flex-row w-full gap-2">
            <n-form ref="formRef" inline :disabled="pageData.flag == 1 ? true : false">
                <n-form-item label="order number" path="nama" class="w-full">
                    <n-input placeholder="nama" v-model:value="dynamicForm.order_number" disabled />
                </n-form-item>
                <n-form-item label="Tanggal Awal" path="nama_panggilan" class="w-full">
                    <n-input-group>
                        <n-select :options="options" placeholder="pilih" v-model:value="dynamicForm.awal"></n-select>
                        <n-input :value="month" disabled />
                        <n-input :value="new Date().getFullYear()" disabled />
                    </n-input-group>
                </n-form-item>
                <n-form-item label="Angsuran" path="nama_panggilan" class="w-full">
                    <n-input-number :parse="parse" :format="format" v-model:value="dynamicForm.angsuran"
                        placeholder="Net Admin" :show-button="false" class="flex !w-full" />
                </n-form-item>
                <n-form-item class="w-full">
                    <n-button type="primary" @click="handleProses">Proses</n-button>
                </n-form-item>
            </n-form>
        </div>
        <div title="PK" v-show="prosesPK" class="flex gap-2 justify-end border-t p-4">
            <!-- <n-button secondary type="info" class="gap-2" @click="handleDownload">
                <n-icon>
                    <download-icon />
                </n-icon>
                Download PK
            </n-button> -->
            <n-button secondary :type="pageData.flag == 1 ? 'warning' : 'primary'" class="gap-2" @click="handlePrint">
                <n-icon>
                    <print-icon />
                </n-icon>
                {{ pageData.flag == 1 ? "Cetak Ulang PK" : "Cetak PK" }}
            </n-button>
        </div>
        <div class="flex bg-slate-200 overflow-auto p-2 pr-20 pl-20 justify-center" v-show="prosesPK">
            <div class="w-full" ref="pk">
                <div class="bg-white shadow-lg p-8">
                    <table border="1" v-show="prosesPK" class="mb-10">
                        <tr>
                            <td align="center">
                                PERJANJIAN PEMBERIAN PINJAMAN
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                NO.PERJANJIAN : {{ pkData.no_perjanjian }}
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
                                        <td rowspan="3" valign="top" width="20">I.</td>
                                        <td width="150">Nama</td>
                                        <td>:</td>
                                        <td>{{ pihak1.nama }}</td>
                                    </tr>
                                    <tr>
                                        <td>Jabatan</td>
                                        <td>:</td>
                                        <td>{{ pihak1.jabatan }}</td>
                                    </tr>
                                    <tr>
                                        <td valign="top"> Alamat Kantor</td>
                                        <td valign="top">:</td>
                                        <td><span class="capitalize">{{ pihak1.alamat_kantor }}</span></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td height="10"></td>
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tr>
                                        <td rowspan="4" valign="top" width="20">II.</td>
                                        <td width="150">Nama</td>
                                        <td>:</td>
                                        <td>{{ pihak2.nama }}</td>
                                    </tr>
                                    <tr>
                                        <td> No. KTP/SIM</td>
                                        <td>:</td>
                                        <td>{{ pihak2.no_identitas }}</td>
                                    </tr>
                                    <tr>
                                        <td> Alamat Kantor</td>
                                        <td>:</td>
                                        <td>{{ pihak2.alamat }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan=" 3"> Dalam hal ini bertindak untuk dirinya sendiri, selanjutnya
                                            disebut
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
                            <td> Pihak pertama memberikan pinjaman pada pihak kedua meliputi pokok hutang dan margin
                                atas
                                pinjaman
                                menjadi sebesar {{ pkData.pokok_margin }}</td>
                        </tr>
                        <tr>
                            <td align="center"> <br />Pasal 2</td>
                        </tr>
                        <tr>
                            <td> Pengembalian pinjaman tersebut akan dibayarkan untuk jangka {{ pkData.tenor }} BULAN
                                lamanya,
                                dimulai tanggal {{ pkData.tgl_awal_cicilan }} berakhir pada tanggal {{
                                    pkData.tgl_akhir_cicilan
                                }}
                                dengan jumlah
                                angsuran
                                sebesar {{ pkData.angsuran }}
                            </td>
                        </tr>
                        <tr>
                            <td align="center"> <br /> Pasal 3</td>
                        </tr>
                        <tr>
                            <td> Guna menjamin pembayaran pinjaman tersebut diatas maka Pihak Kedua dengan ini
                                menyerahkan
                                jaminan
                                barang miliknya sendiri berupa {{ pkData.tipe_jaminan }}, dengan dibuktikan
                                diserahkannya
                                Bukti Kepemilikan dengan spesifikasi sebagai berikut</td>
                        </tr>
                        <tr>
                            <td> <br />
                                <table>
                                    <tr>
                                        <td>BPKB No</td>
                                        <td>:</td>
                                        <td>{{ pkData.no_bpkb }}</td>
                                    </tr>
                                    <tr>
                                        <td>BPKB atas nama</td>
                                        <td>:</td>
                                        <td>{{ pkData.atas_nama }}</td>
                                    </tr>
                                    <tr>
                                        <td>Merk/Type/Tahun</td>
                                        <td>:</td>
                                        <td>{{ `${pkData.merk}/${pkData.type}/${pkData.tahun}` }}</td>
                                    </tr>
                                    <tr>
                                        <td> Warna/No.Polisi</td>
                                        <td>:</td>
                                        <td>{{ `${pkData.warna}/${pkData.no_polisi}` }}</td>
                                    </tr>
                                    <tr>
                                        <td>No. Rangka/Mesin</td>
                                        <td>:</td>
                                        <td>{{ `${pkData.no_rangka}/${pkData.no_mesin}` }}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <br />
                                Apabila pihak kedua tidak bisa memenuhi kewajiban pembayaran angsuran selama 3 bulan,
                                maka
                                pihak
                                kedua
                                bersedia menyerahkan jaminan kendaraan sesuai dengan pasal 3 di atas kepada pihak
                                pertama.
                                Jika Perjanjian Pemberi Pinjaman telah selesai, BPKB wajib diambil maksimum 90 hari
                                kalender
                                terhitung
                                dari pelunasan angsuran dan denda terakhir. KSP Djaya tidak bertanggung jawab atas
                                kerusakan
                                atau kegilangan BPKB.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <br />
                                Demikian Perjanjian Pemberian Pinjaman ini dibuat dan ditandatangani, tanpa adanya unsur
                                paksaan.<br />
                                {{ pkData.kota }}, {{ pkData.tgl_cetak }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <br />
                                <table width="100%">
                                    <tr>
                                        <td>Pihak Pertama<br />{{ pkData.cabang }}<br /><br /><br /><br /> ( {{
                                            pihak1.nama
                                        }} )
                                        </td>
                                        <td>Pihak Kedua<br /><br /><br /><br /><br /> ( {{ pihak2.nama }} )
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="mt-2">
                    <div class="bg-white shadow-lg p-4">
                        <div class="mb-4 bg-white">
                            Tabel Skala Angsuran
                        </div>
                        <div vertical v-show="prosesPK" class="bg-white flex w-full">
                            <table class="tblprint">
                                <tr>
                                    <th>Angsuran ke</th>
                                    <th align="left">Tanggal</th>
                                    <th align="left">POKOK</th>
                                    <th align="left">BUNGA</th>
                                    <th align="left">ANGSURAN</th>
                                    <th align="left">BAKI DEBET</th>
                                </tr>
                                <tr v-for="skala in pkData.struktur">
                                    <td>{{ skala.angsuran_ke }}</td>
                                    <td>{{ skala.tgl_angsuran }}</td>
                                    <td>{{ skala.pokok }}</td>
                                    <td>{{ skala.bunga }}</td>
                                    <td>{{ skala.total_angsuran }}</td>
                                    <td>{{ skala.baki_debet }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </n-card>
</template>
<style scoped>
table {
    font-size: 10px;
}

table.tblprint>tr>th {
    padding: 2px 0px 10px 4px;
    border: 1px solid;
}

table.tblprint {
    font-size: 10px;
}

table.tblprint>tr>td {
    padding: 2px 0px 10px 4px;
    border: 1px solid;
}

.tblprint {
    width: 100%;
}
</style>
<script setup>
import { useApi } from "../../../helpers/axios";
import { ref, reactive, computed } from "vue";
import { jsPDF } from "jspdf";
import router from '../../../router';
import { usePDF } from 'vue3-pdfmake';
import { useRoute } from "vue-router";
import { LocalPrintshopRound as PrintIcon, DownloadRound as DownloadIcon } from "@vicons/material";
import autoTable from 'jspdf-autotable';
import { useDialog, useMessage, NIcon, NTag, NButton } from "naive-ui";
const prosesPK = ref(false);
const pageData = ref([]);
const pk = ref();
const message = useMessage();
const pkData = ref([]);
const struktur = ref([]);
const pihak1 = ref([]);
const pihak2 = ref([]);
const tgl = reactive({
    awal: null,
});

const baseRoute = useRoute();
const idApp = baseRoute.params.idapplication;
const userToken = localStorage.getItem("token");
const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];
let monthServer = new Date().getMonth() + 1
let yearServer = new Date().getFullYear();
const month = monthNames[monthServer];
const zeroPad = (num, places) => String(num).padStart(places, '0')
const dynamicForm = reactive({
    awal: '01',
    order_number: null,
    angsuran: null
});
const response = useApi({
    method: 'get',
    api: `cr_application/${idApp}`,
    token: userToken
}).then(res => {
    if (res.ok) {
        pageData.value = res.data.response;
        // console.log(pageData.value.order_number)
        // console.log(dynamicForm.order_number)
        Object.assign(dynamicForm, {
            order_number: pageData.value.order_number,
            angsuran: pageData.value.angsuran,
        });
    }
});


const handleProses = async (e) => {
    const bodySend = {
        tgl_awal: yearServer + "-" + zeroPad((monthServer + 1), 2) + "-" + dynamicForm.awal,
        order_number: dynamicForm.order_number,
        angsuran: dynamicForm.angsuran,
    }
    // console.log(bodySend);
    e.preventDefault(e);
    const proses_pk = useApi({
        method: 'POST',
        data: bodySend,
        api: `pk`,
        token: userToken
    }).then(res => {
        if (!res.ok) {
            prosesPK.value = false;
        } else {
            prosesPK.value = true;
            pkData.value = res.data;
            pihak1.value = res.data.pihak_1;
            pihak2.value = res.data.pihak_2;
            struktur.value = [];
            struktur.value.push(['Angsuran ke', 'Jatuh Tempo', 'Pokok', 'Bunga', 'Angsuran', 'Baki Debet']);
            pkData.value.struktur.forEach((v, k) => {
                struktur.value.push([v.angsuran_ke, v.tgl_angsuran, v.pokok, v.bunga, v.total_angsuran, v.baki_debet]);
            });
        }
    });
}
const pdfmake = usePDF({
    autoInstallVFS: true
})
const createPdf = () => {
    pdfmake.createPdf({
        content: [
            {
                text: `PERJANJIAN PEMBERIAN PINJAMAN\n NO. PERJANJIAN : ${pkData.value.no_perjanjian}`,
                alignment: "center",
            },
            {
                text: `Yang bertanda tangan dibawah ini:`,
                margin: [0, 20, 0, 0]
            },
            {
                layout: 'noBorders',
                margin: [0, 20, 0, 0],
                table: {
                    widths: [10, 100, 5, '*'],
                    body: [
                        ['I.', 'Nama', ':', `${pihak1.value.nama}`],
                        ['', 'Jabatan', ':', `${pihak1.value.jabatan}`],
                        ['', 'Alamat Kantor', ':', `${pihak1.value.alamat_kantor}`],
                    ]
                }
            },
            {
                layout: 'noBorders',
                margin: [0, 20, 0, 0],
                table: {
                    widths: [10, 100, 5, '*'],
                    body: [
                        ['II.', 'Nama', ':', `${pihak2.value.nama}`],
                        ['', 'No. KTP/SIM', ':', `${pihak2.value.no_identitas}`],
                        ['', 'Alamat', ':', `${pihak2.value.alamat}`],
                        ['', { colSpan: 3, text: 'Dalam hal ini bertindak untuk dirinya sendiri, selanjutnya disebut Pihak Kedua' }],
                    ]
                }
            },
            {
                text: `Dengan ini menerangkan bahwa para pihak sepakat menandatangani Perjanjian Pemberian Pinjaman, dengan isi, syarat dan ketentuan sebagai berikut :`,
                alignment: "justify",
                margin: [0, 20, 0, 0],
            },
            {
                text: `Pasal 1`,
                alignment: "center",
                margin: [0, 20, 0, 0],
            },
            {
                text: `Pihak pertama memberikan pinjaman pada pihak kedua meliputi pokok hutang dan margin atas pinjaman menjadi sebesar ${pkData.value.pokok_margin}`,
                alignment: "justify",
            },
            {
                text: `Pasal 2`,
                alignment: "center",
                margin: [0, 20, 0, 0],
            },
            {
                text: `Pengembalian pinjaman tersebut akan dibayarkan untuk jangka ${pkData.value.tenor} BULAN lamanya, dimulai tanggal ${pkData.value.tgl_awal_cicilan} berakhir pada tanggal ${pkData.value.tgl_akhir_cicilan} dengan jumlah angsuran sebesar ${pkData.value.angsuran}`,
                alignment: "justify",
            },
            {
                text: `Pasal 3`,
                alignment: "center",
                margin: [0, 20, 0, 0],
            },
            {
                text: `Guna menjamin pembayaran pinjaman tersebut diatas maka Pihak Kedua dengan ini menyerahkan jaminan barang miliknya sendiri berupa , dengan dibuktikan diserahkannya Bukti Kepemilikan dengan spesifikasi sebagai berikut`,
                alignment: "justify",
            },
            {
                margin: [0, 20, 0, 0],
                layout: 'noBorders',
                table: {
                    width: [100, "*", 200, "*"],
                    headerRows: 1,
                    body: [
                        ['BPKB No.', ':', `${pkData.value.no_bpkb ? pkData.value.no_bpkb : ''}`],
                        ['BPKB atas nama.', ':', `${pkData.value.atas_nama}`],
                        ['Merk/Type/Tahun', ':', `${pkData.value.merk} / ${pkData.value.type} / ${pkData.value.tahun}`],
                        ['Warna/No.Polisi. ', ':', `${pkData.value.warna}/${pkData.value.no_polisi}`],
                        ['No. Rangka/Mesin ', ':', `${pkData.value.no_rangka}/${pkData.value.no_mesin}`],
                    ]
                },
            },
            {
                margin: [0, 20, 0, 0],
                text: `Apabila pihak kedua tidak bisa memenuhi kewajiban pembayaran angsuran selama 3 bulan, maka pihak kedua bersedia menyerahkan jaminan kendaraan sesuai dengan pasal 3 di atas kepada pihak pertama. Jika Perjanjian Pemberi Pinjaman telah selesai, BPKB wajib diambil maksimum 90 hari kalender terhitung dari pelunasan angsuran dan denda terakhir. KSP Djaya tidak bertanggung jawab atas kerusakan atau kegilangan BPKB.`,
                alignment: "justify",
            },
            {
                margin: [0, 20, 0, 0],
                text: `Demikian Perjanjian Pemberian Pinjaman ini dibuat dan ditandatangani, tanpa adanya unsur paksaan.\n${pkData.value.kota},${pkData.value.tgl_cetak}`,
                alignment: "justify",
            },
            {
                margin: [0, 20, 0, 0],
                layout: 'noBorders',
                style: 'tableExample',
                table: {
                    widths: ['*', '*'],
                    body: [
                        [`Pihak Pertama,\n${pkData.value.cabang}\n\n\n\n\n(${pihak1.value.nama})`, `Pihak Kedua\n\n\n\n\n\n(${pihak2.value.nama})`],
                    ]
                },
                pageBreak: 'after'
            },
            {
                text: `Tabel Skala Angsuran`,
                alignment: "left",
            },
            {
                margin: [0, 10, 0, 0],
                table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    headerRows: 1,
                    body: struktur.value

                },

            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 10,
                color: 'black'
            }
        },
        defaultStyle: {
            fontSize: 10,
        }
    }).open();
}
const handlePrint = (evt) => {

    const bodySend = {
        tgl_awal: yearServer + "-" + zeroPad((monthServer + 1), 2) + "-" + dynamicForm.awal,
        order_number: dynamicForm.order_number,
        angsuran: dynamicForm.angsuran,
        flag: "yes"
    }
    // // console.log(bodySend);
    // e.preventDefault(evt);
    const print_pk = useApi({
        method: 'POST',
        data: bodySend,
        api: `pk`,
        token: userToken
    }).then(res => {
        router.replace({ name: 'Pengajuan Kredit' });
        // if (!res.ok) {
        //     message.warning('gagal proses print!');
        // } else {
        //     message.success('sukses proses print!');

        // }
    });
    createPdf();
    //     generatePdf();
    // Supply data via script
    // var doc = new jsPDF('p', 'pt', 'a4');
    // var body = [
    //     ['SL.No', 'Product Name', 'Price', 'Model'],
    //     [1, 'I-phone', 75000, '2021'],
    //     [2, 'Realme', 25000, '2022'],
    //     [3, 'Oneplus', 30000, '2021'],
    // ]
    // // generate auto table with body
    // var y = 10;
    // doc.setLineWidth(2);
    // doc.setFontSize(10);
    // doc.text(300, 30, `PERJANJIAN PEMBERIAN PINJAMAN\nNo. ${pkData.value.no_perjanjian}`, { align: 'center' });
    // doc.output('dataurlnewwindow');
}
const handleDownload = (evt) => {
    var doc = new jsPDF('p', 'pt', 'a4');
    const margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };

    doc.html(pk.value, {
        callback: function (doc) {
            doc.save('pk');
        },
        x: 10,
        y: 10
    });
}

function generatePdf() {
    var doc = new jsPDF('p', 'pt', 'legal');
    const margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 10
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

const parse = (input) => {
    const nums = input.replace(/,/g, "").trim();
    if (/^\d+(\.(\d+)?)?$/.test(nums))
        return Number(nums);
    return nums === "" ? null : Number.NaN;
}
const format = (value) => {
    if (value === null)
        return "";
    return value.toLocaleString("en-US");
}
const options = [];

for (var x = 1; x <= 25; x++) {

    options[x] = {
        label: zeroPad(x, 2),
        value: zeroPad(x, 2)
    };
}


</script>