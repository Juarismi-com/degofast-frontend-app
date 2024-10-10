<template>
   <div>
      <form @submit.prevent="saveContributorData" method="post">
         <div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5">
            <div>
               <label for="timbradoNumero" :class="[commonLabelClass]">Numero de Timbrado*</label>
               <input type="text" name="timbradoNumero" id="timbradoNumero" :class="[commonInputClass]"
                  placeholder="Nro de timbrado actual" v-model="formData.timbradoNumero" />
            </div>

            <div>
               <label for="timbradoFecha" :class="[commonLabelClass]">Fecha de Timbrado*</label>
               <input type="datetime-local" v-model="formData.timbradoFecha" id="fecha" :class="[commonInputClass]" />
            </div>

            <div>
               <label for="tipoContribuyente" :class="[commonLabelClass]">Tipo de Contribuyente *</label>
               <select name="tipoContribuyente" :class="[commonInputClass]" id="tipoContribuyente"
                  v-model="formData.tipoContribuyente">
                  <option value="1">Persona Fisica</option>
                  <option value="2">Persona Juridica</option>
               </select>
            </div>

            <div>
               <label for="ruc" :class="[commonLabelClass]">RUC (Sin puntos)*</label>
               <input type="text" name="ruc" id="ruc" :class="[commonInputClass]" placeholder="XXXXXXX-Y"
                  required="true" v-model="formData.ruc" />
            </div>

            <div>
               <label for="csc" :class="[commonLabelClass]">CSC</label>
               <input type="text" name="csc" id="csc" :class="[commonInputClass]" required="true"
                  v-model="formData.csc" />
            </div>

            <div>
               <label for="nombreFantasia" :class="[commonLabelClass]">Nombre de Fantasia*</label>
               <input type="text" name="nombreFantasia" id="nombreFantasia" :class="[commonInputClass]"
                  placeholder="Empresa X" required="true" v-model="formData.nombreFantasia" />
            </div>

            <div>
               <label for="razonSocial" :class="[commonLabelClass]">Razon Social*</label>
               <input type="text" name="razonSocial" id="razonSocial" :class="[commonInputClass]"
                  placeholder="Razon Social S.R.L" required="true" v-model="formData.razonSocial" />
            </div>

            <div>
               <label for="email" :class="[commonLabelClass]">Email</label>
               <input type="email" name="email" id="email" :class="[commonInputClass]" required="true"
                  v-model="formData.email" />
            </div>

            <div class="m-7">
               <button type="submit"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                  Guardar
               </button>
            </div>
         </div>
      </form>
   </div>
</template>

<script setup>
import moment from "moment";
import { create, update } from "~/services/http.service";
import { commonInputClass, commonLabelClass } from "~/config/styles";

import { defineProps } from "vue";

const props = defineProps({
   contributor: {
      type: Object,
      default: () => ({}),
   },
});

const formData = ref({
   ...props.contributor,
   timbradoFecha: props.contributor
      ? moment(props.contributor.timbradoFecha)
         .local()
         .format("YYYY-MM-DDTHH:mm")
      : null,
});

const saveContributorData = async (e) => {
   if (validateForm()) {
      let timbradoFecha = moment(formData.value.timbradoFecha).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let payload = {
         ...formData.value,
         timbradoFecha,
      };

      try {
         if (props.contributor) {
            const res = await update(
               `contributor-emitter/${props.contributor._id}`,
               payload,
            );
            console.log("Datos actualizados:", res);
            alert("Datos actualizados");
         } else {
            const res = await create("contributor-emitter", payload);
            console.log("Datos creados:", res);
            alert("Datos creados");
         }
      } catch (error) {
         alert("Error: " + error);
         throw error;
      }
   }
};

/**
 *@todo ajustar validadores para que todos tengan el mismo formato y que que esten en sus respectivos archivos 
*/
const validateForm = () => {

   try {
      const errors = [];
      const { timbradoNumero, ruc, csc, nombreFantasia, razonSocial, email } = formData.value;

      if (!timbradoNumero || isNaN(Number(timbradoNumero))) throw "El campo 'timbradoNúmero' es requerido y debe ser numérico";
      if (!ruc) errors.push("Ruc es requerido");
      if (!csc) errors.push("Csc es requerido");
      if (!nombreFantasia) errors.push("Nombre de fantasía es requerido");
      if (!razonSocial) errors.push("Razon Social es requerido");
      if (!email) errors.push("Email es requerido");

      if (errors.length > 0) {
         const message = errors.join("\n");
         alert(message);

         return false;
      }

      return true;
   } catch (error) {
      alert(error);
      return false;
   }
};



</script>
