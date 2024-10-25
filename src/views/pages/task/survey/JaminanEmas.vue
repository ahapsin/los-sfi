<template>
    <n-form ref="formJaminan" :model="jaminan" :rules="rulesJaminan" require-mark-placement="right-hanging">
        <div class="md:grid md:grid-cols-2 gap-2">
            <n-form-item label="Status Jaminan" path="status" class="w-full">
                <n-select filterable placeholder="Pilih Status"  
                    />
            </n-form-item>
            <n-form-item label="Kode Emas" path="no_billyet" class="w-full">
                <n-input placeholder="Kode Emas" @input="upCase" v-model:value="jaminan.no_polisi" />
            </n-form-item>
            <n-form-item label="Berat" path="no_billyet" class="w-full">
                <n-input placeholder="Kode Emas" @input="upCase" v-model:value="jaminan.no_polisi">
                    <template #suffix> gram</template>
                </n-input>
            </n-form-item>
            <n-form-item label="Nominal" path="lokasi" class="w-full">
                <n-input placeholder="Nominal" @input="upCase" v-model:value="jaminan.no_polisi" >
                </n-input>
            </n-form-item>
            <n-form-item label="Atas Nama" path="lokasi" class="w-full">
                <n-input placeholder="atas nama" @input="upCase" v-model:value="jaminan.no_polisi" />
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