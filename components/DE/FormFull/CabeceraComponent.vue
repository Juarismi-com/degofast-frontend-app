<template>
   <div>
      <div class="text-xl pb-4">
         <h3>Documento Electrónico</h3>
      </div>

      <div class="grid grid-cols-4 gap-4 pb-4">
         <div>
            <label for="establecimiento">Establecimiento:</label>
            <select id="establecimiento" v-model="formData.establecimiento" :class="INPUT_CLASS.sm"
               @change="selectEstablecimiento($event)">
               <option v-for="(establecimiento, index) in contributor.establecimientos" :key="index"
                  :value="establecimiento.codigo">
                  {{
                     establecimiento.denominacion + " - " + establecimiento.codigo
                  }}
               </option>
            </select>
         </div>

         <div>
            <label for="punto_expedicion">Punto de Expedicion:</label>
            <select id="punto_expedicion" v-model="formData.puntoExpedicion" :class="INPUT_CLASS.sm">
               <option v-for="(item, index) in puntoExpedicionList" :key="index" :value="item._id">
                  {{
                     item.codigo
                  }}
               </option>
            </select>
         </div>

         <div>
            <label for="fecha">Fecha:</label>
            <input type="datetime-local" v-model="formData.fecha" id="fecha" :class="INPUT_CLASS.sm" />
         </div>
         <div>
            <label for="tipoEmision">Tipo de Emisión:</label>
            <select v-model="formData.tipoEmision" id="tipoEmision" :class="INPUT_CLASS.sm">
               <option value="1">Normal</option>
               <option value="2">Contingencia</option>
            </select>
         </div>
         <div>
            <label for="tipoTransaccion">Tipo de Transacción:</label>
            <select v-model="formData.tipoTransaccion" id="tipoTransaccion" :class="INPUT_CLASS.sm">
               <option value="1">Venta de mercadería</option>
               <option value="2">Prestación de servicios</option>
               <option value="3">
                  Mixto (Venta de mercadería y servicios)
               </option>
               <option value="4">Venta de activo fijo</option>
               <option value="5">Venta de divisas</option>
               <option value="6">Compra de divisas</option>
               <option value="7">Promoción o entrega de muestras</option>
               <option value="8">Donación</option>
               <option value="9">Anticipo</option>
               <option value="10">Compra de Productos</option>
               <option value="11">Venta de Crédito fiscal</option>
               <option value="12">Compra de Crédito fiscal</option>
               <option value="13">
                  Muestras médicas (Art. 3 RG 24/2014)
               </option>
            </select>
         </div>
         <div>
            <label for="tipoImpuesto">Tipo de Impuesto:</label>
            <select v-model="formData.tipoImpuesto" id="tipoImpuesto" :class="INPUT_CLASS.sm">
               <option value="1">IVA</option>
               <option value="2">ISC</option>
               <option value="3">Renta</option>
               <option value="4">Ninguno</option>
               <option value="5">IVA - Renta</option>
            </select>
         </div>

         <div>
            <label for="moneda">Moneda:</label>
            <select v-model="formData.moneda" id="moneda" :class="INPUT_CLASS.sm">
               <option value="PYG">PYG</option>
               <option value="USD">USD</option>
            </select>
         </div>
         <div v-if="formData.moneda == 'USD'">
            <label for="cambio">Cambio ({{ formData.moneda }}):</label>
            <input v-model="formData.cambio" id="cambio" :class="INPUT_CLASS.sm"></input>
         </div>
         <div>
            <label for="presencia">¿Factura presente?</label>
            <select v-model="formData.factura.presencia" id="presencia" :class="INPUT_CLASS.sm">
               <option value="1">Sí</option>
               <option value="0">No</option>
            </select>
         </div>

         <div>
            <label for="descripcion">Descripción (Opcional):</label>
            <input v-model="formData.descripcion" id="descripcion" :class="INPUT_CLASS.sm"></input>
         </div>
      </div>

      <div v-if="formData?.tipoDocumento == 1">
         <hr class="my-4" />

         <div class="grid grid-cols-4 gap-4">
            <div>
               <label for="condicionVenta">Condición de Venta:</label>
               <select v-model="formData.condicion.tipo" id="condicionVenta" :class="INPUT_CLASS.sm">
                  <option :value="1">Contado</option>
                  <option :value="2">Crédito</option>
               </select>
            </div>

            <div v-if="formData.condicion.credito && formData.condicion.tipo == '2'">
               <label for="condicionCreditoTipo">Tipo de crédito:</label>
               <select v-model="formData.condicion.credito.tipo" id="condicionCreditoTipo" :class="INPUT_CLASS.sm">
                  <option value="1">Plazo</option>
                  <option value="2">Cuotas</option>
               </select>
            </div>

            <div v-if="formData.condicion.credito.tipo == '1'
               && formData.condicion.tipo == '2'">
               <label for="condicionCreditoPlazo">Plazo:</label>
               <input v-model="formData.condicion.credito.plazo" id="condicionCreditoPlazo" type="text"
                  :class="INPUT_CLASS.sm" placeholder="Ejemplo: 30 días, 12 meses, etc" />
            </div>

            <div v-if="formData.condicion.credito.tipo == '2' && formData.condicion.tipo == '2'">
               <label for="condicionCreditoCuotas">Cuotas:</label>
               <input v-model="formData.condicion.credito.cuotas" id="condicionCreditoCuotas" type="number"
                  :class="INPUT_CLASS.sm" />
            </div>
            <div v-if="formData.condicion.credito.tipo == '2' && formData.condicion.tipo == '2'" class="m-5">
               <button type="submit"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                  @click="generateCuotasTable">
                  Generar cuotas
               </button>
            </div>
         </div>

         <div v-if="formData.condicion.credito.tipo == '2' && formData.condicion.tipo == '2'"
            class="m-5 flex space-x-4">


            <button v-if="cuotaTable.length > 0" type="button"
               class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
               @click="confirmDeleteTable">
               Eliminar tabla
            </button>
         </div>

         <div v-if="cuotaTable.length > 0 && formData.condicion.credito.tipo == '2' && formData.condicion.tipo == '2'"
            class="flex justify-center">
            <table class="divide-gray-200 w-3/4">
               <thead class="bg-gray-50">
                  <tr>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° de
                        Cuota</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de
                        Vencimiento</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto
                     </th>
                  </tr>
               </thead>
               <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(cuota, index) in cuotaTable" :key="index">
                     <td class="px-4 py-2 whitespace-nowrap">{{ cuota.numeroCuota }}</td>
                     <td class="px-4 py-2 whitespace-nowrap">
                        <input type="date" v-model="cuota.fechaVencimiento" :class="INPUT_CLASS.sm" />
                     </td>
                     <td class="px-4 py-2 whitespace-nowrap">
                        <input type="text" v-model="cuota.monto" :class="INPUT_CLASS.sm" />
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>

      </div>

      <div v-if="props.documentType == 5">
         <NotaCreditoDebito :form-data="formData" :contributor="contributor" />
      </div>

   </div>
