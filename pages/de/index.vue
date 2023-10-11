<template>
   <div>
      <DEList />
   </div>
</template>

<script setup lang="ts">
import DEList from "~/components/DE/DEList.vue";

definePageMeta({
   middleware: ["auth"],
});
</script>
