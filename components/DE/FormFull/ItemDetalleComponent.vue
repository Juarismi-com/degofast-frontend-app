<template>
   <div>
      <div class="text-xl pb-4">
         <h3>Producto / Servicio</h3>
      </div>

      <!-- Detalle -->
      <div class="pb-4">
         <div class="grid grid-cols-3 gap-4 pb-1">
            <div>
               <label for="codigoServicio" class="mr-2">Codigo:</label>
               <input
                  type="text"
                  id="codigoServicio"
                  v-model="codigo"
                  :class="INPUT_CLASS.sm"
                  class="mr-2"
               />
            </div>
            <div>
               <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 me-2 mb-2 focus:outline-none"
                  @click="searchCodigoServicio"
               >
                  Buscar
               </button>
            </div>
         </div>
      </div>
      <div class="py-4">
         <div class="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-8">
            <div>
               <label
                  for="codigo"
                  class="my-4 text-l font-semibold text-gray-700"
                  >Código:</label
               >
               <input
                  type="text"
                  :class="INPUT_CLASS.sm"
                  id="codigo"
                  v-model="item.codigo"
               />
            </div>
            <div>
               <label
                  for="descripcion"
                  class="my-4 text-l font-semibold text-gray-700"
                  >Descripción:</label
               >
               <input
                  type="text"
                  :class="INPUT_CLASS.sm"
                  id="descripcion"
                  v-model="item.descripcion"
               />
            </div>
            <div>
               <label
                  for="precio"
                  class="my-4 text-l font-semibold text-gray-700"
                  >Precio:</label
               >
               <input
                  type="number"
                  :class="INPUT_CLASS.sm"
                  id="precio"
                  v-model="item.precioUnitario"
               />
            </div>
            <div>
               <label
                  for="cantidad"
                  class="my-4 text-l font-semibold text-gray-700"
                  >Cantidad:</label
               >
               <input
                  type="number"
                  :class="INPUT_CLASS.sm"
                  id="cantidad"
                  v-model="item.cantidad"
               />
            </div>
            <div>
               <label
                  for="iva"
                  class="my-4 text-l font-semibold text-gray-700"
                  >IVA:</label
               >
               <select v-model="item.iva" id="iva" :class="INPUT_CLASS.sm">
                  <option value="0">0</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
               </select>
            </div>
            <!--div>
                  <label
                     for="totalUnitario"
                     class="my-4 text-l font-semibold text-gray-700"
                     >Total Unitario:</label
                  >
                  <input
                     type="text"
                     id="totalUnitario"
                     :class="INPUT_CLASS.sm + ' text-right'"
                     v-model="item.totalUnitario"
                  />
               </div-->
            <div>
               <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 me-2 mb-2 focus:outline-none"
                  @click="agregarItem"
               >
                  Agregar
               </button>
            </div>
         </div>

         <div>
            <!-- Tabla -->
            <div class="w-full mt-8">
               <div class="overflow-x-auto">
                  <table class="w-full">
                     <thead>
                        <tr class="bg-gray-50">
                           <th
                              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Código
                           </th>
                           <th
                              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Descripción
                           </th>
                           <th
                              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Precio Unitario
                           </th>
                           <th
                              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Cantidad
                           </th>
                           <th
                              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              IVA
                           </th>
                           <th
                              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Total Unitario
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr
                           v-for="(item, index) in formData.items"
                           :key="index"
                           class="hover:bg-gray-100 bg-white"
                        >
                           <td class="px-4 py-2 whitespace-nowrap text-right">
                              {{ item.codigo }}
                           </td>
                           <td class="px-4 py-2 whitespace-nowrap">
                              <input
                                 type="text"
                                 v-model="item.descripcion"
                                 :class="INPUT_CLASS.sm"
                              />
                           </td>
                           <td class="px-4 py-2 whitespace-nowrap text-right">
                              {{ formatNumber(item.precioUnitario) }}
                           </td>
                           <td class="px-4 py-2 whitespace-nowrap text-right">
                              {{ formatNumber(item.cantidad) }}
                           </td>
                           <td class="px-4 py-2 whitespace-nowrap text-right">
                              {{ item.iva }}%
                           </td>
                           <td class="px-4 py-2 whitespace-nowrap text-right">
                              {{ item.totalUnitario }}
                           </td>
                           <td class="px-4 py-2 whitespace-nowrap text-right">
                              <button
                                 type="button"
                                 @click="eliminarItem(index)"
                                 class="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-1.5 focus:outline-none"
                              >
                                 Eliminar
                              </button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { deItemData } from "~/config/de";
import { INPUT_CLASS } from "../../../config";
import { getServicesByContributor } from "~/services/services.service";
import { formatNumber } from "~/helpers/number.helper";
import { useToast } from "vue-toast-notification";

const props = defineProps({
   formData: {
      type: Object,
      default: () => ({}),
   },
   contributor: {
      type: Object,
      default: () => ({}),
   },
});

const { formData, contributor } = toRefs(props);
const toast = useToast();

// Relaciona a items/servicios
const item = ref({ ...deItemData });
const serviceList = ref([]);
const codigo = ref("");

/**
 * Actualiza el listado de servicios, para su busqueda local (en el navegador)
 */
const setServicesList = async () => {
   serviceList.value = await getServicesByContributor(contributor.value._id);
};

/**
 * Busca el codigo de un servicio y lo asigna como item, (no lo agrega)
 */
const searchCodigoServicio = () => {
   const servicio = serviceList.value.find((servicio) => {
      return servicio.codigo == codigo.value;
   });

   if (!servicio) {
      toast.error("No se encontró ningún servicio con ese código", {
         duration: 3000,
      });
      return;
   }

   item.value = {
      ...item.value,
      codigo: servicio.codigo,
      descripcion: servicio.nombre,
      precioUnitario: servicio?.precioUnitario || "",
      cantidad: 1,
      cambio: formData.value.cambio || 0,
   };
};

const agregarItem = () => {
   if (
      item.value.codigo &&
      item.value.descripcion &&
      item.value.precioUnitario &&
      item.value.cantidad
   ) {
      const total = Math.floor(item.value.precioUnitario * item.value.cantidad);

      item.value.totalUnitario = formatNumber(total);

      // Si el iva es exento debe actualiza el ivatipo
      if (item.value.iva == 0) {
         item.value.ivaTipo = "3";
         item.value.ivaBase = 0;
      } else {
         item.value.ivaTipo = "1";
         item.value.ivaBase = 100;
      }

      formData.value.items.push({ ...item.value });
      item.value = {
         ...deItemData,
      };
   } else {
      toast.error("Por favor, complete todos los campos del nuevo ítem.", {
         duration: 3000,
      });
   }
};

const eliminarItem = (index) => {
   formData.value.items.splice(index, 1);
};

onMounted(() => {
   setServicesList();
});
</script>
