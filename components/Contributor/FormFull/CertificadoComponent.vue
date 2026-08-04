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
                  type="password"
                  name="formCertifiedPassword"
                  id="formCertifiedPassword"
                  autocomplete="new-password"
                  :class="[commonInputClass]"
                  placeholder="Contraseña"
                  v-model="formCertified.password"
               />
            </div>
            <div class="m-5">
               <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {{ isSubmitting ? "Guardando..." : "Guardar" }}
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
import { useToast } from "vue-toast-notification";

import { defineProps } from "vue";

const props = defineProps({
   contributor: {
      type: Object,
      default: () => ({}),
   },
});

const toast = useToast();

const formCertified = ref({
   cert: null,
   password: "",
});

const messageCertData = ref("No se ha cargado ningún certificado");
const certDataColor = ref("red");
const isSubmitting = ref(false);

const saveCertified = async (e) => {
   if (isSubmitting.value) return;

   if (!props.contributor?._id) {
      toast.error("Primero debe cargar los datos del contribuyente", {
         duration: 3000,
      });
      return;
   }

   if (!formCertified.value.cert) {
      toast.error("Debe seleccionar un archivo de certificado", {
         duration: 3000,
      });
      return;
   }

   if (!formCertified.value.password) {
      toast.error("Debe ingresar la contraseña del certificado", {
         duration: 3000,
      });
      return;
   }

   isSubmitting.value = true;

   try {
      const formData = new FormData();
      formData.append("cert", formCertified.value.cert);
      formData.append("password", formCertified.value.password);

      await create("certifieds/local", formData);

      toast.success("¡Certificado cargado con éxito!", { duration: 3000 });
      messageCertData.value = "Ya se ha cargado un certificado";
      certDataColor.value = "green";

      formCertified.value = {
         cert: null,
         password: "",
      };
   } catch (error) {
      console.error("Error al actualizar los datos:", error);
      const message =
         error?.response?.data?.error ||
         "No se pudo cargar el certificado. Intenta nuevamente.";
      toast.error(message, { duration: 3000 });
   } finally {
      isSubmitting.value = false;
   }
};

const handleFileUpload = (event) => {
   formCertified.value.cert = event.target.files[0];
};

onMounted(() => {
   if (props.contributor?.certData?.length > 0) {
      messageCertData.value = "Ya se ha cargado un certificado";
      certDataColor.value = "green";
   }
});
</script>
