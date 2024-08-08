<template>
   <div>
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         {{ title }}
      </h2>
      <ToastSuccess
         v-if="showToast"
         message="Enviado correctamente"
      />

      <Loader v-if="loading" />

      <div v-if="!loading">
         <form @submit.prevent="submitForm">
            <div class="text-xl pb-4">
               <h3>Documento Electrónico {{ cdc }}</h3>
               <hr>
            </div>
            <div class="grid grid-cols-3 gap-4 pb-4">
               <div>
                  <label for="establecimiento">Establecimiento:</label>
                  <select id="establecimiento" 
                     v-model="formData.establecimiento" 
                     :class="INPUT_CLASS.basic"
                     @change="selectEstablecimiento($event)">
                     <option 
                        v-for="(establecimiento, index) in contributor.  establecimientos" 
                        :key="index"
                        :value="establecimiento.codigo">
                        {{
                           establecimiento.denominacion + " - " + establecimiento.codigo
                        }}
                     </option>
                  </select>
               </div>

               <div>
                  <label for="punto_expedicion">Punto de Expedicion:</label>
                  <select id="punto_expedicion" 
                     v-model="formData.puntoExpedicion" 
                     :class="INPUT_CLASS.basic">
                     <option v-for="(item, index) in puntoExpedicionList"     
                        :key="index" 
                        :value="item._id">
                        {{
                           item.codigo
                        }}
                     </option>
                  </select>
               </div>

               <div>
                  <label for="fecha">Fecha:</label>
                  <input type="datetime-local" v-model="formData.fecha" id="fecha" :class="INPUT_CLASS.basic" />
               </div>
               <div>
                  <label for="tipoEmision">Tipo de Emisión:</label>
                  <select v-model="formData.tipoEmision" id="tipoEmision" :class="INPUT_CLASS.basic">
                     <option value="1">Normal</option>
                     <option value="2">Contingencia</option>
                  </select>
               </div>
               <div>
                  <label for="tipoTransaccion">Tipo de Transacción:</label>
                  <select v-model="formData.tipoTransaccion" id="tipoTransaccion" :class="INPUT_CLASS.basic">
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
                  <select v-model="formData.tipoImpuesto" id="tipoImpuesto" :class="INPUT_CLASS.basic">
                     <option value="1">IVA</option>
                     <option value="2">ISC</option>
                     <option value="3">Renta</option>
                     <option value="4">Ninguno</option>
                     <option value="5">IVA - Renta</option>
                  </select>
               </div>
               <div>
                  <label for="condicionVenta">Condición de Venta:</label>
                  <select v-model="formData.condicion.tipo" id="tipoEmision" :class="INPUT_CLASS.basic">
                     <option value="1">Contado</option>
                     <option value="2">Crédito</option>
                  </select>
               </div>
               <div>
                  <label for="moneda">Moneda:</label>
                  <select v-model="formData.moneda" id="moneda" :class="INPUT_CLASS.basic">
                     <option value="PYG">PYG</option>
                     <option value="USD">USD</option>
                  </select>
               </div>
               <div v-if="formData.moneda == 'USD'">
                  <label for="cambio">Cambio ({{ formData.moneda }}):</label>
                  <input v-model="formData.cambio" id="cambio" :class="INPUT_CLASS.basic"></input>
               </div>
               <div>
                  <label for="presencia">¿Factura presente?</label>
                  <select v-model="formData.factura.presencia" id="presencia" :class="INPUT_CLASS.basic">
                     <option value="1">Sí</option>
                     <option value="0">No</option>
                  </select>
               </div>

               <div>
                  <label for="descripcion">Descripción (Opcional):</label>
                  <input v-model="formData.descripcion" id="descripcion" :class="INPUT_CLASS.basic"></input>
               </div>
            </div>

            <div class="text-xl pb-4">
               <h3>Cliente</h3>
               <hr>
            </div>
            <div class="pb-4">
               <div class="grid grid-cols-3 gap-4 pb-1">
                  <div>
                     <label for="ciCliente" class="mr-2">RUC:</label>
                     <input type="text" v-model="formData.cliente.ruc" id="ciCliente" :class="INPUT_CLASS.basic"
                        class="mr-2" />
                  </div>
                  <div>
                     <button type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        @click="buscarCliente(formData.cliente.ruc)">Buscar</button>

                  </div>
               </div>
            </div>
            <div class="grid grid-cols-3 gap-4 pb-4">
               <div>
                  <label for="nombreCliente">Nombre del Cliente:</label>
                  <input type="text" v-model="formData.cliente.razonSocial" id="nombreCliente"
                     :class="INPUT_CLASS.basic" />
               </div>
               <div>
                  <label for="telefonoCliente">Teléfono:</label>
                  <input type="text" v-model="formData.cliente.telefono" id="telefonoCliente"
                     :class="INPUT_CLASS.basic" />
               </div>
               <div>
                  <label for="emailCliente">Email:</label>
                  <input type="text" v-model="formData.cliente.email" id="emailCliente" :class="INPUT_CLASS.basic" />
               </div>
            </div>

            <div class="text-xl pb-4">
               <h3>Producto / Servicio</h3>
               <hr>
            </div>

            <!-- Detalle -->
             <div class="pb-4">
               <div class="grid grid-cols-3 gap-4 pb-1">
                  <div>
                     <label for="codigoServicio" class="mr-2">Codigo Servicio:</label>
                     <input type="text" id="codigoServicio" 
                        v-model="codigoServicio"
                        :class="INPUT_CLASS.basic"
                        class="mr-2" />
                  </div>
                  <div>
                     <button type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        @click="searchCodigoServicio">Buscar</button>

                  </div>
               </div>
            </div>
            <div class="py-4">
               <div class="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-8">
                  <div>
                     <label for="codigo" class="my-4 text-l font-semibold text-gray-700 dark:text-white">Código:</label>
                     <input type="text" :class="INPUT_CLASS.basic" id="codigo" v-model="item.codigo" />
                  </div>
                  <div>
                     <label for="descripcion"
                        class="my-4 text-l font-semibold text-gray-700 dark:text-white">Descripción:</label>
                     <input type="text" :class="INPUT_CLASS.basic" id="descripcion" v-model="item.descripcion" />
                  </div>
                  <div>
                     <label for="precio" class="my-4 text-l font-semibold text-gray-700 dark:text-white">Precio:</label>
                     <input type="number" :class="INPUT_CLASS.basic" id="precio" v-model="item.precioUnitario" />
                  </div>
                  <div>
                     <label for="cantidad"
                        class="my-4 text-l font-semibold text-gray-700 dark:text-white">Cantidad:</label>
                     <input type="number" :class="INPUT_CLASS.basic" id="cantidad" v-model="item.cantidad" />
                  </div>
                  <div>
                     <label for="iva" class="my-4 text-l font-semibold text-gray-700 dark:text-white">IVA:</label>
                     <select v-model="item.iva" id="iva" :class="INPUT_CLASS.basic">
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
                     <button type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                    Código
                                 </th>
                                 <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Descripción
                                 </th>
                                 <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                    Precio Unitario
                                 </th>
                                 <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cantidad
                                 </th>
                                 <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    IVA
                                 </th>
                                 <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Unitario
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr v-for="(item, index) in formData.items" :key="index"
                                 class="hover:bg-gray-100 dark:hover:bg-gray-700 bg-white">
                                 <td class="px-4 py-2 whitespace-nowrap text-right">
                                    {{ formatNumber(item.codigo) }}
                                 </td>
                                 <td class="px-4 py-2 whitespace-nowrap">
                                    {{ item.descripcion }}
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
                                    <button type="button" @click="eliminarItem(index)"
                                       class="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Eliminar</button>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>

                  </div>
               </div>
            </div>

            <button type="submit"
               class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Enviar</button>

         </form>

         <!-- Modal -->
         <div v-if="openModal" id="default-modal" tabindex="-1"
            class="fixed inset-0 z-50 flex items-center justify-center w-full  bg-gray-800 bg-opacity-50">
            <div class="relative p-4 w-full max-w-4xl max-h-screen overflow-y-auto">

               <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <!-- Modal header -->
                  <div class="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                     <h3 class="text-xl font-semibold text-gray-900 dark:text-white text-center">
                        Vista previa del documento
                     </h3>
                  </div>
                  <!-- Modal body -->
                  <div class="p-4 md:p-5 space-y-4">
                     <DePreview :detalle="formData" />
                  </div>
                  <!-- Modal footer -->
                  <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                     <button type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="confirmSubmitForm">Desea crear el de?</button>
                     <button type="button"
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        @click="closeModal">Cancelar</button>
                  </div>
               </div>
            </div>
         </div>

         <!--Alert 
            :show="showAlert"
            :message="alertMessage"
            @close="showAlert = false"
         /-->
      </div>
   </div>
