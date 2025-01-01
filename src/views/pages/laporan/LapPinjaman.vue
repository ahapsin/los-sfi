<template>
  <div>
    <n-space vertical>
      <n-card :title="`Laporan Keuangan`">
        <n-tabs type="card" animated @before-leave="handleBeforeLeave" @update:value="handleUpdateValue">
          <!--          <n-tab-pane name="pinjaman" tab="PINJAMAN"> Informasi Pinjaman</n-tab-pane>-->
          <!--          <n-tab-pane name="pembayaran" tab="PEMBAYARAN">-->
          <!--            Informasi Pembayaran-->
          <!--          </n-tab-pane>-->
          <!--          <n-tab-pane name="jaminan" tab="JAMINAN"> Informasi Jaminan</n-tab-pane>-->
          <!--          <n-tab-pane name="tunggakan" tab="TUNGGAKAN"> Informasi Tunggakan</n-tab-pane>-->

          <n-tab-pane name="inq_pinjaman" tab="INQUERY PIUTANG">
            <TabInqPinjaman :columns="columnsPinjaman" :data="dataInqPinjaman"/>
          </n-tab-pane>
          <n-tab-pane name="arus_kas" tab="ARUS KAS">
            <TabArusKas :data="dataArusKas" :columns="columns" :load="loadData" :page-size="10"
                        @filter-form="handleRange"/>
          </n-tab-pane>
        </n-tabs>

      </n-card>
    </n-space>
    <n-modal v-model:show="modalDetail">
      <n-card content-style="padding: 0;" class="w-11/12 min-h-[600px] ">
        <n-tabs
            type="line"
            :tabs-padding="20"
            pane-style="padding: 20px;"
            @before-leave="handleBeforeLeaveModal"
        >
          <n-tab-pane name="Pelanggan">
            <n-scrollbar style="max-height: 500px" trigger="none">
              <n-form ref="formPelanggan" :model="dataPelanggan" :rules="rulesPelanggan"
                      :label-placement="width <= 920 ? 'top' : 'top'" require-mark-placement="right-hanging"
                      :disabled="true" label-width="auto">
                <div class="flex w-full gap-2">
                  <n-form-item label="Nama" path="nama" class="w-full">
                    <n-input placeholder="nama" v-model:value="dataPelanggan.nama"
                             @input="$event => (dataPelanggan.nama = $event.toUpperCase())"/>
                  </n-form-item>
                  <n-form-item label="Nama Panggilan" path="nama_panggilan" class="w-full">
                    <n-input placeholder="nama panggilan" v-model:value="dataPelanggan.nama_panggilan"
                             @input="$event => (dataPelanggan.nama_panggilan = $event.toUpperCase())"/>
                  </n-form-item>
                </div>
                <div class="flex w-full gap-2">
                  <n-form-item label="Jenis kelamin" path="jenis_kelamin" class="w-full">
                    <n-select filterable placeholder="Jenis Kelamin" :options="optJenisKelamin"
                              v-model:value="dataPelanggan.jenis_kelamin"/>
                  </n-form-item>
                  <n-form-item label="Tempat Lahir" path="tempat_lahir" class="w-full">
                    <n-input placeholder="tempat lahir" v-model:value="dataPelanggan.tempat_lahir"
                             @input="$event => (dataPelanggan.tempat_lahir = $event.toUpperCase())"/>
                  </n-form-item>
                  <n-form-item label="Tanggal lahir" path="tgl_lahir" class="w-full">
                    <n-date-picker placeholder="Tanggal Lahir" v-model:formatted-value="dataPelanggan.tgl_lahir"
                                   value-format="yyyy-MM-dd" format="dd-MM-yyyy" type="date"
                                   @update:value="handleTanggalLahir" class="w-full"/>
                    <span
                        class="absolute text-xs text-orange-500 top-6 bg-orange-50 w-full p-0.5 mt-2 animate-pulse"
                        v-show="notifUsia">{{ noteUsia }}</span>
                  </n-form-item>
                  <n-form-item label="Status Kawin" path="status_kawin" class="w-full">
                    <n-input-group>
                      <n-select filterable placeholder="Status Kawin" :options="optStatusKawin"
                                v-model:value="dataPelanggan.status_kawin"/>
                    </n-input-group>
                  </n-form-item>
                </div>
                <div class="flex w-full gap-2">
                  <n-form-item label="Tipe Identitas" path="tipe_identitas" class="w-full">
                    <n-select filterable placeholder="Jenis Identitas" :options="optJenisIdentitas"
                              v-model:value="dataPelanggan.tipe_identitas"/>
                  </n-form-item>
                  <n-form-item label="No Identitas" path="no_identitas" class="w-full">
                    <n-input :allow-input="onlyAllowNumber" class="w-full" placeholder="No Identitas" show-count
                             :maxlength="16" v-model:value="dataPelanggan.no_identitas">
                    </n-input>
                  </n-form-item>
                  <n-form-item label="No KK" path="no_kk" class="w-full">
                    <n-input :allow-input="onlyAllowNumber" placeholder="No Kartu Keluarga"
                             v-model:value="dataPelanggan.no_kk" show-count :maxlength="16"/>
                  </n-form-item>
                </div>
              </n-form>
              <n-form ref="formPelangganPekerjaan" :model="dataPekerjaan" :rules="rulesPekerjaan" :disabled="true"
                      :label-placement="width <= 920 ? 'top' : 'top'" require-mark-placement="right-hanging"
                      label-width="auto">
                <div class="flex gap-4">
                  <n-form-item label="Sektor" path="pekerjaan_id" class="w-full">
                    <n-select filterable placeholder="pekerjaan" :options="optPekerjaan"
                              v-model:value="dataPekerjaan.pekerjaan_id"/>
                  </n-form-item>
                  <n-form-item label="Pendidikan" path="pendidikan" class="w-full">
                    <n-select filterable placeholder="pendidikan" :options="optPendidikan"
                              v-model:value="dataPekerjaan.pendidikan"/>
                  </n-form-item>
                </div>
                <div class="flex gap-2">
                  <n-form-item label="Telepon Selullar 1" path="telepon_selular" class="w-full">
                    <n-input placeholder="Telepon Sellular 1" :allow-input="onlyAllowNumber"
                             v-model:value="dataPekerjaan.telepon_selular" maxlength="13"/>
                  </n-form-item>

                  <n-form-item label="Telepon Selullar 2" path="telepon_rumah" class="w-full">
                    <n-input placeholder="Telepon Sellular 2" v-model:value="dataPekerjaan.telepon_rumah"
                             :allow-input="onlyAllowNumber">
                    </n-input>
                  </n-form-item>
                </div>
                <n-divider title-placement="left">
                  Informasi Alamat Identitas
                </n-divider>
              </n-form>
              <n-form ref="formPelangganAlamatIdentitas" :model="alamatIdentitas" :rules="rulesIdentitas"
                      :disabled="true" :label-placement="width <= 920 ? 'top' : 'top'"
                      require-mark-placement="right-hanging" label-width="auto">
                <div class="flex gap-2">
                  <n-form-item label="Alamat" class="w-full" path="alamat">
                    <n-input placeholder="Alamat" v-model:value="alamatIdentitas.alamat"
                             @input="$event => (alamatIdentitas.alamat = $event.toUpperCase())"/>
                  </n-form-item>
                  <n-form-item label="RT" path="rt">
                    <n-input placeholder="RT" v-model:value="alamatIdentitas.rt" :allow-input="onlyAllowNumber"
                             :maxlength="3" @input="$event => (alamatIdentitas.rt = $event.toUpperCase())">
                    </n-input>
                  </n-form-item>
                  <n-form-item label="RW" path="rw">
                    <n-input placeholder="RW" v-model:value="alamatIdentitas.rw" :allow-input="onlyAllowNumber"
                             :maxlength="3" @input="$event => (alamatIdentitas.rw = $event.toUpperCase())">
                    </n-input>
                  </n-form-item>
                </div>

                <select-state-region v-model:provinsi="alamatIdentitas.provinsi" v-model:kota="alamatIdentitas.kota"
                                     v-model:kecamatan="alamatIdentitas.kecamatan"
                                     v-model:desa="alamatIdentitas.kelurahan"
                                     v-model:kodepos="alamatIdentitas.kode_pos"/>
                <n-divider title-placement="left">
                  Informasi Alamat Tagih
                </n-divider>
              </n-form>
              <n-form ref="formPelangganAlamatTagih" :model="alamatTagih" :rules="rulesAlamatTagih"
                      :disabled="true" :label-placement="width <= 920 ? 'top' : 'top'"
                      require-mark-placement="right-hanging" label-width="auto">
                <div class="flex gap-2">
                  <n-form-item label="Alamat" class="w-full" path="alamat">
                    <n-input placeholder="Alamat" v-model:value="alamatTagih.alamat"
                             @input="$event => (alamatTagih.alamat = $event.toUpperCase())"/>
                  </n-form-item>
                  <n-form-item label="RT" path="rt">
                    <n-input placeholder="RT" v-model:value="alamatTagih.rt" :allow-input="onlyAllowNumber"
                             :maxlength="3" @input="$event => (alamatTagih.rt = $event.toUpperCase())">
                    </n-input>
                  </n-form-item>
                  <n-form-item label="RW" path="rw">
                    <n-input placeholder="RW" v-model:value="alamatTagih.rw" :allow-input="onlyAllowNumber"
                             :maxlength="3" @input="$event => (alamatTagih.rw = $event.toUpperCase())">
                    </n-input>
                  </n-form-item>
                </div>
                <select-state-region v-model:provinsi="alamatTagih.provinsi" v-model:kota="alamatTagih.kota"
                                     v-model:kecamatan="alamatTagih.kecamatan" v-model:desa="alamatTagih.kelurahan"
                                     v-model:kodepos="alamatTagih.kode_pos"/>

              </n-form>
            </n-scrollbar>
          </n-tab-pane>
          <n-tab-pane name="Pinjaman">
            <n-spin :show="spinPinjaman">
              <div class="grid grid-rows-4 grid-flow-col gap-4" v-if="dataDetailPinjaman">
                <n-form-item label="status" path="status" class="w-full">
                  <n-input :value="dataDetailPinjaman.status" disabled></n-input>
                </n-form-item>
                <n-form-item label="loan_number" path="loan_number" class="w-full">
                  <n-input :value="dataDetailPinjaman.loan_number" disabled></n-input>
                </n-form-item>
                <n-form-item label="cust_code" path="cust_code" class="w-full">
                  <n-input :value="dataDetailPinjaman.cust_code" disabled></n-input>
                </n-form-item>
                <n-form-item label="branch_name" path="branch_name" class="w-full">
                  <n-input :value="dataDetailPinjaman.branch_name" disabled></n-input>
                </n-form-item>
                <n-form-item label="order_number" path="order_number" class="w-full">
                  <n-input :value="dataDetailPinjaman.order_number" disabled></n-input>
                </n-form-item>
                <n-form-item label="credit_type" path="credit_type" class="w-full">
                  <n-input :value="dataDetailPinjaman.credit_type" disabled></n-input>
                </n-form-item>
                <n-form-item label="tenor" path="tenor" class="w-full">
                  <n-input :value="dataDetailPinjaman.tenor" disabled></n-input>
                </n-form-item>
                <n-form-item label="installment_date" path="installment_date" class="w-full">
                  <n-input :value="dataDetailPinjaman.installment_date" disabled></n-input>
                </n-form-item>
                <n-form-item label="pcpl_ori" path="pcpl_ori" class="w-full">
                  <n-input :value="dataDetailPinjaman.pcpl_ori" disabled></n-input>
                </n-form-item>
                <n-form-item label="paid_principal" path="paid_principal" class="w-full">
                  <n-input :value="dataDetailPinjaman.paid_principal" disabled></n-input>
                </n-form-item>
                <n-form-item label="paid_interest" path="paid_interest" class="w-full">
                  <n-input :value="dataDetailPinjaman.paid_interest" disabled></n-input>
                </n-form-item>
                <n-form-item label="paid_penalty" path="paid_penalty" class="w-full">
                  <n-input :value="dataDetailPinjaman.paid_penalty" disabled></n-input>
                </n-form-item>
                <n-form-item label="mcf_name" path="mcf_name" class="w-full">
                  <n-input :value="dataDetailPinjaman.mcf_name" disabled></n-input>
                </n-form-item>
                <n-form-item label="created_by" path="created_by" class="w-full">
                  <n-input :value="dataDetailPinjaman.created_by" disabled></n-input>
                </n-form-item>
                <n-form-item label="created_at" path="created_at" class="w-full">
                  <n-input :value="dataDetailPinjaman.created_at" disabled></n-input>
                </n-form-item>
              </div>
            </n-spin>
          </n-tab-pane>
          <n-tab-pane name="Jaminan">
            <n-spin :show="spinJaminan">
              <n-data-table :data="dataDetailJaminan" :columns="colJaminan" sortable/>
            </n-spin>
          </n-tab-pane>
          <n-tab-pane name="Angsuran">
            <n-spin :show="spinAngsuran">
              <n-data-table :data="dataDetailAngsuran" :columns="columnsAngsuran"></n-data-table>
            </n-spin>
          </n-tab-pane>
          <n-tab-pane name="Pembayaran">
            <n-spin :show="spinPembayaran">
              <n-data-table :data="dataDetailPembayaran" :columns="columnsPembayran"></n-data-table>
            </n-spin>
          </n-tab-pane>
          <n-tab-pane name="Tunggakan">
            <n-data-table :data="dataDetailTunggakan" :columns="columnsTunggakan"></n-data-table>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-modal>
  </div>
