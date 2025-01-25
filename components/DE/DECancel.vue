<template>
   <Loader v-if="loading" />
   <div
      v-if="show"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
   >
      <div
         class="relative top-20 mx-auto p-5 border max-w-prose shadow-lg rounded-md bg-white"
      >
         <div class="mt-3 text-center">
            <h3 class="text-xl leading-6 font-medium text-gray-900">
               Generar evento
            </h3>
            <div class="mt-2 px-7 py-3">
               <form @submit.prevent="handleSubmit">
                  <div class="mb-4">
                     <label
                        class="block text-gray-700 text-ls font-bold mb-2"
                        for="cdc"
                        >CDC</label
                     >
                     <input
                        v-model="formData.cdc"
                        class="!text-lg"
                        :class="[INPUT_CLASS.basic, 'text-center']"
                        id="cdc"
                        type="text"
                        disabled
                     />
                  </div>
                  <div class="mb-4">
                     <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="tipo"
                     >
                        Tipo
                     </label>
                     <select
                        v-model="formData.tipo"
                        class="!text-lg"
                        :class="[INPUT_CLASS.basic]"
                        id="tipo"
                        placeholder="Tipo"
                     >
                        <option
                           v-for="(option, index) in TipoList"
                           :key="index"
                           :value="option.value"
                        >
                           {{ option.label }}
                        </option>
                     </select>
                  </div>
                  <div class="mb-4">
                     <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="motivo"
                        >Motivo</label
                     >
                     <input
                        v-model="formData.motivo"
                        :class="[INPUT_CLASS.basic]"
                        id="motivo"
                        type="text"
                        placeholder="Motivo"
                     />
                  </div>

                  <div class="flex justify-end">
                     <button
                        class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                        type="submit"
                     >
                        Generar
                     </button>
                     <button
                        @click="handleClose"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                     >
                        Cerrar
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>

      <!-- Loader Overlay -->
      <Loader v-if="loading" />
   </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { TipoList } from "../../config/event.ts";
import { INPUT_CLASS } from "../../config";
import Loader from "@/components/Loader/Loader.vue";

import { create } from "~/services/http.service";
import Loader from "@/components/Loader/Loader.vue";

const loading = ref(false);

const props = defineProps({
   show: {
      type: Boolean,
      default: false,
   },
   cdc: String,
});

const emit = defineEmits(["update:show", "submit"]);

const formData = ref({
   tipo: 1,
   motivo: "",
   cdc: "",
});

const handleSubmit = async () => {
   loading.value = true;
   try {
      const payload = {
         motivo: formData.value.motivo,
      };

      const res = await create(`de/${formData.value.cdc}/event`, payload);

      alert(res.mensaje);
   } catch (error) {
      let errorMessage = "Ocurrió un error en la solicitud.";

      if (error.response && error.response.data && error.response.data.error) {
         errorMessage = error.response.data.error.mensaje;
      }

      alert(errorMessage);
   } finally {
      loading.value = false;
      emit("submit", formData.value);
   }
};

const handleClose = () => {
   emit("update:show", false);
};

watch(
   () => props.cdc,
   (newCdc) => {
      formData.value.cdc = newCdc;
   },
   { immediate: true },
);
</script>
