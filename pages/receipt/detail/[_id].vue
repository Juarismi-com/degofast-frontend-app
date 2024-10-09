<template>
   <div>
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Recibo de Dinero
      </h2>

      <div v-if="detalle" class="max-w-16 mx-auto border border-gray-300 p-4 shadow-md rounded">
         <div>
            <p><strong>Número de Recibo:</strong> {{ detalle.numero }}</p>
         </div>

         <p><strong>Lugar y Fecha:</strong> {{ detalle.lugar }}, {{ moment(detalle.fecha).format("DD/MM/YYYY") }}</p>
         <p><strong>Recibido de:</strong> {{ detalle.recibidoDe }}</p>
         <p><strong>Monto recibido (en números):</strong> {{ detalle.monto }} {{ detalle.moneda }}</p>
         <p><strong>Monto recibido (en letras):</strong> {{ detalle.montoLetras }}</p>
         <p><strong>Por concepto de:</strong> {{ detalle.concepto }}</p>
      </div>

      <!-- Mensaje de carga si no hay detalles -->
      <div v-else>
         <p>Cargando detalles...</p>
      </div>
   </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import moment from "moment";
import {
   getReciboById
} from "~/services/recibo.service"
import { useRoute } from "vue-router";
import {
   formatNumber,
   formatPriceNumber,
   formatPriceNumberNoPYG,
   isValidCurrency
} from "~/helpers/number.helper";

definePageMeta({
   middleware: ["auth"],
});

const activeTab = ref(0);
const detalle = ref(null);
const localCurrency = ref(null);

const route = useRoute();

const fetchDetalle = async () => {
   try {
      const id = route.params._id;
      if (!id) return;
      const deRes = await getReciboById(id);
      detalle.value = deRes
      console.log(JSON.stringify(detalle.value));
      // localCurrency.value = detalle.value.moneda;
   } catch (error) {
      console.error("Error al obtener los detalles de la factura:", error);
   }
};

onMounted(() => {
   fetchDetalle();
});
</script>
