<template>
   <div
      class="flex h-screen bg-gray-50 dark:bg-gray-900"
      :class="{ 'overflow-hidden': isSideMenuOpen }"
   >
      <ThemeAside />
      <ThemeMobileAside />
      <!--ThemeSidebar /-->
      <div class="flex flex-col flex-1 w-full">
         <ThemeHeaderBar />
         <main class="h-full overflow-y-auto">
            <div class="container px-6 mx-auto grid">
               <h2
                  class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
               >
                  Dashboard
               </h2>

               <slot />
            </div>
         </main>
      </div>
   </div>
</template>

<script setup>
const isSideMenuOpen = ref(false);
</script>
