<template>
   <div>
      <div v-if="detalle" class="grid grid-cols-1 md:grid-cols-4 gap-2">
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
                           00{{ detalle.establecimiento }}-{{
                              detalle.punto
                           }}-{{ detalle.numero }} <br />
                        </td>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-base font-normal"
                        >
                           Timbrado N°: <br />
                           Fecha de inicio de vigencia: <br />
                           Fecha de fin de vigencia:
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
                              detalle.condicion.tipo
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
                           Cuotas: <label class="font-bold"> </label>
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
                              {{ detalle.cambio }}</label
                           >
                        </td>
                     </tr>
                     <tr>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Tipo de cambio global o por item (opcional):
                        </td>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-sm font-medium"
                        >
                           Correo electrónico:
                           <label class="font-bold">{{
                              detalle.cliente.email
                           }}</label>
                        </td>
                     </tr>
                     <tr>
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
                              detalle.cliente.tipoOperacion
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
                     </tr>
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
                        class="px-6 py-1 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border-b"
                     >
                        Código
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-1 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border-b"
                     >
                        Descripción
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-1 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border-b"
                     >
                        Unidad de Medida
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-1 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border-b"
                     >
                        Cantidad
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-1 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border-b"
                     >
                        Precio Unitario
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-1 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border-b"
                     >
                        Descuento
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-1 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border-b"
                     >
                        IVA
                     </th>
                  </tr>
               </thead>
               <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in detalle.items" :key="item._id">
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
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
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        <div class="text-sm text-gray-900">
                           {{ formatNumber(item.unidadMedida) }}
                        </div>
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        <div class="text-sm text-gray-900">
                           {{ formatNumber(item.cantidad) }}
                        </div>
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        <div class="text-sm text-gray-900">
                           {{ formatNumber(item.precioUnitario) }}
                        </div>
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        <div class="text-sm text-gray-900">
                           {{ formatNumber(item.descuento) }}
                        </div>
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        <div class="text-sm text-gray-900">
                           {{ item.iva }}
                        </div>
                     </td>
                  </tr>
               </tbody>
               <tfoot class="bg-gray-300 text-gray-800">
                  <tr>
                     <td
                        colspan="6"
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        Subtotal:
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        {{ formatNumber("1500000") }}
                     </td>
                  </tr>
                  <tr>
                     <td
                        colspan="6"
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        Total de la operación:
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        {{ formatNumber(detalle.condicion.entregas[0].monto) }}
                     </td>
                  </tr>
                  <tr>
                     <td
                        colspan="6"
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        Total en guaranies:
                     </td>
                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        {{ formatNumber(detalle.condicion.entregas[0].monto) }}
                     </td>
                  </tr>
                  <tr>
                     <td
                        colspan="2"
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        Liquidacion IVA: (5%)
                     </td>

                     <td
                        colspan="2"
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        (10%)
                     </td>
                     <td
                        colspan="2"
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     >
                        Total IVA:
                     </td>

                     <td
                        class="px-6 py-1 whitespace-nowrap border border-gray-200"
                     ></td>
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
import { formatNumber, formatDateTime } from "@/helpers/number.helper";

definePageMeta({
   layout: "empty",
   middleware: ["auth"],
});

const activeTab = ref(0);
const detalle = ref(null);

const route = useRoute();

const fetchDetalle = async () => {
   try {
      const id = route.params._id;
      if (!id) return;
      const response = await getDesById(id);
      detalle.value = response;
   } catch (error) {
      console.error("Error al obtener los detalles de la factura:", error);
   }
};

onMounted(() => {
   if (route.params._id) {
      fetchDetalle();
   }
});
</script>