</template>
<script setup>
import {ref, h, computed} from "vue";
import {useApi} from "../../../helpers/axios";
import {useSearch} from "../../../helpers/searchObject";
import router from "../../../router";
import {
  useDialog,
  useMessage,
  NIcon, NButton,
} from "naive-ui";
import {
  DeleteOutlined as DeleteIcon,
  ListAltOutlined as DetailIcon,
} from "@vicons/material";
import TabArusKas from "./TabArusKas.vue";
import TabInqPinjaman from "./TabInqPinjaman.vue";

const rangeDate = ref();
const message = useMessage();
const dialog = useDialog();
const dataTable = ref([]);
const dataArusKas = ref([]);
const searchBox = ref();
const spinPinjaman = ref(false);
const spinJaminan = ref(false);
const columns = [
  {
    title: "Tanggal",
    key: "ENTRY_DATE",
    sorter: "default",
  },
  {
    title: "Type",
    key: "TYPE",
    sorter: "default",
    filterOptions: [
      {
        label: 'CASH-IN',
        value: 'CASH-IN'
      },
      {
        label: 'CASH-OUT',
        value: 'CASH-OUT'
      }
    ],
    filter(value, row) {
      return !!~row.TYPE.indexOf(value);
    }
  },
  {
    title: "Keterangan",
    key: "JENIS",
    sorter: "default",
  },
  {
    title: "Cabang",
    key: "BRANCH",
    sorter: "default",
  },
  {
    title: "Jumlah",
    align: "right",
    key: "ORIGINAL_AMOUNT",
    sorter: "default",
    render(row) {
      return h("div", row.ORIGINAL_AMOUNT.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    }
  },
];

const convertObjectToArray = (obj) => {
  return Object.entries(obj).map(([key, value]) => ({key, value}));
}
const colJaminan = [
  {
    title: "ID",
    key: "ID",
    sorter: "default",
    width: 100,
  },
  {
    title: "CR_CREDIT_ID",
    key: "CR_CREDIT_ID",
    sorter: "default",
    width: 100,
  },
  {
    title: "HEADER_ID",
    key: "HEADER_ID",
    sorter: "default",
    width: 100,
  }, {
    title: "BRAND",
    key: "BRAND",
    sorter: "default",
    width: 100,
  }, {
    title: "TYPE",
    key: "TYPE",
    sorter: "default",
    width: 100,
  }, {
    title: "PRODUCTION_YEAR",
    key: "PRODUCTION_YEAR",
    sorter: "default",
    width: 100,
  }, {
    title: "COLOR",
    key: "COLOR",
    sorter: "default",
    width: 100,
  }, {
    title: "ON_BEHALF",
    key: "ON_BEHALF",
    sorter: "default",
    width: 100,
  }, {
    title: "POLICE_NUMBER",
    key: "POLICE_NUMBER",
    sorter: "default",
    width: 100,
  }, {
    title: "CHASIS_NUMBER",
    key: "CHASIS_NUMBER",
    sorter: "default",
    width: 100,
  }, {
    title: "ENGINE_NUMBER",
    key: "ENGINE_NUMBER",
    sorter: "default", width: 100,
  }, {
    title: "BPKB_NUMBER",
    key: "BPKB_NUMBER",
    sorter: "default", width: 100,
  }, {
    title: "STNK_NUMBER",
    key: "STNK_NUMBER",
    sorter: "default", width: 100,
  }, {
    title: "VALUE",
    key: "VALUE",
    sorter: "default", width: 100,
  }, {
    title: "COLLATERAL_FLAG",
    key: "COLLATERAL_FLAG",
    sorter: "default", width: 100,
  }, {
    title: "STATUS",
    key: "STATUS",
    sorter: "default", width: 100,
  }, {
    title: "LOCATION_BRANCH",
    key: "LOCATION_BRANCH",
    sorter: "default", width: 100,
  }, {
    title: "COLLATERAL_TYPE",
    key: "COLLATERAL_TYPE",
    sorter: "default", width: 100,
  },
];
const columnsPinjaman = [
  {
    title: "Nomor Order",
    key: "loan_number",
    sorter: "default",
  }, {
    title: "Nama Debitur",
    key: "customer_name",
    sorter: "default",
  }, {
    title: "Nomor Polisi",
    key: "police_number",
    sorter: "default",
  }, {
    title: "Tanggal Pencairan",
    key: "entry_date",
    sorter: "default",
  }, {
    title: "Cabang",
    key: "branch_name",
    sorter: "default",
  },
  {
    title: "Action",
    align: "right",
    width: 100,
    key: "more",
    render(row) {
      return h(
          NButton,
          {
            secondary: false,
            size: "small",
            onClick: () => handleDetailRow(row),
          },
          {
            default: "detail",
          }
      );
    },
  },

];
const columnsPembayran = [
  {
    title: "No Pembayaran",
    key: "INVOICE",
    sorter: "default",
  },
  {
    title: "Tipe Pembayaran",
    key: "ACC_KEY",
    sorter: "default",
  },
  {
    title: "Metode Pembayaran",
    key: "PAYMENT_METHOD",
    sorter: "default",
  },
  {
    title: "Deskripsi",
    key: "TITLE",
    sorter: "default",
  },
  {
    title: "Nominal",
    key: "ORIGINAL_AMOUNT",
    sorter: "default",
  },
  {
    title: "Dibuat",
    key: "USER_ID",
    sorter: "default",
  },
  {
    title: "Stastus pembayaran",
    key: "STTS_RCRD",
    sorter: "default",
  },

];
const columnsAngsuran = [
  {
    title: "ke",
    key: "angsuran_ke",
    sorter: "default",
    width: 80,
  },
  {
    title: "Loan Number",
    key: "loan_number",
    sorter: "default",
    width: 150,
  },
  {
    title: "Tanggal",
    key: "tgl_angsuran",
    sorter: "default",
    width: 100,
  },
  {
    title: "principal",
    key: "principal",
    sorter: "default",
    width: 100,
  },
  {
    title: "interest",
    key: "interest",
    sorter: "default",
    width: 100,
  },
  {
    title: "installment",
    key: "installment",
    sorter: "default",
    width: 100,
  },
  {
    title: "principal remain",
    key: "principal_remains",
    sorter: "default",
    width: 100,
  },
  {
    title: "payment",
    key: "payment",
    sorter: "default",
    width: 100,
  },  {
    title: "payment",
    key: "payment",
    sorter: "default",
    width: 100,
  },  {
    title: "bayar angsuran",
    key: "bayar_angsuran",
    sorter: "default",
    width: 100,
  },{
    title: "bayar denda",
    key: "bayar_denda",
    sorter: "default",
    width: 100,
  },{
    title: "total_bayar",
    key: "bayar_angsuran",
    sorter: "default",
    width: 100,
  },{
    title: "flag",
    key: "flag",
    sorter: "default",
    width: 100,
  },{
    title: "denda",
    key: "denda",
    sorter: "default",
    width: 100,
  },
];

const columnsTunggakan = [
  {
    title: "No Order",
    key: "LOAN_NUMBER",
    sorter: "default",
  },
  {
    title: "Tanggal Nunggak",
    key: "START_DATE",
    sorter: "default",
  },
  {
    title: "Total Tunggakan",
    key: "PAST_DUE_PINALTY",
    sorter: "default",
  },{
    title: "Status",
    key: "STATUS_REC",
    sorter: "default",
  },

];

const modalDetail = ref(false);
const modalBody = ref();
const handleDetailRow = async (e) => {
  modalDetail.value = true;
  let trow = await e;
  getDetailPelanggan(trow.cust_id);
  modalBody.value = e;
}

const loadData = ref(false);
const handleRange = (value) => {
  getArusKas(value);
}

const handleBeforeLeave = async (t) => {
  switch (t) {
    case "arus_kas":
      await getArusKas();
      return true;
    case "inq_pinjaman":
      await getInqPinjaman();
      return true;
    case "pembayaran":
      await getDetailPembayaran();
      return true;
    default:
      return true;
  }
}
const handleBeforeLeaveModal = (t) => {
  switch (t) {
    case "Pelanggan":
      getDetailPelanggan(modalBody.value.cust_id);
      return true;
    case "Jaminan":
      getDetailJaminan(modalBody.value.credit_id);
      return true;
    case "Pinjaman":
      getDetailPinjaman(modalBody.value.credit_id);
      return true;
    case "Pembayaran":
      getDetailPembayaran(modalBody.value.loan_number);
      return true;
    case "Angsuran":
      getDetailAngsuran(modalBody.value.loan_number);
      return true;
    case "Tunggakan":
      getDetailTunggakan(modalBody.value.loan_number);
      return true;
    default:
      return true;
  }
}

const dataDetailPelanggan = ref();
const dataPelanggan = ref([]);
const dataPekerjaan = ref([]);
const alamatIdentitas = ref([]);
const alamatTagih = ref([]);
const getDetailPelanggan = async (e) => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: `customerReport/${e}`,
    token: userToken,
  });
  if (!response.ok) {
    message.error("ERROR API");
  } else {
    Object.assign(dataPelanggan.value, response.data.pelanggan);
    Object.assign(dataPekerjaan.value, response.data.pekerjaan);
    Object.assign(alamatIdentitas.value, response.data.alamat_identitas);
    Object.assign(alamatTagih.value, response.data.alamat_tagih);
    dataDetailPelanggan.value = response.data;
  }
}
const dataDetailJaminan = ref();
const getDetailJaminan = async (e) => {
  let userToken = localStorage.getItem("token");
  spinJaminan.value = true;
  const response = await useApi({
    method: "GET",
    api: `collateralReport/${e}`,
    token: userToken,
  });
  if (!response.ok) {
    message.error("ERROR API");
  } else {
    spinJaminan.value = false;
    dataDetailJaminan.value = response.data;
  }
}
const dataDetailPinjaman = ref();
const getDetailPinjaman = async (e) => {
  spinPinjaman.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: `creditReport/${e}`,
    token: userToken,
  });
  if (!response.ok) {
    message.error("ERROR API");
  } else {
    spinPinjaman.value = false;
    dataDetailPinjaman.value = response.data;
  }
}

