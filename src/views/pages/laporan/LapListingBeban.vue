<template>
    <n-card title="Laporan Listing Beban" :segmented="true">
        <TabListBan :data="dataListBan" :columns="convertObjectToArray(dataListBan)" :load="loadListingBeban"
            :page-size="10" @filter-form="handleRange" />
    </n-card>
</template>
<script setup>
import TabListBan from "./TabListBan.vue";
const convertObjectToArray = (obj) => {
    if (!Array.isArray(obj) || obj.length === 0) {
        return [];
    }
    const keys = Object.keys(obj[0]);
    return keys.map(key => ({ title: key, key: key }));
}
</script>
