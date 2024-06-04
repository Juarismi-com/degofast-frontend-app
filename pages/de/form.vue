<template>
   <div>
      <h2 class="my-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Facturación Electrónica
      </h2>
      <div>
         <form @submit.prevent="submitForm">
            <div class="text-xl pb-4">
               <h3>Documento Electrónico</h3>
               <hr>
            </div>
            <div class="grid grid-cols-3 gap-4 pb-4">
               <div>
                  <label for="establecimiento">Establecimiento:</label>
                  <select 
                     id="establecimiento"
                     v-model="formData.establecimiento"
                     :class="INPUT_CLASS.basic">
                     <option 
                        v-for="(establecimiento,index) in contributor.establecimientos" :key="index"
                        :value="establecimiento.codigo"
                        >
                        {{ 
                           establecimiento.denominacion + " - " + establecimiento.codigo
                        }}
                     </option>
                  </select>
               </div>
               <div>
                  <label for="numero">Número de Factura:</label>
                  <input
                     type="text"
                     v-model="formData.numero"
                     id="numero"
                     readonly
                     :class="INPUT_CLASS.basic"
                  />
               </div>
               <div>
                  <label for="fecha">Fecha:</label>
                  <input
                     type="datetime-local"
                     v-model="formData.fecha"
                     id="fecha"
                     :class="INPUT_CLASS.basic"
                  />
               </div>
               <div>
                  <label for="tipoEmision">Tipo de Emisión:</label>
                  <select v-model="formData.tipoEmision" id="tipoEmision"
                     :class="INPUT_CLASS.basic">
                     <option value="1">Normal</option>
                     <option value="2">Contingencia</option>
                  </select>
               </div>
               <div>
                  <label for="tipoTransaccion">Tipo de Transacción:</label>
                  <select
                     v-model="formData.tipoTransaccion"
                     id="tipoTransaccion"
                     :class="INPUT_CLASS.basic"
                  >
                     <option value="1">Venta de mercadería</option>
                     <option value="2">Prestación de servicios</option>
                     <option value="3">
                        Mixto (Venta de mercadería y servicios)
                     </option>
                     <option value="4">Venta de activo fijo</option>
                     <option value="5">Venta de divisas</option>
                     <option value="6">Compra de divisas</option>
                     <option value="7">Promoción o entrega de muestras</option>
                     <option value="8">Donación</option>
                     <option value="9">Anticipo</option>
                     <option value="10">Compra de Productos</option>
                     <option value="11">Venta de Crédito fiscal</option>
                     <option value="12">Compra de Crédito fiscal</option>
                     <option value="13">
                        Muestras médicas (Art. 3 RG 24/2014)
                     </option>
                  </select>
               </div>
               <div>
                  <label for="tipoImpuesto">Tipo de Impuesto:</label>
                  <select v-model="formData.tipoImpuesto" id="tipoImpuesto"
                     :class="INPUT_CLASS.basic">
                     <option value="1">IVA</option>
                     <option value="2">ISC</option>
                     <option value="3">Renta</option>
                     <option value="4">Ninguno</option>
                     <option value="5">IVA - Renta</option>
                  </select>
               </div>
               <div>
                  <label for="moneda" >Moneda:</label>
                  <select v-model="formData.moneda" id="moneda" :class="INPUT_CLASS.basic">
                     <option value="PYG">PYG</option>
                  </select>
               </div>
               <div>
                  <label for="presencia">¿Factura presente?</label>
                  <select v-model="formData.factura.presencia" id="presencia"
                     :class="INPUT_CLASS.basic">
                     <option value="1">Sí</option>
                     <option value="0">No</option>
                  </select>
               </div>
                     
               <div>
                  <label for="descripcion">Descripción (Opcional):</label>
                  <input
                     v-model="formData.descripcion"
                     id="descripcion"
                     :class="INPUT_CLASS.basic"
                  ></input>
               </div>
            </div>


            <div class="text-xl pb-4">
               <h3>Cliente</h3>
               <hr>
            </div>
            <div class="grid grid-cols-3 gap-4 pb-4">
               <div>
                  <label for="ciCliente">RUC:</label>
                  <input
                     type="text"
                     v-model="formData.cliente.ruc"
                     id="ciCliente"
                     :class="INPUT_CLASS.basic"
                  />
               </div>
               <div>
                  <label for="nombreCliente">Nombre del Cliente:</label>
                  <input
                     type="text"
                     v-model="formData.cliente.razonSocial"
                     id="nombreCliente"
                     :class="INPUT_CLASS.basic"
                  />
               </div>
            </div>


            <div class="text-xl pb-4">
               <h3>Producto / Servicio</h3>
               <hr>
            </div>




            
               <!--div>
                  <label for="punto">Punto:</label>
                  <input
                     type="text"
                     v-model="formData.punto"
                     id="punto"
                     readonly
                     :class="INPUT_CLASS.basic"
                  />
               </div-->
         
         

         <!-- Detalle -->
         <div class="py-4">
            <div class="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-8">
               <div>
                  <label
                     for="codigo"
                     class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                     >Código:</label
                  >
                  <input
                     type="text"
                     :class="INPUT_CLASS.basic"
                     id="codigo"
                     v-model="item.codigo"
                  />
               </div>
               <div>
                  <label
                     for="descripcion"
                     class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                     >Descripción:</label
                  >
                  <input
                     type="text"
                     :class="INPUT_CLASS.basic"
                     id="descripcion"
                     v-model="item.descripcion"
                  />
               </div>
               <div>
                  <label
                     for="precio"
                     class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                     >Precio:</label
                  >
                  <input
                     type="text"
                     :class="INPUT_CLASS.basic"
                     id="precio"
                     v-model="item.precioUnitario"
                  />
               </div>
               <div>
                  <label
                     for="cantidad"
                     class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                     >Cantidad:</label
                  >
                  <input
                     type="text"
                     :class="INPUT_CLASS.basic"
                     id="cantidad"
                     v-model="item.cantidad"
                  />
               </div>
               <div>
                  <label
                     for="totalUnitario"
                     class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                     >Total Unitario:</label
                  >
                  <input
                     type="text"
                     id="totalUnitario"
                     :class="INPUT_CLASS.basic"
                     v-model="item.totalUnitario"
                  />
               </div>
               <div>
                  <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      @click="agregarItem">Agregar Detalle</button>

               </div>
               

            </div>

            <div>
               <!-- Tabla -->
               <div class="w-full mt-8">
                  <div class="overflow-x-auto">
                     <table class="w-full">
                        <thead>
                           <tr class="bg-gray-50 dark:bg-gray-800">
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
                                 Total Unitario
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr
                              v-for="(item, index) in formData.items"
                              :key="index"
                              class="hover:bg-gray-100 dark:hover:bg-gray-700 bg-white"
                           >
                              <td class="px-4 py-2 whitespace-nowrap">
                                 {{ item.codigo }}
                              </td>
                              <td class="px-4 py-2 whitespace-nowrap">
                                 {{ item.descripcion }}
                              </td>
                              <td class="px-4 py-2 whitespace-nowrap">
                                 {{ item.precioUnitario }}
                              </td>
                              <td class="px-4 py-2 whitespace-nowrap">
                                 {{ item.cantidad }}
                              </td>
                              <td class="px-4 py-2 whitespace-nowrap">
                                 {{ item.totalUnitario }}
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

               </div>
            </div>
         </div>

         <button type="submit" class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Enviar</button>

         </form>

         <Alert 
            :show="showAlert"
            :message="alertMessage"
            @close="showAlert = false"
         />
        </div>
   </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores";
