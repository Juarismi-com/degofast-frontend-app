<template>
   <div>
      <div class="flex justify-between my-6">
         <div>
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
               {{ title }}
            </h2>
         </div>
         <div>
            <button
               v-if="currentStep == steps.length - 1"
               @click="setIsPreviewModal"
               class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
               Generar Documento
            </button>
         </div>
      </div>

      <div>
         <DEStepperFull
            :current-step="currentStep"
            :steps="steps"
            :next-step-fn="setCurrentStep"
            :btn-control="true"
         >
            <div>
               <div v-if="currentStep == 0">
                  <div
                     class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow"
                  >
                     <DEFormFullCabeceraComponent
                        :form-data="formData"
                        :contributor="contributor"
                        :documentType="tipoDocumento"
                     />
                  </div>
               </div>

               <div
                  v-if="currentStep == 1"
                  class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow"
               >
                  <DEFormFullClienteComponent
                     :form-data="formData"
                     :contributor="contributor"
                  />
               </div>

               <div
                  v-if="currentStep == 2"
                  class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow"
               >
                  <DEFormFullItemDetalleComponent
                     :form-data="formData"
                     :contributor="contributor"
                  />
               </div>

               <div
                  v-if="currentStep == 3"
                  class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow"
               >
                  <DEMessageEnvioComponent
                     title="Procesamiento de Documento Electronico"
                     :submit-de-success="submitDeSuccess"
                     :confirm-submit="confirmSubmit"
                  />
               </div>
            </div>
         </DEStepperFull>
      </div>

      <div>
         <!-- Modal -->
         <DEModalPreview
            :form-data="formData"
            :contributor="contributor"
            :is-open="isPreviewModal"
            :set-open="setIsPreviewModal"
            :submit="submitDe"
         />
      </div>
   </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../../../stores";
import { TIPO_DOCUMENT_LIST } from "../../../../config";
import { deFormData, validatorDeForm } from "~/config/de";
import { formatDateHours, formatDate } from "~/helpers/date.helper";
import { saveDE } from "~/services";

// metadata
definePageMeta({
   middleware: ["auth"],
});

// Datos de la url/ruta
const route = useRoute();
const tipoDocumento = ref(route.params.type);
const routeList = ref(TIPO_DOCUMENT_LIST);
const routeSelected = ref(
   routeList.value.find((item) => item.tipoDocumento == route.params.type),
);
const title = ref(routeSelected.value.title);

// meta tags
useHead({
   title,
});

// current form view
const currentStep = ref(0);
const steps = [
   {
      title: "Documento Electronico",
   },
   {
      title: "Datos del Cliente",
   },
   {
      title: "Servicios/Productos",
   },
   {
      title: "Recepción de Documento",
      available: false,
   },
];
const setCurrentStep = (value) => {
   currentStep.value = value;
};

// Modal de previsualizacion de documento electronico
const isPreviewModal = ref(false);
const setIsPreviewModal = () => {
   if (validatorDeForm(formData.value)) {
      isPreviewModal.value = !isPreviewModal.value;
   } else {
      setCurrentStep(0);
   }
};

// datos del contribuyente
const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);

// datos del formulario / documento electronico
const initialFormData = JSON.parse(JSON.stringify(deFormData));

const formData = ref({
   ...deFormData,
   tipoDocumento: tipoDocumento.value,
});

const confirmSubmit = ref(false);
const submitDeSuccess = ref(false);

/**
 * Guarda el documento electronico de forma sincrona
 * @param payload
 */
const submitDe = async () => {
   try {
      setIsPreviewModal();

      confirmSubmit.value = true;

      const payload = {
         ...formData.value,
         fecha: formatDateHours(formData.value.fecha),
      };

      if (formData.value.documentoAsociado.formato === "2") {
         payload.documentoAsociado.fecha = formatDate(
            payload.documentoAsociado.fecha,
         );
      }

      if (payload.tipoDocumento == 1) {
         delete payload.documentoAsociado;
         delete payload.notaCreditoDebito;
      }

      const response = await saveDE(payload);

      if (response.de) {
         submitDeSuccess.value = true;

         resetForm();
      }
   } catch (error) {
      console.log(error);
   }
};

const resetForm = () => {
   formData.value = {
      ...initialFormData,
      tipoDocumento: tipoDocumento.value,
   };
};
</script>
