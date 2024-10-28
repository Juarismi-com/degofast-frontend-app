<template>
   <div class="max-w-screen-md my-3 p-3" v-if="detalle">
      <div class="rounded border-2 border-gray-300 shadow-md">
         <!-- Membrete -->
         <div>
            <h3
               class="rounded-t-md bg-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-800"
            >
               Recibo de dinero
            </h3>
         </div>

         <!-- Cabecera -->
         <div class="grid grid-cols-5 gap-4 px-3">
            <div
               class="col-span-3 justify-center text-center flex flex-col border-gray-400 p-4 rounded-md text-xs item-center border-2 my-3"
            >
               <h1 class="text-xl font-bold">
                  {{ authStore.contributor.recibo.cabecera.empresa }}
               </h1>
               <label>{{ authStore.contributor.recibo.cabecera.rubro }}</label>
               <label>{{ authStore.contributor.recibo.cabecera.zona }}</label>
               <label>{{
                  authStore.contributor.recibo.cabecera.servicio
               }}</label>
               <label
                  ><u>Casa central:</u>
                  {{ authStore.contributor.recibo.cabecera.casaCentral }}</label
               >
               <label
                  ><u>Sucursal:</u>
                  {{ authStore.contributor.recibo.cabecera.sucursal }}</label
               >
               <label
                  >{{ authStore.contributor.recibo.cabecera.ciudad }} -
                  {{ authStore.contributor.recibo.cabecera.pais }}</label
               >
            </div>
            <div class="col-span-2">
               <div class="justify-center text-center mt-10 text-base">
                  <label class="font-bold">{{
                     isValidCurrency(localCurrency) ? "₲s." : "U$S"
                  }}</label>
                  <label class="font-bold">{{ detalle.monto }}</label>
                  <br />

                  <label class="">RUC:</label>
                  <label class="">{{ authStore.contributor.ruc }}</label>
                  <br />

                  <label class="font-bold">N°: </label>
                  <label class="font-bold">{{ detalle.numero }}</label>
               </div>
            </div>
         </div>

         <!-- Relacionado con el emisor-->
         <div class="grid grid-cols-4 gap-4 px-3 py-1 text-sm">
            <div class="col-span-2">
               <label class="font-bold underline">Recibí de:</label>
               <label class="font-bold text-sm">
                  {{ detalle.recibidoDe }}</label
               >
            </div>
            <div>
               <label class="font-bold underline">RUC:</label>
               <label class="font-bold text-sm">{{ detalle.ruc }}</label>
            </div>
            <div>
               <label class="font-bold underline">C.I. N°:</label>
               <label class="font-bold">{{ detalle.ciNumber }}</label>
            </div>
         </div>

         <!-- Contenido/cuerpo -->
         <div class="grid grid-cols-2 gap-4 py-1 px-3 text-sm">
            <div class="col-span-2">
               <label class="font-bold underline">La cantidad de:</label>
               <input
                  v-model="detalle.montoLetras"
                  id="recibidoDe"
                  :class="INPUT_CLASS.sm"
                  class="font-bold"
                  disabled
               />
            </div>

            <div class="col-span-2">
               <span class="underline font-bold">Por concepto de: </span>
               {{ detalle.concepto }}
            </div>

            <div>
               <label class="font-bold underline">Pagó en:</label>
               <label class="font-bold">{{ detalle.formaPago }}</label>
            </div>
         </div>

         <!-- Tipo Pago Info -->
         <div
            class="grid grid-cols-2 gap-4 px-3 py-1"
            v-if="
               detalle.formaPago == 'Cheque' ||
               detalle.formaPago == 'Transferencia'
            "
         >
            <div>
               <label class="font-bold text-sm underline">Banco:</label>
               <input
                  id="banco"
                  v-model="detalle.banco"
                  :class="[INPUT_CLASS.sm, 'text-sm']"
                  style="font-size: 12px"
                  disabled
               />
            </div>
            <div>
               <label class="font-bold text-sm underline">NRO:</label>
               <input
                  id="numeroBanco"
                  v-model="detalle.nroBanco"
                  :class="[INPUT_CLASS.sm, 'text-sm']"
                  style="font-size: 12px"
                  disabled
               />
            </div>
         </div>

         <!-- footer/firma y fecha -->
         <div class="grid grid-cols-2 gap-4 px-3 py-5 my-5">
            <div>
               <label class="font-bold text-sm mr-2">Asunción,</label>
               <label class="font-bold text-sm mr-2">
                  {{ moment(detalle.fecha).format("DD/MM/YYYY") }}</label
               >
            </div>
            <div>
               <label class="font-bold text-sm">Firma: </label>
               <hr />
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
      alert(error);
      console.error("Error al obtener datos del recibo:", error);
   }
};

onMounted(() => {
   fetchDetalle();
});
</script>
