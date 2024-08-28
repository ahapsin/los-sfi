<template>
    <n-card>
        <!-- <n-collapse class="bg-yellow-100">
            <n-collapse-item title="day" name="day">
                <pre>{{ dayFull }}</pre>
            </n-collapse-item>
            <n-collapse-item title="pelanggan" name="1">
                <pre>{{ dataPelanggan }}</pre>
            </n-collapse-item>
            <n-collapse-item title="penjamin" name="2">
                <pre>{{ dataPenjamin }}</pre>
            </n-collapse-item>
            <n-collapse-item title="pasangan" name="3">
                <pre>{{ dataPasangan }}</pre>
            </n-collapse-item>
            <n-collapse-item title="pk" name="4">
                <pre>{{ pkData }}</pre>
            </n-collapse-item>
            <n-collapse-item title="dynamic" name="5">
                <pre>{{ dynamicForm }}</pre>
            </n-collapse-item>
        </n-collapse> -->
        <div class="flex flex-col md:flex-row w-full gap-2">
            <n-form ref="formRef" inline :disabled="pageData.flag == 1 ? true : false">
                <n-form-item label="Order Number" path="nama" class="w-full">
                    <n-input placeholder="nama" v-model:value="dynamicForm.order_number" disabled class="w-full" />
                </n-form-item>
                <n-form-item label="Tanggal Awal Angsuran" path="order" class="w-full">
                    <n-date-picker placeholder="Tanggal order" v-model:formatted-value="dynamicForm.awal"
                        value-format="yyyy-MM-dd" type="date" class="w-full" :loading="lodingDateAwal"
                        :disabled="pkData.flag == 1" @update:formatted-value="getPrePK" />
                </n-form-item>
            </n-form>
            <n-form-item label="Halaman" path="nama_panggilan" class="w-full">
                <n-space item-style="display: flex;" class="bg-slate-100 p-2 rounded-lg">
                    <!-- <n-checkbox label="Semua Halaman" v-model:checked="optAllPage" checked /> -->
                    <n-checkbox value="pk" label="Perjanjian Kredit" checked />
                    <n-checkbox value="skala" label="Skala Kredit" v-model:checked="optPrint.skalaPage" />
                    <n-checkbox value="ktpa" label="Tanpa Perlindungan Asuransi" v-model:checked="optPrint.ktpaPage" />
                    <n-checkbox value="" label="Persetujuan Pasangan" v-model:checked="optPrint.pasanganPage" />
                    <n-checkbox value="" label="Penjamin" v-model:checked="optPrint.penjaminPage" />
                </n-space>
            </n-form-item>
            <!-- <n-form-item class="w-full">
                    <n-button type="primary" @click="handleProses">Proses</n-button>
                </n-form-item> -->
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
        <div class="flex bg-slate-100  justify-center overflow-auto p-2" v-show="prosesPK">
            <div class="flex flex-col min-w-[900px] p-10" ref="pk">
                <div class="bg-white max-w-[900px] shadow-lg p-8" v-show="optPrint.pkPage">
                    <table border="1" class="mb-10">
                        <tr>
                            <td align="center">
                                PERJANJIAN PEMBERIAN PINJAMAN
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                NO.PERJANJIAN : {{ dynamicForm.order_number }}
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
                                        <td width="25">:</td>
                                        <td>{{ pihak1.nama }}</td>
                                    </tr>
                                    <tr>
                                        <td>Jabatan</td>
                                        <td width="25">:</td>
                                        <td>{{ pihak1.jabatan }}</td>
                                    </tr>
                                    <tr>
                                        <td valign="top"> Alamat Kantor</td>
                                        <td valign="top">:</td>
                                        <td><span class="capitalize">{{ pihak1.alamat }}</span></td>
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
                                        <td width="25">:</td>
                                        <td>{{ pihak2.nama }}</td>
                                    </tr>
                                    <tr>
                                        <td> No. KTP/SIM</td>
                                        <td width="25">:</td>
                                        <td>{{ pihak2.no_identitas }}</td>
                                    </tr>
                                    <tr>
                                        <td> Alamat Kantor</td>
                                        <td width="25">:</td>
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
                                dimulai tanggal {{ pkData.tgl_awal_pk }} berakhir pada tanggal {{
                                    pkData.tgl_akhir_pk
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
                                barang miliknya sendiri berupa SEPEDA MOTOR, dengan dibuktikan
                                diserahkannya
                                Bukti Kepemilikan dengan spesifikasi sebagai berikut</td>
                        </tr>
                        <tr>
                            <td> <br />
                                <table>
                                    <tr>
                                        <td>BPKB No</td>
                                        <td width="25">:</td>
                                        <td>{{ pkData.no_bpkb }}</td>
                                    </tr>
                                    <tr>
                                        <td>BPKB atas nama</td>
                                        <td width="25">:</td>
                                        <td>{{ pkData.atas_nama }}</td>
                                    </tr>
                                    <tr>
                                        <td>Merk/Type/Tahun</td>
                                        <td width="25">:</td>
                                        <td>{{ `${pkData.merk}/${pkData.type}/${pkData.tahun}` }}</td>
                                    </tr>
                                    <tr>
                                        <td> Warna/No.Polisi</td>
                                        <td width="25">:</td>
                                        <td>{{ `${pkData.warna}/${pkData.no_polisi}` }}</td>
                                    </tr>
                                    <tr>
                                        <td>No. Rangka/Mesin</td>
                                        <td width="25">:</td>
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
                                atau kehilangan BPKB.
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
                <div class="mt-2" v-show="optPrint.skalaPage">
                    <div class="bg-white max-w-[900px] shadow-lg p-8">
                        <div class="mb-4 bg-white">
                            Tabel Skala Angsuran
                        </div>
                        <div vertical class="bg-white flex w-full">
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
                <div class="mt-2" v-show="optPrint.ktpaPage">
                    <div class="bg-white max-w-[900px] shadow-lg p-8">
                        <div class="mb-4 text-center text-base ">
                            <b>SYARAT DAN KETENTUTAN KHUSUS PROGRAM <b>" KREDIT TANPA PERLINDUNGAN ASURANSI "</b></b>
                        </div>
                        <div class="mb-4 text-justify text-sm">
                            Pada hari ini <b>{{ dayFull.day }}</b>
                            tanggal <b>{{ dayFull.date }}</b> bulan
                            <b>{{ dayFull.month }}</b> tahun
                            <b>{{ dayFull.year }}</b>, yang bertanda tangan dibawah ini :
                        </div>
                        <div class="mb-4 text-justify text-sm ps-8">
                            I. <b>{{ dataPelanggan.nama }}</b> pekerjaan/jabatan <b> {{ dataPelanggan.pekerjaan }}</b>
                            Bertempat tinggal di <b>{{ pihak2.alamat }}
                            </b>
                            Pemegang kartu identitas (<b>{{ dataPelanggan.tipe_identitas }}</b>) nomor <b>{{
                                dataPelanggan.no_identitas }}</b>
                            Dalam hal ini bertindak untuk dan atas nama <b>{{ pihak2.nama }}</b> Selanjutnya
                            disebut <b>Penerima
                                Pinjaman.</b>
                        </div>
                        <div class="mb-4 text-justify text-sm ps-8">
                            II. <b>{{ pihak1.nama }}</b> pekerjaan/jabatan <b> {{ pihak1.jabatan }}</b>
                            Bertempat tinggal di <b>{{ pihak1.alamat }}
                            </b>
                            Pemegang kartu identitas (<b>KTP</b>) nomor <b>{{ pihak1.no_ktp  }}</b>
                            Dalam hal ini bertindak untuk dan atas nama <b>{{ pihak1.nama }}</b> Selanjutnya
                            disebut <b>Pemberi
                                Pinjaman.</b>
                        </div>
                        <div class="mb-4 text-justify text-sm ">
                            Yang bersama-sama dengan <b>KSP DJAYA</b>, telah, sepakat dan mengikatkan diri dan karenanya
                            menjadi para pihak dalam Perjanjian PINJAMAN Konsumen
                            <b> No.{{ dynamicForm.order_number }}</b> berikut kelengkapan dan perubahannya ( selanjutnya
                            disebut <b>
                                Perjanjian
                                PINJAMAN Konsumen
                            </b> yang merupakan satu kesatuan tak terpisahkan dengan syarat dan ketentuan
                            Program <b>"Kredit Tanpa Perlindungan Asuransi"</b> ini (syarat dan ketentuan)
                        </div>
                        <div class="mb-4 text-justify text-sm">
                            Penerima Pinjaman dan pemberi jaminan dengan ini mengikuti program yang ditawarkan (<b>KSP
                                DJAYA</b>)
                            selanjutnya disebut Penerima Pinjaman / Penerima Jaminan ) yaitu "Kredit Tanpa Perlindungan
                            Asuransi " dengan menyetujui setiap dan seluruh syarat dan ketentuannya, berikut di bawah
                            ini yang merupakan syarat dan ketentuan khusus dan manakala terdapat perbedaan dengan
                            perjanjian PINJAMAN konsumen, maka syarat dan ketentuan inilah yang akan berlaku, yaitu
                            sebagai berikut:
                        </div>
                        <div class="mb-4 text-justify text-sm ps-8">
                            1. Dengan Menandatangani syarat dan ketentuan ini, penerima Pinjaman / Pemberi Jaminan
                            sepakat untuk mengikuti program <b>"Kredit Tanpa Perlindungan Asuransi "</b> yang ditawarkan
                            pemberi Pinjaman / penerima jaminan karenanya menyetujui setiap dan seluruh syarat dan
                            ketentuan yang mengaturnya dan mengesampingkan syarat dan ketentuan mengenai asuransi pada
                            PINJAMAN Konsumen.
                        </div>
                        <div class="mb-4 text-justify text-sm ps-8">
                            2. Dengan mengikuti program <b>"Kredit Tanpa Perlindungan Asuransi "</b> ini, sesuai
                            penawaran yang
                            diberikan (<b>KSP
                                DJAYA</b>) maka segala resiko rusak, hilang atau musnahnya barang karena sebab apapun
                            juga
                            sepenuhnya menjadi tanggung jawab dan beban penerima Pinjaman / pemberi Jaminan, sehingga
                            dengan rusak, hilang atau musnahnya barang tidak meniadakan, mengurangi atau menunda
                            pemenuhan kewajiban penerima Pinjaman pemberi jaminan sebagaimana ditentukan dalam
                            perjanjian PINJAMAN konsumen.
                        </div>
                        <div class="mb-4 text-justify text-sm ps-8">
                            3. Dalam hal terjadi resiko rusak, hilang atau musnahnya barang, maka penerima
                            Pinjaman/pemberi jaminan tidak dapat melakukan klaim asuransi dan karenanya tetap
                            berkewajiban untuk melakukan pembayaran angsuran sebagaimana disepakati dalam perjanjian
                            PINJAMAN konsumen hingga setiap dan seluruhnya terlunasi.
                        </div>
                        <div class="mb-4 text-justify text-sm">
                            Penerima Pinjaman/Pemberi Jaminan telah membaca, mengerti dan menyetujui setiap dan seluruh
                            syarat dan ketentuan ini.
                        </div>
                        <div class="mb-4 text-justify">
                            <table class="!text-sm w-full">
                                <tr>
                                    <td class="py-4 pr-4">
                                        Penerima Pinjaman,
                                        <br /><br /><br />
                                        <u class="uppercase">{{ pihak2.nama }}</u>

                                    </td>
                                    <td class="py-4 pr-4">
                                        Pemberi Jaminan,
                                        <br /><br /><br />
                                        <u class="uppercase">{{ pihak1.nama }}</u>
                                    </td>
                                    <td>

                                        Pemberi Pinjaman / Penerima Jaminan,
                                        <br /><br /><br />
                                        <u class="uppercase">{{ pihak1.nama }} / {{ pihak2.nama }}</u>

                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="mt-2" v-show="optPrint.pasanganPage">
                    <div class="bg-white max-w-[900px] shadow-lg p-8">
                        <div class="mb-4 text-center text-base ">
                            <b>SURAT PERSETUJUAN SUAMI ISTRI</b>
                        </div>
                        <div class="mb-4">
                            yang bertanda tangan di bawah ini:
                        </div>
                        <div class="mb-4 ps-8">
                            <table>
                                <tr>
                                    <td width="100px">Nama</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">{{ upCase(dataPasangan.nama_pasangan) }}</b></td>
                                </tr>
                                <tr>
                                    <td>Pekerjaan</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">{{ upCase(dataPasangan.pekerjaan_pasangan) }}</b></td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">{{ upCase(dataPasangan.alamat_pasangan) }}</b></td>
                                </tr>
                            </table>
                        </div>
                        <div class="mb-4">
                            Sebagai suami/isteri *) dengan ini memberikan persetujuan kepada suami/isteri *) saya:
                        </div>
                        <div class="mb-4 ps-8">
                            <table>
                                <tr>
                                    <td width="100px">Nama</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">{{ pihak2.nama }}</b></td>
                                </tr>
                                <tr>
                                    <td>Pekerjaan</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">( {{ dataPelanggan.pekerjaan_id }} ) {{
                                        dataPelanggan.pekerjaan }}</b></td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">{{ pihak2.alamat }}</b></td>
                                </tr>
                            </table>

                        </div>
                        <div class="mb-4">
                            Untuk melakukan tindakan-tindakan sebagaimana disebutkan di bawah ini :
                        </div>
                        <div class="mb-4 text-justify">
                            1. Mengajukan mendapatkan Pinjaman Konsumen sebagaimana dimaksud dalam
                            Perjanjian PINJAMAN Konsumen <b>No. {{ dynamicForm.order_number }}</b> tertanggal {{
                                 dayFull.full_date_only }} berikut dengan seluruh
                            perubahan-perubahan dan lampiran-lampirannya <b>("Perjanjian Pinjaman *)</b> dari pemberi
                            Pinjaman, baik bertindak untuk dan atas nama dirinya sendiri dan atau selaku kuasa.
                        </div>
                        <div class="mb-4 text-justify">
                            2. Menjaminkan Barang guna menjamin / sebagai jaminan pelunasan seluruh kewajiban
                            hutang Suami/Isteri *) saya berdasarkan Perjanjian PINJAMAN.
                        </div>
                        <div class="mb-4 text-justify">
                            3. Untuk keperluan tersebut membuat dan menandatangani Perjanjian Pembiayaan berikut
                            dokumen-dokumen lainnya serta tindakan-tindakan lainnya yang diperlukan sehubungan
                            dengan yang diuraikan pada butir 1 dan 2 di atas.
                        </div>
                        <div class="mb-4 text-justify">
                            Demikian Surat Persetujuan ini dibuat dengan sebenarnya dan tidak akan berakhir karena
                            sebab apapun juga kecuali seluruh kewajiban suami/isteri *) saya berdasarkan Perjanjian
                            PINJAMAN tersebut telah lunas seluruhnya.
                        </div>
                        <div class="mb-4 ">
                            {{ dayFull.full_date_only }},<br />
                            Yang memberi persetujuan,<br /><br /><br />
                            <u class="uppercase">{{ upCase(dataPasangan.nama_pasangan) }}</u>
                        </div>
                    </div>
                </div>
                <div class="mt-2" v-show="optPrint.penjaminPage">
                    <div class="bg-white max-w-[900px] shadow-lg p-8">
                        <div class="mb-4 text-center text-base ">
                            <b>PERNYATAAN PENJAMIN</b>
                        </div>
                        <div class="mb-4">
                            yang bertanda tangan di bawah ini:
                        </div>
                        <div class="mb-4">
                            <table>
                                <tr>
                                    <td width="100px">Nama</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">{{ dataPenjamin.nama }}</b></td>
                                </tr>
                                <tr>
                                    <td>Pekerjaan</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">{{ dataPenjamin.pekerjaan }}</b></td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">{{ dataPenjamin.alamat }}</b></td>
                                </tr>
                                <tr>
                                    <td>Nomor KTP</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">{{ dataPenjamin.no_identitas }}</b></td>
                                </tr>
                            </table>
                            Selanjutnya disebut <b>Penjamin</b>
                        </div>
                        <div class="mb-4">
                            <!-- Selanjutnya disebut Penjamin<br /> -->
                            Dengan ini menyatakan dan menegaskan bahwa :
                        </div>
                        <div class="mb-4 text-justify">
                            1. Penjamin benar-benar mengetahui timbulnya hutang piutang secara sah berdasarkan
                            Perjanjian
                            pembiayaan Konsumen Nomor <b>{{ dynamicForm.order_number }}</b> tanggal <b>
                                {{
                                   dayFull.full_date_only
                                }}
                            </b><br />
                            beserta seluruh lampiran, penambahan dan / atau pengurangannya ( selanjutnya disebut
                            Perjanjian ) oleh dan antara <b>KSP Djaya</b> berkedudukan di Haurgeulis
                            <br />
                            ( selanjutnya secara sendiri-sendiri atau bersama disebut<b> Pemberi Pinjaman</b> dengan :
                            <br/>
                            <br/>
                            <table>
                                <tr>
                                    <td width="100px">Nama</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">{{ pihak2.nama }}</b></td>
                                </tr>
                                <tr>
                                    <td>Pekerjaan</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">({{ dataPelanggan.pekerjaan_id }}) {{
                                        dataPelanggan.pekerjaan }}</b></td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">{{ pihak2.alamat }}</b></td>
                                </tr>
                                <tr>
                                    <td>Nomor KTP</td>
                                    <td width="25">:</td>
                                    <td><b class="uppercase">{{ pihak2.no_identitas }}</b></td>
                                </tr>
                            </table>
                            Selanjutnya disebut<b> Penerima Pinjaman</b>
                        </div>
                        <div class="mb-4 text-justify">
                            2. Penjamin menyatakan sanggup dan mengikatkan diri untuk menjamin seluruh HUTANG PEMBIAYAAN
                            Penerima Pinjaman yang timbul dari perjanjian tersebut sebesar <b>{{ pkData.pokok_margin
                                }}</b>
                            (
                            dan bersedia untuk membayar seluruh kewajiban pembayaran hutang tersebut kepada Pemberi
                            Pinjaman apabila Penerima Pinjaman tidak memenuhi kewajibannya sebagaimana ditentukan dalam
                            perjanjian
                        </div>
                        <div class="mb-4 text-justify">
                            3. Penjamin dengan tegas melepaskan semua hak istimewa maupun pengecualian-pengecualian yang
                            diberikan oleh peraturan perundangan kepada Penjamin, khusus tetapi tidak terbatas pada
                            pasal 1832 Undang-Undang Hukum Perdata.
                        </div>

                        <div class="flex mb-4 justify-end">
                            <div class=" w-fit text-center bg-white">
                                {{ dayFull.full_date_only }}<br />
                                Penjamin,<br /><br /><br />
                                (<u class="uppercase">{{ upCase(dataPenjamin.nama) }}</u>)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </n-card>
</template>
<style scoped>
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
import { LocalPrintshopRound as PrintIcon } from "@vicons/material";
import { NButton, NIcon } from "naive-ui";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { usePDF } from 'vue3-pdfmake';
import { useApi } from "../../../helpers/axios";

const prosesPK = ref(false);
const pageData = ref([]);
const pk = ref();
const pkData = ref([]);
const struktur = ref([]);
const pihak1 = ref([]);
const pihak2 = ref([]);
// page controller
const optPrint = reactive({
    pkPage: true,
    skalaPage: true,
    pasanganPage: true,
    ktpaPage: true,
    penjaminPage: true,
});


const baseRoute = useRoute();
const idApp = baseRoute.params.idapplication;
const userToken = localStorage.getItem("token");
const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];
const daysName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

