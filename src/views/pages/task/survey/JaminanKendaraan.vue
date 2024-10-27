<template>
    <div>

        <taksasi-select-state v-model:brand="jaminan.merk" v-model:tipe="jaminan.tipe" v-model:tahun="jaminan.tahun"
            v-model:pasar="jaminan.nilai" />
    </div>
    <n-form ref="formJaminan" :model="jaminan" :rules="rulesJaminan" require-mark-placement="right-hanging">
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
        <n-divider title-placement="left"> Upload Dokumen Jaminan </n-divider>
        <div class="flex flex-col md:flex-row gap-2">
            <file-upload title="No Rangka" endpoint="image_upload_prospect" type="no_rangka" :idapp="dynamicForm.id" />
            <file-upload title="No Mesin" endpoint="image_upload_prospect" type="no_mesin" :idapp="dynamicForm.id" />
            <file-upload title="STNK" endpoint="image_upload_prospect" type="stnk" :idapp="dynamicForm.id" />
        </div>
        <n-divider title-placement="left"> Upload Jaminan </n-divider>
        <n-space>
            <file-upload title="Depan" endpoint="image_upload_prospect" type="depan" :idapp="dynamicForm.id" />
            <file-upload title="Belakang" endpoint="image_upload_prospect" type="belakang" :idapp="dynamicForm.id" />
            <file-upload title="Kanan" endpoint="image_upload_prospect" type="kanan" :idapp="dynamicForm.id" />
            <file-upload title="Kiri" endpoint="image_upload_prospect" type="kiri" :idapp="dynamicForm.id" />
        </n-space>
    </n-form>
</template>
<script setup>
import { reactive } from 'vue';



const jaminan = reactive({
    status_jaminan: null,
    merk: null,
    tipe: null,
    tahun: null,
    warna: null,
    atas_nama: null,
    no_polisi: null,
    no_rangka: null,
    no_mesin: null,
    no_bpkb: null,
    nilai: null,
});
const emit = defineEmits();
emit('childData', jaminan);
const dynamicForm=ref({id:"1"});
</script>
