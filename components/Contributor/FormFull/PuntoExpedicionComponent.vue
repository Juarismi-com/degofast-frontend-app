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
               <label for="formDataTipoDocumento" :class="[commonLabelClass]"
                  >Tipo de Documento</label
               >
               <select
                  name="formDataTipoDocumento"
                  :class="[INPUT_CLASS.sm]"
                  id="formDataTipoDocumento"
                  v-model="formData.tipoDocumento"
               >
                  <option value="1">Factura Electrónica</option>
                  <option value="4">Autofactura electrónica</option>
                  <option value="5">Nota de crédito electrónica</option>
                  <option value="6">Nota de débito electrónica</option>
                  <option value="7">Nota de remisión electrónica</option>
               </select>
            </div>
            <div>
               <label for="formDataEstablecimiento" :class="[commonLabelClass]"
                  >Establecimiento</label
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
                     :value="establecimiento._id"
                  >
                     {{
                        establecimiento.denominacion +
                        " - " +
                        establecimiento.codigo
                     }}
                  </option>
               </select>
            </div>
         </div>

         <div class="m-5 overflow-x-auto">
            <h3 class="text-lg font-bold dark:text-white py-5">
               Puntos activos
            </h3>
            <table class="divide-gray-200 min-w-full">
               <thead
                  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
               >
                  <tr>
                     <th scope="col" class="px-3 py-2">Nro Actual</th>
                     <th scope="col" class="px-3 py-2">Nro. Inicial</th>
                     <th scope="col" class="px-3 py-2">Código</th>
                     <th scope="col" class="px-3 py-2">Tipo de Documento</th>
                  </tr>
               </thead>
               <tbody
                  class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
               >
                  <tr
                     v-for="item in puntosExpedicionList"
                     :key="item.codigo"
                     class="text-gray-700 dark:text-gray-400 text-sm"
                  >
                     <td class="px-3 py-2 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.nroActual }}
                        </div>
                     </td>
                     <td class="px-3 py-2 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.nroInicial }}
                        </div>
                     </td>
                     <td class="px-3 py-2 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.codigo }}
                        </div>
                     </td>
                     <td class="px-3 py-2 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{
                              item.tipoDocumento === 1
                                 ? "Factura"
                                 : item.tipoDocumento === 2
                                 ? "Nota de crédito"
                                 : "Recibo"
                           }}
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </form>
      {{ formData }}
   </div>
</template>

<script setup>
import { get, create } from "~/services/http.service";
import { commonLabelClass } from "~/config/styles";
import { useToast } from "vue-toast-notification";
import { defineProps } from "vue";
import { INPUT_CLASS } from "~/config";

const props = defineProps({
   contributor: {
      type: Object,
      default: () => ({}),
   },
});

const toast = useToast();

const formData = ref({
   nroActual: 0,
   nroInicial: 0,
   codigo: "",
   contributor: props.contributor._id,
   establecimiento: null,
   tipoDocumento: 1,
});

const puntosExpedicionList = ref([]);

const saveForm = async (e) => {
   try {
      if (validateForm()) {
         const payload = {
            ...formData.value,
         };

         await create("punto-expedicion", payload);

         setContributor(payload);
         getPuntoExpedicion();
         toast.success("¡Operación exitosa!", { duration: 3000 });
      }
   } catch (error) {
      toast.error("¡Error! no se pudo completar la solicitud", {
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
      if (!establecimiento) throw "establecimiento es requerido";

      if (codigo.length < 3) throw "Código debe tener 3 caracteres";

      return true;
   } catch (error) {
      toast.error(error, { duration: 3000 });
      return false;
   }
};

const getPuntoExpedicion = async () => {
   try {
      const puntosExpedicionListTemp = await get(
         `punto-expedicion?contributor=${props.contributor._id}`,
      );

      if (puntosExpedicionListTemp.length > 0) {
         puntoExpedicionList.value = puntosExpedicionListTemp;
      }
   } catch (error) {
      console.error(error);
   }
};

onMounted(() => {
   getPuntoExpedicion();
});
</script>
