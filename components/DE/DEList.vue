<template>
   <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <Loader v-if="loading" />

      <div v-else class="w-full overflow-x-auto">
         <table class="w-full whitespace-no-wrap">
            <thead>
               <tr
                  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
               >
                  <th class="px-4 py-3">Cliente</th>
                  <th class="px-4 py-3">Nro</th>
                  <th class="px-4 py-3">Identificador</th>
                  <th class="px-4 py-3">Estado</th>
                  <th class="px-4 py-3">Fecha</th>
                  <th class="px-4 py-3 text-center">Total</th>
                  <th class="px-4 py-3">Acciones</th>
               </tr>
            </thead>
            <tbody
               class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
               <tr
                  class="text-gray-700 dark:text-gray-400"
                  v-for="(item, index) in items"
                  :key="index"
               >
                  <td class="px-4 py-3">
                     <div class="flex items-center text-sm">
                        <!-- Avatar with inset shadow -->
                        <div
                           class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                        >
                           <img
                              class="object-cover w-full h-full rounded-full"
                              src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                              alt=""
                              loading="lazy"
                           />
                           <div
                              class="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                           ></div>
                        </div>
                        <div>
                           <p class="font-semibold">
                              {{ item?.cliente?.razonSocial }}
                           </p>
                           <p class="text-xs text-gray-600 dark:text-gray-400">
                              {{ item?.cliente?.ruc }}
                           </p>
                        </div>
                     </div>
                  </td>
                  <td class="px-4 py-3 text-sm">
                     {{ getEstablecimientoNumberCode(item.establecimiento) }}
                     -
                     {{ getPuntoExpedicionNumberCode(item.punto) }}
                     -
                     {{ getDeNumberCode(item.numero) }}
                  </td>
                  <td class="px-4 py-3 text-sm">{{ item._id }}</td>
                  <td class="px-4 py-3 text-xs">
                     <span
                        :class="[
                           'px-2 py-1 font-semibold leading-tight text-green-700 rounded-full dark:bg-green-700 dark:text-green-100',
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
                     {{ formatPriceNumber(item.total) }}
                  </td>
                  <!-- Opciones -->
                  <td class="px-4 py-3">
                     <button
                        @click="verDetalles(item._id)"
                        class="text-blue-600 hover:underline focus:outline-none"
                     >
                        Ver detalles
                     </button>
                  </td>
                  <td class="px-4 py-3">
                     <button
                        @click="verKude(item._id)"
                        class="text-blue-600 hover:underline focus:outline-none"
                     >
                        Ver kude
                     </button>
                  </td>
                  <td class="px-4 py-3">
                     <button
                        v-if="item.estado == 'A'"
                        class="text-blue-600 hover:underline focus:outline-none"
                     >
                        Generar evento
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <PaginationNextPrev @page-change="handlePageChange" />
   </div>
</template>

<script setup>
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
import {
   formatPriceNumber,
   getEstablecimientoNumberCode,
   getPuntoExpedicionNumberCode,
   getDeNumberCode,
} from "@/helpers/number.helper";
import Loader from "@/components/Loader/Loader.vue";

import PaginationNextPrev from "@/components/Theme/Pagination/PaginationNextPrev.vue";

const props = defineProps({
   items: {
      type: Array,
      default: [],
   },
});

const router = useRouter();
const loading = ref(true);

const verKude = (id) => {
   window.open(`/de/kude/${id}`, "_blank");
};

const verDetalles = (id) => {
   router.push({ path: `/de/detail/${id}` });
};

const consultarSifen = (cdc) => {
   const url = `https://ekuatia.set.gov.py/consultas/150/${cdc}`;
   window.open(url, "_blank");
};

const { items } = toRefs(props);

onMounted(() => {
   loading.value = true;
});

watch(items, (newItems) => {
   loading.value = false;
   if (newItems.length === 0) {
      alert("No hay elementos que mostrar.");
   }
});

const emit = defineEmits(["page-change"]);

const handlePageChange = (page) => {
   emit("page-change", page);
};
</script>
