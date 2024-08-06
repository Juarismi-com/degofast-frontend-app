<template>
   <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700"
   >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
         <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
         >
            Contribuyente
         </h1>
         <!--div v-if="registerFail" class="text-center">
            Ocurrio un problema en su registro
         </div-->
      </div>

      <div class="border-b border-gray-200 mb-4">
         <ul
            class="flex flex-wrap -mb-px text-sm font-medium text-center"
            role="tablist"
         >
            <li class="mr-2" role="presentation">
               <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :class="{
                     'border-blue-600 text-blue-600': activeTab === 0,
                     'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                        activeTab !== 0,
                  }"
                  @click="activeTab = 0"
                  role="tab"
               >
                  <label class="text-base">Datos del Contribuyente</label>
               </button>
            </li>
            <li class="mr-2" role="presentation">
               <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :class="{
                     'border-blue-600 text-blue-600': activeTab === 1,
                     'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                        activeTab !== 1,
                  }"
                  @click="activeTab = 1"
                  role="tab"
               >
                  <label class="text-base">Establecimiento</label>
               </button>
            </li>
            <li class="mr-2" role="presentation">
               <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :class="{
                     'border-blue-600 text-blue-600': activeTab === 2,
                     'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                        activeTab !== 2,
                  }"
                  @click="activeTab = 2"
                  role="tab"
               >
                  <label class="text-base">Puntos de Expedicion</label>
               </button>
            </li>
            <li class="mr-2" role="presentation">
               <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :class="{
                     'border-blue-600 text-blue-600': activeTab === 3,
                     'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                        activeTab !== 3,
                  }"
                  @click="activeTab = 3"
                  role="tab"
               >
                  <label class="text-base">Certificado</label>
               </button>
            </li>
            <li class="mr-2" role="presentation">
               <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :class="{
                     'border-blue-600 text-blue-600': activeTab === 4,
                     'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                        activeTab !== 4,
                  }"
                  @click="activeTab = 4"
                  role="tab"
               >
                  <label class="text-base">Actividades Economicas</label>
               </button>
            </li>
            <li class="mr-2" role="presentation">
               <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  :class="{
                     'border-blue-600 text-blue-600': activeTab === 5,
                     'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                        activeTab !== 5,
                  }"
                  @click="activeTab = 5"
                  role="tab"
               >
                  <label class="text-base">Usuarios con acceso</label>
               </button>
            </li>
         </ul>
      </div>

      <form @submit.prevent="saveContributorData" method="post">
         <div
            v-if="activeTab === 0"
            class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5"
         >
            <div>
               <label for="fechaFirmaDigital" :class="[commonLabelClass]"
                  >Fecha Generación de Firma Digital *</label
               >
               <vue-tailwind-datepicker
                  v-model="form.fechaFirmaDigital"
                  :class="[commonInputClass]"
                  as-single
               />
            </div>

            <div>
               <label for="timbradoNumero" :class="[commonLabelClass]"
                  >Numero de Timbrado*</label
               >
               <input
                  type="text"
                  name="timbradoNumero"
                  id="timbradoNumero"
                  :class="[commonInputClass]"
                  placeholder="Nro de timbrado actual"
                  required="true"
                  v-model="form.timbradoNumero"
               />
            </div>

            <div>
               <label for="timbradoFecha" :class="[commonLabelClass]"
                  >Fecha de Timbrado*</label
               >
               <vue-tailwind-datepicker
                  v-model="form.timbradoFecha"
                  :class="[commonInputClass]"
                  as-single
               />
            </div>

            <div>
               <label for="tipoContribuyente" :class="[commonLabelClass]"
                  >Tipo de Contribuyente *</label
               >
               <select
                  name="tipoContribuyente"
                  :class="[commonInputClass]"
                  id="tipoContribuyente"
                  v-model="form.tipoContribuyente"
               >
                  <option value="1">Persona Fisica</option>
                  <option value="2">Persona Juridica</option>
               </select>
            </div>

            <div>
               <label for="ruc" :class="[commonLabelClass]"
                  >RUC (Sin puntos)*</label
               >
               <input
                  type="text"
                  name="ruc"
                  id="ruc"
                  :class="[commonInputClass]"
                  placeholder="XXXXXXX-Y"
                  required="true"
                  v-model="form.ruc"
               />
            </div>

            <div>
               <label for="csc" :class="[commonLabelClass]">CSC</label>
               <input
                  type="text"
                  name="csc"
                  id="csc"
                  :class="[commonInputClass]"
                  required="true"
                  v-model="form.csc"
               />
            </div>

            <div>
               <label for="nombreFantasia" :class="[commonLabelClass]"
                  >Nombre de Fantasia*</label
               >
               <input
                  type="text"
                  name="nombreFantasia"
                  id="nombreFantasia"
                  :class="[commonInputClass]"
                  placeholder="Empresa X"
                  required="true"
                  v-model="form.nombreFantasia"
               />
            </div>

            <div>
               <label for="razonSocial" :class="[commonLabelClass]"
                  >Razon Social*</label
               >
               <input
                  type="text"
                  name="razonSocial"
                  id="razonSocial"
                  :class="[commonInputClass]"
                  placeholder="Razon Social S.R.L"
                  required="true"
                  v-model="form.razonSocial"
               />
            </div>

            <div>
               <label for="email" :class="[commonLabelClass]">Email</label>
               <input
                  type="email"
                  name="email"
                  id="email"
                  :class="[commonInputClass]"
                  required="true"
                  v-model="form.email"
               />
            </div>
            <div>
               <button
                  type="submit"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               >
                  Guardar
               </button>
            </div>
         </div>
      </form>

      <form @submit.prevent="saveEstablecimiento" method="post">
         <div v-if="activeTab === 1">
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
                  <label
                     for="formEstablecimientoEmail"
                     :class="[commonLabelClass]"
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

               <div class="m-7">
                  <button
                     type="button"
                     class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                     @click="agregarEstablecimientoItem"
                  >
                     Agregar
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

            <div class="m-5">
               <button
                  type="submit"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               >
                  Guardar
               </button>
            </div>
         </div>
      </form>
      <form @submit.prevent="savePuntoExpedicion" method="post">
         <div
            v-if="activeTab === 2"
            class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5"
         >
            Pestaña 3
         </div>
      </form>
      <form @submit.prevent="saveCertified" method="post">
         <div
            v-if="activeTab === 3"
            class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5"
         >
            <div>
               <label for="formCertifiedFile" :class="[commonLabelClass]"
                  >Certificado</label
               >
               <input
                  type="file"
                  name="formCertifiedFile"
                  id="formCertifiedFile"
                  :class="[commonInputClass]"
                  @change="handleFileUpload"
               />
            </div>
            <div>
               <label for="formCertifiedPassword" :class="[commonLabelClass]"
                  >Contraseña</label
               >
               <input
                  type="text"
                  name="formCertifiedPassword"
                  id="formCertifiedPassword"
                  :class="[commonInputClass]"
                  placeholder="Contraseña"
                  v-model="formCertified.password"
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
      </form>
      <form @submit.prevent="saveActividadEconomica" method="post">
         <div v-if="activeTab === 4">
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
                     placeholder="Nro de timbrado actual"
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
         </div>
      </form>
      <form @submit.prevent="saveUser" method="post">
         <div
            v-if="activeTab === 5"
            class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 m-5"
         >
            Pestaña 6
         </div>
      </form>
   </div>
