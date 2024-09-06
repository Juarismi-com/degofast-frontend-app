<template>
   <div>
      <form @submit.prevent="savePuntoExpedicion" method="post">
         <div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5">
            <div>
               <label
                  for="formPuntoExpedicionNroActual"
                  :class="[commonLabelClass]"
                  >Nro. Actual</label
               >
               <input
                  type="number"
                  name="formPuntoExpedicionNroActual"
                  id="formPuntoExpedicionNroActual"
                  :class="[commonInputClass]"
                  placeholder="Nro. Actual"
                  v-model="formPuntoExpedicion.nroActual"
               />
            </div>
            <div>
               <label
                  for="formPuntoExpedicionNroInicial"
                  :class="[commonLabelClass]"
                  >Nro. Inicial</label
               >
               <input
                  type="text"
                  name="formPuntoExpedicionNroInicial"
                  id="formPuntoExpedicionNroInicial"
                  :class="[commonInputClass]"
                  placeholder="Nro. Inicial"
                  v-model="formPuntoExpedicion.nroInicial"
               />
            </div>
            <div>
               <label
                  for="formPuntoExpedicionCodigo"
                  :class="[commonLabelClass]"
                  >Código</label
               >
               <input
                  type="text"
                  name="formPuntoExpedicionCodigo"
                  id="formPuntoExpedicionCodigo"
                  :class="[commonInputClass]"
                  placeholder="Codigo"
                  v-model="formPuntoExpedicion.codigo"
               />
            </div>
            <div>
               <label
                  for="formPuntoExpedicionTipoDocumento"
                  :class="[commonLabelClass]"
                  >Tipo de Documento</label
               >
               <select
                  name="formPuntoExpedicionTipoDocumento"
                  :class="[commonInputClass]"
                  id="formPuntoExpedicionTipoDocumento"
                  v-model="formPuntoExpedicion.tipoDocumento"
               >
                  <option value="1">Factura Electrónica</option>
                  <option value="4">Autofactura electrónica</option>
                  <option value="5">Nota de crédito electrónica</option>
                  <option value="6">Nota de débito electrónica</option>
                  <option value="7">Nota de remisión electrónica</option>
               </select>
            </div>
            <div>
               <label
                  for="formPuntoExpedicionEstablecimiento"
                  :class="[commonLabelClass]"
                  >Establecimiento</label
               >
               <select
                  name="formPuntoExpedicionEstablecimiento"
                  :class="[commonInputClass]"
                  id="formPuntoExpedicionEstablecimiento"
                  v-model="formPuntoExpedicion.establecimiento"
               >
                  <option
                     v-for="(
                        establecimiento, index
                     ) in contributor.establecimientos"
                     :key="index"
                     :value="establecimiento.codigo"
                  >
                     {{
                        establecimiento.denominacion +
                        " - " +
                        establecimiento.codigo
                     }}
                  </option>
               </select>
            </div>
            <div class="m-7">
               <button
                  type="button"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                  @click="agregarPuntoExpedicionItem"
               >
                  Agregar
               </button>
            </div>
         </div>

         <div class="w-3/4 m-5">
            <table class="w-full divide-y divide-gray-200 overflow-x-auto">
               <thead class="bg-gray-50">
                  <tr>
                     <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Nro Actual
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Nro. Inicial
                     </th>
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
                        Tipo de Documento
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Establecimiento
                     </th>
                  </tr>
               </thead>
               <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                     v-for="item in puntoExpedicionData.items"
                     :key="item.codigo"
                  >
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.nroActual }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.nroInicial }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.codigo }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.tipoDocumento }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.establecimiento }}
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>

         <div class="m-5">
            <button
               type="submit"
               class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
               Guardar
            </button>
         </div>
      </form>
   </div>
</template>

<script setup>
import { get, create } from "~/services/http.service";
import { commonInputClass, commonLabelClass } from "~/config/styles";

import { defineProps } from "vue";

const props = defineProps({
   contributor: {
      type: Object,
      default: () => ({}),
   },
});

const formPuntoExpedicion = ref({
   nroActual: 0,
   nroInicial: "",
   codigo: "",
   contributor: props.contributor._id,
   establecimiento: "",
   tipoDocumento: 1,
});

const puntoExpedicionData = ref({ items: [] });

const agregarPuntoExpedicionItem = () => {
   if (validateForm()) {
      puntoExpedicionData.value.items.push({ ...formPuntoExpedicion.value });
      formPuntoExpedicion.value = {
         nroActual: 1,
         nroInicial: "",
         contributor: props.contributor._id,
         codigo: "",
         establecimiento: "",
         tipoDocumento: 1,
      };
   } else {
      alert("Por favor, complete todos los campos del nuevo ítem.");
   }
};

const savePuntoExpedicion = async (e) => {
   // if (validateForm()) {

   for (const item of puntoExpedicionData.value.items) {
      let payload = {
         ...item,
      };

      try {
         if (props.contributor) {
            const res = await create("punto-expedicion", payload);
            console.log("Datos actualizados:", res);
         } else {
            console.log("Se debe cargar los datos del contribuyente", res);
         }
      } catch (error) {
         console.error("Error al actualizar los datos:", error.message);
      }
   }
};

const validateForm = () => {
   const errors = [];
   const { nroActual, nroInicial, codigo } = formPuntoExpedicion.value;

   if (!nroActual) errors.push("Nro. Actual es requerido");
   if (!nroInicial) errors.push("Nro. Inicial es requerido");
   if (!codigo) errors.push("Código es requerido");

   if (errors.length > 0) {
      const message = errors.join("\n");
      alert(message);

      return false;
   }

   return true;
};

const getPuntoExpedicion = async () => {
   const puntosExpedicion = await get(
      `punto-expedicion?contributor=${props.contributor._id}`,
   );

   if (puntosExpedicion.length > 0) {
      puntoExpedicionData.value.items = puntosExpedicion;
   } else {
      puntoExpedicionData.value.items = [];
   }
};

onMounted(() => {
   getPuntoExpedicion();
});
</script>
