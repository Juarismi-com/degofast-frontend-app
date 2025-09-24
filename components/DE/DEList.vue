<template>
   <div class="w-full overflow-hidden">
      <DECancel
         :show="showModal"
         :cdc="cdcActual"
         @update:show="handleCloseModal"
      />

      <div class="flex flex-col gap-4 mt-4 mb-4">
         <div class="flex gap-4">
            <div class="flex-1">
               <label
                  for="documentoNumero"
                  class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
               >
                  Número de Documento
               </label>
               <input
                  type="text"
                  v-model="searchQuery.documentoNumero"
                  id="documentoNumero"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="Ingrese número de documento"
               />
            </div>

            <div class="flex-1">
               <label
                  for="facturaNumero"
                  class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
               >
                  Número de Factura
               </label>
               <input
                  type="text"
                  v-model="searchQuery.facturaNumero"
                  id="facturaNumero"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="Ingrese número de factura"
               />
            </div>

            <div class="flex-none self-end">
               <button
                  @click="buscar"
                  class="px-4 py-2 bg-purple-600 text-white rounded-lg"
               >
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
                  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
               >
                  <th class="px-3 py-2">Cliente</th>
                  <th class="px-3 py-2">Doc. Elec.</th>

                  <th class="px-3 py-2">Fecha</th>
                  <th class="px-3 py-2 text-right">Total</th>
                  <th class="px-3 py-2">Estado</th>
                  <th class="px-3 py-2 text-center">Acciones</th>
               </tr>
            </thead>
            <tbody
               class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
               <tr
                  class="text-gray-700 dark:text-gray-400"
                  v-for="(item, index) in filteredItems"
                  :key="index"
               >
                  <td class="px-3 py-2">
                     <div class="flex items-center text-sm">
                        <div>
                           <p class="font-semibold">
                              {{ item?.cliente?.razonSocial }}
                           </p>
                           <p class="text-xs text-gray-600 dark:text-gray-400">
                              {{ item?.cliente?.ruc || "XXXXXX-X" }}
                           </p>
                        </div>
                     </div>
                  </td>
                  <td class="px-3 py-2 text-sm">
                     <b>{{ concatNumeroFactura(item) }}</b>
                     <p class="text-xs text-gray-600 dark:text-gray-400">
                        {{ item?.cdc }}
                     </p>
                  </td>

                  <td class="px-3 py-2 text-sm">
                     {{ moment(item.fecha).format("DD/MM/YYYY hh:mm:ss") }}
                  </td>
                  <td class="px-3 py-2 text-sm text-right">
                     {{
                        item.moneda === "PYG"
                           ? formatPriceNumber(item.total)
                           : formatPriceNumberNoPYG(item.total)
                     }}
                  </td>

                  <td class="px-3 py-2 text-xs">
                     <span
                        :class="[
                           'px-2 py-1 font-semibold leading-tight text-green-700 rounded-full dark:bg-green-700 dark:text-green-100',
                           item?.estado === 'A' ? 'bg-green-100' : 'bg-red-100',
                        ]"
                     >
                        {{ item.estado }}
                     </span>
                  </td>

                  <!-- Opciones -->
                  <td class="text-center">
                     <Menu as="div" class="relative inline-block">
                        <MenuButton
                           class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50"
                        >
                           Ver opciones
                           <ChevronDownIcon
                              class="-mr-1 size-5 text-gray-400"
                              aria-hidden="true"
                           />
                        </MenuButton>

                        <transition
                           enter-active-class="transition ease-out duration-100"
                           enter-from-class="transform opacity-0 scale-95"
                           enter-to-class="transform scale-100"
                           leave-active-class="transition ease-in duration-75"
                           leave-from-class="transform scale-100"
                           leave-to-class="transform opacity-0 scale-95"
                        >
                           <MenuItems
                              class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5"
                           >
                              <div class="py-1">
                                 <MenuItem v-slot="{ active }">
                                    <NuxtLink
                                       :to="`${API_URL}/de/cdc/${item.cdc}/kude`"
                                       target="_blank"
                                       :class="[
                                          active
                                             ? 'bg-gray-100 text-gray-900 outline-hidden'
                                             : 'text-gray-700',
                                          'block px-4 py-2 text-sm',
                                       ]"
                                    >
                                       Ver Kude
                                    </NuxtLink>
                                 </MenuItem>
                                 <MenuItem
                                    v-slot="{ active }"
                                    @click="openModal(item.cdc)"
                                 >
                                    <NuxtLink
                                       :class="[
                                          active
                                             ? 'bg-gray-100 text-gray-900 outline-hidden'
                                             : 'text-gray-700',
                                          'block px-4 py-2 text-sm',
                                       ]"
                                    >
                                       Anular Documento
                                    </NuxtLink>
                                 </MenuItem>
                              </div>
                           </MenuItems>
                        </transition>
                     </Menu>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <PaginationNextPrev
         @page-change="handlePageChange"
         :totalPages="totalPagesLocal"
      />
   </div>
</template>

<script setup>
import { useConfig } from "~/config";
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
import {
   concatNumeroFactura,
   formatPriceNumber,
} from "~/helpers/number.helper";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { get, create } from "~/services/http.service";
import { getDesById } from "../../services";
import { sendEmailNotification } from "~/services/mail.service";
import Loader from "@/components/Theme/Loader/Loader.vue";
import DECancel from "./DECancel.vue";
import PaginationNextPrev from "@/components/Theme/Pagination/PaginationNextPrev.vue";
import { dePDF } from "@/config/de.ts";

import { useAuthStore } from "../../stores/auth.store.js";
import { storeToRefs } from "pinia";

const { API_URL } = useConfig();

const authStore = useAuthStore();

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

/* Detalles */
const verDetalles = (id) => {
   router.push({ path: `/de/detail/${id}` });
};

/* Kude */
const verKude = (id) => {
   window.open(`/de/kude/${id}`, "_blank");
};

/* PDF */
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
      (est) => est.codigo === de.establecimiento,
   );

   const direccion = establecimiento ? establecimiento.direccion : "";
   const telefono = establecimiento ? establecimiento.telefono : "";

   return {
      fecha: new Date(de.fecha).toLocaleDateString(),
      cliente: {
         nombre: de.cliente.razonSocial,
         direccion: de.cliente.direccion,
         telefono: de.cliente.telefono,
         email: de.cliente.email,
      },
      emisor: {
         nombre: de.contributor.razonSocial,
         email: de.contributor.email,
         timbrado: de.contributor.timbradoNumero,
         direccion: direccion,
         telefono: telefono,
         logo: "",
      },
      items: de.items,
      total: sum,
      totalEnLetas: "",
   };
};

/* Email */
const enviarEmail = async (id) => {
   try {
      const deRes = await getDesById(id);

      const response = await sendEmailNotification(
         deRes.cdc,
         deRes.cliente.email,
         deRes._id,
      );
      alert(JSON.stringify(response.message));
      console.log("Respuesta del servidor:", response);
   } catch (error) {
      console.error("Error al enviar la notificación:", error);
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

const padWithZeros = (number, length) => {
   return String(number).padStart(length, "0");
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
      const formattedFacturaNumero = padWithZeros(
         searchQuery.value.facturaNumero,
         7,
      );
      queryParams["numero"] = formattedFacturaNumero;
   }

   const queryString = new URLSearchParams(queryParams).toString();

   try {
      const response = await get(
         `de?page=1&tipoDocumento=${props.documentType}&usuario.email=${
            authStore.user.email
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