</template>

<script setup>

import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStorage } from "@vueuse/core";
import moment from 'moment';
import { useAuthStore } from "../../../../stores";
import { INPUT_CLASS, TIPO_DOCUMENT_LIST, useConfig } from "../../../../config"
import { deFormData, deItemData } from '~/config/de';
import { formatNumber, getDeNumberCode, getRandomNumberForDe } from '../../../../helpers/number.helper';
import { getClientByRuc, editDE, saveDE, saveLotes } from "~/services";
//import ToastDanger from "~/components/Toast/ToastDanger.vue";
import ToastSuccess from "~/components/Toast/ToastSuccess.vue";
import DePreview from '@/components/Theme/Modal/DePreview.vue';
import { getPuntoExpedicionByFilters } from "~/services/punto-expedicion.service";
import { getServicesByContributor } from "~/services/services.service";

const authToken = useStorage("authToken");

// datos relacionados con eltipo de documento electronic
// @todo move in a helper
const route = useRoute();
const deType = ref(route.params.type);
const codigoServicio = ref("");
const routeList = ref(TIPO_DOCUMENT_LIST);
const routeSelected = ref(
   routeList.value.find((item) => item.tipoDocumento == route.params.type),
);
const title = ref(routeSelected.value.title);

const { DE_SUBMIT_FORM } = useConfig();

