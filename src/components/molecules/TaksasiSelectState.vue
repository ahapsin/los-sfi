<template>

    <div class="flex flex-col w-full  gap-2">
        <n-form-item label="Brand / Merk" path="provinsi" class="w-full" value-field="value" label-field="label">
            <n-select filterable placeholder="Pilih Brand" v-model:value="props.brand" :options="col_brand"
                @update:value="brandChanged" :loading="loadingBrand" />
        </n-form-item>
        <n-form-item label="Tipe" path="Tipe" class="w-full">
            <n-select filterable :disabled placeholder="Pilih Tipe" label-field="label" value-field="value"
                v-model:value="props.tipe" :options="filter_tipe" @update:value="tipeChanged" :loading="loadingTipe" />
        </n-form-item>
        <n-form-item label="Tahun" path="tahun" class="w-full">
            <n-select filterable :disabled placeholder="Pilih Tahun" label-field="label" value-field="value"
                v-model:value="props.tahun" :options="col_tahun" @update:value="tahunChanged" :loading="loadingTipe" />
        </n-form-item>
        <n-form-item label="Harga Pasar" path="pasar" class=" w-full">
            <n-input v-model:value="price" placeholder="Harga Pasar" readonly :parse="parse" :format="format" />
        </n-form-item>
    </div>

</template>

<script setup>
import { onMounted, ref } from "vue";
import _ from "lodash";
import { useApi } from "../../helpers/axios";

const sel_brand = ref('pilih');
const sel_tipe = ref('pilih');
const sel_tahun = ref('pilih');

const loadingBrand = ref(false);
const col_brand = ref([]);
const col_tipe = ref([]);
const filter_tipe = ref([]);

const loadingTipe = ref(false);
const col_tahun = ref();
const price = ref();


const emit = defineEmits(['update:brand', 'update:tipe', 'update:tahun', 'update:price']);
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
    brand: {
        type: String,
    },
    tipe: {
        type: String,
    },
    tahun: {
        type: String,
    },
    pasar: {
        type: String,
    },
    loop: {
        type: [Number, Boolean]
    }
});



const getBrand = async () => {
    loadingBrand.value = true;

    let userToken = localStorage.getItem("token");
    const response = await useApi({
        method: 'GET',
        api: 'taksasi_brand',
        token: userToken
    });
    if (!response.ok) {
        localStorage.removeItem("tokens");
    } else {
        loadingBrand.value = false;
        let resBrand = response.data.brand;
        col_brand.value = resBrand.map((v, i) => ({
            label: v,
            value: v,
        }));
    }
}

const brandChanged = async (value, option) => {
    sel_tipe.value = [];
    let userToken = localStorage.getItem("token");
    emit('update:brand', option.value);
    loadingTipe.value = true;
    const bodyData = {
        merk: option.value,
    }
    const response = await useApi({
        method: 'POST',
        api: 'taksasi_code_model',
        data: bodyData,
        token: userToken
    });
    if (!response.ok) {
        localStorage.removeItem("tokens");
    } else {
        loadingTipe.value = false;
        col_tipe.value = response.data;
        filter_tipe.value = col_tipe.value.map((v, i) => ({
            label: `${v.code} - ${v.model}`,
            value: v.code,
        }));
    }
};

const tipeChanged = async (value, option) => {
    let tahunOpt = _.filter(col_tipe.value, {
        'code': option.value,
    });
    price.value = [];
    emit('update:tipe', option.value);
    sel_tipe.value = option.value;
    let tahunAvailable = tahunOpt[0].tahun;
    col_tahun.value = tahunAvailable.map((v, i) => ({
        label: v,
        value: v,
    }));
}
const tahunChanged = async (value, option) => {
    price.value = [];
    let userToken = localStorage.getItem("token");
    loadingTipe.value = true;
    emit('update:tahun', option.value);
    const bodyData = {
        code: sel_tipe.value,
        tahun: option.value,
    }
    const response = await useApi({
        method: 'POST',
        api: 'taksasi_price',
        data: bodyData,
        token: userToken
    });
    if (!response.ok) {
        localStorage.removeItem("tokens");
    } else {
        loadingTipe.value = false;
        let getPrice = response.data[0].price;
        price.value = getPrice.toLocaleString("en-US");
        emit('update:price', getPrice);
    }
};
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
onMounted(() => getBrand())
</script>