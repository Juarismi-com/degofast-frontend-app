<template>
   <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
         <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
         >
            Iniciar Sesión
         </h1>
         <form
            class="space-y-4 md:space-y-6"
            action="#"
            @submit="login"
            method="post"
         >
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
                  v-model="form.username"
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
                  autocomplete="current-password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  required="true"
                  v-model="form.password"
               />
            </div>
            <!--div class="flex items-center justify-between">
                     <div class="flex items-start">
                        <div class="flex items-center h-5">
                           <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300" required="">
                        </div>
                        <div class="ml-3 text-sm">
                           <label for="remember" class="text-gray-500">Remember me</label>
                        </div>
                     </div>
                     <a href="#" class="text-sm font-medium text-purple-600 hover:underline">Forgot password?</a>
               </div-->
            <button
               type="submit"
               :disabled="isSubmitting"
               class="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {{ isSubmitting ? "Ingresando..." : "Ingresar" }}
            </button>
            <p class="text-sm font-light text-gray-500">
               ¿Aún no tienes una cuenta?
               <NuxtLink
                  class="font-medium text-purple-600 hover:underline"
                  to="/auth/register"
                  >Registrarte</NuxtLink
               >
            </p>
            <p class="text-sm font-light text-gray-500">
               ¿Olvidaste la contraseña?
               <NuxtLink
                  class="font-medium text-purple-600 hover:underline"
                  to="/auth/reset"
                  >Genera una nueva</NuxtLink
               >
            </p>
         </form>
      </div>
   </div>
</template>

<script setup>
import { useAuthStore } from "../../stores/auth.store.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { HOME_PAGE_PATH } from "../../config";
import { useContributorStore } from "~/stores/contributor.store.js";

const authStore = useAuthStore();
const { setAuth } = authStore;
const { authToken } = storeToRefs(authStore);

const contributorStore = useContributorStore();
const { contributor } = storeToRefs(contributorStore);
const router = useRouter();
const { handleError } = useErrorHandler();

const form = ref({
   username: "",
   password: "",
});

const isSubmitting = ref(false);

const login = async (e) => {
   e.preventDefault();
   if (isSubmitting.value) return;

   isSubmitting.value = true;

   try {
      await setAuth(form.value.username, form.value.password);

      if (authToken.value) {
         if (contributor.value) {
            router.push(HOME_PAGE_PATH);
         } else {
            router.push("/contributor");
         }
      }
   } catch (error) {
      handleError(error, "Email o contraseña inválidos.");
   } finally {
      isSubmitting.value = false;
   }
};
</script>
