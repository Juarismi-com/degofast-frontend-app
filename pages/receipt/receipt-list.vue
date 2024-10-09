<template>
   <ReceiptForm />
</template>

<script setup>
import ReceiptForm from '~/components/Receipt/ReceiptList.vue';

definePageMeta({
   middleware: ["auth"],
});
</script>
