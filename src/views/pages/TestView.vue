<template>
  <div>
    {{ redd }}
    <n-input @input="$event => (redd = $event.toUpperCase())" v-model:value="redd"/></div>
</template>
<script setup>
import {ref} from 'vue';
const redd=ref();
const upCase =(e)=>{
   e.toUpperCase();
}
</script>
