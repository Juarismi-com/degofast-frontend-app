<template>
   <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
         <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Recibo
         </h1>
      </div>

      <DEStepperFull :current-step="currentStep" :steps="steps" :next-step-fn="setCurrentStep" :btn-control="true">
         <div>
            <div v-if="currentStep == 0" class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow">
               <ReceiptFormFullEmitterComponent :form-data="formData" :contributor="contributor" />
            </div>

            <div v-if="currentStep == 1" class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow">
               <ReceiptFormFullReceiverComponent :form-data="formData" :contributor="contributor" />
            </div>

            <div v-if="currentStep == 2" class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow">
               <ReceiptFormFullDetailComponent :form-data="formData" :contributor="contributor" /> 
            </div>

         </div>
      </DEStepperFull>
   </div>
</template>

<script setup>


import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores";
import { deReceiptData } from "~/config/receipt";

// tabs
const currentStep = ref(0);

const steps = [
   {
      title: "Datos del Emisor",
   },
   {
      title: "Datos del Receptor",
   },
   {
      title: "Detalle",
   },
];

const setCurrentStep = (value) => {
   currentStep.value = value;
};

// datos del contribuyente
const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);

// Datos de la url/ruta
const route = useRoute();
const tipoDocumento = ref(route.params.type);

// datos del formulario / documento electronico
const formData = ref({
   ...deReceiptData,
   tipoDocumento: tipoDocumento.value,
});

</script>
