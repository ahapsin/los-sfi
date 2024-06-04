<template>
        <n-upload action="https://kspdjaya.id/image_upload_prospect" :headers="{
                'naive-info': 'hello!'
        }" :data="{
        'naive-data': 'cool! naive!'
}" :custom-request="customRequest">
                <n-button>Upload</n-button>
        </n-upload>
</template>

<script>
import { defineComponent } from "vue";
import { lyla } from "@lylajs/web";
import { useMessage } from "naive-ui";

export default defineComponent({
        setup() {
                const message = useMessage();
                const customRequest = ({
                        file,
                        data,
                        headers,
                        withCredentials,
                        action,
                        onFinish,
                        onError,
                        onProgress
                }) => {

                        const formData = new FormData();
                        if (data) {
                                Object.keys(data).forEach((key) => {
                                        formData.append(
                                                key,
                                                data[key]
                                        );
                                });
                        }
                        formData.append(file.name, file.file);
                        lyla.post(action, {
                                withCredentials,
                                headers,
                                body: formData,
                                onUploadProgress: ({ percent }) => {
                                        onProgress({ percent: Math.ceil(percent) });
                                }
                        }).then(({ json }) => {
                                message.success(JSON.stringify(json));
                                onFinish();
                        }).catch((error) => {
                                message.success(error.message);
                                onError();
                        });
                };
                return {
                        customRequest
                };
        }
});
</script>