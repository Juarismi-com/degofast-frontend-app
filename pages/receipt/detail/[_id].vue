<template>
   <div class="max-w-2xl my-3 p-5" v-if="detalle">
      <!-- Membrete -->
      <div class="rounded border border-gray-300 p-4 shadow-md my-3">
         <div>
            <h3 class="-mx-4 -mt-4 rounded-t-lg bg-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-800">
               Recibo de dinero
            </h3>
         </div>

         <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
               <h1></h1>
               <br />
            </div>
            <div class="col-span-1 pt-4">
               <div class="mb-2 flex items-center">
                  <label class="font-bold text-xl mr-2">N°:</label>
                  <input v-model="detalle.numero" id="numero" :class="INPUT_CLASS.sm" class="w-full" />
               </div>

               <div class="mb-2">
                  <label class="font-bold text-base mr-2">Fecha:</label>
                  <label class="font-bold"> {{
                     moment(detalle.fecha).format("DD/MM/YYYY")
                  }}</label>
               </div>
            </div>
         </div>


         <div class="col-span-1 p-1">
            <div class="mb-2 flex items-center">
               <label class="font-bold text-base mr-2">Recibí de:</label>
               {{ detalle.recibidoDe }}
            </div>
            <div class="mb-2 flex items-center">
               <label class="font-bold text-base mr-2">La cantidad de:</label>
               <input v-model="detalle.montoLetras" id="recibidoDe" :class="INPUT_CLASS.sm" class="w-full" />
            </div>
            <div class="mb-2 flex items-center">
               <label class="font-bold text-base mr-2">En concepto de:</label>
               {{ detalle.concepto }}
            </div>
         </div>

         <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1 p-0">
               <div class="mb-2 flex items-center">

               </div>
            </div>
            <div class="col-span-1 p-0">
               <div class="mb-2 flex items-center">
                  <label class="font-bold text-xl mr-2"> {{
                     detalle.moneda === "PYG"
                        ? "Gs."
                        : "$"
                  }} </label>
                  <input v-model="detalle.monto" id="monto" :class="INPUT_CLASS.sm" class="w-full" />
               </div>


            </div>
         </div>

      </div>

   </div>

   <div class="max-w-4xl pt-5">
      <div v-if="detalle" class="grid grid-cols-1 md:grid-cols-3 gap-2">
      </div>

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
   layout: "empty",
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