const zeroPad = (num, places) => String(num).padStart(places, '0');

var dt = new Date();
let year = dt.getFullYear();
let months = (dt.getMonth() + 2).toString().padStart(2, "0");
let day = dt.getDate().toString().padStart(2, "0");
const thisday = `${year}-${months}-${day}`;
const dataPelanggan = ref([]);

const dynamicForm = reactive({
    awal: `${year}-${months}-${day}`,
    order_number: null,
});


// const dayFull = () => computed(() => {
//     let dayPick = new Date(dynamicForm.awal).getDay();
//     dynamicForm.day_pk = daysName[dayPick];
//     let tglPk = new Date(dynamicForm.awal).getDate();
//     dynamicForm.tgl_pk = tglPk;
//     let monthPick = new Date(dynamicForm.awal).getMonth();
//     dynamicForm.month_pk = monthNames[monthPick];
//     dynamicForm.year_pk = new Date(dynamicForm.awal).getFullYear();
// });
useApi({
    method: 'get',
    api: `cr_application/${idApp}`,
    token: userToken
}).then(res => {
    if (res.ok) {
        pageData.value = res.data.response;
        dataPelanggan.value = pageData.value.pelanggan;
        Object.assign(dataPelanggan.value, pageData.value.pekerjaan);
        // console.log(pageData.value.order_number)
        // console.log(dynamicForm.order_number)
        Object.assign(dynamicForm, {
            order_number: pageData.value.order_number,
            angsuran: pageData.value.angsuran,
        });
        getPrePK();
    }
});
const tgl_cetak = ref({});
const dataPasangan = ref([]);
const dataPenjamin = ref([]);
const loadingDateAwal = ref(false);
const getPrePK = async () => {
    loadingDateAwal.value = true;
    // const bodySend = {
    //     tgl_awal: yearServer + "-" + zeroPad((monthServer + 1), 2) + "-" + dynamicForm.awal,
    //     order_number: dynamicForm.order_number,
    //     angsuran: dynamicForm.angsuran,
    // }
    // console.log(bodySend);
    // e.preventDefault(e);
    const bodySend = {
        order_number: dynamicForm.order_number,
        tgl_awal: dynamicForm.awal,
    };
    useApi({
        method: 'POST',
        data: bodySend,
        api: `pk`,
        token: userToken
    }).then(res => {
        if (!res.ok) {
            prosesPK.value = false;
        } else {
            loadingDateAwal.value = false;
            prosesPK.value = true;
            pkData.value = res.data;
            let awal = res.data.tgl_awal_angsuran;
            if(awal){
            dynamicForm.awal = res.data.tgl_awal_angsuran;
            }
            tgl_cetak.value = res.data.tgl_cetak;
            dataPasangan.value = res.data.pasangan;
            dataPenjamin.value = res.data.penjamin;
            pihak1.value = res.data.pihak_1;
            pihak2.value = res.data.pihak_2;
            struktur.value = [];
            struktur.value.push(['Angsuran ke', 'Jatuh Tempo', 'Pokok', 'Bunga', 'Angsuran', 'Baki Debet']);
            pkData.value.struktur.forEach((v) => {
                struktur.value.push([v.angsuran_ke, v.tgl_angsuran, v.pokok, v.bunga, v.total_angsuran, v.baki_debet]);
            });
        }
    });
}



