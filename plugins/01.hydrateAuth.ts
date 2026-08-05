import { useAuthStore, useContributorStore } from "~/stores";

/**
 * Descifra y carga el token, usuario y contribuyente persistidos antes de
 * que arranque la navegación inicial. Sin esto, el middleware de auth
 * vería authToken en null en la primera carga aunque exista una sesión
 * válida guardada (ver helpers/secureStorage.helper.ts).
 */
export default defineNuxtPlugin(async () => {
   const authStore = useAuthStore();
   const contributorStore = useContributorStore();

   await authStore.hydrate();
   await contributorStore.hydrate();
});
