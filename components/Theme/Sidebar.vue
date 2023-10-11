<template>
   <button class="absolute mt-16 ml-2" @click="setViewMenu" v-if="!viewMenu">
      >>
   </button>
   <ul
      class="absolute w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-16 ml-2 z-10"
      v-if="viewMenu"
   >
      <li
         class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
      >
         <b>dego<span class="text-blue-500">fast</span></b>
      </li>
      <li :class="[commonCss]">Facturación Electronica</li>
      <li :class="[commonCss]">Autofactura</li>
      <li :class="[commonCss]">Nota de Credito</li>
      <li :class="[commonCss]">Nota de Debito</li>
      <li :class="[commonCss]">Nota de Remisión</li>
      <li :class="[commonCss]">Mi Perfil</li>
      <li :class="[commonCss]">
         <NuxtLink
            class="font-medium text-blue-600 hover:underline dark:text-blue-500"
            to="/contributor"
         >
            Contribuyente</NuxtLink
         >
      </li>
      <li class="w-full px-4 py-2 rounded-b-lg" @click="setViewMenu">
         Cerrar Menu
      </li>
      <li class="w-full px-4 py-2 rounded-b-lg" @click="closeSession">Salir</li>
   </ul>
</template>

<script>
import { create } from "~/services/http.service";
import { useAuthStore } from "~/stores";

export default {
   data() {
      return {
         viewMenu: false,
         commonCss:
            "w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600",
      };
   },
   methods: {
      setViewMenu() {
         this.viewMenu = !this.viewMenu;
      },
      closeSession() {
         const authStore = useAuthStore();
         const { logout } = authStore;
         logout();
      },
   },
};
</script>
