<template>
   <form action="#" @submit="uploadFiles" method="post">
      <input type="file" name="cabecera" @change="fileSelected" />
      <input type="file" name="items" @change="fileSelected" />
      <button class="btn-blue-500" type="submit">Subir Archivos</button>
   </form>
</template>

<script setup>
import axios from "axios";

const props = defineProps({
   tipoDocumento: {
      default: 1,
   },
});

const { tipoDocumento } = toRefs(props);

const formData = ref(new FormData());

const uploadFiles = async (e) => {
   e.preventDefault();
   console.log(tipoDocumento);
   formData.value.append("tipoDocumento", tipoDocumento.value);
   axios.post("http://localhost:8000/de/csv", formData.value, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });
};

const fileSelected = (e) => {
   const files = e.target.files;
   formData.value.append(e.target.name, files[0]);
};
</script>
