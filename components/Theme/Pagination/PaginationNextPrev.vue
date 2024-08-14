<template>
   <div
         class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
      >
         <span class="flex items-center col-span-3">Pagina {{ currentPage }}</span>
         <span class="col-span-2"></span>
         <!-- Pagination -->
         <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
               <ul class="inline-flex items-center">
                  <li>
                     <button
                        class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Previous"
                        @click="prevPage"
                     >
                        < Anterior
                     </button>
                  </li>
                  
                  <li>
                     <button
                        class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Next"
                     >
                        Siguiente >
                     </button>
                  </li>
               </ul>
            </nav>
         </span>
      </div>
</template>

<script setup>

// debe recibir el elemento por parametro de url page, o el valor por defecto debe ser 0 / 1 (dependiendo de lo que figure en el api)
const currentPage = ref(1);

const nextPage = () => {
   // Op 1: emision de un evento
   // Op 2: refirect con el currentPage + 1  
}

const prevPage = () => {
   // Op 1: emision de un evento
   // Op 2: refirect con el currentPage - 1  
}

</script>