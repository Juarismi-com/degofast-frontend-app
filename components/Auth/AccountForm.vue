<template>
   <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Cambiar Contraseña
      </h2>

      <div class="p-6 bg-white">
         <div class="text-xl">
            <h3>Detalles de la cuenta</h3>
            <hr />
         </div>

         <div class="p-6 bg-white grid grid-cols-3 gap-4">
            <div>
               <label for="username">Usuario (correo):</label>
               <input
                  type="email"
                  v-model="formData.username"
                  id="username"
                  :class="INPUT_CLASS.sm"
                  placeholder="ejemplo@dominio.com"
               />
            </div>
            <div>
               <label for="currentPassword">Contraseña actual:</label>
               <input
                  type="password"
                  v-model="formData.currentPassword"
                  id="currentPassword"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="newPassword">Nueva contraseña:</label>
               <input
                  type="password"
                  v-model="formData.newPassword"
                  id="newPassword"
                  :class="INPUT_CLASS.sm"
               />
            </div>
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
               class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               @click="submitChangePassword"
            >
               Cambiar Contraseña
            </button>
         </div>
      </div>
   </div>
</template>

<script setup>
import { ref } from "vue";
import { INPUT_CLASS } from "~/config";
import { create } from "@/services/http.service";

// Datos iniciales del formulario
const formData = ref({
   username: "",
   currentPassword: "",
   newPassword: "",
});

// Variable para almacenar el mensaje de error
const errorMessage = ref("");

// Función para enviar la solicitud de cambio de contraseña
const submitChangePassword = async () => {
   try {
      // Limpiar mensaje de error previo
      errorMessage.value = "";

      // Validación básica en el frontend
      if (
         !formData.value.username ||
         !formData.value.currentPassword ||
         !formData.value.newPassword
      ) {
         throw new Error("Todos los campos son obligatorios");
      }

      // Preparar el payload para la API
      const payload = {
         username: formData.value.username,
         currentPassword: formData.value.currentPassword,
         newPassword: formData.value.newPassword,
      };

      // Usar create para enviar la solicitud POST
      const response = await create("auth/change-password", payload);

      if (response) {
         alert("Contraseña cambiada con éxito");
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
   }
};

// Función para resetear el formulario
const resetForm = () => {
   formData.value = {
      username: "",
      currentPassword: "",
      newPassword: "",
   };
   errorMessage.value = ""; // Limpiar mensaje de error al resetear
};
</script>
