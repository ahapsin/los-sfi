<template>
  <div class="flex sticky top-0 gap-4 justify-between text-white p-4 bg-gradient-to-r from-orange-500 to-blue-600 tex">
    <div>LOGO</div>
    <div class="flex gap-4">
      <div>Menu1</div>
      <div>Menu2</div>
      <div>Menu3</div>
    </div>
  </div>
  <div class="p-4 grid grid-cols-1 md:grid-cols-4  gap-4">
    <!--    card-->
    <div class="border  rounded-lg overflow-clip" v-for="item in buku" :key="item.id">
      <div class="p-4">{{ item.judul }}</div>
      <div class="p-4">
        <img class="w-20" :src="item.img"/>
        {{ item.description }}
      </div>
      <div class="bg-slate-100 p-4">{{ item.categorie }}</div>
    </div>
    <!--    end card-->
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';

const buku = ref([
  {
    "judul": "From Dream to Habits",
    "description": "Jika Anda merasa kesuksesan terjadi karena kebetulan atau keberuntungan semata, Anda tidak perlu membaca buku ini. Buku From Dream to Habits ditulis untuk Anda yang ingin mewujudkan mimpi tanpa terhalang faktor-faktor luar, karena keberhasilan bergantung kepada kesiapan Anda sendiri. Tetapkan mimpi, buat rencana, laksanakan, dan jadikan kebiasaan, maka Anda akan mencapai mimpi demi mimpi, dari yang kecil hingga yang tertinggi. Go beyond your dream. Jika Anda sudah terbiasa mewujudkan mimpi, Anda akan terus maju, menaklukkan satu demi satu tantangan di dunia.",
    "Penulis": "Hasanudin Abdurakhman",
    "jmlHal": 288,
    "categorie": "Motivation & Self-Help",
    "penerbit": "Kepustakaan Populer Gramedia",
    "img": "https://scoopadm.apps-foundry.com/ebook-covers/48650/image_highres/ID_FDH2019MTH08FDH.jpg"
  },
  {
    "judul": "Percakapan Praktis Bahasa Jerman untuk Traveller ",
    "description": "Eropa merupakan benua terpopuler sebagai tujuan studi atau wisata para traveller. Hal utama yang harus dimiliki oleh seorang traveller adalah kemampuan dalam berbahasa. Bahasa Jerman adalah bahasa utama di negara-negara cakupan Eropa—di samping bahasa Inggris. Disebut bahasa utama, karena digunakan oleh penduduk yang tinggal di beberapa negara di Eropa, seperti Jerman, Swiss, Austria, Liechtenstein, Luxemburg, serta di negara-negara yang berbatasan langsung dengan Jerman. Buku ini dibuat untuk Anda pembelajar pemula yang ingin berbicara dalam bahasa Jerman dengan mandiri. Buku ini cocok bagi pembelajar pemula yang memiliki tujuan wisata ataupun sekadar menemui sanak keluarganya di negara Eropa tersebut. Kelebihan dari buku ini adalah pada bentuk percakapan yang tematik. Pada setiap tema akan dipaparkan kata yang berhubungan dengan tema tersebut dalam bahasa Indonesia secara alfabetis dan diterjemahakan ke dalam bahasa Jerman. Semoga buku ini dapat menjadi bagian terpenting hidup Anda, para traveller!",
    "Penulis": "Ifah Janifah",
    "jmlHal": 184,
    "categorie": "Reference & Dictionary",
    "penerbit": "Bhuana Ilmu Populer",
    "img": "https://scoopadm.apps-foundry.com/ebook-covers/48435/image_highres/ID_BJT2019MTH07BJT.jpg"
  },
  {
    "judul": "The Naked Traveler Anthology ",
    "description": "Apa jadinya kalau traveler yang sudah menghabiskan ribuan jam di atas pesawat ternyata menyimpan ketakutan terhadap transportasi udara, seorang polisi yang menemukan bahwa tempat wisata favoritnya adalah lokasi populer untuk bunuh diri, atau traveler yang membayar mahal demi kenyamanan tapi terpaksa tertahan belasan jam di atas pikap pengangkut sapi? Setiap traveler pasti memiliki tantangannya tersendiri dalam menaklukan setiap medan. Jalan terjal yang harus dilalui memang tak pernah sama. Tapi mereka memiliki tekad yang serupa: harus sampai ke tempat tujuan. Pesan itulah yang ingin disampaikan oleh ke-15 traveler dalam buku ini. Latar belakang mereka yang begitu beragam, mulai dari wartawan, penulis novel, peneliti, hingga polisi membuat cerita-cerita yang dituturkan menjadi penuh warna.",
    "Penulis": "Trinity",
    "jmlHal": 237,
    "categorie": "Travel",
    "penerbit": "MIZAN",
    "img": "https://scoopadm.apps-foundry.com/ebook-covers/31760/big_covers/ID_MIZ2016MTH03TNTA_B.jpg"
  },
  {
    "judul": "Value Investing: Beat The Market in Five Minutes!",
    "description": "Warren Buffett, investor legendaris dan salah satu orang terkaya di dunia, dalam seminarnya di tahun 1984 di kampus Columbia Business School, Amerika Serikat, memaparkan tentang kinerja investasi dari tujuh investor saham penganut metode value investing, termasuk dirinya sendiri, yang kesemuanya sukses menghasilkan persentase keuntungan yang secara signifikan di atas rata-rata pasar. Menurut Buffett, ketujuh investor tersebut memiliki gaya investasinya masing-masing yang berbeda satu sama lain, termasuk pilihan sahamnya juga berbeda-beda. Tapi pertanyaannya kemudian, bagaimana kita tahu sebuah saham itu bagus atau jelek? Dan bagaimana caranya untuk menilai apakah harganya mahal, wajar, atau murah? Nah, di buku Value Investing: Beat the Market in Five Minutes! ini, kita akan menjawab semua pertanyaan tersebut secara lugas dan lengkap namun mudah untuk dipahami, berdasarkan pengalaman penulis sebagai value investor itu sendiri. Yup, jadi buku ini tidak sekadar memaparkan teori tentang value investing, melainkan juga contoh-contoh penerapannya dalam berinvestasi di saham. Fakta menariknya adalah, ketika nanti Anda sudah menguasai dan mampu mempraktikkan metode value investing ini dengan baik, maka anda hanya akan perlu bekerja kurang dari 5 menit saja setiap harinya, tapi hasil profi tnya tetap akan luar biasa!",
    "Penulis": "Teguh Hidayat",
    "jmlHal": 258,
    "categorie": "Business & Investing",
    "penerbit": "Elex Media Komputindo",
    "img": "https://scoopadm.apps-foundry.com/ebook-covers/36413/big_covers/ID_EMK2017MTH03VIBTMIFM_B.jpg"
  },
  {
    "judul": "Daun Yang Jatuh Tak Pernah Membenci Angin - Cetak Ulang",
    "description": "Dia bagai malaikat bagi keluarga kami. Merengkuh aku, adikku, dan Ibu dari kehidupan jalanan yang miskin dan nestapa. Memberikan makan, tempat berteduh, sekolah, dan janji masa depan yang lebih baik. Dia sungguh bagai malaikat bagi keluarga kami. Memberikan kasih sayang, perhatian, dan teladan tanpa mengharap budi sekali pun. Dan lihatlah, aku membalas itu semua dengan membiarkan mekar perasaan ini. Ibu benar, tak layak aku mencintai malaikat keluarga kami. Tak pantas. Maafkan aku, Ibu. Perasaan kagum, terpesona, atau entahlah itu muncul tak tertahankan bahkan sejak rambutku masih dikepang dua. Sekarang, ketika aku tahu dia boleh jadi tidak pernah menganggapku lebih dari seorang adik yang tidak tahu diri, biarlah... Biarlah aku luruh ke bumi seperti sehelai daun… daun yang tidak pernah membenci angin meski harus terenggutkan dari tangkai pohonnya.",
    "Penulis": "Tere Liye",
    "jmlHal": 268,
    "categorie": "Teen & Young Adult Fiction",
    "penerbit": "Gramedia Pustaka Utama",
    "img": "https://scoopadm.apps-foundry.com/ebook-covers/33187/big_covers/ID_GPU2016MTH06DYJTPMACU_B.jpg"
  }]);
</script>
