<template>
    <div class="py-2">
        <n-alert title="Informasi" type="warning">
            keterangan informasi {{ props.param }}
        </n-alert>
    </div>
</template>
<script setup>
const props = defineProps({
    param: String,
})
</script>