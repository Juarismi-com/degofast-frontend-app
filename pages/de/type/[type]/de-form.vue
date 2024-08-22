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

      <!--ToastSuccess v-if="showToast" message="Enviado correctamente" /-->
      <div>
         <DEStepperFull
            :current-step="currentStep"
            :steps="steps"
            :next-step-fn="setCurrentStep"
         >
            <!-- Steppers -->
            <div>
               <div v-if="currentStep == 0">
                  <div
                     class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow"
                  >
                     <DEFormFullCabeceraComponent
                        :form-data="formData"
                        :contributor="contributor"
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
                  <a
                     href="#"
                     class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                     Read more
                     <svg
                        class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                     >
                        <path
                           stroke="currentColor"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2"
                           d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                     </svg>
                  </a>
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
import moment from "moment";
import { useAuthStore } from "../../../../stores";
import { TIPO_DOCUMENT_LIST } from "../../../../config";
import { deFormData } from "~/config/de";

// metadata
definePageMeta({
   middleware: ["auth"],
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
];
const setCurrentStep = (value) => (currentStep.value = value);

// Datos de la url/ruta
const route = useRoute();
const tipoDocumento = ref(route.params.type);
const routeList = ref(TIPO_DOCUMENT_LIST);
const routeSelected = ref(
   routeList.value.find((item) => item.tipoDocumento == route.params.type),
);
const title = ref(routeSelected.value.title);

// Modal de previsualizacion de documento electronico
const isPreviewModal = ref(false);
const setIsPreviewModal = () => {
   isPreviewModal.value = !isPreviewModal.value;
};

// datos del contribuyente
const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);

// datos del formulario / documento electronico
const formData = ref({
   ...deFormData,
   tipoDocumento: tipoDocumento.value,
});

const openModal = ref(false);
//const loading = ref(false);

/**
 * Confirmacion de envio de documento electronico
 */
const confirmSubmitForm = async () => {
   try {
      if (validateForm()) {
         if (confirm("Desea crear el de?")) {
            let fecha = moment(formData.value.fecha).format(
               "YYYY-MM-DDTHH:mm:ss",
            );

            let payload = {
               ...formData.value,
               fecha,
            };
         }
      }

      openModal.value = false;
   } catch (error) {
      console.error("Error submitting form:", error);
      alert(error?.message);
   }
};

/**
 * Guarda el documento electronico de forma sincrona
 * @param payload
 */
const submitDe = async (payload) => {
   /*loading.value = true;
   try {
      const response = await saveDE(payload);
      cdc.value = response?.de?.cdc;
      showToast.value = true;

      setTimeout(() => {
         showToast.value = false;
      }, 3000);

      alert("Enviado correctamente");
      resetForm();
      loading.value = false;
   } catch (error) {
      console.log(error);
      const data = error?.response?.data?.error;
      alert(data?.details["ns2:dMsgRes"]);
      loading.value = false;
   }*/
   console.log(formData.value);
};

/**
 * Valida que ciertos atributos esten presentes en el formulario
 */
const validateForm = () => {
   const errors = [];
   const { fecha, cliente, items, puntoExpedicion } = formData.value;

   if (!fecha) errors.push("Fecha es requerido");

   if (!establecimiento) errors.push("Establecimiento es requerido");

   if (!puntoExpedicion) errors.push("Punto de Expedicion es requerido");

   if (!cliente.ruc) errors.push("Ruc de Cliente es requerido");

   if (!cliente.razonSocial) errors.push("Nombre de Cliente es requerido");

   if (items.length == 0) errors.push("Detalle es requerido");

   if (errors.length > 0) {
      const message = errors.join("\n");
      alert(message);

      return false;
   }

   return true;
};

/*
const resetForm = () => {
   formData.value = {
      ...formData.value,
      descripcion: "",
      cliente: {
         ruc: "",
         razonSocial: "",
         telefono: "",
         email: "",
      },
      items: [],
   };
}; */
</script>
