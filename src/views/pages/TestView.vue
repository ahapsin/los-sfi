<template>
    <select-state-region v-model:provinsi="pelanggan.provinsi" v-model:kota="pelanggan.kota"
        v-model:kecamatan="pelanggan.kecamatan" v-model:desa="pelanggan.kelurahan" v-model:kodepos="pelanggan.kodepos" />
</template>
<script setup>
import {reactive} from 'vue';
const pelanggan=reactive({
    provinsi:null,
    kota:null,
    kecamatan:null,
    kelurahan:null,
    kodepos:null,
})
</script>
