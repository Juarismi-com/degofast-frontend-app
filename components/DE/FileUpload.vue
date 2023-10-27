<template>
   <form action="#" @submit="uploadFiles" method="post">
      <div class="grid grid-cols-2 gap-4">
         <div>
            <label
               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
               for="cabecera_file"
               >Cabeceras</label
            >
            <input
               class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
               aria-describedby="file_input_help"
               id="cabecera_file"
               type="file"
               name="cabecera"
               @change="fileSelected"
            />
            <p
               class="mt-1 text-sm text-gray-500 dark:text-gray-300"
               id="cabecera_input_help"
            >
               Revise los campos requeridos
            </p>
         </div>
         <div>
            <label
               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
               for="input_file"
               >Detalles (items)</label
            >
            <input
               class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
               aria-describedby="file_input_help"
               id="input_file"
               type="file"
               name="items"
               @change="fileSelected"
            />
            <p
               class="mt-1 text-sm text-gray-500 dark:text-gray-300"
               id="detalle_input_help"
            >
               Revise los campos requeridos
            </p>
         </div>
         <div class="col-span-2 flex justify-center">
            <button
               class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               type="submit"
            >
               Subir Archivos
            </button>
         </div>
      </div>
   </form>
</template>

<script setup>
import axios from "axios";

const props = defineProps({
   tipoDocumento: {
      default: 1,
   },
});

const emit = defineEmits(["submit"]);

const { tipoDocumento } = toRefs(props);

const formData = ref(new FormData());

const uploadFiles = async (e) => {
   try {
      e.preventDefault();

      formData.value.append("tipoDocumento", tipoDocumento.value);
      axios.post("http://localhost:8000/de/csv", formData.value, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });

      emit("submit");
      formData.value = new FormData();
   } catch (error) {
      console.log(error);
   }
};

const fileSelected = (e) => {
   const files = e.target.files;
   formData.value.append(e.target.name, files[0]);
};
</script>
