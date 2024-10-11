<template>
  <div class="p-2">
    <n-form
      ref="formRef"
      :model="dynamicForm"
      :rules="rules"
      :label-placement="top"
      require-mark-placement="right-hanging"
    >
      <n-space>
        <n-form-item path="old" label="Password Lama" required>
          <n-input
            type="password"
            v-model:value="dynamicForm.old"
            placeholder="password lama"
          />
        </n-form-item>
        <n-form-item path="baru" label="Password Baru" required>
          <n-input
            type="password"
            v-model:value="dynamicForm.new"
            placeholder="password baru"
          />
        </n-form-item>
        <n-form-item path="conf" label="Konfirmasi Password Baru" required>
          <n-input
            type="password"
            v-model:value="dynamicForm.conf"
            placeholder="konfirmasi password baru"
            @blur="handleConf"
          />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="handleUpdate">update</n-button>
        </n-form-item>
      </n-space>
    </n-form>
  </div>
</template>
<script setup>
import { computed, reactive } from "vue";
import { useApi } from "../../../helpers/axios";
import { useMeStore } from "../../../stores/me";
import router from "../../../router";
import { useMessage } from "naive-ui";

const message = useMessage();
const meData = useMeStore();

const userToken = localStorage.getItem("token");
const handleUpdate = async () => {
  const response = await useApi({
    method: "POST",
    api: `change_password`,
    data: dynamicForm,
    token: userToken,
  });
  if (!response.ok) {
    message.error("password gagal diubah");
  } else {
    message.success("password berhasil diubah");
    router.push("/");
  }
};

const dynamicForm = reactive({
  old: "",
  new: "",
  conf: "",
  same: "",
  username: meData.me.username,
  password: computed(() => dynamicForm.old),
  new_password: computed(() => dynamicForm.new),
});
const handleConf = () => {
  if (dynamicForm.new != dynamicForm.conf) {
    message.error("konfirmasi password baru tidak sama");
  }
};
</script>