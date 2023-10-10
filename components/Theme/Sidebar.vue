<template>
   <button class="absolute mt-16 ml-2 text-white" @click="setViewMenu" v-if="!viewMenu">>></button>
   <ul class="absolute w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white
      mt-16 ml-2 z-10"
      v-if="viewMenu">
      <li class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"><b>DegoFast</b></li>
      <li :class="[commonCss]">Perfil</li>
      <li :class="[commonCss]">Doc. Electronicos</li>
      <li class="w-full px-4 py-2 rounded-b-lg" @click="setViewMenu">Cerrar Menu</li>
   </ul>
</template>

<script>
export default {
   data(){
      return {
         viewMenu: false,
         commonCss: 'w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600'
      }
   },
   methods: {
      setViewMenu(){
         this.viewMenu = !this.viewMenu;
      }
   }
}
</script>