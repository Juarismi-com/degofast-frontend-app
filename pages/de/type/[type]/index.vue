<template>
   <div>
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         {{ title }}
      </h2>
      <modal-simple title-btn="Subir archivos" title="Subir Archivos">
         <DEFileUpload :tipo-documento="deType" @submit="setDes" />
      </modal-simple>

      <DEList uploadFiles="uploadFiles" :items="des" />
   </div>
</template>

<script setup>
import { TIPO_DOCUMENT_LIST } from "~/config";
import ModalSimple from "~/components/Theme/Modal/Simple.vue";
import { get } from "~/services/http.service";
import { useAuthStore } from "~/stores";

definePageMeta({
   middleware: ["auth"],
});

const route = useRoute();
const authStore = useAuthStore();

const deType = ref(route.params.type);
const routeList = ref(TIPO_DOCUMENT_LIST);
const routeSelected = ref(
   routeList.value.find((item) => item.tipoDocumento == route.params.type),
);
const title = ref(routeSelected.value.title);
const des = ref([]);

const setDes = async () => {
   des.value = (
      await get(
         `de?tipoDocumento=${deType.value}&usuario.email=${authStore.user.email}`,
      )
   )?.data;
};

onMounted(() => {
   setDes();
});
</script>
