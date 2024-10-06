<template>
   <ReceiptForm />
</template>

<script setup>
import ReceiptForm from '~/components/Receipt/ReceiptForm.vue';

definePageMeta({
   middleware: ["auth"],
});
</script>
