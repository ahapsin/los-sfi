<template>
    <div class="h-screen bg-pr max-h-screen p-20">
        <div class="flex w-full bg-white h-full rounded-lg overflow-clip">
            <div class="w-1/2 p-10 h-full">
                <LoginForm />
            </div>
            <div class="w-1/2">
                <QuoteSection />
            </div>
        </div>
    </div>
</template>
<script setup>
import LoginForm from "../../components/molecules/LoginForm.vue";
import QuoteSection from "../../components/molecules/QuoteSection.vue";
</script>
