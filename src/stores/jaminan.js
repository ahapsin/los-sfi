import _ from 'lodash'
import { defineStore } from "pinia";
import { ref } from "vue";
export const useJaminanStore = defineStore("jaminan", () => {
  const listJaminan = ref([]);
  const storeJaminan = (jaminanData) => {
    listJaminan.value.push(jaminanData);
  };
  const removeJaminan = (e) => {
    let index = _.findIndex(listJaminan.value, { 'id': e });
    listJaminan.value.splice(index, 1);
  }
  const updateJaminan = (e) => {
    let index = _.findIndex(listJaminan.value, { 'id': e.id });
    Object.assign(listJaminan.value[index],e);
  }
  return { listJaminan, storeJaminan,removeJaminan, updateJaminan };
});
