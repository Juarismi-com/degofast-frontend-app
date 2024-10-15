<template>
   <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <DECancel :show="showModal" :cdc="cdcActual" @update:show="handleCloseModal" />

      <div class="flex flex-col gap-4 mt-4 mb-4">
         <div class="flex gap-4">
            <div class="flex-1">
               <label for="documentoNumero" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Número de Documento
               </label>
               <input type="text" v-model="searchQuery.documentoNumero" id="documentoNumero"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="Ingrese número de documento" />
            </div>

            <div class="flex-1">
               <label for="facturaNumero" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Número de Factura
               </label>
               <input type="text" v-model="searchQuery.facturaNumero" id="facturaNumero"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="Ingrese número de factura" />
            </div>

            <div class="flex-none self-end">
               <button @click="buscar" class="px-4 py-2 bg-purple-600 text-white rounded-lg">
                  Buscar
               </button>
            </div>
         </div>
      </div>

      <Loader v-if="loading" />
      <div v-else class="w-full overflow-x-auto">
         <table class="w-full whitespace-no-wrap">
            <thead>
               <tr
                  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th class="px-4 py-3">Cliente</th>
                  <th class="px-4 py-3">Nro</th>
                  <th class="px-4 py-3">Identificador</th>
                  <th class="px-4 py-3">Estado</th>
                  <th class="px-4 py-3">Fecha</th>
                  <th class="px-4 py-3 text-center">Total</th>
                  <th class="px-4 py-3">Acciones</th>
               </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
               <tr class="text-gray-700 dark:text-gray-400" v-for="(item, index) in filteredItems" :key="index">
                  <td class="px-4 py-3">
                     <div class="flex items-center text-sm">
                        <!-- Avatar with inset shadow -->
                        <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                           <img class="object-cover w-full h-full rounded-full"
                              src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                              alt="" loading="lazy" />
                           <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                           <p class="font-semibold">
                              {{ item?.cliente?.razonSocial }}
                           </p>
                           <p class="text-xs text-gray-600 dark:text-gray-400">
                              {{ item?.cliente?.ruc }}
                           </p>
                        </div>
                     </div>
                  </td>
                  <td class="px-4 py-3 text-sm">
                     {{ getEstablecimientoNumberCode(item.establecimiento) }}
                     -
                     {{ getPuntoExpedicionNumberCode(item.punto) }}
                     -
                     {{ getDeNumberCode(item.numero) }}
                  </td>
                  <td class="px-4 py-3 text-sm">{{ item._id }}</td>
                  <td class="px-4 py-3 text-xs">
                     <span :class="[
                        'px-2 py-1 font-semibold leading-tight text-green-700 rounded-full dark:bg-green-700 dark:text-green-100',
                        item?.estado === 'A' ? 'bg-green-100' : 'bg-red-100',
                     ]">
                        {{ item.estado }}
                     </span>
                  </td>

                  <td class="px-4 py-3 text-sm">
                     {{ moment(item.fecha).format("DD/MM/YYYY") }}
                  </td>
                  <td class="px-4 py-3 text-sm text-right">
                     {{
                        item.moneda === "PYG"
                           ? formatPriceNumber(item.total)
                           : formatPriceNumberNoPYG(item.total)
                     }}
                  </td>
                  <!-- Opciones -->
                  <td class="px-4 py-3">
                     <button @click="verDetalles(item._id)" class="text-blue-600 hover:underline focus:outline-none">
                        Ver detalles
                     </button>
                  </td>
                  <td class="px-4 py-3">
                     <button @click="verKude(item._id)" class="text-blue-600 hover:underline focus:outline-none">
                        Ver kude
                     </button>
                  </td>
                  <td class="px-4 py-3">
                     <button @click="generarPDF(item._id)" class="text-blue-600 hover:underline focus:outline-none">
                        Generar PDF
                     </button>
                  </td>
                  <td class="px-4 py-3">
                     <button @click="enviarEmail(item._id)" class="text-blue-600 hover:underline focus:outline-none">
                        Enviar email
                     </button>
                  </td>
                  <td class="px-4 py-3">
                     <button v-if="item.estado == 'X'" @click="openModal(item.cdc)"
                        class="text-blue-600 hover:underline focus:outline-none">
                        Generar evento
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <PaginationNextPrev @page-change="handlePageChange" :totalPages="totalPagesLocal" />
   </div>
</template>

