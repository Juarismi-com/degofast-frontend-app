<template>
   <div>
      <ol
         class="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse my-6 cursor-pointer"
      >
         <li
            v-for="(step, index) in steps"
            :class="[
               'flex items-center space-x-2.5 rtl:space-x-reverse',
               index === currentStep ? 'text-blue-500' : 'text-gray-400',
            ]"
            :key="index"
            @click="setStep(index)"
         >
            <span
               :class="[
                  'flex items-center justify-center w-8 h-8 border  rounded-full shrink-0 ',
                  index === currentStep ? 'border-blue-600' : 'border-gray-600',
               ]"
            >
               {{ index + 1 }}
            </span>
            <span>
               <h3 class="font-medium leading-tight">{{ step?.title }}</h3>
               <p class="text-sm">Formulario de {{ step?.title }}</p>
            </span>
         </li>
      </ol>

      <slot></slot>

      <!-- Button steps -->
      <div class="flex justify-between my-6" v-if="btnControl">
         <button
            type="button"
            v-if="currentStep != 0"
            class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="nextStepFn(currentStep - 1)"
         >
            < Anterior
         </button>

         <button
            type="button"
            v-if="currentStep != steps.length - 1"
            class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="nextStepFn(currentStep + 1)"
         >
            Siguiente >
         </button>
      </div>
   </div>
</template>

<script setup>
const props = defineProps({
   currentStep: {
      type: Number,
      default: 0,
   },
   steps: {
      type: Array,
      default: [],
   },
   nextStepFn: {
      type: Function,
      default: () => {},
   },
   btnControl: {
      type: Boolean,
      default: false,
   },

   /**
    * @todo activar que se pueda dar
    */
   availableButonStep: {
      type: Boolean,
      default: false,
   },
});

const { nextStepFn, btnControl } = toRefs(props);

const setStep = (index) => {
   if (btnControl.value) {
      nextStepFn.value(index);
   }
};
</script>
