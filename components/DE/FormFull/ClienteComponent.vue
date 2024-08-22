<template>
   <div>
      <div class="text-xl pb-4">
         <h3>Cliente</h3>
         <hr />
      </div>
      <div class="pb-4">
         <div class="grid grid-cols-4 gap-4 pb-1">
            <div>
               <label for="ciCliente" class="mr-2">RUC:</label>
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
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  @click="buscarCliente(formData.cliente.ruc)"
               >
                  Buscar
               </button>
            </div>
            <div class="mt-5">
               <input
                  type="checkbox"
                  v-model="formData.cliente.contribuyente"
                  id="contribuyenteCliente"
                  :class="[commonInputClass]"
               />
               <label for="contribuyenteCliente" :class="[commonLabelClass]">
                  ¿Es contribuyente?
               </label>
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
            <label for="tipoContribuyenteCliente">Tipo de contribuyente:</label>
            <select
               v-model="formData.cliente.tipoContribuyente"
               id="tipoContribuyenteCliente"
               :class="INPUT_CLASS.sm"
               :disabled="!formData.cliente.contribuyente"
            >
               <option value="1">Persona Física</option>
               <option value="2">Persona Jurídica</option>
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
import { INPUT_CLASS, TIPO_DOCUMENT_LIST, useConfig } from "../../../config";

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

      if (response && response.rows.length > 0) {
         const { ruc_sin_dv, dv, nombre } = response.rows[0];
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
