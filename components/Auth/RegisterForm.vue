<template>
   <div
      class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
   >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
         <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
         >
            Cree una cuenta
         </h1>
         <div v-if="passwordMismatch" class="text-center text-red-600 text-sm">
            Las contraseñas no coinciden
         </div>
         <div v-if="registerFail" class="text-center text-red-600 text-sm">
            {{ registerFailMessage }}
         </div>
         <form
            class="space-y-4 md:space-y-6"
            action="#"
            @submit="register"
            method="post"
         >
            <div>
               <label
                  for="nombre"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Nombre</label
               >
               <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  autocomplete="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="Juan Pérez"
                  required="true"
                  v-model="form.nombre"
               />
            </div>
            <div>
               <label
                  for="documentoNumero"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Cédula (Sin Puntos)</label
               >
               <input
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  name="documentoNumero"
                  id="documentoNumero"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="1234567"
                  required="true"
                  v-model="form.documentoNumero"
               />
            </div>
            <div>
               <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Email</label
               >
               <input
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="correo@ejemplo.com"
                  required="true"
                  v-model="form.email"
               />
            </div>
            <div>
               <label
                  for="cargo"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Oficio / Cargo</label
               >
               <input
                  type="text"
                  name="cargo"
                  id="cargo"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="Administrador"
                  required="true"
                  v-model="form.cargo"
               />
            </div>
            <div>
               <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Contraseña</label
               >
               <input
                  type="password"
                  name="password"
                  id="password"
                  autocomplete="new-password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  required="true"
                  v-model="form.password"
               />
            </div>
            <div>
               <label
                  for="password2"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Confirmar Contraseña</label
               >
               <input
                  type="password"
                  name="password2"
                  id="password2"
                  autocomplete="new-password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  required="true"
                  v-model="form.password2"
               />
            </div>
            <button
               type="submit"
               :disabled="isSubmitting"
               class="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {{ isSubmitting ? "Registrando..." : "Registrarse" }}
            </button>
            <p class="text-sm font-light text-gray-500">
               ¿Ya tienes una cuenta?
               <NuxtLink
                  class="font-medium text-purple-600 hover:underline"
                  to="/auth"
                  >Iniciar Sesión</NuxtLink
               >
            </p>
         </form>
      </div>
   </div>
</template>

<script>
import { useConfig } from "~/config";

const { API_URL } = useConfig()

export default {
   data() {
      return {
         form: {
            nombre: "",
            cargo: "",
            email: "",
            password: "",
            password2: "",
            documentoNumero: "",
         },
         registerFail: false,
         registerFailMessage: "Ocurrio un problema en su registro",
         passwordMismatch: false,
         isSubmitting: false,
      };
   },
   methods: {
      async register(e) {
         e.preventDefault();
         if (this.isSubmitting) return;

         this.registerFail = false;
         this.passwordMismatch = false;

         if (this.form.password !== this.form.password2) {
            this.passwordMismatch = true;
            return;
         }

         this.isSubmitting = true;

         try {
            const res = await useFetch(`${API_URL}/auth/register`, {
               method: "post",
               body: {
                  ...this.form,
               },
            });

            if (res.status.value === "success") {
               this.$router.push("/auth");
            } else {
               this.registerFailMessage =
                  res.error.value?.data?.message ||
                  "Ocurrio un problema en su registro";
               this.registerFail = true;
            }
         } finally {
            this.isSubmitting = false;
         }
      },
   },
};
</script>
