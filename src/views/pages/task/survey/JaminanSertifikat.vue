<template>
    <n-form ref="formJaminan" :model="jaminan" :rules="rulesJaminan" require-mark-placement="right-hanging">
        <div class="md:grid md:grid-cols-2 gap-2">
            <n-form-item label="Status Jaminan" path="status" class="w-full">
                <n-select filterable placeholder="Pilih Status"  
                    />
            </n-form-item>
            <n-form-item label="No Sertifikat" path="no_sertifikat" class="w-full">
                <n-input placeholder="No Polisi" @input="upCase" v-model:value="jaminan.no_polisi" />
            </n-form-item>
            <n-form-item label="Status Kepemilikan" path="Kepemilikan" class="w-full">
                <n-input placeholder="Kepemilikan" @input="upCase" v-model:value="jaminan.no_polisi" />
            </n-form-item>
            <n-form-item label="IMB" path="imb" class="w-full">
                <n-input placeholder="No Polisi" @input="upCase" v-model:value="jaminan.no_polisi" />
            </n-form-item>
            <n-form-item label="Luas Tanah" path="luas tanah" class="w-full">
                <n-input placeholder="Luas Tanah" @input="upCase" v-model:value="jaminan.no_polisi" >
                    <template #suffix>
                        m2
                    </template>
                </n-input>
            </n-form-item>
            <n-form-item label="Luas Bangunan" path="luas tanah" class="w-full">
                <n-input placeholder="Luas Tanah" @input="upCase" v-model:value="jaminan.no_polisi" >
                    <template #suffix>
                        m2
                    </template>
                </n-input>
            </n-form-item>
            <n-form-item label="Lokasi" path="lokasi" class="w-full">
                <n-input placeholder="lokasi" @input="upCase" v-model:value="jaminan.no_polisi" />
            </n-form-item>
            <component :is="SelectStateRegion"/>
            <n-form-item label="Atas Nama" path="lokasi" class="w-full">
                <n-input placeholder="atas nama" @input="upCase" v-model:value="jaminan.no_polisi" />
            </n-form-item>
            <n-form-item label="Nilai Jaminan" path="lokasi" class="w-full">
                <n-input placeholder="Nilai Jaminan" @input="upCase" v-model:value="jaminan.no_polisi" >

                </n-input>
            </n-form-item>
        </div>
       
    </n-form>
</template>
<script setup>
import { ref } from 'vue';
import SelectStateRegion from '../../../../components/molecules/SelectStateRegion.vue';
const jaminan = ref([]);
const dynamicForm = ref({ id: "1" });
</script>