<script setup>
import { ref, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import moment from "moment";
import { useAuthStore } from "~/stores";
import {
   formatPriceNumber,
   formatPriceNumberNoPYG,
   getEstablecimientoNumberCode,
   getPuntoExpedicionNumberCode,
   getDeNumberCode,
} from "~/helpers/number.helper";
import { get, create } from "~/services/http.service";
import Loader from "@/components/Loader/Loader.vue";
import DECancel from "./DECancel.vue";
import PaginationNextPrev from "@/components/Theme/Pagination/PaginationNextPrev.vue"
import { dePDF } from "@/config/de.ts";

const props = defineProps({
   items: {
      type: Array,
      default: [],
   },
   totalPages: {
      type: Number,
   },
   documentType: {
      type: Number,
   },
});

const router = useRouter();
const loading = ref(true);
const showModal = ref(false);
const cdcActual = ref(null);
const searchQuery = ref({
   documentoNumero: "",
   facturaNumero: "",
});
const filteredItems = ref([]);
const totalPagesLocal = ref(props.totalPages);
const detalle = ref(null);

const verDetalles = (id) => {
   router.push({ path: `/de/detail/${id}` });
};

const verKude = (id) => {
   window.open(`/de/kude/${id}`, "_blank");
};

const generarPDF = async (id) => {
   try {

      const data = await get(`de/${id}`);
      detalle.value = mapperDePDF(data);

      console.log(JSON.stringify(detalle.value));

      // const response = await create(
      //    `de/${id}/pdf`, detalle.value
      // );
      // return response;

   } catch (error) {
      console.error("Error al buscar el documento:", error);
   } finally {
      loading.value = false;
   }
};

const mapperDePDF = (de) => {
   let sum = 0;

   for (let i = 0; i < de.items.length; i++) {
      const item = de.items[i];
      sum += item?.precioUnitario * item?.cantidad;
   }

   const establecimiento = de.contributor.establecimientos.find(
      (est) => est.codigo === de.establecimiento
   );

   const direccion = establecimiento ? establecimiento.direccion : "";
   const telefono = establecimiento ? establecimiento.telefono : "";

   return {
      fecha: new Date(de.fecha).toLocaleDateString(),
      cliente: {
         nombre: de.cliente.razonSocial,
         direccion: de.cliente.direccion,
         telefono: de.cliente.telefono,
         email: de.cliente.email
      },
      emisor: {
         nombre: de.contributor.razonSocial,
         email: de.contributor.email,
         timbrado: de.contributor.timbradoNumero,
         direccion: direccion,
         telefono: telefono,
         logo: ""
      },
      items: de.items,
      total: sum,
      totalEnLetas: ""
   };
};

const enviarEmail = async (id) => {
   try {
      const response = await create(
         `de/${id}/mail`, dePDF
      );
      return response;

   } catch (error) {
      console.error("Error al buscar el documento:", error);
   } finally {
      loading.value = false;
   }
};


const consultarSifen = (cdc) => {
   const url = `https://ekuatia.set.gov.py/consultas/150/${cdc}`;
   window.open(url, "_blank");
};

const openModal = (cdc) => {
   cdcActual.value = cdc;
   showModal.value = true;
};

const { items } = toRefs(props);

onMounted(() => {
   filteredItems.value = [...items.value];
   console.log(items.value);
   loading.value = true;
});

watch(items, (newItems) => {
   filteredItems.value = [...newItems];
   loading.value = false;
   if (newItems.length === 0) {
      alert("No hay elementos que mostrar.");
   }
});

watch(
   () => props.totalPages,
   (newTotalPages) => {
      totalPagesLocal.value = newTotalPages;
      console.log(totalPagesLocal.value);
   },
);

const emit = defineEmits(["page-change"]);

const handlePageChange = (page) => {
   emit("page-change", page);
};

const handleCloseModal = (newVal) => {
   showModal.value = newVal;
};

const buscar = async () => {
   loading.value = true;

   let queryParams = {};

   if (searchQuery.value.documentoNumero) {
      if (searchQuery.value.documentoNumero.includes("-")) {
         queryParams["cliente.ruc"] = searchQuery.value.documentoNumero;
      } else {
         queryParams["cliente.documentoNumero"] =
            searchQuery.value.documentoNumero;
      }
   }

   if (searchQuery.value.facturaNumero) {
      queryParams["numero"] = searchQuery.value.facturaNumero;
   }

   const queryString = new URLSearchParams(queryParams).toString();

   try {
      const response = await get(
         `de?page=1&tipoDocumento=${props.documentType}&usuario.email=${authStore.user.email
         }${queryString ? `&${queryString}` : ""}`,
      );

      filteredItems.value = response.data;
      totalPagesLocal.value = response.totalPages;
   } catch (error) {
      console.error("Error al buscar el documento:", error);
   } finally {
      loading.value = false;
   }
};
</script>
