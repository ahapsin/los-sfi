<template>
        <n-space vertical class="pt-4">
                <n-steps :current="current" :status="currentStatus">
                        <n-step title="Informasi Order" />
                        <n-step title="Data Pelanggan" />
                        <n-step title="Data Jaminan" />
                        <n-step title="Data Survey" />
                </n-steps>
        </n-space>
        <n-flex class="pt-4">
                <n-card title="Card">
                        <n-form ref="formRef" :model="model" :rules="rules" label-placement="left"
                                require-mark-placement="right-hanging" :size="size" label-width="auto">
                                <n-form-item label="Input" path="inputValue">
                                        <n-input placeholder="Input" />
                                </n-form-item>
                                <n-form-item label="Textarea" path="textareaValue">
                                        <n-input placeholder="Textarea" type="textarea" :autosize="{
                                                minRows: 3,
                                                maxRows: 5
                                        }" />
                                </n-form-item>
                                <n-form-item label="Select" path="selectValue">
                                        <n-select placeholder="Select" :options="generalOptions" />
                                </n-form-item>
                                <n-form-item>
                                        <upload-wall />
                                </n-form-item>
                        </n-form>
                </n-card>
                <n-flex justify="between">

                        <n-button @click="prev" type="secondary">
                                <template #icon>
                                        <n-icon>
                                                <arrow-back />
                                        </n-icon>
                                </template>
                                kembali
                        </n-button>
                        <n-button @click="next" type="primary">
                                <template #icon>
                                        <n-icon>
                                                <arrow-forward />
                                        </n-icon>
                                </template>
                                Selanjutnya
                        </n-button>
                </n-flex>
        </n-flex>
</template>

<script setup>
import { ref } from "vue";
import { ArrowBackOutlined as ArrowBack, ArrowForwardOutlined as ArrowForward } from "@vicons/material";
const current = ref(1);
const currentStatus = ref("process");
const next = () => current.value += 1;
const prev = () => current.value -= 1;
const generalOptions = ["groode", "veli good", "emazing", "lidiculous"].map(
        (v) => ({
                label: v,
                value: v
        }));
</script>