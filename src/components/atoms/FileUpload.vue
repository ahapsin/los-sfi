<template>
  <canvas ref="canvas" style="display: none"></canvas>
  <div
    class="border rounded-xl pt-2 pl-2 pr-2 flex items-center gap-2"
    :class="errorCapture ? 'border-red-200 bg-red-50' : 'border'"
  >
    <div v-show="!props.def_preview">
      <div v-if="state.resizedImage">
        <n-image
          :src="state.resizedImage"
          class="h-20 w-20 min-w-20 rounded-xl"
        />
      </div>
      <div v-else-if="props.def_value">
        <n-image
          :src="props.def_value"
          class="h-20 w-20 border min-w-20 rounded-xl "
        />
      </div>
      <div v-else>
        <n-image
          src="https://www.shorekids.co.nz/wp-content/uploads/2014/08/image-placeholder.jpg"
          class="h-20 w-20 min-w-20 rounded-xl border-red-500"
        />
      </div>
    </div>
    <n-upload
      accept="image/png, image/jpeg,image/jpg"
      @change="beforeUpload"
      :show-file-list="props.def_preview"
      list-type="image"
      multiple
      :show-cancel-button="false"
    >
      <div class="flex flex-col">
        <n-button tertiary :type="errorCapture ? 'error' : 'success'">
          <div class="flex gap-2">
            <n-icon> <upload-icon /> </n-icon>
            {{ props.title }}
          </div></n-button
        >
      </div>
    </n-upload>
  </div>
</template>
    
    <script setup>
import { CloudUploadFilled as UploadIcon } from "@vicons/material";
import { lyla } from "@lylajs/web";
import { useMessage } from "naive-ui";

const message = useMessage();
const userToken = localStorage.getItem("token");
import { computed, reactive, ref } from "vue";

const canvas = ref(null); // Reference to the canvas element

// State object to hold properties
const state = reactive({
  maxWidth: 1280, // Maximum width of the resized image
  maxHeight: 720, // Maximum height of the resized image
  resizedImage: null,
  image: computed(() => state.resizedImage), // The resized image data
  quality: 0.9, // JPEG quality
});
const downscaleImage = (ctx, img, width, height) => {
  ctx.drawImage(img, 0, 0, width, height);
  // Additional logic for downscaling in steps can be added here.
};
const resizeImage = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;

      let newWidth = img.width;
      let newHeight = img.height;

      // Maintain aspect ratio and resize if necessary
      if (newWidth > state.maxWidth || newHeight > state.maxHeight) {
        if (newWidth > newHeight) {
          newWidth = state.maxWidth;
          newHeight = newWidth / aspectRatio;
        } else {
          newHeight = state.maxHeight;
          newWidth = newHeight * aspectRatio;
        }
      }

      const ctx = canvas.value.getContext("2d");

      // Set canvas dimensions based on new size
      canvas.value.width = newWidth;
      canvas.value.height = newHeight;

      // Optional: downscale the image in steps to improve quality
      downscaleImage(ctx, img, newWidth, newHeight);

      // Get the resized image data as a base64 URL (set quality for JPEG)
      state.resizedImage = canvas.value.toDataURL("image/jpeg", state.quality);
      // console.log(state.resizedImage);
      handleImagePost(state.resizedImage);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};
const beforeUpload = (data) => {
  resizeImage(data.file.file);
};
const errorCapture = ref(false);
const handleImagePost = () => {
  const bodyForm = {
    image: state.resizedImage,
    type: props.type,
    reff: props.reff,
    cr_prospect_id: props.idapp,
  };
  // const form = new FormData();
  // form.append("image", state.resizedImage);
  // form.append("type", data.type);
  // form.append("cr_prospect_id", idApp);
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  lyla
    .post(`${import.meta.env.VITE_APP_API_BASE}${props.endpoint}`, {
      headers,
      json: bodyForm,
    })
    .then(() => {
      message.success(`upload ${props.title} berhasil`);
    })
    .catch(() => {
      message.error(`upload ${props.title}  gagal`);
      errorCapture.value = true;
    });
};

const props = defineProps({
  title: String,
  endpoint: String,
  type: String,
  reff: String,
  idapp: String,
  def_value: String,
  def_preview: Boolean,
});
// onMounted(()=>resizeImage());
</script>