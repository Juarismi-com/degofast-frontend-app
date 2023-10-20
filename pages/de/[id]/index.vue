<template>
   <div>
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         {{ title }}
      </h2>
      <DEList />
   </div>
</template>

<script setup>
import { TIPO_DOCUMENT_LIST } from "../../../config";

const route = useRoute();

definePageMeta({
   middleware: ["auth"],
});

const routeList = ref(TIPO_DOCUMENT_LIST);

const routeSelected = routeList.value.find(
   (item) => item.tipoDocumento == route.params.id,
);

const title = ref(routeSelected.title);

/*const setTitle = () => {
   const routeSelected = console.log(route.params.id);
   title.value = routeSelected.title;
};*/
</script>
