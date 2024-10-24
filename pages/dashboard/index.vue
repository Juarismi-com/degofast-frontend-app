<template>
   <div>
      <button @click="generarReportes">Reporte</button>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
         <a
            v-for="(card, index) in cards"
            :key="index"
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
         >
            <h5
               class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
               {{ card.title }}
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
               {{ card.content }}
            </p>
         </a>
      </div>
   </div>
</template>

<script setup>
// import { storeToRefs } from "pinia";
// import { useAuthStore } from "~/stores";
import { onMounted } from "vue";
import { getReports } from "~/services/dashboard.service";

definePageMeta({
   middleware: ["auth"],
});

// datos del contribuyente
// const authStore = useAuthStore();
// const { contributor } = storeToRefs(authStore);

const cards = ref([
   {
      title: "Noteworthy technology acquisitions 2021",
      content:
         "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
   },
   {
      title: "Top AI Trends to Watch in 2024",
      content:
         "Discover the most influential trends shaping artificial intelligence in the coming year.",
   },
   {
      title: "The Rise of Quantum Computing",
      content:
         "Quantum computing is set to revolutionize industries. Learn what it means for the future of tech.",
   },
   {
      title: "Blockchain Beyond Cryptocurrencies",
      content:
         "Explore how blockchain technology is being applied beyond the world of digital currencies.",
   },
   {
      title: "Advancements in Renewable Energy",
      content:
         "How the latest innovations are making renewable energy more efficient and accessible.",
   },
   {
      title: "Cybersecurity in a Digital Age",
      content:
         "Protecting data and privacy is more important than ever. Learn about the latest in cybersecurity.",
   },
   {
      title: "5G and the Future of Connectivity",
      content:
         "5G technology is transforming how we connect, work, and live. Here’s what you need to know.",
   },
   {
      title: "Virtual and Augmented Reality: The Next Frontier",
      content:
         "VR and AR are reshaping industries from gaming to healthcare. Discover what’s next.",
   },
]);

const generarReportes = async () => {
   console.log("Estoy");
   try {
      const data = await getReports("66b160707ed87d4d67aaa973");

      console.log(JSON.stringify(data));

      // return data;
   } catch (error) {
      console.error("Error al buscar el documento:", error);
   }
};

onMounted(() => {
   generarReportes();
});
</script>
