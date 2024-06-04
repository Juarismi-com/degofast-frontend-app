<template>
   <div
      v-if="show"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
   >
      <div class="bg-white p-6 rounded shadow-md text-center">
         <h2 class="text-lg font-bold mb-4">{{ title }}</h2>
         <p class="mb-4">{{ message }}</p>
         <button
            @click="confirm"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
         >
            Confirmar
         </button>
         <button
            @click="cancel"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
         >
            Cancelar
         </button>
      </div>
   </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
   title: {
      type: String,
      required: true,
   },
   message: {
      type: String,
      required: true,
   },
   show: {
      type: Boolean,
      default: false,
   },
});

const emit = defineEmits(["confirm", "cancel"]);

const confirm = () => {
   emit("confirm");
};

const cancel = () => {
   emit("cancel");
};
</script>
