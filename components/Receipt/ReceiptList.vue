<template>
   <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <h2 class="my-6 text-2xl font-semibold text-gray-700">
         Recibo
      </h2>

      <div class="col-span-3 flex justify-left">
         <NuxtLink
            to="/receipt/receipt-form"
            class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
         >
            Nuevo
         </NuxtLink>
      </div>

      <div class="flex flex-col gap-4 mt-4 mb-4">
         <div class="flex gap-4">
            <div class="flex-1">
               <label
                  for="documentoNumero"
                  class="block mb-2 text-sm font-medium text-gray-700"
               >
                  Número de Documento
               </label>
               <input
                  type="text"
                  v-model="searchQuery.numero"
                  id="documentoNumero"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="Ingrese número de documento"
               />
            </div>

            <div class="flex-none self-end">
               <button
                  @click="buscar"
                  class="px-4 py-2 bg-purple-600 text-white rounded-lg"
               >
                  Buscar
               </button>
            </div>
         </div>
      </div>
      <Loader v-if="loading" />
      <div v-else lass="w-full overflow-x-auto">
         <table class="w-full whitespace-no-wrap">
            <thead>
               <tr
                  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50"
               >
                  <th class="px-4 py-3">Recibido de</th>
                  <th class="px-4 py-3">Numero</th>
                  <th class="px-4 py-3">Estado</th>
                  <th class="px-4 py-3">Fecha</th>
                  <th class="px-4 py-3">Monto</th>
                  <th class="px-4 py-3">Acciones</th>
               </tr>
            </thead>
            <tbody
               class="bg-white divide-y"
            >
               <tr
                  class="text-gray-700"
                  v-for="(item, index) in filteredItems"
                  :key="index"
               >
                  <td class="px-4 py-3 text-sm">{{ item.recibidoDe }}</td>
                  <td class="px-4 py-3 text-sm">{{ item.numero }}</td>
                  <td class="px-4 py-3 text-xs">
                     <span
                        :class="[
                           'px-2 py-1 font-semibold leading-tight text-green-700 rounded-full',
                           item?.estado === 'A' ? 'bg-green-100' : 'bg-red-100',
                        ]"
                     >
                        {{ item.estado }}
                     </span>
                  </td>
                  <td class="px-4 py-3 text-sm">
                     {{ moment(item.fecha).format("DD/MM/YYYY") }}
                  </td>
                  <td class="px-4 py-3 text-sm text-right">
                     {{
                        item.moneda === "PYG"
                           ? formatPriceNumber(item.monto)
                           : formatPriceNumberNoPYG(item.monto)
                     }}
                  </td>

                  <td class="px-4 py-3">
                     <button
                        @click="verDetalles(item._id)"
                        class="text-blue-600 hover:underline focus:outline-none"
                     >
                        Ver detalles
                     </button>
                  </td>
                  <td class="px-2 py-3">
                     <button
                        @click="imprimir(item._id)"
                        class="text-blue-600 hover:underline focus:outline-none"
                     >
                        Imprimir
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>

      <PaginationNextPrev
         @page-change="handlePageChange"
         :totalPages="totalPagesLocal"
      />
   </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
import {
   formatPriceNumber,
   formatPriceNumberNoPYG,
} from "~/helpers/number.helper";
import { get } from "~/services/http.service";
import PaginationNextPrev from "@/components/Theme/Pagination/PaginationNextPrev.vue";

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const searchQuery = ref({ numero: "" });
const recibos = ref([]);
const filteredItems = ref([]);
const totalPagesLocal = ref(1);
const currentPage = ref(Number(route.query.page) || 1);
const { handleError } = useErrorHandler();

const getRecibo = async () => {
   try {
      const results = await get(`recibo?page=${currentPage.value}`);
      recibos.value = results?.data || [];
      filteredItems.value = recibos.value;
      totalPagesLocal.value = results?.totalPages || 1;
   } catch (error) {
      handleError(error, "Ocurrió un error al obtener los recibos.");
   } finally {
      loading.value = false;
   }
};

const verDetalles = (id) => {
   window.open(`/receipt/detail/${id}`, "_blank");
};

const imprimir = (id) => {
   window.open(`/receipt/detail/${id}?print=true`, "_blank");
};

const buscar = async () => {
   loading.value = true;
   try {
      if (searchQuery.value.numero) {
         const response = await get(
            `recibo?page=1&numero=${searchQuery.value.numero}`,
         );
         filteredItems.value = response?.data || [];
         totalPagesLocal.value = response?.totalPages || 1;
      } else {
         filteredItems.value = recibos.value;
      }
   } catch (error) {
      handleError(error, "Ocurrió un error al buscar el documento.");
   } finally {
      loading.value = false;
   }
};

const handlePageChange = (page) => {
   currentPage.value = page;
   router.push({ query: { page: currentPage.value } });
   getRecibo();
};

watch(
   () => route.query.page,
   (newPage) => {
      currentPage.value = Number(newPage) || 1;
      getRecibo();
   },
);

onMounted(() => {
   getRecibo();
});
</script>
