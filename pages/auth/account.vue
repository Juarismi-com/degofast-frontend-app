<template>
   <AuthAccountForm />
</template>

<script setup>
definePageMeta({
   middleware: "auth",
});
</script>
