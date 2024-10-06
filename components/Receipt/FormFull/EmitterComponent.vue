<template>
   <div>
      <div class="text-xl pb-4">
         <h3>Emisor</h3>
      </div>
    
      <div class="grid grid-cols-4 gap-4 pb-4">
         <div>
            <label for="rucEmisor">RUC (Sin puntos)*</label>
            <input
               type="text"
               v-model="formData.emisor.ruc"
               id="rucEmisor"
               :class="INPUT_CLASS.sm"
            />
         </div>
         <div>
            <label for="nombreEmisor">Razon Social:</label>
            <input
               type="text"
               v-model="formData.emisor.razonSocial"
               id="nombreEmisor"
               :class="INPUT_CLASS.sm"
            />
         </div>
         <div>
            <label for="fecha">Fecha:</label>
            <input type="datetime-local" v-model="formData.fecha" id="fecha" :class="INPUT_CLASS.sm" />
         </div>
       </div>        
      
   </div>
</template>

<script setup>

import { INPUT_CLASS } from "../../../config";

const props = defineProps({
   formData: {
      type: Object,
      default: {},
   },
   contributor: {
      type: Object,
      default: {},
   },
});

const { formData } = toRefs(props);


</script>
