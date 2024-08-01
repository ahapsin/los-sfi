<template>
    <div class="flex md:flex-row flex-col w-full  gap-2">
        <n-form-item label="Brand / Merk" path="provinsi" class="w-full">
            <n-select filterable placeholder="Pilih Provinsi" label-field="name" value-field="id"
                v-model:value="props.provinsi" :options="col_brand" @update:value="provinsiChanged" />
        </n-form-item>
        <n-form-item label="Kota" path="kota" v-show="col_kota || props.kota" class="w-full">
            <n-select filterable :disabled placeholder="Pilih Kab/Kota" label-field="name" value-field="id"
                v-model:value="props.kota" :options="col_kota" @update:value="kotaChanged" />
        </n-form-item>
        <n-form-item label="Kecamatan" path="kecamatan" v-show="col_kec || props.kecamatan" class="w-full">
            <n-select filterable :disabled placeholder="Pilih Kecamatan" label-field="name" value-field="id"
                v-model:value="props.kecamatan" :options="col_kec" @update:value="kecChanged" />
        </n-form-item>
        <n-form-item label="Desa" path="desa" v-show="col_desa || props.desa" class="w-full">
            <n-select filterable :disabled placeholder="Pilih Desa" label-field="name" value-field="id"
                v-model:value="props.desa" :options="col_desa" @update:value="desaChanged" />
        </n-form-item>
    </div>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { useApi } from "../../helpers/axios";

const sel_provinsi = ref('pilih');
const sel_kota = ref('pilih');
const sel_kec = ref('pilih');
const sel_desa = ref('pilih');
const col_brand = ref();
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

const dataBrand = ref([]);

const GetMe = async () => {
    let userToken = localStorage.getItem("token");
    const response = await useApi({
        method: 'GET',
        api: 'taksasi_brand',
        token: userToken
    });
    if (!response.ok) {
        localStorage.removeItem("token");
    } else {
        dataBrand.value = response.data.response;
    }
}
onMounted((GetMe()));
</script>