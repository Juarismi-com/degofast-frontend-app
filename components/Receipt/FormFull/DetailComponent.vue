<template>
   <div>
      <div class="text-xl pb-4">
         <h3>Detalle</h3>
      </div>
      
      <div class="grid grid-cols-4 gap-4 pb-4">
         <div>
            <label for="rucEmisor">Cantidad</label>
            <input
               type="text"
               v-model="formData.cantidad"
               id="cantidad"
               :class="INPUT_CLASS.sm"
            />
         </div>
         <div>
            <label for="nombreEmisor">Concepto:</label>
            <input
               type="text"
               v-model="formData.concepto"
               id="concepto"
               :class="INPUT_CLASS.sm"
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
