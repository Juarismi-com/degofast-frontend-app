<template>
   <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <div class="w-full overflow-x-auto">
         <table class="w-full whitespace-no-wrap">
            <thead>
               <tr
                  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
               >
                  <th class="px-4 py-3">Cliente</th>
                  <th class="px-4 py-3">Identificador</th>
                  <th class="px-4 py-3">Estado</th>
                  <th class="px-4 py-3">Fecha</th>
                  <th class="px-4 py-3"></th>
                  <th class="px-4 py-3"></th>
               </tr>
            </thead>
            <tbody
               class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
               <tr
                  class="text-gray-700 dark:text-gray-400"
                  v-for="(item, index) in paginatedItems"
                  :key="index"
               >
                  <td class="px-4 py-3">
                     <div class="flex items-center text-sm">
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
                        class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                     >
                        {{ item.estado }}
                     </span>
                  </td>
                  <td class="px-4 py-3 text-sm">
                     {{ moment(item.fecha).format("YYYY-MM-DD HH:mm:ss") }}
                  </td>
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
               </tr>
            </tbody>
         </table>
      </div>
      <div
         class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
      >
         <span class="flex items-center col-span-3"
            >Viendo {{ rangeStart }}-{{ rangeEnd }} de {{ total }}</span
         >
         <span class="col-span-2"></span>
         <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
               <ul class="inline-flex items-center">
                  <li>
                     <button
                        @click="prevPage"
                        class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Previous"
                        :disabled="currentPage === 1"
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
                  <li v-for="page in visiblePages" :key="page">
                     <button
                        @click="setPage(page)"
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                        :class="{
                           'bg-purple-600 text-white': page === currentPage,
                        }"
                     >
                        {{ page }}
                     </button>
                  </li>
                  <li>
                     <button
                        @click="nextPage"
                        class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Next"
                        :disabled="currentPage === totalPages"
                     >
                        <svg
                           class="w-4 h-4 fill-current"
                           aria-hidden="true"
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
      </div>
   </div>
</template>

<script setup>
import { ref, computed, toRefs } from "vue";
import moment from "moment";

const props = defineProps({
   total: {
      type: Number,
   },
   items: {
      type: Array,
      default: [],
   },
});

const verKude = (id) => {
   window.open(`/de/kude/${id}`, "_blank");
};

const verDetalles = (id) => {
   window.open(`/de/detail/${id}`, "_blank");
};

/*  Pagination  */
const { items } = toRefs(props);
const currentPage = ref(1);
const pageSize = 20;

const totalPages = computed(() => {
   return Math.ceil(props.total / pageSize);
});

const visiblePages = computed(() => {
   const pages = [];
   const start = Math.max(1, currentPage.value - 4);
   const end = Math.min(totalPages.value, start + 9);
   for (let i = start; i <= end; i++) {
      pages.push(i);
   }
   return pages;
});

const paginatedItems = computed(() => {
   const start = (currentPage.value - 1) * pageSize;
   const end = start + pageSize;
   return items.value.slice(start, end);
});

const rangeStart = computed(() => (currentPage.value - 1) * pageSize + 1);

const rangeEnd = computed(() =>
   Math.min(currentPage.value * pageSize, props.total),
);

const prevPage = () => {
   if (currentPage.value > 1) {
      currentPage.value--;
   }
};

const nextPage = () => {
   if (currentPage.value < totalPages.value) {
      currentPage.value++;
   }
};

const setPage = (page) => {
   if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
   }
};
</script>
