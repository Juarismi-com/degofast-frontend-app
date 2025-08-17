<template>
   <div>
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         {{ title }}
      </h2>
      <!--modal-simple title-btn="Subir archivos" title="Subir Archivos">
         <DEFileUpload :tipo-documento="deType" @submit="setDes" />
      </modal-simple-->

      <div class="col-span-3 flex justify-left">
         <NuxtLink
            :to="`/documentos-electronicos/tipos/${deType}/de-form`"
            class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            type="submit"
         >
            Nuevo
         </NuxtLink>
      </div>

      <DEList
         uploadFiles="uploadFiles"
         :items="des"
         @page-change="handlePageChange"
         :totalPages="totalPages"
         :documentType="deType"
      />
   </div>
</template>

<script setup>
import { TIPO_DOCUMENT_LIST } from "~/config";
import { get } from "~/services/http.service";
import { useAuthStore } from "~/stores";

definePageMeta({
   middleware: ["auth"],
});

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const deType = ref(route.params.type);
const routeList = ref(TIPO_DOCUMENT_LIST);
const routeSelected = ref(
   routeList.value.find((item) => item.tipoDocumento == route.params.type),
);
const title = ref(routeSelected.value.title);
const des = ref([]);
const currentPage = ref(Number(route.query.page) || 1);
const totalPages = ref(1);

const setDes = async () => {
   try {
      const deRes = await get(
         `de?tipoDocumento=${deType.value}&usuario.email=${authStore.user.email}&page=${currentPage.value}`,
      );

      const data = deRes?.data;
      totalPages.value = deRes?.totalPages;

      des.value = data.map(mapperDeName);
   } catch (error) {
      console.error("Error en la solicitud:", error);
   }
};

const mapperDeName = (de) => {
   let sum = 0;

   if (Array.isArray(de.items)) {
      for (let i = 0; i < de.items.length; i++) {
         const item = de.items[i];
         sum += item?.precioUnitario * item?.cantidad;
      }
   }

   return {
      ...de,
      estado: de.estado.substring(1, de.estado),
      total: sum,
   };
};

const handlePageChange = (page) => {
   currentPage.value = page;

   router.push({
      query: { page: currentPage.value },
   });
   setDes();
};

watch(
   () => route.query.page,
   (newPage) => {
      const newPageNumber = Number(newPage) || 1;
      if (newPageNumber !== currentPage.value) {
         currentPage.value = newPageNumber;
         setDes();
      }
   },
);

onMounted(() => {
   setDes();
});
</script>
