<template>
   <div>
      <AlertSimple
         v-model:is-open="deleteEstablecimientoAlert"
         :confirm-fn="deleteEstablecimiento"
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
         <div
            class="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 m-5"
         >
            <div>
               <label for="formDataCodigo" :class="[commonLabelClass]"
                  >Codigo *
               </label>
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
               <label for="formDataDenominacion" :class="[commonLabelClass]"
                  >Nombre de Sucursal *</label
               >
               <input
                  type="text"
                  name="formDataDenominacion"
                  id="formDataDenominacion"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Ej: Sucursal 1 o Villa Elisa 1"
                  v-model="formData.denominacion"
               />
            </div>

            <div>
               <label for="Departamento" :class="[commonLabelClass]"
                  >Departamento</label
               >
               <select
                  name="Departamento"
                  :class="[INPUT_CLASS.sm]"
                  id="departamento"
                  v-model="formData.departamento"
                  @change="setDepartamento"
               >
                  <option
                     v-for="departamento in departamentos"
                     :key="departamento.codigoDepartamento"
                     :value="departamento.codigoDepartamento"
                  >
                     {{ departamento.nombreDepartamento }}
                  </option>
               </select>
            </div>

            <div>
               <label for="formDataDistrito" :class="[commonLabelClass]"
                  >Distrito</label
               >
               <select
                  name="formDataDistrito"
                  :class="[INPUT_CLASS.sm]"
                  id="formDataDistrito"
                  v-model="formData.distrito"
                  @change="setDistrito"
               >
                  <option
                     v-for="distrito in distritos"
                     :key="distrito.codigoDistrito"
                     :value="distrito.codigoDistrito"
                  >
                     {{ distrito.nombreDistrito }}
                  </option>
               </select>
            </div>

            <div>
               <label for="ciudades" :class="[commonLabelClass]">Ciudad</label>
               <select
                  name="ciudades"
                  :class="[INPUT_CLASS.sm]"
                  id="ciudades"
                  v-model="formData.ciudad"
                  @change="setCiudad"
               >
                  <option
                     v-for="ciudad in ciudades"
                     :key="ciudad.codigoCiudad"
                     :value="ciudad.codigoCiudad"
                  >
                     {{ ciudad.nombreCiudad }}
                  </option>
               </select>
            </div>

            <div>
               <label for="formDataDireccion" :class="[commonLabelClass]"
                  >Direccion</label
               >
               <input
                  type="text"
                  name="formDataDireccion"
                  id="formDataDireccion"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Dirección"
                  v-model="formData.direccion"
               />
            </div>
            <div>
               <label for="formDataNumeroCasa" :class="[commonLabelClass]"
                  >Número de casa</label
               >
               <input
                  type="number"
                  name="formDataNumeroCasa"
                  id="formDataNumeroCasa"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Número de casa"
                  v-model="formData.numeroCasa"
               />
            </div>

            <div>
               <label for="formDataTelefono" :class="[commonLabelClass]"
                  >Telefono</label
               >
               <input
                  type="text"
                  name="formDataTelefono"
                  id="formDataTelefono"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Telefono"
                  v-model="formData.telefono"
               />
            </div>
            <div>
               <label for="formDataEmail" :class="[commonLabelClass]"
                  >Email</label
               >
               <input
                  type="email"
                  name="formDataEmail"
                  id="formDataEmail"
                  :class="[INPUT_CLASS.sm]"
                  placeholder="Email"
                  v-model="formData.email"
               />
            </div>
         </div>
      </form>

      <div class="m-5 overflow-x-auto">
         <h3 class="text-lg font-bold dark:text-white py-5">
            Establecimientos activos
         </h3>
         <table class="divide-gray-200 min-w-full">
            <thead>
               <tr
                  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
               >
                  <th class="px-3 py-2">Código</th>
                  <th class="px-3 py-2">Establecimiento</th>
                  <th class="px-3 py-2">Dirección</th>
                  <th class="px-3 py-2">Número Casa/Edif.</th>
                  <th class="px-3 py-2">Departamento</th>
                  <th class="px-3 py-2">Distrito</th>
                  <th class="px-3 py-2">Ciudad</th>
                  <th class="px-3 py-2">Telefono</th>
                  <th class="px-3 py-2">Email</th>
               </tr>
            </thead>
            <tbody
               class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
               <tr
                  v-for="item in establecimientos"
                  :key="item.codigo"
                  class="text-gray-700 dark:text-gray-400 text-sm"
               >
                  <td class="px-3 py-2 whitespace-nowrap text-center">
                     <div>
                        {{ item.codigo }}
                     </div>
                  </td>
                  <td class="px-3 py-2 whitespace-nowrap">
                     <div>
                        {{ item.denominacion }}
                     </div>
                  </td>
                  <td class="px-3 py-2 whitespace-nowrap">
                     <div>
                        {{ item.direccion }}
                     </div>
                  </td>
                  <td class="px-3 py-2 whitespace-nowrap text-right">
                     <div>
                        {{ item.numeroCasa }}
                     </div>
                  </td>
                  <td class="px-3 py-2 whitespace-nowrap">
                     <div>
                        {{ item.departamentoDescripcion }}
                     </div>
                  </td>
                  <td class="px-3 py-2 whitespace-nowrap">
                     <div>
                        {{ item.distritoDescripcion }}
                     </div>
                  </td>
                  <td class="px-3 py-2 whitespace-nowrap">
                     <div>
                        {{ item.ciudadDescripcion }}
                     </div>
                  </td>
                  <td class="px-3 py-2 whitespace-nowrap">
                     <div>
                        {{ item.telefono }}
                     </div>
                  </td>
                  <td class="px-3 py-2 whitespace-nowrap">
                     <div>
                        {{ item.email }}
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
                                    @click="copyEstablecimiento(item)"
                                 >
                                    <NuxtLink
                                       :class="[
                                          active
                                             ? 'bg-gray-100 text-gray-900 outline-hidden'
                                             : 'text-gray-700',
                                          'block px-4 py-2 text-sm',
                                       ]"
                                    >
                                       Copiar establecimiento
                                    </NuxtLink>
                                 </MenuItem>
                                 <MenuItem
                                    v-slot="{ active }"
                                    @click="setDeleteEstablecimientoAlert(item)"
                                 >
                                    <NuxtLink
                                       :class="[
                                          active
                                             ? 'bg-gray-100 text-gray-900 outline-hidden'
                                             : 'text-gray-700',
                                          'block px-4 py-2 text-sm',
                                       ]"
                                    >
                                       Eliminar establecimiento
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
import { defineProps } from "vue";
import { INPUT_CLASS } from "~/config";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import {
   getCiudadPorDistrito,
   getDepartamentoByCodigo,
   getDepartamentos,
   getDistritosPorDepartamento,
} from "~/services/departament.service";
import { useToast } from "vue-toast-notification";
import { useContributorStore } from "~/stores";
import AlertSimple from "~/components/Theme/Alert/AlertSimple.vue";

