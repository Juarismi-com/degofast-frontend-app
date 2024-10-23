<template>
   <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Recibo
      </h2>

      <div>
         <div class="p-6 bg-white grid grid-cols-4 gap-4 pb-4">
            <div>
               <label for="numero">Número:</label>
               <input
                  type="text"
                  v-model="formData.numero"
                  id="numero"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="fecha">Fecha:</label>
               <input
                  type="datetime-local"
                  v-model="formData.fecha"
                  id="fecha"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="recibidoDe">Recibido de:</label>
               <input
                  type="text"
                  v-model="formData.recibidoDe"
                  id="recibidoDe"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="concepto">Concepto:</label>
               <input
                  type="text"
                  v-model="formData.concepto"
                  id="concepto"
                  :class="INPUT_CLASS.sm"
               />
            </div>
         </div>

         <div class="p-6 bg-white grid grid-cols-4 gap-4 pb-4">
            <div>
               <label for="monto">Monto</label>
               <input
                  type="text"
                  v-model="formData.monto"
                  id="monto"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="montoLetras">Monto en letras:</label>
               <input
                  type="text"
                  v-model="formData.montoLetras"
                  id="montoLetras"
                  :class="INPUT_CLASS.sm"
               />
            </div>
         </div>

         <div class="p-6 bg-white grid grid-cols-4 gap-4 pb-4">
            <div>
               <label for="moneda">Moneda:</label>
               <select
                  v-model="formData.moneda"
                  id="moneda"
                  :class="INPUT_CLASS.sm"
               >
                  <option value="PYG">PYG</option>
                  <option value="USD">USD</option>
               </select>
            </div>
            <div>
               <label for="formaPago">Forma de pago:</label>
               <select
                  v-model="formData.formaPago"
                  id="formaPago"
                  :class="INPUT_CLASS.sm"
               >
                  <option value="Cheque">Cheque</option>
                  <option value="Transferencia">Transferencia</option>
                  <option value="Efectivo">Efectivo</option>
               </select>
            </div>
            <div>
               <label for="banco">Banco</label>
               <input
                  type="text"
                  v-model="formData.banco"
                  id="banco"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="nroBanco">N° Banco</label>
               <input
                  type="text"
                  v-model="formData.nroBanco"
                  id="nroBanco"
                  :class="INPUT_CLASS.sm"
               />
            </div>
         </div>

         <div class="p-6 bg-white grid grid-cols-4 gap-4 pb-4">
            <div>
               <label for="ruc">RUC:</label>
               <input
                  type="text"
                  v-model="formData.ruc"
                  id="ruc"
                  :class="INPUT_CLASS.sm"
               />
            </div>
            <div>
               <label for="ci">C.I.N°.</label>
               <input
                  type="text"
                  v-model="formData.ci"
                  id="ci"
                  :class="INPUT_CLASS.sm"
               />
            </div>
         </div>

         <div class="m-5">
            <button
               type="submit"
               class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
               @click="submitRecibo"
            >
               Enviar
            </button>
         </div>
      </div>
   </div>
</template>

<script setup>
import { INPUT_CLASS } from "~/config";
import { deReceiptData, validateRecibo } from "~/config/receipt";
import { saveRecibo } from "~/services/recibo.service";
import { formatDateHours } from "~/helpers/date.helper";

// datos del formulario / recibo
const formData = ref({
   ...deReceiptData,
   tipoDocumento: 50,
});

const submitRecibo = async () => {
   try {
      if (validateRecibo(formData.value)) {
         const payload = {
            ...formData.value,
            fecha: formatDateHours(formData.value.fecha),
         };

         const response = await saveRecibo(payload);

         if (response) {
            alert("Recibo enviado");
            resetForm();
         }
      }
   } catch (error) {
      console.log(error);
      if (error.message) {
         alert(`Error: ${error.message}`);
      } else {
         alert(error);
      }
   }
};

const resetForm = () => {
   formData.value = {
      ...deReceiptData,
   };
};
</script>

- datos del recibo comun (numero, fecha, recibido de, concepto) - monto, monto
en letras (verificar libreria luego) - forma de pago, banco, numero cuenta - que
se visualice en formato de impresion
