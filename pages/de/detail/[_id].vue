<template>
   <div>
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Detalles de la Factura
      </h2>
      <div v-if="detalle" class="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div
            class="md:col-span-3 text-center border border-gray-300 p-4 shadow-md rounded"
         >
            <label class="text-lg font-bold">CDC: </label>
            <label class="text-lg">{{ detalle.cdc }}</label>
         </div>
         <div
            class="md:col-span-3 border border-gray-300 p-4 shadow-md rounded grid grid-cols-2"
         >
            <div>
               <label class="text-xg font-bold">Tipo de Emisión: </label>
               <label class="text-xg">{{ detalle.tipoEmision }}</label>
            </div>
            <div>
               <label class="text-xg font-bold">Fecha/Hora de envío: </label>
               <label class="text-xg">
                  {{
                     moment(detalle.fecha).format("YYYY-MM-DD HH:mm:ss")
                  }}</label
               >
            </div>
         </div>

         <div
            class="md:col-span-3 border border-gray-300 p-4 shadow-md rounded"
         >
            <div class="border-b border-gray-200 mb-4">
               <ul
                  class="flex flex-wrap -mb-px text-sm font-medium text-center"
                  role="tablist"
               >
                  <li class="mr-2" role="presentation">
                     <button
                        class="inline-block p-4 border-b-2 rounded-t-lg"
                        :class="{
                           'border-blue-600 text-blue-600': activeTab === 0,
                           'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                              activeTab !== 0,
                        }"
                        @click="activeTab = 0"
                        role="tab"
                     >
                        Resumen
                     </button>
                  </li>
                  <li class="mr-2" role="presentation">
                     <button
                        class="inline-block p-4 border-b-2 rounded-t-lg"
                        :class="{
                           'border-blue-600 text-blue-600': activeTab === 1,
                           'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                              activeTab !== 1,
                        }"
                        @click="activeTab = 1"
                        role="tab"
                     >
                        Detalles
                     </button>
                  </li>
               </ul>
            </div>
            <div
               v-if="activeTab === 0"
               class="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
               <div class="col-span-1 md:col-span-3 grid grid-cols-4">
                  <div>
                     <label class="font-bold">Contribuyente: </label>
                  </div>
                  <div>
                     <span>{{
                        detalle.cliente.contribuyente ? "SI" : "NO"
                     }}</span>
                  </div>
                  <div>
                     <label class="font-bold">RUC: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.ruc }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Razón Social: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.razonSocial }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Número de factura: </label>
                  </div>
                  <div>
                     <span>{{ detalle.numero }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Tipo de documento: </label>
                  </div>
                  <div>
                     <span>{{ detalle.tipoDocumento }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Tipo de transacción: </label>
                  </div>
                  <div>
                     <span>{{ detalle.tipoTransaccion }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Establecimiento: </label>
                  </div>
                  <div>
                     <span>00{{ detalle.establecimiento }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Punto: </label>
                  </div>
                  <div>
                     <span>{{ detalle.punto }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Factura Presencia: </label>
                  </div>
                  <div>
                     <span>{{ detalle.factura.presencia }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Factura DNCP: </label>
                  </div>
                  <div>
                     <span>{{ detalle.factura.dncp }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Tipo de Operación: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.tipoOperacion }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Tipo de Impuesto: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.tipoImpuesto }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Tipo Contribuyente: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.tipoContribuyente }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Documento Tipo: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.documentoTipo }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Condicion Tipo de cambio: </label>
                  </div>
                  <div>
                     <span>{{ detalle.condicionTipoCambio }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Documento Número: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.documentoNumero }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Moneda: </label>
                  </div>
                  <div>
                     <span>{{ detalle.moneda }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Condicion de anticipo: </label>
                  </div>
                  <div>
                     <span>{{ detalle.condicionAnticipo }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Cambio: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cambio }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Estado: </label>
                  </div>
                  <div>
                     <span>{{ detalle.estado }}</span>
                  </div>
               </div>
            </div>
            <div v-else class="p-4">
               <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                     <thead class="bg-gray-50">
                        <tr>
                           <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Código
                           </th>
                           <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Descripción
                           </th>
                           <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Cantidad
                           </th>
                           <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Precio Unitario
                           </th>
                           <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              IVA
                           </th>
                        </tr>
                     </thead>
                     <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="item in detalle.items" :key="item._id">
                           <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900 text-right">
                                 {{ formatNumber(item.codigo) }}
                              </div>
                           </td>
                           <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900">
                                 {{ item.descripcion }}
                              </div>
                           </td>
                           <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900 text-right">
                                 {{ formatNumber(item.cantidad) }}
                              </div>
                           </td>
                           <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900 text-right">
                                 {{ formatNumber(item.precioUnitario) }}
                              </div>
                           </td>
                           <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900 text-right">
                                 {{ formatNumber(item.iva) }}
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
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
import moment from "moment";
import { getDesById } from "../../../utils/index";
import { useRoute } from "vue-router";
import { formatNumber, formatDateTime } from "@/helpers/number.helper";

definePageMeta({
   middleware: ["auth"],
});

const activeTab = ref(0);
const detalle = ref(null);

const route = useRoute();

const fetchDetalle = async () => {
   try {
      const id = route.params._id;
      const response = await getDesById(id);
      detalle.value = response;
      console.log(detalle);
   } catch (error) {
      console.error("Error al obtener los detalles de la factura:", error);
   }
};

onMounted(() => {
   fetchDetalle();
});
</script>
