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
            class="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 m-5"
         >
            <div>
               <label for="formDataEstablecimiento" :class="[commonLabelClass]"
                  >Establecimiento *</label
               >
               <select
                  name="formDataEstablecimiento"
                  :class="[INPUT_CLASS.sm]"
                  id="formDataEstablecimiento"
                  v-model="formData.establecimiento"
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
            <div>
               <label for="formDataCodigo" :class="[commonLabelClass]"
                  >Código *</label
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
               <label for="formDataNroInicial" :class="[commonLabelClass]"
                  >Nro. Inicial *</label
               >
               <input
                  type="text"
                  name="formDataNroInicial"
                  id="formDataNroInicial"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Nro. Inicial"
                  v-model="formData.nroInicial"
               />
            </div>
            <div>
               <label for="formDataNroActual" :class="[commonLabelClass]"
                  >Nro. Actual *</label
               >
               <input
                  type="number"
                  name="formDataNroActual"
                  id="formDataNroActual"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Nro. Actual"
                  v-model="formData.nroActual"
               />
            </div>

            <div>
               <label for="formDataTipoDocumento" :class="[commonLabelClass]"
                  >Tipo de Documento</label
               >
               <select
                  name="formDataTipoDocumento"
                  :class="[INPUT_CLASS.sm]"
                  id="formDataTipoDocumento"
                  v-model="formData.tipoDocumento"
               >
                  <option
                     v-for="(tipo, index) in tipoDocumentos"
                     :value="tipo.value"
                     :key="index"
                  >
                     {{ tipo.title }}
                  </option>
               </select>
            </div>
         </div>
      </form>
      <div class="m-5 overflow-x-auto">
         <div
            v-for="(establecimiento, index) in puntosExpedicionList"
            :key="index"
         >
            <h6 class="text-lg font-bold dark:text-white py-3">
               {{ establecimiento.establecimiento.denominacion }}
            </h6>

            <table class="divide-gray-200 min-w-full">
               <thead
                  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
               >
                  <tr>
                     <th scope="col" class="px-3 py-2">Código</th>
                     <th scope="col" class="px-3 py-2">Establecimiento</th>
                     <th scope="col" class="px-3 py-2 text-right">
                        Nro. Inicial
                     </th>
                     <th scope="col" class="px-3 py-2 text-right">
                        Nro Actual
                     </th>

                     <th scope="col" class="px-3 py-2">Tipo de Documento</th>
                  </tr>
               </thead>
               <tbody
                  class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
               >
                  <tr
                     v-for="item in establecimiento?.puntos"
                     :key="item.codigo"
                     class="text-gray-700 dark:text-gray-400 text-sm"
                  >
                     <td class="px-3 py-2 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.codigo }}
                        </div>
                     </td>
                     <td class="px-3 py-2 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.establecimiento.denominacion }}
                        </div>
                     </td>
                     <td class="px-3 py-2 whitespace-nowrap text-right">
                        <div class="text-sm text-gray-900">
                           {{ item.nroInicial }}
                        </div>
                     </td>
                     <td class="px-3 py-2 whitespace-nowrap text-right">
                        <div class="text-sm text-gray-900">
                           {{ item.nroActual }}
                        </div>
                     </td>

                     <td class="px-3 py-2 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ getTipoDocumentoByValue(item.tipoDocumento) }}
                        </div>
                     </td>

                     <td class="px-3 py-2 whitespace-nowrap">
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
                                       @click="copyPunto(item)"
                                    >
                                       <NuxtLink
                                          :class="[
                                             active
                                                ? 'bg-gray-100 text-gray-900 outline-hidden'
                                                : 'text-gray-700',
                                             'block px-4 py-2 text-sm',
                                          ]"
                                       >
                                          Copiar Punto
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
   </div>
</template>

<script setup>
import { get, create } from "~/services/http.service";
import { commonLabelClass } from "~/config/styles";
import { useToast } from "vue-toast-notification";
import { defineProps } from "vue";
import { INPUT_CLASS } from "~/config";
import { useContributorStore } from "~/stores";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
   contributor: {
      type: Object,
      default: () => ({}),
   },
});

const { setContributor } = useContributorStore();

const toast = useToast();

const formData = ref({
   nroActual: 0,
   nroInicial: 0,
   codigo: "",
   contributor: props.contributor._id,
   establecimiento: null,
   tipoDocumento: 1,
});

const tipoDocumentos = ref([
   {
      value: 1,
      title: "Factura Electrónica",
   },
   {
      value: 4,
      title: "Autofactura electrónica",
   },
   {
      value: 5,
      title: "Nota de crédito electrónica",
   },
   {
      value: 6,
      title: "Nota de débito electrónica",
   },
   {
      value: 7,
      title: "Nota de remisión electrónica",
   },
]);

const puntosExpedicionList = ref([]);

const saveForm = async (e) => {
   try {
      if (validateForm() && !validatePuntoExpedicion()) {
         const payload = {
            ...formData.value,
         };

         await create("punto-expedicion", payload);

         setContributor(payload);
         getPuntoExpedicion();
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
   try {
      const { nroActual, nroInicial, codigo, establecimiento } = formData.value;

      if (!nroActual) throw "Nro. Actual es requerido";
      if (!nroInicial) throw "Nro. Inicial es requerido";
      if (!codigo) throw "Código es requerido";
      if (!establecimiento) throw "Establecimiento es requerido";

      if (codigo.length != 3) throw "Código debe tener 3 caracteres";

      return true;
   } catch (error) {
      console.log(error);
      toast.error(error, { duration: 3000 });
      return false;
   }
};

const validatePuntoExpedicion = () => {
   const exist = puntosExpedicionList.value.find((p) => {
      if (
         parseInt(formData.value.codigo) == parseInt(p.codigo) &&
         parseInt(formData.value.establecimiento) ==
            parseInt(p.establecimiento.codigo) &&
         formData.value.tipoDocumento == p.tipoDocumento
      )
         return p;
   });

   if (exist) {
      toast.error("¡Error! punto ya existe", {
         duration: 3000,
      });
      return true;
   }
   return false;
};

const getPuntoExpedicion = async () => {
   let puntosExpedicionListTemp = [];

   try {
      // Info de los establecimientos
      const establecimientos = props.contributor.establecimientos;
      establecimientos.sort((a, b) => Number(a.codigo) - Number(b.codigo));

      // Separamos los puntos por establecimiento
      for (let i = 0; i < establecimientos.length; i++) {
         const item = establecimientos[i];
         let puntos = await get(
            `punto-expedicion?contributor=${props.contributor._id}&establecimiento=${item.codigo}`,
         );

         puntosExpedicionListTemp.push({ establecimiento: item, puntos });
      }

      if (puntosExpedicionListTemp.length > 0) {
         puntosExpedicionList.value = puntosExpedicionListTemp;
         puntosExpedicionList.value;
      }
   } catch (error) {
      console.error(error);
   }
};

const getTipoDocumentoByValue = (value) => {
   return tipoDocumentos.value.find((tipo) => tipo.value == value).title;
};

const copyPunto = (item) => {
   formData.value = {
      ...item,
   };
};

onMounted(async () => {
   await getPuntoExpedicion();
});
</script>
