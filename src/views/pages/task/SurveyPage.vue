<template>
        <div class="pt-4">
                <n-space vertical>
                        <n-card :title="`Tabel ${$route.name}`">
                                <template #header-extra>
                                        <n-space>

                                                <n-input-group>
                                                        <n-input placeholder="cari..." />
                                                        <n-input-group-label>cari</n-input-group-label>
                                                </n-input-group>

                                                <n-button>
                                                        <template #icon>
                                                                <n-icon>
                                                                        <download-icon />
                                                                </n-icon>
                                                        </template>
                                                        download
                                                </n-button>
                                                <n-button type="primary" @click="handleAdd">
                                                        <template #icon>
                                                                <n-icon>
                                                                        <add-icon />
                                                                </n-icon>
                                                        </template>
                                                        tambah
                                                </n-button>
                                        </n-space>
                                </template>
                                <n-space vertical :size="12" class="pt-4">
                                        <n-data-table size="small" :columns="columns" :data="dataTable"
                                                :pagination="pagination" />
                                </n-space>
                        </n-card>
                </n-space>
        </div>
</template>
<script setup>
import { ref, onMounted, h } from "vue";
import { useApi } from "../../../helpers/axios";
import router from '../../../router';
import { useDialog, useMessage, NDropdown, NIcon, NTag, NButton } from "naive-ui";
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
                key: "plafond"
        },
        {
                title: "Status",
                key: "status",
                render(row) {
                        return h(
                                NTag,
                                {
                                        type: statusTag(row.status),
                                        size: "small",
                                },
                                { default: () => statusLabel(row.status) }
                        );
                }
        }, {
                title: "",
                align: "right",
                key: "more",
                render(row) {
                        return h(
                                NDropdown,
                                {
                                        options: options,
                                        size: "small",
                                        onSelect: (e) => {
                                                if (e === "hapus") {
                                                        handleConfirm(row);
                                                }
                                                if (e === "detail") {
                                                        handleDetail(row);
                                                }
                                                console.log(e);
                                                handleSelect(row.id);
                                        },
                                },
                                {
                                        default: h(NButton, {
                                                size: "small",
                                        }, { default: () => 'Action' })
                                }
                        );
                }
        }
];

const statusTag = (e) => {
        let status = e.at(0);
        if (status === "1") {
                return "success";
        } else if (status === "2") {
                return "info";
        }

}
const statusLabel = (e) => {
        let status = e.at(0);
        if (status === "1") {
                return "survey disetujui";
        } else if (status === "2") {
                return "pembuatan PFK";
        }

}
const handleSelect = (e) => console.log(e);
const statusHandle = (e) => console.log(e);
const handleConfirm = (evt) => {
        dialog.warning({
                title: "Confirm",
                content: "Apakah anda yakin ingin menghapus data ?",
                positiveText: "Ya",
                negativeText: "Batal",
                onPositiveClick: async () => {
                        let userToken = localStorage.getItem("token");
                        const response = await useApi({
                                method: 'DELETE',
                                api: `kunjungan/${evt.id}`,
                                token: userToken
                        });
                        if (!response.ok) {
                                message.error("api transaction error");
                        } else {
                                dataTable.value.splice(evt, 1);
                                message.success("Data berhasil dihapus");
                        }

                },
                onNegativeClick: () => {
                        message.error("Batal hapus data !");
                }
        });
}
const handleDetail = (evt) => {
        console.log(evt);
        console.log("mau cek detail");
}
const handleAdd = () => {
        router.push('/task/new-survey');
}
const getData = async () => {
        let userToken = localStorage.getItem("token");
        const response = await useApi({
                method: 'GET',
                api: 'kunjungan',
                token: userToken
        });
        if (!response.ok) {
                message.error("error patch data");
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