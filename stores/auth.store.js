import axios from "axios";
import { defineStore } from "pinia";
import { useConfig } from "../config";
import { useStorage } from "@vueuse/core";
import { useContributorStore } from "./contributor.store";
const { API_URL } = useConfig();

export const authDefault = {
   authToken: localStorage.getItem("authToken") || null,
   user: JSON.parse(localStorage.getItem("user")) || null,
};

export const useAuthStore = defineStore("auth", {
   state: () => authDefault,
   actions: {
      loadToken() {
         axios.defaults.headers.common["auth_token"] = this.authToken;
         axios.defaults.timeout = 20000;
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

            this.authToken = token;
            this.user = usuario;

            // set axios header with authorization
            this.loadToken();

            // save in localstorage token, user and contributor
            useStorage("authToken", token);
            useStorage("user", usuario);

            const contributorStore = useContributorStore();
            contributorStore.setContributor(contributor);
         } catch (error) {
            axios.defaults.headers.common["auth_token"] = null;
         }
      },
      logout() {
         this.authToken = null;
         this.user = null;

         const contributorStore = useContributorStore();
         contributorStore.setContributor(null);

         localStorage.clear();
         axios.defaults.headers.common["auth_token"] = null;
         navigateTo("/auth");
      },
   },
});
