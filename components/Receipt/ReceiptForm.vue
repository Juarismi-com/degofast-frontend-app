<template>
   <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
         <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Recibo
         </h1>
      </div>

      <div class="p-6 bg-white grid grid-cols-4 gap-4 pb-4">
         <div>
            <label for="numero">Número:</label>
            <input type="text" v-model="formData.numero" id="numero" :class="INPUT_CLASS.sm" />
         </div>
         <div>
            <label for="recibidoDe">Recibido de:</label>
            <input type="text" v-model="formData.recibidoDe" id="recibidoDe" :class="INPUT_CLASS.sm" />
         </div>
         <div>
            <label for="fecha">Fecha:</label>
            <input type="datetime-local" v-model="formData.fecha" id="fecha" :class="INPUT_CLASS.sm" />
         </div>
      
         <div>
            <label for="monto">Monto</label>
            <input type="text" v-model="formData.monto" id="monto" :class="INPUT_CLASS.sm" />
         </div>
         <div>
            <label for="montoLetras">Monto en letras:</label>
            <input type="text" v-model="formData.montoLetras" id="montoLetras" :class="INPUT_CLASS.sm" />
         </div>
         <div>
            <label for="concepto">Concepto:</label>
            <input type="text" v-model="formData.concepto" id="concepto" :class="INPUT_CLASS.sm" />
         </div>
           
      </div>

      <div class="p-6 bg-white grid grid-cols-4 gap-4 pb-4">
         <button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="submitRecibo">
            Enviar
         </button>

      </div>

   </div>
</template>

<script setup>
import { INPUT_CLASS } from "~/config";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores";
import { deReceiptData, validateRecibo } from "~/config/receipt";
import { saveRecibo } from "~/services/recibo.service";
import { formatDateHours } from "~/helpers/date.helper";

const puntoExpedicionList = ref([])

// Relacionado al envio satisfactorio al api
const confirmSubmit = ref(false);
const submitDeSuccess = ref(false);

// datos del contribuyente
const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);

// Datos de la url/ruta
const route = useRoute();
const tipoDocumento = ref(route.params.type);

// datos del formulario / documento electronico
const formData = ref({
   ...deReceiptData,   
   tipoDocumento: 50   
});

const submitRecibo = async () => {
   try {
      
      // if (validateRecibo(formData.value)) {     
        
         confirmSubmit.value = true;

         const payload = {
            ...formData.value,          
            fecha: formatDateHours(formData.value.fecha),
         };      
     
         const response = await saveRecibo(payload);

         if (response.de) {
            submitDeSuccess.value = true;
            resetForm();
         }
     // } 
   } catch (error) {
      console.log(error);
   }
};

</script>
