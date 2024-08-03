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
                  <th class="px-4 py-3">Identificador</th>
                  <th class="px-4 py-3">Estado</th>
                  <th class="px-4 py-3">Fecha</th>
                  <th class="px-4 py-3 text-center">Total</th>
                  <th class="px-4 py-3"> Acciones</th>
                  <th class="px-4 py-3"></th>
                  <th class="px-4 py-3"></th>
                  <th class="px-4 py-3"></th>
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
                  <td class="px-4 py-3 text-sm">{{ item._id }}</td>
                  <td class="px-4 py-3 text-xs">
                     <span
                        :class="['px-2 py-1 font-semibold leading-tight text-green-700 rounded-full dark:bg-green-700 dark:text-green-100', item?.estado === 'A'? 'bg-green-100': 'bg-red-100']"
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
                  <td class="px-4 py-3">
                     <!-- Botón "Ver detalles" -->
                     <button
                        @click="verDetalles(item._id)"
                        class="text-blue-600 hover:underline focus:outline-none"
                     >
                        Ver detalles
                     </button>
                  </td>
                  <td class="px-4 py-3" >
                     <!-- Botón "Ver kude" -->
                     <button
                        v-if="item.estado == 'A'"
                        @click="verKude(item._id)"
                        class="text-blue-600 hover:underline focus:outline-none"
                     >
                        Ver kude
                     </button>
                  </td>
                  <td class="px-4 py-3" >
                     <!-- Botón "Generar evento" -->
                     <button
                        v-if="item.estado == 'A'"
                        class="text-blue-600 hover:underline focus:outline-none"
                     >
                        Generar evento
                     </button>
                  </td>
                  <td class="px-4 py-3">
                     <!-- Botón "Consultar sifen" -->
                     <button
                        v-if="item.estado == 'A'"
                        @click="consultarSifen(item.cdc)"
                        class="text-blue-600 hover:underline focus:outline-none"
                     >
                        Consultar sifen
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <!--div
         class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
      >
         <span class="flex items-center col-span-3">Viendo 21-30 de 100</span>
         <span class="col-span-2"></span>
         <!-- Pagination
         <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
               <ul class="inline-flex items-center">
                  <li>
                     <button
                        class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Previous"
                     >
                        <svg
                           aria-hidden="true"
                           class="w-4 h-4 fill-current"
                           viewBox="0 0 20 20"
                        >
                           <path
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                           ></path>
                        </svg>
                     </button>
                  </li>
                  <li>
                     <button
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                     >
                        1
                     </button>
                  </li>
                  <li>
                     <button
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                     >
                        2
                     </button>
                  </li>
                  <li>
                     <button
                        class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
                     >
                        3
                     </button>
                  </li>
                  <li>
                     <button
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                     >
                        4
                     </button>
                  </li>
                  <li>
                     <button
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                     >
                        5
                     </button>
                  </li>
                  <li>
                     <button
                        class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Next"
                     >
                        <svg
                           aria-hidden="true"
                           class="w-4 h-4 fill-current"
                           viewBox="0 0 20 20"
                        >
                           <path
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                           ></path>
                        </svg>
                     </button>
                  </li>
               </ul>
            </nav>
         </span>
      </div-->
   </div>
</template>

<script setup>
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
import { formatPriceNumber } from "@/helpers/number.helper";
import Loader from "@/components/Loader/Loader.vue";

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
   loading.value = items.value.length === 0;
});

watch(items, (newItems) => {
   loading.value = newItems.length === 0;
});
</script>
