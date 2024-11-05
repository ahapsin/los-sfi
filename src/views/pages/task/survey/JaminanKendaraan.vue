<!-- eslint-disable vue/valid-define-emits -->
<!-- eslint-disable vue/valid-define-emits -->
<template>
    <div class="pb-2" v-if="jaminan.tahun && tahunJaminanValidate >= 10">
        <n-alert type="warning">usia kendaraan {{ tahunJaminanValidate }} tahun</n-alert>
    </div>
    <div>
        <taksasi-select-state v-model:brand="jaminan.merk" v-model:tipe="jaminan.tipe" v-model:tahun="jaminan.tahun"
            v-model:pasar="jaminan.nilai" />
    </div>
    <n-form ref="formJaminan" :model="jaminan" require-mark-placement="right-hanging">
        <div class="md:flex gap-2">
            <n-form-item label="No Polisi" path="no_polisi" class="w-full">
                <n-input placeholder="No Polisi" @input="upCase" v-model:value="jaminan.no_polisi" />
            </n-form-item>
            <n-form-item label="Warna" path="warna" class="w-full">
                <n-input placeholder="warna" v-model:value="jaminan.warna" />
            </n-form-item>
            <n-form-item label="Tanggal Berlaku STNK" path="tgl_stnk" class="w-full">
                <n-date-picker placeholder="Tanggal Berlaku STNK" v-model:formatted-value="jaminan.tgl_stnk"
                    value-format="yyyy-MM-dd" format="dd-MM-yyyy" type="date" class="w-full" />
            </n-form-item>
        </div>
    </n-form>
</template>
<script setup>
import { computed, reactive } from 'vue';

const props = defineProps({
    def_data: Object,
});

const jaminan = reactive(props.def_data ? props.def_data.atr : {});
const tahunJaminanValidate = computed(() => {
      let tahun = new Date().getFullYear();
      let diff = tahun - jaminan.tahun;
      return diff;
});
// eslint-disable-next-line vue/valid-define-emits
const emit = defineEmits();
emit('childData', jaminan);
const upCase = () => {
    jaminan.no_polisi = jaminan.no_polisi.toUpperCase();
    jaminan.warna = jaminan.warna.toUpperCase();
};
</script>
