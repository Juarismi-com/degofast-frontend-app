<template>
   <div>
      <div class="text-xl pb-4">
         <h3>Cliente</h3>
      </div>
      <div class="pb-4">
         <!-- Es contribuyente -->
         <div class="flex">
            <div class="flex items-center h-5">
               <input
                  id="contribuyenteCliente"
                  aria-describedby="helper-checkbox-text"
                  v-model="formData.cliente.contribuyente"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
               />
            </div>
            <div class="ms-2 text-sm">
               <label
                  for="contribuyenteCliente"
                  class="font-medium text-gray-900 dark:text-gray-300"
               >
                  ¿Es contribuyente?</label
               >
               <p class="text-xs font-normal text-gray-500 dark:text-gray-300">
                  Si el cliente no es contribuyente debera completar otros
                  campos
               </p>
            </div>
         </div>

         <!-- Buscador de RUC en caso que sea contribuyente -->
         <div>
            <hr class="my-4" />
            <div
               v-if="formData.cliente.contribuyente"
               class="grid grid-cols-4 gap-4"
            >
               <div>
                  <label for="ciCliente">RUC:</label>
                  <input
                     type="text"
                     v-model="formData.cliente.ruc"
                     id="ciCliente"
                     :class="INPUT_CLASS.sm"
                     class="mr-2"
                  />
               </div>
               <div>
                  <button
                     type="button"
                     class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mt-6"
                     @click="buscarCliente(formData.cliente.ruc)"
                  >
                     Buscar
                  </button>
               </div>
            </div>
         </div>
      </div>

      <div class="grid grid-cols-4 gap-4 pb-4">
         <div>
            <label for="nombreCliente">Nombre del Cliente:</label>
            <input
               type="text"
               v-model="formData.cliente.razonSocial"
               id="nombreCliente"
               :class="INPUT_CLASS.sm"
            />
         </div>
         <div>
            <label for="telefonoCliente">Teléfono:</label>
            <input
               type="text"
               v-model="formData.cliente.telefono"
               id="telefonoCliente"
               :class="INPUT_CLASS.sm"
            />
         </div>
         <div>
            <label for="emailCliente">Email:</label>
            <input
               type="text"
               v-model="formData.cliente.email"
               id="emailCliente"
               :class="INPUT_CLASS.sm"
            />
         </div>
         <div>
            <label for="direccionCliente">Dirección:</label>
            <input
               type="text"
               v-model="formData.cliente.direccion"
               id="direccionCliente"
               :class="INPUT_CLASS.sm"
            />
         </div>
         <div v-if="formData.cliente.contribuyente">
            <label for="tipoContribuyenteCliente">Tipo de contribuyente:</label>
            <select
               v-model="formData.cliente.tipoContribuyente"
               id="tipoContribuyenteCliente"
               :class="INPUT_CLASS.sm"
            >
               <option :value="1">Persona Física</option>
               <option :value="2">Persona Jurídica</option>
            </select>
         </div>
      </div>

      <div>
         <hr class="my-4" />
      </div>
      <div
         class="grid grid-cols-4 gap-4 pb-4"
         v-if="!formData.cliente.contribuyente"
      >
         <div>
            <label for="tipoOperacionCliente">Tipo de operación:</label>
            <select
               v-model="formData.cliente.tipoOperacion"
               id="tipoOperacionCliente"
               :class="INPUT_CLASS.sm"
            >
               <option value="1">B2B</option>
               <option value="2">B2C</option>
               <option value="3">B2G</option>
               <option value="4">B2F</option>
            </select>
         </div>

         <div>
            <label for="tipoDocumentoCliente">Tipo de documento:</label>
            <select
               v-model="formData.cliente.documentoTipo"
               id="tipoDocumentoCliente"
               :class="INPUT_CLASS.sm"
            >
               <option value="1">Cédula paraguaya</option>
               <option value="2">Pasaporte</option>
               <option value="3">Cédula extranjera</option>
               <option value="4">Carnet de residencia</option>
               <option value="5">Innominado</option>
               <option value="6">Tarjeta Diplomática</option>
               <option value="9">Informar</option>
            </select>
         </div>
         <div>
            <label for="clienteNúmeroDocumento" class="mr-2"
               >Número de documento:</label
            >
            <input
               type="text"
               v-model="formData.cliente.documentoNumero"
               id="clienteNumeroDocumento"
               :class="INPUT_CLASS.sm"
               class="mr-2"
               :disabled="
                  formData.cliente.contribuyente ||
                  formData.cliente.tipoOperacion === '4'
               "
            />
         </div>
      </div>
   </div>
</template>

<script setup>
import { getClientByRuc } from "~/services";
import { INPUT_CLASS } from "../../../config";

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

const { formData } = toRefs(props);

/**
 * Busca un cliente por el valor del ruc
 * @param ruc
 */
const buscarCliente = async (ruc) => {
   try {
      if (ruc.length == 0) throw { message: "Asigne un ruc" };

      const rucSinDv = ruc.split("-")[0];
      const response = await getClientByRuc(rucSinDv);

      if (response[0]) {
         const { ruc_sin_dv, dv, nombre } = response[0];
         formData.value.cliente.ruc = `${ruc_sin_dv}-${dv}`;
         formData.value.cliente.razonSocial = nombre;
      } else {
         alert("No se encontró el cliente");
      }
   } catch (error) {
      console.error("Error al buscar el cliente:", error);
      alert(error?.response?.data?.error);
   }
};
</script>
