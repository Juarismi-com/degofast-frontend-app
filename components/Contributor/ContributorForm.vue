<template>
   <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700"
   >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
         <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
         >
            Datos del Contribuyente
         </h1>
         <!--div v-if="registerFail" class="text-center">
            Ocurrio un problema en su registro
         </div-->
         <form class="space-y-4 md:space-y-6" @submit="saveForm" method="post">
            <button
               type="submit"
               class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
               Guardar
            </button>

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
         </form>

         <div>
            <h3
               class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
            >
               Actividades Economicas
            </h3>

            <div class="flex flex-row gap-4">
               <div class="basis-1/3">
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
                     required="true"
                     v-model="formActividadEconomica.codigo"
                  />
               </div>
               <div class="basis-1/3">
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
                     required="true"
                     v-model="formActividadEconomica.descripcion"
                  />
               </div>
               <div class="basis-1/3 pt-6">
                  <button
                     type="submit"
                     class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                     @click="addActividadEconomica"
                  >
                     Agregar
                  </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
/**
 * @todo add object for establecimientos, by defailt send 1
 * @todo separate a component in actividadEconomica, establecimientos, etc
 * @todo add table of actividades generadas
 */
import { storeToRefs } from "pinia";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { create } from "~/services/http.service";
import { useAuthStore } from "~/stores";

const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);

const form = ref({ ...contributor.value });

const formActividadEconomica = ref({
   codigo: "",
   descripcion: "",
});

const registerFail = ref(false);

const commonInputClass =
   "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const commonLabelClass =
   "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

/**
 * Verificia si la actividad economica ya se agrego, sino lo agrega
 */
const addActividadEconomica = () => {
   const actividadesEconomicas = form.value.actividadesEconomicas;
   const actividadEconomica = { ...formActividadEconomica.value };

   const isAdded = actividadesEconomicas.some((actividad) => {
      return actividad.codigo === actividadEconomica.codigo;
   });

   if (!isAdded) actividadesEconomicas.push(actividadEconomica);
};

const setContributorDefault = () => {
   contributor;
};

/**
 * Guarda el formulario
 */
const saveForm = (e) => {
   e.preventDefault();
   if (!form.value.ruc) create("contributor-emitter", form.value);
};

onMounted(() => {
   console.log("mounted");
});
</script>
