<template>
   <div>
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Recibo de Dinero
      </h2>

      <div v-if="detalle" class="w-full max-w-screen-md mx-auto border border-gray-300 p-4 shadow-md rounded">
         <table class="w-full">
            <tbody>
               <tr>
                  <td></td>
                  <td class="text-lg flex items-center">
                     <label class="font-bold text-xl mr-2">N°:</label>
                     <input v-model="detalle.numero" id="descripcion" :class="INPUT_CLASS.sm" />
                  </td>
               </tr>
               <tr>
                  <td class="text-lg"><label class="font-bold text-lg">Lugar y Fecha: </label>
                     {{ detalle.lugar }} {{ moment(detalle.fecha).format("DD/MM/YYYY") }}</td>
               </tr>
               <tr>
                  <td class="text-lg"><label class="font-bold text-lg">Recibido de: </label>
                     {{ detalle.recibidoDe }}</td>
               </tr>
               <tr>
                  <td class="text-lg"><label class="font-bold text-lg">Monto recibido (en números): </label>
                     {{ detalle.monto }} GS.</td>
               </tr>
               <tr>
                  <td class="text-lg"><label class="font-bold text-lg">Monto recibido (en letras): </label>
                     {{ detalle.montoLetras }} </td>
               </tr>
               <tr>
                  <td class="text-lg"><label class="font-bold text-lg">Por concepto de: </label>
                     {{ detalle.concepto }}</td>
               </tr>
            </tbody>
         </table>
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
import {
   INPUT_CLASS,
} from "../../../config"

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
