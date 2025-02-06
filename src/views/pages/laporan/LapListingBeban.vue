<template>
    <n-card title="laporan Listing Beban">
        <TabListBan :data="dataListBan" :columns="convertObjectToArray(dataListBan)" :load="loadListingBeban"
            :page-size="10" @filter-form="handleRange" />
    </n-card>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useApi } from "../../../helpers/axios";


import {
    useMessage,
} from "naive-ui";


import TabListBan from "./TabListBan.vue";



const message = useMessage();



const convertObjectToArray = (obj) => {
    if (!Array.isArray(obj) || obj.length === 0) {
        return [];
    }
    const keys = Object.keys(obj[0]);
    return keys.map(key => ({ title: key, key: key }));
}



let messageReactive = null;





const dataListBan = ref([]);
const loadListingBeban = ref(false);


const getListBan = async () => {
    messageReactive = message.loading('memuat data listing beban', { duration: 0 });
    loadListingBeban.value = true;
    let userToken = localStorage.getItem("token");
    const response = await useApi({
        method: "GET",
        api: "listBan",
        token: userToken,
    });
    if (!response.ok) {
        message.error('ERROR API');
    } else {
        loadListingBeban.value = false;
        messageReactive.destroy();
        messageReactive = null;
        dataListBan.value = response.data;
    }
}

onMounted(() => getListBan);


</script>
