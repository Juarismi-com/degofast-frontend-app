<template>
   <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <h2 class="my-6 text-2xl font-semibold text-gray-700">
         Cambiar Contraseña
      </h2>

      <div class="p-6 bg-white">
         <div class="text-xl">
            <h3>Detalles de la cuenta</h3>
            <hr />
         </div>

         <form @submit.prevent="submitChangePassword">
            <div class="p-6 bg-white grid grid-cols-3 gap-4">
               <div>
                  <label for="username">Usuario (correo):</label>
                  <input
                     type="email"
                     v-model="formData.username"
                     id="username"
                     readonly
                     :class="INPUT_CLASS.sm"
                     class="bg-gray-100 cursor-not-allowed"
                     placeholder="ejemplo@dominio.com"
                  />
               </div>
               <div>
                  <label for="currentPassword">Contraseña actual:</label>
                  <input
                     type="password"
                     v-model="formData.currentPassword"
                     id="currentPassword"
                     autocomplete="current-password"
                     :class="INPUT_CLASS.sm"
                  />
               </div>
               <div>
                  <label for="newPassword">Nueva contraseña:</label>
                  <input
                     type="password"
                     v-model="formData.newPassword"
                     id="newPassword"
                     autocomplete="new-password"
                     :class="INPUT_CLASS.sm"
                  />
               </div>
            </div>

            <!-- Mostrar mensaje de éxito si existe -->
            <div
               v-if="successMessage"
               class="p-4 mb-4 text-green-700 bg-green-100 rounded-lg"
            >
               {{ successMessage }}
            </div>

            <!-- Mostrar mensaje de error si existe -->
            <div
               v-if="errorMessage"
               class="p-4 mb-4 text-red-700 bg-red-100 rounded-lg"
            >
               {{ errorMessage }}
            </div>

            <div class="m-5">
               <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {{ isSubmitting ? "Cambiando..." : "Cambiar Contraseña" }}
               </button>
            </div>
         </form>
      </div>
   </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { INPUT_CLASS } from "~/config";
import { create } from "@/services/http.service";
import { useAuthStore } from "~/stores/auth.store.js";

const { user } = storeToRefs(useAuthStore());

// Datos iniciales del formulario
const formData = ref({
   username: user.value?.username || "",
   currentPassword: "",
   newPassword: "",
});

// Variable para almacenar los mensajes de error/éxito
const errorMessage = ref("");
const successMessage = ref("");
const isSubmitting = ref(false);

// Función para enviar la solicitud de cambio de contraseña
const submitChangePassword = async () => {
   if (isSubmitting.value) return;

   try {
      // Limpiar mensajes previos
      errorMessage.value = "";
      successMessage.value = "";

      // Validación básica en el frontend
      if (
         !formData.value.username ||
         !formData.value.currentPassword ||
         !formData.value.newPassword
      ) {
         throw new Error("Todos los campos son obligatorios");
      }

      isSubmitting.value = true;

      // Preparar el payload para la API
      const payload = {
         username: formData.value.username,
         currentPassword: formData.value.currentPassword,
         newPassword: formData.value.newPassword,
      };

      // Usar create para enviar la solicitud POST
      const response = await create("auth/change-password", payload);

      if (response) {
         successMessage.value = "Contraseña cambiada con éxito";
         resetForm();
      }
   } catch (error) {
      console.error("Error al cambiar la contraseña:", error);

      // Capturar el mensaje de error del backend
      if (
         error.response &&
         error.response.data &&
         error.response.data.message
      ) {
         errorMessage.value = error.response.data.message; // Mostrar mensaje específico del backend
      } else {
         errorMessage.value =
            "Error interno del servidor. Por favor, intenta de nuevo.";
      }
   } finally {
      isSubmitting.value = false;
   }
};

// Función para resetear el formulario
const resetForm = () => {
   formData.value = {
      username: user.value?.username || "",
      currentPassword: "",
      newPassword: "",
   };
};
</script>
