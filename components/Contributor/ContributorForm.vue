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

      <div v-if="activeTab === 0">
         <ContributorFormFullContributorDataComponent
            :contributor="contributor"
         />
      </div>

      <div v-if="activeTab === 1">
         <ContributorFormFullEstablecimientoComponent
            :contributor="contributor"
         />
      </div>

      <div v-if="activeTab === 2">
         <ContributorFormFullPuntoExpedicionComponent
            :contributor="contributor"
         />
      </div>

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
            <h1 :style="{ color: certDataColor }" class="font-bold">
               {{ messageCertData }}
            </h1>
         </div>
      </form>

      <div v-if="activeTab === 4">
         <ContributorFormFullActividadEconomicaComponent
            :contributor="contributor"
         />
      </div>

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
import { storeToRefs } from "pinia";
import { get, create } from "~/services/http.service";
import { useAuthStore } from "~/stores";

// datos del contribuyente
const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);

const activeTab = ref(0);

// const registerFail = ref(false);

const commonInputClass =
   "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500";

const commonLabelClass =
   "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const setContributorDefault = () => {
   contributor;
};

const formCertified = ref({
   cert: null,
   password: "",
});

const handleFileUpload = (event) => {
   formCertified.value.cert = event.target.files[0];
};

const messageCertData = ref("No se ha cargado ningún certificado");
const certDataColor = ref("red");

/* @todo validar funcionalidad */
const saveCertified = async (e) => {
   try {
      if (authStore.contributor) {
         const formData = new FormData();

         if (formCertified.value.cert) {
            formData.append("cert", formCertified.value.cert);
         } else {
            console.error("No se ha seleccionado un archivo.");
            return;
         }

         formData.append("password", formCertified.value.password);

         const res = await create("certifieds/local", formData);
         console.log("Datos actualizados:", res);

         formCertified.value = {
            cert: null,
            password: "",
         };
      } else {
         console.log("Se debe cargar los datos del contribuyente", res);
      }
   } catch (error) {
      console.error("Error al actualizar los datos:", error.message);
   }
};

const getDepartments = async () => {
   try {
      const departaments = await get("departments");
      console.log(departaments);
      return departaments;
   } catch (error) {
      console.log(error);
      const data = error?.response?.data?.error;
   }
};
</script>
