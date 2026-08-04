<template>
   <div
      class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
   >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
         <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center"
         >
            Restablecer Contraseña
         </h1>

         <form class="space-y-4 md:space-y-6" @submit.prevent="resetPassword">
            <div>
               <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
               >
                  Email
               </label>
               <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="Email"
                  required="true"
                  v-model="form.username"
                  @input="validateEmail"
               />
               <p
                  v-if="!isEmailValid && form.username"
                  class="text-red-500 text-sm mt-1"
               >
                  Por favor, ingrese un email válido.
               </p>
            </div>

            <button
               type="submit"
               :disabled="!isEmailValid || isSubmitting"
               class="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200"
               :class="
                  isEmailValid && !isSubmitting
                     ? 'bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300'
                     : 'bg-gray-400 cursor-not-allowed'
               "
            >
               {{ isSubmitting ? "Generando..." : "Generar Contraseña" }}
            </button>

            <p v-if="errorMessage" class="text-red-500 text-sm text-center">
               {{ errorMessage }}
            </p>

            <div v-if="newPass" class="text-center space-y-2">
               <p class="text-sm font-medium text-gray-900">
                  Su nueva contraseña es:
               </p>
               <span
                  class="inline-block text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 p-2.5 rounded-lg"
               >
                  {{ newPass }}
               </span>
            </div>
         </form>
         <p class="text-sm font-light text-gray-500">
            ¿Contraseña recuperada?
            <NuxtLink
               class="font-medium text-purple-600 hover:underline"
               to="/auth"
               >Iniciar Sesión</NuxtLink
            >
         </p>
      </div>
   </div>
</template>

<script setup>
import { create } from "@/services/http.service";

const form = ref({ username: "" });
const newPass = ref("");
const isEmailValid = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref("");

const validateEmail = () => {
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   isEmailValid.value = emailPattern.test(form.value.username);
};

const resetPassword = async () => {
   if (isSubmitting.value) return;

   isSubmitting.value = true;
   errorMessage.value = "";
   newPass.value = "";

   try {
      const payload = { username: form.value.username };
      const result = await create("auth/reset-password", payload);
      newPass.value = result.newPassword;
   } catch (error) {
      console.error("Error al resetear la contraseña:", error);
      errorMessage.value =
         error.response?.data?.message ||
         "No se pudo generar la nueva contraseña. Intenta nuevamente.";
   } finally {
      isSubmitting.value = false;
   }
};
</script>
