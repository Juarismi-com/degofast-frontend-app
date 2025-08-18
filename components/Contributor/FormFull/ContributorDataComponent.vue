<template>
   <div>
      <form @submit.prevent="saveForm" method="post">
         <div class="mx-5 flex justify-end">
            <div>
               <button
                  type="submit"
                  class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               >
                  Guardar
               </button>
            </div>
         </div>
         <div
            class="col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-5"
         >
            <div>
               <label for="timbradoNumero">Numero de Timbrado *</label>
               <input
                  type="text"
                  name="timbradoNumero"
                  id="timbradoNumero"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Nro de timbrado actual"
                  v-model="formData.timbradoNumero"
               />
            </div>

            <div>
               <label for="timbradoFecha">Fecha de Timbrado *</label>
               <input
                  type="datetime-local"
                  v-model="formData.timbradoFecha"
                  id="fecha"
                  :class="[INPUT_CLASS.sm]"
               />
            </div>

            <div>
               <label for="tipoContribuyente">Tipo de Contribuyente *</label>
               <select
                  name="tipoContribuyente"
                  :class="[INPUT_CLASS.sm]"
                  id="tipoContribuyente"
                  v-model="formData.tipoContribuyente"
               >
                  <option value="1">Persona Fisica</option>
                  <option value="2">Persona Juridica</option>
               </select>
            </div>

            <div>
               <label for="ruc">RUC (Sin puntos)*</label>
               <input
                  type="text"
                  name="ruc"
                  id="ruc"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="XXXXXXX-Y"
                  required="true"
                  v-model="formData.ruc"
               />
            </div>

            <div>
               <label for="csc">CSC</label>
               <input
                  type="text"
                  name="csc"
                  id="csc"
                  :class="[INPUT_CLASS.sm]"
                  required="true"
                  v-model="formData.csc"
               />
            </div>

            <div>
               <label for="nombreFantasia">Nombre de Fantasia *</label>
               <input
                  type="text"
                  name="nombreFantasia"
                  id="nombreFantasia"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Empresa X"
                  required="true"
                  v-model="formData.nombreFantasia"
               />
            </div>

            <div>
               <label for="razonSocial">Razon Social *</label>
               <input
                  type="text"
                  name="razonSocial"
                  id="razonSocial"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Razon Social S.R.L"
                  required="true"
                  v-model="formData.razonSocial"
               />
            </div>

            <div>
               <label for="email">Email</label>
               <input
                  type="email"
                  name="email"
                  id="email"
                  :class="[INPUT_CLASS.sm]"
                  required="true"
                  v-model="formData.email"
               />
            </div>
         </div>
      </form>
   </div>
</template>

<script setup>
import moment from "moment";
import { create, update } from "~/services/http.service";
import { INPUT_CLASS } from "~/config";
import { useToast } from "vue-toast-notification";
import { defineProps } from "vue";
import { useContributorStore } from "~/stores";
const { setContributor } = useContributorStore();
const toast = useToast();

const props = defineProps({
   contributor: {
      type: Object,
      default: () => ({}),
   },
});

const formData = ref({
   timbradoNumero: props.contributor?.timbradoNumero,
   tipoContribuyente: props.contributor?.tipoContribuyente,
   ruc: props.contributor?.ruc,
   nombreFantasia: props.contributor?.nombreFantasia,
   razonSocial: props.contributor?.razonSocial,
   email: props.contributor?.email,
   csc: props.contributor?.csc,
   timbradoFecha: props.contributor
      ? moment(props.contributor.timbradoFecha)
           .local()
           .format("YYYY-MM-DDTHH:mm")
      : null,
});

const emit = defineEmits(["save-data"]);

const saveForm = async (e) => {
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
            await update(
               `contributor-emitter/${props.contributor._id}`,
               payload,
            );
         } else {
            await create("contributor-emitter", payload);
         }

         toast.success("¡Operación exitosa!", { duration: 3000 });
         setContributor(payload);
      } catch (error) {
         toast.error("¡Error! no se pudo completar la solicitud", {
            duration: 3000,
         });
      }
   }
};

/**
 * @todo ajustar validadores para que todos tengan el mismo formato y que que
 * esten en sus respectivos archivos
 */
const validateForm = () => {
   try {
      const { timbradoNumero, ruc, csc, nombreFantasia, razonSocial, email } =
         formData.value;

      if (!timbradoNumero || isNaN(Number(timbradoNumero)))
         throw "El campo 'timbradoNúmero' es requerido y debe ser numérico";

      if (!ruc) throw "RUC es requerido";
      if (!csc) throw "CSC es requerido";
      if (!nombreFantasia) throw "Nombre de fantasía es requerido";
      if (!razonSocial) throw "Razon Social es requerido";
      if (!email) throw "Email es requerido";

      return true;
   } catch (error) {
      toast.error(error, { duration: 3000 });
      return false;
   }
};
</script>
