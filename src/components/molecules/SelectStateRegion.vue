<template>
    <div class="flex md:flex-row flex-col w-full  gap-2">
        <n-form-item label="Provinsi" path="provinsi" class="w-full">
            <n-select filterable placeholder="Pilih Provinsi" label-field="text" value-field="id"
                v-model:value="props.provinsi" :options="col_provinsi" @update:value="provinsiChanged" />
        </n-form-item>
        <n-form-item label="Kota" path="kota"  class="w-full">
            <n-select filterable placeholder="Pilih Kab/Kota" label-field="text" value-field="id"
                v-model:value="props.kota" :options="col_kota" @update:value="kotaChanged" />
        </n-form-item>
        <n-form-item label="Kecamatan" path="kecamatan" class="w-full">
            <n-select filterable placeholder="Pilih Kecamatan" label-field="text" value-field="id"
                v-model:value="props.kecamatan" :options="col_kec" @update:value="kecChanged" />
        </n-form-item>
        <n-form-item label="Desa" path="desa" class="w-full">
            <n-select filterable placeholder="Pilih Desa" label-field="text" value-field="id"
                v-model:value="props.desa" :options="col_desa" @update:value="desaChanged" />
        </n-form-item>
        <n-form-item label="Kode Pos" path="kodepos"  class="w-full">
            <n-select filterable placeholder="Pilih Kodepos" label-field="text" value-field="id"
                v-model:value="props.kodepos" :options="col_kodepos" @update:value="kodeposChanged" />
        </n-form-item>
    </div>

</template>

<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import { useOpenAPIget } from "../../helpers/axios";

const sel_provinsi = ref('pilih');
const sel_kota = ref('pilih');
const sel_kec = ref('pilih');
const sel_desa = ref('pilih');
const col_provinsi = ref();
const col_kota = ref();
const col_kec = ref();
const col_desa = ref();
const col_kodepos = ref();

const emit = defineEmits(['update:provinsi', 'update:kota', 'update:kecamatan', 'update:desa', 'update:kodepos']);
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
    kodepos: {
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
        let getKota = await axios.get(`https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${value}`);
        col_kota.value = getKota.data.result;
        emit('update:provinsi', option.name);
    } catch (error) {
        console.log(error);
    }
};
const kotaChanged = async (value, option) => {
    sel_kota.value = value;
    try {
        let getKec = await axios.get(`https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${value}`);
        col_kec.value = getKec.data.result;
        emit('update:kota', option.name);
    } catch (error) {
        console.log(error);
    }
};
const kecChanged = async (value, option) => {
    sel_kec.value = value;
    try {
        let getKec = await axios.get(`https://alamat.thecloudalert.com/api/kelurahan/get/?d_kecamatan_id=${value}`);
        col_desa.value = getKec.data.result;
        emit('update:kecamatan', option.name);
    } catch (error) {
        console.log(error);
    }
};
const desaChanged = async (value, option) => {
    sel_desa.value = value;
    try {
        let getKodepos =await  axios.get(`https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${sel_kota.value}&d_kecamatan_id=${sel_kec.value}`);
        col_kodepos.value = getKodepos.data.result;
        emit('update:desa', option.name);
    } catch (error) {
        console.log(error);
    }

};
const kodeposChanged = (value, option) => {
    // console.log(option.name);
    emit('update:kodepos', option.name);
};

useOpenAPIget("https://alamat.thecloudalert.com/api/provinsi/get/").then(([res]) => { col_provinsi.value = res.result });

</script>