definePageMeta({
   middleware: ["auth"],
});

const authStore = useAuthStore();
const { contributor } = storeToRefs(authStore);

const formData = ref({ ...deFormData });
const item = ref({ ...deItemData });
const cdc = ref("");
const puntoExpedicionList = ref([]);
const serviceList = ref([]);

const openModal = ref(false);
const showToast = ref(false);

const loading = ref(false);

const buscarCliente = async (ruc) => {
   try {
      if (ruc.length == 0)
         throw { message: "Asigne un ruc" };

      loading.value = true;
      const rucSinDv = ruc.split('-')[0];
      const response = await getClientByRuc(rucSinDv);

      if (response && response.rows.length > 0) {
         const { ruc_sin_dv, dv, nombre } = response.rows[0];
         formData.value.cliente.ruc = `${ruc_sin_dv}-${dv}`;
         formData.value.cliente.razonSocial = nombre;
      } else {
         alert("No se encontró el cliente")
      }

      loading.value = false;
   } catch (error) {
      console.error("Error al buscar el cliente:", error);
      alert(error?.response?.data?.error);
      loading.value = false;
   }
}


const agregarItem = () => {

   if (
      item.value.codigo &&
      item.value.descripcion &&
      item.value.precioUnitario &&
      item.value.cantidad
   ) {

      const total = Math.floor(item.value.precioUnitario * item.value.cantidad);

      item.value.totalUnitario = formatNumber(total);

      formData.value.items.push({ ...item.value });
      item.value = {
         ...deItemData
      };
   } else {
      alert("Por favor, complete todos los campos del nuevo ítem.");
   }
};

const eliminarItem = (index) => {
   formData.value.items.splice(index, 1);
};


const submitForm = async () => {
   if (validateForm()) {
      openModal.value = true;
   }
};

/**
 * Confirmacion de envio de documento electronico
 */
const confirmSubmitForm = async () => {
   try {
      if (validateForm()) {
         if (confirm("Desea crear el de?")) {
            let fecha = moment(formData.value.fecha)
               .format('YYYY-MM-DDTHH:mm:ss');
            formData.value.tipoDocumento = deType.value // trae desde paramaetro
            formData.value.codigoSeguridadAleatorio = getRandomNumberForDe();

            let payload = {
               ...formData.value,
               fecha,
               establecimiento: "001",
               puntoExpedicion: "001"
            }

            if (DE_SUBMIT_FORM == "lote") {
               submitLote(payload)
            } else {
               submitDe(payload)
            }
         }
      }

      openModal.value = false;
   } catch (error) {
      console.error("Error submitting form:", error);
      alert(error?.message);
   }

}

