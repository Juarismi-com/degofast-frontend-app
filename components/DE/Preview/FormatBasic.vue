<template>
   <div class="container mx-auto pt-5">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
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
                           {{
                              detalle.tipoDocumento == 1
                                 ? "FACTURA ELECTRÓNICA"
                                 : "NOTA DE CRÉDITO"
                           }}: <br />
                           {{ detalle.establecimiento }} - 001 - 00Y
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
                                 ).format("DD/MM/YYYY")
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
                              moment(props.detalle.fecha).format(
                                 "DD/MM/YYYY HH:mm:ss",
                              )
                           }}</label>
                        </td>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-sm font-medium"
                        >
                           RUC/Documento de identidad N°:
                           <label class="font-bold">{{
                              props.detalle.cliente.ruc
                           }}</label>
                        </td>
                     </tr>
                     <tr>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Condición de venta:
                           <label class="font-bold">{{
                              props.detalle.condicionName
                           }}</label>
                        </td>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-sm font-medium"
                        >
                           Nombre o Razón Social:
                           <label class="font-bold">{{
                              props.detalle.cliente.razonSocial
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
                              props.detalle.cliente.direccion
                           }}</label>
                        </td>
                     </tr>
                     <tr>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Moneda:
                           <label class="font-bold">{{
                              props.detalle.moneda
                           }}</label>
                        </td>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Tipo de cambio:
                           <label class="font-bold">
                              {{ props.detalle.cambio ?? "-" }}</label
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
                              props.detalle?.cliente?.email
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
            <table class="w-full table-fixed border border-gray-200">
               <thead class="bg-gray-300 text-gray-800">
                  <tr>
                     <th
                        scope="col"
                        class="px-2 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wide border-b"
                     >
                        Código
                     </th>
                     <th
                        scope="col"
                        class="px-2 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wide border-b"
                     >
                        Descripción
                     </th>
                     <th
                        scope="col"
                        class="px-2 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wide border-b"
                     >
                        Cantidad
                     </th>
                     <th
                        scope="col"
                        class="px-2 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wide border-b"
                     >
                        Precio Unitario
                     </th>
                     <th
                        scope="col"
                        class="px-2 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wide border-b"
                     >
                        Total Unitario
                     </th>
                     <th
                        scope="col"
                        class="px-2 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wide border-b"
                     >
                        Descuento
                     </th>
                     <th
                        scope="col"
                        class="px-2 py-1 text-left text-xs font-bold text-gray-800 uppercase tracking-wide border-b"
                     >
                        Monto IVA
                     </th>
                  </tr>
               </thead>
               <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in props.detalle?.items" :key="item._id">
                     <td
                        class="px-2 py-1 border border-gray-200 text-right text-sm"
                     >
                        {{ item.codigo }}
                     </td>
                     <td class="px-2 py-1 border border-gray-200 text-sm">
                        {{ item.descripcion }}
                     </td>
                     <td
                        class="px-2 py-1 border border-gray-200 text-right text-sm"
                     >
                        {{ formatNumber(item.cantidad) }}
                     </td>
                     <td
                        class="px-2 py-1 border border-gray-200 text-right text-sm"
                     >
                        {{ formatPriceNumber(item?.precioUnitario) }}
                     </td>
                     <td
                        class="px-2 py-1 border border-gray-200 text-right text-sm"
                     >
                        {{
                           formatPriceNumber(
                              item?.precioUnitario * item?.cantidad,
                           )
                        }}
                     </td>
                     <td
                        class="px-2 py-1 border border-gray-200 text-right text-sm"
                     >
                        {{
                           formatNumber(item.descuento ? item.descuento : "0")
                        }}
                     </td>
                     <td
                        class="px-2 py-1 border border-gray-200 text-right text-sm"
                     >
                        {{ calculateIVA(item) }}
                     </td>
                  </tr>
               </tbody>
               <tfoot class="bg-gray-300 text-gray-800">
                  <tr>
                     <td
                        colspan="6"
                        class="px-2 py-1 border border-gray-200 font-bold text-sm"
                     >
                        Subtotal:
                     </td>
                     <td
                        class="px-2 py-1 border border-gray-200 text-right text-sm"
                     >
                        {{
                           formatPriceNumber(detalle.total - detalle.totalIva)
                        }}
                     </td>
                  </tr>
                  <tr>
                     <td
                        colspan="6"
                        class="px-2 py-1 border border-gray-200 font-bold text-sm"
                     >
                        Total de la operación:
                     </td>
                     <td
                        class="px-2 py-1 border border-gray-200 text-right text-sm"
                     >
                        {{ formatPriceNumber(detalle.total) }}
                     </td>
                  </tr>
                  <tr>
                     <td
                        colspan="2"
                        class="px-2 py-1 border border-gray-200 text-sm font-bold"
                     >
                        IVA (5%):
                     </td>
                     <td
                        colspan="3"
                        class="px-2 py-1 border border-gray-200 text-sm font-bold"
                     >
                        IVA (10%):
                     </td>
                     <td
                        class="px-2 py-1 border border-gray-200 text-sm font-bold"
                     >
                        Total IVA:
                     </td>
                     <td
                        class="px-2 py-1 border border-gray-200 text-right text-sm"
                     >
                        {{ formatPriceNumber(detalle.totalIva) }}
                     </td>
                  </tr>
               </tfoot>
            </table>
         </div>
      </div>
   </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import {
   formatNumber,
   formatPriceNumber,
   getDeNumberCode,
   getEstablecimientoNumberCode,
   calculateIVA,
} from "~/helpers/number.helper";
import { deValues } from "~/config/de";
import { useAuthStore } from "~/stores";
import moment from "moment";

definePageMeta({
   layout: "empty",
   middleware: ["auth"],
});

const authStore = useAuthStore();
const detalle = ref({});

const props = defineProps({
   detalle: {
      type: Object,
      required: true,
   },
});

const fetchDetalle = async () => {
   try {
      detalle.value = mapperDeName(props.detalle);
   } catch (error) {
      console.error("Error al obtener los detalles de la factura:", error);
   }
};

const mapperDeName = (de) => {
   let sum = 0;
   let iva10 = 0;
   let iva5 = 0;
   for (let i = 0; i < de.items.length; i++) {
      const item = de.items[i];
      sum += item?.precioUnitario * item?.cantidad;

      if (item?.iva === 10) {
         iva10 = item?.precioUnitario * item?.cantidad * 0.1;
      } else if (item?.iva === 5) {
         iva5 = item?.precioUnitario * item?.cantidad * 0.05;
      }
   }

   return {
      ...de,
      establecimiento: getEstablecimientoNumberCode(de.establecimiento),
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
   fetchDetalle();
});
</script>
