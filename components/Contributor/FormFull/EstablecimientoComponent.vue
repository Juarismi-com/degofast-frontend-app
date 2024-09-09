<template>
   <div>
      <form @submit.prevent="saveEstablecimiento" method="post">
         <div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5">
            <div>
               <label
                  for="formEstablecimientoCodigo"
                  :class="[commonLabelClass]"
                  >Codigo</label
               >
               <input
                  type="text"
                  name="formEstablecimientoCodigo"
                  id="formEstablecimientoCodigo"
                  :class="[commonInputClass]"
                  placeholder="Codigo"
                  v-model="formEstablecimiento.codigo"
               />
            </div>
            <div>
               <label
                  for="formEstablecimientoDireccion"
                  :class="[commonLabelClass]"
                  >direccion</label
               >
               <input
                  type="text"
                  name="formEstablecimientoDireccion"
                  id="formEstablecimientoDireccion"
                  :class="[commonInputClass]"
                  placeholder="Dirección"
                  v-model="formEstablecimiento.direccion"
               />
            </div>
            <div>
               <label
                  for="formEstablecimientoNumeroCasa"
                  :class="[commonLabelClass]"
                  >Número de casa</label
               >
               <input
                  type="number"
                  name="formEstablecimientoNumeroCasa"
                  id="formEstablecimientoNumeroCasa"
                  :class="[commonInputClass]"
                  placeholder="Número de casa"
                  v-model="formEstablecimiento.numeroCasa"
               />
            </div>
            <div>
               <label
                  for="formEstablecimientoComplementoDireccion1"
                  :class="[commonLabelClass]"
                  >Dirección complemento 1</label
               >
               <input
                  type="text"
                  name="formEstablecimientoComplementoDireccion1"
                  id="formEstablecimientoComplementoDireccion1"
                  :class="[commonInputClass]"
                  placeholder="Dirección complemento 1"
                  v-model="formEstablecimiento.complementoDireccion1"
               />
            </div>
            <div>
               <label
                  for="formEstablecimientoComplementoDireccion2"
                  :class="[commonLabelClass]"
                  >Dirección complemento 2</label
               >
               <input
                  type="text"
                  name="formEstablecimientoComplementoDireccion2"
                  id="formEstablecimientoComplementoDireccion2"
                  :class="[commonInputClass]"
                  placeholder="Dirección complemento 2"
                  v-model="formEstablecimiento.complementoDireccion2"
               />
            </div>
            <div>
               <label
                  for="formEstablecimientoDepartamento"
                  :class="[commonLabelClass]"
                  >Departamento</label
               >
               <input
                  type="text"
                  name="formEstablecimientoDepartamento"
                  id="formEstablecimientoDepartamento"
                  :class="[commonInputClass]"
                  placeholder="Departamento"
                  v-model="formEstablecimiento.departamento"
               />
            </div>
            <div>
               <label
                  for="formEstablecimientoDepartamentoDescripcion"
                  :class="[commonLabelClass]"
                  >Departamento descripción</label
               >
               <input
                  type="text"
                  name="formEstablecimientoDepartamentoDescripcion"
                  id="formEstablecimientoDepartamentoDescripcion"
                  :class="[commonInputClass]"
                  placeholder="Departamento Descripcion"
                  v-model="formEstablecimiento.departamentoDescripcion"
               />
            </div>
            <div>
               <label
                  for="formEstablecimientoDistrito"
                  :class="[commonLabelClass]"
                  >Distrito</label
               >
               <input
                  type="text"
                  name="formEstablecimientoDistrito"
                  id="formEstablecimientoDistrito"
                  :class="[commonInputClass]"
                  placeholder="Distrito"
                  v-model="formEstablecimiento.distrito"
               />
            </div>
            <div>
               <label
                  for="formEstablecimientoDistritoDescripcion"
                  :class="[commonLabelClass]"
                  >Distrito descripción</label
               >
               <input
                  type="text"
                  name="formEstablecimientoDistritoDescripcion"
                  id="formEstablecimientoDistritoDescripcion"
                  :class="[commonInputClass]"
                  placeholder="Distrito Descripcion"
                  v-model="formEstablecimiento.distritoDescripcion"
               />
            </div>
            <div>
               <label
                  for="formEstablecimientoCiudad"
                  :class="[commonLabelClass]"
                  >Ciudad</label
               >
               <input
                  type="text"
                  name="formEstablecimientoCiudad"
                  id="formEstablecimientoCiudad"
                  :class="[commonInputClass]"
                  placeholder="Ciudad"
                  v-model="formEstablecimiento.ciudad"
               />
            </div>
            <div>
               <label
                  for="formEstablecimientoCiudadDescripcion"
                  :class="[commonLabelClass]"
                  >Ciudad descripción</label
               >
               <input
                  type="text"
                  name="formEstablecimientoCiudadDescripcion"
                  id="formEstablecimientoCiudadDescripcion"
                  :class="[commonInputClass]"
                  placeholder="Ciudad Descripcion"
                  v-model="formEstablecimiento.ciudadDescripcion"
               />
            </div>
            <div>
               <label
                  for="formEstablecimientoTelefono"
                  :class="[commonLabelClass]"
                  >Telefono</label
               >
               <input
                  type="text"
                  name="formEstablecimientoTelefono"
                  id="formEstablecimientoTelefono"
                  :class="[commonInputClass]"
                  placeholder="Telefono"
                  v-model="formEstablecimiento.telefono"
               />
            </div>
            <div>
               <label for="formEstablecimientoEmail" :class="[commonLabelClass]"
                  >Email</label
               >
               <input
                  type="email"
                  name="formEstablecimientoEmail"
                  id="formEstablecimientoEmail"
                  :class="[commonInputClass]"
                  placeholder="Email"
                  v-model="formEstablecimiento.email"
               />
            </div>
            <div>
               <label
                  for="formEstablecimientoDenominacion"
                  :class="[commonLabelClass]"
                  >Denominación</label
               >
               <input
                  type="text"
                  name="formEstablecimientoDenominacion"
                  id="formEstablecimientoDenominacion"
                  :class="[commonInputClass]"
                  placeholder="Denominacion"
                  v-model="formEstablecimiento.denominacion"
               />
            </div>

            <div class="m-5">
               <button
                  type="submit"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               >
                  Guardar
               </button>
            </div>
         </div>
         <div class="m-5">
            <table class="divide-gray-200 min-w-full">
               <thead class="bg-gray-50">
                  <tr>
                     <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Código
                     </th>
                     <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Dirección
                     </th>
                     <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Número de casa
                     </th>
                     <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Depto.
                     </th>
                     <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Distrito
                     </th>
                     <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Ciudad
                     </th>
                     <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Telefono
                     </th>
                     <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Email
                     </th>
                  </tr>
               </thead>
               <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                     v-for="item in establecimientoData.items"
                     :key="item.codigo"
                  >
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.codigo }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.direccion }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.numeroCasa }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.departamentoDescripcion }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.distritoDescripcion }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.ciudadDescripcion }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.telefono }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.email }}
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
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

