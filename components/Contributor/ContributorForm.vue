<template>
   <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Contribuyente
      </h2>

      <DEStepperFull :current-step="currentStep" :steps="steps" :next-step-fn="setCurrentStep" :btn-control="true">
         <div>
            <div v-if="currentStep == 0" class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow">
               <ContributorFormFullContributorDataComponent :contributor="contributor" />
            </div>

            <div v-if="currentStep == 1" class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow">
               <ContributorFormFullEstablecimientoComponent :contributor="contributor" />
            </div>

            <div v-if="currentStep == 2" class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow">
               <ContributorFormFullPuntoExpedicionComponent :contributor="contributor" />
            </div>

            <div v-if="currentStep == 3" class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow">
               <ContributorFormFullCertificadoComponent :contributor="contributor" />
            </div>

            <div v-if="currentStep == 4" class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow">
               <ContributorFormFullActividadEconomicaComponent :contributor="contributor" />
            </div>

            <!-- <div
               v-if="currentStep == 5"
               class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
               Pestaña 6
            </div> -->
         </div>
      </DEStepperFull>
   </div>
</template>

<script setup>
/**
 * @todo add object for establecimientos, by defailt send 1
 * @todo separate a component in actividadEconomica, establecimientos, etc
 * @todo add table of actividades generadas
 */
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores";

// datos del contribuyente
const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);

// current form view
const currentStep = ref(0);

const steps = [
   {
      title: "Datos del contribuyente",
   },
   {
      title: "Establecimientos",
   },
   {
      title: "Puntos de expedición",
   },
   {
      title: "Certificado",
   },
   {
      title: "Actividades Económicas",
   },
   // {
   //    title: "Usuarios con acceso",
   //    available: false,
   // },
];

const setCurrentStep = (value) => {
   currentStep.value = value;
};

// const registerFail = ref(false);

// const setContributorDefault = () => {
//    contributor;
// };

// const getDepartments = async () => {
//    try {
//       const departaments = await get("departments");
//       console.log(departaments);
//       return departaments;
//    } catch (error) {
//       console.log(error);
//       const data = error?.response?.data?.error;
//    }
// };
</script>
