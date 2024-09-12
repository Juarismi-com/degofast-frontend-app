<template>
   <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
   >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
         <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
         >
            Iniciar Sesión
         </h1>
         <ToastDanger
            v-if="showToast"
            message="Email o contraseña inválidos."
         />
         <form
            class="space-y-4 md:space-y-6"
            action="#"
            @submit="login"
            method="post"
         >
            <div>
               <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Email</label
               >
               <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  placeholder="Nombre de Usuario"
                  required="true"
                  v-model="form.username"
               />
            </div>
            <div>
               <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Contraseña</label
               >
               <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  required="true"
                  v-model="form.password"
               />
            </div>
            <!--div class="flex items-center justify-between">
                     <div class="flex items-start">
                        <div class="flex items-center h-5">
                           <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800" required="">
                        </div>
                        <div class="ml-3 text-sm">
                           <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                        </div>
                     </div>
                     <a href="#" class="text-sm font-medium text-purple-600 hover:underline dark:text-purple-500">Forgot password?</a>
               </div-->
            <button
               type="submit"
               class="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
               Ingresar
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
               ¿Aún no tienes una cuenta?
               <NuxtLink
                  class="font-medium text-purple-600 hover:underline dark:text-purple-500"
                  to="/auth/register"
                  >Registrarte</NuxtLink
               >
            </p>
         </form>
      </div>
   </div>
</template>

<script>
import { useAuthStore } from "../../stores/auth.store.js";
import { storeToRefs } from "pinia";
import { HOME_PAGE_PATH } from "../../config";

const authStore = useAuthStore();

export default defineComponent({
   setup() {
      const form = {
         username: "",
         password: "",
      };

      const loginFail = false;
      const showToast = ref(false);

      const { setAuth } = authStore;
      const { auth } = storeToRefs(authStore);

      return { form, loginFail, showToast, authStore, setAuth, auth };
   },

   methods: {
      async login(e) {
         this.loginFail = false;
         e.preventDefault();

         await this.setAuth(this.form.username, this.form.password);

         if (this.auth.authToken) {
            const { contributor } = storeToRefs(authStore);

            if (contributor.value) {
               this.$router.push(HOME_PAGE_PATH);
            } else {
               this.$router.push("/contributor");
            }
         } else {
            this.loginFail = true;
            this.showToast = true;

            setTimeout(() => {
               this.showToast = false;
            }, 3000);
         }
      },
   },
});
</script>
