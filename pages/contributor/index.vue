<template>
   <ContributorForm />
</template>

<script setup>
import ContributorForm from "~/components/Contributor/ContributorForm.vue";

definePageMeta({
   middleware: ["auth"],
});
</script>
