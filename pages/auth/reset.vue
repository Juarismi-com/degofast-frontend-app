<template>
   <AuthResetPassForm />
</template>

<script setup>
definePageMeta({
   middleware: ["auth"],
   layout: "default",
});
</script>
