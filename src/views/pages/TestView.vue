<!-- <template>
    <n-space>
        <n-form-item label="pokok pembayaran">
            <n-input v-model:value="param.pokok" />
        </n-form-item>
        <n-form-item label="suku bunga">
            <n-input v-model:value="param.suku_bunga" />
        </n-form-item>
        <n-form-item label="jangka waktu">
            <n-input v-model:value="param.jangka_waktu" />
        </n-form-item>
        <n-form-item label="angsuran pokok + bunga">
            <n-input v-model:value="param.angsuran" />
        </n-form-item>
        <n-form-item label="total bunga">
            <n-input v-model:value="param.total_bunga" />
        </n-form-item>
        <n-form-item label="suku bunga konversi">
            <n-input v-model:value="param.konversi" />
        </n-form-item>
        <n-form-item label="bunga setahun">
            <n-input v-model:value="param.bunga_tahun" />
        </n-form-item>
    </n-space>
    <n-divider />
    {{ skema }}
</template> -->
<template>
    <pre>{{ param }}</pre>
</template>
<script setup>
import { reactive } from "vue";
const param = reactive({
    pokok_pinjaman: 94240521.35,
    angsuran: 2905749,
    jangka_waktu: 48,
    total_bunga: 45235450,
    konversi: 1.7294689500,
    bunga_tahun: 20.75362740,
})
const skema = ref([
]);
for (let i = 1; i <= param.jangka_waktu; i++) {

    // cari bunga 
    var bunga;
    var pokok;
    var total_angsuran;
    console.log(skema.value[i])
    if (!skema.value[i]) {
        bunga = Math.round(param.pokok_pinjaman * param.konversi);
        pokok = null;
        total_angsuran = null;
    } else {
        bunga = null;
        // console.log(skema.value)
        // if (!skema.value[i + 1]) {
        //     pokok = param.pokok_pinjaman;
        //     console.log(skema.value)
        //     // total_angsuran = skema.value[i].pokok + skema.value[i].bunga;
        // } else {
        //     // total_angsuran = param.angsuran;
        // }
    }

    // angsuran
    if (!skema.value[i + 1]) {

    }
    // console.log(`bunga ${bunga}`);
    // const total_angsuran = Math.round(param.pokok_pinjaman * param.konversi);

    let data = {
        ke: i,
        pokok: pokok,
        bunga: bunga,
        total_angsuran: total_angsuran,
        baki_debet: 92964632
    }
    let ada = skema.value;
    ada.push(data);
    // ada.push(data);
    // console.log(skema.value);
}
</script>
