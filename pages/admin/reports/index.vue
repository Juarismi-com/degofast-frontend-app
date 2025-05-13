<template>
   <div class="p-5">
      <h1 class="text-3xl">Resumen</h1>

      <div class="py-5">
         <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Cantidades:
         </h2>
         <div>
            <dt class="mb-2 text-3xl font-extrabold">
               {{ counters?.total }} total
            </dt>
         </div>
         <ul class="p-5 list-disc list-inside">
            <li>{{ counters?.estado_a }} (A) - Aceptados</li>
            <li>{{ counters?.estado_p }} (P) - Pendientes de enviar</li>
            <li>{{ counters?.estado_r }} (R) - Rechazados</li>
            <li>{{ counters?.estado_e }} (E) - En proceso (enviados)</li>
            <li>{{ counters?.estado_i }} (I) - Inconsistentes</li>
            <li>{{ counters?.estado_c }} (C) - Lote Cancelado</li>
         </ul>
      </div>

      <div class="py-5">
         <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Ultimos Insertados:
         </h2>
         <div>
            <div
               v-for="item in lastRecords"
               :key="item?.idcabecera"
               class="mb-3"
            >
               Estado: {{ item?.estado }} <br />
               Fecha:
               {{ moment(item?.datahora).format("DD/MM/YYYY hh:mm:ss") }} <br />
               Id: {{ item?.idcabecera }} <br />
               CDC: {{ item?.cdc }}
               <hr class="my-3" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import moment from "moment";
import {
   getCountersInvoicesByState,
   getInvoiceLastByState,
} from "~/services/reports.services";

definePageMeta({
   layout: "empty",
});

const counters = ref({});

const lastRecords = ref([]);

const getRepors = async (id) => {
   try {
      let lastRecordTmp = [];

      counters.value = await getCountersInvoicesByState();
      lastRecordTmp = await getInvoiceLastByState();
      lastRecords.value = lastRecordTmp.filter((item) => item != null);
   } catch (error) {
      console.error("Error al obtener los detalles de la factura:", error);
   }
};

onMounted(() => {
   getRepors();
});
</script>
