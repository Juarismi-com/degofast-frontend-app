import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores";

export default defineNuxtRouteMiddleware((to, from) => {
   const authStore = useAuthStore();
   const { authToken } = storeToRefs(authStore);

   if (!authToken.value) {
      return navigateTo("/auth");
   }
});
