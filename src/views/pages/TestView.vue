<script setup>
import { usePDF } from 'vue3-pdfmake';

const pdfmake = usePDF({
    autoInstallVFS: true
})

const onGenPDF = () => {
    pdfmake.createPdf({
        content: [
            'Hello World From PDFMake!',
        ]
    }).open();
}
</script>

<template>
    <button @click="onGenPDF">Click here for download demo pdf</button>
</template>