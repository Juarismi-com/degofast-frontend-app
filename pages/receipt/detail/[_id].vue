<template>
   <div class="max-w-screen-lg my-3 p-5" v-if="detalle">
      <!-- Membrete -->
      <div class="rounded border border-gray-300 p-4 shadow-md my-3">
         <div>
            <h3
               class="-mx-4 -mt-4 rounded-t-lg bg-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-800"
            >
               Recibo de dinero
            </h3>
         </div>

         <div class="grid grid-cols-5 gap-4 mt-0">
            <div
               class="col-span-3 items-center justify-center text-center flex flex-col mt-3 border border-gray-400 p-4 rounded-lg"
            >
               <h1 class="text-3xl font-bold">BUENA SUERTE S.A.I.C.</h1>
               <label
                  class="text-xs items-center justify-center text-center m-0"
                  >Inmobiliaria Constructora</label
               >
               <label
                  class="text-xs items-center justify-center text-center m-0"
                  >YKUA SATI</label
               >
               <label
                  class="text-xs items-center justify-center text-center m-0"
                  >Servicios de alojamiento</label
               >
               <label
                  class="text-xs items-center justify-center text-center m-0"
                  ><u>Casa central:</u> Alberdi N°: 456 - Planta baja - Tel:
                  (021) 449-801</label
               >
               <label
                  class="text-xs items-center justify-center text-center m-0"
                  ><u>Sucursal:</u> Mayor Evacio Perenciollo e/ Cnel. Alejo S. y
                  Dr. Jaime Bestard - Tel/Fax: (021 601-230)</label
               >
               <label
                  class="text-xs items-center justify-center text-center m-0"
                  >Asunción - Paraguay</label
               >
            </div>

            <div class="col-span-2 pt-4">
               <div class="mb-2 flex items-center">
                  <label class="font-bold text-xl mr-2">₲s./U$S </label>
                  <input
                     id="numero"
                     :value="detalle.monto"
                     :class="INPUT_CLASS.sm"
                     class="w-full text-center font-bold"
                     style="font-size: 18px"
                  />
               </div>

               <div class="mb-2 flex items-center justify-center text-center">
                  <label class="text-lg mr-2">RUC:</label>
                  <label class="text-lg mr-2">{{
                     authStore.contributor.ruc
                  }}</label>
               </div>

               <div class="mb-2 flex items-center justify-center text-center">
                  <label class="font-bold text-xl mr-2">N°: </label>
                  <label class="font-bold text-xl mr-2">{{
                     detalle.numero
                  }}</label>
               </div>
            </div>
         </div>

         <div class="col-span-1 p-1">
            <div class="grid grid-cols-5 gap-4">
               <div class="col-span-3 pt-4">
                  <label class="font-bold text-base mr-2">Recibí de:</label>
                  {{ detalle.recibidoDe }}
               </div>
               <div class="col-span-2 pt-4">
                  <label class="font-bold text-base mr-2">RUC:</label>
               </div>
            </div>

            <div class="grid grid-cols-5 gap-4">
               <div class="col-span-1 pt-4">
                  <label class="font-bold text-base mr-2"
                     >La cantidad de:</label
                  >
               </div>
               <div class="col-span-1 pt-4">
                  <label class="font-bold text-base mr-2">Guaranies</label>
                  <input
                     type="checkbox"
                     id="guaranies"
                     v-model="guaraniesChecked"
                     class="mr-2"
                     disabled
                  />
               </div>
               <div class="col-span-3 pt-4">
                  <label class="font-bold text-base mr-2">Dólares</label>
                  <input
                     type="checkbox"
                     id="dolares"
                     v-model="dolaresChecked"
                     class="mr-2"
                     disabled
                  />
               </div>
            </div>
            <div class="grid grid-cols-1 gap-4 p-2">
               <input
                  v-model="detalle.montoLetras"
                  id="recibidoDe"
                  :class="INPUT_CLASS.sm"
                  class="w-full font-bold"
                  style="font-size: 18px"
               />
            </div>

            <div class="col-span-3 pt-4">
               <label class="font-bold text-base mr-2">Por concepto de: </label
               >{{ detalle.concepto }}
            </div>
         </div>

         <div class="col-span-1 p-1 font-bold">
            <table>
               <tbody>
                  <tr>
                     <td class="pt-3">
                        <label class="font-bold text-base mr-2"
                           ><u>Pagó en:</u></label
                        >
                     </td>
                     <td class="pt-3">
                        <label class="font-bold text-base mr-2">Cheque</label>
                        <input
                           type="checkbox"
                           id="cheque"
                           class="mr-2"
                           disabled
                        />
                     </td>

                     <td class="pt-3">
                        <label class="font-bold text-base mr-2 p-4"
                           >Banco:</label
                        >
                     </td>
                     <td class="pt-2">
                        <input
                           id="banco"
                           :class="INPUT_CLASS.sm"
                           class="w-full"
                           style="font-size: 16px"
                        />
                     </td>
                     <td class="pt-3">
                        <label class="font-bold text-base mr-2 p-4">N°:</label>
                     </td>
                     <td class="pt-3">
                        <input
                           id="numeroBanco"
                           :class="INPUT_CLASS.sm"
                           style="font-size: 16px"
                        />
                     </td>
                  </tr>
                  <tr>
                     <td class="pt-3"></td>
                     <td class="pt-3">
                        <label class="font-bold text-base mr-2"
                           >Transferencia</label
                        >
                        <input
                           type="checkbox"
                           id="transferencia"
                           class="mr-2"
                           disabled
                        />
                     </td>
                  </tr>
                  <tr>
                     <td class="pt-3"></td>
                     <td class="pt-3">
                        <label class="font-bold text-base mr-2">Efectivo</label>
                        <input
                           type="checkbox"
                           id="efectivo"
                           class="mr-2"
                           disabled
                        />
                     </td>
                     <td class="pt-3"></td>
                     <td class="pt-3"></td>
                     <td class="pt-3">Firma</td>
                     <td class="pt-3">----------------------------------</td>
                  </tr>
               </tbody>
            </table>
            <div class="grid grid-cols-4 gap-4 pt-3">
               <div class="col-span-2 pt-4">
                  <label class="font-bold text-base mr-2">Asunción,</label>
                  <label>
                     {{ moment(detalle.fecha).format("DD/MM/YYYY") }}</label
                  >
               </div>
               <div class="col-span-2 pt-4">
                  <label class="font-bold text-base mr-2">C.I. N°.</label>
                  <label> ----------------------------------</label>
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

definePageMeta({
   layout: "empty",
});

const guaraniesChecked = ref(false);
const dolaresChecked = ref(false);
const detalle = ref(null);
const authStore = useAuthStore();

const route = useRoute();

const fetchDetalle = async () => {
   try {
      const id = route.params._id;
      if (!id) return;
      const deRes = await getReciboById(id);
      detalle.value = deRes;
      checkCurrency(detalle.value.moneda);
   } catch (error) {
      console.error("Error al obtener los detalles de la factura:", error);
   }
};

/* Checkbox */
function checkCurrency(currency) {
   guaraniesChecked.value = false;
   dolaresChecked.value = false;

   if (currency === "PYG") {
      guaraniesChecked.value = true;
   } else {
      dolaresChecked.value = true;
   }
}

onMounted(() => {
   fetchDetalle();
});
</script>
