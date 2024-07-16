<template>
    <n-form-item label="Provinsi" path="provinsi">
        <n-select filterable placeholder="Pilih Provinsi" label-field="name" value-field="id"
            v-model:value="props.provinsi" :options="col_provinsi" @update:value="provinsiChanged" />
    </n-form-item>
    <n-form-item label="Kota" path="kota" v-show="col_kota">
        <n-select filterable :disabled placeholder="Pilih Kab/Kota" label-field="name" value-field="id"
            v-model:value="props.kota" :options="col_kota" @update:value="kotaChanged" />
    </n-form-item>
    <n-form-item label="Kecamatan" path="kecamatan" v-show="col_kec">
        <n-select filterable :disabled placeholder="Pilih Kecamatan" label-field="name" value-field="id"
            v-model:value="props.kecamatan" :options="col_kec" @update:value="kecChanged" />
    </n-form-item>
    <n-form-item label="Desa" path="desa" v-show="col_desa">
        <n-select filterable :disabled placeholder="Pilih Desa" label-field="name" value-field="id"
            v-model:value="props.desa" :options="col_desa" @update:value="desaChanged" />
    </n-form-item>

</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useOpenAPIget } from "../../helpers/axios";

const sel_provinsi = ref('pilih');
const sel_kota = ref('pilih');
const sel_kec = ref('pilih');
const sel_desa = ref('pilih');
const col_provinsi = ref();
const col_kota = ref();
const col_kec = ref();
const col_desa = ref();

const emit = defineEmits(['update:provinsi', 'update:kota', 'update:kecamatan', 'update:desa']);
const props = defineProps({
    label: {
        type: [String, Boolean],
        default: false,
    },
    error: {
        type: [String, Boolean],
        default: false,
    },
    active: {
        type: Boolean,
    },
    options: {
        type: Object,
    },
    provinsi: {
        type: String,
    },
    kota: {
        type: String,
    },
    kecamatan: {
        type: String,
    },
    desa: {
        type: String,
    },
    loop: {
        type: [Number, Boolean]
    }
});
const dataAlamat = reactive({
    provinsi: props.kota,
});
const provinsiChanged = async (value, option) => {
    try {
        console.log(props.kota);
        console.log(dataAlamat);
        let getKota = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${value}.json`);
        col_kota.value = getKota.data;

        emit('update:provinsi', option.name);
    } catch (error) {
        console.log(error);
    }
};
const kotaChanged = async (value, option) => {

    try {
        let getKec = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${value}.json`);
        col_kec.value = getKec.data;
        emit('update:kota', option.name);
    } catch (error) {
        console.log(error);
    }
};
const kecChanged = async (value, option) => {
    try {
        let getKec = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${value}.json`);
        col_desa.value = getKec.data;
        emit('update:kecamatan', option.name);
    } catch (error) {
        console.log(error);
    }
};
const desaChanged = (value, option) => {
    // console.log(option.name);
    emit('update:desa', option.name);
};

const getProvinsi = useOpenAPIget("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json").then(([res]) => { col_provinsi.value = res; });

</script>