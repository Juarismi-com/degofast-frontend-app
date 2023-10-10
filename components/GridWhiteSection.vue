<template>
   <section class="py-16 m-4 md:m-0">
      <ThemeOrangeTriangle />
      <div class="grid md:grid-cols-2 lg:grid-cols-12 gap-8">
         <div :class="[commonClass, 'lg:h-36 lg:col-span-3']"></div>
         <div :class="[commonClass, 'lg:h-80 lg:col-span-6']"></div>
         <div :class="[commonClass, 'lg:h-auto lg:-mt-16 lg:col-span-3']"></div>
         <div :class="[commonClass, 'lg:h-96 lg:-mt-44 lg:col-span-3']"></div>
         <div :class="[commonClass, 'lg:h-80 lg:col-span-9']"></div>
      </div>
      <ThemeOrangeIntensiveTriangle />
   </section>
</template>


<script>
export default {
   data() {
      return {
         commonClass: 'w-full bg-silver rounded-[24px] h-80 sm:h-96'
      }
   }
}
</script>