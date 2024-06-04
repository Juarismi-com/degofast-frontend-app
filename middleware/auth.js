import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores";

export default defineNuxtRouteMiddleware((to, from) => {
   const authStore = useAuthStore();
   authStore.loadToken();

   if (!authStore.auth.authToken) {
      return navigateTo("/auth");
   }   
});
