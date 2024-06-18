<template>
        <div class="pt-4">
                <n-space vertical>
                        <n-card :title="`Tabel ${$route.name}`">
                                <template #header-extra>
                                        <n-space class="!gap-1">
                                                <div class="me-1">
                                                        <n-popover trigger="click" placement="bottom-end">
                                                                <template #trigger>
                                                                        <n-button>
                                                                                <n-icon>
                                                                                        <search-icon />
                                                                                </n-icon>
                                                                        </n-button>
                                                                </template>
                                                                <n-input autofocus="true" clearable
                                                                        placeholder="cari disini.."
                                                                        v-model:value="searchBox" />
                                                        </n-popover>
                                                </div>
                                                <div class="hidden md:flex">
                                                        <n-button>
                                                                <template #icon>
                                                                        <n-icon>
                                                                                <download-icon />
                                                                        </n-icon>
                                                                </template>
                                                                <strong class="hidden md:!block">download</strong>
                                                        </n-button>
                                                </div>
                                                <div class="md:hidden">
                                                        <n-button>
                                                                <template #icon>
                                                                        <n-icon>
                                                                                <download-icon />
                                                                        </n-icon>
                                                                </template>
                                                        </n-button>
                                                </div>
                                                <div class="hidden md:flex">
                                                        <n-button type="primary" @click="handleAdd">
                                                                <template #icon>
                                                                        <n-icon>
                                                                                <add-icon />
                                                                        </n-icon>
                                                                </template>
                                                                <strong>tambah</strong>
                                                        </n-button>
                                                </div>
                                                <div class=" md:hidden">
                                                        <n-button type="primary" @click="handleAdd">
                                                                <template #icon>
                                                                        <n-icon>
                                                                                <add-icon />
                                                                        </n-icon>
                                                                </template>
                                                        </n-button>
                                                </div>
                                        </n-space>
                                </template>
                                <n-space vertical :size="12" class="pt-4">
                                        <n-data-table striped :scroll-x="500" size="small" :columns="columns"
                                                :data="showData" :pagination="pagination" />
                                </n-space>
                        </n-card>
                </n-space>
        </div>
</template>
<script setup>
import { ref, onMounted, h } from "vue";
import { useApi } from "../../../helpers/axios";
import { useSearch } from "../../../helpers/searchObject";
import router from '../../../router';
import _ from "lodash";
import { useDialog, useMessage, NDropdown, NIcon, NTag, NButton, rowProps } from "naive-ui";
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
const dataTable = ref([]);

const columns = [
        {
                title: "Tanggal",
                key: "visit_date",
                width: 100,
        },
        {
                title: "Nama",
                key: "nama_debitur",
                fixed: 'left',
                ellipsis: {
                        tooltip: true,
                }
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
                title: "",
                align: "right",
                key: "more",
                fixed: 'left',
                render(row, index) {
                        return h(
                                NDropdown,
                                {
                                        options: options(row),
                                        size: "small",
                                        onSelect: (e) => {
                                                if (e === "hapus") {
                                                        handleConfirm(row, index);
                                                }
                                                if (e === "detail") {
                                                        handleDetail(row);
                                                }
                                                if (e === "edit") {
                                                        handleEdit(row);
                                                }

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

const searchBox = ref();
const statusTag = (e) => {
        let status = e.at(0);
        if (status === "1") {
                return "warning";
        } else if (status === "2") {
                return "info";
        }
        return "info";
}
const statusLabel = (e) => {
        let status = e.at(0);
        if (status === "1") {
                return "menunggu PFK";
        } else if (status === "2") {
                return "pembuatan PFK";
        } else {
                return e.substring(2);
        }

}
const format = (e) => {
        const toNum = parseInt(e);
        return toNum.toLocaleString("en-US");
};
const handleConfirm = (row, index) => {
        dialog.warning({
                title: "Confirm",
                content: "Apakah anda yakin ingin menghapus data ?",
                positiveText: "Ya",
                negativeText: "Batal",
                onPositiveClick: async () => {
                        let userToken = localStorage.getItem("token");
                        const response = await useApi({
                                method: 'DELETE',
                                api: `kunjungan/${row.id}`,
                                token: userToken
                        });
                        if (!response.ok) {
                                message.error("api transaction error");
                        } else {
                                dataTable.value.splice(index, 1);
                                message.success("Data berhasil dihapus");
                        }
                },
                onNegativeClick: () => {
                        message.error("Batal hapus data !");
                }
        });
}
const handleDetail = (evt) => {
        router.replace({ name: 'detail survey', params: { idsurvey: evt.id } });
}
const handleEdit = (evt) => {
        router.replace({ name: 'edit survey', params: { idsurvey: evt.id } });
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
                message.error("sesi berakhir");
                localStorage.removeItem("token");
                router.replace('/');
        } else {
                dataTable.value = response.data.response;
        }
}
onMounted(() => getData());
const showData = computed(() => {
        return useSearch(dataTable.value, searchBox.value);
        // return filterIt(dataTable.value, searchBox.value);
});
const renderIcon = (icon) => {
        return () => {
                return h(NIcon, null, {
                        default: () => h(icon)
                });
        };
};
const options = (e) => {
        let status = e.status.at(0);
        if (status === "1") {
                return [
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
                ]

        } else {
                return [
                        {
                                label: "Detail",
                                key: "detail",
                                icon: renderIcon(DetailIcon)
                        }
                ]
        }
}
const pagination = {
        pageSize: 10
}


</script>