</template>

<script setup>
/**
 * @todo add object for establecimientos, by defailt send 1
 * @todo separate a component in actividadEconomica, establecimientos, etc
 * @todo add table of actividades generadas
 */
import moment from "moment";
import { storeToRefs } from "pinia";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { create, update } from "~/services/http.service";
import { useAuthStore } from "~/stores";

const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);

const form = ref({ ...contributor.value });
const activeTab = ref(0);

// const registerFail = ref(false);

const commonInputClass =
   "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500";

const commonLabelClass =
   "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

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

const setContributorDefault = () => {
   contributor;
};

/**
 * Guarda el formulario
 */
const saveContributorData = async (e) => {
   if (validateForm()) {
      let fechaFirmaDigital = moment(form.value.fechaFirmaDigital).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let timbradoFecha = moment(form.value.timbradoFecha).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let payload = {
         ...form.value,
         fechaFirmaDigital,
         timbradoFecha,
      };

      try {
         if (contributor) {
            const res = await update(
               `contributor-emitter/${authStore.contributor._id}`,
               payload,
            );
            console.log("Datos actualizados:", res);
         } else {
            const res = await create("contributor-emitter", payload);
            console.log("Datos creados:", res);
         }
      } catch (error) {
         throw error;
      }
   }
};

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
   if (validateForm()) {
      let fechaFirmaDigital = moment(form.value.fechaFirmaDigital).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let timbradoFecha = moment(form.value.timbradoFecha).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let payload = {
         ...form.value,
         fechaFirmaDigital,
         timbradoFecha,
         actividadesEconomicas: actividadEconomicaData.value.items,
      };

      try {
         if (contributor) {
            const res = await update(
               `contributor-emitter/${authStore.contributor._id}`,
               payload,
            );
            console.log("Datos actualizados:", res);
         } else {
            console.log("Se debe cargar los datos del contribuyente", res);
         }
      } catch (error) {
         throw error;
      }
   }
};

