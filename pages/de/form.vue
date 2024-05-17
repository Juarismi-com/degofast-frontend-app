<template>
   <div>
      <h2 class="my-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Facturación Electrónica
      </h2>
      <div>
         <form @submit.prevent="submitForm">
            <div>
               <div>
                  <label for="establecimiento">Establecimiento:</label>
                  <input
                     type="text"
                     v-model="formData.establecimiento"
                     id="establecimiento"
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
                  />
               </div>
               <div>
                  <label for="punto">Punto:</label>
                  <input
                     type="text"
                     v-model="formData.punto"
                     id="punto"
                     readonly
                  />
               </div>
               <div>
                  <label for="numero">Número:</label>
                  <input
                     type="text"
                     v-model="formData.numero"
                     id="numero"
                     readonly
                  />
               </div>
               <div>
                  <label for="descripcion">Descripción:</label>
                  <textarea
                     v-model="formData.descripcion"
                     id="descripcion"
                  ></textarea>
               </div>
               <div>
                  <label for="observacion">Observación:</label>
                  <textarea
                     v-model="formData.observacion"
                     id="observacion"
                  ></textarea>
               </div>
               <div>
                  <label for="fecha">Fecha:</label>
                  <input
                     type="datetime-local"
                     v-model="formData.fecha"
                     id="fecha"
                  />
               </div>
               <div>
                  <label for="tipoEmision">Tipo de Emisión:</label>
                  <select v-model="formData.tipoEmision" id="tipoEmision">
                     <option value="1">Normal</option>
                     <option value="2">Contingencia</option>
                  </select>
               </div>
               <div>
                  <label for="tipoTransaccion">Tipo de Transacción:</label>
                  <select
                     v-model="formData.tipoTransaccion"
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
                  <select v-model="formData.tipoImpuesto" id="tipoImpuesto">
                     <option value="1">IVA</option>
                     <option value="2">ISC</option>
                     <option value="3">Renta</option>
                     <option value="4">Ninguno</option>
                     <option value="5">IVA - Renta</option>
                  </select>
               </div>
               <div>
                  <label for="moneda">Moneda:</label>
                  <select v-model="formData.moneda" id="moneda">
                     <option value="PYG">PYG</option>
                  </select>
               </div>
               <div>
                  <label for="presencia">¿Factura presente?</label>
                  <select v-model="formData.factura.presencia" id="presencia">
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
                  />
               </div>
               <div>
                  <label for="nombreCliente">Nombre del Cliente:</label>
                  <input
                     type="text"
                     v-model="formData.cliente.nombre"
                     id="nombreCliente"
                  />
               </div>

               <button
                  type="submit"
                  class="w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
               >
                  Generar Factura
               </button>
            </div>
         </form>
      </div>

      <div>
         <div class="col-span-3">
            <label for="codigo">Código:</label>
            <input type="text" id="codigo" v-model="item.codigo" />
         </div>
         <div class="col-span-3">
            <label for="descripcion">Descripción:</label>
            <input type="text" id="descripcion" v-model="item.descripcion" />
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
import { saveDE } from "../../utils";

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

const submitForm = async () => {
   try {
      const response = await saveDE(formData.value, token);
      console.log("Response:", response);
   } catch (error) {
      console.error("Error submitting form:", error);
   }
};
</script>
