<template>
   <div class="container mx-auto pt-5">
      <div v-if="detalle" class="grid grid-cols-1 md:grid-cols-3 gap-2">
         <!-- Cuadro 1 -->

         <div
            class="rounded border border-gray-300 p-4 shadow-md md:col-span-3"
         >
            <h3
               class="-mx-4 -mt-4 rounded-t-lg bg-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-800"
            >
               KuDE de Factura Electrónica
            </h3>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
               <div class="col-span-1 grid grid-cols-1 md:col-span-3">
                  <table class="w-full border-collapse">
                     <tr>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-lg font-semibold"
                        >
                           FACTURA ELECTRÓNICA: <br />
                           {{ detalle.establecimiento }}-{{ detalle.punto }}-{{
                              detalle.numero
                           }}
                           <br />
                        </td>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-base font-normal"
                        >
                           Timbrado N°:
                           <label class="font-bold"
                              >{{
                                 authStore.contributor.timbradoNumero
                              }} </label
                           ><br />

                           Fecha de timbrado:
                           <label class="font-bold">
                              {{
                                 moment(
                                    authStore.contributor.timbradoFecha,
                                 ).format("YYYY-MM-DD")
                              }}</label
                           >
                           <br />
                        </td>
                     </tr>
                  </table>
               </div>
            </div>
         </div>

         <!-- Cuadro 2 -->
         <div
            class="rounded border border-gray-300 p-2 shadow-md md:col-span-3"
         >
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
               <div class="col-span-1 grid grid-cols-1 md:col-span-3">
                  <table class="w-full border-collapse">
                     <tr>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Fecha y hora de emisión:
                           <label class="font-bold">{{
                              formatDateTime(detalle.fecha)
                           }}</label>
                        </td>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-sm font-medium"
                        >
                           RUC/Documento de identidad N°:
                           <label class="font-bold">{{
                              detalle.cliente.ruc
                           }}</label>
                        </td>
                     </tr>
                     <tr>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Condición de venta:
                           <label class="font-bold">{{
                              detalle.condicionName
                           }}</label>
                        </td>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-sm font-medium"
                        >
                           Nombre o Razón Social:
                           <label class="font-bold">{{
                              detalle.cliente.razonSocial
                           }}</label>
                        </td>
                     </tr>
                     <tr>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Cuotas: -
                        </td>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-sm font-medium"
                        >
                           Dirección:
                           <label class="font-bold">{{
                              detalle.cliente.direccion
                           }}</label>
                        </td>
                     </tr>
                     <tr>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Moneda:
                           <label class="font-bold">{{ detalle.moneda }}</label>
                        </td>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Tipo de cambio:
                           <label class="font-bold">
                              {{ detalle.cambio ?? "-" }}</label
                           >
                        </td>
                     </tr>
                     <tr>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Tipo de cambio: -
                        </td>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-sm font-medium"
                        >
                           Correo electrónico:
                           <label class="font-bold">{{
                              detalle?.cliente?.email
                           }}</label>
                        </td>
                     </tr>
                     <!--tr>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Documento asociado CDC o preimpreso (opcional):
                        </td>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-sm font-medium"
                        >
                           Tipo de operación:
                           <label class="font-bold">{{
                              detalle.tipoOperacionName
                           }}</label>
                        </td>
                     </tr>
                     <tr>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Tipo de documento asociado: FE o preimpreso
                           (opcional):
                        </td>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-sm font-medium"
                        >
                           Teléfono:
                           <label class="font-bold">{{
                              detalle.cliente.telefono
                           }}</label>
                        </td>
                     </tr-->
                  </table>
               </div>
            </div>
         </div>

         <!-- Detalle -->
         <div class="md:col-span-3 p-1 shadow-md rounded">
            <table class="min-w-full border border-gray-200">
               <thead class="bg-gray-300 text-gray-800">
                  <tr>
                     <th
                        scope="col"
                        class="px-6 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                     >
                        Código
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                     >
                        Descripción
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                     >
                        Cantidad
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                     >
                        Precio Unitario
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                     >
                        Descuento
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                     >
                        Monto IVA
                     </th>
                  </tr>
               </thead>
               <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in detalle.items" :key="item._id">
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200 text-right"
                     >
                        <div class="text-sm text-gray-900">
                           {{ formatNumber(item.codigo) }}
                        </div>
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        <div class="text-sm text-gray-900">
                           {{ item.descripcion }}
                        </div>
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200 text-right"
                     >
                        <div class="text-sm text-gray-900">
                           {{ formatNumber(item.cantidad) }}
                        </div>
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200 text-right"
                     >
                        <div class="text-sm text-gray-900">
                           {{ formatPriceNumber(item.precioUnitario) }}
                        </div>
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200 text-right"
                     >
                        <div class="text-sm text-gray-900">
                           {{
                              formatNumber(
                                 item.descuento ? item.descuento : "0",
                              )
                           }}
                        </div>
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200 text-right"
                     >
                        <div class="text-sm text-gray-900">
                           {{ formatPriceNumber(item.ivaBase) }}
                        </div>
                     </td>
                  </tr>
               </tbody>
               <tfoot class="bg-gray-300 text-gray-800">
                  <tr>
                     <td
                        colspan="5"
                        class="px-6 py-1 whitespace-nowrap border border-gray-200 font-bold"
                     >
                        Subtotal:
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200 text-right"
                     >
                        {{
                           formatPriceNumber(detalle.total - detalle.totalIva)
                        }}
                     </td>
                  </tr>
                  <tr>
                     <td
                        colspan="5"
                        class="px-6 py-1 whitespace-nowrap border border-gray-200 font-bold"
                     >
                        Total de la operación:
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200 text-right"
                     >
                        {{ formatPriceNumber(detalle.total) }}
                     </td>
                  </tr>
                  <tr>
                     <td
                        colspan="2"
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        <label class="font-bold">IVA (5%):</label>
                        {{ formatPriceNumber(detalle.iva5) }}
                     </td>

                     <td
                        colspan="2"
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        <label class="font-bold">IVA (10%):</label>
                        {{ formatPriceNumber(detalle.iva10) }}
                     </td>
                     <td
                        colspan="1"
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        <label class="font-bold">Total IVA:</label>
                     </td>

                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200 text-right"
                     >
                        {{ formatPriceNumber(detalle.totalIva) }}
                     </td>
                  </tr>
               </tfoot>
            </table>
         </div>

         <!-- Cuadro 3 -->
         <div
            class="md:col-span-3 border border-gray-300 p-4 shadow-md rounded"
         >
            <div
               class="md:col-span-3 text-center border border-gray-300 p-4 shadow-md rounded"
            >
               <label class="text-lg font-bold">CDC: </label>
               <label class="text-lg">{{ detalle.cdc }}</label>
            </div>
         </div>
      </div>

      <div v-else>
         <p>Cargando detalles...</p>
      </div>
   </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDesById } from "../../../utils/index";
