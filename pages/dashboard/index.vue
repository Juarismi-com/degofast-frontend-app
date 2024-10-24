<template>
   <div class="w-full overflow-hidden rounded-lg shadow-xs m-4">
      <div class="text-xl">
         <h3>Dashboard</h3>
         <hr />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-6">
         <a
            v-for="(card, index) in cards"
            :key="index"
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
         >
            <h5
               class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
               {{ card.title }}
            </h5>
            <hr />
            <p
               class="font-normal text-gray-700 dark:text-gray-400 text-center m-4"
            >
               {{ card.content }}
            </p>
         </a>
      </div>
   </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores";
import { getReports } from "~/services/dashboard.service";

definePageMeta({
   middleware: ["auth"],
});

// datos del contribuyente
const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);

const cards = ref([
   { title: "Total de Facturas", content: "Cargando..." },
   { title: "Facturas al Contado", content: "Cargando..." },
   { title: "Facturas a Crédito", content: "Cargando..." },
   { title: "Facturas con Contribuyentes", content: "Cargando..." },
   { title: "Facturas Anuladas", content: "Cargando..." },
   { title: "Facturas Canceladas", content: "Cargando..." },
   { title: "Total de Notas de Crédito", content: "Cargando..." },
   { title: "Notas de Crédito Anuladas", content: "Cargando..." },
   { title: "Notas de Crédito Canceladas", content: "Cargando..." },
   { title: "Notas de Débito", content: "Cargando..." },
]);

const generarReportes = async () => {
   const contributorId = contributor._object.contributor._id;

   try {
      const data = await getReports(contributorId);

      cards.value = [
         { title: "Total de Facturas", content: data.totalFactura },
         { title: "Facturas al Contado", content: data.totalFacturaContado },
         { title: "Facturas a Crédito", content: data.totalFacturaCredito },
         {
            title: "Facturas con Contribuyentes",
            content: data.totalFacturaContribuyentes,
         },
         { title: "Facturas Anuladas", content: data.totalFacturaAnulados },
         { title: "Facturas Canceladas", content: 0 },
         { title: "Total de Notas de Crédito", content: data.totalNotaCredito },
         {
            title: "Notas de Crédito Anuladas",
            content: data.totalNotaCreditoAnulados,
         },
         { title: "Notas de Crédito Canceladas", content: 0 },
         { title: "Notas de Débito", content: data.totalNotaDebito },
      ];
   } catch (error) {
      console.error("Error:", error);
   }
};

onMounted(() => {
   generarReportes();
});
</script>
