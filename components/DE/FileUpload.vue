<template>
   <form action="#" @submit="uploadFiles" method="post">
      <div class="grid grid-cols-2 gap-4">
         <div>
            <label
               class="block mb-2 text-sm font-medium text-gray-900"
               for="cabecera_file"
               >Cabeceras</label
            >
            <input
               class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
               aria-describedby="file_input_help"
               id="cabecera_file"
               type="file"
               name="cabecera"
               @change="fileSelected"
            />
            <p
               class="mt-1 text-sm text-gray-500"
               id="cabecera_input_help"
            >
               Revise los campos requeridos
            </p>
         </div>
         <div>
            <label
               class="block mb-2 text-sm font-medium text-gray-900"
               for="input_file"
               >Detalles (items)</label
            >
            <input
               class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
               aria-describedby="file_input_help"
               id="input_file"
               type="file"
               name="items"
               @change="fileSelected"
            />
            <p
               class="mt-1 text-sm text-gray-500"
               id="detalle_input_help"
            >
               Revise los campos requeridos
            </p>
         </div>
         <div class="col-span-2 flex justify-center">
            <button
               class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
               type="submit"
               :disabled="isSubmitting"
            >
               {{ isSubmitting ? "Subiendo..." : "Subir Archivos" }}
            </button>
         </div>
      </div>
   </form>
</template>

<script setup>
import axios from "axios";
import { useToast } from "vue-toast-notification";
import { useConfig } from "~/config";

const { API_URL } = useConfig();
const toast = useToast();

const props = defineProps({
   tipoDocumento: {
      default: 1,
   },
});

const emit = defineEmits(["submit"]);

const { tipoDocumento } = toRefs(props);

const files = ref({ cabecera: null, items: null });
const isSubmitting = ref(false);

const uploadFiles = async (e) => {
   e.preventDefault();
   if (isSubmitting.value) return;

   if (!files.value.cabecera || !files.value.items) {
      toast.error("Debe seleccionar ambos archivos antes de subirlos", {
         duration: 3000,
      });
      return;
   }

   isSubmitting.value = true;

   try {
      const formData = new FormData();
      formData.append("cabecera", files.value.cabecera);
      formData.append("items", files.value.items);
      formData.append("tipoDocumento", tipoDocumento.value);

      await axios.post(`${API_URL}/de/csv`, formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });

      toast.success("¡Archivos subidos con éxito!", { duration: 3000 });
      emit("submit");
      files.value = { cabecera: null, items: null };
   } catch (error) {
      console.error(error);
      const message =
         error?.response?.data?.message ||
         "No se pudieron subir los archivos. Intenta nuevamente.";
      toast.error(message, { duration: 3000 });
   } finally {
      isSubmitting.value = false;
   }
};

const fileSelected = (e) => {
   const selected = e.target.files[0];
   if (!selected) return;

   files.value[e.target.name] = selected;
};
</script>