import { useRoute } from "vue-router";
import {
   formatNumber,
   formatDateTime,
   formatPriceNumber,
   getInvoiceNumber,
   getEstablecimientoNumber,
} from "@/helpers/number.helper";
import { deValues } from "~/config/de";
import { useAuthStore } from "~/stores";
import moment from "moment";

definePageMeta({
   layout: "empty",
   middleware: ["auth"],
});

const authStore = useAuthStore();
const route = useRoute();
const detalle = ref(null);

const fetchDetalle = async () => {
   try {
      const id = route.params._id;
      if (!id) return;
      const deRes = await getDesById(id);
      detalle.value = mapperDeName(deRes);
   } catch (error) {
      console.error("Error al obtener los detalles de la factura:", error);
   }
};
/**
 * Genera un mapper para mostrar informacion del documento electronico
 * @param de
 */
const mapperDeName = (de) => {
   let sum = 0;
   let iva10 = 0;
   let iva5 = 0;
   for (let i = 0; i < de.items.length; i++) {
      const item = de.items[i];
      sum += item?.precioUnitario * item?.cantidad;

      if (item?.iva === 10) {
         iva10 += item?.ivaBase;
      } else if (item?.iva === 5) {
         iva5 += item?.ivaBase;
      }
   }

   return {
      ...de,
      establecimiento: getEstablecimientoNumber(de.establecimiento),
      numero: getInvoiceNumber(de.numero),
      condicionName: deValues.condicion.tipo[de.condicion.tipo || 1],
      tipoOperacionName:
         deValues.cliente.tipoOperacion[de.cliente.tipoOperacion || 2],
      total: sum,
      iva10: iva10,
      iva5: iva5,
      totalIva: iva10 + iva5,
   };
};

onMounted(() => {
   if (route.params._id) {
      fetchDetalle();
   }
});
</script>
