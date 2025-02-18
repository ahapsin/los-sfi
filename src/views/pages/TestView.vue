<template>
    <n-progress type="line" :percentage="10" indicator-placement="inside" processing />
    <n-alert v-if="noInvoice.length > 1">{{ noInvoice.length }}</n-alert>
    <n-input type="textarea" placeholder="Autosizable" :autosize="{
        minRows: 3,
    }" v-model:value="textArea"/>
    <n-button type="success" @click="eksekusi">PROSES LAH YA</n-button>
</template>
<script setup>
import { useMessage } from 'naive-ui';
import { useApi } from '../../helpers/axios';

const message = useMessage();
const textArea = ref();
const noInvoice = computed(()=>{
    return textArea.value.split(',').map(item=>item.trim());
});
const eksekusi = async () => {
    for (let invoice of noInvoice) {
        const response = await useApi({
            method: "POST",
            api: "welcome",
            data: {
                "no_invoice": invoice,
                "tipe": "angsuran"
            },
        });
        if (!response.ok) {
            message.error('ERROR API');
        } else {
            message.success(invoice);
        }
    }
}

</script>
