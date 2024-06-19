<template>
    <div class="pt-4">
        <n-space vertical>
            <n-card :title="`Tabel ${$route.name}`" class="bg-white">
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
                                <n-input autofocus="true" clearable placeholder="cari disini.."
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

                    </n-space>
                </template>
                <n-space vertical :size="12" class="pt-4">
                    <n-data-table size="small" :columns="columns" :data="showData" :pagination="pagination" ellipsis />
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
const dataTable = ref([]);
const searchBox = ref();

const columns = [
    {
        title: "Cabang",
        key: "cabang"
    },
    {
        title: "AO",
        key: "nama_ao"
    },
    {
        title: "Nama Debitur",
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
        title: "Tenor",
        key: "tenor"
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
                { default: () => row.status }
            );
        }
    }, {
        title: "",
        align: "right",
        key: "more",
        render(row) {
            return h(NButton, {
                size: "small",
                onClick: (e) => {
                    handelAction(row);
                },
            }, { default: statusHandle(row) });
        }
    }
];

const format = (e) => {
    const toNum = parseInt(e);
    return toNum.toLocaleString("en-US");
};
const statusTag = (e) => {
    let status = e.at(0);
    if (status === "1" || status === "2") {
        return "warning";
    } else if (status === "3") {
        return "success";
    }
}
const statusLabel = (e) => {
    let status = e.at(0);
    if (status === "0") {
        return "DRAFT";
    } else if (status === "1") {
        return "waiting KAPOS";
    } else if (status === "2") {
        return "waiting HO";
    } else if (status === "3") {
        return "APPROVED HO";
    } else if (status === "4") {
        return "REJECT HO";
    } else if (status === "5") {
        return "CLOSED HO";
    } else if (status === "6") {
        return "CLOSED KAPOS";
    }
}
const statusHandle = (e) => {
    if (e.status.at(0) == 2) {
        return "periksa";
    } else
        if (e.status.at(0) == 7) {
            return "periksa";
        } else {
            return "lihat";
        }
};
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
        api: 'fpk_ho',
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

const handelAction = (e) => {
    if (e.status.at(0) == 2) {
        router.replace({ name: 'Konfirmasi HO Pengajuan Kredit', params: { idapplication: e.id } });
    } else if (e.status.at(0) == 7) {
        router.replace({ name: 'Konfirmasi HO Pengajuan Kredit', params: { idapplication: e.id } });
    } else {
        router.replace({ name: 'Detail Pengajuan Kredit', params: { idapplication: e.id } });
    }
    // let status = e.at(0);
    // const dynamicBody = {
    //     cr_prospect_id: data.id
    // }
    // if (status === "1") {
    //     message.create('membuat FPK, silakan tunggu !', { type: loadingRef.type });
    //     useApi({
    //         method: 'POST',
    //         data: dynamicBody,
    //         api: `cr_application_generate`,
    //         token: userToken,
    //     }).then((res) => {
    //         if (res.ok) {
    //             message.success('FPK berhsil dibuat');
    //             router.replace({ name: 'Form Pengajuan Kredit', params: { idapplication: data.id } });
    //         } else {
    //             message.error('FPK gagal dibuat!')
    //         }
    //     });
    // } else {
    // router.replace({ name: 'Form Pengajuan Kredit', params: { idapplication: data.id } });
    // }
};
const pagination = {
    pageSize: 10
}

onMounted(() => getData());
const showData = computed(() => {
    return useSearch(dataTable.value, searchBox.value);
    // return filterIt(dataTable.value, searchBox.value);
});
</script>