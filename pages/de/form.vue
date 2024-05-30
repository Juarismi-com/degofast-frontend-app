<template>
   <div>
      <h2 class="my-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Facturación Electrónica
      </h2>
      <div>
         <form @submit.prevent="submitForm">
            <div class="grid grid-cols-3 gap-4">
               <div>
                  <label for="establecimiento">Establecimiento:</label>
                  <input
                     type="text"
                     v-model="formData.establecimiento"
                     id="establecimiento"
                     :class="INPUT_CLASS.basic"
                  />
               </div>
               <div>
                  <label for="codigoSeguridadAleatorio"
                     >Código de Seguridad Aleatorio:</label
                  >
                  <input
                     type="text"
                     v-model="formData.codigoSeguridadAleatorio"
                     id="codigoSeguridadAleatorio"
                     :class="INPUT_CLASS.basic"
                  />
               </div>
               <div>
                  <label for="punto">Punto:</label>
                  <input
                     type="text"
                     v-model="formData.punto"
                     id="punto"
                     readonly
                     :class="INPUT_CLASS.basic"
                  />
               </div>
               <div>
                  <label for="numero">Número de Documento:</label>
                  <input
                     type="text"
                     v-model="formData.numero"
                     id="numero"
                     readonly
                     :class="INPUT_CLASS.basic"
                  />
               </div>
               <div>
                  <label for="descripcion">Descripción:</label>
                  <textarea
                     v-model="formData.descripcion"
                     id="descripcion"
                     :class="INPUT_CLASS.basic"
                  ></textarea>
               </div>
               <div>
                  <label for="observacion">Observación:</label>
                  <textarea
                     v-model="formData.observacion"
                     id="observacion"
                     :class="INPUT_CLASS.basic"
                  ></textarea>
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
                     v-model="formData.cliente.nombre"
                     id="nombreCliente"
                     :class="INPUT_CLASS.basic"
                  />
               </div>

               <div>
                  <div>
                     <label
                        for="observacion"
                        class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                        >Observación:</label
                     >
                     <textarea
                        v-model="formData.observacion"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="observacion"
                     ></textarea>
                  </div>

                  <div>
                     <label
                        for="fecha"
                        class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                        >Fecha:</label
                     >
                     <input
                        type="datetime-local"
                        v-model="formData.fecha"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fecha"
                     />
                  </div>
                  <div>
                     <label
                        for="tipoEmision"
                        class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                        >Tipo de Emisión:</label
                     >
                     <select
                        v-model="formData.tipoEmision"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="tipoEmision"
                     >
                        <option value="1">Normal</option>
                        <option value="2">Contingencia</option>
                     </select>
                  </div>
                  <div>
                     <label
                        for="tipoTransaccion"
                        class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                        >Tipo de Transacción:</label
                     >
                     <select
                        v-model="formData.tipoTransaccion"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="tipoTransaccion"
                     >
                        <option value="1">Venta de mercadería</option>
                        <option value="2">Prestación de servicios</option>
                        <option value="3">
                           Mixto (Venta de mercadería y servicios)
                        </option>
                        <option value="4">Venta de activo fijo</option>
                        <option value="5">Venta de divisas</option>
                        <option value="6">Compra de divisas</option>
                        <option value="7">
                           Promoción o entrega de muestras
                        </option>
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
                     <label
                        for="tipoImpuesto"
                        class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                        >Tipo de Impuesto:</label
                     >
                     <select
                        v-model="formData.tipoImpuesto"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="tipoImpuesto"
                     >
                        <option value="1">IVA</option>
                        <option value="2">ISC</option>
                        <option value="3">Renta</option>
                        <option value="4">Ninguno</option>
                        <option value="5">IVA - Renta</option>
                     </select>
                  </div>
               </div>
               <div>
                  <div>
                     <label
                        for="moneda"
                        class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                        >Moneda:</label
                     >
                     <select
                        v-model="formData.moneda"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="moneda"
                     >
                        <option value="PYG">PYG</option>
                     </select>
                  </div>
                  <div>
                     <label
                        for="presencia"
                        class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                        >¿Factura presente?</label
                     >
                     <select
                        v-model="formData.factura.presencia"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="presencia"
                     >
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                     </select>
                  </div>

                  <div>
                     <label
                        for="ciCliente"
                        class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                        >RUC:</label
                     >
                     <input
                        type="text"
                        v-model="formData.cliente.ruc"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="ciCliente"
                     />
                  </div>
                  <div>
                     <label
                        for="nombreCliente"
                        class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                        >Nombre del Cliente:</label
                     >
                     <input
                        type="text"
                        v-model="formData.cliente.nombre"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nombreCliente"
                     />
                  </div>
               </div>
            </div>
         </form>
         

         <!-- Detalle -->
         <div class="border rounded-lg p-4">
            <h2
               class="text-lg font-semibold mb-4 text-gray-700 dark:text-white"
            >
               Detalle
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-x-6 gap-y-8">
               <div>
                  <label
                     for="codigo"
                     class="my-4 text-l font-semibold text-gray-700 dark:text-white"
                     >Código:</label
                  >
                  <input
                     type="text"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     v-model="item.totalUnitario"
                  />
               </div>
               <button type="button" @click="agregarItem">Agregar Ítem</button>
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
         <div class="col-span-3">
            <label for="descripcion">Descripción:</label>
            <input type="text" id="descripcion" 
               v-model="item.descripcion" 
               :class="INPUT_CLASS.basic"/>
         </div>
         <div class="col-span-2">
            <label for="precio">Precio:</label>
            <input type="text" id="precio" v-model="item.precioUnitario" />
         </div>
         <div class="col-span-2">
            <label for="cantidad">Cantidad:</label>
            <input type="text" id="cantidad" v-model="item.cantidad" />
         </div>
         <div class="col-span-2">
            <label for="totalUnitario">Total Unitario:</label>
            <input
               type="text"
               id="totalUnitario"
               v-model="item.totalUnitario"
            />
         </div>
         <!-- Contenedor de la tabla -->
         <div>
            <table>
               <!-- Encabezados de la tabla -->
               <thead>
                  <tr>
                     <th class="px-4 py-2">Código</th>
                     <th class="px-4 py-2">Descripción</th>
                     <th class="px-4 py-2">Precio Unitario</th>
                     <th class="px-4 py-2">Cantidad</th>
                     <th class="px-4 py-2">Total Unitario</th>
                  </tr>
               </thead>
               <!-- Cuerpo de la tabla -->
               <tbody>
                  <tr v-for="(item, index) in formData.items" :key="index">
                     <td class="border px-4 py-2">{{ item.codigo }}</td>
                     <td class="border px-4 py-2">{{ item.descripcion }}</td>
                     <td class="border px-4 py-2">{{ item.precioUnitario }}</td>
                     <td class="border px-4 py-2">{{ item.cantidad }}</td>
                     <td class="border px-4 py-2">{{ item.totalUnitario }}</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <!-- Botón para agregar un nuevo ítem -->
         <button type="button" @click="agregarItem">Agregar Ítem</button>
      </div>
   </div>
