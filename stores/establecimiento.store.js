import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const establecimientoDefault = {
   puntoExpedicionList: [], //todo
   puntoExpedicionSelected: null, // todo
   establecimientoList: [], // todo
   establecimientoSelected: null, // todo
};

export const useEstablecimientoStore = defineStore("contributor", {
   state: () => ({
      puntoExpedicionList: useStorage(
         "puntoExpedicionList",
         establecimientoDefault.puntoExpedicionList,
      ),
   }),
   actions: {
      setEstablecimientoList() {
         //this.puntoExpedicionList = puntoExpedicionList };
         // todo
      },
   },
});
