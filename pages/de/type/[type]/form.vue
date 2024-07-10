<template>
   <div>
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         {{ title }}
      </h2>
      <div>

         <form @submit.prevent="submitForm">
            <div class="text-xl pb-4">
               <h3>Documento Electrónico {{ cdc }}</h3>
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
                  <label for="numero">Número de Factura (solo test):</label>
                  <!--input
                     type="text"
                     v-model="formData.establecimiento[1].nroActual"
                     id="numero"
                     :class="INPUT_CLASS.basic"
                  /-->

                  <!-- TODO: INVOCAR POR PUNTO DE EXPEDICION -->
                   <br/>
                  {{  formData?.numero  }}
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
                     for="iva"
                     class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                     >IVA:</label
                  >
                  <select v-model="item.iva" id="iva"
                     :class="INPUT_CLASS.basic">
                     <option value="0">0</option>
                     <option value="5">5</option>
                     <option value="10">10</option>
                  </select>
               </div>
               <!--div>
                  <label
                     for="totalUnitario"
                     class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                     >Total Unitario:</label
                  >
                  <input
                     type="text"
                     id="totalUnitario"
                     :class="INPUT_CLASS.basic + ' text-right'"
                     v-model="item.totalUnitario"
                  />
               </div-->
               <div>
                  <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      @click="agregarItem">Agregar</button>

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
                                 class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right"
                              >
                                 Código
                              </th>
                              <th
                                 class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                 Descripción
                              </th>
                              <th
                                 class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right"
                              >
                                 Precio Unitario
                              </th>
                              <th
                                 class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right"
                              >
                                 Cantidad
                              </th>
                              <th
                                 class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right"
                              >
                                 IVA
                              </th>
                              <th
                                 class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right"
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
                              <td class="px-4 py-2 whitespace-nowrap text-right">
                                 {{ item.codigo }}
                              </td>
                              <td class="px-4 py-2 whitespace-nowrap">
                                 {{ item.descripcion }}
                              </td>
                              <td class="px-4 py-2 whitespace-nowrap text-right">
                                 {{ item.precioUnitario }}
                              </td>
                              <td class="px-4 py-2 whitespace-nowrap text-right">
                                 {{ item.cantidad }}
                              </td>
                              <td class="px-4 py-2 whitespace-nowrap text-right">
                                 {{ item.iva }}%
                              </td>
                              <td class="px-4 py-2 whitespace-nowrap text-right">
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
import { useAuthStore } from "../../../../stores";
import { INPUT_CLASS, TIPO_DOCUMENT_LIST, useConfig } from  "../../../../config"
import { storeToRefs } from "pinia";
import { useStorage } from "@vueuse/core";

const showAlert = ref(false);
let alertMessage = '';
const authToken = useStorage("authToken");


// datos relacionados con eltipo de documento electronic
// @todo move in a helper
const route = useRoute();
const deType = ref(route.params.type);
const routeList = ref(TIPO_DOCUMENT_LIST);
const routeSelected = ref(
   routeList.value.find((item) => item.tipoDocumento == route.params.type),
);
const title = ref(routeSelected.value.title);

const { APP_ENV } = useConfig();

definePageMeta({
   middleware: ["auth"],
});

const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);

const deDefault = {
   tipoDocumento: "1",
   establecimiento: "001",
   codigoSeguridadAleatorio: "",
   punto: "001",
   numero: contributor.value.establecimientos[0]?.puntoExpedicion[0]?.nroActual,
   descripcion: "",
   observacion: "",
   fecha: "",
   tipoEmision: 1,
   tipoTransaccion: 2,
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
            monto: 100,
         },
      ],
   },
   cliente: {
      contribuyente: true,
      razonSocial: "",
      ruc:"",
      tipoContribuyente:1,
      tipoOperacion: 2,
      documentoTipo: 5,
      documentoNumero: "0",
      pais: "PRY"
   },
   items: [],
}

const formData = ref(deDefault);

const item = ref({
   codigo: "",
   descripcion: "",
   observacion: "",
   
   // @todo defined in comerce
   unidadMedida: "77",
   cantidad: "",
   precioUnitario: "",
   cambio: null,
   ivaTipo: "1",
   ivaBase: 100,
   iva: "10",
   lote: null,
   vencimiento: null,
   numeroSerie: "",
   numeroPedido: "",
   numeroSeguimiento: "",
   precioPorCantidad: ""
});


const cdc = ref("");

const agregarItem = () => {
   if (
      item.value.codigo &&
      item.value.descripcion &&
      item.value.precioUnitario &&
      item.value.cantidad
   ) {
      item.value.totalUnitario = item.value.precioUnitario * item.value.cantidad
      formData.value.items.push({ ...item.value });
      item.value = {
         codigo: "",
         descripcion: "",
         precioUnitario: "",
         cantidad: "",
         totalUnitario: "",
         iva: "10"
      };
   } else {
      alert("Por favor, complete todos los campos del nuevo ítem.");
   }
};

/**
 * @todo move this in a helper
 */
const getRandomNumber = () => {
   const min = 100000000;
   const max = 999999999;

   const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
   return randomNumber;
}

/**
 * @todo validate number of invoice, i.e 000001
 * @param numero 
 */
const getInvoiceNumber = (numero) => {
   let val = numero.toString();
   const ceroLength = 7 - val.length 

   for (let i = 0; i < ceroLength; i++) {
      val ='0' + val;
   }
   
   return val;
}


const submitForm = async () => {

   try {  
      /* Adapto manualmente para el formato de fecha */
      /**
       * todo 
       */

      if (confirm("Desea agregar el de?")){
         //formData.value.fecha = "2024-06-05T00:00:00"; 
                                 
         
         console.log(formData.value.fecha);
         formData.value.fecha += ':00'
         formData.value.tipoDocumento = deType.value
         formData.value.codigoSeguridadAleatorio = getRandomNumber();
   
         //const response = await saveLotes([formData.value], authToken.value);
         let response;   

         let payload = {
            ...formData.value,
            fecha: formData.value.fecha,
            numero: getInvoiceNumber(formData.value.numero)
         }

         if (APP_ENV == "prod"){
            response = await saveLotes([formData.value]) 
         } else {
            response = await saveDE(payload, authToken.value);
         }
         
         
         if (response) {
            formData.value.numero = formData.value.numero++;
            cdc.value = response['sifenResponse']['ns2:Id']
            showAlert.value = true;
            formData.value = deDefault;
            alert("Enviado correctamente");
         }
      }
   } catch (error) {
      console.error("Error submitting form:", error);
      alert(error?.message);
   }
};
</script>