</template>

<script setup>
import { ref } from "vue";
//import { authToken } from "../../stores/auth.store";
import { saveDE } from "../../utils";

import { INPUT_CLASS } from  "../../config"

const formData = ref({
   tipoDocumento: "1",
   establecimiento: "2",
   codigoSeguridadAleatorio: "3",
   punto: "4",
   numero: "5",
   descripcion: "6",
   observacion: "7",
   fecha: "8",
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
      ruc: "123",
      nombre: "Clara",
      razonSocial: "HUGO CABRAL",
      nombreFantasia: "HUGO CABRAL",
      tipoOperacion: "1",
      direccion: null,
      numeroCasa: "0",
      departamento: 1,
      departamentoDescripcion: "CAPITAL",
      distrito: 1,
      distritoDescripcion: "ASUNCION",
      ciudad: 1,
      pais: "PRY",
      paisDescripcion: "Paraguay",
      tipoContribuyente: 1,
      documentoTipo: 1,
      documentoNumero: "",
      telefono: "",
      celular: "",
      email: "",
      codigo: "",
   },
   items: [],
});

const item = ref({
   codigo: "1",
   descripcion: "-",
   precioUnitario: "5",
   cantidad: "2",
   totalUnitario: "10",
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

//const authStore = useAuthStore();
//const { authToken } = storeToRefs(authStore);

const submitForm = async () => {
   try {
      //const response = await saveDE(data, authToken.value);
      //console.log("Response:", response);
   } catch (error) {
      console.error("Error submitting form:", error);
   }
};
</script>
