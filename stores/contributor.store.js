import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const contributorDefault = {
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
};

export const useContributorStore = defineStore("contributor", {
   state: () => ({
      contributor: useStorage("contributor", contributorDefault),
   }),
   actions: {
      setContributor(contributor) {
         if (contributor == null) {
            this.contributor = null;
         } else {
            this.contributor = { ...this.contributor, ...contributor };
         }
      },
   },
});
