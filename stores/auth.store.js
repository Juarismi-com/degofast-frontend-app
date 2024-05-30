import axios from "axios";
import { defineStore } from "pinia";
import { useConfig } from "../config"
import { useStorage } from "@vueuse/core";

const { API_URL }  = useConfig()

export const authDefault = {
   auth: {
      authToken: localStorage.getItem("authToken") || null,
   },
   user: JSON.parse(localStorage.getItem("userData")) || null,
   contributor: {} || {
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
}

export const useAuthStore = defineStore("auth", {
   state: () => (authDefault),
   actions: {
      init(){
         axios.defaults.headers.common["auth_token"] = this.auth.authToken
      },
      async setAuth(username, password) {
         try {
            const res = await axios.post(`${API_URL}/auth/login`, {
               username,
               password,
            });

            // load store
            const data = res.data;
            const { token, usuario, contributor } = data;

            this.auth.authToken = token;
            this.user = usuario;
            this.contributor = contributor;

            // set axios header with authorization
            this.init();

            // save in localstorage token, user and contributor
            useStorage("auth.authToken", token);
            useStorage("user", usuario);
            useStorage("contributor", contributor);
         } catch (error) {
            console.log(error);
            axios.defaults.headers.common["auth_token"] = null;
         }
      },
      logout() {
         this.auth.authToken = null;
         this.user = null;
         localStorage.clear();
         axios.defaults.headers.common["auth_token"] = null;
         navigateTo("/auth");
      },
   },
});
