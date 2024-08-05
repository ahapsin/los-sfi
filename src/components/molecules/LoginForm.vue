<template>
    <div class="w-full">
        <n-form :model="dynamicForm" ref="formRef">
            <div class="flex flex-col md:flex-row gap-4 items-center pb-8">
                <img class="h-14 md:h-16 " src="../../assets/logo.png" alt="logo_company">
                <span class="md:text-2xl font-bold">LOS - KSPDJAYA</span>
            </div>
            <div class=" h-full flex flex-col py-4">
                <n-form-item label="username" path="username" :rule="rules.username">
                    <n-input v-model:value="dynamicForm.username" placeholder="username" />
                </n-form-item>
                <n-form-item label="password" path="password" :rule="rules.password">
                    <n-input type="password" v-model:value="dynamicForm.password" show-password-on="mousedown"
                        placeholder="Password" @keyup.enter="handleLogin" />
                </n-form-item>
                <n-button class="flex w-full" :loading="loading" icon-placement="left" type="primary"
                    @click="handleLogin">
                    Login
                </n-button>
            </div>
        </n-form>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useMessage } from "naive-ui";
import router from '../../router';
import { useApi } from "../../helpers/axios";
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
    formRef.value?.validate((errors) => {
        if (errors) {
            loading.value = false
        }
    });
    loading.value = true;
    const response = await useApi({
        method: 'POST',
        api: 'auth/login',
        data: {
            username: dynamicForm.username,
            password: dynamicForm.password,
            device_info: dynamicForm.device_info
        }
    });
    if (!response.ok) {
        message.error("login gagal,periksa username dan password anda !");
        loading.value = false;
    } else {
        message.success("login berhasil");
        loading.value = false;
        localStorage.token = response.data.token;
        router.push('dashboard');
    }
}
onMounted(() => {
    if (localStorage.getItem("token")) {
        const userToken = localStorage.getItem("token");
        useApi({
            method: 'get',
            api: `me`,
            token: userToken
        }).then(res => {

            if (!res.ok) {
                localStorage.removeItem("token");
                message.warning("sesi anda sudah berakhir");
                router.replace('/');
            } else {
                message.loading("memulihkan sesi...");
                router.push('dashboard');
            }
        });

    }
});
</script>