const { setContributor } = useContributorStore();

const toast = useToast();

const props = defineProps({
   contributor: {
      type: Object,
      default: () => ({}),
   },
});

const formData = ref({
   codigo: "",
   direccion: "",
   numeroCasa: 0,
   complementoDireccion1: "",
   complementoDireccion2: "",
   departamento: "1",
   departamentoDescripcion: "",
   distrito: null,
   distritoDescripcion: "",
   ciudad: null,
   ciudadDescripcion: "",
   telefono: "",
   email: "",
   denominacion: "",
});

const establecimientoSelected = ref(null);

const departamentos = ref([...getDepartamentos()]);
const ciudades = ref([]);
const distritos = ref([]);
const establecimientos = ref([]);

const deleteEstablecimientoAlert = ref(false);

const saveForm = async (e) => {
   try {
      if (validateForm() && !validateEstablecimiento()) {
         // Actualiza en local y remoto
         const payload = {
            establecimientos: [
               ...establecimientos.value,
               { ...formData.value },
            ],
         };

         await update(`contributor-emitter/${props.contributor._id}`, payload);

         setContributor(payload);

         // Renderiza en pantalla
         establecimientos.value = payload.establecimientos;
         sortEstablecimientos();
         toast.success("¡Operación exitosa!", { duration: 3000 });
      }
   } catch (error) {
      console.error(error);
      toast.error("¡Error! no se pudo completar la solicitud", {
         duration: 3000,
      });
   }
};

