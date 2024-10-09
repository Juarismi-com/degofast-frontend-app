<template>
   <div
      class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
      <span class="flex items-center col-span-3">Pagina {{ currentPage }} de {{ props.totalPages }}</span>
      <span class="col-span-2"></span>
      <!-- Pagination -->
      <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
         <nav aria-label="Table navigation">
            <ul class="inline-flex items-center">
               <li>
                  <button class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                     aria-label="Previous" @click="prevPage()">
                     < Anterior </button>
               </li>

               <li>
                  <button class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                     aria-label="Next" @click="nextPage()">
                     Siguiente >
                  </button>
               </li>
            </ul>
         </nav>
      </span>
   </div>
</template>

<script setup>
import { ref } from "vue";

const currentPage = ref(1);

const props = defineProps({
   totalPages: {
      type: Number,
   },
});

const nextPage = () => {
   if (currentPage.value < props.totalPages) {
      currentPage.value++;
   }

   emitPageChange();
};

const prevPage = () => {
   if (currentPage.value > 1) {
      currentPage.value--;
   }
   emitPageChange();
};

const emit = defineEmits(["page-change"]);

const emitPageChange = () => {
   emit("page-change", currentPage.value);
};
</script>
