<template>
   <div
      v-if="show"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
   >
      <div class="flex items-center justify-center min-h-screen">
         <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-lg font-bold mb-4">Success</h2>
            <p>{{ message }}</p>
            <button
               @click="handleClose"
               class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
               Aceptar
            </button>
         </div>
      </div>
   </div>
</template>

<script setup>
const props = defineProps({
   show: Boolean,
   message: String,
});

const emit = defineEmits(["close"]);

const handleClose = () => {
   emit("close");
};
</script>