const validateForm = () => {
   try {
      const {
         codigo,
         direccion,
         numeroCasa,
         departamento,
         distrito,
         ciudad,
         denominacion,
         email,
         telefono,
      } = formData.value;

      if (!codigo) throw "Codigo es requerido";
      if (!denominacion) throw "Denominacion de casa es requerido";
      if (!departamento) throw "Departamento de casa es requerido";
      if (!distrito) throw "Distrito de casa es requerido";
      if (!ciudad) throw "Ciudad de casa es requerido";
      if (!direccion) throw "Direccion es requerido";
      if (!numeroCasa) throw "Número de casa es requerido";
      if (!telefono) throw "Telefono de casa es requerido";
      if (!email) throw "Email de casa es requerido";

      if (codigo.length != 3) throw "Código debe tener 3 caracteres";

      return true;
   } catch (error) {
      toast.error(error, { duration: 3000 });
      return false;
   }
};

onMounted(() => {
   if (props.contributor?.establecimientos) {
      establecimientos.value = props.contributor?.establecimientos;
      sortEstablecimientos();
   }
});

/**
 * Actualiza el departamento
 * @param e
 */
const setDepartamento = (e) => {
   const codigoDepartamento = e.target.value;
   const departamento = getDepartamentoByCodigo(codigoDepartamento);

   formData.value.departamento = codigoDepartamento;
   formData.value.departamentoDescripcion = departamento[0].nombreDepartamento;
   formData.value.distrito = null;
   formData.value.ciudad = null;
   formData.value.distritoDescripcion = "";
   formData.value.ciudadDescripcion = "";

   // retorna el listado de distritos por ciudad
   getDistritos(codigoDepartamento);
};

const sortEstablecimientos = () => {
   establecimientos.value.sort((a, b) => Number(a.codigo) - Number(b.codigo));
};

const getDistritos = (codigoDepartamento) => {
   const distritosTemp = getDistritosPorDepartamento(codigoDepartamento);
   distritos.value = [...distritosTemp];
};

const setDistrito = (e) => {
   const codigoDistrito = e.target.value;

   const distrito = distritos.value.find(
      (distrito) => distrito.codigoDistrito == codigoDistrito,
   );

   formData.value.distritoDescripcion = distrito.nombreDistrito;
   formData.value.ciudad = null;
   formData.value.ciudadDescripcion = "";

   // retorna el listado de ciudades por distritos
   getCiudades(codigoDistrito);
};

const getCiudades = (codigoDistrito) => {
   const ciudadesTemp = getCiudadPorDistrito(codigoDistrito);
   console.log(ciudadesTemp);
   ciudades.value = [...ciudadesTemp];
};

const setCiudad = (e) => {
   const codigoCiudad = e.target.value;

   const ciudad = ciudades.value.find((c) => c.codigoCiudad == codigoCiudad);

   formData.value.ciudad = codigoCiudad;
   formData.value.ciudadDescripcion = ciudad.nombreCiudad;
};

const validateEstablecimiento = () => {
   const exist = establecimientos.value.find(
      (e) => parseInt(formData.value.codigo) == parseInt(e.codigo),
   );

   if (exist) {
      toast.error("¡Error! establecimiento ya existe", {
         duration: 3000,
      });
      return true;
   }
   return false;
};

const setDeleteEstablecimientoAlert = (item) => {
   establecimientoSelected.value = item;
   deleteEstablecimientoAlert.value = !deleteEstablecimientoAlert.value;
};

const deleteEstablecimiento = async () => {
   try {
      // elimina el establecimiento no existente
      const item = establecimientoSelected.value;
      const establecimientosTemp = establecimientos.value.filter(
         (establecimiento) => {
            if (establecimiento.codigo != item.codigo) return establecimiento;
         },
      );

      establecimientos.value = [...establecimientosTemp];

      // Actualizamos en remoto y local (store)
      await update(`contributor-emitter/${props.contributor._id}`, {
         establecimientos: establecimientos.value,
      });

      setContributor({
         establecimientos: establecimientos.value,
      });

      // seteo de valores por defecto
      establecimientoSelected.value = null;
      deleteEstablecimientoAlert.value = false;
   } catch (error) {
      console.error(error);
   }
};

const copyEstablecimiento = (item) => {
   formData.value = {
      ...item,
      ciudad: null,
      distrito: null,
   };
};
</script>
