<template>
  <div>
    <button @click="connectToPrinter">Hubungkan ke Printer</button>
    <button @click="print" :disabled="!printer">Cetak</button>
  </div>
  <div class="grid grid-cols-1 gap-x-4 gap-y-4">
    <div>{{ isSupported ? 'Bluetooth Web API Supported' : 'Your browser does not support the Bluetooth Web API' }}</div>

    <div v-if="isSupported">
      <button @click="requestDevice()">
        Request Bluetooth Device
      </button>
    </div>

    <div v-if="device">
      <p>Device Name: {{ device.name }}</p>
    </div>

    <div v-if="isConnected" class="bg-green-500 text-white p-3 rounded-md">
      <p>Connected</p>
    </div>

    <div v-if="!isConnected" class="bg-orange-800 text-white p-3 rounded-md">
      <p>Not Connected</p>
    </div>

    <div v-if="error">
      <div>Errors:</div>
      <pre>
      <code class="block p-5 whitespace-pre">{{ error }}</code>
    </pre>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useBluetooth } from '@vueuse/core'



export default {
  setup() {
    const {
      isSupported,
      isConnected,
      device,
      requestDevice,
      server,
    } = useBluetooth({
      acceptAllDevices: true,
    })
    const printer = ref(null);

    const connectToPrinter = async () => {
      try {
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ services: ['your-printer-service-uuid'] }] // Ganti dengan UUID layanan printer Anda
        });

        printer.value = await device.gatt.connect();
        console.log('Terhubung ke printer:', device.name);
      } catch (error) {
        console.error('Koneksi gagal!', error);
      }
    };

    const print = async () => {
      if (!printer.value) {
        console.error('Printer tidak terhubung');
        return;
      }

      const service = await printer.value.getPrimaryService('your-printer-service-uuid');
      const characteristic = await service.getCharacteristic('your-characteristic-uuid');

      // Data yang akan dicetak
      const data = new TextEncoder().encode('Halo, Dunia!');

      try {
        await characteristic.writeValue(data);
        console.log('Perintah cetak terkirim');
      } catch (error) {
        console.error('Cetak gagal!', error);
      }
    };

    return {
      printer,
      connectToPrinter,
      print,
    };
  }
};
</script>

<style>
/* Tambahkan gaya Anda di sini */
</style>
