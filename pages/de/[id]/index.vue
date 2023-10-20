<template>
   <div>
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Documento Electronicos
      </h2>
      <DEList />
   </div>
</template>

<script setup>
import { TIPO_DOCUMENT_LIST } from "../../../config";

definePageMeta({
   middleware: ["auth"],
});

const titles = ref(TIPO_DOCUMENT_LIST);

onMounted(() => {
   console.log("onMounted");
});
</script>
