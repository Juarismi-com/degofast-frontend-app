<template>
   <div
      class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
   >
      <div
         class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
         <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
               class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
               Resetear contraseña?
            </h1>
            <form
               class="space-y-4 md:space-y-6"
               action="#"
               @submit.prevent="resetPassword"
               method="post"
            >
               <button
                  type="submit"
                  class="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               >
                  Confirmar
               </button>
            </form>
            <div v-if="newPass">
               <h1
                  class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
               >
                  Su nueva contraseña es:
               </h1>
               <br />
               <h2
                  class="text-lg font-bold leading-tight tracking-tight text-white bg-purple-600 hover:bg-purple-700 md:text-lg dark:text-white text-center"
               >
                  {{ newPass }}
               </h2>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { ref } from "vue";
import { create } from "@/services/http.service";

import { useAuthStore } from "~/stores";
const authStore = useAuthStore();
const username = authStore.user.username;

const newPass = ref("");

const resetPassword = async () => {
   try {
      console.log();

      const payload = { username: username };

      const result = await create("auth/reset-password", payload);
      console.log(result.newPassword);
      newPass.value = result.newPassword;
   } catch (error) {
      console.error("Error al resetear la contraseña:", error);
   }
};
</script>
