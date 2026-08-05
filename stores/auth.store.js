import axios from "axios";
import { defineStore } from "pinia";
import { useConfig } from "../config";
import { useContributorStore } from "./contributor.store";
import {
   getSecureItem,
   setSecureItem,
   clearSecureItem,
} from "../helpers/secureStorage.helper";

export const authDefault = {
   authToken: null,
   user: null,
};

export const useAuthStore = defineStore("auth", {
   state: () => ({ ...authDefault }),
   actions: {
      /**
       * Descifra y carga el token/usuario persistidos. Debe correr una sola
       * vez, antes de la navegación inicial (ver plugins/01.hydrateAuth.ts).
       */
      async hydrate() {
         this.authToken = await getSecureItem("authToken");
         this.user = await getSecureItem("user");
         this.loadToken();
      },
      loadToken() {
         axios.defaults.headers.common["auth_token"] = this.authToken;
         axios.defaults.timeout = 20000;
      },
      async setAuth(username, password) {
         try {
            const res = await axios.post(`${useConfig().API_URL}/auth/login`, {
               username,
               password,
            });

            // load store
            const data = res.data;
            const { token, usuario, contributor } = data;

            this.authToken = token;
            this.user = usuario;

            // set axios header with authorization
            this.loadToken();

            // persistir token y usuario cifrados
            await setSecureItem("authToken", token);
            await setSecureItem("user", usuario);

            const contributorStore = useContributorStore();
            await contributorStore.setContributor(contributor);
         } catch (error) {
            axios.defaults.headers.common["auth_token"] = null;

            let message =
               error?.response?.data?.message ||
               error?.response?.data?.error ||
               "Email o contraseña inválidos";

            throw new Error(message);
         }
      },
      logout() {
         this.authToken = null;
         this.user = null;

         const contributorStore = useContributorStore();
         contributorStore.setContributor(null);

         clearSecureItem("authToken");
         clearSecureItem("user");
         localStorage.clear();
         sessionStorage.clear();

         axios.defaults.headers.common["auth_token"] = null;
         navigateTo("/auth");
      },
   },
});
