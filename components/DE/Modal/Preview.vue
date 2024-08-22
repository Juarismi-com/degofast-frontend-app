<template>
   <div
      v-if="isOpen"
      id="default-modal"
      tabindex="-1"
      class="fixed inset-0 z-50 flex items-center justify-center w-full bg-gray-800 bg-opacity-50"
   >
      <div class="relative p-4 w-full max-w-4xl max-h-screen overflow-y-auto">
         <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div
               class="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600"
            >
               <h3
                  class="text-xl font-semibold text-gray-900 dark:text-white text-center"
               >
                  Vista previa del documento
               </h3>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
               <DEPreviewFormatBasic :detalle="formData" />
            </div>
            <!-- Modal footer -->
            <div
               class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
               <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  @click="submit"
               >
                  Desea crear el de?
               </button>
               <button
                  type="button"
                  class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  @click="setOpen"
               >
                  Cancelar
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { deItemData } from "~/config/de";

const props = defineProps({
   formData: {
      type: Object,
      default: {},
   },
   contributor: {
      type: Object,
      default: {},
   },
   isOpen: {
      type: Boolean,
      default: false,
   },
   setOpen: {
      type: Function,
      default: () => {},
   },
   submit: {
      type: Function,
      default: () => {},
   },
});

const { formData } = toRefs(props);

const item = ref({ ...deItemData });
</script>