const dataDetailPembayaran = ref();
const spinPembayaran = ref(false);
const getDetailPembayaran = async (e) => {
  spinPembayaran.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: `paymentReport/${e}`,
    token: userToken,
  });
  if (!response.ok) {
    message.error("ERROR API");
  } else {
    spinPembayaran.value = false;
    dataDetailPembayaran.value = response.data;
  }
}

const dataDetailAngsuran = ref();
const spinAngsuran = ref(false);
const getDetailAngsuran = async (e) => {
  spinAngsuran.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "POST",
    data: {loan_number:e},
    api: `struktur_kredit`,
    token: userToken,
  });
  if (!response.ok) {
    message.error("ERROR API");
  } else {
    spinAngsuran.value = false;
    dataDetailAngsuran.value = response.data;
  }
}


const dataDetailTunggakan = ref();
const spinTunggakan = ref(false);
const getDetailTunggakan = async (e) => {
  spinTunggakan.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: `arrearsReport/${e}`,
    token: userToken,
  });
  if (!response.ok) {
    message.error("ERROR API");
  } else {
    spinTunggakan.value = false;
    dataDetailTunggakan.value = response.data;
  }
}

const getArusKas = async (e) => {
  message.loading('memuat data arus kas');
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "POST",
    api: "arus_kas",
    data: e,
    token: userToken,
  });
  if (!response.ok) {
    message.error('ERROR API');
  } else {
    loadData.value = false;
    dataArusKas.value = response.data;
  }
}

const dataInqPinjaman = ref();
const getInqPinjaman = async (e) => {
  message.loading('memuat inquery pinjaman');
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "inquiryList",
    token: userToken,
  });
  if (!response.ok) {
    message.error('ERROR API');
  } else {
    loadData.value = false;
    dataInqPinjaman.value = response.data;
  }
}


const handleDetail = (evt) => {
  router.push(`/master/branch-action/${evt.id}/detail`);
};

const handleUpdate = (evt) => {
  router.push(`/master/branch-action/${evt.id}`);
};

const handleAdd = () => {
  router.push("/master/branch-action");
};
onMounted(() => getInqPinjaman());
const getData = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "customer",
    token: userToken,
  });
  if (!response.ok) {
    message.error("sesi berakhir");
    localStorage.removeItem("token");
    router.push("/");
  } else {
    dataTable.value = response.data;
  }
};

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const options = [
  {
    label: "Hapus",
    key: "hapus",
    icon: renderIcon(DeleteIcon),
  },
  {
    label: "Detail",
    key: "detail",
    icon: renderIcon(DetailIcon),
  },
];

const pagination = {
  pageSize: 10,
};

const showData = computed(() => {
  return useSearch(dataTable.value, searchBox.value);
});
</script>