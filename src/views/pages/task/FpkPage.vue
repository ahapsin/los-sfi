<template>
    <div class="pt-4">
        <n-space vertical>
            <!-- {{ dataTable }} -->
            <n-card :title="`Tabel ${$route.name}`">
                <template #header-extra>
                    <n-space>
                        <n-popover trigger="click" placement="bottom-end">
                            <template #trigger>
                                <n-button>
                                    <n-icon>
                                        <search-icon />
                                    </n-icon>
                                </n-button>
                            </template>
                            <n-input autofocus="true" clearable placeholder="cari disini.." />
                        </n-popover>
                        <n-button>
                            <template #icon>
                                <n-icon>
                                    <download-icon />
                                </n-icon>
                            </template>
                            download
                        </n-button>
                        <!-- <n-button type="primary" @click="handleAdd">
                            <template #icon>
                                <n-icon>
                                    <add-icon />
                                </n-icon>
                            </template>
                            tambah
                        </n-button> -->
                    </n-space>
                </template>
                <n-space vertical :size="12" class="pt-4">
                    <n-data-table size="small" :columns="columns" :data="dataTable" :pagination="pagination" />
                </n-space>
            </n-card>
        </n-space>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { useApi } from "../../../helpers/axios";
import router from '../../../router';
import { useDialog, useMessage, NIcon, NTag, NButton } from "naive-ui";
import {
    AddCircleOutlineRound as AddIcon,
    SearchOutlined as SearchIcon,
    FileDownloadOutlined as DownloadIcon,

} from "@vicons/material"
import {
    EditOutlined as EditIcon,
    DeleteOutlined as DeleteIcon,
    MoreVertRound as MoreIcon,
    ListAltOutlined as DetailIcon
} from "@vicons/material";


const message = useMessage();
const dialog = useDialog();
const dataTable = ref();
const loadingRef = reactive({
    type: "loading",
    messagePost: null,
});
const userToken = localStorage.getItem("token");

const columns = [
    {
        title: "Tanggal",
        key: "visit_date"
    },
    {
        title: "Nama",
        key: "nama_debitur"
    },
    {
        title: "Plafond",
        key: "plafond",
        render(row) {
            return h('div', format(row.plafond));
        }
    },
    {
        title: "Status",
        key: "status",
        render(row) {
            return h(
                NTag,
                {
                    bordered: false,
                    type: statusTag(row.status),
                    size: "small",
                },
                { default: () => statusLabel(row.status) }
            );
        }
    }, {
        title: "Action",
        align: "right",
        key: "more",
        render(row) {
            return h(
                NButton,
                {
                    type: typeAction(row.status),
                    size: "tiny",
                    onClick: (e) => {
                        handleAction(row.status, row)
                    },
                },
                {
                    default: () => actionLabel(row.status)
                }
            );
        }
    }
];

const statusTag = (e) => {
    let status = e.at(0);
    if (status === "1") {
        return "warning";
    } else if (status === "2") {
        return "info";
    }
    return "warning";

}
const statusLabel = (e) => {
    let status = e.at(0);
    // if (status === "1") {
    //     return "menunggu PFK";
    // } else if (status === "2") {
    //     return "pembuatan PFK";
    // }
    return e.substring(2);
}
const typeAction = (e) => {
    let status = e.at(0);
    if (status === "1") {
        return "warning";
    } else if (status === "2") {
        return "info";
    }
    return "info";
}
const actionLabel = (e) => {
    let status = e.at(0);
    if (status === "1") {
        return "Buat PFK";
    } else if (status === "2") {
        return "Update PFK";
    }
    return "lihat FPK";

}
const format = (e) => {
    const toNum = parseInt(e);
    return toNum.toLocaleString("en-US");
};
const handleSelect = (e) => console.log(e);
const handleAction = (e, data) => {
    let status = e.at(0);
    const dynamicBody = {
        cr_prospect_id: data.id
    }
    if (status === "1") {
        message.create('membuat FPK, silakan tunggu !', { type: loadingRef.type });
        useApi({
            method: 'POST',
            data: dynamicBody,
            api: `cr_application_generate`,
            token: userToken,
        }).then((res) => {
            if (res.ok) {
                message.success('FPK berhsil dibuat');
                router.replace({ name: 'Form Pengajuan Kredit', params: { idapplication: data.id } });
            } else {
                message.error('FPK gagal dibuat!')
            }
        });
    } else if (status === "2") {
        router.replace({ name: 'Form Pengajuan Kredit', params: { idapplication: data.id } });
    } else {
        router.replace({ name: 'Detail Pengajuan Kredit', params: { idapplication: data.id } });
    }
};
const handleDetail = (evt) => {
    console.log(evt);
    console.log("mau cek detail");
}
const handleAdd = () => {
    router.push('/task/new-survey');
}
const getData = async () => {

    const response = await useApi({
        method: 'GET',
        api: 'kunjungan_admin',
        token: userToken
    });
    if (!response.ok) {
        message.error("sesi berakhir");
        localStorage.removeItem("token");
        router.replace('/');
    } else {
        dataTable.value = response.data.response;
    }
}
const renderIcon = (icon) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon)
        });
    };
};
const options = [
    {
        label: "Edit",
        key: "edit",
        icon: renderIcon(EditIcon),
    },
    {
        label: "Hapus",
        key: "hapus",
        icon: renderIcon(DeleteIcon)
    },
    {
        label: "Detail",
        key: "detail",
        icon: renderIcon(DetailIcon)
    }
];
const pagination = {
    pageSize: 10
}

onMounted(() => getData());
</script>