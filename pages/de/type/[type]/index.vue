<template>
   <div>
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         {{ title }}
      </h2>
      <!--modal-simple title-btn="Subir archivos" title="Subir Archivos">
         <DEFileUpload :tipo-documento="deType" @submit="setDes" />
      </modal-simple-->

      <div class="col-span-3 flex justify-left">
         <a
            :href="`/de/type/${deType}/de-form`"
            class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            type="submit"
         >
            Nuevo
         </a>
      </div>

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
const authStore = useAuthStore()

const deType = ref(route.params.type);
const routeList = ref(TIPO_DOCUMENT_LIST);
const routeSelected = ref(
   routeList.value.find((item) => item.tipoDocumento == route.params.type),
);
const title = ref(routeSelected.value.title);
const des = ref([]);

const setDes = async () => {
   des.value = (await get(`de?tipoDocumento=${deType.value}&usuario.email=${authStore.user.email}`))?.data;
};

onMounted(() => {
   setDes();
});
</script>
