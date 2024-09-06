<template>
   <div>
      <form @submit.prevent="saveActividadEconomica" method="post">
         <div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5">
            <div>
               <label
                  for="formActividadEconomicaCodigo"
                  :class="[commonLabelClass]"
                  >Codigo</label
               >
               <input
                  type="text"
                  name="formActividadEconomicaCodigo"
                  id="formActividadEconomicaCodigo"
                  :class="[commonInputClass]"
                  placeholder="Codigo"
                  v-model="formActividadEconomica.codigo"
               />
            </div>
            <div>
               <label
                  for="formActividadEconomicaDescripcion"
                  :class="[commonLabelClass]"
                  >Descripcion</label
               >
               <input
                  type="text"
                  name="formActividadEconomicaDescripcion"
                  id="formActividadEconomicaDescripcion"
                  :class="[commonInputClass]"
                  placeholder="Descripción / Titulo de la Actividad Economica"
                  v-model="formActividadEconomica.descripcion"
               />
            </div>
            <div class="m-7">
               <button
                  type="button"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                  @click="agregarActividadEconomicaItem"
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
                        Código
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Descripción
                     </th>
                  </tr>
               </thead>
               <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                     v-for="item in actividadEconomicaData.items"
                     :key="item.codigo"
                  >
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.codigo }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.descripcion }}
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
import { update } from "~/services/http.service";
import { commonInputClass, commonLabelClass } from "~/config/styles";

import { defineProps } from "vue";

const props = defineProps({
   contributor: {
      type: Object,
      default: () => ({}),
   },
});

const formActividadEconomica = ref({
   codigo: "",
   descripcion: "",
});

const actividadEconomicaData = ref({ items: [] });

const agregarActividadEconomicaItem = () => {
   if (
      formActividadEconomica.value.codigo &&
      formActividadEconomica.value.descripcion
   ) {
      actividadEconomicaData.value.items.push({
         ...formActividadEconomica.value,
      });
      formActividadEconomica.value = { codigo: "", descripcion: "" };
   } else {
      alert("Por favor, complete todos los campos del nuevo ítem.");
   }
};

const saveActividadEconomica = async (e) => {
   // let fechaFirmaDigital = moment(props.form.fechaFirmaDigital).format(
   //    "YYYY-MM-DDTHH:mm:ss",
   // );

   // if (validateForm()) {

   let payload = {
      actividadesEconomicas: actividadEconomicaData.value.items,
   };

   try {
      if (props.contributor) {
         const res = await update(
            `contributor-emitter/${props.contributor._id}`,
            payload,
         );
         console.log("Datos actualizados:", res);
      } else {
         console.log("Se debe cargar los datos del contribuyente", res);
      }
   } catch (error) {
      throw error;
   }

   //}
};

const validateForm = () => {
   const errors = [];
   const { codigo, descripcion } = formActividadEconomica.value;

   if (!codigo) errors.push("Código es requerido");
   if (!descripcion) errors.push("Descripción es requerido");

   if (errors.length > 0) {
      const message = errors.join("\n");
      alert(message);

      return false;
   }

   return true;
};

onMounted(() => {
   if (props.contributor) {
      const { actividadesEconomicas } = props.contributor;

      if (actividadesEconomicas.length > 0) {
         actividadEconomicaData.value.items = actividadesEconomicas;
      } else {
         actividadEconomicaData.value.items = [];
      }
   } else {
      actividadEconomicaData.value.items = [];
   }
});

/**
 * Verificia si la actividad economica ya se agrego, sino lo agrega
 */
// const addActividadEconomica = () => {
//    const actividadesEconomicas = form.value.actividadesEconomicas;
//    const actividadEconomica = { ...formActividadEconomica.value };

//    const isAdded = actividadesEconomicas.some((actividad) => {
//       return actividad.codigo === actividadEconomica.codigo;
//    });

//    if (!isAdded) actividadesEconomicas.push(actividadEconomica);
// };
</script>