</template>


<script setup>
import { getPuntoExpedicionByFilters } from "~/services/punto-expedicion.service.ts";
import {
   INPUT_CLASS,
} from "../../../config"
import NotaCreditoDebito from "../Tipo/NotaCreditoDebito.vue";

const props = defineProps({
   formData: {
      type: Object,
      default: {},
   },
   contributor: {
      type: Object,
      default: {},
   },
   documentType: String
});

const { formData, contributor } = toRefs(props);
const puntoExpedicionList = ref([])
const cuotaTable = ref([]);

/**
 * Selecciona un establecimiento y setea su punto de expedicion
 * @param e
 */
const selectEstablecimiento = (e) => {
   formData.value.establecimiento = e.target.value.toString();
   setPuntoEstablecimientoList();
};

/**
 * Carga el listado de establecimientos y setea el primero encontrado
 * por defecto
 */
const setPuntoEstablecimientoList = async () => {
   const establecimientoCodigo = formData.value.establecimiento;
   const establecimiento = contributor.value.establecimientos.find(
      (establecimiento) => {
         return establecimiento.codigo == establecimientoCodigo;
      },
   );

   puntoExpedicionList.value = await getPuntoExpedicionByFilters({
      contributor: contributor.value?._id,
      establecimiento: establecimiento?._id,
      tipoDocumento: formData.value?.tipoDocumento,
   });

   formData.value.puntoExpedicion = puntoExpedicionList.value[0]._id;
};

/* Tablilla cuotas */
const generateCuotasTable = () => {
   const cantidadCuotas = formData.value.condicion.credito.cuotas;

   cuotaTable.value = [];

   for (let i = 1; i <= cantidadCuotas; i++) {
      cuotaTable.value.push({
         numeroCuota: i,
         fechaVencimiento: '',
         monto: ''
      });
   }
};

const confirmDeleteTable = () => {
   if (confirm("¿Estás seguro de que deseas eliminar la tabla de cuotas?")) {
      cuotaTable.value = [];
   }
};


onMounted(() => {
   setPuntoEstablecimientoList();

})

</script>