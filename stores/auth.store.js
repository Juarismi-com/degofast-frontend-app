import axios from "axios";
import { defineStore } from "pinia";
import { API_BASE_URL } from "~/config";
import { useStorage } from "@vueuse/core";

export const useAuthStore = defineStore("auth", {
   state: () => ({
      authToken: null,
      userData: null,
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
            const { token, usuario } = data;
            this.authToken = token;
            this.userData = usuario;

            // set axios header with authorization
            axios.defaults.headers.common["auth_token"] = token;

            // save in localstorage token and user
            useStorage("authToken", token);
            useStorage("userData", usuario);
         } catch (error) {
            console.log(error);
         }
      },
      logout() {
         this.authToken = null;
         this.userData = null;
         axios.defaults.headers.common["auth_token"] = null;
      },
   },
});
