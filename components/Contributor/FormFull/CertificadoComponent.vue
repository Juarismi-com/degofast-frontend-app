<template>
   <div>
      <form @submit.prevent="saveCertified" method="post">
         <div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5">
            <div>
               <label for="formCertifiedFile" :class="[commonLabelClass]"
                  >Certificado</label
               >
               <input
                  type="file"
                  name="formCertifiedFile"
                  id="formCertifiedFile"
                  :class="[commonInputClass]"
                  @change="handleFileUpload"
               />
            </div>
            <div>
               <label for="formCertifiedPassword" :class="[commonLabelClass]"
                  >Contraseña</label
               >
               <input
                  type="text"
                  name="formCertifiedPassword"
                  id="formCertifiedPassword"
                  :class="[commonInputClass]"
                  placeholder="Contraseña"
                  v-model="formCertified.password"
               />
            </div>
            <div class="m-5">
               <button
                  type="submit"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               >
                  Guardar
               </button>
            </div>
            <h1 :style="{ color: certDataColor }" class="font-bold">
               {{ messageCertData }}
            </h1>
         </div>
      </form>
   </div>
</template>

<script setup>
import { create } from "~/services/http.service";
import { commonInputClass, commonLabelClass } from "~/config/styles";

import { defineProps } from "vue";

const props = defineProps({
   contributor: {
      type: Object,
      default: () => ({}),
   },
});

const formCertified = ref({
   cert: null,
   password: "",
});

const messageCertData = ref("No se ha cargado ningún certificado");
const certDataColor = ref("red");

/* @todo validar funcionalidad */
const saveCertified = async (e) => {
   try {
      if (props.contributor) {
         const formData = new FormData();

         if (formCertified.value.cert) {
            formData.append("cert", formCertified.value.cert);
         } else {
            console.error("No se ha seleccionado un archivo.");
            return;
         }

         formData.append("password", formCertified.value.password);

         const res = await create("certifieds/local", formData);
         console.log("Datos actualizados:", res);

         formCertified.value = {
            cert: null,
            password: "",
         };
      } else {
         console.log("Se debe cargar los datos del contribuyente", res);
      }
   } catch (error) {
      console.error("Error al actualizar los datos:", error.message);
   }
};

const handleFileUpload = (event) => {
   formCertified.value.cert = event.target.files[0];
};

onMounted(() => {
   if (props.contributor) {
      if (props.contributor?.certData?.length > 0) {
         messageCertData.value = "Ya se ha cargado un certificado";
         certDataColor.value = "green";
      }
   }
});
</script>
