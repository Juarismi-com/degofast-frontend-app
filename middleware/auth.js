import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores";

export default defineNuxtRouteMiddleware((to, from) => {
   const authStore = useAuthStore();
   const { auth } = storeToRefs(authStore);


   console.log(
   authStore.auth.authToken)

   if (!auth.value.authToken) {
      return navigateTo("/auth");
   }

   authStore.init();
});
