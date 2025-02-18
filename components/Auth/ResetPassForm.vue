<template>
   <div
      class="items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
   >
      <button
         @click="goBack"
         class="absolute top-4 left-4 flex items-center text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg shadow-md text-lg font-medium"
      >
         ⬅ Volver
      </button>

      <div
         class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
         <div class="p-8 space-y-6">
            <h1
               class="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white text-center"
            >
               Ingrese un correo existente
            </h1>

            <div class="flex flex-col items-center space-y-4">
               <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  placeholder="Email"
                  required
                  v-model="form.username"
                  @input="validateEmail"
               />
               <p
                  v-if="!isEmailValid && form.username"
                  class="text-red-500 text-sm"
               >
                  Ingrese un correo válido.
               </p>
            </div>

            <form class="flex justify-center" @submit.prevent="resetPassword">
               <button
                  type="submit"
                  :disabled="!isEmailValid"
                  class="w-3/4 text-white font-medium rounded-lg text-lg px-5 py-4 text-center transition-all duration-200"
                  :class="
                     isEmailValid
                        ? 'bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800'
                        : 'bg-gray-400 cursor-not-allowed'
                  "
               >
                  Generar Contraseña
               </button>
            </form>

            <div v-if="newPass" class="text-center">
               <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                  Su nueva contraseña es:
               </h1>
               <br />
               <h2
                  class="text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 p-4 rounded-md"
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
import { useRouter } from "vue-router";
import { create } from "@/services/http.service";

const router = useRouter();
const form = ref({ username: "" });
const newPass = ref("");
const isEmailValid = ref(false);

const validateEmail = () => {
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   isEmailValid.value = emailPattern.test(form.value.username);
};

const resetPassword = async () => {
   try {
      const payload = { username: form.value.username };
      const result = await create("auth/reset-password", payload);
      newPass.value = result.newPassword;
   } catch (error) {
      console.error("Error al resetear la contraseña:", error);
   }
};

const goBack = () => {
   router.go(-1);
};
</script>
