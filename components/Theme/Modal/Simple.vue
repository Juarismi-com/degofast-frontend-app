<template>
   <!-- Main modal -->
   <div>
      <div class="flex justify-end pb-4">
         <button
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            class="block text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            type="button"
            @click="setOpenModal"
         >
            {{ titleBtn }}
         </button>
      </div>
      <div
         id="default-modal"
         tabindex="-1"
         aria-hidden="true"
         :class="[
            'flex fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-100 max-h-full justify-center items-center bg-purple-500',
            openModal ? '' : 'hidden',
         ]"
      >
         <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
               <!-- Modal header -->
               <div
                  class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
               >
                  <h3
                     class="text-xl font-semibold text-gray-900 dark:text-white"
                  >
                     {{ title }}
                  </h3>
                  <button
                     type="button"
                     class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                     data-modal-hide="default-modal"
                     @click="setOpenModal"
                  >
                     <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                     >
                        <path
                           stroke="currentColor"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2"
                           d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                     </svg>
                     <span class="sr-only">Close modal</span>
                  </button>
               </div>
               <!-- Modal body -->
               <div class="p-6 space-y-6">
                  <slot></slot>
               </div>
               <!-- Modal footer -->
               <div
                  class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 justify-center"
               >
                  <button
                     data-modal-hide="default-modal"
                     type="button"
                     class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                     @click="setOpenModal"
                  >
                     Cancelar
                  </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { toRefs } from "@vueuse/core";

const props = defineProps({
   title: {
      type: String,
      default: "",
   },
   titleBtn: {
      type: String,
      default: "",
   },
});

const { title, titleBtn } = toRefs(props);

const openModal = ref(false);

const setOpenModal = () => {
   openModal.value = !openModal.value;
};
</script>
