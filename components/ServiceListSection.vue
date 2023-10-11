<template>
   <section
      class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-32 md:pt-16 text-center lg:text-left"
   >
      <div v-for="(service, index) in services" :key="index" class="m-4 md:m-0">
         <img :src="service.icon" class="pl-6 mx-auto lg:mx-0" />
         <h3 class="py-1 my-2 pl-6 text-xl border-l-2 border-skyblue font-bold">
            {{ service.title }}
         </h3>
         <p class="sm:p-3 md:pl-6 text-gray">
            {{ service.description }}
         </p>
      </div>
   </section>
</template>

<script>
//import { getServices } from '../services/api.js'
export default {
   data() {
      return {
         services: [],
      };
   },
   created() {
      //this.services = getServices();
   },
};
</script>
