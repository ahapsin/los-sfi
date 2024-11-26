<template>
  <n-card>
    <n-tabs size="medium" @update:value="handleUpdateValue" class="card-tabs" default-value="jaminan" animated type="card"
      pane-wrapper-style="margin: 0 -4px" pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
      <n-tab-pane name="jaminan" tab="Jaminan">
        <n-data-table :columns="columns" :data="dataTable" />
      </n-tab-pane>
      <n-tab-pane name="transaksi" tab="Transaksi">
        <n-data-table :columns="columns" :data="dataTable" />
      </n-tab-pane>
      <template #suffix>
        <n-dropdown trigger="hover" :options="options" @select="handleSelect" v-if="addButtonDisplay">
          <n-button type="success">Tambah Transaksi</n-button>
        </n-dropdown>

      </template>
    </n-tabs>
  </n-card>
  <n-modal v-model:show="showModal" :mask-closable="false">
    <div class="w-1/2">
      <FormTransaksi @batal="showModal = false" v-if="typeTransaksi == 'kirim'" />
      <FormUpdate @batal="showModal = false" v-if="typeTransaksi == 'update'" />
    </div>
  </n-modal>
  <n-modal v-model:show="showDetailModal"
    title="Modal"
  >
    <div class="w-1/2 bg-white p-4 rounded">
      <n-table :bordered="false" :single-line="false" size="small">
        <thead>
          <tr>
            <th>Jenis</th>
            <th>Nama Debitur</th>
            <th>Order Number</th>
            <th>No Jaminan</th>
            <th>Lokasi</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ bodyModal.type }}</td>
            <td>{{ bodyModal.nama_debitur }}</td>
            <td>{{ bodyModal.order_number }}</td>
            <td>{{ bodyModal.no_jaminan }}</td>
            <td>{{ bodyModal.lokasi }}</td>
            <td>{{ bodyModal.status_jaminan }}</td>
          </tr>
        </tbody>
      </n-table>
      <n-table :bordered="false" :single-line="false" size="small">
        <tbody>
          <tr>
            <th>BPKB NO</th>
            <td>{{ bodyModal.no_bpkb }}</td>
          </tr>
          <tr>
            <th>BPKB Atas Nama</th>
            <td>{{ bodyModal.atas_nama }}</td>
          </tr>
          <tr>
            <th>Merk/Tipe/Tahun</th>
            <td>{{ bodyModal.merk }} / {{ bodyModal.tipe }} / {{ bodyModal.tahun }}</td>
          </tr>
          <tr>
            <th>Warna/No Polisi</th>
            <td>{{ bodyModal.warna }} /{{ bodyModal.no_polisi }}</td>
          </tr>
          <tr>
            <th>No Rangka/No Mesin</th>
            <td>{{ bodyModal.no_rangka }}/ {{ bodyModal.no_mesin }}</td>
          </tr>
          <tr>
            <th>No Faktur</th>
            <td>{{ bodyModal.no_faktur }}</td>
          </tr>
          <tr>
            <th>Dokumen</th>
            <td>
              <n-image width="64" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
              <n-image width="64" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
              <n-image width="64" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
  </n-modal>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import { NButton, useMessage } from 'naive-ui';
import { useApi } from '../../../helpers/axios';
import router from '../../../router';
import FormTransaksi from './trxJaminan.vue';
import FormUpdate from './updateJaminanPage.vue';

const message = useMessage();
const showModal = ref(false);
const dataTable = ref([]);
const getData = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "jaminan",
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

const options = [
  {
    label: 'Kirim Jaminan',
    key: 'kirim',
  },
  {
    label: 'Update Jaminan',
    key: 'update'
  }
];
const typeTransaksi = ref();
const handleSelect = (e) => {
  showModal.value = true;
  typeTransaksi.value = e;

}
const addButtonDisplay = ref(false);
const handleUpdateValue = (e) => {
  if (e === "transaksi") {
    addButtonDisplay.value = true;
  } else {
    addButtonDisplay.value = false;
  }
}
const columns = [
  {
    title: "Jenis",
    key: "type",
    sorter: "default",
  },
  {
    title: "No Kontrak",
    key: "order_number",
    sorter: "default",
  },
  {
    title: "Nama Debitur",
    key: "nama_debitur",
    sorter: "default",
  },
  {
    title: "lokasi jaminan",
    key: "lokasi",
    sorter: "default",
  },
  {
    width: 100,
    align: "right",
    key: "action",
    render(row) {
      return h(
        NButton,
        {
          secondary: true,
          round: true,
          onClick: () => {
            handleAction(row);
          },
        },
        {
          default: () => "detail",
        }
      );
    },
  },
];
const bodyModal = ref();
const showDetailModal = ref(false);
const handleAction = (e) => {
  showDetailModal.value = true;
  bodyModal.value = e;
}
onMounted(() => getData());
</script>