<template>
   <div class="max-w-4xl my-3 p-5" v-if="detalle">
      <!-- Membrete -->
      <div class="rounded border border-gray-300 p-4 shadow-md my-3">
         <div>
            <h3
               class="-mx-4 -mt-4 rounded-t-lg bg-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-800"
            >
               KuDE de Factura Electrónica
            </h3>
         </div>
         <div class="grid grid-cols-6 gap-4">
            <div class="col-span-4">
               <h1>{{ detalle.contributor.razonSocial }}</h1>
               {{ title }}: <br />
               {{ detalle.establecimiento }} - {{ detalle.punto }} -
               {{ detalle.numero }}
               <br />
            </div>
            <div class="col-span-2">
               RUC:
               <label class="font-bold"> {{ detalle.contributor.ruc }} </label
               ><br />

               Timbrado N°:
               <label class="font-bold">
                  {{ detalle.contributor.timbradoNumero }} </label
               ><br />

               Fecha de timbrado:
               <label class="font-bold">
                  {{
                     moment(detalle.contributor.timbradoFecha).format(
                        "DD/MM/YYYY",
                     )
                  }}
               </label>

               <div v-if="detalle.tipoDocumento == 5">
                  N° de factura:
                  <label class="font-bold">
                     {{
                        getEstablecimientoNumberCode(
                           detalle.documentoAsociado.establecimiento,
                        )
                     }}
                     -
                     {{
                        getEstablecimientoNumberCode(
                           detalle.documentoAsociado.punto,
                        )
                     }}
                     -
                     {{ detalle.documentoAsociado.numero }}
                  </label>
               </div>
            </div>
         </div>
      </div>

      <!-- Cabecera de documento electronico -->
      <div
         class="rounded border border-gray-300 p-2 my-3 shadow-md md:col-span-3"
      >
         <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div class="col-span-1 grid grid-cols-1 md:col-span-3">
               <table class="w-full border-collapse">
                  <tbody>
                     <tr>
                        <td
                           class="w-1/2 px-2 py-1 text-left text-sm font-medium"
                        >
                           Fecha y hora de emisión:
                           <label class="font-bold">
                              {{
                                 moment(detalle.fecha).format(
                                    "DD/MM/YYYY HH:mm:ss",
                                 )
                              }}
                           </label>
                        </td>
                        <td
                           class="w-1/2 whitespace-nowrap px-2 py-1 text-left text-sm font-medium"
                        >
                           RUC/Documento de identidad N°:
                           <label class="font-bold">{{
                              detalle.cliente.ruc ||
                              detalle.cliente.documentoNumero
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
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      <!-- Detalle y totales -->
      <div class="col-span-3 p-1 shadow-md rounded my-3">
         <table
            class="table-fixed border border-gray-200 text-sm text-gray-900"
         >
            <thead class="bg-gray-300 text-gray-800">
               <tr>
                  <th
                     scope="col"
                     class="text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                  >
                     Cod
                  </th>
                  <th
                     scope="col"
                     class="text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                  >
                     Descripción
                  </th>
                  <th
                     scope="col"
                     class="px-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                  >
                     Cantidad
                  </th>
                  <th
                     scope="col"
                     class="px-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                  >
                     Precio
                  </th>
                  <th
                     scope="col"
                     class="text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                  >
                     Total
                  </th>
                  <th
                     scope="col"
                     class="text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                  >
                     Descuento
                  </th>
                  <th
                     scope="col"
                     class="text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-b"
                  >
                     IVA
                  </th>
               </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
               <tr v-for="item in detalle.items" :key="item._id" class="">
                  <td
                     class="whitespace-nowrap border border-gray-200 text-right"
                  >
                     {{ item.codigo }}
                  </td>
                  <td class="whitespace-nowrap border border-gray-200">
                     <div class="description-content">
                        <p class="text">
                           {{ item.descripcion }}
                        </p>
                     </div>
                  </td>
                  <td
                     class="whitespace-nowrap border border-gray-200 text-right"
                  >
                     {{ formatNumber(item.cantidad) }}
                  </td>
                  <td
                     class="whitespace-nowrap border border-gray-200 text-right"
                  >
                     {{
                        isValidCurrency(localCurrency)
                           ? formatPriceNumber(item.precioUnitario)
                           : formatPriceNumberNoPYG(item.precioUnitario)
                     }}
                  </td>
                  <td
                     class="whitespace-nowrap border border-gray-200 text-right"
                  >
                     {{
                        isValidCurrency(localCurrency)
                           ? formatPriceNumber(
                                item.precioUnitario * item.cantidad,
                             )
                           : formatPriceNumberNoPYG(
                                item.precioUnitario * item.cantidad,
                             )
                     }}
                  </td>
                  <td
                     class="whitespace-nowrap border border-gray-200 text-right"
                  >
                     {{ formatNumber(item.descuento ? item.descuento : "0") }}
                  </td>
                  <td
                     class="whitespace-nowrap border border-gray-200 text-right"
                  >
                     {{ calculateIVA(item) }}
                  </td>
               </tr>
            </tbody>
            <tfoot class="bg-gray-300 text-gray-800">
               <tr>
                  <td
                     colspan="6"
                     class="whitespace-nowrap border border-gray-200 font-bold"
                  >
                     Subtotal:
                  </td>
                  <td
                     class="whitespace-nowrap border border-gray-200 text-right"
                  >
                     {{
                        isValidCurrency(localCurrency)
                           ? formatPriceNumber(detalle.total)
                           : formatPriceNumberNoPYG(detalle.total)
                     }}
                  </td>
               </tr>
               <tr>
                  <td
                     colspan="6"
                     class="whitespace-nowrap border border-gray-200 font-bold"
                  >
                     Total de la operación:
                  </td>
                  <td
                     class="whitespace-nowrap border border-gray-200 text-right"
                  >
                     <!-- {{
                        localCurrency === "PYG"
                           ? formatPriceNumber(detalle.total)
                           : formatPriceNumberNoPYG(detalle.total)
                     }} -->
                  </td>
               </tr>
               <!-- <tr>
                  <td colspan="6" class="whitespace-nowrap border border-gray-200 font-bold">
                     Total en guaraníes:
                  </td>
                  <td class="whitespace-nowrap border border-gray-200 text-right">
                     {{
                        isValidCurrency(localCurrency)
                           ? formatPriceNumber(detalle.total)
                           : null
                     }}
                  </td>
               </tr> -->
               <tr>
                  <td
                     colspan="2"
                     class="whitespace-nowrap border border-gray-200"
                  >
                     <label class="font-bold">IVA (5%):</label>
                     {{
                        isValidCurrency(localCurrency)
                           ? formatPriceNumber(detalle.iva5)
                           : formatPriceNumberNoPYG(detalle.iva5)
                     }}
                  </td>

                  <td
                     colspan="3"
                     class="whitespace-nowrap border border-gray-200"
                  >
                     <label class="font-bold">IVA (10%):</label>
                     {{
                        isValidCurrency(localCurrency)
                           ? formatPriceNumber(detalle.iva10)
                           : formatPriceNumberNoPYG(detalle.iva10)
                     }}
                  </td>
                  <td
                     colspan="1"
                     class="whitespace-nowrap border border-gray-200"
                  >
                     <label class="font-bold">Total IVA:</label>
                  </td>

                  <td
                     class="whitespace-nowrap border border-gray-200 text-right"
                  >
                     {{
                        isValidCurrency(localCurrency)
                           ? formatPriceNumber(detalle.totalIva)
                           : formatPriceNumberNoPYG(detalle.totalIva)
                     }}
                  </td>
               </tr>
            </tfoot>
         </table>
      </div>

      <!-- cdc y datos de qr-->
      <div class="md:col-span-3 border border-gray-300 p-4 shadow-md rounded">
         <label class="text-lg font-bold">CDC: </label>
         <label class="text-lg">{{ detalle.cdc }}</label>
      </div>
   </div>

   <div class="max-w-4xl pt-5">
      <div v-if="detalle" class="grid grid-cols-1 md:grid-cols-3 gap-2">
         <!-- Detalle -->

         <!-- Cuadro 3 -->
      </div>

      <div v-else>
         <p>Cargando detalles...</p>
      </div>
   </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDesById } from "../../../services";
import { useRoute } from "vue-router";
import {
   formatNumber,
   formatPriceNumber,
   formatPriceNumberNoPYG,
   getDeNumberCode,
   getEstablecimientoNumberCode,
   isValidCurrency,
} from "~/helpers/number.helper";
import { deValues } from "~/config/de";
import moment from "moment";

definePageMeta({
   layout: "empty",
});

const route = useRoute();
const title = ref("");
const detalle = ref(null);
const localCurrency = ref(null);

const getDeById = async (id) => {
   try {
      const deRes = await getDesById(id);
      detalle.value = mapperDeName(deRes);
      localCurrency.value = detalle.value.moneda;

      title.value =
         detalle.value.tipoDocumento == 5
            ? "NOTA DE CRÉDITO"
            : "FACTURA ELECTRÓNICA";
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
         iva10 = iva10 + (item?.precioUnitario * item?.cantidad) / 11;
      } else if (item?.iva === 5) {
         iva5 = iva5 + (item?.precioUnitario * item?.cantidad) / 21;
      }
   }

   return {
      ...de,
      establecimiento: getEstablecimientoNumberCode(de.establecimiento),
      numero: getDeNumberCode(de.numero),
      condicionName: deValues.condicion.tipo[de.condicion.tipo || 1],
      tipoOperacionName:
         deValues.cliente.tipoOperacion[de.cliente.tipoOperacion || 2],
      total: sum,
      iva10: iva10,
      iva5: iva5,
      totalIva: iva10 + iva5,
   };
};

const calculateIVA = (item) => {
   if (item?.iva === 5) {
      return isValidCurrency(localCurrency.value)
         ? formatPriceNumber((item.precioUnitario * item.cantidad) / 21)
         : formatPriceNumberNoPYG((item.precioUnitario * item.cantidad) / 21);
   } else if (item?.iva === 10) {
      return isValidCurrency(localCurrency.value)
         ? formatPriceNumber((item.precioUnitario * item.cantidad) / 11)
         : formatPriceNumberNoPYG((item.precioUnitario * item.cantidad) / 11);
   }
   return 0;
};

onMounted(() => {
   const deId = route.params._id;
   if (deId) {
      getDeById(deId);
   }
});
</script>

<style>
.description-content {
   width: 330px;
   overflow: hidden;
   display: flex;
   flex-direction: column;
   justify-content: flex-end;
}

.text {
   white-space: normal;
}
</style>
