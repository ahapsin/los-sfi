<template>
  <div id="app">
    <!-- File input to upload CSV -->
    <input id="files" type="file" @change="handleFileUpload" class="hidden" accept=".csv"/>
    <label for="files"
           class="border-2 border-pr  text-pr flex p-2  hover:shadow justify-center rounded-xl cursor-pointer">import</label>
    <!-- Table to display CSV data -->
    <n-card>
      {{ format }}
      <n-alert type="warning" :show-icon="false">
        <div class="flex justify-between items-center">
          <div class="text-xl">{{ csvData.length }} baris data</div>
          <n-button type="success">update data</n-button>
        </div>
      </n-alert>
      <table class="table table-striped">
        <thead class="sticky top-0">
        <th>status</th>
        <th v-for="head in csvHeaders" :key="head">{{ head }}</th>
        </thead>
        <tbody class="h-96 overflow-y-auto">
        <tr v-for="body in csvData" :key="body">
          <td>✅</td>
          <td v-for="item in body" :key="item">{{ item }}</td>
        </tr>
        </tbody>
      </table>
    </n-card>
  </div>
</template>

<script setup>
import Papa from 'papaparse'; // Import PapaParse
import _ from "lodash";

const csvData = ref([]);
const csvHeaders = ref([]);
const format = ref([]);

const handleFileUpload = async (event) => {
  // Get the file from the input element
  const file = event.target.files[0];

  if (file) {
    // Parse the CSV file using PapaParse
    await Papa.parse(file, {
      complete: (result) => {
        console.log(result); // Output parsed CSV result for debugging

        // Set the headers and data from parsed result
        csvHeaders.value = result.data[0]; // Assuming the first row contains headers
        csvData.value = result.data.slice(1); // Data starts from the second row
        format.value = formattedData(csvData.value);
      },
      header: false, // Disable header processing (optional, if you want to keep it as data)
      skipEmptyLines: true, // Skip empty lines
    });
  }
}

const formattedData = (e) => e.map(item => ({
  brand: item[0],
  vehicle: item[1],
  type: item[2],
  model: item[3],
  descr: item[4],
  min: item[5],
  max: item[6],
}));
</script>

<style scoped>
/* Simple styling for the table */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