/**
 * Envia un lote
 * @param payload 
 */
const submitLote = async (payload) => {
   loading.value = true;
   const response = await saveLotes([payload])
   const loteResponseId =  response.loteResponseId;

   setTimeout(async () => {
      const data = await getLoteByLoteResponseId(loteResponseId);
      const de = data.lote[0]
      
      // Update document
      const newState = de.details?.mensaje.substring(0,1).toUpperCase();
      await editDE(de?.de?._id, {estado: newState});

      // @todo add toast
      alert(de.details?.mensaje)
      loading.value = false;

      if (confirm(`Desea Generar un nuevo DE?\n`)) {
         formData.value = { ...deFormData }
      }
   }, 10000)
}

/**
 * Guarda el documento electronico de forma sincrona
 * @param payload 
 */
const submitDe = async (payload) => {
   loading.value = true
   try {
      const response = await saveDE(payload)
      cdc.value = response?.de?.cdc
      showToast.value = true;

      setTimeout(() => {
         showToast.value = false;
      }, 3000);

      resetForm();
      loading.value = false;
   } catch (error) {
      console.log(error);
      const data = error?.response?.data?.error;
      alert(data?.details['ns2:dMsgRes']);
      loading.value = false;
   }
}

/**
 * Selecciona un establecimiento y setea su punto de expedicion
 * @param e 
 */
const selectEstablecimiento = (e) => {
   formData.value.establecimiento = e.target.value.toString();
   setPuntoEstablecimientoList();
}

/**
 * Carga el listado de establecimientos y setea el primero encontrado 
 * por defecto
 */
const setPuntoEstablecimientoList =  async() => {
   const establecimientoCodigo = formData.value.establecimiento;
   const establecimiento = contributor.value.establecimientos
      .find(establecimiento => {
         return establecimiento.codigo == establecimientoCodigo
      })
   
   puntoExpedicionList.value = await getPuntoExpedicionByFilters({
      contributor: contributor?.value._id,
      establecimiento: establecimiento?._id,
      tipoDocumento: deType.value
   })

   formData.value.puntoExpedicion = puntoExpedicionList.value[0]._id;
}


const setServicesList = async () => {
   serviceList.value = await getServicesByContributor(contributor.value._id)
   console.log(serviceList.value)
}


const searchCodigoServicio = () => {
   const servicio = serviceList.value.find(servicio => {
      return servicio.codigo == codigoServicio.value
   })

   item.value = {
      ...item.value,
      codigo: servicio.codigo,
      descripcion: servicio.nombre,
      precioUnitario: servicio?.precioUnitario || '',
      cantidad: 1,
      cambio: formData.value.cambio || 0
   }
}

onMounted(() => {
   setPuntoEstablecimientoList();
   setServicesList();
});


/**
 * Valida que ciertos atributos se envien del
 */
const validateForm = () => {
   const errors = [];
   const { fecha, cliente, items, puntoExpedicion } = formData.value

   if (!fecha)
      errors.push("Fecha es requerido");

   // if (!establecimiento)
   //    errors.push("Establecimiento es requerido")

   // if (!puntoExpedicion)
   //    errors.push("Punto de Expedicion es requerido")

   if (!cliente.ruc)
      errors.push("Ruc de Cliente es requerido")

   if (!cliente.razonSocial)
      errors.push("Nombre de Cliente es requerido")

   if (items.length == 0)
      errors.push("Detalle es requerido")

   if (errors.length > 0) {
      const message = errors.join("\n")
      alert(message);

      return false
   }

   return true;
}

const resetForm = () => {
   formData.value = {
      ...formData.value,
      descripcion: '',
      cliente: {
         ruc: '',
         razonSocial: '',
         telefono: '',
         email: '',
      },
      items: [],
   };
};

const closeModal = () => {
   openModal.value = false;
}

</script>
