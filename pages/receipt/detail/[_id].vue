<template>
   <div class="max-w-screen-lg my-3 p-3" v-if="detalle">
      <!-- Membrete -->
      <div class="rounded border border-gray-300 p-3 shadow-md my-3">
         <div>
            <h3
               class="rounded-t-lg bg-gray-300 px-4 py-2 text-center text-xl font-medium text-gray-800"
            >
               Recibo de dinero
            </h3>
         </div>

         <div class="grid grid-cols-5 gap-4 p-6 mt-0">
            <div
               class="col-span-3 items-center justify-center text-center flex flex-col mt-3 border border-gray-400 p-4 rounded-lg"
            >
               <h1 class="text-3xl font-bold">
                  {{ authStore.contributor.recibo.cabecera.empresa }}
               </h1>
               <label
                  class="text-sm items-center justify-center text-center m-0"
                  >{{ authStore.contributor.recibo.cabecera.rubro }}</label
               >
               <label
                  class="text-sm items-center justify-center text-center m-0"
                  >{{ authStore.contributor.recibo.cabecera.zona }}</label
               >
               <label
                  class="text-sm items-center justify-center text-center m-0"
                  >{{ authStore.contributor.recibo.cabecera.servicio }}</label
               >
               <label
                  class="text-sm items-center justify-center text-center m-0"
                  ><u>Casa central:</u>
                  {{ authStore.contributor.recibo.cabecera.casaCentral }}</label
               >
               <label
                  class="text-sm items-center justify-center text-center m-0"
                  ><u>Sucursal:</u>
                  {{ authStore.contributor.recibo.cabecera.sucursal }}</label
               >
               <label
                  class="text-sm items-center justify-center text-center m-0"
                  >{{ authStore.contributor.recibo.cabecera.ciudad }} -
                  {{ authStore.contributor.recibo.cabecera.pais }}</label
               >
            </div>

            <div class="col-span-2 pt-6">
               <div class="mb-2 flex items-center justify-center text-center">
                  <label class="mr-2 text-3xl font-bold">{{
                     isValidCurrency(localCurrency) ? "₲s." : "U$S"
                  }}</label>
                  <label class="mr-2 text-3xl font-bold">{{
                     detalle.monto
                  }}</label>
               </div>

               <div
                  class="mb-2 pt-2 flex items-center justify-center text-center"
               >
                  <label class="text-xl mr-2 underline">RUC:</label>
                  <label class="text-xl mr-2">{{
                     authStore.contributor.ruc
                  }}</label>
               </div>

               <div
                  class="mb-2 pt-2 flex items-center justify-center text-center"
               >
                  <label class="font-bold text-2xl mr-2">N°: </label>
                  <label class="font-bold text-2xl mr-2">{{
                     detalle.numero
                  }}</label>
               </div>
            </div>
         </div>

         <div class="col-span-1 p-6">
            <div class="grid grid-cols-5 gap-4">
               <div class="col-span-3 pt-4">
                  <label class="font-bold text-xl mr-2 underline"
                     >Recibí de:</label
                  >
                  <label class="font-bold text-xl mr-2">{{
                     detalle.recibidoDe
                  }}</label>
               </div>
               <div class="col-span-1 pt-4">
                  <label class="font-bold text-xl mr-2 underline">RUC:</label>
                  <label class="font-bold text-xl mr-2">{{
                     detalle.ruc
                  }}</label>
               </div>
               <div class="col-span-1 pt-4">
                  <label class="font-bold text-xl mr-2 underline"
                     >C.I. N°:</label
                  >
                  <label class="font-bold text-xl mr-2">{{
                     detalle.ciNumber
                  }}</label>
               </div>
            </div>

            <div class="grid grid-cols-3 gap-4 pt-4">
               <label class="font-bold text-xl mr-2 underline"
                  >La cantidad de:</label
               >
               <input
                  v-model="detalle.montoLetras"
                  id="recibidoDe"
                  :class="INPUT_CLASS.sm"
                  class="col-span-4 w-full font-bold"
                  style="font-size: 18px"
                  disabled
               />
            </div>

            <div class="col-span-3 pt-4">
               <label class="font-bold text-xl mr-2 underline"
                  >Por concepto de: </label
               ><label class="font-bold text-xl mr-2">{{
                  detalle.concepto
               }}</label>
            </div>
         </div>

         <div class="col-span-1 font-bold">
            <div class="flex items-center pb-3">
               <label class="font-bold text-xl underline ml-6">Pagó en:</label>
               <label class="font-bold text-xl ml-2">{{
                  detalle.formaPago
               }}</label>
            </div>
            <table class="w-full">
               <tbody class="pt-3">
                  <tr
                     v-if="
                        detalle.formaPago == 'Cheque' ||
                        detalle.formaPago == 'Transferencia'
                     "
                  >
                     <td class="pt-3">
                        <label class="font-bold text-xl ml-6 underline"
                           >Banco:</label
                        >
                     </td>
                     <td class="pt-2 ml-2">
                        <input
                           id="banco"
                           v-model="detalle.banco"
                           :class="INPUT_CLASS.sm"
                           class="w-3/4 text-2xl"
                           style="font-size: 16px"
                           disabled
                        />
                     </td>
                     <td class="pt-3">
                        <label class="font-bold text-xl mr-2 p-4 underline"
                           >N°:</label
                        >
                     </td>
                     <td class="mr-2">
                        <input
                           id="numeroBanco"
                           v-model="detalle.nroBanco"
                           :class="INPUT_CLASS.sm"
                           class="text-2xl"
                           style="font-size: 16px"
                           disabled
                        />
                     </td>
                  </tr>
               </tbody>
            </table>
            <div class="grid grid-cols-2 gap-4 pt-12 text-center">
               <div
                  class="mb-2 flex items-center justify-center text-center pb-2"
               >
                  <label class="font-bold text-xl mr-2">Asunción,</label>
                  <label class="font-bold text-xl mr-2">
                     {{ moment(detalle.fecha).format("DD/MM/YYYY") }}</label
                  >
               </div>
               <div>
                  <label class="font-bold text-xl ml-3 mr-3">Firma: </label>
                  <label> ______________________________ </label>
               </div>
            </div>
         </div>
      </div>
   </div>

   <div class="max-w-4xl pt-5">
      <div v-if="detalle" class="grid grid-cols-1 md:grid-cols-3 gap-2"></div>

      <div v-else>
         <p>Cargando detalles...</p>
      </div>
   </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import moment from "moment";
import { useAuthStore } from "~/stores";
import { getReciboById } from "~/services/recibo.service";
import { useRoute } from "vue-router";
import { INPUT_CLASS } from "../../../config";
import { isValidCurrency } from "~/helpers/number.helper";

definePageMeta({
   layout: "empty",
});

// store
const authStore = useAuthStore();

const detalle = ref(null);
const route = useRoute();

const fetchDetalle = async () => {
   try {
      const id = route.params._id;
      if (!id) return;
      const deRes = await getReciboById(id);
      detalle.value = deRes;
      console.log(detalle.value);
   } catch (error) {
      console.error("Error al obtener los detalles de la factura:", error);
   }
};

onMounted(() => {
   fetchDetalle();
});
</script>

<style>
@media print {
   .max-w-screen-lg {
      max-width: none; /* Usa el ancho completo del papel */
   }
   .my-3,
   .p-5,
   .p-4 {
      margin: 0;
      padding: 0;
   }
   .border,
   .shadow-md {
      border: none;
      box-shadow: none;
   }

   .no-print {
      display: none;
   }
}
</style>
