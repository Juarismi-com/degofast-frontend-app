<template>
   <div>
      <h2
         class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200 flex justify-center items-center"
      >
         Detalles de la Factura
      </h2>
      <div v-if="detalle" class="grid grid-cols-1 md:grid-cols-4 gap-2">
         <!-- Sección 1 -->
         <div
            class="md:col-span-3 border border-gray-300 p-4 shadow-md rounded"
         >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div class="col-span-1 md:col-span-3 grid grid-cols-4">
                  <div
                     class="col-span-4 md:col-span-1 flex items-center justify-center md:justify-start"
                  >
                     <img
                        src="/public/images/TRIANGULOSMesa-de-trabajo-2.png"
                        alt="Membrete"
                        class="w-20 h-20 object-contain"
                     />
                  </div>
                  <div
                     class="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-2 gap-4"
                  >
                     <div
                        class="col-span-2 md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-1"
                     >
                        <div>
                           <label class="font-bold"
                              >Kude de Factura electrónica</label
                           >
                        </div>
                     </div>
                     <div
                        class="col-span-2 md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-1"
                     >
                        <div>
                           <label class="font-bold">RUC: </label>
                           <span>80000519-8</span>
                        </div>
                        <div>
                           <label class="font-bold">Timbrado N°: </label>
                           <span>12557904</span>
                        </div>
                        <div>
                           <label class="font-bold">Inicio de vigencia: </label>
                           <span>12/11/2019</span>
                        </div>
                        <div>
                           <label class="font-bold"
                              >Factura electrónica N°:
                           </label>
                           <span>{{ detalle.numero }}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- Sección 2 -->
         <div
            class="md:col-span-3 border border-gray-300 p-4 shadow-md rounded"
         >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div class="col-span-1 md:col-span-3 grid grid-cols-4">
                  <div>
                     <label class="font-bold">Nombre o Razón Social: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.razonSocial }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Fecha y Hora de emisión: </label>
                  </div>
                  <div>
                     <span>{{ detalle.fecha }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Documento de identidad: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.ruc }}</span>
                  </div>
                  <div>
                     <label class="font-bold">Condicion de Venta: </label>
                  </div>
                  <div>
                     <span>{{ detalle.condicion.tipo }}</span>
                  </div>

                  <div>
                     <label class="font-bold">Contrato: </label>
                  </div>
                  <div>
                     <span></span>
                  </div>

                  <div>
                     <label class="font-bold">Moneda: </label>
                  </div>
                  <div>
                     <span>{{ detalle.moneda }}</span>
                  </div>

                  <div>
                     <label class="font-bold">Dirección: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.direccion }}</span>
                  </div>

                  <div>
                     <label class="font-bold">Tipo de Operación: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.tipoOperacion }}</span>
                  </div>

                  <div>
                     <label class="font-bold">Correo: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.email }}</span>
                  </div>

                  <div>
                     <label class="font-bold">Teléfono: </label>
                  </div>
                  <div>
                     <span>{{ detalle.cliente.telefono }}</span>
                  </div>
               </div>
            </div>
         </div>

         <!-- Tabla -->
         <div
            class="md:col-span-3 border border-gray-300 p-4 shadow-md rounded overflow-x-auto"
         >
            <table class="min-w-full divide-y divide-gray-200">
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
                     <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Unidad de Medida
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Cantidad
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        Precio Unitario
                     </th>
                     <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     >
                        IVA
                     </th>
                  </tr>
               </thead>
               <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in detalle.items" :key="item._id">
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
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.unidadMedida }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.cantidad }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                           {{ item.precioUnitario }}
                        </div>
                     </td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ item.iva }}</div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>

         <!-- Sección 3 -->
         <div
            class="md:col-span-3 border border-gray-300 p-4 shadow-md rounded"
         >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div class="col-span-1 md:col-span-3 grid grid-cols-4">
                  <div>
                     <label class="font-bold">Subtotal: </label>
                  </div>
                  <div>
                     <span>1700000</span>
                  </div>
                  <div>
                     <label class="font-bold">Total de operación: </label>
                  </div>
                  <div>
                     <span>1836000</span>
                  </div>
                  <div>
                     <label class="font-bold">Tipo de IVA: </label>
                  </div>
                  <div>
                     <span>1</span>
                  </div>

                  <div>
                     <label class="font-bold">Total de IVA: </label>
                  </div>
                  <div>
                     <span>250000</span>
                  </div>
               </div>
            </div>
         </div>

         <!-- Sección 4 -->
         <div
            class="md:col-span-3 border border-gray-300 p-4 shadow-md rounded"
         >
            <div
               class="md:col-span-3 text-center border border-gray-300 p-4 shadow-md rounded"
            >
               <label class="text-lg font-bold">CDC: </label>
               <label class="text-lg"
                  >0180 0005 1980 0100 2800 0915 1202 0102 2110 3069 8874</label
               >
            </div>
         </div>
      </div>

      <div v-else>
         <p>Cargando detalles...</p>
      </div>
   </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDesById } from "../../../utils/index";
import { useRoute } from "vue-router";

const activeTab = ref(0);
const detalle = ref(null);

const route = useRoute();

const fetchDetalle = async () => {
   try {
      const id = route.params._id;
      const response = await getDesById(id);
      detalle.value = response;
   } catch (error) {
      console.error("Error al obtener los detalles de la factura:", error);
   }
};

onMounted(() => {
   fetchDetalle();
});
</script>

<style>
.col-span-2-5 {
   grid-column: span 2.5 / span 2.5;
}
</style>
