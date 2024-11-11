<template>
   <div>
      <hr class="my-4" />

      <div class="grid grid-cols-4 gap-4">
         <div>
            <label for="nota-creditodebito-motivo">Motivo:</label>
            <select
               v-model="formData.notaCreditoDebito.motivo"
               id="nota-creditodebito-motivo"
               :class="INPUT_CLASS.sm"
            >
               <option :value="1">Devolución y Ajuste de precios</option>
               <option :value="2">Devolución</option>
               <option :value="3">Descuento</option>
               <option :value="4">Bonificación</option>
               <option :value="5">Crédito incobrable</option>
               <option :value="6">Recupero de costo</option>
               <option :value="7">Recupero de gasto</option>
               <option :value="8">Ajuste de precio</option>
            </select>
         </div>

         <div>
            <label for="formato">Formato *:</label>
            <select
               v-model="formData.documentoAsociado.formato"
               id="formato"
               :class="INPUT_CLASS.sm"
            >
               <option value="1">Electrónico</option>
               <option value="2">Impreso</option>
               <option value="3">Constancia Electrónica</option>
            </select>
         </div>

         <div>
            <label for="cdc">CDC Asociado:</label>
            <input
               v-model="formData.documentoAsociado.cdc"
               id="cdc"
               type="text"
               :class="INPUT_CLASS.sm"
               placeholder=""
            />
         </div>

         <div>
            <label for="formato">
               {{
                  formData.documentoAsociado.formato === "2"
                     ? "Tipo de documento"
                     : "Tipo"
               }}:
            </label>

            <!-- Mostrar `tipoDocumentoImpreso` cuando el formato es Impreso -->
            <select
               v-if="formData.documentoAsociado.formato === '2'"
               v-model="formData.documentoAsociado.tipoDocumentoImpreso"
               id="tipoDocumentoImpreso"
               :class="INPUT_CLASS.sm"
            >
               <option value="1">Factura</option>
               <option value="2">Nota de Crédito</option>
               <option value="3">Nota de Débito</option>
               <option value="4">Nota de Remisión</option>
               <option value="5">Comprobante de Retención</option>
            </select>

            <!-- Mostrar `tipo` en otros casos -->
            <select
               v-else
               v-model="formData.documentoAsociado.tipo"
               id="tipo"
               :class="INPUT_CLASS.sm"
            >
               <option value="1">Factura</option>
               <option value="2">Nota de Crédito</option>
               <option value="3">Nota de Débito</option>
               <option value="4">Nota de Remisión</option>
               <option value="5">Comprobante de Retención</option>
            </select>
         </div>

         <div>
            <label for="timbrado">Timbrado *:</label>
            <input
               v-model="formData.documentoAsociado.timbrado"
               id="timbrado"
               type="number"
               :class="INPUT_CLASS.sm"
            />
         </div>

         <div>
            <label for="establecimiento">Establecimiento:</label>
            <input
               v-model="formData.documentoAsociado.establecimiento"
               id="establecimiento"
               type="number"
               :class="INPUT_CLASS.sm"
            />
         </div>

         <div>
            <label for="punto">Punto:</label>
            <input
               v-model="formData.documentoAsociado.punto"
               id="punto"
               type="number"
               :class="INPUT_CLASS.sm"
            />
         </div>

         <div>
            <label for="punto">Numero:</label>
            <input
               v-model="formData.documentoAsociado.numero"
               id="punto"
               type="number"
               :class="INPUT_CLASS.sm"
            />
         </div>

         <div>
            <label for="fecha">Fecha:</label>
            <input
               type="datetime-local"
               v-model="formData.documentoAsociado.fecha"
               id="fecha"
               :class="INPUT_CLASS.sm"
            />
         </div>
      </div>
   </div>
</template>

<script setup>
import { INPUT_CLASS } from "~/config";

const props = defineProps({
   formData: {
      type: Object,
      default: {},
   },
   contributor: {
      type: Object,
      default: {},
   },
});

const { formData, contributor } = toRefs(props);

formData.value.documentoAsociado.timbrado =
   contributor.value.timbradoNumero || "";
</script>