const formEstablecimiento = ref({
   codigo: "1",
   direccion: "1",
   numeroCasa: 1,
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

const agregarEstablecimientoItem = () => {
   if (
      formEstablecimiento.value.codigo &&
      formEstablecimiento.value.direccion
   ) {
      establecimientoData.value.items.push({ ...formEstablecimiento.value });
      formEstablecimiento.value = {
         codigo: "",
         direccion: "",
         numeroCasa: 1,
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
      };
   } else {
      alert("Por favor, complete todos los campos del nuevo ítem.");
   }
};

const saveEstablecimiento = async (e) => {
   if (validateForm()) {
      let fechaFirmaDigital = moment(form.value.fechaFirmaDigital).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let timbradoFecha = moment(form.value.timbradoFecha).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let payload = {
         ...form.value,
         fechaFirmaDigital,
         timbradoFecha,
         establecimientos: establecimientoData.value.items,
      };

      try {
         if (contributor) {
            const res = await update(
               `contributor-emitter/${authStore.contributor._id}`,
               payload,
            );
            console.log("Datos actualizados:", res);
         } else {
            console.log("Se debe cargar los datos del contribuyente", res);
         }
      } catch (error) {
         console.error("Error al actualizar los datos:", error.message);
      }
   }
};

const formCertified = ref({
   password: "",
});

const file = ref(null);

const handleFileUpload = (event) => {
   file.value = event.target.files[0];
};

const saveCertified = async (e) => {
   if (validateForm()) {
      let fechaFirmaDigital = moment(form.value.fechaFirmaDigital).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let timbradoFecha = moment(form.value.timbradoFecha).format(
         "YYYY-MM-DDTHH:mm:ss",
      );

      let payload = {
         ...form.value,
         fechaFirmaDigital,
         timbradoFecha,
      };

      try {
         if (contributor) {
            const res = await create(`certified/local/`, payload);
            console.log("Datos actualizados:", res);
         } else {
            console.log("Se debe cargar los datos del contribuyente", res);
         }
      } catch (error) {
         console.error("Error al actualizar los datos:", error.message);
      }
   }
};

const validateForm = () => {
   const errors = [];
   const { ruc, csc, fechaFirmaDigital, nombreFantasia, razonSocial, email } =
      form.value;

   if (!ruc) errors.push("Ruc es requerido");
   if (!csc) errors.push("Csc es requerido");
   if (!fechaFirmaDigital) errors.push("Fecha de firma digital es requerido");
   if (!nombreFantasia) errors.push("Nombre de fantasía es requerido");
   if (!razonSocial) errors.push("Razon Social es requerido");
   if (!email) errors.push("Email es requerido");

   if (errors.length > 0) {
      const message = errors.join("\n");
      alert(message);

      return false;
   }

   return true;
};

onMounted(() => {
   if (contributor) {
      actividadEconomicaData.value.items =
         contributor.value.actividadesEconomicas || [];
      establecimientoData.value.items =
         contributor.value.establecimientos || [];
   }
});
</script>
