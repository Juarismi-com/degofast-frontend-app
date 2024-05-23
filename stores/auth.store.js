import axios from "axios";
import { defineStore } from "pinia";
import { API_BASE_URL } from "~/config";
import { useStorage } from "@vueuse/core";

export const useAuthStore = defineStore("auth", {
   state: () => ({
      authToken: null,
      userData: null,
      contributor: {
         fechaFirmaDigital: "",
         ruc: null,
         razonSocial: "",
         nombreFantasia: "",
         actividadesEconomicas: [],
         timbradoNumero: "",
         timbradoFecha: "",
         tipoContribuyente: 1,
         establecimientos: [],
      },
   }),
   actions: {
      async setAuth(username, password) {
         try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, {
               username,
               password,
            });

            // load store
            const data = res.data;
            const { token, usuario, contributor } = data;
            this.authToken = token || "prueba";
            this.userData = usuario;
            this.contributor = contributor;

            // set axios header with authorization
            axios.defaults.headers.common["auth_token"] = token;

            // save in localstorage token, user and contributor
            useStorage("authToken", token);
            useStorage("userData", usuario);
            useStorage("contributor", contributor);
         } catch (error) {
            console.log(error);
         }
      },
      logout() {
         this.authToken = null;
         this.userData = null;
         axios.defaults.headers.common["auth_token"] = null;
         navigateTo("/auth");
      },
   },
});
