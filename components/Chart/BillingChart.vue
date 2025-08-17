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
         borderColor: "#3b82f6", // azul Tailwind
         backgroundColor: "rgba(59, 130, 246, 0.3)",
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
         labels: { color: "#111827" }, // gris-900
      },
   },
   scales: {
      x: {
         ticks: { color: "#374151" }, // gris-700
      },
      y: {
         ticks: { color: "#374151" },
      },
   },
};
</script>
