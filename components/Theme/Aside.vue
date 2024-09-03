<template>
   <aside
      class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0"
   >
      <div class="py-4 text-gray-500 dark:text-gray-400">
         <a
            class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            href="#"
         >
            {{ appName }}
         </a>
         <ul class="mt-6">
            <li
               class="relative px-6 py-3"
               v-for="(item, index) in menu"
               :key="index"
            >
               <NuxtLink
                  :class="[
                     commonAElementClass,
                     $route.path === item.path ? 'text-gray-800' : '',
                  ]"
                  :to="item.path"
               >
                  <!--svg
                     class="w-5 h-5"
                     aria-hidden="true"
                     fill="none"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path :d="item.svgIcon"></path>
                  </svg-->
                  <span class="ml-4">{{ item.title }}</span>
               </NuxtLink>
            </li>
         </ul>
         <div class="px-6 my-6">
            <button
               class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
               @click="closeSession"
            >
               Cerrar sesión
               <span class="ml-2" aria-hidden="true">+</span>
            </button>
         </div>
      </div>
   </aside>
</template>

<script setup>
import { APP_NAME, TIPO_DOCUMENT_LIST } from "~/config";
import { useAuthStore } from "~/stores";

const appName = ref(APP_NAME);

const commonAElementClass = ref(
   "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200",
);

const menu = ref([
   ...TIPO_DOCUMENT_LIST,
   {
      path: "/contributor",
      title: "Contribuyente",
      svgIcon:
         "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
   },
   // {
   //    path: "/auth/reset",
   //    title: "Reseteo de contraseña",
   //    svgIcon:
   //       "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
   // },
]);

const closeSession = () => {
   const authStore = useAuthStore();
   const { logout } = authStore;
   logout();
};
</script>
