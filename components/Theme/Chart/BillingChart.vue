<template>
   <div class="mx-auto p-6 bg-white">
      <h2 class="text-xl font-bold mb-4">Facturación del último mes</h2>
      <Line :data="data" :options="options" />
   </div>
</template>

<script setup>
import {
   Chart as ChartJS,
   Title,
   Tooltip,
   Legend,
   LineElement,
   CategoryScale,
   LinearScale,
   PointElement,
} from "chart.js";
import { Line } from "vue-chartjs";

// Registramos los módulos de Chart.js
ChartJS.register(
   Title,
   Tooltip,
   Legend,
   LineElement,
   CategoryScale,
   LinearScale,
   PointElement,
);

// Datos de facturación (ejemplo: último mes)
const labels = Array.from({ length: 4 }, (_, i) => `${i + 1}`);
const data = {
   labels,
   datasets: [
      {
         label: "Facturación diaria ($)",
         data: labels.map(() => Math.floor(Math.random() * 1000) + 100), // números aleatorios
         borderColor: "#FF4D5A", // coral de marca
         backgroundColor: "rgba(255, 77, 90, 0.3)",
         tension: 0.3,
         fill: true,
      },
   ],
};

const options = {
   responsive: true,
   plugins: {
      legend: {
         display: true,
         labels: { color: "#1F1D1F" }, // gray-900 de marca
      },
   },
   scales: {
      x: {
         ticks: { color: "#5A575A" }, // gray-700 de marca
      },
      y: {
         ticks: { color: "#5A575A" },
      },
   },
};
</script>