import { INPUT_CLASS } from  "../../config"
import { storeToRefs } from "pinia";
import { useStorage } from "@vueuse/core";

const showAlert = ref(false);
let alertMessage = '';

definePageMeta({
   middleware: ["auth"],
});

const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);


const formData = ref({
   tipoDocumento: "1",
   establecimiento: "001",
   codigoSeguridadAleatorio: "194331023",
   punto: "001",
   numero: "000001",
   descripcion: "",
   observacion: "",
   fecha: (new Date()).toISOString(),
   tipoEmision: 1,
   tipoTransaccion: 1,
   tipoImpuesto: 1,
   moneda: "PYG",
   factura: {
      presencia: 1,
   },
   condicion: {
      tipo: 1,
      entregas: [
         {
            tipo: 1,
            moneda: "PYG",
            monto: "27520",
         },
      ],
   },
   cliente: {
      contribuyente: true,
      razonSocial: "RAZON SOCIAL DE PRUEBA",
      ruc:"5310689-0",
      tipoContribuyente:1,
      tipoOperacion: 2,
      documentoTipo: 5,
      documentoNumero: "0",
      pais: "PRY"
   },
   items: [],
});

const item = ref({
   codigo: "137871",
   descripcion: "YRENE caja x 21 comp.rec.",
   observacion: "",
   unidadMedida: "77",
   cantidad: "1",
   precioUnitario: "1",
   cambio: null,
   ivaTipo: "1",
   ivaBase: 100,
   iva: "5",
   lote: null,
   vencimiento: null,
   numeroSerie: "",
   numeroPedido: "",
   numeroSeguimiento: ""
});

const agregarItem = () => {
   if (
      item.value.codigo &&
      item.value.descripcion &&
      item.value.precioUnitario &&
      item.value.cantidad &&
      item.value.totalUnitario
   ) {
      formData.value.items.push({ ...item.value });
      item.value = {
         codigo: "",
         descripcion: "",
         precioUnitario: "",
         cantidad: "",
         totalUnitario: "",
      };
   } else {
      alert("Por favor, complete todos los campos del nuevo ítem.");
   }
};

const authToken = useStorage("authToken");

const submitForm = async () => {

   try {  
      /* Adapto manualmente para el formato de fecha */
      formData.value.fecha = formData.value.fecha.slice(0, -5); 
      console.log(formData.value.fecha);  

      /* Impresiones de prueba */
      console.log("Token: " +JSON.stringify(authToken.value));      
      console.log("*");
      console.log(JSON.stringify([formData.value]));

      const response = await saveLotes([formData.value], authToken.value);   
      
      if (response) {
         console.log("Response:", response["ns2:rResEnviLoteDe"]["ns2:dMsgRes"]);
         alertMessage = response["ns2:rResEnviLoteDe"]["ns2:dMsgRes"];
         showAlert.value = true;
      }

   } catch (error) {
      console.error("Error submitting form:", error);
   }
};
</script>
