<template>
   <div
      v-if="show"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
   >
      <div
         class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
         <div class="mt-3 text-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
               Generar evento
            </h3>
            <div class="mt-2 px-7 py-3">
               <form @submit.prevent="handleSubmit">
                  <div class="mb-4">
                     <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="cdc"
                        >CDC</label
                     >
                     <input
                        v-model="formData.cdc"
                        :class="INPUT_CLASS.basic"
                        id="cdc"
                        type="text"
                        placeholder="CDC"
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
                        :class="INPUT_CLASS.basic"
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
                        :class="INPUT_CLASS.basic"
                        id="motivo"
                        type="text"
                        placeholder="Motivo"
                     />
                  </div>

                  <div class="flex justify-end">
                     <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                     >
                        Guardar
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
   </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { TipoList } from "../../config/event.ts";
import { INPUT_CLASS } from "../../config";

import { create } from "~/services/http.service";

const props = defineProps({
   show: {
      type: Boolean,
      default: false,
   },
   cdc: String,
});

const emit = defineEmits(["update:show", "submit"]);

const formData = ref({
   tipo: "",
   motivo: "",
   fecha: "",
});

const handleSubmit = async () => {
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
      emit("submit", formData.value);
      handleClose();
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
