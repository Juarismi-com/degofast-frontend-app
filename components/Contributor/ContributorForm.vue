<template>
   <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Contribuyente
      </h2>

      <DEStepperFull
         :current-step="currentStep"
         :steps="steps"
         :next-step-fn="setCurrentStep"
         :btn-control="true"
         :step-availability="availableSteps"
      >
         <div>
            <div
               v-if="currentStep == 0"
               class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
               <ContributorFormFullContributorDataComponent
                  :contributor="contributor"
               />
            </div>

            <div
               v-if="currentStep == 1"
               class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
               <ContributorFormFullEstablecimientoComponent
                  :contributor="contributor"
               />
            </div>

            <div
               v-if="currentStep == 2"
               class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
               <ContributorFormFullPuntoExpedicionComponent
                  :contributor="contributor"
               />
            </div>

            <div
               v-if="currentStep == 3"
               class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
               <ContributorFormFullActividadEconomicaComponent
                  :contributor="contributor"
               />
            </div>

            <div
               v-if="currentStep == 4"
               class="max-w p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
               <ContributorFormFullCertificadoComponent
                  :contributor="contributor"
               />
            </div>
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
import { useContributorStore } from "~/stores";
import { getPuntoExpedicionByFilters } from "~/services/punto-expedicion.service.ts";

// datos del contribuyente
const contributorStore = useContributorStore();
const { contributor } = storeToRefs(contributorStore);
const puntoExpedicionList = ref([]);

// current form view
const currentStep = ref(0);

// manejo de pestañas
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
      title: "Actividades Económicas",
   },
   {
      title: "Certificado",
   },
];

const setCurrentStep = (value) => {
   if (availableSteps.value[value]) {
      currentStep.value = value;
   }
};

const availableSteps = computed(() => {
   return [
      true,
      contributor.value?._id ? true : false,
      contributor.value?.establecimientos?.length > 0 ? true : false,
      puntoExpedicionList.value?.length > 0 ? true : false,
      contributor.value?.certData?.length > 0 ? true : false,
   ];
});

onMounted(async () => {
   puntoExpedicionList.value = await getPuntoExpedicionByFilters({
      contributor: contributor.value?._id,
   });
});
</script>
