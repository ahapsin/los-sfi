<template>
    <n-form :model="dynamicForm" ref="formRef">

        <div class="flex gap-4 items-center py-8">
            <img class="h-16 " src="../../assets/logo.png" alt="logo_company">
            <span class="text-2xl">LOS - KSPDJAYA</span>
        </div>
        <n-form-item label="username" path="username" :rule="rules.username">
            <n-input v-model:value="dynamicForm.username" placeholder="username" />
        </n-form-item>
        <n-form-item label="password" path="password" :rule="rules.password">
            <n-input type="password" v-model:value="dynamicForm.password" show-password-on="mousedown"
                placeholder="Password" :maxlength="8" />
        </n-form-item>
        <n-button class="flex w-full" :loading="loading" icon-placement="left" type="primary" @click="handleLogin">
            Login
        </n-button>
    </n-form>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useMessage } from "naive-ui";
const dynamicForm = reactive({
    username: "",
    password: "",
    device_info: "apple",
});
const message = useMessage();
const formRef = ref(null);
const loading = ref(false);
const rules = {
    username: {
        required: true,
        message: 'username harus diisi',
        trigger: ['input', 'blur']
    },
    password: {
        required: true,
        message: 'password harus diisi !',
        trigger: ['input', 'blur']
    }
}
const handleLogin = async (e) => {
    e.preventDefault(e);

    let apibase = import.meta.env.VITE_APP_API_BASE;

    loading.value = true

    formRef.value?.validate((errors) => {
        if (!errors) {

            message.info("silahkan tunggu..");

            try {
                let login = await axios.post(`${apibase}/auth/login`, credential);
                credential.response = login.data.response.token;
                localStorage.token = credential.response;
                localStorage.sideMenu = "expand";
                router.replace('/beranda');
            } catch (error) {
                console.log(error.response);
                credential.error = true;
                credential.errorMessage = error.response.data.message;
            }

        } else {
            loading.value = false;
            console.log(errors);
            message.error("Login Gagal, silahkan coba lagi");
        }
    });

};
</script>