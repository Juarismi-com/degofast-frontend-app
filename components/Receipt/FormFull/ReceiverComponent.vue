<template>
   <div>
      <div class="text-xl pb-4">
         <h3>Receptor</h3>
      </div>
    
      <div class="grid grid-cols-4 gap-4 pb-4">
         <div>
            <label for="rucReceptor">RUC (Sin puntos)*</label>
            <input
               type="text"
               v-model="formData.receptor.ruc"
               id="rucReceptor"
               :class="INPUT_CLASS.sm"
            />
         </div>
         <div>
            <label for="nombreReceptor">Razon Social:</label>
            <input
               type="text"
               v-model="formData.receptor.razonSocial"
               id="nombreReceptor"
               :class="INPUT_CLASS.sm"
            />
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