const dayFull = reactive({
    print_date: computed(() => {
        return tgl_cetak.value ? tgl_cetak.value : thisday;
    }),
    day: computed(() => daysName[new Date(dayFull.print_date).getDay()]),
    date: computed(() => new Date(dayFull.print_date).getDate()),
    month: computed(() => monthNames[new Date(dayFull.print_date).getMonth()]),
    year: computed(() => new Date(dayFull.print_date).getFullYear()),
    full_date_only: computed(() => `${dayFull.date} ${dayFull.month} ${dayFull.year}`),
    full_date: computed(() => `${dayFull.day}, ${dayFull.date} ${dayFull.month} ${dayFull.year}`),
});
const pdfmake = usePDF({
    autoInstallVFS: true
})

const createPdf = () => {

    const skalaAngsuranPage = ref([{
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
        pageBreak: 'after'
    },]);

    const creditTanpaAsuransiPage = ref([
        {
            text: 'SYARAT DAN KETENTUTAN KHUSUS PROGRAM " KREDIT TANPA PERLINDUNGAN ASURANSI \"',
            style: 'header',
            alignment: 'center'
        },
        {
            text: [
                'Pada hari ini ', { text: `${dayFull.day}`, bold: true },
                ' tanggal ', { text: `${dayFull.date}`, bold: true }, ' bulan ', { text: `${dayFull.month}`, bold: true }, ' tahun ',
                { text: `${dayFull.year}`, bold: true }, ' yang bertanda tangan dibawah ini:'
            ],
            margin: [0, 20, 0, 0],
        },
        {
            text: [`I. `, { text: `${dataPelanggan.value.nama}`, bold: true }, ` pekerjaan/jabatan ${dataPelanggan.value.pekerjaan} Bertempat tinggal di ${pihak2.value.alamat} Pemegang kartu identitas (${dataPelanggan.value.tipe_identitas}) nomor ${dataPelanggan.value.no_identitas} Dalam hal ini bertindak untuk dan atas nama ${dataPelanggan.value.nama} Selanjutnya disebut Penerima Pinjaman.`],
            margin: [20, 20, 0, 0],
        },
        {
            text: [`II. ${pihak1.value.nama} pekerjaan/jabatan ${pihak1.value.jabatan} Bertempat tinggal di ${pihak1.value.alamat_kantor} Pemegang kartu identitas (####) nomor #### Dalam hal ini bertindak untuk dan atas nama ${pihak1.value.nama} Selanjutnya disebut Pemberi Pinjaman.`],
            margin: [20, 20, 0, 0],
        },
        {
            text: [`Yang bersama-sama dengan KSP DJAYA, telah, sepakat dan mengikatkan diri dan karenanya menjadi para pihak dalam Perjanjian PINJAMAN Konsumen No.${dynamicForm.order_number} berikut kelengkapan dan perubahannya ( selanjutnya disebut Perjanjian PINJAMAN Konsumen yang merupakan satu kesatuan tak terpisahkan dengan syarat dan ketentuan Program "Kredit Tanpa Perlindungan Asuransi" ini (syarat dan ketentuan)`],
            margin: [0, 20, 0, 0],
        },
        {
            text: [`Penerima Pinjaman dan pemberi jaminan dengan ini mengikuti program yang ditawarkan (KSP DJAYA) selanjutnya disebut Penerima Pinjaman / Penerima Jaminan ) yaitu "Kredit Tanpa Perlindungan Asuransi " dengan menyetujui setiap dan seluruh syarat dan ketentuannya, berikut di bawah ini yang merupakan syarat dan ketentuan khusus dan manakala terdapat perbedaan dengan perjanjian PINJAMAN konsumen, maka syarat dan ketentuan inilah yang akan berlaku, yaitu sebagai berikut:`],
            margin: [0, 20, 0, 0],
        },
        {
            ol: [
                `Dengan Menandatangani syarat dan ketentuan ini, penerima Pinjaman / Pemberi Jaminan sepakat untuk mengikuti program "Kredit Tanpa Perlindungan Asuransi " yang ditawarkan pemberi Pinjaman / penerima jaminan karenanya menyetujui setiap dan seluruh syarat dan ketentuan yang mengaturnya dan mengesampingkan syarat dan ketentuan mengenai asuransi pada PINJAMAN Konsumen.`,
                `Dengan mengikuti program "Kredit Tanpa Perlindungan Asuransi " ini, sesuai penawaran yang diberikan (KSP DJAYA) maka segala resiko rusak, hilang atau musnahnya barang karena sebab apapun juga sepenuhnya menjadi tanggung jawab dan beban penerima Pinjaman / pemberi Jaminan, sehingga dengan rusak, hilang atau musnahnya barang tidak meniadakan, mengurangi atau menunda pemenuhan kewajiban penerima Pinjaman pemberi jaminan sebagaimana ditentukan dalam perjanjian PINJAMAN konsumen.`,
                `Dalam hal terjadi resiko rusak, hilang atau musnahnya barang, maka penerima Pinjaman/pemberi jaminan tidak dapat melakukan klaim asuransi dan karenanya tetap berkewajiban untuk melakukan pembayaran angsuran sebagaimana disepakati dalam perjanjian PINJAMAN konsumen hingga setiap dan seluruhnya terlunasi.`
            ],
            margin: [20, 20, 0, 20],
        },
        {
            text: [`Penerima Pinjaman/Pemberi Jaminan telah membaca, mengerti dan menyetujui setiap dan seluruh syarat dan ketentuan ini.`],
            margin: [0, 20, 0, 20],
        },
        {
            margin: [0, 20, 0, 0],
            layout: `noBorders`,
            style: `tableExample`,
            table: {
                widths: ['*', '*', '*'],
                body: [
                    [`Penerima Pinjaman,\n\n\n\n\n\n${dataPelanggan.value.nama}`, `Pemberi Jaminan,\n\n\n\n\n\n${pihak1.value.nama}`, `Pemberi Pinjaman/Penerima Jaminan,\n\n\n\n\n\n${pihak1.value.nama}/${dataPelanggan.value.nama}`],
                ]
            },
            pageBreak: 'after'
        },
    ]);

    const persetujuanPasangan = ref([
        {
            text: 'SURAT PERSETUJUAN SUAMI ISTRI',
            style: 'header',
            alignment: 'center',
            margin: [0, 0, 0, 20],
        },
        {
            text: 'yang bertanda tangan dibawah ini :',
        },
        {
            layout: 'noBorders',
            margin: [20, 20, 0, 0],
            table: {
                widths: [60, 5, '*'],
                body: [
                    ['Nama', ':', `${dataPasangan.value.nama_pasangan}`],
                    ['Pekerjaan', ':', `${dataPasangan.value.pekerjaan_pasangan}`],
                    ['Alamat', ':', `${dataPasangan.value.alamat_pasangan}`],
                ]
            }
        },
        {
            text: 'Sebagai suami/isteri *) dengan ini memberikan persetujuan kepada suami/isteri *) saya:',
        },
        {
            layout: 'noBorders',
            margin: [20, 20, 0, 0],
            table: {
                widths: [60, 5, '*'],
                body: [
                    ['Nama', ':', `${dataPelanggan.value.nama}`],
                    ['Pekerjaan', ':', `${dataPelanggan.value.pekerjaan_id} - ${dataPelanggan.value.pekerjaan}`],
                    ['Alamat', ':', `${pihak2.value.alamat}`],
                ]
            }
        },
        {
            text: 'Untuk melakukan tindakan-tindakan sebagaimana disebutkan di bawah ini :',
        },
        {
            ol: [
                `Mengajukan mendapatkan Pinjaman Konsumen sebagaimana dimaksud dalam Perjanjian PINJAMAN Konsumen No. ${dynamicForm.order_number} tertanggal ${ dayFull.full_date_only} berikut dengan seluruh perubahan-perubahan dan lampiran-lampirannya ("Perjanjian Pinjaman *) dari pemberi Pinjaman, baik bertindak untuk dan atas nama dirinya sendiri dan atau selaku kuasa.`,
                `Menjaminkan Barang guna menjamin / sebagai jaminan pelunasan seluruh kewajiban hutang Suami/Isteri *) saya berdasarkan Perjanjian PINJAMAN.`,
                `Untuk keperluan tersebut membuat dan menandatangani Perjanjian Pembiayaan berikut dokumen-dokumen lainnya serta tindakan-tindakan lainnya yang diperlukan sehubungan dengan yang diuraikan pada butir 1 dan 2 di atas.`
            ],
            margin: [20, 20, 0, 20],
        },
        { text: `Demikian Surat Persetujuan ini dibuat dengan sebenarnya dan tidak akan berakhir karena sebab apapun juga kecuali seluruh kewajiban suami/isteri *) saya berdasarkan Perjanjian PINJAMAN tersebut telah lunas seluruhnya.` },
        {
            layout: `noBorders`,
            margin: [0, 20, 0, 0],
            table: {
                widths: [`*`],
                body: [
                    [`${dayFull.full_date_only}\nyang memberi persetujuan,\n\n\n\n\n${dataPasangan.value.nama_pasangan}`,],
                ]
            },
            pageBreak: `after`,
        },
    ]);

    const pernyataanPenjaminPage = ref([
        {
            text: 'PERNYATAAN PENJAMIN',
            style: 'header',
            alignment: 'center'
        },
        {
            text: 'yang bertanda tangan di bawah ini:',
            margin: [0, 20, 0, 0],
        },
        {
            layout: 'noBorders',
            margin: [20, 20, 0, 0],
            table: {
                widths: [60, 5, '*'],
                body: [
                    ['Nama', ':', `${dataPenjamin.value.nama}`],
                    ['Pekerjaan', ':', `${dataPenjamin.value.pekerjaan}`],
                    ['Alamat', ':', `${dataPenjamin.value.alamat}`],
                    ['No KTP', ':', `${dataPenjamin.value.no_identitas}`],
                ]
            }
        },
        {
            text: 'Selanjutnya disebut Penjamin',
        },
        {
            text: 'Dengan ini menyatakan dan menegaskan bahwa :',
            margin: [0, 0, 0, 20],
        },
        {
            ol: [
                `Penjamin benar-benar mengetahui timbulnya hutang piutang secara sah berdasarkan Perjanjian pembiayaan Konsumen Nomor ${dynamicForm.order_number} tanggal  ${ dayFull.full_date_only} beserta seluruh lampiran, penambahan dan / atau pengurangannya(selanjutnya disebut Perjanjian) oleh dan antara KSP Djaya berkedudukan di Haurgeulis(selanjutnya secara sendiri - sendiri atau bersama disebut Pemberi Pinjaman dengan : `,
                {
                    layout: `noBorders`,
                    margin: [20, 20, 0, 0],
                    table: {
                        widths: [60, 5, `*`],
                        body: [
                            [`Nama`, `:`, `${dataPelanggan.value.nama}`],
                            [`Pekerjaan`, `:`, `${dataPelanggan.value.pekerjaan_id} - ${dataPelanggan.value.pekerjaan}`],
                            [`Alamat`, `:`, `${pihak2.value.alamat}`],
                        ]
                    },
                    listType: `none`,
                },
                `Penjamin menyatakan sanggup dan mengikatkan diri untuk menjamin seluruh HUTANG PEMBIAYAAN Penerima Pinjaman yang timbul dari perjanjian tersebut sebesar ${pkData.value.pokok_margin} ( dan bersedia untuk membayar seluruh kewajiban pembayaran hutang tersebut kepada Pemberi Pinjaman apabila Penerima Pinjaman tidak memenuhi kewajibannya sebagaimana ditentukan dalam perjanjian`,
                `Penjamin dengan tegas melepaskan semua hak istimewa maupun pengecualian-pengecualian yang diberikan oleh peraturan perundangan kepada Penjamin, khusus tetapi tidak terbatas pada pasal 1832 Undang-Undang Hukum Perdata.Penjamin dengan tegas melepaskan semua hak istimewa maupun pengecualian-pengecualian yang diberikan oleh peraturan perundangan kepada Penjamin, khusus tetapi tidak terbatas pada pasal 1832 Undang-Undang Hukum Perdata.`
            ]
        },
        {
            text: `${dayFull.full_date_only}\npenjamin,\n\n\n\n\n${dataPenjamin.value.nama}`,
            margin: [0, 20, 0, 0],

        },
    ]);

    const genPDF=pdfmake.createPdf({
        info: {
            title: `Perjanjian Kredit-${pihak2.value.nama}`,
            author: 'ahapsin',
        },
        content: [
            {
                text: `PERJANJIAN PEMBERIAN PINJAMAN\n NO. PERJANJIAN : ${dynamicForm.order_number}`,
                alignment: "center",
                style: "header",
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
            },
            optPrint.skalaPage ? skalaAngsuranPage.value : '',
            optPrint.ktpaPage ? creditTanpaAsuransiPage.value : '',
            optPrint.pasanganPage ? persetujuanPasangan.value : '',
            optPrint.penjaminPage ? pernyataanPenjaminPage.value : '',

        ],
        styles: {
            header: {
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 0]
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
    }).print();
}


const handlePrint = () => {
    const bodySend = {
        tgl_awal: dynamicForm.awal,
        order_number: dynamicForm.order_number,
        angsuran: dynamicForm.angsuran,
        flag: "yes"
    }
    // // console.log(bodySend);
    // e.preventDefault(evt);
    useApi({
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
    // // console.log(bodySend);
    // e.preventDefault(evt);
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

const upCase = (e) => {
    return e;
};

const options = [];

for (var x = 1; x <= 25; x++) {

    options[x] = {
        label: zeroPad(x, 2),
        value: zeroPad(x, 2)
    };
}

</script>