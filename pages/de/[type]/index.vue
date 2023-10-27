<template>
   <div>
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         {{ title }}
      </h2>
      <DEFileUpload :tipo-documento="deType" />
      <DEList />
   </div>
</template>

<script setup>
import { TIPO_DOCUMENT_LIST } from "../../../config";

definePageMeta({
   middleware: ["auth"],
});

const route = useRoute();
const deType = ref(route.params.type);
const routeList = ref(TIPO_DOCUMENT_LIST);
const routeSelected = ref(
   routeList.value.find((item) => item.tipoDocumento == route.params.type),
);
const title = ref(routeSelected.value.title);
</script>
