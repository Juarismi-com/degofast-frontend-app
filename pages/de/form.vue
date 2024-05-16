<template>
   <div>
      <h2 class="my-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Facturación Electrónica
      </h2>
      <div class="container mx-auto">
         <form @submit.prevent="submitForm">
            <div class="my-2 grid grid-cols-3 gap-4">
               <div>
                  <label
                     for="establecimiento"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >Establecimiento:</label
                  >
                  <input
                     type="text"
                     v-model="formData.establecimiento"
                     id="establecimiento"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
               </div>
               <div>
                  <label
                     for="codigoSeguridadAleatorio"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >Código de Seguridad Aleatorio:</label
                  >
                  <input
                     type="text"
                     v-model="formData.codigoSeguridadAleatorio"
                     id="codigoSeguridadAleatorio"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
               </div>
               <div>
                  <label
                     for="punto"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >Punto:</label
                  >
                  <input
                     type="text"
                     v-model="formData.punto"
                     id="punto"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                     readonly
                  />
               </div>
               <div>
                  <label
                     for="numero"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >Número:</label
                  >
                  <input
                     type="text"
                     v-model="formData.numero"
                     id="numero"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                     readonly
                  />
               </div>
               <div>
                  <label
                     for="descripcion"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >Descripción:</label
                  >
                  <textarea
                     v-model="formData.descripcion"
                     id="descripcion"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  ></textarea>
               </div>
               <div>
                  <label
                     for="observacion"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >Observación:</label
                  >
                  <textarea
                     v-model="formData.observacion"
                     id="observacion"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  ></textarea>
               </div>
               <div>
                  <label
                     for="fecha"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >Fecha:</label
                  >
                  <input
                     type="datetime-local"
                     v-model="formData.fecha"
                     id="fecha"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
               </div>
               <div>
                  <label
                     for="tipoEmision"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >Tipo de Emisión:</label
                  >
                  <select
                     v-model="formData.tipoEmision"
                     id="tipoEmision"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  >
                     <option value="1">Normal</option>
                     <option value="2">Contingencia</option>
                  </select>
               </div>
               <div>
                  <label
                     for="tipoTransaccion"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >Tipo de Transacción:</label
                  >
                  <select
                     v-model="formData.tipoTransaccion"
                     id="tipoTransaccion"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
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
                  <label
                     for="tipoImpuesto"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >Tipo de Impuesto:</label
                  >
                  <select
                     v-model="formData.tipoImpuesto"
                     id="tipoImpuesto"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  >
                     <option value="1">IVA</option>
                     <option value="2">ISC</option>
                     <option value="3">Renta</option>
                     <option value="4">Ninguno</option>
                     <option value="5">IVA - Renta</option>
                  </select>
               </div>
               <div>
                  <label
                     for="moneda"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >Moneda:</label
                  >
                  <select
                     v-model="formData.moneda"
                     id="moneda"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  >
                     <option value="PYG">PYG</option>
                  </select>
               </div>
               <div>
                  <label
                     for="presencia"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >¿Factura presente?</label
                  >
                  <select
                     v-model="formData.presencia"
                     id="presencia"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  >
                     <option value="1">Sí</option>
                     <option value="0">No</option>
                  </select>
               </div>
               <div>
                  <label
                     for="ciCliente"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >CI del Cliente:</label
                  >
                  <input
                     type="text"
                     v-model="formData.cliente.ci"
                     id="ciCliente"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
               </div>
               <div>
                  <label
                     for="nombreCliente"
                     class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                     >Nombre del Cliente:</label
                  >
                  <input
                     type="text"
                     v-model="formData.cliente.razonSocial"
                     id="nombreCliente"
                     class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
               </div>

               <!-- <button
            type="submit"
            class="w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
            Generar Factura
            </button> -->
            </div>
         </form>
      </div>

      <div class="container mx-auto">
         <div class="my-2 grid grid-cols-12 gap-2">
            <div class="col-span-3">
               <label
                  for="codigo"
                  class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                  >Código:</label
               >
               <input
                  type="text"
                  id="codigo"
                  class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
               />
            </div>
            <div class="col-span-3">
               <label
                  for="descripcion"
                  class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                  >Descripción:</label
               >
               <input
                  type="text"
                  id="descripcion"
                  class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
               />
            </div>
            <div class="col-span-2">
               <label
                  for="precio"
                  class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                  >Precio:</label
               >
               <input
                  type="text"
                  id="precio"
                  class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
               />
            </div>
            <div class="col-span-2">
               <label
                  for="cantidad"
                  class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                  >Cantidad:</label
               >
               <input
                  type="text"
                  id="cantidad"
                  class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
               />
            </div>
            <div class="col-span-2">
               <label
                  for="totalUnitario"
                  class="mb-1 block font-semibold text-gray-700 dark:text-gray-300"
                  >Total Unitario:</label
               >
               <input
                  type="text"
                  id="totalUnitario"
                  class="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
               />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { ref } from "vue";

const formData = ref({
   tipoDocumento: "1",
   establecimiento: "001",
   codigoSeguridadAleatorio: "",
   descripcion: "",
   observacion: "",
   fecha: "",
   tipoEmision: "1",
   presencia: "1",
   cliente: {
      ci: "",
      razonSocial: "",
   },
});

const submitForm = () => {
   // Lógica para enviar el formulario
   console.log(formData.value);
};
</script>