const formEstablecimiento = ref({
   codigo: "001",
   direccion: "",
   numeroCasa: 0,
   complementoDireccion1: "",
   complementoDireccion2: "",
   departamento: "",
   departamentoDescripcion: "",
   distrito: "",
   distritoDescripcion: "",
   ciudad: "",
   ciudadDescripcion: "",
   telefono: "",
   email: "",
   denominacion: "",
});

const establecimientoData = ref({ items: [] });

// formEstablecimiento.value = {
//    codigo: "001",
//    direccion: "",
//    numeroCasa: 0,
//    complementoDireccion1: "",
//    complementoDireccion2: "",
//    departamento: "",
//    departamentoDescripcion: "",
//    distrito: "",
//    distritoDescripcion: "",
//    ciudad: "",
//    ciudadDescripcion: "",
//    telefono: "",
//    email: "",
//    denominacion: "",
// };

const saveEstablecimiento = async (e) => {
   // if (validateForm()) {

   try {
      if (props.contributor) {
         const payload = {
            establecimientos: [
               ...establecimientoData.value.items,
               { ...formEstablecimiento.value },
            ],
         };

         const res = await update(
            `contributor-emitter/${props.contributor._id}`,
            payload,
         );

         establecimientoData.value.items = payload.establecimientos;

         console.log("Datos actualizados:", res);
      } else {
         console.log("Se debe cargar los datos del contribuyente", res);
      }
   } catch (error) {
      console.error("Error al actualizar los datos:", error.message);
   }
   // }
};

const validateForm = () => {
   const errors = [];
   const { codigo, direccion, numeroCasa } = formEstablecimiento.value;

   if (!codigo) errors.push("Codigo es requerido");
   if (!direccion) errors.push("Direccion es requerido");
   if (!numeroCasa) errors.push("Número de casa es requerido");

   if (errors.length > 0) {
      const message = errors.join("\n");
      alert(message);

      return false;
   }

   return true;
};

onMounted(() => {
   if (props.contributor) {
      const { establecimientos } = props.contributor;

      if (establecimientos.length > 0) {
         establecimientoData.value.items = establecimientos;
      } else {
         establecimientoData.value.items = [];
      }
   } else {
      establecimientoData.value.items = [];
   }
});
</script>
