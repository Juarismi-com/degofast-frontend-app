<template>
   <div>
      <AlertSimple
         v-model:is-open="deleteActividadAlert"
         :confirm-fn="deleteActividad"
      />
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
         <div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5">
            <div>
               <label for="formDataCodigo" :class="[commonLabelClass]"
                  >Codigo *</label
               >
               <input
                  type="text"
                  name="formDataCodigo"
                  id="formDataCodigo"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Codigo"
                  v-model="formData.codigo"
               />
            </div>
            <div>
               <label for="formDataDescripcion" :class="[commonLabelClass]"
                  >Descripcion *</label
               >
               <input
                  type="text"
                  name="formDataDescripcion"
                  id="formDataDescripcion"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Descripción / Titulo de la Actividad Economica"
                  v-model="formData.descripcion"
               />
            </div>
         </div>
      </form>
      <div class="m-5 overflow-x-auto">
         <table class="w-full divide-y divide-gray-200 overflow-x-auto">
            <thead class="bg-gray-50">
               <tr>
                  <th
                     scope="col"
                     class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right"
                  >
                     Código
                  </th>
                  <th
                     scope="col"
                     class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                     Descripción
                  </th>
               </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
               <tr
                  v-for="(item, index) in contributor.actividadesEconomicas"
                  :key="index"
               >
                  <td class="px-3 py-2 whitespace-nowrap text-right">
                     <div class="text-sm text-gray-900">
                        {{ item.codigo }}
                     </div>
                  </td>
                  <td class="px-3 py-2 whitespace-nowrap">
                     <div class="text-sm text-gray-900">
                        {{ item.descripcion }}
                     </div>
                  </td>
                  <td class="px-3 py-2 whitespace-nowrap text-center">
                     <Menu as="div" class="relative inline-block">
                        <MenuButton
                           class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50"
                        >
                           Ver opciones
                           <ChevronDownIcon
                              class="-mr-1 size-5 text-gray-400"
                              aria-hidden="true"
                           />
                        </MenuButton>

                        <Transition
                           enter-active-class="transition ease-out duration-100"
                           enter-from-class="transform opacity-0 scale-95"
                           enter-to-class="transform scale-100"
                           leave-active-class="transition ease-in duration-75"
                           leave-from-class="transform scale-100"
                           leave-to-class="transform opacity-0 scale-95"
                        >
                           <MenuItems
                              class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5"
                           >
                              <div class="py-1 cursor-pointer">
                                 <MenuItem
                                    v-slot="{ active }"
                                    @click="setDeleteActividadAlert(index)"
                                 >
                                    <NuxtLink
                                       :class="[
                                          active
                                             ? 'bg-gray-100 text-gray-900 outline-hidden'
                                             : 'text-gray-700',
                                          'block px-4 py-2 text-sm',
                                       ]"
                                    >
                                       Eliminar actividad
                                    </NuxtLink>
                                 </MenuItem>
                              </div>
                           </MenuItems>
                        </Transition>
                     </Menu>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>

<script setup>
import { update } from "~/services/http.service";
import { commonLabelClass } from "~/config/styles";
import { useToast } from "vue-toast-notification";
import { INPUT_CLASS } from "~/config";
import { useContributorStore } from "~/stores";
import { storeToRefs } from "pinia";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import AlertSimple from "~/components/Theme/Alert/AlertSimple.vue";

const formData = ref({
   codigo: "",
   descripcion: "",
});

const contributorStore = useContributorStore();
const { setContributor } = contributorStore;
const { contributor } = storeToRefs(contributorStore);

const toast = useToast();

const deleteActividadAlert = ref(false);
const actividadSelected = ref(null); // es un index

const saveForm = async (e) => {
   try {
      if (validateForm() && !validateActividadEconomica()) {
         const payload = {
            actividadesEconomicas: [
               ...contributor.value.actividadesEconomicas,
               {
                  codigo: formData.value.codigo,
                  descripcion: formData.value.descripcion.toUpperCase(),
               },
            ],
         };

         await update(`contributor-emitter/${contributor.value._id}`, payload);

         setContributor(payload);
         toast.success("¡Operación exitosa!", { duration: 3000 });
      }
   } catch (error) {
      console.error(error);
      const message =
         error?.response?.data?.message ||
         "¡Error! no se pudo completar la solicitud";

      toast.error(message, {
         duration: 3000,
      });
   }
};

const validateForm = () => {
   const errors = [];
   const { codigo, descripcion } = formData.value;

   if (!codigo) errors.push("Código es requerido");
   if (!descripcion) errors.push("Descripción es requerido");

   if (isNaN(codigo)) errors.push("Código debe ser numero");

   if (errors.length > 0) {
      errors.forEach((error) => {
         toast.error(error, { duration: 3000 });
      });
      return false;
   }

   return true;
};

const validateActividadEconomica = () => {
   console.log(contributor);
   const exist = contributor.value.actividadesEconomicas.find((a) => {
      if (parseInt(formData.value.codigo) == parseInt(a.codigo)) return a;
   });

   if (exist) {
      toast.error("¡Error! la actividad ya existe", {
         duration: 3000,
      });
      return true;
   }
   return false;
};

const setDeleteActividadAlert = (index) => {
   deleteActividadAlert.value = !deleteActividad.value;
   actividadSelected.value = index;
};

const deleteActividad = async () => {
   try {
      contributor.value.actividadesEconomicas.splice(
         actividadSelected.value,
         1,
      );

      // Actualizamos en remoto y local (store)
      await update(`contributor-emitter/${contributor.value._id}`, {
         actividadesEconomicas: contributor.value.actividadesEconomicas,
      });

      setContributor({
         actividadesEconomicas: contributor.value.actividadesEconomicas,
      });

      // seteo de valores por defecto
      actividadSelected.value = null;
      deleteActividadAlert.value = false;
   } catch (error) {
      console.error(error);
   }
};
</script>
