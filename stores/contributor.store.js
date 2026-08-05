import { defineStore } from "pinia";
import {
   getSecureItem,
   setSecureItem,
   clearSecureItem,
} from "../helpers/secureStorage.helper";

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
      contributor: { ...contributorDefault.contributor },
      // CSC: nunca se persiste (ver ContributorDataComponent). Solo vive en
      // memoria durante la sesión del navegador.
      csc: null,
   }),
   actions: {
      /**
       * Descifra y carga el contribuyente persistido. Debe correr una sola
       * vez, antes de la navegación inicial (ver plugins/01.hydrateAuth.ts).
       */
      async hydrate() {
         const stored = await getSecureItem("contributor");
         if (stored) {
            this.contributor = stored;
         }
      },
      async setContributor(contributor) {
         if (contributor == null) {
            this.contributor = null;
            this.csc = null;
            clearSecureItem("contributor");
            return;
         }

         // el csc nunca se persiste junto al resto de los datos
         const { csc, ...rest } = contributor;
         this.contributor = { ...this.contributor, ...rest };

         if (csc !== undefined) {
            this.csc = csc;
         }

         await setSecureItem("contributor", this.contributor);
      },
   },
});
